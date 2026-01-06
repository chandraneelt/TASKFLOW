# TaskFlow Deployment Guide

## 🌐 **Quick Deployment Options**

### **Option 1: Vercel + Railway (Recommended - Free)**

#### **Frontend Deployment (Vercel):**
1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial TaskFlow deployment"
   git branch -M main
   git remote add origin https://github.com/yourusername/taskflow.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Set build settings:
     - **Framework Preset**: Next.js
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`
   - Add environment variable:
     - `NEXT_PUBLIC_API_URL`: `https://your-backend-url.railway.app/api`
   - Click "Deploy"

#### **Backend Deployment (Railway):**
1. **Go to Railway:**
   - Visit https://railway.app
   - Sign up with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select "backend" folder

2. **Configure Railway:**
   - **Start Command**: `npm start`
   - **Environment Variables**:
     ```
     PORT=5000
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow
     JWT_SECRET=your-super-secret-jwt-key-production-2024
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend-url.vercel.app
     ```

3. **Set up MongoDB Atlas:**
   - Go to https://mongodb.com/atlas
   - Create free cluster
   - Get connection string
   - Add to Railway environment variables

**Result**: 
- Frontend: `https://taskflow-yourusername.vercel.app`
- Backend: `https://taskflow-backend.railway.app`

---

### **Option 2: Netlify + Render (Alternative)**

#### **Frontend (Netlify):**
1. **Deploy to Netlify:**
   - Go to https://netlify.com
   - Drag and drop your `frontend` folder
   - Or connect GitHub repository
   - Build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
   - Environment variables:
     - `NEXT_PUBLIC_API_URL`: Your backend URL

#### **Backend (Render):**
1. **Deploy to Render:**
   - Go to https://render.com
   - Connect GitHub repository
   - Create "Web Service"
   - Settings:
     - **Root Directory**: `backend`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Add environment variables

---

### **Option 3: All-in-One Platforms**

#### **Railway (Full-Stack):**
1. **Deploy Both Frontend & Backend:**
   - Create two services in Railway
   - One for frontend, one for backend
   - Configure build commands for each

#### **Heroku (Traditional):**
1. **Create Heroku Apps:**
   ```bash
   # Backend
   heroku create taskflow-backend-yourname
   
   # Frontend  
   heroku create taskflow-frontend-yourname
   ```

2. **Deploy with Git:**
   ```bash
   # Backend deployment
   git subtree push --prefix backend heroku-backend main
   
   # Frontend deployment
   git subtree push --prefix frontend heroku-frontend main
   ```

---

## 🔧 **Pre-Deployment Checklist**

### **1. Environment Configuration**

#### **Production Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=super-secure-production-jwt-secret-32-characters-minimum
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

#### **Production Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

### **2. Code Preparation**

#### **Update CORS for Production:**
```javascript
// backend/server.js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-domain.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

#### **Update API Base URL:**
```javascript
// frontend/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-domain.railway.app/api'
```

### **3. Database Setup**

#### **MongoDB Atlas (Free Tier):**
1. Create cluster at https://mongodb.com/atlas
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for development)
4. Get connection string
5. Update environment variables

---

## 📋 **Deployment Commands**

### **Quick Deploy Script:**
```bash
#!/bin/bash

echo "🚀 Deploying TaskFlow..."

# 1. Commit changes
git add .
git commit -m "Deploy TaskFlow application"
git push origin main

# 2. Deploy frontend to Vercel
echo "📦 Deploying frontend..."
cd frontend
npx vercel --prod

# 3. Deploy backend to Railway
echo "🔧 Deploying backend..."
cd ../backend
# Railway auto-deploys on git push

echo "✅ Deployment complete!"
echo "Frontend: Check Vercel dashboard"
echo "Backend: Check Railway dashboard"
```

---

## 🌍 **Custom Domain Setup**

### **Frontend (Vercel):**
1. Go to Vercel dashboard
2. Select your project
3. Go to "Settings" → "Domains"
4. Add your custom domain
5. Update DNS records as instructed

### **Backend (Railway):**
1. Go to Railway dashboard
2. Select your service
3. Go to "Settings" → "Domains"
4. Add custom domain
5. Update DNS records

---

## 📊 **Monitoring & Analytics**

### **Add Analytics:**
```javascript
// frontend/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### **Error Monitoring:**
```javascript
// backend/server.js
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});
```

---

## 🔗 **Final URLs**

After deployment, you'll have:

**Frontend URLs:**
- Vercel: `https://taskflow-[random].vercel.app`
- Custom: `https://yourdomain.com`

**Backend URLs:**
- Railway: `https://taskflow-backend-[random].railway.app`
- Custom: `https://api.yourdomain.com`

**GitHub Repository:**
- `https://github.com/yourusername/taskflow`

---

## 🎯 **Submission Links Template**

```
Project Name: TaskFlow - Task Management Application

Live Demo: https://taskflow-yourname.vercel.app
API Endpoint: https://taskflow-backend-yourname.railway.app
GitHub Repository: https://github.com/yourusername/taskflow

Test Credentials:
Email: demo@taskflow.com
Password: demo123

Features Implemented:
✅ User Authentication (JWT)
✅ Task CRUD Operations
✅ Responsive Design
✅ Database Integration (MongoDB)
✅ Security Best Practices
✅ Production Deployment
```