# 📇 Contact Management Web App

A full-stack MERN (MongoDB, Express, React, Node.js) contact management application with CRUD functionality.

## ✨ Features

- ➕ Add new contacts with name, email, and phone
- ✏️ Edit existing contacts
- 🗑️ Delete contacts
- 📋 View all contacts in a clean, responsive UI
- 🔄 Real-time updates

## 🛠️ Tech Stack

**Frontend:**

- React 18
- Vite
- Fetch API

**Backend:**

- Node.js
- Express 5
- MongoDB + Mongoose
- CORS, Morgan

## 📁 Project Structure

```
contact-management/
├── client/              # React frontend
│   ├── src/
│   │   ├── App.jsx      # Main UI component
│   │   ├── App.css      # Styles
│   │   └── main.jsx     # Entry point
│   ├── vite.config.js   # Vite config with proxy
│   └── package.json
├── server/              # Express backend
│   ├── src/
│   │   ├── index.js     # Server entry
│   │   ├── app.js       # Express app setup
│   │   ├── db.js        # MongoDB connection
│   │   ├── models/
│   │   │   └── Contact.js
│   │   ├── routes/
│   │   │   └── contacts.js  # CRUD endpoints
│   │   └── middleware/
│   │       └── errorHandler.js
│   └── package.json
└── package.json         # Root scripts
```

## 🚀 Local Development

### Prerequisites

- Node.js 16+ and npm
- MongoDB Atlas account (or local MongoDB)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd contact-management
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create `server/.env`:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
   SERVE_CLIENT=false
   ```

   For MongoDB URI:

   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Go to Database → Connect → Connect your application
   - Copy the connection string and replace `<user>`, `<password>`, and `<db>`

   Create `client/.env` (optional):

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Run the application**

   **Option 1: Run both client and server together**

   ```bash
   npm run dev
   ```

   **Option 2: Run separately**

   ```bash
   # Terminal 1 - Server
   npm run dev:server

   # Terminal 2 - Client
   npm run dev:client
   ```

5. **Access the app**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## 📡 API Endpoints

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | `/api/contacts`     | Get all contacts   |
| GET    | `/api/contacts/:id` | Get contact by ID  |
| POST   | `/api/contacts`     | Create new contact |
| PUT    | `/api/contacts/:id` | Update contact     |
| DELETE | `/api/contacts/:id` | Delete contact     |

### Example Request Bodies

**Create Contact:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```

**Update Contact:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

## 🌐 Deployment

### Deploy to Render (Single Service)

This repo is Render-ready as a single Web Service (Express serves the built React app).

1. Create a new **Web Service** on Render and select this repo
2. Configure:
   - **Root Directory:** *(repo root)*
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
3. Set environment variables:
   - `MONGO_URI`: your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
   - `SERVE_CLIENT`: `true`

Notes:
- Render sets `PORT` automatically (don’t set it manually).
- The app will be available at the service URL; API routes are under `/api/*`.

**Option B: Deploy on Netlify**

1. Go to [Netlify](https://app.netlify.com/)
2. Click **Add new site** → **Import an existing project**
3. Connect GitHub and select your repo
4. Configure:
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `client/dist`
   - **Environment variables:**
     - `VITE_API_URL`: Your backend URL

**Option C: Single Service (Backend serves Frontend)**

1. Build the client locally:
   ```bash
   cd client && npm run build
   ```
2. Set `SERVE_CLIENT=true` in Render environment variables
3. Deploy only the server - it will serve the built React app from `client/dist`

### Option 2: Deploy to Railway

1. Go to [Railway](https://railway.app/)
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. Add MongoDB:
   - Click **New** → **Database** → **Add MongoDB**
   - Copy the connection string
5. Configure backend service:
   - **Root Directory:** `/server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - Add environment variables (MONGO_URI, PORT, etc.)
6. Configure frontend service (or use Vercel/Netlify for frontend)

### Option 3: Deploy to Vercel + MongoDB Atlas

**Backend (as Vercel Serverless Functions):**

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy from `server/` directory: `cd server && vercel`

**Frontend:**

1. Deploy from `client/` directory: `cd client && vercel`
2. Set environment variable `VITE_API_URL` to your backend URL

## 🧪 Testing

Test the API using curl or Postman:

```bash
# Health check
curl http://localhost:5000/api/health

# Get all contacts
curl http://localhost:5000/api/contacts

# Create a contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890"}'
```

## 📝 Environment Variables Reference

### Server (.env)

```env
PORT=5000                    # Server port
NODE_ENV=production          # Environment (development/production)
MONGO_URI=mongodb+srv://...  # MongoDB connection string
SERVE_CLIENT=true            # Serve built React app (true/false)
```

### Client (.env)

```env
VITE_API_URL=/api            # API base URL (use /api for proxy, or full URL for production)
```

## 🔧 Troubleshooting

**CORS Issues:**

- Make sure the backend allows requests from your frontend domain
- Check that `cors()` middleware is configured in `server/src/app.js`

**MongoDB Connection Failed:**

- Verify your connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas (Network Access)
- Ensure the database user has proper permissions

**Build Errors:**

- Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Ensure Node.js version is 16 or higher: `node --version`

## 📦 Production Build

```bash
# Build client
cd client && npm run build

# The dist folder contains optimized production files
```

## 🤝 Contributing

This is a technical assessment project. Feel free to fork and modify for your own use.

## 📄 License

ISC

## 👤 Author

Apiksha

---

**Built with ❤️ using the MERN stack**
