# Task Management Application

A full-stack web application for managing tasks and user profiles, built with modern technologies.

## About This Project

I built this application to demonstrate full-stack development skills using Next.js and Node.js. The focus was on creating a clean, scalable architecture with proper authentication and real-time features.

### Why These Technologies?

- **Next.js**: Chose this over plain React for better SEO and performance with SSR
- **TailwindCSS**: Faster development than writing custom CSS, and easier to maintain
- **MongoDB**: Document-based storage works well for user profiles and flexible task data
- **JWT**: Stateless authentication that scales better than sessions

## Features

- **Authentication**: JWT-based signup/login/logout with secure session management
- **Task Management**: Complete CRUD operations with advanced filtering
- **User Profiles**: Customizable profiles with avatar and bio support
- **Responsive Design**: Mobile-first approach with modern UI components
- **Real-time Updates**: Instant feedback and seamless user experience

## Tech Stack

### Frontend
- Next.js 14 with App Router and TypeScript
- TailwindCSS for responsive styling
- React Hook Form for form management
- Axios for API communication

### Backend
- Node.js with Express.js framework
- MongoDB with Mongoose ODM
- JWT authentication with bcrypt password hashing
- Comprehensive input validation and error handling

## Development Notes

### Architecture Decisions
- Used Context API instead of Redux for simpler state management
- Implemented custom hooks for reusable logic
- Separated API client with interceptors for cleaner code
- Added demo mode for testing without database setup

### Security Considerations
- Password hashing with bcrypt (12 salt rounds)
- JWT tokens with 7-day expiration
- Input validation on both client and server
- Rate limiting to prevent abuse
- CORS configuration for production

### Performance Optimizations
- Next.js automatic code splitting
- Optimized database queries with proper indexing
- Lazy loading for non-critical components
- Efficient re-renders with proper React patterns

## Project Structure

```
├── frontend/          # Next.js application
├── backend/           # Express.js API server
├── docs/             # API documentation
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local installation or MongoDB Atlas)
- Git

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd fullstack-web-app
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm run dev
   ```

3. **Frontend Setup (in a new terminal):**
   ```bash
   cd frontend
   npm install
   cp .env.local.example .env.local
   # Edit .env.local with your API URL
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - API Health Check: http://localhost:5000/api/health

### Environment Variables

**Backend (.env):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fullstack-app
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Testing the API

Import the Postman collection from `docs/POSTMAN_COLLECTION.json` to test all API endpoints with pre-configured requests and tests.

## Features Implemented

✅ **Frontend (Next.js + TailwindCSS)**
- Responsive design with mobile-first approach
- JWT-based authentication with protected routes
- User registration and login forms with validation
- Dashboard with user profile and task management
- Search and filter functionality for tasks
- Real-time form validation and error handling
- Toast notifications for user feedback

✅ **Backend (Node.js + Express + MongoDB)**
- RESTful API with comprehensive endpoints
- JWT authentication with secure password hashing
- User registration, login, and profile management
- CRUD operations for tasks with filtering/search
- Input validation and sanitization
- Rate limiting and security middleware
- Error handling and logging

✅ **Security & Best Practices**
- Password hashing with bcrypt (12 salt rounds)
- JWT tokens with 7-day expiration
- Protected API routes with authentication middleware
- Input validation on both client and server
- CORS configuration and security headers
- Rate limiting (100 requests per 15 minutes)

✅ **Database Design**
- MongoDB with Mongoose ODM
- Indexed queries for performance
- User and Task models with proper relationships
- Data validation at schema level

✅ **Documentation & Testing**
- Complete API documentation
- Postman collection with automated tests
- Production scaling strategy
- Setup and deployment guides

## Project Structure

```
├── frontend/              # Next.js React application
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable React components
│   ├── contexts/         # React Context providers
│   └── lib/              # Utilities and API client
├── backend/              # Express.js API server
│   ├── models/           # MongoDB/Mongoose models
│   ├── routes/           # API route handlers
│   ├── middleware/       # Custom middleware functions
│   └── server.js         # Main server file
├── docs/                 # Documentation and API specs
└── README.md            # This file
```

## Technology Choices & Rationale

### Frontend: Next.js + TailwindCSS
- **Next.js**: Server-side rendering, automatic code splitting, and excellent developer experience
- **TailwindCSS**: Utility-first CSS framework for rapid UI development and consistent design
- **TypeScript**: Type safety and better developer experience
- **React Hook Form**: Performant form handling with minimal re-renders

### Backend: Node.js + Express + MongoDB
- **Express.js**: Minimal and flexible web framework with extensive middleware ecosystem
- **MongoDB**: Document-based database perfect for rapid prototyping and flexible schemas
- **JWT**: Stateless authentication suitable for scalable applications
- **bcrypt**: Industry-standard password hashing with configurable salt rounds

### Security Considerations
- JWT tokens stored in HTTP-only cookies (not localStorage)
- Password hashing with high salt rounds (12)
- Input validation on both client and server sides
- Rate limiting to prevent abuse
- CORS configuration for cross-origin requests
- Security headers with Helmet.js

## Deployment Ready

The application is structured for easy deployment with:
- Docker support (can be added)
- Environment-based configuration
- Production-ready security measures
- Comprehensive error handling
- Health check endpoints
- Detailed logging and monitoring setup

## Next Steps for Production

1. **Infrastructure**: Deploy to cloud platforms (AWS, Vercel, Railway)
2. **Database**: Migrate to MongoDB Atlas for managed hosting
3. **Caching**: Implement Redis for session storage and caching
4. **Monitoring**: Add application monitoring and error tracking
5. **CI/CD**: Set up automated testing and deployment pipelines
6. **Performance**: Implement code splitting and lazy loading
7. **Security**: Add refresh tokens and enhanced rate limiting

This implementation demonstrates a solid foundation for a scalable, secure, and maintainable full-stack web application that can grow from a prototype to a production system.