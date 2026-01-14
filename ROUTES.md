# Hope Epicure - Complete Routes & Features

## 🌐 Frontend Routes

### 1. Landing Page - `/`
**Purpose:** Welcome page with hero section and features  
**File:** `frontend/src/src/pages/Landing.jsx`  
**Features:**
- Hero section with welcome message
- "Browse Products" button → `/products`
- "Get Started" button → `/login` (if not logged in)
- Features showcase (3 cards)
- Call-to-action section
- Footer
- Navigation bar

**Buttons:**
- ✅ Browse Products → `/products`
- ✅ Get Started → `/login`
- ✅ View Our Menu → `/products`
- ✅ Home (navbar) → `/`
- ✅ Admin (navbar) → `/admin`
- ✅ Login/Logout (navbar)

---

### 2. Products Page - `/products`
**Purpose:** Display all available products for customers  
**File:** `frontend/src/src/pages/Home.jsx`  
**Features:**
- Product grid (responsive: 1/2/3 columns)
- Product cards with images from Cloudinary
- "Order Now" button on each product
- Loading spinner while fetching
- Empty state if no products
- Navigation bar

**Buttons:**
- ✅ Order Now → Opens modal (if logged in) OR redirects to `/login`
- ✅ All navbar buttons

**Data Flow:**
1. Fetches products from `GET /products`
2. Filters only available products
3. Displays in grid
4. Click "Order Now" → checks auth → opens modal or redirects

---

### 3. Login/Signup Page - `/login`
**Purpose:** User authentication (login and registration)  
**File:** `frontend/src/src/pages/AuthPage.jsx`  
**Features:**
- Toggle between Login and Signup
- Email input
- Password input
- Form validation
- Loading state during submission
- Error messages
- Success messages
- Back to home link

**Buttons:**
- ✅ Login → Authenticates user → redirects to `/products`
- ✅ Sign Up → Creates account → shows success → switches to login
- ✅ Toggle Login/Signup → Switches form
- ✅ Back to Home → `/`

**Data Flow:**
- **Login:** `POST /auth/login` → saves token → redirects to `/products`
- **Signup:** `POST /auth/signup` → shows success → switches to login form

---

### 4. Admin Dashboard - `/admin`
**Purpose:** Product management for administrators  
**File:** `frontend/src/src/pages/AdminDashboard.jsx`  
**Features:**
- Product creation form
- Product list table
- Image upload
- Toggle availability
- Delete products
- Loading states
- Empty states
- Navigation bar

**Buttons:**
- ✅ View Store → `/products`
- ✅ Save Product → Creates product with image upload
- ✅ Toggle Status → Changes product availability
- ✅ Delete → Removes product (with confirmation)
- ✅ All navbar buttons

**Data Flow:**
1. **Load Products:** `GET /products` → displays in table
2. **Add Product:** Form submit → `POST /products` (multipart) → uploads to Cloudinary → saves to DB → refreshes list
3. **Toggle:** Click toggle → `PATCH /products/{id}` → refreshes list
4. **Delete:** Click delete → confirm → `DELETE /products/{id}` → refreshes list

---

## 🧩 Components

### 1. Navbar - `frontend/src/src/components/Navbar.jsx`
**Purpose:** Site-wide navigation with auth state  
**Features:**
- Logo/brand name
- Navigation links (Home, Admin)
- User email display (when logged in)
- Login/Logout button
- Sticky positioning

**Buttons:**
- ✅ Logo → `/`
- ✅ Home → `/`
- ✅ Admin → `/admin`
- ✅ Login → `/login`
- ✅ Logout → Clears session → redirects to `/`

---

### 2. ProductCard - `frontend/src/src/components/ProductCard.jsx`
**Purpose:** Display individual product  
**Features:**
- Product image
- Product name
- Product description
- Price display
- Flavor display
- Order button
- Hover effects

**Buttons:**
- ✅ Order Now → Triggers parent handler (opens modal or redirects)

---

### 3. OrderModal - `frontend/src/src/components/OrderModal.jsx`
**Purpose:** Order form for customers  
**Features:**
- Product preview (image, name, description, price)
- Customer name input (pre-filled from email)
- Quantity input
- Flavor input
- Form validation
- Loading state
- Success/error messages
- Close on outside click

**Buttons:**
- ✅ Confirm Order → Submits order → `POST /orders` → closes modal
- ✅ Cancel → Closes modal
- ✅ X button → Closes modal
- ✅ Click outside → Closes modal

**Data Flow:**
1. Opens with product data
2. Pre-fills customer name from email
3. User fills quantity and flavor
4. Submit → `POST /orders` with payload:
   ```json
   {
     "customer_name": "John Doe",
     "customer_email": "john@example.com",
     "product_name": "Chocolate Cake",
     "flavor": "Vanilla",
     "quantity": 2
   }
   ```
5. Success → shows message → closes modal
6. Error → shows error message

---

### 4. AdminProductForm - `frontend/src/src/components/AdminProductForm.jsx`
**Purpose:** Product creation form  
**Features:**
- Name input
- Price input
- Flavor input
- Description textarea
- File upload (image)
- Form validation
- Loading state
- Success/error messages
- Form reset after success

**Buttons:**
- ✅ Save Product → Submits form with file upload

**Data Flow:**
1. User fills form and selects image
2. Submit → Creates FormData with all fields
3. `POST /products` (multipart/form-data)
4. Backend uploads image to Cloudinary
5. Backend saves product to database
6. Success → form resets → parent refreshes list

---

## 🔌 Backend API Endpoints

### Base URL: `http://localhost:8000`

### 1. GET `/`
**Purpose:** API health check  
**Response:** `{"message": "Welcome to Hope Epicure API"}`

---

### 2. GET `/products`
**Purpose:** Fetch all products  
**Response:**
```json
[
  {
    "id": 1,
    "name": "Chocolate Cake",
    "description": "Rich chocolate cake",
    "price": 25.99,
    "flavor": "Chocolate",
    "image_url": "https://res.cloudinary.com/...",
    "is_available": true
  }
]
```

---

### 3. POST `/products`
**Purpose:** Create new product  
**Content-Type:** `multipart/form-data`  
**Body:**
- `name` (string)
- `price` (float)
- `flavor` (string)
- `description` (string)
- `image` (file)

**Process:**
1. Receives multipart form data
2. Uploads image to Cloudinary
3. Saves product with Cloudinary URL
4. Returns created product

---

### 4. PATCH `/products/{product_id}`
**Purpose:** Toggle product availability  
**Query Params:** `available` (boolean)  
**Response:** Updated product

---

### 5. DELETE `/products/{product_id}`
**Purpose:** Delete product  
**Response:** `{"message": "Product deleted successfully"}`

---

### 6. POST `/orders`
**Purpose:** Place new order  
**Body:**
```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "product_name": "Chocolate Cake",
  "flavor": "Vanilla",
  "quantity": 2
}
```

**Process:**
1. Saves order to database
2. Sends email notification to Hope
3. Returns success message

---

### 7. POST `/auth/signup`
**Purpose:** Register new user  
**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Process:**
1. Checks if email exists
2. Hashes password with bcrypt
3. Saves user to database
4. Returns success message

---

### 8. POST `/auth/login`
**Purpose:** Authenticate user  
**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Process:**
1. Finds user by email
2. Verifies password with bcrypt
3. Generates JWT token
4. Returns token

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

---

## 📊 Data Models

### Product
```python
{
  "id": int,
  "name": str,
  "description": str,
  "price": float,
  "flavor": str,
  "image_url": str,
  "is_available": bool
}
```

### Order
```python
{
  "id": int,
  "customer_name": str,
  "customer_email": str,
  "product_name": str,
  "flavor": str,
  "quantity": int,
  "status": str  # "Pending", "Completed", "Cancelled"
}
```

### User
```python
{
  "id": int,
  "email": str,
  "hashed_password": str,
  "is_admin": bool
}
```

---

## 🔄 Complete User Flows

### Customer Flow
1. Visit `/` (landing page)
2. Click "Browse Products" → `/products`
3. See products, click "Order Now"
4. Redirected to `/login` (if not logged in)
5. Sign up → Login
6. Redirected to `/products`
7. Click "Order Now" → Modal opens
8. Fill order form → Submit
9. Order saved → Email sent to Hope
10. Success message → Modal closes

### Admin Flow
1. Visit `/admin`
2. Fill product form
3. Upload image
4. Click "Save Product"
5. Image uploaded to Cloudinary
6. Product saved to database
7. Product appears in table
8. Toggle availability as needed
9. Delete products as needed

---

## ✅ All Features Working

- ✅ Landing page with hero and features
- ✅ Product catalog with images
- ✅ User authentication (signup/login)
- ✅ Protected routes
- ✅ Order placement with modal
- ✅ Admin product management
- ✅ Image upload to Cloudinary
- ✅ Email notifications via Mailjet
- ✅ Database persistence (SQLite)
- ✅ JWT authentication
- ✅ Password hashing
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design
- ✅ All buttons functional
- ✅ All forms working
- ✅ All APIs operational

---

## 🎯 Testing Each Feature

See `TESTING.md` for complete testing checklist with step-by-step instructions.
