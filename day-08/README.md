# Day 8 — Database + Laravel

## Objective

Learn relational databases and build backend APIs using Laravel.

## SQL & Database

The `sql` folder contains:

- Database schema
- Sample data
- CRUD queries
- SELECT, WHERE and ORDER BY
- GROUP BY and HAVING
- JOIN queries
- Subqueries
- Indexes
- Transactions

## Database Tables

The project uses these tables:

- users
- departments
- employees
- facilities
- inspections
- complaints

## Relationships

- One user can have many complaints.
- One department can have many employees.
- One facility can have many inspections.
- One facility can have many complaints.

## Laravel API

A Laravel REST API was created for:

- Facilities
- Inspections
- Complaints

### API Routes

```text
GET     /api/facilities
POST    /api/facilities
GET     /api/facilities/{id}
PUT     /api/facilities/{id}
DELETE  /api/facilities/{id}

GET     /api/inspections
POST    /api/inspections
GET     /api/inspections/{id}
PUT     /api/inspections/{id}
DELETE  /api/inspections/{id}

GET     /api/complaints
POST    /api/complaints
GET     /api/complaints/{id}
PUT     /api/complaints/{id}
DELETE  /api/complaints/{id}
