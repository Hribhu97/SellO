const express = require('express');
const path = require('path');
const store = require('./data/store');
const { getRecommendations } = require('./lib/recommendation');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from public/
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// --- REST API ROUTES ---

// 1. Store configuration
app.get('/api/shop', (req, res) => {
  res.json({ success: true, shop: store.getShop() });
});

app.post('/api/shop', (req, res) => {
  const updated = store.updateShop(req.body);
  res.json({ success: true, shop: updated });
});

// 2. Product catalogue
app.get('/api/products', (req, res) => {
  const { category, availableOnly } = req.query;
  const products = store.getProducts({
    category,
    availableOnly: availableOnly === 'true'
  });
  res.json({ success: true, count: products.length, products });
});

app.get('/api/products/:id', (req, res) => {
  const product = store.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, product });
});

// Merchant product management
app.post('/api/products', (req, res) => {
  const { name, price, category, sizes, colours, image_url } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ success: false, error: 'Name, price, and category are required' });
  }
  const newProduct = store.addProduct(req.body);
  res.status(201).json({ success: true, product: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const updated = store.updateProduct(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, product: updated });
});

app.delete('/api/products/:id', (req, res) => {
  const deleted = store.deleteProduct(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, message: 'Product deleted' });
});

// 3. AI Recommendation Engine
app.post('/api/recommend', async (req, res) => {
  try {
    const preferences = req.body || {};
    const result = await getRecommendations(preferences);
    res.json({ success: true, ...result });
  } catch (err) {
    console.error('Error during recommendations:', err);
    res.status(500).json({
      success: false,
      error: "We're having trouble finding your best matches. Please try again.",
      recommendations: []
    });
  }
});

// 4. In-Store Counter Reservations
app.post('/api/reservations', (req, res) => {
  const { product_id, customer_name, customer_phone, selected_size, selected_colour } = req.body;

  if (!product_id || !customer_name || !customer_phone) {
    return res.status(400).json({
      success: false,
      error: 'Product ID, customer name, and mobile number are required.'
    });
  }

  // Validate phone: 10 digits
  const cleanPhone = String(customer_phone).replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid 10-digit mobile number.'
    });
  }

  const product = store.getProductById(product_id);
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found.'
    });
  }

  if (!product.is_available || product.stock_quantity <= 0) {
    return res.status(400).json({
      success: false,
      error: 'This item is no longer available.'
    });
  }

  const reservation = store.addReservation({
    product_id,
    product_name: product.name,
    customer_name: customer_name.trim(),
    customer_phone: cleanPhone,
    selected_size: selected_size || product.sizes[0] || 'M',
    selected_colour: selected_colour || product.colours[0] || 'Festive',
    final_price: product.price
  });

  // Track reservation completed event
  store.logAnalytics('reservation_completed', {
    reservation_id: reservation.id,
    product_id,
    price: product.price
  });

  res.status(201).json({
    success: true,
    message: 'Your item is reserved.',
    reservation,
    shop: store.getShop()
  });
});

app.get('/api/reservations', (req, res) => {
  res.json({
    success: true,
    reservations: store.getReservations()
  });
});

app.patch('/api/reservations/:id', (req, res) => {
  const { status } = req.body;
  const validStatuses = ['Pending', 'Confirmed', 'Collected', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid status' });
  }

  const updated = store.updateReservationStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Reservation not found' });
  }
  res.json({ success: true, reservation: updated });
});

// 5. Analytics tracking
app.post('/api/analytics', (req, res) => {
  const { event_name, payload } = req.body;
  if (!event_name) {
    return res.status(400).json({ success: false, error: 'event_name required' });
  }
  const event = store.logAnalytics(event_name, payload);
  res.json({ success: true, event });
});

// 6. Merchant Dashboard stats
app.get('/api/stats', (req, res) => {
  res.json({ success: true, stats: store.getStats() });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    product: 'Puja Look',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// SPA Fallback: send index.html for any unhandled route
app.use((req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Start listener when executed directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✓ Puja Look MVP running at http://localhost:${PORT}`);
  });
}

module.exports = app;
