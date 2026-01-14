#!/bin/bash

echo "🔍 Checking Server Status..."
echo ""

# Check Backend
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "✅ Backend: RUNNING on port 8000"
    echo "   URL: http://localhost:8000"
    echo "   Docs: http://localhost:8000/docs"
else
    echo "❌ Backend: NOT RUNNING"
    echo "   To start: cd server && source venv/bin/activate && uvicorn main:app --reload"
fi

echo ""

# Check Frontend
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "✅ Frontend: RUNNING on port 5173"
    echo "   URL: http://localhost:5173"
elif lsof -Pi :5174 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "✅ Frontend: RUNNING on port 5174"
    echo "   URL: http://localhost:5174"
else
    echo "❌ Frontend: NOT RUNNING"
    echo "   To start: cd frontend && npm run dev"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# If backend not running, show instructions
if ! lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  BACKEND IS NOT RUNNING - This is why you see ERR_CONNECTION_REFUSED"
    echo ""
    echo "Quick Start Backend:"
    echo "  cd server"
    echo "  source venv/bin/activate"
    echo "  uvicorn main:app --reload"
    echo ""
fi
