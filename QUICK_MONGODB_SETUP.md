# Quick MongoDB Setup (5 Minutes)

The registration error occurs because MongoDB is not connected. Here's the fastest way to fix it:

## Option 1: MongoDB Atlas (Free Cloud Database) - RECOMMENDED

### Step 1: Create Account
1. Go to https://www.mongodb.com/atlas
2. Click "Try Free"
3. Sign up with your email

### Step 2: Create Cluster
1. Choose "Build a database"
2. Select "M0 Sandbox" (FREE tier)
3. Choose any cloud provider/region
4. Click "Create cluster" (takes 1-3 minutes)

### Step 3: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `taskflow-user`
5. Password: `taskflow123` (or generate one)
6. Click "Add User"

### Step 4: Allow Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go back to "Database" (clusters)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://taskflow-user:<password>@cluster0.xxxxx.mongodb.net/`)

### Step 6: Update Backend
Replace the content in `backend/.env`:

```
PORT=5000
MONGODB_URI=mongodb+srv://taskflow-user:taskflow123@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL from step 5**

### Step 7: Restart Backend
The backend will automatically restart and connect to your cloud database.

## Option 2: Local MongoDB (If you prefer local setup)

### Windows:
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will start automatically

### macOS (with Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### Linux (Ubuntu):
```bash
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

## Verify Connection
Once MongoDB is set up, you should see "Connected to MongoDB" in the backend console instead of connection errors.

Then you can:
1. Register a new account at http://localhost:3000/auth/register
2. Login and use all features
3. Create and manage tasks
4. Update your profile

## Need Help?
If you encounter any issues, the MongoDB Atlas documentation is excellent: https://docs.atlas.mongodb.com/getting-started/