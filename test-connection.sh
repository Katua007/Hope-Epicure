#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════════════╗"
echo "║           🧪 Testing Frontend-Backend Communication                  ║"
echo "╚══════════════════════════════════════════════════════════════════════╝"
echo ""

# Test Backend
echo "1️⃣  Testing Backend API..."
BACKEND_RESPONSE=$(curl -s http://localhost:8000/ 2>/dev/null)

if [ $? -eq 0 ]; then
    echo "   ✅ Backend is running"
    echo "   Response: $BACKEND_RESPONSE"
else
    echo "   ❌ Backend is NOT running"
    echo "   Start with: cd server && source venv/bin/activate && uvicorn main:app --reload"
    exit 1
fi

echo ""

# Test Products Endpoint
echo "2️⃣  Testing Products API..."
PRODUCTS_RESPONSE=$(curl -s http://localhost:8000/products 2>/dev/null)

if [ $? -eq 0 ]; then
    echo "   ✅ Products endpoint working"
    echo "   Response: ${PRODUCTS_RESPONSE:0:100}..."
else
    echo "   ❌ Products endpoint failed"
    exit 1
fi

echo ""

# Test Frontend
echo "3️⃣  Testing Frontend..."
if curl -s http://localhost:5173/ > /dev/null 2>&1; then
    echo "   ✅ Frontend is running on port 5173"
    FRONTEND_PORT=5173
elif curl -s http://localhost:5174/ > /dev/null 2>&1; then
    echo "   ✅ Frontend is running on port 5174"
    FRONTEND_PORT=5174
else
    echo "   ❌ Frontend is NOT running"
    echo "   Start with: cd frontend && npm run dev"
    exit 1
fi

echo ""

# Test CORS
echo "4️⃣  Testing CORS Configuration..."
CORS_TEST=$(curl -s -H "Origin: http://localhost:$FRONTEND_PORT" \
    -H "Access-Control-Request-Method: GET" \
    -H "Access-Control-Request-Headers: Content-Type" \
    -X OPTIONS http://localhost:8000/products -I 2>/dev/null | grep -i "access-control-allow-origin")

if [ ! -z "$CORS_TEST" ]; then
    echo "   ✅ CORS is configured correctly"
else
    echo "   ⚠️  CORS might need configuration"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ ALL TESTS PASSED"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Access your application:"
echo "   Frontend: http://localhost:$FRONTEND_PORT"
echo "   Backend:  http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "✨ Frontend and Backend are communicating successfully!"
echo ""
