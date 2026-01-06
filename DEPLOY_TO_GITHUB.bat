@echo off
echo ========================================
echo TaskFlow - GitHub Deployment
echo GitHub: https://github.com/chandraneelt
echo ========================================
echo.

echo [1/5] Initializing Git repository...
git init
git branch -M main

echo.
echo [2/5] Adding all files...
git add .

echo.
echo [3/5] Creating initial commit...
git commit -m "Initial commit: TaskFlow - Full-stack task management application

Features implemented:
✅ Next.js 14 frontend with TypeScript
✅ Node.js/Express backend with MongoDB
✅ JWT authentication system
✅ Complete CRUD operations for tasks
✅ Responsive design with TailwindCSS
✅ Security best practices
✅ Production-ready deployment"

echo.
echo [4/5] Adding GitHub remote...
git remote add origin https://github.com/chandraneelt/taskflow.git

echo.
echo [5/5] Ready to push to GitHub!
echo.
echo ⚠️  IMPORTANT: Create the repository first!
echo.
echo 1. Go to: https://github.com/chandraneelt
echo 2. Click "New repository"
echo 3. Repository name: taskflow
echo 4. Description: Full-stack task management application with Next.js and Node.js
echo 5. Make it Public
echo 6. DON'T initialize with README (we already have one)
echo 7. Click "Create repository"
echo.
echo After creating the repository, press any key to push...
pause

echo.
echo Pushing to GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ SUCCESS! Repository pushed to GitHub
    echo.
    echo 🌐 Your repository: https://github.com/chandraneelt/taskflow
    echo.
    echo Next steps for deployment:
    echo.
    echo 📦 FRONTEND DEPLOYMENT (Vercel):
    echo 1. Go to https://vercel.com
    echo 2. Sign in with GitHub
    echo 3. Click "New Project"
    echo 4. Import: chandraneelt/taskflow
    echo 5. Framework: Next.js
    echo 6. Root Directory: frontend
    echo 7. Add environment variable:
    echo    NEXT_PUBLIC_API_URL = https://taskflow-backend-production.railway.app/api
    echo 8. Deploy
    echo.
    echo 🔧 BACKEND DEPLOYMENT (Railway):
    echo 1. Go to https://railway.app
    echo 2. Sign in with GitHub
    echo 3. New Project → Deploy from GitHub
    echo 4. Select: chandraneelt/taskflow
    echo 5. Root Directory: backend
    echo 6. Add environment variables:
    echo    PORT=5000
    echo    MONGODB_URI=your-mongodb-atlas-connection-string
    echo    JWT_SECRET=your-super-secure-jwt-secret-32-chars-min
    echo    NODE_ENV=production
    echo    FRONTEND_URL=https://taskflow-chandraneelt.vercel.app
    echo 7. Deploy
    echo.
    echo 🗄️  DATABASE SETUP (MongoDB Atlas):
    echo 1. Go to https://mongodb.com/atlas
    echo 2. Create free account
    echo 3. Create cluster (M0 Sandbox - Free)
    echo 4. Create database user
    echo 5. Allow network access (0.0.0.0/0 for development)
    echo 6. Get connection string
    echo 7. Add to Railway environment variables
    echo.
    echo 📋 FINAL SUBMISSION LINKS:
    echo Frontend: https://taskflow-chandraneelt.vercel.app
    echo Backend: https://taskflow-backend-production.railway.app
    echo GitHub: https://github.com/chandraneelt/taskflow
    echo.
) else (
    echo.
    echo ❌ Push failed. Make sure you created the repository first!
    echo Go to: https://github.com/chandraneelt
    echo Create repository named: taskflow
    echo Then run this script again.
)

echo.
echo ========================================
echo Deployment preparation complete!
echo ========================================
pause