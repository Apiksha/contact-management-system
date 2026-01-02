# ✅ QUICK START CHECKLIST

## Local Development (Test Before Deploying)

### 1️⃣ Get MongoDB Connection String

- [ ] Go to https://cloud.mongodb.com
- [ ] Sign up / Log in (free tier available)
- [ ] Create new cluster (M0 Free tier)
- [ ] Database Access → Add new user → Remember username/password
- [ ] Network Access → Add IP → Allow from anywhere (0.0.0.0/0)
- [ ] Clusters → Connect → Connect your application
- [ ] Copy connection string (starts with `mongodb+srv://`)

### 2️⃣ Configure Environment

- [ ] Open `server/.env`
- [ ] Replace `your_mongodb_connection_string_here` with your MongoDB URI
- [ ] Replace `<password>` in the URI with your database password
- [ ] Save the file

Example:

```env
MONGO_URI=mongodb+srv://myuser:mypassword123@cluster0.xxxxx.mongodb.net/contacts?retryWrites=true&w=majority
```

### 3️⃣ Install & Run

```bash
# Option 1: Use the setup script
./setup.sh

# Option 2: Manual install
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..

# Run both client and server
npm run dev
```

### 4️⃣ Test Locally

- [ ] Open http://localhost:5173
- [ ] Add a contact (name is required)
- [ ] Edit the contact
- [ ] Delete the contact
- [ ] Refresh page - verify everything works
- [ ] Check console for errors (F12)

---

## Deployment Checklist

### 5️⃣ Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Contact Management App"

# Create repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/contact-management.git
git branch -M main
git push -u origin main
```

- [ ] Repository is public
- [ ] All files are pushed
- [ ] README.md is visible

### 6️⃣ Deploy Backend (Render)

- [ ] Go to https://render.com/
- [ ] Sign up / Log in with GitHub
- [ ] New + → Web Service
- [ ] Connect repository
- [ ] Root Directory: `server`
- [ ] Build: `npm install`
- [ ] Start: `npm start`
- [ ] Add env vars:
  - `MONGO_URI` = your connection string
  - `PORT` = 5000
  - `NODE_ENV` = production
- [ ] Click Create Web Service
- [ ] Wait for deployment (2-3 minutes)
- [ ] **Copy the service URL** (you'll need this next)
- [ ] Test: Visit `https://YOUR-SERVICE.onrender.com/api/health`
  - Should return: `{"status":"ok"}`

### 7️⃣ Deploy Frontend (Render)

- [ ] New + → Static Site
- [ ] Same repository
- [ ] Root Directory: `client`
- [ ] Build: `npm install && npm run build`
- [ ] Publish: `dist`
- [ ] Add env var:
  - `VITE_API_URL` = `https://YOUR-BACKEND-URL.onrender.com/api`
- [ ] Click Create Static Site
- [ ] Wait for deployment
- [ ] **Copy the site URL**

### 8️⃣ Final Testing

- [ ] Visit your deployed frontend URL
- [ ] Add a contact
- [ ] Edit it
- [ ] Delete it
- [ ] Refresh page - data persists
- [ ] Open in mobile browser - works responsively
- [ ] No console errors

### 9️⃣ Submit Assignment

- [ ] Deployed URL works: **********\_\_\_**********
- [ ] GitHub repo link: **********\_\_\_**********
- [ ] Tested full CRUD flow
- [ ] Before deadline: **3rd January 2025, 6:00 PM**
- [ ] Submit at: https://forms.gle/7Kw7ngPdYRvVuKWh6

---

## 🆘 Troubleshooting

**Can't connect to MongoDB locally?**

```bash
# Check if MONGO_URI is set correctly
cat server/.env | grep MONGO_URI

# Test connection
node -e "require('dotenv').config({path:'server/.env'}); console.log(process.env.MONGO_URI)"
```

**Port 5173 or 5000 already in use?**

```bash
# Kill process on port
lsof -ti:5173 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

**Dependencies not installing?**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**API calls failing?**

- Check browser console (F12)
- Verify backend is running: `curl http://localhost:5000/api/health`
- Check CORS is enabled in server/src/app.js
- Verify VITE_API_URL in client/.env

**Deployment failing?**

- Check Render logs (click on service → Logs tab)
- Verify environment variables are set correctly
- Make sure Root Directory is correct (server or client)
- Check that MONGO_URI has correct password

---

## 📞 Need Help?

1. Check the full [README.md](README.md)
2. Read [DEPLOYMENT.md](DEPLOYMENT.md)
3. Check Render/MongoDB logs for specific errors
4. Google the error message
5. Check MongoDB Atlas:
   - IP whitelist
   - User permissions
   - Cluster status

---

**Remember:** Free tier services may take 30-60 seconds to "wake up" on first request after being idle!

Good luck with your submission! 🚀
