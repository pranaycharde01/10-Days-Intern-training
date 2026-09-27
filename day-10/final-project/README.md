# Smart Facility Management Dashboard

## Project Overview

Smart Facility Management Dashboard is a web application used to manage facilities, inspections, and complaints.

The main dashboard is built with React. An Angular page is also used for inspection analytics. Node.js and Express.js are used for the backend, and MySQL is used to store the data.

## Problem Statement

Managing facility details, inspections, and complaints manually can be difficult.

This project provides one system where users can manage all these records and view useful information.

## Features

* View facility dashboard
* Add, edit, delete, and search facilities
* Add, edit, and delete inspections
* Add, edit, and delete complaints
* View inspection analytics
* Form validation
* Error handling
* REST API connection
* MySQL database

## Technologies Used

* **Frontend:** React, JavaScript, HTML, CSS
* **Angular:** Angular, TypeScript
* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **API:** REST API
* **Tools:** VS Code, Git, GitHub

## Project Structure

```text
final-project/
├── frontend/
│   ├── react-app/
│   └── angular-app/
├── backend/
├── database/
└── README.md
```

## How It Works

```text
React / Angular
       ↓
Node.js + Express
       ↓
     MySQL
```

React and Angular send requests to the Node.js backend. The backend gets or updates data in MySQL.

## Database

The database has three main tables:

* `facilities`
* `inspections`
* `complaints`

Inspections and complaints are connected to facilities using `facility_id`.

## Main API Endpoints

```text
GET    /api/facilities
POST   /api/facilities
PUT    /api/facilities/:id
DELETE /api/facilities/:id

GET    /api/inspections
POST   /api/inspections
PUT    /api/inspections/:id
DELETE /api/inspections/:id

GET    /api/complaints
POST   /api/complaints
PUT    /api/complaints/:id
DELETE /api/complaints/:id

GET    /api/dashboard/stats
```

## Installation

Clone the repository:

```bash
git clone https://github.com/pranaycharde01/10-Days-Intern-training.git
```

Go to the project folder:

```bash
cd 10-Days-Intern-training/day-10/final-project
```

Install dependencies inside:

```text
backend
frontend/react-app
frontend/angular-app
```

Run:

```bash
npm install
```

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smart_facility_db
DB_PORT=3306
```

The actual `.env` file is not uploaded to GitHub.

## How to Run

### Backend

```bash
cd backend
npm run dev
```

Backend:

```text
http://localhost:5000
```

### React

```bash
cd frontend/react-app
npm run dev
```

React:

```text
http://localhost:5173
```

### Angular

```bash
cd frontend/angular-app
npm start
```

Angular:

```text
http://localhost:4200
```

## Testing

The following features were tested:

* MySQL connection
* Backend APIs
* Facility CRUD
* Inspection CRUD
* Complaint CRUD
* React dashboard
* Angular inspection analytics
* React to Angular navigation
* Angular to React navigation

## Challenges

* Connecting React and Angular to the same backend
* Connecting Node.js with MySQL
* Creating CRUD APIs
* Handling form validation and errors
* Displaying API data correctly in Angular

## Future Improvements

* User login and authentication
* More dashboard charts
* PDF and Excel reports
* Email notifications
* Cloud deployment

## Conclusion

This project provides a simple system for managing facilities, inspections, and complaints. It also demonstrates the use of React, Angular, Node.js, Express.js, REST APIs, and MySQL.

