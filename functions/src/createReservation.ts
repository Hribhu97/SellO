import * as admin from 'firebase-admin';

interface ReservationRequest {
  shopId: string;
  productId: string;
  customerName: string;
  customerPhone: string;
  selectedSize: string;
  selectedColour: string;
}

export async function handleCreateReservation(data: ReservationRequest) {
  const db = admin.firestore();
  const { shopId, productId, customerName, customerPhone, selectedSize, selectedColour } = data;

  if (!shopId || !productId || !customerName || !customerPhone) {
    throw new Error('Missing required fields: shopId, productId, customerName, customerPhone.');
  }

  // Validate phone: 10 digits
  const cleanPhone = customerPhone.replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    throw new Error('Please enter a valid 10-digit mobile number.');
  }

  const productRef = db.collection('products').doc(productId);
  const reservationsCol = db.collection('reservations');
  const reservationDocRef = reservationsCol.doc();

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours

  // Atomic Firestore Transaction (Section 28 requirement)
  const result = await db.runTransaction(async (transaction) => {
    const productDoc = await transaction.get(productRef);

    if (!productDoc.exists) {
      throw new Error('Product does not exist.');
    }

    const product = productDoc.data() as any;

    if (product.shopId !== shopId) {
      throw new Error('Product does not belong to this shop.');
    }

    if (!product.isAvailable || product.stockQuantity <= 0) {
      throw new Error('Sorry, this item was just picked up by another shopper.');
    }

    const reservationId = `RES-${Math.floor(10000 + Math.random() * 90000)}`;

    const reservationData = {
      id: reservationId,
      shopId,
      productId,
      customerName: customerName.trim(),
      customerPhone: cleanPhone,
      selectedSize: selectedSize || product.sizes[0] || 'M',
      selectedColour: selectedColour || product.colours[0] || 'Festive',
      productSnapshot: {
        name: product.name,
        nameBn: product.nameBn || product.name,
        price: product.price,
        imageUrl: product.imageUrl
      },
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt: admin.firestore.Timestamp.fromDate(expiresAt)
    };

    // Save reservation
    transaction.set(reservationDocRef, reservationData);

    // Atomically decrement stock
    transaction.update(productRef, {
      stockQuantity: product.stockQuantity - 1,
      isAvailable: product.stockQuantity - 1 > 0,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return {
      reservationId,
      status: 'pending',
      expiresAt: expiresAt.toISOString()
    };
  });

  return result;
}
