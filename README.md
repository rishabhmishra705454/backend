# Task Management Application - Backend

Welcome to the backend repository of our task management application! 

## Getting Started

To get the backend server up and running, follow these steps

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or a MongoDB Atlas account

### Installation

1. Clone this repository to your local machine:
2. Navigate to the backend directory:
3. Install dependencies: `npm install`
4. Run Project: `npm start`

### Running the Server

Start the backend server by running:

This will start the server at the specified port and connect to your MongoDB database.

## API Endpoints

The backend provides the following RESTful API endpoints:

### User Authentication

- `POST /login`: Endpoint to authenticate users. Requires a valid email and password.
- `POST /signup`: Endpoint to register new users. Requires a fullname , email and password.

### Task Management

- `POST /tasks`: Create a new task. Requires a title, description, and status in the request body.
- `GET /tasks`: Get all tasks. Returns a list of all tasks in the database.
- `PUT /tasks/:taskId`: Update an existing task. Requires the ID of the task to be updated and new task data in the request body.
- `DELETE /tasks/:taskId`: Delete a task by ID. Requires the ID of the task to be deleted.
- `GET /tasks/todays`: Get tasks for today. Returns a list of tasks scheduled for today.

### Postman Collection

You can find the Postman collection for testing [here](https://drive.google.com/file/d/1W0h3KV_n_EIJTHKTAA7zoRzRMdQHhBW8/view?usp=sharing).






