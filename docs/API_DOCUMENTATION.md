# API Documentation

Complete API documentation for the full-stack web application backend.

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication Endpoints

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "",
    "bio": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "",
    "bio": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get Current User
```http
GET /auth/me
```
*Requires authentication*

**Response (200):**
```json
{
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "",
    "bio": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### User Endpoints

#### Get User Profile
```http
GET /users/profile
```
*Requires authentication*

**Response (200):**
```json
{
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "Software developer",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update User Profile
```http
PUT /users/profile
```
*Requires authentication*

**Request Body:**
```json
{
  "name": "John Smith",
  "bio": "Full-stack developer",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "user_id",
    "name": "John Smith",
    "email": "john@example.com",
    "avatar": "https://example.com/new-avatar.jpg",
    "bio": "Full-stack developer",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Task Endpoints

#### Get Tasks
```http
GET /tasks
```
*Requires authentication*

**Query Parameters:**
- `status` (optional): Filter by status (`pending`, `in-progress`, `completed`)
- `priority` (optional): Filter by priority (`low`, `medium`, `high`)
- `search` (optional): Search in title and description
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)

**Example:**
```http
GET /tasks?status=pending&priority=high&search=urgent&page=1&limit=20
```

**Response (200):**
```json
{
  "tasks": [
    {
      "_id": "task_id",
      "title": "Complete project",
      "description": "Finish the full-stack application",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2024-01-15T00:00:00.000Z",
      "userId": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1
  }
}
```

#### Create Task
```http
POST /tasks
```
*Requires authentication*

**Request Body:**
```json
{
  "title": "New task",
  "description": "Task description",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2024-01-15T00:00:00.000Z"
}
```

**Response (201):**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "task_id",
    "title": "New task",
    "description": "Task description",
    "status": "pending",
    "priority": "medium",
    "dueDate": "2024-01-15T00:00:00.000Z",
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get Single Task
```http
GET /tasks/:id
```
*Requires authentication*

**Response (200):**
```json
{
  "task": {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "status": "pending",
    "priority": "medium",
    "dueDate": "2024-01-15T00:00:00.000Z",
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Task
```http
PUT /tasks/:id
```
*Requires authentication*

**Request Body:**
```json
{
  "title": "Updated task",
  "description": "Updated description",
  "status": "completed",
  "priority": "low",
  "dueDate": "2024-01-20T00:00:00.000Z"
}
```

**Response (200):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "task_id",
    "title": "Updated task",
    "description": "Updated description",
    "status": "completed",
    "priority": "low",
    "dueDate": "2024-01-20T00:00:00.000Z",
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

#### Delete Task
```http
DELETE /tasks/:id
```
*Requires authentication*

**Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

### Health Check

#### Server Health
```http
GET /health
```

**Response (200):**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Error Responses

### Validation Error (400)
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email"
    }
  ]
}
```

### Authentication Error (401)
```json
{
  "message": "Access denied. No token provided."
}
```

### Not Found Error (404)
```json
{
  "message": "Task not found"
}
```

### Server Error (500)
```json
{
  "message": "Something went wrong!",
  "error": "Detailed error message (development only)"
}
```

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Headers:** Rate limit information is included in response headers
- **Exceeded:** Returns 429 status code when limit is exceeded

## Security Features

- **Password Hashing:** bcrypt with salt rounds of 12
- **JWT Expiration:** Tokens expire after 7 days
- **CORS:** Configured for frontend domain
- **Helmet:** Security headers applied
- **Input Validation:** All inputs validated and sanitized