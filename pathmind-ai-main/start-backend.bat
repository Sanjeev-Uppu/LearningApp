@echo off
echo Starting ConsistAI Backend...
echo.
echo Make sure you have:
echo 1. Node.js installed
echo 2. MongoDB running
echo 3. Environment variables set up
echo.
cd backend
echo Installing dependencies...
npm install
echo.
echo Starting server...
npm run dev
pause
