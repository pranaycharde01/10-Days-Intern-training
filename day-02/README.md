# Day 2 — Python Development

## Objective

The objective of Day 2 was to practice Python programming, data handling, CSV analysis and build a Python-based management system using JSON storage.

## Exercises / Practice

### 1. Student Management System

A basic Python student management system was created with the following features:

* Add Student
* Display Students
* Search Student
* Exit

Student information includes:

* Name
* Age
* Department
* Marks

### 2. CSV Data Analysis

A CSV dataset was created and analyzed using Python's built-in `csv` module.

The analysis checks:

* Total number of records
* Missing values
* Duplicate records
* Average marks
* Minimum marks
* Maximum marks
* Department-wise statistics

## Practical Assignment

### Employee Management System

A Python employee management system was developed using JSON for data storage.

The system supports:

* Add Employee
* Display Employees
* Update Employee
* Delete Employee
* Search Employee
* Filter by Department
* Sort by Salary
* Statistics

### Employee Statistics

The system can calculate:

* Total employees
* Average salary
* Minimum salary
* Maximum salary

## Data Storage

Employee data is stored in:

```text
employees.json
```

The program automatically loads existing employee data when it starts and saves changes to the JSON file.

## Exception Handling

Exception handling was implemented to handle:

* Invalid numbers
* Invalid employee IDs
* Invalid salary input
* Missing JSON file
* Invalid JSON data

## Technologies Used

* Python
* CSV
* JSON
* File Handling
* Exception Handling
* Lists
* Dictionaries
* Functions

## Project Structure

```text
day-02/
├── python-exercises/
│   └── management_practice.py
│
├── management-system/
│   ├── main.py
│   └── employees.json
│
├── csv-analysis/
│   ├── analysis.py
│   └── data.csv
│
└── README.md
```

## Conclusion

Day 2 provided practical experience with Python programming, file handling, CSV/JSON data, exception handling and building a simple management system.
