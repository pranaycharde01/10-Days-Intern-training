CREATE DATABASE IF NOT EXISTS smart_facility_db;

USE smart_facility_db;

-- Facilities table
CREATE TABLE IF NOT EXISTS facilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(150) NOT NULL,
    facility_type VARCHAR(100) NOT NULL,
    status ENUM('Active', 'Inactive', 'Under Maintenance') DEFAULT 'Active',
    manager_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inspections table
CREATE TABLE IF NOT EXISTS inspections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    facility_id INT NOT NULL,
    inspection_date DATE NOT NULL,
    inspector_name VARCHAR(100) NOT NULL,
    cleanliness_score DECIMAL(4,2) NOT NULL,
    safety_score DECIMAL(4,2) NOT NULL,
    remarks TEXT,
    status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_inspection_facility
        FOREIGN KEY (facility_id)
        REFERENCES facilities(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Complaints table
CREATE TABLE IF NOT EXISTS complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    facility_id INT NOT NULL,
    complaint_title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    reported_by VARCHAR(100) NOT NULL,
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    status ENUM('Open', 'In Progress', 'Resolved') DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_complaint_facility
        FOREIGN KEY (facility_id)
        REFERENCES facilities(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Sample facilities
INSERT INTO facilities
    (name, location, facility_type, status, manager_name)
VALUES
    ('Main Office', 'Amravati', 'Office', 'Active', 'Rahul Sharma'),
    ('College Library', 'Amravati', 'Library', 'Active', 'Priya Patil'),
    ('Computer Lab', 'Amravati', 'Laboratory', 'Active', 'Amit Deshmukh');

-- Sample inspections
INSERT INTO inspections
    (facility_id, inspection_date, inspector_name, cleanliness_score, safety_score, remarks, status)
VALUES
    (1, '2026-09-20', 'Vikram Joshi', 8.50, 9.00, 'Facility is clean and safe.', 'Completed'),
    (2, '2026-09-21', 'Neha Sharma', 7.50, 8.00, 'Minor cleaning required.', 'Completed'),
    (3, '2026-09-22', 'Vikram Joshi', 6.50, 7.00, 'Some safety improvements are required.', 'Pending');

-- Sample complaints
INSERT INTO complaints
    (facility_id, complaint_title, description, reported_by, priority, status)
VALUES
    (1, 'Air Conditioner Problem', 'Air conditioner is not cooling properly.', 'Rahul Verma', 'High', 'Open'),
    (2, 'Cleaning Required', 'Library floor requires additional cleaning.', 'Sneha Patil', 'Medium', 'In Progress'),
    (3, 'Computer Issue', 'Several computers are not starting.', 'Amit Kumar', 'High', 'Resolved');
    