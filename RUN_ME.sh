#!/bin/bash

# Hope Epicure - Run This Script
# This will start both backend and frontend servers

echo "╔══════════════════════════════════════════════════════════════════════╗"
echo "║              🎂 Starting Hope Epicure Application                    ║"
echo "╚══════════════════════════════════════════════════════════════════════╝"
echo ""
echo "📍 Current directory: $(pwd)"
echo ""
echo "🚀 Running start-all.sh..."
echo ""

# Run the start-all script
./start-all.sh

# If start-all.sh fails, provide manual instructions
if [ $? -ne 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "⚠️  Automatic start failed. Use manual method:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Terminal 1 - Backend:"
    echo "  cd server"
    echo "  source venv/bin/activate"
    echo "  uvicorn main:app --reload"
    echo ""
    echo "Terminal 2 - Frontend:"
    echo "  cd frontend"
    echo "  npm run dev"
    echo ""
fi
