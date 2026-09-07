const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from 'public' directory
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// In-memory data store for trial passes and products
const products = [
  {
    id: '8821',
    sku: 'SKU 8821',
    name: 'Crimson Baluchari Motif Kurta Set',
    type: 'Kurta set',
    price: 3250,
    currency: 'INR',
    material: 'Pure silk blend',
    finish: 'Hand-finished',
    rack: 'Rack 2B',
    stockLeft: 2,
    matchType: 'Exact match'
  },
  {
    id: '7740',
    sku: 'SKU 7740',
    name: 'Ivory Jamdani Textured Panjabi',
    type: 'Panjabi',
    price: 2850,
    currency: 'INR',
    material: 'Handloom cotton',
    finish: 'Soft finish',
    rack: 'Rack 4A',
    stockLeft: 5,
    matchType: 'Exact match'
  },
  {
    id: '9123',
    sku: 'SKU 9123',
    name: 'Midnight Blue Silk Textured Kurta',
    type: 'Kurta',
    price: 3750,
    currency: 'INR',
    material: 'Tussar silk',
    finish: 'Hand-finished',
    rack: 'Rack 1C',
    stockLeft: 3,
    matchType: 'Good match'
  }
];

let nextTokenNumber = 15;
const activePasses = [
  {
    tokenNumber: 14,
    customerName: 'Customer',
    phone: '+91 98765 43210',
    salesman: 'Bapi Da',
    counter: 'Counter 3 · Gariahat',
    size: 'M',
    status: 'Item pulled',
    occasion: 'Ashtami Morning',
    budget: '~₹3.5k',
    items: ['SKU #8821 Crimson Baluchari', 'SKU #7740 Ivory Jamdani'],
    validUntil: '5:30 PM',
    createdAt: new Date().toISOString()
  },
  {
    tokenNumber: 13,
    customerName: 'Customer',
    phone: '+91 98123 45678',
    salesman: 'Bapi Da',
    counter: 'Counter 3 · Gariahat',
    size: 'L',
    status: 'In fitting room',
    occasion: 'Nabami Glam',
    budget: '~₹4.0k',
    items: ['SKU #7234 Raw Silk Kurta'],
    validUntil: '5:15 PM',
    createdAt: new Date().toISOString()
  }
];

// --- API Endpoints ---

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Product catalog endpoint
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    total: products.length,
    products
  });
});

// Trial pass generation endpoint
app.post('/api/pass', (req, res) => {
  const { phone, name, size, items } = req.body || {};

  if (!phone) {
    return res.status(400).json({
      success: false,
      error: 'Phone number is required to generate a trial pass.'
    });
  }

  const tokenNumber = nextTokenNumber++;
  const newPass = {
    tokenNumber,
    customerName: name || 'Valued Customer',
    phone,
    salesman: 'Bapi Da',
    counter: 'Counter 3 · Gariahat',
    size: size || 'M',
    status: 'Item pulled',
    occasion: 'Ashtami Morning',
    budget: '~₹3.5k',
    items: items || ['SKU #8821 Crimson Baluchari', 'SKU #7740 Ivory Jamdani'],
    validUntil: new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    }),
    createdAt: new Date().toISOString()
  };

  activePasses.unshift(newPass);

  res.status(201).json({
    success: true,
    message: 'In-store trial pass created successfully.',
    ...newPass
  });
});

// Merchant live queue endpoint
app.get('/api/merchant/queue', (req, res) => {
  res.json({
    success: true,
    stats: {
      waitingNow: activePasses.filter(p => p.status === 'Item pulled').length,
      inTrialRoom: activePasses.filter(p => p.status === 'In fitting room').length,
      soldToday: 7
    },
    passes: activePasses
  });
});

// Fallback SPA route: send index.html for any unhandled GET request
app.use((req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Start server when executed directly in Node.js
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✓ I Sell WebApp running on http://localhost:${PORT}`);
  });
}

module.exports = app;
