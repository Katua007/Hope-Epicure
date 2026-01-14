# Hope Epicure - Quick Reference Card

## 🚀 Quick Start Commands

### First Time Setup
```bash
# Backend
cd server
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r ../requirements.txt
cp .env.example .env
# Edit .env with your credentials
python test_setup.py  # Verify setup

# Frontend
cd ../frontend
npm install
```

### Start Application
```bash
# Quick start (from root)
./start.sh

# OR manually:
# Terminal 1
cd server && source venv/bin/activate && uvicorn main:app --reload

# Terminal 2
cd frontend && npm run dev
```

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |
| Home Page | http://localhost:5173/ |
| Login | http://localhost:5173/login |
| Admin | http://localhost:5173/admin |

## 📁 Key Files

| File | Purpose |
|------|---------|
| `server/main.py` | API routes |
| `server/.env` | Credentials (DO NOT COMMIT) |
| `server/hope_bakery.db` | Database |
| `frontend/src/src/pages/Home.jsx` | Customer view |
| `frontend/src/src/pages/AdminDashboard.jsx` | Admin view |
| `frontend/src/src/components/AdminProductForm.jsx` | Add products |

## 🔧 Common Commands

### Backend
```bash
# Start server
uvicorn main:app --reload

# Test setup
python test_setup.py

# Reset database
rm hope_bakery.db
# Restart server to recreate

# View logs
# Check terminal output
```

### Frontend
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new package
npm install package-name
```

## 🐛 Debugging

### Check Backend Status
```bash
curl http://localhost:8000/
# Should return: {"message":"Welcome to Hope Epicure API"}

curl http://localhost:8000/products
# Should return: JSON array of products
```

### Check Frontend
- Open browser console (F12)
- Check for errors
- Verify API calls in Network tab

### Common Fixes
```bash
# Backend not starting
cd server
source venv/bin/activate
python test_setup.py

# Frontend not starting
cd frontend
rm -rf node_modules package-lock.json
npm install

# Port already in use
# Backend: kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Frontend: kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

## 📝 Environment Variables

Create `server/.env`:
```env
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MJ_APIKEY_PUBLIC=your_mailjet_public
MJ_APIKEY_PRIVATE=your_mailjet_private
HOPE_EMAIL=hope@example.com
```

## 🔑 Get API Keys

| Service | URL | What to Get |
|---------|-----|-------------|
| Cloudinary | https://cloudinary.com | Cloud Name, API Key, API Secret |
| Mailjet | https://mailjet.com | API Key, Secret Key |

## 📊 Database Schema

### Products Table
- id (int)
- name (string)
- description (string)
- price (float)
- flavor (string)
- image_url (string)
- is_available (boolean)

### Orders Table
- id (int)
- customer_name (string)
- customer_email (string)
- product_name (string)
- flavor (string)
- quantity (int)
- status (string)

### Users Table
- id (int)
- email (string)
- hashed_password (string)
- is_admin (boolean)

## 🎯 Testing Workflow

1. Start both servers
2. Go to `/admin`
3. Add product with image
4. Go to `/` (home)
5. Click "Order Now"
6. Sign up/login
7. Place order
8. Check email

## 📦 Dependencies

### Backend (Python)
- fastapi - Web framework
- sqlalchemy - Database ORM
- cloudinary - Image storage
- mailjet-rest - Email service
- passlib - Password hashing
- python-jose - JWT tokens
- uvicorn - ASGI server

### Frontend (JavaScript)
- react - UI framework
- react-router-dom - Routing
- axios - HTTP client
- tailwindcss - Styling

## 🔒 Security Notes

- Never commit `.env` file
- Passwords are hashed (bcrypt)
- JWT tokens expire in 60 minutes
- CORS configured for localhost only
- Change SECRET_KEY in production

## 📚 Documentation Files

- `README.md` - Main documentation
- `SETUP.md` - Setup instructions
- `PROJECT_OVERVIEW.md` - Architecture
- `STATUS.md` - Current status
- `QUICK_REFERENCE.md` - This file

## 🆘 Get Help

1. Check STATUS.md for known issues
2. Run test_setup.py for diagnostics
3. Check browser console for errors
4. Check terminal for backend errors
5. Verify .env file exists and is correct

## ✅ Health Check

```bash
# Backend health
curl http://localhost:8000/

# Frontend health
curl http://localhost:5173/

# Database exists
ls server/hope_bakery.db

# Environment variables
cd server && python -c "from dotenv import load_dotenv; import os; load_dotenv(); print('✅ OK' if os.getenv('CLOUDINARY_NAME') else '❌ Missing')"
```

---

**Quick Tip:** Keep this file open while developing!
