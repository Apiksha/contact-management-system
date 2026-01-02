# 🚀 QUICK REFERENCE CARD

## ⚡ Speed Run (Minimal Steps to Deploy)

### 1. Get MongoDB (2 minutes)

```
→ https://cloud.mongodb.com
→ Sign up → Create M0 cluster → Database Access → Add user
→ Network Access → Allow 0.0.0.0/0
→ Connect → Connection string → Copy
```

### 2. Configure & Test (1 minute)

```bash
cd /home/apiksha/Desktop/contact-management
# Edit server/.env and paste your MongoDB URI
nano server/.env  # or use VS Code

# Run it
npm install && npm run dev
# → Visit http://localhost:5173
```

### 3. Push to GitHub (1 minute)

```bash
git init
git add .
git commit -m "Contact Management App"
# Create repo on github.com
git remote add origin https://github.com/YOUR_USERNAME/contact-management.git
git branch -M main
git push -u origin main
```

### 4. Deploy Backend (3 minutes)

```
→ https://render.com → New Web Service
→ Connect GitHub repo
→ Root: server | Build: npm install | Start: npm start
→ Add env: MONGO_URI, PORT=5000, NODE_ENV=production
→ Create → Copy URL
```

### 5. Deploy Frontend (2 minutes)

```
→ Render → New Static Site
→ Same repo
→ Root: client | Build: npm install && npm run build | Publish: dist
→ Add env: VITE_API_URL=https://YOUR-BACKEND.onrender.com/api
→ Create → Copy URL
```

### 6. Submit (1 minute)

```
→ Test both URLs work
→ https://forms.gle/7Kw7ngPdYRvVuKWh6
→ Submit before 3rd Jan 2025, 6 PM
```

**Total Time: ~10 minutes** ⏱️

---

## 📝 Commands Cheat Sheet

```bash
# Install everything
npm install                  # Root
cd client && npm install     # Client
cd ../server && npm install  # Server

# Development
npm run dev                  # Both client + server
npm run dev:client          # Client only (port 5173)
npm run dev:server          # Server only (port 5000)

# Build
npm run build               # Build client for production
cd client && npm run build  # Same

# Production
npm start                   # Start server

# Clean restart
rm -rf node_modules package-lock.json
npm install
```

---

## 🔧 Environment Variables Quick Copy

### server/.env

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/contacts?retryWrites=true&w=majority
SERVE_CLIENT=false
```

### client/.env

```env
VITE_API_URL=/api
```

### Production (Render - Backend)

```env
MONGO_URI=mongodb+srv://...
PORT=5000
NODE_ENV=production
SERVE_CLIENT=false
```

### Production (Render - Frontend)

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 🐛 Troubleshooting One-Liners

```bash
# Can't connect to MongoDB?
node -e "require('dotenv').config({path:'server/.env'}); console.log(process.env.MONGO_URI)"

# Port in use?
lsof -ti:5173 | xargs kill -9    # Kill Vite
lsof -ti:5000 | xargs kill -9    # Kill Express

# Dependencies broken?
rm -rf node_modules package-lock.json && npm install

# Check if server is running
curl http://localhost:5000/api/health

# Check API from client
curl http://localhost:5173/api/contacts
```

---

## 📋 Pre-Submission Checklist

```
Local Testing:
□ npm run dev works
□ Can add contact
□ Can edit contact
□ Can delete contact
□ Data persists after refresh

GitHub:
□ Code pushed
□ Repo is public
□ README visible

Deployment:
□ Backend deployed (test /api/health)
□ Frontend deployed
□ Full CRUD works on live site
□ No console errors

Submission:
□ Have deployed URL: _______________
□ Have GitHub URL: _______________
□ Before deadline (3 Jan 2025, 6 PM)
□ Form: https://forms.gle/7Kw7ngPdYRvVuKWh6
```

---

## 🔗 Important URLs

| What            | URL                                 |
| --------------- | ----------------------------------- |
| MongoDB Atlas   | https://cloud.mongodb.com           |
| Render          | https://render.com                  |
| GitHub          | https://github.com                  |
| Submission Form | https://forms.gle/7Kw7ngPdYRvVuKWh6 |
| Local Client    | http://localhost:5173               |
| Local Server    | http://localhost:5000               |
| API Health      | http://localhost:5000/api/health    |

---

## 📚 Documentation Files

| File               | Purpose                 |
| ------------------ | ----------------------- |
| README.md          | Main documentation      |
| CHECKLIST.md       | Step-by-step guide      |
| DEPLOYMENT.md      | Deployment instructions |
| ARCHITECTURE.md    | System design           |
| PROJECT_SUMMARY.md | Overview                |
| setup.sh           | Auto-setup script       |

---

## 🎯 API Endpoints Quick Reference

```javascript
// GET all contacts
fetch("/api/contacts");

// GET one contact
fetch("/api/contacts/" + id);

// CREATE contact
fetch("/api/contacts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "John", email: "john@ex.com", phone: "123" }),
});

// UPDATE contact
fetch("/api/contacts/" + id, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Jane" }),
});

// DELETE contact
fetch("/api/contacts/" + id, { method: "DELETE" });
```

---

## 🆘 Emergency Contacts

**Stuck on MongoDB?**

- Check IP whitelist (0.0.0.0/0)
- Verify user has read/write permissions
- Test connection string format

**Deployment failing?**

- Check Render logs
- Verify Root Directory setting
- Check environment variables
- Ensure build/start commands are correct

**CORS errors?**

- Backend has `app.use(cors())`
- Frontend VITE_API_URL is correct
- Both services can reach each other

---

## 💡 Pro Tips

1. **Test locally FIRST** before deploying
2. **Use .gitignore** to avoid committing `.env` and `node_modules`
3. **Free tier Render** takes 30-60s to wake up (normal!)
4. **MongoDB free tier** is 512MB (plenty for this project)
5. **Keep it simple** - functionality > fancy UI
6. **Submit early** - don't wait until last minute

---

## ⏰ Timeline Suggestion

| Time      | Task                            |
| --------- | ------------------------------- |
| 0-10 min  | Set up MongoDB Atlas            |
| 10-15 min | Configure .env and test locally |
| 15-20 min | Push to GitHub                  |
| 20-30 min | Deploy to Render                |
| 30-40 min | Test deployed app thoroughly    |
| 40-45 min | Submit the form                 |
| **Total** | **~45 minutes**                 |

---

## 🎉 Success Indicators

✅ Local: http://localhost:5173 loads and works  
✅ Backend: Health check returns `{"status":"ok"}`  
✅ Frontend: Deployed site loads without errors  
✅ CRUD: All operations work on live site  
✅ Persistence: Data survives page refresh  
✅ Submission: Form submitted before deadline

---

**You've got this! 🚀**

Need help? Check the full docs in README.md and DEPLOYMENT.md
