#!/bin/bash

echo "========================================"
echo "PathMind AI - Production Deployment"
echo "========================================"
echo

echo "[1/6] Cleaning up previous builds..."
rm -rf dist/
rm -rf backend/dist/
echo "✅ Cleanup completed"

echo
echo "[2/6] Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend dependency installation failed"
    exit 1
fi
echo "✅ Frontend dependencies installed"

echo
echo "[3/6] Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend dependency installation failed"
    exit 1
fi
cd ..
echo "✅ Backend dependencies installed"

echo
echo "[4/6] Building frontend for production..."
npm run build:prod
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi
echo "✅ Frontend built successfully"

echo
echo "[5/6] Running database cleanup..."
cd backend
npm run cleanup-db
if [ $? -ne 0 ]; then
    echo "❌ Database cleanup failed"
    exit 1
fi
cd ..
echo "✅ Database cleaned successfully"

echo
echo "[6/6] Production deployment completed!"
echo
echo "📁 Frontend build: ./dist/"
echo "📁 Backend ready: ./backend/"
echo
echo "🚀 Next steps:"
echo "1. Upload dist/ folder to your web server"
echo "2. Deploy backend to your server"
echo "3. Set up environment variables"
echo "4. Configure domain and SSL"
echo
echo "✅ Deployment script completed successfully!"
