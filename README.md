# Invoice Management System

## Project Overview

The Invoice Management System is a full-stack web application built using the MERN stack.
It allows users to register, login, and manage invoices in a simple and organized way.

Users can create invoices, view the list of invoices, update invoice details, and delete invoices.
The application provides a clean and responsive interface to make invoice management easy.

This project demonstrates the use of React for frontend development, Express and Node.js for backend APIs, and MongoDB for database storage.

---

# Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

---

# Features

### Authentication

* User Signup
* User Login
* JWT based authentication

### Invoice Management

* Create a new invoice
* View all invoices
* Update invoice details
* Delete an invoice

### Invoice Fields

Each invoice contains the following details:

* Invoice Number
* Client Name
* Date
* Amount
* Status (Paid / Unpaid / Pending)

### Additional Features

* Clean and responsive UI
* Form validation for required fields
* Protected routes for authenticated users

---

# Project Structure

```
invoice-management-system
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.js
│   │   └── index.js
│
├── backend
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── server.js
│
└── README.md
```

---

# How to Run Locally

## 1. Clone the repository

```
git clone https://github.com/YOUR_GITHUB_REPOSITORY_LINK
```

---

## 2. Install Backend Dependencies

```
cd backend
npm install
```

---

## 3. Setup Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 4. Start Backend Server

```
npm start
```

Server will run on:

```
http://localhost:5000
```

---

## 5. Install Frontend Dependencies

```
cd frontend
npm install
```

---

## 6. Start React Application

```
npm start
```

Frontend will run on:

```
http://localhost:3000
```

---

# API Endpoints

### Create Invoice

POST `/api/invoices`

### Get All Invoices

GET `/api/invoices`

### Update Invoice

PUT `/api/invoices/:id`

### Delete Invoice

DELETE `/api/invoices/:id`

---

# Screenshots

(Add screenshots of the application UI here)

* Login Page
* Signup Page
* Dashboard / Invoice List
* Add Invoice Form

---

# Deployment

Frontend can be deployed using:

* Vercel
* Netlify

Backend can be deployed using:

* Render
* Railway

---

# Conclusion

This project demonstrates a simple full-stack invoice management system with authentication and CRUD functionality. It helps understand how frontend and backend applications communicate using APIs and how data can be stored and managed using MongoDB.
