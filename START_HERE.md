# 🚀 START HERE - Quick Start Guide

## ⚠️ IMPORTANT: Backend Server Not Running

The error `ERR_CONNECTION_REFUSED` means the backend server is not running on port 8000.

## 📋 Step-by-Step Startup

### Option 1: Automatic Startup (Recommended)

```bash
# From the project root directory
./start-backend.sh
```

This will:
- Check if virtual environment exists
- Install dependencies if needed
- Start the backend server on port 8000

### Option 2: Manual Startup

**Terminal 1 - Backend:**
```bash
cd server
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r ../requirements.txt
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## ✅ Verify Backend is Running

Open a new terminal and run:
```bash
curl http://localhost:8000/
```

You should see:
```json
{"message":"Welcome to Hope Epicure API"}
```

Or visit in browser: http://localhost:8000/docs

## 🔧 Troubleshooting

### Issue: "ModuleNotFoundError"
**Solution:**
```bash
cd server
source venv/bin/activate
pip install -r ../requirements.txt
```

### Issue: "Port 8000 already in use"
**Solution:**
```bash
# Find and kill the process
lsof -ti:8000 | xargs kill -9
# Then restart
uvicorn main:app --reload
```

### Issue: ".env file not found"
**Solution:**
```bash
cd server
cp .env.example .env
# Edit .env with your API keys
nano .env
```

### Issue: "Database error"
**Solution:**
```bash
cd server
rm hope_bakery.db  # Delete old database
# Restart server - it will create a new one
```

## 📝 Required Environment Variables

Create `server/.env` with:
```env
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MJ_APIKEY_PUBLIC=your_mailjet_public_key
MJ_APIKEY_PRIVATE=your_mailjet_private_key
HOPE_EMAIL=hope@example.com
```

## 🎯 Complete Startup Checklist

- [ ] Backend server running on port 8000
- [ ] Frontend server running on port 5173 or 5174
- [ ] .env file created with API keys
- [ ] Database file created (hope_bakery.db)
- [ ] No errors in terminal
- [ ] Can access http://localhost:8000/docs
- [ ] Can access http://localhost:5173 or 5174

## 🚦 Current Status Check

Run this command to check everything:
```bash
# Check backend
curl http://localhost:8000/ 2>/dev/null && echo "✅ Backend OK" || echo "❌ Backend NOT running"

# Check frontend
curl http://localhost:5173/ 2>/dev/null && echo "✅ Frontend OK" || echo "❌ Frontend NOT running"
```

## 💡 Quick Fix for Your Current Error

**Your error:** `POST http://localhost:8000/auth/signup net::ERR_CONNECTION_REFUSED`

**This means:** Backend server is not running

**Fix:**
1. Open a new terminal
2. Run:
   ```bash
   cd server
   source venv/bin/activate
   uvicorn main:app --reload
   ```
3. Wait for: `Uvicorn running on http://127.0.0.1:8000`
4. Try signup again in the browser

## 📞 Need Help?

If you see:
- ✅ `INFO:     Uvicorn running on http://127.0.0.1:8000` → Backend is running
- ✅ `VITE v5.x.x ready in xxx ms` → Frontend is running
- ✅ `Local: http://localhost:5173/` → Frontend URL

Then everything is working!

## 🎬 After Starting

1. Visit: http://localhost:5173
2. Click "Get Started" or "Login"
3. Try signing up with:
   - Email: test@example.com
   - Password: password123
4. Should work without errors!
