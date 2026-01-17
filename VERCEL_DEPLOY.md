# Vercel Deployment Guide for Hope Epicure

## Project Structure
```
Hope-Epicure/
├── api/                    # Backend API (FastAPI)
│   ├── main.py            # Main API handler
│   ├── database.py        # Database configuration
│   ├── models.py          # SQLAlchemy models
│   ├── schemas.py         # Pydantic schemas
│   ├── auth.py            # Authentication utilities
│   ├── cloudinary_config.py # Image upload
│   ├── mailer.py          # Email notifications
│   └── requirements.txt   # Python dependencies
├── frontend/              # React frontend
│   ├── src/
│   ├── package.json
│   └── dist/             # Build output
├── vercel.json           # Vercel configuration
└── requirements.txt      # Root Python dependencies
```

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect the configuration from `vercel.json`

### 3. Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:

```env
# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mailjet Configuration
MJ_APIKEY_PUBLIC=your_mailjet_public_key
MJ_APIKEY_PRIVATE=your_mailjet_private_key
```

### 4. Build Configuration
The `vercel.json` file handles:
- Frontend build from `frontend/` directory
- API deployment as serverless function
- Proper routing between frontend and API

### 5. Testing Deployment
Once deployed, test these endpoints:
- Frontend: `https://your-app.vercel.app`
- API Health: `https://your-app.vercel.app/api`
- Products: `https://your-app.vercel.app/api/products`

## API Endpoints
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (multipart/form-data)
- `PATCH /api/products/{id}` - Toggle availability
- `DELETE /api/products/{id}` - Delete product
- `POST /api/orders` - Place order
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

## Troubleshooting

### 404 Errors
- Check Vercel Function Logs in dashboard
- Ensure all Python dependencies are in `api/requirements.txt`
- Verify environment variables are set

### Build Failures
- Check build logs in Vercel dashboard
- Ensure `frontend/package.json` has correct build script
- Verify all imports in API files are correct

### Database Issues
- SQLite works for development
- For production, consider PostgreSQL with Vercel Postgres
- Database file is created automatically on first API call