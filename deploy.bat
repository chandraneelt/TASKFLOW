@echo off
echo ========================================
echo TaskFlow Deployment Script
echo ========================================
echo.

echo [1/4] Checking Git repository...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo Initializing Git repository...
    git init
    git branch -M main
) else (
    echo ✅ Git repository found
)

echo.
echo [2/4] Adding files to Git...
git add .
git commit -m "Deploy TaskFlow - Full-stack task management application"

echo.
echo [3/4] Deployment options:
echo.
echo Choose your deployment platform:
echo 1. GitHub + Vercel + Railway (Recommended)
echo 2. GitHub + Netlify + Render
echo 3. Just push to GitHub
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo 📋 DEPLOYMENT INSTRUCTIONS:
    echo.
    echo 1. Push to GitHub:
    echo    - Create repository at https://github.com/new
    echo    - Copy this command: git remote add origin https://github.com/YOURUSERNAME/taskflow.git
    echo    - Run: git push -u origin main
    echo.
    echo 2. Deploy Frontend to Vercel:
    echo    - Go to https://vercel.com
    echo    - Import GitHub repository
    echo    - Set root directory to: frontend
    echo    - Add environment variable: NEXT_PUBLIC_API_URL
    echo.
    echo 3. Deploy Backend to Railway:
    echo    - Go to https://railway.app
    echo    - Import GitHub repository
    echo    - Set root directory to: backend
    echo    - Add environment variables from backend/.env.example
    echo.
    echo 4. Set up MongoDB Atlas:
    echo    - Go to https://mongodb.com/atlas
    echo    - Create free cluster
    echo    - Get connection string
    echo    - Add to Railway environment variables
)

if "%choice%"=="2" (
    echo.
    echo 📋 DEPLOYMENT INSTRUCTIONS:
    echo.
    echo 1. Push to GitHub (same as above)
    echo 2. Deploy Frontend to Netlify: https://netlify.com
    echo 3. Deploy Backend to Render: https://render.com
    echo 4. Set up MongoDB Atlas (same as above)
)

if "%choice%"=="3" (
    echo.
    echo Ready to push to GitHub!
    echo Create a repository at: https://github.com/new
    echo Then run these commands:
    echo.
    echo git remote add origin https://github.com/YOURUSERNAME/taskflow.git
    echo git push -u origin main
)

echo.
echo [4/4] Next steps:
echo ✅ Code is committed and ready
echo 📖 See DEPLOYMENT_GUIDE.md for detailed instructions
echo 🌐 Your app will be available at permanent URLs after deployment
echo.
echo ========================================
echo Deployment preparation complete!
echo ========================================
pause