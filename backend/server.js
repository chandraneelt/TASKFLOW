const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

const app = express();

// Security setup - I prefer helmet for production-ready headers
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting - prevents brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // reasonable limit for most use cases
});
app.use(limiter);

// Body parsing with size limits for security
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Database connection with better error handling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskflow', {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('⚠️  MongoDB is not available. Please set up MongoDB to use authentication and data features.');
    console.log('📖 See MONGODB_SETUP.md for quick setup instructions.');
    
    // Don't exit the process, just log the error
    console.log('🔄 Server will continue running without database functionality.');
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoStatus,
    message: mongoStatus === 'Disconnected' ? 'MongoDB not available - see MONGODB_SETUP.md' : 'All systems operational'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});