#!/bin/bash

echo "🔄 Restarting Backend Server..."
echo ""

# Kill existing backend
echo "1. Stopping existing backend..."
lsof -ti:8000 | xargs kill -9 2>/dev/null
sleep 2

# Start backend
echo "2. Starting backend..."
cd server
source venv/bin/activate

# Start in background
uvicorn main:app --reload > ../backend.log 2>&1 &
BACKEND_PID=$!

echo "3. Waiting for backend to start..."
for i in {1..15}; do
    if curl -s http://localhost:8000/ > /dev/null 2>&1; then
        echo "✅ Backend started successfully!"
        echo ""
        echo "Backend URL: http://localhost:8000"
        echo "API Docs: http://localhost:8000/docs"
        echo "PID: $BACKEND_PID"
        echo ""
        echo "✨ Try signup/login again - it should work now!"
        exit 0
    fi
    sleep 1
done

echo "❌ Backend failed to start"
echo "Check backend.log for errors"
cat ../backend.log
exit 1
