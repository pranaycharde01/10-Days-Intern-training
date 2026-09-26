-- Day 8: Sample Data
-- Insert sample records into all tables

USE internship_db;

-- Users
INSERT INTO users (name, email, password) VALUES
('Rahul Sharma', 'rahul@example.com', 'password123'),
('Priya Patil', 'priya@example.com', 'password123'),
('Amit Joshi', 'amit@example.com', 'password123'),
('Sneha Deshmukh', 'sneha@example.com', 'password123');

-- Departments
INSERT INTO departments (name, location) VALUES
('Computer Science', 'Building A'),
('Human Resources', 'Building B'),
('Finance', 'Building C'),
('Maintenance', 'Building D');

-- Employees
INSERT INTO employees (name, email, salary, department_id) VALUES
('Raj Verma', 'raj@example.com', 45000.00, 1),
('Neha Sharma', 'neha@example.com', 52000.00, 1),
('Aman Patil', 'aman@example.com', 38000.00, 2),
('Pooja Joshi', 'pooja@example.com', 48000.00, 2),
('Rohit Deshmukh', 'rohit@example.com', 65000.00, 3),
('Kiran More', 'kiran@example.com', 42000.00, 3),
('Vikas Pawar', 'vikas@example.com', 35000.00, 4),
('Snehal Kale', 'snehal@example.com', 47000.00, 4);

-- Facilities
INSERT INTO facilities
(name, location, cleanliness_score, status)
VALUES
('Main Washroom', 'Building A', 8.50, 'Good'),
('Cafeteria', 'Building A', 6.20, 'Needs Improvement'),
('Library', 'Building B', 9.10, 'Good'),
('Computer Lab', 'Building C', 5.40, 'Poor'),
('Parking Area', 'Building D', 4.80, 'Poor'),
('Sports Ground', 'Building D', 7.50, 'Good');

-- Inspections
INSERT INTO inspections
(facility_id, inspector_name, inspection_date, score, remarks)
VALUES
(1, 'Mr. Sharma', '2026-09-01', 8.50, 'Clean and well maintained'),
(1, 'Mr. Patil', '2026-09-15', 9.00, 'Very good condition'),
(2, 'Ms. Joshi', '2026-09-02', 6.20, 'Needs regular cleaning'),
(3, 'Mr. Sharma', '2026-09-05', 9.10, 'Excellent condition'),
(4, 'Mr. Patil', '2026-09-10', 5.40, 'Cleaning required'),
(5, 'Ms. Joshi', '2026-09-12', 4.80, 'Poor maintenance'),
(6, 'Mr. Sharma', '2026-09-18', 7.50, 'Acceptable condition');

-- Complaints
INSERT INTO complaints
(facility_id, user_id, complaint_text, status, complaint_date)
VALUES
(2, 1, 'Cafeteria tables are not clean.', 'Pending', '2026-09-03'),
(4, 2, 'Computer lab needs cleaning.', 'Resolved', '2026-09-11'),
(5, 3, 'Parking area is not maintained properly.', 'Pending', '2026-09-13'),
(2, 4, 'Dustbins in cafeteria are full.', 'Resolved', '2026-09-14'),
(5, 1, 'Parking area has garbage.', 'Pending', '2026-09-20');
