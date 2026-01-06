@echo off
echo ========================================
echo TaskFlow Installation Script
echo ========================================
echo.

echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo ✅ Node.js found
)

echo.
echo [2/5] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend installation failed
    pause
    exit /b 1
) else (
    echo ✅ Backend dependencies installed
)

echo.
echo [3/5] Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed
    pause
    exit /b 1
) else (
    echo ✅ Frontend dependencies installed
)

echo.
echo [4/5] Setting up environment files...
cd ..
if not exist "backend\.env" (
    copy "backend\.env.example" "backend\.env" >nul 2>&1
    echo ✅ Backend .env file created
) else (
    echo ✅ Backend .env file already exists
)

if not exist "frontend\.env.local" (
    copy "frontend\.env.local.example" "frontend\.env.local" >nul 2>&1
    echo ✅ Frontend .env.local file created
) else (
    echo ✅ Frontend .env.local file already exists
)

echo.
echo [5/5] Checking MongoDB...
sc query MongoDB >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  MongoDB service not found
    echo Please install MongoDB or set up MongoDB Atlas
    echo See MONGODB_CONNECTION_FIX.md for instructions
) else (
    echo ✅ MongoDB service found
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start the application:
echo 1. Backend: cd backend && npm run dev
echo 2. Frontend: cd frontend && npm run dev
echo 3. Visit: http://localhost:3000
echo.
echo For MongoDB setup: See MONGODB_CONNECTION_FIX.md
echo.
pause