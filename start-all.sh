#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════════════╗"
echo "║              🎂 Hope Epicure - Complete Startup                      ║"
echo "╚══════════════════════════════════════════════════════════════════════╝"
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Function to check if port is in use
check_port() {
    lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1
}

# Function to kill process on port
kill_port() {
    echo "Killing process on port $1..."
    lsof -ti:$1 | xargs kill -9 2>/dev/null
    sleep 1
}

echo "🔍 Checking current status..."
echo ""

# Check and handle backend
if check_port 8000; then
    echo "⚠️  Port 8000 is already in use"
    read -p "Kill existing process and restart? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kill_port 8000
    else
        echo "❌ Cannot start backend - port 8000 is in use"
        exit 1
    fi
fi

# Check and handle frontend
if check_port 5173; then
    echo "✅ Frontend already running on port 5173"
    FRONTEND_RUNNING=true
elif check_port 5174; then
    echo "✅ Frontend already running on port 5174"
    FRONTEND_RUNNING=true
else
    FRONTEND_RUNNING=false
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Starting Backend Server..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd server

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "❌ Failed to create virtual environment"
        exit 1
    fi
fi

# Activate venv
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Check if dependencies are installed
if ! python -c "import fastapi" 2>/dev/null; then
    echo "📦 Installing dependencies..."
    pip install -q -r ../requirements.txt
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

# Check .env file
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found"
    if [ -f ".env.example" ]; then
        echo "📝 Creating .env from template..."
        cp .env.example .env
        echo "⚠️  Please edit server/.env with your API keys before using image upload and email features"
    fi
fi

# Start backend in background
echo "✅ Starting uvicorn server on port 8000..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000 > ../backend.log 2>&1 &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
for i in {1..30}; do
    if check_port 8000; then
        echo "✅ Backend started successfully!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Backend failed to start. Check backend.log for errors"
        cat ../backend.log
        exit 1
    fi
    sleep 1
done

cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Backend Server Running"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "   Backend:  http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo "   PID:      $BACKEND_PID"
echo "   Logs:     backend.log"
echo ""

# Start frontend if not running
if [ "$FRONTEND_RUNNING" = false ]; then
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🚀 Starting Frontend Server..."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    cd frontend
    
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing npm dependencies..."
        npm install
    fi
    
    echo "✅ Starting vite dev server..."
    npm run dev > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    
    # Wait for frontend to start
    echo "⏳ Waiting for frontend to start..."
    for i in {1..30}; do
        if check_port 5173 || check_port 5174; then
            echo "✅ Frontend started successfully!"
            break
        fi
        if [ $i -eq 30 ]; then
            echo "❌ Frontend failed to start. Check frontend.log for errors"
            cat ../frontend.log
            exit 1
        fi
        sleep 1
    done
    
    cd ..
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ Frontend Server Running"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    if check_port 5173; then
        echo "   Frontend: http://localhost:5173"
    else
        echo "   Frontend: http://localhost:5174"
    fi
    echo "   PID:      $FRONTEND_PID"
    echo "   Logs:     frontend.log"
    echo ""
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════════════╗"
echo "║                    ✅ ALL SERVERS RUNNING                            ║"
echo "╚══════════════════════════════════════════════════════════════════════╝"
echo ""
echo "🌐 Access your application:"
echo ""
if check_port 5173; then
    echo "   Landing:  http://localhost:5173/"
    echo "   Products: http://localhost:5173/products"
    echo "   Login:    http://localhost:5173/login"
    echo "   Admin:    http://localhost:5173/admin"
else
    echo "   Landing:  http://localhost:5174/"
    echo "   Products: http://localhost:5174/products"
    echo "   Login:    http://localhost:5174/login"
    echo "   Admin:    http://localhost:5174/admin"
fi
echo ""
echo "   API:      http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "🛑 To stop servers:"
echo "   kill $BACKEND_PID"
if [ "$FRONTEND_RUNNING" = false ]; then
    echo "   kill $FRONTEND_PID"
fi
echo ""
echo "   Or run: ./stop-servers.sh"
echo ""
echo "✨ Ready to use! Refresh your browser if it's already open."
echo ""

# Save PIDs for stop script
echo "$BACKEND_PID" > .backend.pid
if [ "$FRONTEND_RUNNING" = false ]; then
    echo "$FRONTEND_PID" > .frontend.pid
fi
