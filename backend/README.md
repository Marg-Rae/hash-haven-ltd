# HashHaven Ltd - Backend API

Backend API for HashHaven Ltd web application.

## Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)
- CORS enabled

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hashhaven
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Posts
- GET `/api/posts` - Get all posts
- GET `/api/posts/:slug` - Get post by slug
- POST `/api/posts` - Create new post
- PUT `/api/posts/id/:id` - Update post
- DELETE `/api/posts/id/:id` - Delete post

### Projects
- GET `/api/projects` - Get all projects
- GET `/api/projects/:id` - Get project by ID
- POST `/api/projects` - Create new project
- PUT `/api/projects/:id` - Update project
- DELETE `/api/projects/:id` - Delete project

### Contact
- GET `/api/contact` - Get all contacts
- GET `/api/contact/:id` - Get contact by ID
- POST `/api/contact` - Submit contact form
- PUT `/api/contact/:id` - Update contact
- DELETE `/api/contact/:id` - Delete contact

## Deployment

Deploy to Render:
1. Create new Web Service
2. Connect GitHub repository
3. Set environment variables
4. Deploy
