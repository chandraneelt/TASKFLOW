# TaskFlow - System Requirements

## 📋 **System Requirements**

### **Runtime Requirements**
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **MongoDB**: Version 6.0 or higher (local) OR MongoDB Atlas (cloud)

### **Operating System Support**
- ✅ **Windows**: 10/11 (tested)
- ✅ **macOS**: 10.15+ 
- ✅ **Linux**: Ubuntu 20.04+, CentOS 8+

## 🔧 **Installation Requirements**

### **Backend Dependencies (`backend/package.json`)**

#### **Production Dependencies:**
```json
{
  "express": "^4.18.2",           // Web framework
  "mongoose": "^8.0.3",           // MongoDB ODM
  "bcryptjs": "^2.4.3",           // Password hashing
  "jsonwebtoken": "^9.0.2",       // JWT authentication
  "cors": "^2.8.5",               // Cross-origin requests
  "dotenv": "^16.3.1",            // Environment variables
  "express-validator": "^7.0.1",  // Input validation
  "helmet": "^7.1.0",             // Security headers
  "express-rate-limit": "^7.1.5"  // Rate limiting
}
```

#### **Development Dependencies:**
```json
{
  "nodemon": "^3.0.2",            // Auto-restart server
  "jest": "^29.7.0"               // Testing framework
}
```

### **Frontend Dependencies (`frontend/package.json`)**

#### **Production Dependencies:**
```json
{
  "next": "14.0.4",               // React framework
  "react": "^18",                 // UI library
  "react-dom": "^18",             // React DOM renderer
  "axios": "^1.6.2",              // HTTP client
  "react-hook-form": "^7.48.2",   // Form handling
  "react-hot-toast": "^2.4.1",    // Notifications
  "lucide-react": "^0.294.0",     // Icons
  "js-cookie": "^3.0.5"           // Cookie management
}
```

#### **Development Dependencies:**
```json
{
  "typescript": "^5",              // Type safety
  "@types/node": "^20",            // Node.js types
  "@types/react": "^18",           // React types
  "@types/react-dom": "^18",       // React DOM types
  "@types/js-cookie": "^3.0.6",    // Cookie types
  "autoprefixer": "^10.0.1",       // CSS prefixes
  "eslint": "^8",                  // Code linting
  "eslint-config-next": "14.0.4",  // Next.js ESLint config
  "postcss": "^8",                 // CSS processing
  "tailwindcss": "^3.3.0"         // CSS framework
}
```

## 🚀 **Quick Setup Commands**

### **1. Install Node.js**
```bash
# Windows (using winget)
winget install OpenJS.NodeJS

# macOS (using Homebrew)
brew install node

# Linux (Ubuntu)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### **2. Install MongoDB**
```bash
# Windows (using winget)
winget install MongoDB.Server

# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Linux (Ubuntu)
sudo apt-get install -y mongodb
```

### **3. Install Project Dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## 🔧 **Environment Configuration**

### **Required Environment Files:**

#### **Backend (`.env`):**
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/taskflow
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### **Frontend (`.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📊 **Resource Requirements**

### **Minimum System Requirements:**
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **CPU**: Dual-core processor
- **Network**: Internet connection for MongoDB Atlas (optional)

### **Development Environment:**
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 5GB free space
- **CPU**: Quad-core processor recommended

## 🌐 **Browser Support**

### **Frontend Compatibility:**
- ✅ **Chrome**: 90+
- ✅ **Firefox**: 88+
- ✅ **Safari**: 14+
- ✅ **Edge**: 90+

## 🔒 **Security Requirements**

### **Production Environment:**
- HTTPS/TLS encryption
- Secure JWT secret (32+ characters)
- MongoDB authentication enabled
- Rate limiting configured
- CORS properly configured
- Security headers enabled (Helmet.js)

## 📱 **Device Support**

### **Responsive Design:**
- ✅ **Desktop**: 1024px and above
- ✅ **Tablet**: 768px - 1023px
- ✅ **Mobile**: 320px - 767px

## 🧪 **Testing Requirements**

### **Backend Testing:**
```bash
cd backend
npm test
```

### **Frontend Testing:**
```bash
cd frontend
npm run lint
npm run build  # Test build process
```

## 📦 **Deployment Requirements**

### **Production Checklist:**
- [ ] Node.js 18+ installed
- [ ] MongoDB configured and secured
- [ ] Environment variables set
- [ ] HTTPS certificate configured
- [ ] Domain name configured
- [ ] Firewall rules configured
- [ ] Backup strategy implemented

### **Recommended Hosting:**
- **Frontend**: Vercel, Netlify, AWS Amplify
- **Backend**: Railway, Render, AWS EC2, DigitalOcean
- **Database**: MongoDB Atlas, AWS DocumentDB

## 🔄 **Version Compatibility**

### **Node.js Versions:**
- ✅ **18.x**: Fully supported (recommended)
- ✅ **19.x**: Supported
- ✅ **20.x**: Supported
- ❌ **16.x**: Not recommended (security updates ended)

### **MongoDB Versions:**
- ✅ **6.0+**: Fully supported (recommended)
- ✅ **5.0+**: Supported
- ❌ **4.x**: Not supported

## 📞 **Support & Troubleshooting**

### **Common Issues:**
1. **MongoDB Connection**: See `MONGODB_CONNECTION_FIX.md`
2. **Port Conflicts**: Change ports in environment files
3. **Permission Issues**: Run with appropriate user permissions
4. **Memory Issues**: Increase Node.js memory limit: `node --max-old-space-size=4096`

### **Useful Commands:**
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB status (Windows)
Get-Service -Name MongoDB

# Check port usage
netstat -an | findstr :3000
netstat -an | findstr :5000
```