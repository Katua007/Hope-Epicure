# Quick Setup Guide

## Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

## First Time Setup

### 1. Backend Setup

```bash
# Navigate to server directory
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r ../requirements.txt

# Copy .env.example to .env
cp .env.example .env

# Edit .env and add your credentials
nano .env  # or use any text editor
```

### 2. Get API Credentials

**Cloudinary (for image uploads):**
1. Sign up at https://cloudinary.com
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret
4. Add to `.env` file

**Mailjet (for email notifications):**
1. Sign up at https://www.mailjet.com
2. Go to Account Settings > API Keys
3. Copy API Key and Secret Key
4. Add to `.env` file

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

### 4. Start the Application

**Option 1: Use the startup script (recommended)**
```bash
# From the root directory
./start.sh
```

**Option 2: Start manually**

Terminal 1 (Backend):
```bash
cd server
source venv/bin/activate
uvicorn main:app --reload
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Default Routes

- `/` - Home page (customer view)
- `/login` - Login/Signup page
- `/admin` - Admin dashboard (product management)

## Testing the Application

1. Go to `/admin` to add products
2. Upload product images (stored in Cloudinary)
3. Go to `/` to view products as a customer
4. Sign up/login to place orders
5. Check Hope's email for order notifications

## Troubleshooting

**Backend won't start:**
- Check if port 8000 is available
- Verify .env file exists and has correct credentials
- Check Python version: `python --version`

**Frontend won't start:**
- Check if port 5173 is available
- Delete node_modules and run `npm install` again
- Check Node version: `node --version`

**Images not uploading:**
- Verify Cloudinary credentials in .env
- Check file size (Cloudinary free tier has limits)

**Emails not sending:**
- Verify Mailjet credentials in .env
- Check Mailjet dashboard for sending limits
- Verify HOPE_EMAIL is set correctly

## Database

The SQLite database (`hope_bakery.db`) is created automatically on first run.

To reset the database:
```bash
cd server
rm hope_bakery.db
# Restart the backend server
```

## Next Steps

- Customize the styling in Tailwind CSS
- Add more product fields
- Implement order history
- Add payment integration
- Deploy to production
