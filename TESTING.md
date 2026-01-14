# Hope Epicure - Testing Checklist

## Complete Feature Testing Guide

### 🏠 Landing Page (/)
- [ ] Page loads without errors
- [ ] Navigation bar displays correctly
- [ ] "Browse Products" button works → redirects to /products
- [ ] "Get Started" button works → redirects to /login (if not logged in)
- [ ] Hero section displays properly
- [ ] Features section shows 3 cards
- [ ] CTA section displays
- [ ] Footer displays
- [ ] All buttons are clickable and functional

### 🛍️ Products Page (/products)
- [ ] Page loads without errors
- [ ] Navigation bar displays with all links
- [ ] Products load from backend
- [ ] Loading spinner shows while fetching
- [ ] Products display in grid layout
- [ ] Each product card shows:
  - [ ] Product image from Cloudinary
  - [ ] Product name
  - [ ] Product description
  - [ ] Price
  - [ ] Flavor
  - [ ] "Order Now" button
- [ ] "Order Now" button redirects to /login if not logged in
- [ ] "Order Now" button opens modal if logged in
- [ ] Empty state shows if no products

### 🔐 Login/Signup Page (/login)
- [ ] Page loads without errors
- [ ] Login form displays
- [ ] Email input works
- [ ] Password input works
- [ ] "Login" button works
- [ ] Toggle to "Sign Up" works
- [ ] Sign up form displays
- [ ] Sign up creates new user
- [ ] Success message shows after signup
- [ ] Login redirects to /products after success
- [ ] Error messages display for invalid credentials
- [ ] "Back to Home" link works
- [ ] Loading state shows during authentication

### 👨‍💼 Admin Dashboard (/admin)
- [ ] Page loads without errors
- [ ] Navigation bar displays
- [ ] "View Store" button works → redirects to /products
- [ ] Product form displays with fields:
  - [ ] Product Name (text input)
  - [ ] Price (number input)
  - [ ] Flavor (text input)
  - [ ] Image (file input)
  - [ ] Description (textarea)
  - [ ] "Save Product" button
- [ ] File upload accepts images
- [ ] Form submission works
- [ ] Image uploads to Cloudinary
- [ ] Product appears in table after creation
- [ ] Success message shows after adding product
- [ ] Form resets after successful submission
- [ ] Product table displays with columns:
  - [ ] Image thumbnail
  - [ ] Product name
  - [ ] Flavor
  - [ ] Price
  - [ ] Status (Available/Sold Out)
  - [ ] Actions (Toggle/Delete)
- [ ] "Toggle" button changes availability
- [ ] Status badge updates after toggle
- [ ] "Delete" button shows confirmation
- [ ] Product deletes after confirmation
- [ ] Table updates after delete
- [ ] Loading state shows while fetching products
- [ ] Empty state shows if no products

### 📦 Order Modal
- [ ] Modal opens when "Order Now" clicked (logged in)
- [ ] Modal displays product details:
  - [ ] Product image
  - [ ] Product name
  - [ ] Product description
  - [ ] Product price
- [ ] Customer name field pre-fills from email
- [ ] Customer name is editable
- [ ] Quantity input works (min: 1)
- [ ] Flavor input works
- [ ] "Confirm Order" button works
- [ ] Loading state shows during submission
- [ ] Success message shows after order
- [ ] Modal closes after successful order
- [ ] "Cancel" button closes modal
- [ ] Click outside modal closes it
- [ ] X button closes modal
- [ ] Error message shows if order fails

### 🔗 Navigation Bar
- [ ] Displays on all pages (except landing)
- [ ] Logo/brand name displays
- [ ] "Home" link works → redirects to /
- [ ] "Admin" link works → redirects to /admin
- [ ] Shows user email when logged in
- [ ] "Logout" button shows when logged in
- [ ] "Login" button shows when logged out
- [ ] Logout clears user session
- [ ] Logout redirects to home page
- [ ] Sticky positioning works on scroll

### 🔌 API Integration
- [ ] Backend runs on port 8000
- [ ] Frontend runs on port 5173
- [ ] CORS configured correctly
- [ ] GET /products returns products
- [ ] POST /products creates product
- [ ] PATCH /products/{id} toggles availability
- [ ] DELETE /products/{id} deletes product
- [ ] POST /orders creates order
- [ ] POST /auth/signup creates user
- [ ] POST /auth/login returns token
- [ ] All API calls handle errors gracefully
- [ ] Loading states show during API calls

### 🎨 UI/UX
- [ ] Responsive design works on mobile
- [ ] Responsive design works on tablet
- [ ] Responsive design works on desktop
- [ ] Colors are consistent (pink theme)
- [ ] Fonts are readable
- [ ] Buttons have hover effects
- [ ] Forms have focus states
- [ ] Loading spinners display
- [ ] Error messages are clear
- [ ] Success messages are clear
- [ ] Images load properly
- [ ] No console errors in browser
- [ ] No layout shifts

### 📧 Email Notifications
- [ ] Order triggers email to Hope
- [ ] Email contains order details:
  - [ ] Customer name
  - [ ] Customer email
  - [ ] Product name
  - [ ] Flavor
  - [ ] Quantity
- [ ] Email sends even if order saves
- [ ] Error logged if email fails

### 💾 Data Persistence
- [ ] Products saved to database
- [ ] Orders saved to database
- [ ] Users saved to database
- [ ] User session persists on refresh
- [ ] Logout clears session
- [ ] Database file created automatically

### 🔒 Authentication
- [ ] JWT token generated on login
- [ ] Token stored in localStorage
- [ ] Token persists on page refresh
- [ ] Protected routes check authentication
- [ ] Logout clears token
- [ ] Password hashed in database
- [ ] Invalid credentials rejected

## Testing Workflow

### 1. First Time Setup
```bash
# Backend
cd server
python -m venv venv
source venv/bin/activate
pip install -r ../requirements.txt
cp .env.example .env
# Edit .env with API keys
python test_setup.py

# Frontend
cd ../frontend
npm install

# Start both
cd ..
./start.sh
```

### 2. Test Landing Page
1. Open http://localhost:5173
2. Verify all sections display
3. Click "Browse Products" → should go to /products
4. Click "Get Started" → should go to /login
5. Test all navigation links

### 3. Test Authentication
1. Go to /login
2. Click "Sign Up"
3. Enter email and password
4. Click "Sign Up" button
5. Verify success message
6. Click "Login"
7. Enter same credentials
8. Click "Login" button
9. Verify redirect to /products

### 4. Test Admin Features
1. Go to /admin
2. Fill in product form:
   - Name: "Chocolate Cake"
   - Price: 25.99
   - Flavor: "Chocolate"
   - Description: "Rich chocolate cake"
   - Upload an image
3. Click "Save Product"
4. Verify product appears in table
5. Click "Toggle" → verify status changes
6. Click "Delete" → confirm → verify product removed

### 5. Test Customer Flow
1. Go to /products
2. Verify products display
3. Click "Order Now" on a product
4. Verify modal opens
5. Fill in order details:
   - Name: "John Doe"
   - Quantity: 2
   - Flavor: "Vanilla"
6. Click "Confirm Order"
7. Verify success message
8. Check Hope's email for notification

### 6. Test Logout
1. Click "Logout" in navbar
2. Verify redirect to home
3. Verify "Login" button shows
4. Try to order → should redirect to login

## Success Criteria

✅ All checkboxes above are checked
✅ No console errors in browser
✅ No errors in backend terminal
✅ All buttons are functional
✅ All forms submit correctly
✅ All pages load without issues
✅ Images display from Cloudinary
✅ Emails send successfully
✅ Database updates correctly
✅ Authentication works properly
✅ Responsive design works

## Common Issues

### Issue: Products not loading
**Check:**
- Backend is running
- Database has products
- CORS configured
- Network tab in browser

### Issue: Images not showing
**Check:**
- Cloudinary credentials in .env
- Image uploaded successfully
- Image URL in database
- Network tab for 404 errors

### Issue: Orders not working
**Check:**
- User is logged in
- All form fields filled
- Backend receiving request
- Database connection

### Issue: Email not sending
**Check:**
- Mailjet credentials in .env
- HOPE_EMAIL set correctly
- Check Mailjet dashboard
- Check spam folder

## Report Template

```
Date: ___________
Tester: ___________

✅ Passed: ___ / ___
❌ Failed: ___ / ___

Issues Found:
1. 
2. 
3. 

Notes:


```
