# Fix MongoDB Connection - Step by Step

## Current Issue
Your app is trying to connect to `mongodb://localhost:27017` but MongoDB is not installed/running locally.

## Solution: Use MongoDB Atlas (Free Cloud Database)

### Step 1: Create MongoDB Atlas Account
1. **Go to**: https://www.mongodb.com/atlas
2. **Click**: "Try Free"
3. **Sign up** with your email (Google/GitHub login also works)

### Step 2: Create Your First Cluster
1. **Choose**: "Build a database"
2. **Select**: "M0 Sandbox" (FREE tier - $0/month)
3. **Provider**: Any (AWS, Google Cloud, Azure - doesn't matter)
4. **Region**: Choose closest to you
5. **Cluster Name**: Leave default or name it "TaskFlow"
6. **Click**: "Create cluster" (takes 1-3 minutes)

### Step 3: Create Database User
1. **Go to**: "Database Access" (left sidebar)
2. **Click**: "Add New Database User"
3. **Authentication Method**: Password
4. **Username**: `taskflow`
5. **Password**: `taskflow123` (or click "Autogenerate Secure Password")
6. **Database User Privileges**: "Read and write to any database"
7. **Click**: "Add User"

### Step 4: Allow Network Access
1. **Go to**: "Network Access" (left sidebar)
2. **Click**: "Add IP Address"
3. **Click**: "Allow Access from Anywhere" (for development)
4. **Click**: "Confirm"

### Step 5: Get Connection String
1. **Go back to**: "Database" (clusters view)
2. **Click**: "Connect" button on your cluster
3. **Choose**: "Connect your application"
4. **Driver**: Node.js
5. **Version**: 4.1 or later
6. **Copy** the connection string (looks like):
   ```
   mongodb+srv://taskflow:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Your Backend Configuration
Replace `<password>` in the connection string with your actual password, then update your `backend/.env` file.

## Quick Test
Once updated, your backend should show "Connected to MongoDB" instead of connection errors.

## Troubleshooting
- **Forgot password?** Go to Database Access → Edit User → Reset Password
- **Connection timeout?** Check Network Access → Make sure "0.0.0.0/0" is allowed
- **Still not working?** The cluster might still be starting up (wait 2-3 minutes)