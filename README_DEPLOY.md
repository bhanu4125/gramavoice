# Deployment guide — Free hosts

This project can be deployed to several free or low-cost hosts. Below are step-by-step options for Fly.io and Railway, plus a quick fallback (Replit) for a public URL.

Common prerequisites
- Have a GitHub repo for this project (recommended).
- MongoDB Atlas free cluster (whitelisted IP or 0.0.0.0/0 while testing).
- Values to set as environment variables: `MONGODB_URI`, `JWT_SECRET`.

Option A — Fly.io (recommended for full Node server + socket.io)
1. Install `flyctl`: https://fly.io/docs/hands-on/install-flyctl/
2. From project root:
```
flyctl launch --name gramavoice --org personal --image "" 
```
When prompted, choose a region. If asked to create a Dockerfile, say no (we provide one).
3. Set secrets and environment variables:
```
flyctl secrets set MONGODB_URI="<your-uri>" JWT_SECRET="<your-secret>"
```
4. Deploy:
```
flyctl deploy
```
5. View app URL from `flyctl status` or the dashboard. Use MongoDB Atlas UI to view collections.

Option B — Render.com (recommended for free Node hosting)
1. Create a Render account at https://render.com and connect your GitHub repo.
2. Add a new Web Service and choose the repo branch.
3. Render will detect `render.yaml` and use these settings automatically.
4. In the Render dashboard, add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
5. Use the free plan and deploy.

Render notes:
  - `render.yaml` is already configured for `node`, `npm install`, `node server.js`, and `free` plan.
  - Set `MONGODB_URI` and `JWT_SECRET` in Render Dashboard Secrets.
  - Use MongoDB Atlas UI to inspect your database once the app is live.

Option C — Railway.app (easy GitHub integration)
1. Create a Railway account, create a new project, and connect your GitHub repo.
2. Add environment variables via Railway dashboard: `MONGODB_URI`, `JWT_SECRET`.
3. Railway will detect the project and run `npm install` then `npm start` (our `start` script runs `node server.js`).

1. Create a new Repl, choose Node.js, and upload this repo.
2. Add environment variables in the Secrets/ENV panel.
3. Start the Repl; you’ll get a public URL (may sleep on inactivity).

Checking the database
- Use MongoDB Atlas web UI: https://cloud.mongodb.com to inspect data, users, and collections.
- Optionally install `mongosh` locally and connect using your connection string.

Security notes
- Do NOT commit `.env` or secrets to Git. Use provider secret management.
- Restrict Atlas IP access for production and use strong `JWT_SECRET`.

If you want, I can: connect the repo to Fly.io or Railway for you (you'll need to authorize), or run a local Docker build and test the container here first.

Publishing container image via GitHub
-----------------------------------
This repository includes a GitHub Actions workflow that builds a Docker image and publishes it to GitHub Container Registry on pushes to `main`.

- To use that workflow, push this repo to GitHub (create repo, push `main`).
- GitHub will build and publish an image at `ghcr.io/<your-org-or-username>/gramavoice:latest`.
- After the image is published you can deploy it to Fly.io, Railway, or any host that accepts container images.

There is a helper script `scripts/deploy_fly.sh` (requires `flyctl`) that will deploy the GHCR image to Fly when you set `FLY_API_TOKEN`.

