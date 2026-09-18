# Day 6 — TypeScript + React

## Objective

Learn TypeScript and React and build an Employee Management Dashboard.

## Technologies Used

* TypeScript
* React
* Vite
* Node.js
* Express.js
* REST API
* JSON
* CSS

## TypeScript

Covered:

* Primitive types
* Arrays and objects
* Interfaces
* Type aliases
* Union types
* Enums
* Optional properties
* Functions
* Classes
* Generics
* Type narrowing
* Type guards

## React Dashboard Features

* Total employees
* Average salary
* Departments
* Search employees
* Filter by department
* Sort by name and salary
* View employee details
* Add employee
* Edit employee
* Delete employee
* Form validation
* Error handling

## API Endpoints

| Method | Endpoint             | Purpose         |
| ------ | -------------------- | --------------- |
| GET    | `/api/employees`     | Get employees   |
| POST   | `/api/employees`     | Add employee    |
| PUT    | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

## Project Structure

```text
day-06/
├── .gitignore
├── README.md
├── typescript/
└── react-app/
    ├── client/
    └── server/
```

## How to Run

### Backend

```bash
cd react-app/server
node server.js
```

### Frontend

Open another terminal:

```bash
cd react-app/client
npm run dev
```

Open the URL provided by Vite.

## Architecture

```text
React + TypeScript
        ↓
Node.js + Express
        ↓
employees.json
```

## Conclusion

Successfully built a React Employee Management Dashboard using TypeScript, REST API, CRUD operations, custom hooks, validation and reusable components.

