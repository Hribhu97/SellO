# I Sell — Puja Shopping WebApp

A Node.js and Express fullstack web application designed for personal in-store shopping during Durga Puja, fully optimized for deployment on **Vercel**.

---

## 📁 Project Structure

```text
WEBApp/
├── api/
│   └── index.js          # Vercel serverless function entrypoint
├── public/               # Client-facing static assets (served by Vercel CDN & Express)
│   ├── index.html        # Main single-page application UI
│   ├── styles.css        # Responsive styling & typography
│   └── app.js            # Client-side UI interactions & pass generator
├── app.js                # Root bridge entrypoint (delegates to server.js)
├── server.js             # Node.js Express server with static file serving & REST API
├── vercel.json           # Vercel configuration & API routing
├── package.json          # Dependencies, scripts, and Node.js engines
└── .gitignore            # Excludes node_modules and .vercel artifacts
```

---

## 🚀 Running Locally with Node.js

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
You can use either command:
```bash
npm start
```
or
```bash
node server.js
```
or even:
```bash
node app.js
```

### 3. Open in Browser
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and uptime |
| `GET` | `/api/products` | In-store curated inventory catalog |
| `POST` | `/api/pass` | Generate an in-store trial room pass |
| `GET` | `/api/merchant/queue` | Real-time merchant queue and status |

---

## ☁️ Deploying to Vercel

### Method 1: Using Vercel CLI
1. Install Vercel globally (or use `npx`):
   ```bash
   npx vercel
   ```
2. Follow the prompts in your terminal to link the project and deploy.
3. For production deployment:
   ```bash
   npx vercel --prod
   ```

### Method 2: Via Git / Vercel Dashboard
1. Push this folder to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your repository.
4. Vercel automatically detects the project settings from `package.json` and `vercel.json`.
5. Click **Deploy**.

Static assets in `public/` are served instantly via Vercel's global CDN, while backend API requests to `/api/*` are handled by serverless Node.js functions.
