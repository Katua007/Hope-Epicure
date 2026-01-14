#!/bin/bash

echo "🎂 Starting Hope Epicure..."

# Start backend
echo "Starting backend server..."
cd server
source venv/bin/activate 2>/dev/null || python -m venv venv && source venv/bin/activate
pip install -q -r ../requirements.txt
uvicorn main:app --reload &
BACKEND_PID=$!

# Start frontend
echo "Starting frontend server..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo "✅ Servers started!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
