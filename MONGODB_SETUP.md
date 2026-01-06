# Quick MongoDB Setup Guide

## The Issue
The server error you're seeing is because MongoDB is not running. The backend needs a database to store users and tasks.

## Quick Solution: MongoDB Atlas (Free Cloud Database)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Click "Try Free"
3. Sign up with your email
4. Choose "Build a database"
5. Select "M0 Sandbox" (FREE tier)
6. Choose a cloud provider and region
7. Create cluster (takes 1-3 minutes)

### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like: mongodb+srv://username:password@cluster.mongodb.net/)

### Step 3: Update Backend Configuration
Replace the content in `backend/.env` with:

```
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/fullstack-app?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Step 4: Restart Backend Server
The backend will automatically restart and connect to your cloud database.

## Alternative: Local MongoDB Installation

### Windows:
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will start automatically as a Windows service

### Using Docker (if you have Docker):
```bash
docker run -d -p 27017:27017 --name mongodb mongo:6
```

## Verify Connection
Once MongoDB is set up, you should see "Connected to MongoDB" in the backend console instead of connection errors.