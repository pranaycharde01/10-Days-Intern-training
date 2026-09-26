# Database Relationships

## 1. Users and Complaints

One user can create many complaints.

Relationship: One-to-Many

Users (1) → Complaints (*)

Foreign Key:
complaints.user_id → users.id

---

## 2. Departments and Employees

One department can have many employees.

Relationship: One-to-Many

Departments (1) → Employees (*)

Foreign Key:
employees.department_id → departments.id

---

## 3. Facilities and Inspections

One facility can have many inspections.

Relationship: One-to-Many

Facilities (1) → Inspections (*)

Foreign Key:
inspections.facility_id → facilities.id

---

## 4. Facilities and Complaints

One facility can have many complaints.

Relationship: One-to-Many

Facilities (1) → Complaints (*)

Foreign Key:
complaints.facility_id → facilities.id

---

## Foreign Keys

| Table       | Foreign Key   | References     |
| ----------- | ------------- | -------------- |
| employees   | department_id | departments.id |
| inspections | facility_id   | facilities.id  |
| complaints  | facility_id   | facilities.id  |
| complaints  | user_id       | users.id       |

---

## Relationship Summary

| Parent Table | Child Table | Relationship |
| ------------ | ----------- | ------------ |
| Departments  | Employees   | One-to-Many  |
| Facilities   | Inspections | One-to-Many  |
| Facilities   | Complaints  | One-to-Many  |
| Users        | Complaints  | One-to-Many  |

---

## Primary Keys

Each table has an `id` column that uniquely identifies each record.

* users.id
* departments.id
* employees.id
* facilities.id
* inspections.id
* complaints.id

---

## Purpose of Relationships

Database relationships connect related data between different tables.

Examples:

* One department can have many employees.
* One facility can have many inspections.
* One facility can have many complaints.
* One user can submit many complaints.

These relationships help keep the database organized and connected.

Laravel will later use these relationships through Eloquent ORM.
