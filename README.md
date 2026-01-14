# Hope-Epicure

A full-stack e-commerce platform for Hope's bakery business, featuring product management, user authentication, and order processing with email notifications.

## Features

- 🎂 Product catalog with image uploads (Cloudinary)
- 🛒 Customer ordering system with authentication
- 👤 User signup/login with JWT tokens
- 📧 Email notifications for new orders (Mailjet)
- 🔐 Admin dashboard for product management
- 📱 Responsive design with Tailwind CSS

## Tech Stack

**Frontend:**
- React 19 with Vite
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling

**Backend:**
- FastAPI (Python)
- SQLAlchemy with SQLite
- Cloudinary for image storage
- Mailjet for email notifications
- JWT authentication with passlib

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r ../requirements.txt
```

4. Create a `.env` file in the server directory:
```env
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MJ_APIKEY_PUBLIC=your_mailjet_public_key
MJ_APIKEY_PRIVATE=your_mailjet_private_key
```

5. Start the backend server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Products
- `GET /products` - Get all products
- `POST /products` - Create new product (multipart/form-data)
- `PATCH /products/{id}` - Toggle product availability
- `DELETE /products/{id}` - Delete product

### Orders
- `POST /orders` - Place new order

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - Login and get JWT token

## Project Structure

```
Hope-Epicure/
├── frontend/
│   ├── src/
│   │   ├── src/
│   │   │   ├── api/          # API integration
│   │   │   ├── components/   # React components
│   │   │   ├── context/      # Auth context
│   │   │   └── pages/        # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── main.py              # FastAPI app
│   ├── models.py            # Database models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # Authentication logic
│   ├── cloudinary_config.py # Image upload
│   ├── mailer.py            # Email notifications
│   └── .env                 # Environment variables
└── requirements.txt
```

## Usage

### For Customers:
1. Visit the home page to browse available products
2. Sign up or login to place orders
3. Click "Order Now" on any product
4. Fill in order details and submit
5. Receive email confirmation

### For Admin (Hope):
1. Navigate to `/admin`
2. Add new products with images
3. Toggle product availability
4. Delete products
5. Receive email notifications for new orders

## Environment Variables

Create a `.env` file in the `server/` directory with:

```env
# Cloudinary Configuration
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mailjet Configuration
MJ_APIKEY_PUBLIC=your_mailjet_public_key
MJ_APIKEY_PRIVATE=your_mailjet_private_key
```

## Database

The application uses SQLite with the following tables:
- `products` - Product catalog
- `orders` - Customer orders
- `users` - User accounts

The database file (`hope_bakery.db`) is automatically created on first run.

## Development

- Backend runs on port 8000
- Frontend runs on port 5173
- CORS is configured to allow both ports

## License

MIT