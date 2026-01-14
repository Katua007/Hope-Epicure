# Hope Epicure - Project Overview

## What This Application Does

Hope Epicure is a complete e-commerce platform for a bakery business that allows:

### For Customers:
1. Browse available bakery products with images
2. Create an account and login
3. Place orders for products with custom flavors
4. Receive email confirmations

### For Admin (Hope):
1. Add new products with image uploads
2. Manage product availability (mark as sold out)
3. Delete products
4. Receive email notifications when customers place orders

## How It Works

### Architecture

```
Customer Browser <---> React Frontend <---> FastAPI Backend <---> SQLite Database
                                      |
                                      +---> Cloudinary (Images)
                                      +---> Mailjet (Emails)
```

### Data Flow

1. **Product Creation:**
   - Admin uploads product with image via form
   - Image is uploaded to Cloudinary
   - Product details saved to database with Cloudinary URL
   - Product appears on customer homepage

2. **Customer Order:**
   - Customer browses products on homepage
   - Clicks "Order Now" → redirected to login if not authenticated
   - After login, fills order form (quantity, flavor preference)
   - Order saved to database
   - Email sent to Hope with order details

3. **Authentication:**
   - User signs up with email/password
   - Password is hashed using bcrypt
   - Login returns JWT token
   - Token stored in localStorage for session persistence

## Key Features Implemented

### Frontend (React)
- **Pages:**
  - Home: Product catalog for customers
  - Login/Signup: Authentication page
  - Admin Dashboard: Product management

- **Components:**
  - ProductCard: Displays individual products
  - OrderModal: Order form popup
  - AdminProductForm: Add new products with file upload

- **Context:**
  - AuthContext: Manages user authentication state

### Backend (FastAPI)
- **Endpoints:**
  - GET /products - List all products
  - POST /products - Create product (multipart form with image)
  - PATCH /products/{id} - Toggle availability
  - DELETE /products/{id} - Remove product
  - POST /orders - Place new order
  - POST /auth/signup - Register user
  - POST /auth/login - Authenticate user

- **Features:**
  - File upload handling
  - Image storage via Cloudinary
  - Email notifications via Mailjet
  - JWT authentication
  - Password hashing
  - CORS configuration
  - Error handling

### Database (SQLite)
- **Tables:**
  - products: id, name, description, price, flavor, image_url, is_available
  - orders: id, customer_name, customer_email, product_name, flavor, quantity, status
  - users: id, email, hashed_password, is_admin

## Technology Choices

### Why React?
- Component-based architecture for reusable UI
- Virtual DOM for fast rendering
- Large ecosystem and community support
- Easy state management with Context API

### Why FastAPI?
- Fast performance (async support)
- Automatic API documentation (Swagger UI)
- Type hints and validation with Pydantic
- Easy to learn and use
- Built-in support for file uploads

### Why SQLite?
- No separate database server needed
- Perfect for small to medium applications
- Easy to backup (single file)
- Can migrate to PostgreSQL/MySQL later if needed

### Why Cloudinary?
- Free tier for image storage
- Automatic image optimization
- CDN for fast delivery
- Easy API integration

### Why Mailjet?
- Free tier for email sending
- Reliable delivery
- Simple API
- Email templates support

## Security Features

1. **Password Security:**
   - Passwords hashed with bcrypt
   - Never stored in plain text

2. **Authentication:**
   - JWT tokens for session management
   - Token expiration (60 minutes)

3. **CORS:**
   - Configured to only allow specific origins
   - Prevents unauthorized API access

4. **Environment Variables:**
   - Sensitive credentials stored in .env
   - Not committed to version control

## File Structure Explained

### Frontend Structure
```
frontend/src/src/
├── api/index.js           # API calls to backend
├── components/            # Reusable UI components
│   ├── AdminProductForm.jsx
│   ├── OrderModal.jsx
│   └── ProductCard.jsx
├── context/              # Global state management
│   └── AuthContext.jsx
└── pages/                # Full page components
    ├── Home.jsx
    ├── AuthPage.jsx
    └── AdminDashboard.jsx
```

### Backend Structure
```
server/
├── main.py              # FastAPI app and routes
├── models.py            # Database models (SQLAlchemy)
├── schemas.py           # Request/response schemas (Pydantic)
├── database.py          # Database configuration
├── auth.py              # Authentication logic
├── cloudinary_config.py # Image upload configuration
├── mailer.py            # Email notification logic
└── .env                 # Environment variables (not in git)
```

## Common Operations

### Adding a New Product
1. Go to /admin
2. Fill in product details
3. Upload image file
4. Click "Save Product"
5. Image uploaded to Cloudinary
6. Product saved to database
7. Product appears on homepage

### Placing an Order
1. Customer visits homepage
2. Clicks "Order Now" on a product
3. If not logged in, redirected to /login
4. After login, order modal opens
5. Customer enters quantity and flavor
6. Submits order
7. Order saved to database
8. Email sent to Hope

### Managing Products
1. Admin goes to /admin
2. Views all products in table
3. Can toggle availability (Available/Sold Out)
4. Can delete products
5. Changes reflect immediately on homepage

## API Documentation

Once the backend is running, visit:
- http://localhost:8000/docs - Interactive API documentation (Swagger UI)
- http://localhost:8000/redoc - Alternative API documentation

## Future Enhancements

Possible features to add:
- Order history for customers
- Payment integration (Stripe/PayPal)
- Product categories
- Search and filter
- Product reviews
- Admin order management
- Email templates for customers
- Image gallery for products
- Inventory management
- Analytics dashboard

## Deployment Considerations

For production deployment:
1. Use PostgreSQL instead of SQLite
2. Set up proper environment variables
3. Enable HTTPS
4. Use production-grade WSGI server (Gunicorn)
5. Set up proper CORS origins
6. Implement rate limiting
7. Add logging and monitoring
8. Set up automated backups
9. Use CDN for frontend assets
10. Implement proper error tracking

## Support

For issues or questions:
1. Check SETUP.md for setup instructions
2. Run test_setup.py to verify configuration
3. Check browser console for frontend errors
4. Check terminal for backend errors
5. Verify .env file has correct credentials
