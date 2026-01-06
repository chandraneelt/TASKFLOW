# Backend API

Node.js/Express backend with MongoDB for the full-stack web application.

## Features

- JWT-based authentication
- User registration and login
- Protected routes with middleware
- CRUD operations for tasks
- Input validation and sanitization
- Password hashing with bcrypt
- Rate limiting and security headers
- Error handling and logging

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fullstack-app
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   ```

3. **Start MongoDB:**
   Make sure MongoDB is running on your system.

4. **Run the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Tasks
- `GET /api/tasks` - Get user tasks with filtering/search (protected)
- `POST /api/tasks` - Create new task (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Health Check
- `GET /api/health` - Server health status

## Security Features

- Password hashing with bcrypt (salt rounds: 12)
- JWT tokens with 7-day expiration
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Helmet for security headers
- Input validation and sanitization
- Protected routes with authentication middleware

## Database Schema

### User Model
```javascript
{
  name: String (required, 2-50 chars)
  email: String (required, unique, validated)
  password: String (required, hashed, min 6 chars)
  avatar: String (optional, URL)
  bio: String (optional, max 500 chars)
  timestamps: true
}
```

### Task Model
```javascript
{
  title: String (required, max 100 chars)
  description: String (optional, max 500 chars)
  status: String (enum: pending, in-progress, completed)
  priority: String (enum: low, medium, high)
  dueDate: Date (optional)
  userId: ObjectId (required, ref: User)
  timestamps: true
}
```

## Production Scaling Considerations

1. **Database Optimization:**
   - Add database indexes for frequently queried fields
   - Implement database connection pooling
   - Consider MongoDB Atlas for managed hosting

2. **Caching:**
   - Implement Redis for session storage and caching
   - Cache frequently accessed user data and task lists

3. **Load Balancing:**
   - Use PM2 for process management
   - Implement horizontal scaling with multiple server instances
   - Add load balancer (nginx, AWS ALB)

4. **Monitoring & Logging:**
   - Implement structured logging (Winston)
   - Add application monitoring (New Relic, DataDog)
   - Set up error tracking (Sentry)

5. **Security Enhancements:**
   - Implement refresh tokens for better JWT security
   - Add API versioning
   - Implement request/response compression
   - Add input sanitization for XSS protection