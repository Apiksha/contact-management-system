# 🚀 Quick Deployment Guide

## Before You Deploy - Get MongoDB Ready

1. **Create MongoDB Atlas Account (Free)**

   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free tier
   - Create a new cluster (M0 Free)
   - Wait 1-3 minutes for cluster to deploy

2. **Get Your Connection String**

   - In Atlas, click **Connect** on your cluster
   - Choose **Connect your application**
   - Copy the connection string (looks like: `mongodb+srv://...`)
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `contacts` or any name you like

3. **Whitelist IP Addresses**
   - In Atlas: Network Access → Add IP Address
   - Choose **Allow Access from Anywhere** (0.0.0.0/0) for easy deployment
   - Or add specific IPs of your deployment platform

---

## ⚡ FASTEST: Deploy to Render (Single Service)

### Step 1: Push to GitHub

```bash
cd /home/apiksha/Desktop/contact-management
git init
git add .
git commit -m "Initial commit - Contact Management App"
# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/contact-management.git
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to https://dashboard.render.com/
2. Click **New +** → **Web Service**
3. Connect your GitHub account and select the repository
4. Configure:
   - **Name:** `contact-management`
   - **Root Directory:** *(leave blank / repo root)*
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Click **Advanced** → Add Environment Variables:
   ```
   MONGO_URI = mongodb+srv://user:password@cluster.mongodb.net/contacts
   NODE_ENV = production
   SERVE_CLIENT = true
   ```
   Notes:
   - Render sets `PORT` automatically — do NOT set it manually.
   - The server will serve the built React app and the API from one URL.
6. Click **Create Web Service**

### Step 4: Done! ✅

Your app will be live at the Render URL (e.g., `https://contact-manager-app.onrender.com`)

**⚠️ Important:** Free tier services on Render spin down after 15 minutes of inactivity. First request after inactivity may take 30-60 seconds.

---

## 🔄 Alternative: Two-Service Deployment (API + Static Site)

If you prefer separate deployments:

- **Web Service** (root directory `server`) for the API
- **Static Site** (root directory `client`) for the UI

In that setup, set `VITE_API_URL` on the Static Site to `https://YOUR-API.onrender.com/api`.

---

## 🌐 Alternative Platforms

### Railway.app

- Click **Deploy on Railway**
- Connect GitHub
- Add MongoDB plugin
- Set environment variables
- Deploy in 2 clicks

### Vercel (Frontend only)

```bash
cd client
npm i -g vercel
vercel
# Follow prompts, set VITE_API_URL env var
```

### Netlify (Frontend only)

```bash
cd client
npm i -g netlify-cli
netlify deploy --prod
# Set VITE_API_URL in Netlify dashboard
```

---

## ✅ Verification Checklist

- [ ] MongoDB cluster is running and accessible
- [ ] Backend deployed and `/api/health` returns `{"status":"ok"}`
- [ ] Frontend deployed and loads without errors
- [ ] Can add a new contact
- [ ] Can edit a contact
- [ ] Can delete a contact
- [ ] Changes persist after page refresh

---

## 🆘 Common Issues

**"Cannot connect to MongoDB"**

- Check that MONGO_URI is correct in environment variables
- Verify IP whitelist in MongoDB Atlas (use 0.0.0.0/0 for all)

**"API calls fail with CORS error"**

- Ensure backend has `cors()` middleware enabled
- Check that VITE_API_URL points to the correct backend URL

**"Frontend shows blank page"**

- Check browser console for errors
- Verify VITE_API_URL is set correctly
- Ensure backend is running and accessible

**"Free tier is slow"**

- This is normal for Render free tier (cold starts)
- First request may take 30-60 seconds
- Consider upgrading or using Railway/Fly.io

---

## 📋 Submission Checklist for Assignment

Before submitting via the Google Form:

1. **Deployed Application Link:**

   - Test it thoroughly
   - Ensure it's publicly accessible
   - Format: `https://your-app.onrender.com`

2. **GitHub Repository Link:**

   - Make sure repo is public
   - Include the README.md
   - Add a `.gitignore` for node_modules
   - Format: `https://github.com/username/contact-management`

3. **Test the Full Flow:**

   - Open the deployed app
   - Add 2-3 contacts
   - Edit one
   - Delete one
   - Refresh the page - data should persist

4. **Submit on Time:**
   - Deadline: 3rd January 2025, 6:00 PM
   - Form: https://forms.gle/7Kw7ngPdYRvVuKWh6

---

Good luck! 🍀
