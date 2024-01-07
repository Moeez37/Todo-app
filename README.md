# ToDo App

This application is built using Next.js for the frontend and Express.js with MongoDB for the backend.

## Overview

The ToDo app is a simple application allowing users to manage tasks efficiently. It supports CRUD (Create, Read, Update, Delete) operations for tasks.

### Features

- Create tasks with a title, description, and due date.
- Read existing tasks and their details.
- Update task details or completion status.
- Delete tasks from the list.




### Backend (`/backend`)

- `controllers/`: Contains the logic handling requests and responses.
- `models/`: Defines MongoDB schema and models for tasks.
- `routes/`: Specifies API routes and endpoint handlers.
- `app.js`: Entry point for the Express.js application.

### Frontend (`/frontend`)

- `pages/`: Contains pages and routes for the Next.js application.
- `components/`: Reusable components used across different pages.
- `styles/`: CSS or styling files for the frontend.
- `public/`: Static assets like images, fonts, etc.

## Setup and Run

1. **Backend (Express.js with MongoDB)**
   - Install dependencies: `cd to-do-server && npm install`
   - Start the server: `npm start`

2. **Frontend (Next.js)**
   - Install dependencies: `cd to-do && npm install`
   - Start the development server: `npm run dev`

### Environment Variables

Ensure to set up environment variables:
- `MONGO_URI`: MongoDB connection string
- `PORT`: Port for the Express server

## Usage

1. Access the app at `http://localhost:3000`.
2. Interact with the interface to manage tasks:
   - Create new tasks.
   - View existing tasks and their details.
   - Update or mark tasks as completed.
   - Delete tasks from the list.

## API Routes

- `/todo`: GET, POST
- `/api/tasks/:id`: PUT, DELETE
  
## File Structure
````markdown
project-root/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
└── frontend/
    ├── pages/
    ├── components/
    ├── styles/
    └── public/
