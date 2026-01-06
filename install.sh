#!/bin/bash

echo "========================================"
echo "TaskFlow Installation Script"
echo "========================================"
echo

echo "[1/5] Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
else
    echo "✅ Node.js found: $(node --version)"
fi

echo
echo "[2/5] Installing backend dependencies..."
cd backend
if npm install; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Backend installation failed"
    exit 1
fi

echo
echo "[3/5] Installing frontend dependencies..."
cd ../frontend
if npm install; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Frontend installation failed"
    exit 1
fi

echo
echo "[4/5] Setting up environment files..."
cd ..
if [ ! -f "backend/.env" ]; then
    if [ -f "backend/.env.example" ]; then
        cp "backend/.env.example" "backend/.env"
        echo "✅ Backend .env file created"
    else
        echo "⚠️  Backend .env.example not found"
    fi
else
    echo "✅ Backend .env file already exists"
fi

if [ ! -f "frontend/.env.local" ]; then
    if [ -f "frontend/.env.local.example" ]; then
        cp "frontend/.env.local.example" "frontend/.env.local"
        echo "✅ Frontend .env.local file created"
    else
        echo "⚠️  Frontend .env.local.example not found"
    fi
else
    echo "✅ Frontend .env.local file already exists"
fi

echo
echo "[5/5] Checking MongoDB..."
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB found: $(mongod --version | head -n1)"
elif pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB service is running"
else
    echo "⚠️  MongoDB not found or not running"
    echo "Please install MongoDB or set up MongoDB Atlas"
    echo "See MONGODB_CONNECTION_FIX.md for instructions"
fi

echo
echo "========================================"
echo "Installation Complete!"
echo "========================================"
echo
echo "To start the application:"
echo "1. Backend: cd backend && npm run dev"
echo "2. Frontend: cd frontend && npm run dev"
echo "3. Visit: http://localhost:3000"
echo
echo "For MongoDB setup: See MONGODB_CONNECTION_FIX.md"
echo