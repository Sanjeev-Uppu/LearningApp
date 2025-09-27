@echo off
echo ========================================
echo PathMind AI - Development Startup
echo ========================================
echo.

echo [1/3] Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo [2/3] Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo [3/3] Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ✅ Development servers are starting...
echo.
echo 📱 Frontend: http://localhost:8080
echo 🔗 Backend:  http://localhost:5000
echo.
echo 🚀 Both servers should open in new windows
echo 📝 Check the terminal windows for any errors
echo.
pause
