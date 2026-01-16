# 🚀 Vercel Deployment Guide - Hope Epicure

## ⚠️ Important Note

Vercel is designed for **frontend only**. For the backend (FastAPI), you have two options:

### Option 1: Deploy Backend Separately (Recommended)
- **Railway.app** (Free tier, easy Python deployment)
- **Render.com** (Free tier, supports Python)
- **Fly.io** (Free tier, supports Python)

### Option 2: Use Vercel Serverless Functions (Limited)
- Vercel can run Python serverless functions
- **Limitations:** No persistent SQLite database, cold starts, 10-second timeout
- **Better for:** Stateless APIs, not for this project with database

## 📋 Deployment Steps

### Part 1: Deploy Backend (Railway - Recommended)

#### 1. Sign up for Railway
- Go to https://railway.app
- Sign up with GitHub

#### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Connect your GitHub account
- Select your Hope-Epicure repository

#### 3. Configure Backend
- Railway will auto-detect Python
- Set root directory to `/server`
- Add environment variables:
  ```
  CLOUDINARY_NAME=your_cloudinary_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  MJ_APIKEY_PUBLIC=your_mailjet_public_key
  MJ_APIKEY_PRIVATE=your_mailjet_private_key
  HOPE_EMAIL=hope@example.com
  ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
  ```

#### 4. Add Start Command
- In Railway settings, set start command:
  ```
  uvicorn main:app --host 0.0.0.0 --port $PORT
  ```

#### 5. Deploy
- Railway will automatically deploy
- Copy your backend URL (e.g., `https://hope-epicure-backend.up.railway.app`)

---

### Part 2: Deploy Frontend (Vercel)

#### 1. Sign up for Vercel
- Go to https://vercel.com
- Sign up with GitHub

#### 2. Import Project
- Click "Add New" → "Project"
- Import your Hope-Epicure repository
- Select the `frontend` directory as root

#### 3. Configure Build Settings
Vercel should auto-detect Vite, but verify:
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

#### 4. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
```
VITE_API_URL=https://your-backend-url.up.railway.app
```
(Use your Railway backend URL from Part 1)

#### 5. Deploy
- Click "Deploy"
- Wait for build to complete
- Your frontend will be live at `https://your-project.vercel.app`

---

## 🔧 Post-Deployment Configuration

### Update CORS on Backend
After deploying frontend, update Railway environment variables:
```
ALLOWED_ORIGINS=https://your-project.vercel.app,https://your-project-*.vercel.app
```

### Update Frontend API URL
If you change backend URL, update Vercel environment variable:
```
VITE_API_URL=https://new-backend-url.up.railway.app
```
Then redeploy frontend.

---

## 📝 Pre-Deployment Checklist

### Backend (Railway)
- [ ] Push code to GitHub
- [ ] Have Cloudinary credentials ready
- [ ] Have Mailjet credentials ready
- [ ] Set HOPE_EMAIL for order notifications

### Frontend (Vercel)
- [ ] Push code to GitHub
- [ ] Have backend URL ready
- [ ] Test locally first

---

## 🧪 Testing Deployment

### Test Backend
```bash
curl https://your-backend-url.up.railway.app/
# Should return: {"message":"Welcome to Hope Epicure API"}

curl https://your-backend-url.up.railway.app/products
# Should return: [] or list of products
```

### Test Frontend
1. Visit `https://your-project.vercel.app`
2. Try signing up
3. Try adding a product (admin)
4. Try placing an order

---

## 🔄 Continuous Deployment

Both Vercel and Railway support automatic deployments:
- Push to GitHub → Automatic deployment
- No manual steps needed after initial setup

---

## 💾 Database Considerations

### Current Setup (SQLite)
- ⚠️ SQLite doesn't work well on serverless platforms
- Files are ephemeral (reset on each deployment)

### Recommended: Upgrade to PostgreSQL

#### Option 1: Railway PostgreSQL (Free)
1. In Railway, add PostgreSQL database
2. Update `server/database.py`:
```python
import os
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./hope_bakery.db")
engine = create_engine(DATABASE_URL)
```
3. Install psycopg2: `pip install psycopg2-binary`
4. Add to requirements.txt

#### Option 2: Supabase (Free PostgreSQL)
1. Sign up at https://supabase.com
2. Create new project
3. Get connection string
4. Add to Railway environment variables

---

## 📊 Cost Breakdown

### Free Tier Limits

**Railway:**
- $5 free credit per month
- Enough for small projects
- Upgrade: $5/month for more resources

**Vercel:**
- 100GB bandwidth/month
- Unlimited deployments
- Free for personal projects

**Cloudinary:**
- 25 GB storage
- 25 GB bandwidth/month
- Free tier

**Mailjet:**
- 200 emails/day
- 6,000 emails/month
- Free tier

---

## 🚨 Common Issues

### Issue: CORS errors after deployment
**Fix:** Add your Vercel URL to ALLOWED_ORIGINS in Railway

### Issue: Database resets on Railway
**Fix:** Upgrade to PostgreSQL (see Database Considerations)

### Issue: Images not uploading
**Fix:** Verify Cloudinary credentials in Railway environment variables

### Issue: Emails not sending
**Fix:** Verify Mailjet credentials in Railway environment variables

---

## 📚 Alternative Deployment Options

### Backend Alternatives:
1. **Render.com** - Similar to Railway, free tier
2. **Fly.io** - Free tier, good for Python
3. **PythonAnywhere** - Free tier, easy setup
4. **Heroku** - No longer has free tier

### Frontend Alternatives:
1. **Netlify** - Similar to Vercel
2. **GitHub Pages** - Free, but static only
3. **Cloudflare Pages** - Free, fast CDN

---

## ✅ Quick Start Commands

### Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/hope-epicure.git
git push -u origin main
```

### Local Testing Before Deploy
```bash
# Backend
cd server
source venv/bin/activate
uvicorn main:app --reload

# Frontend
cd frontend
npm run build
npm run preview
```

---

## 🎯 Deployment Summary

1. ✅ Push code to GitHub
2. ✅ Deploy backend to Railway
3. ✅ Deploy frontend to Vercel
4. ✅ Configure environment variables
5. ✅ Update CORS settings
6. ✅ Test the live site
7. ✅ Enjoy your deployed app!

---

## 📞 Support

If you encounter issues:
1. Check Railway logs for backend errors
2. Check Vercel logs for frontend errors
3. Verify all environment variables are set
4. Test API endpoints directly with curl

---

**Your app will be live at:**
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.up.railway.app`
- API Docs: `https://your-backend.up.railway.app/docs`
