@echo off
echo ========================================
echo PathMind AI - Production Deployment
echo ========================================
echo.

echo [1/6] Cleaning up previous builds...
if exist "dist" rmdir /s /q "dist"
if exist "backend/dist" rmdir /s /q "backend/dist"
echo ✅ Cleanup completed

echo.
echo [2/6] Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend dependency installation failed
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed

echo.
echo [3/6] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend dependency installation failed
    pause
    exit /b 1
)
cd ..
echo ✅ Backend dependencies installed

echo.
echo [4/6] Building frontend for production...
call npm run build:prod
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed
    pause
    exit /b 1
)
echo ✅ Frontend built successfully

echo.
echo [5/6] Running database cleanup...
cd backend
call npm run cleanup-db
if %errorlevel% neq 0 (
    echo ❌ Database cleanup failed
    pause
    exit /b 1
)
cd ..
echo ✅ Database cleaned successfully

echo.
echo [6/6] Production deployment completed!
echo.
echo 📁 Frontend build: ./dist/
echo 📁 Backend ready: ./backend/
echo.
echo 🚀 Next steps:
echo 1. Upload dist/ folder to your web server
echo 2. Deploy backend to your server
echo 3. Set up environment variables
echo 4. Configure domain and SSL
echo.
echo ✅ Deployment script completed successfully!
pause
