-- Day 8: Database and Laravel
-- Database Schema

CREATE DATABASE internship_db;

USE internship_db;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments table
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

-- Employees table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,

    FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE SET NULL
);

-- Facilities table
CREATE TABLE facilities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    cleanliness_score DECIMAL(4,2),
    status VARCHAR(50) DEFAULT 'Good',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inspections table
CREATE TABLE inspections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    facility_id INT NOT NULL,
    inspector_name VARCHAR(100) NOT NULL,
    inspection_date DATE NOT NULL,
    score DECIMAL(4,2),
    remarks VARCHAR(255),

    FOREIGN KEY (facility_id)
        REFERENCES facilities(id)
        ON DELETE CASCADE
);

-- Complaints table
CREATE TABLE complaints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    facility_id INT NOT NULL,
    user_id INT,
    complaint_text TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    complaint_date DATE NOT NULL,

    FOREIGN KEY (facility_id)
        REFERENCES facilities(id)
        ON DELETE CASCADE,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);

-- Indexes for faster searching
CREATE INDEX idx_employee_department
ON employees(department_id);

CREATE INDEX idx_inspection_facility
ON inspections(facility_id);

CREATE INDEX idx_complaint_facility
ON complaints(facility_id);

CREATE INDEX idx_complaint_status
ON complaints(status);
