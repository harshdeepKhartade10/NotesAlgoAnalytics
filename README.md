# Note Sharing Platform

A full-stack web application for sharing thoughts and stories through notes. Built with React, Node.js, and MongoDB.

## Features

- User authentication (Register/Login)
- Create, read, update, and delete notes
- Responsive design with dark mode support
- Protected routes
- Form validation
- Real-time feedback

## Tech Stack

### Frontend
- React
- React Router
- Context API for state management
- Custom CSS with dark mode support

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm 


Install frontend dependencies
```bash
cd frontend
npm install
```
Install backend dependencies
```bash
cd ../backend
npm install
```

Create a .env file in the backend directory
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

 Start the backend server
```bash
cd backend
npm start
```
Start the frontend development server
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`



This project is licensed under the MIT License - see the LICENSE file for details. 
