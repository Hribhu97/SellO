const app = require('../server');

const server = app.listen(3499, async () => {
  console.log('✓ Verification server started on port 3499\n');

  async function request(url, options = {}) {
    const res = await fetch('http://localhost:3499' + url, options);
    const contentType = res.headers.get('content-type') || '';
    const body = contentType.includes('application/json') ? await res.json() : await res.text();
    return { status: res.status, headers: res.headers, body };
  }

  let failures = 0;
  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      failures++;
    } else {
      console.log(`✓ PASS: ${message}`);
    }
  }

  try {
    // 1. Store Config
    const shopRes = await request('/api/shop');
    assert(shopRes.status === 200, 'GET /api/shop returned 200');
    assert(shopRes.body.shop?.name === 'Maa Tara Bastralaya', 'Shop name is Maa Tara Bastralaya');
    assert(shopRes.body.shop?.location === 'Gariahat, Kolkata', 'Shop location is Gariahat, Kolkata');

    // 2. Products Catalog
    const prodRes = await request('/api/products');
    assert(prodRes.status === 200, 'GET /api/products returned 200');
    assert(prodRes.body.count >= 20, `Products inventory has ${prodRes.body.count} items (minimum 20 required)`);

    // Verify categories
    const categories = new Set(prodRes.body.products.map(p => p.category));
    assert(categories.has('Sarees'), 'Inventory includes Sarees');
    assert(categories.has('Kurtas'), 'Inventory includes Kurtas');
    assert(categories.has('Kurta sets'), 'Inventory includes Kurta sets');
    assert(categories.has('Dresses'), 'Inventory includes Dresses');
    assert(categories.has('Shirts'), 'Inventory includes Shirts');

    // 3. AI Recommendation Engine (Puja traditional ₹2,000–₹4,000)
    const rec1 = await request('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        occasion: 'Puja',
        budget: '₹2,000–₹4,000',
        style: 'Traditional',
        colour: 'Festive',
        size: 'M'
      })
    });
    assert(rec1.status === 200, 'POST /api/recommend returned 200');
    assert(rec1.body.recommendations?.length === 3, 'Returns exactly 3 recommended looks');
    assert(rec1.body.recommendations[0]?.match_reason?.length > 0, 'First recommendation has valid match reason');

    // Verify recommended products are real products from inventory
    for (const r of rec1.body.recommendations) {
      const exists = prodRes.body.products.some(p => p.id === r.id);
      assert(exists, `Recommended product ${r.id} (${r.name}) is a real inventory product`);
      assert(r.is_available === true, `Product ${r.name} is available in stock`);
    }

    // 4. In-Store Counter Reservation Flow
    const testProd = rec1.body.recommendations[0];
    
    // Invalid phone rejection test
    const failRes = await request('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: testProd.id,
        customer_name: 'Debjit Bose',
        customer_phone: '12345' // invalid short phone
      })
    });
    assert(failRes.status === 400, 'Short mobile number correctly rejected with 400 Bad Request');

    // Valid reservation test
    const validRes = await request('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: testProd.id,
        customer_name: 'Debjit Bose',
        customer_phone: '9830198301',
        selected_size: 'M',
        selected_colour: testProd.colours[0]
      })
    });
    assert(validRes.status === 201, 'POST /api/reservations created reservation with 201 Created');
    assert(validRes.body.reservation?.id?.startsWith('RES-'), `Reservation ID generated: ${validRes.body.reservation?.id}`);
    assert(validRes.body.reservation?.status === 'Pending', 'Initial reservation status is Pending');
    assert(validRes.body.reservation?.final_price === testProd.price, `Final price accurately recorded: ₹${testProd.price}`);

    const resId = validRes.body.reservation.id;

    // 5. Merchant View Reservations
    const listRes = await request('/api/reservations');
    assert(listRes.status === 200, 'GET /api/reservations returned 200');
    const found = listRes.body.reservations.find(r => r.id === resId);
    assert(!!found, `Created reservation ${resId} appears in merchant queue`);

    // 6. Merchant Update Status
    const updateRes = await request(`/api/reservations/${resId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Confirmed' })
    });
    assert(updateRes.status === 200, 'PATCH /api/reservations/:id returned 200');
    assert(updateRes.body.reservation?.status === 'Confirmed', 'Reservation status updated to Confirmed');

    // 7. Merchant Stats
    const statsRes = await request('/api/stats');
    assert(statsRes.status === 200, 'GET /api/stats returned 200');
    assert(statsRes.body.stats?.confirmedReservations >= 1, 'Stats confirm at least 1 confirmed reservation');

    // 8. Analytics Event
    const analyticsRes = await request('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'recommendations_viewed',
        payload: { count: 3 }
      })
    });
    assert(analyticsRes.status === 200, 'POST /api/analytics logged event successfully');

    // 9. Static Frontend HTML & Screens
    const htmlRes = await request('/');
    assert(htmlRes.status === 200, 'GET / returned 200 OK');
    const html = htmlRes.body;
    assert(html.includes('id="screenLanding"'), 'HTML includes Screen 1 (Landing)');
    assert(html.includes('id="screenIntent"'), 'HTML includes Screen 2 (Intent)');
    assert(html.includes('id="screenPreferences"'), 'HTML includes Screen 3 (Preferences)');
    assert(html.includes('id="screenRecommendations"'), 'HTML includes Screen 4 (Recommendations)');
    assert(html.includes('id="screenProductDetail"'), 'HTML includes Screen 5 (Product Detail)');
    assert(html.includes('id="screenReservation"'), 'HTML includes Screen 6 (Reservation Form)');
    assert(html.includes('id="screenConfirmation"'), 'HTML includes Screen 7 (Confirmation)');
    assert(html.includes('id="screenMerchant"'), 'HTML includes Merchant View');
    assert(html.includes('langToggleBtn'), 'HTML includes Language Toggle');

    console.log(`\n=============================================`);
    if (failures === 0) {
      console.log(`🎉 ALL 20 VERIFICATION CHECKS PASSED WITH ZERO ERRORS!`);
    } else {
      console.error(`⚠️ ${failures} CHECKS FAILED!`);
      process.exitCode = 1;
    }
    console.log(`=============================================\n`);
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exitCode = 1;
  } finally {
    setTimeout(() => {
      server.close();
      process.exit(failures === 0 ? 0 : 1);
    }, 100);
  }
});
