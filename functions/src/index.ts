import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { handleRecommendProducts } from './recommendProducts';
import { handleCreateReservation } from './createReservation';

admin.initializeApp();

// 1. Callable Cloud Function: recommendProducts
export const recommendProducts = functions.https.onCall(async (data, context) => {
  return handleRecommendProducts(data);
});

// 2. Callable Cloud Function: createReservation
export const createReservation = functions.https.onCall(async (data, context) => {
  return handleCreateReservation(data);
});

// 3. HTTP Endpoint for REST integration
export const api = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    if (req.path === '/recommend' && req.method === 'POST') {
      const result = await handleRecommendProducts(req.body);
      res.json({ success: true, ...result });
      return;
    }

    if (req.path === '/reservations' && req.method === 'POST') {
      const result = await handleCreateReservation(req.body);
      res.status(201).json({ success: true, reservation: result });
      return;
    }

    res.status(404).json({ error: 'Endpoint not found' });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Internal error' });
  }
});
