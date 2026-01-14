# 🔥 FIX ALL ERRORS - START HERE

## ⚠️ Current Problem

You're seeing these errors:
- `ERR_CONNECTION_REFUSED`
- `Network Error`
- Failed to load products
- Failed to login/signup

**Root Cause:** Backend server is NOT running on port 8000

## ✅ ONE-COMMAND FIX

Run this single command to start everything:

```bash
./start-all.sh
```

This will:
1. ✅ Start backend on port 8000
2. ✅ Start frontend on port 5173/5174 (if not running)
3. ✅ Install dependencies if needed
4. ✅ Create database automatically
5. ✅ Show you all URLs to access

## 🎯 After Running start-all.sh

You'll see:
```
╔══════════════════════════════════════════════════════════════════════╗
║                    ✅ ALL SERVERS RUNNING                            ║
╚══════════════════════════════════════════════════════════════════════╝

🌐 Access your application:

   Landing:  http://localhost:5173/
   Products: http://localhost:5173/products
   Login:    http://localhost:5173/login
   Admin:    http://localhost:5173/admin

   API:      http://localhost:8000
   API Docs: http://localhost:8000/docs
```

## 🔄 What to Do Next

1. **Refresh your browser** (press F5)
2. **Try the actions again:**
   - Go to `/login` → Sign up
   - Go to `/admin` → Add product
   - Go to `/products` → View products

**All errors will be GONE!** ✅

## 🛑 To Stop Servers

```bash
./stop-servers.sh
```

## 📊 Check Server Status Anytime

```bash
./check-status.sh
```

## 🔍 If start-all.sh Doesn't Work

**Manual Start (2 terminals):**

**Terminal 1 - Backend:**
```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r ../requirements.txt
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## ✅ Verify Everything Works

After starting servers, test these URLs:

1. **Backend Health:**
   ```bash
   curl http://localhost:8000/
   ```
   Should return: `{"message":"Welcome to Hope Epicure API"}`

2. **Frontend:**
   Open browser: http://localhost:5173

3. **API Docs:**
   Open browser: http://localhost:8000/docs

## 🎯 Test Complete Flow

1. Visit http://localhost:5173
2. Click "Get Started" or "Login"
3. Sign up with:
   - Email: test@example.com
   - Password: password123
4. Should work without errors! ✅

## 📝 Common Issues

### "Permission denied: ./start-all.sh"
```bash
chmod +x start-all.sh
./start-all.sh
```

### "Port 8000 already in use"
```bash
./stop-servers.sh
./start-all.sh
```

### "Module not found"
```bash
cd server
source venv/bin/activate
pip install -r ../requirements.txt
```

## 🎉 Success Indicators

You'll know everything is working when:
- ✅ No `ERR_CONNECTION_REFUSED` errors
- ✅ No `Network Error` messages
- ✅ Products load in admin dashboard
- ✅ Login/signup works
- ✅ Can add products
- ✅ Can place orders

## 🚀 Quick Commands Reference

```bash
# Start everything
./start-all.sh

# Check status
./check-status.sh

# Stop everything
./stop-servers.sh

# View backend logs
tail -f backend.log

# View frontend logs
tail -f frontend.log
```

---

## 💡 Why This Fixes Everything

The errors you're seeing are NOT code bugs. They're connection errors because:

1. Frontend (React) is running on port 5173 ✅
2. Backend (FastAPI) is NOT running on port 8000 ❌

When frontend tries to call backend APIs:
- `GET http://localhost:8000/products` → Connection refused
- `POST http://localhost:8000/auth/login` → Connection refused
- `POST http://localhost:8000/auth/signup` → Connection refused

**Solution:** Start the backend server!

Once backend is running:
- ✅ All API calls work
- ✅ No more connection errors
- ✅ Everything functions perfectly

---

## 🎯 TL;DR

**Run this ONE command:**
```bash
./start-all.sh
```

**Then refresh your browser. Done!** ✅
