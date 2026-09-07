import { getShopBySlug, getShopProducts, getProductById } from '../src/services/firebase/shopService';
import { fetchRecommendations, scoreProductLocally } from '../src/services/firebase/recommendationService';
import { createReservation, getShopReservations, updateReservationStatus } from '../src/services/firebase/reservationService';
import { UserPreferences, Product } from '../src/types';

let failures = 0;

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failures++;
  } else {
    console.log(`✓ PASS: ${message}`);
  }
}

async function runDomainTestSuite() {
  console.log('\n--- STARTING PUJA LOOK DOMAIN & FIREBASE ARCHITECTURE TESTS ---\n');

  try {
    // 1. Shop Catalog & Slug Verification
    const shop = await getShopBySlug('maa-tara-bastra');
    assert(shop !== null, 'Found default shop by slug');
    assert(shop?.name === 'Maa Tara Bastralaya', 'Shop English name is correct');
    assert(shop?.nameBn === 'মা তারা বস্ত্রালয়', 'Shop Bengali name is correct');
    assert(shop?.location === 'Gariahat, Kolkata', 'Shop location is Gariahat, Kolkata');

    // 2. Inventory Coverage
    const products = await getShopProducts(shop!.id);
    assert(products.length >= 20, `Shop has comprehensive inventory: ${products.length} items`);

    const categories = new Set(products.map(p => p.category));
    assert(categories.has('saree'), 'Includes Sarees category');
    assert(categories.has('kurta'), 'Includes Kurtas category');
    assert(categories.has('kurta-set'), 'Includes Kurta Sets category');
    assert(categories.has('dress'), 'Includes Dresses category');
    assert(categories.has('shirt'), 'Includes Shirts category');

    // 3. Recommendation Engine Tests
    const testPrefs: UserPreferences = {
      occasion: 'puja',
      budget: '₹2,000–₹4,000',
      style: 'traditional',
      color: 'Festive',
      size: 'M',
    };

    const recResult = await fetchRecommendations(shop!.id, testPrefs);
    assert(recResult.recommendations.length > 0 && recResult.recommendations.length <= 3, `Returned ${recResult.recommendations.length} recommendations (max 3)`);
    assert(recResult.totalCandidates > 0, `Ranked among ${recResult.totalCandidates} eligible candidates`);

    for (const rec of recResult.recommendations) {
      assert(rec.product.shopId === shop!.id, `Product ${rec.product.id} strictly belongs to shop ${shop!.id}`);
      assert(rec.product.isAvailable === true, `Product ${rec.product.id} is marked available`);
      assert(rec.product.stockQuantity > 0, `Product ${rec.product.id} has active rack stock`);
      assert(rec.reason.length > 0, `Product has English match reason: "${rec.reason}"`);
      assert(rec.reasonBn.length > 0, `Product has authentic Bengali match reason: "${rec.reasonBn}"`);
    }

    // 4. Invariant: Scored product budget alignment
    const sampleProduct = products.find(p => p.price >= 2000 && p.price <= 4000);
    if (sampleProduct) {
      const scoring = scoreProductLocally(sampleProduct, testPrefs);
      assert(scoring.score >= 25, `Product within budget scored ${scoring.score} points`);
    }

    // 5. Reservation Creation & Validation
    const targetProduct = recResult.recommendations[0].product;

    // Test phone validation failure
    let rejected = false;
    try {
      await createReservation({
        shopId: shop!.id,
        productId: targetProduct.id,
        customerName: 'Anindya Chatterjee',
        customerPhone: '1234', // invalid
        selectedSize: 'M',
        selectedColour: targetProduct.colours[0] || 'Original',
      });
    } catch (e: any) {
      rejected = true;
    }
    assert(rejected, 'Invalid phone number was rejected by reservation validation');

    // Test valid reservation creation
    const res = await createReservation({
      shopId: shop!.id,
      productId: targetProduct.id,
      customerName: 'Anindya Chatterjee',
      customerPhone: '9830098300',
      selectedSize: 'M',
      selectedColour: targetProduct.colours[0] || 'Original',
    });

    assert(res.id.startsWith('RES-'), `Generated reservation ID ${res.id}`);
    assert(res.status === 'pending', 'New reservation status is pending');
    assert(res.productSnapshot.price === targetProduct.price, `Authoritative snapshot price ₹${res.productSnapshot.price}`);
    assert(res.customerPhone === '9830098300', 'Customer phone formatted correctly');

    // 2-Hour expiry invariant check
    const expiryTime = new Date(res.expiresAt).getTime();
    const createdTime = new Date(res.createdAt).getTime();
    const durationHours = (expiryTime - createdTime) / (1000 * 60 * 60);
    assert(Math.abs(durationHours - 2) < 0.1, `Reservation expires in 2 hours (actual: ${durationHours.toFixed(2)}h)`);

    // 6. Reservation Query & State Transitions
    const reservations = await getShopReservations(shop!.id);
    const createdFound = reservations.find(r => r.id === res.id);
    assert(!!createdFound, `Newly created reservation ${res.id} retrieved from shop queue`);

    const confirmed = await updateReservationStatus(res.id, 'confirmed');
    assert(confirmed.status === 'confirmed', `Status successfully transitioned to confirmed`);

    const collected = await updateReservationStatus(res.id, 'collected');
    assert(collected.status === 'collected', `Status successfully transitioned to collected`);

    console.log('\n=============================================');
    if (failures === 0) {
      console.log('🎉 ALL PUJA LOOK DOMAIN & FIREBASE TESTS PASSED!');
    } else {
      console.error(`⚠️ ${failures} TESTS FAILED!`);
      process.exitCode = 1;
    }
    console.log('=============================================\n');
    process.exit(failures === 0 ? 0 : 1);
  } catch (err) {
    console.error('Fatal error during test execution:', err);
    process.exitCode = 1;
  }
}

runDomainTestSuite();
