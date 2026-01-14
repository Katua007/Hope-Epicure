#!/bin/bash

echo "🔍 Checking backend server..."

# Check if port 8000 is in use
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "✅ Backend server is already running on port 8000"
    exit 0
fi

echo "❌ Backend server is not running"
echo "🚀 Starting backend server..."

cd "$(dirname "$0")/server"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Check if dependencies are installed
if ! python -c "import fastapi" 2>/dev/null; then
    echo "📦 Installing dependencies..."
    pip install -r ../requirements.txt
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found"
    echo "📝 Creating .env from template..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "⚠️  Please edit server/.env with your API keys"
    fi
fi

# Start the server
echo "✅ Starting uvicorn server..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000
