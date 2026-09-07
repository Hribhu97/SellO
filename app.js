/**
 * Entrypoint redirecting to server.js
 * Enables running `node app.js`, `node server.js`, or `npm start` interchangeably.
 */
const app = require('./server');

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✓ I Sell WebApp running on http://localhost:${PORT}`);
  });
}

module.exports = app;
