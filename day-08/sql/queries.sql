-- Day 8: SQL Practice Queries

USE internship_db;


-- 1. SELECT
-- Display all employees
SELECT * FROM employees;


-- 2. WHERE
-- Find employees with salary greater than 45000
SELECT *
FROM employees
WHERE salary > 45000;


-- 3. ORDER BY
-- Display employees from highest to lowest salary
SELECT *
FROM employees
ORDER BY salary DESC;


-- 4. Department Employees
-- Display employees along with their department names
SELECT
    employees.name AS employee_name,
    employees.salary,
    departments.name AS department_name
FROM employees
JOIN departments
ON employees.department_id = departments.id;


-- 5. Average Salary
-- Find the average salary of all employees
SELECT AVG(salary) AS average_salary
FROM employees;


-- 6. Average Salary by Department
SELECT
    departments.name AS department_name,
    AVG(employees.salary) AS average_salary
FROM employees
JOIN departments
ON employees.department_id = departments.id
GROUP BY departments.id, departments.name;


-- 7. Highest-Paid Employee
SELECT
    name,
    salary
FROM employees
WHERE salary = (
    SELECT MAX(salary)
    FROM employees
);


-- 8. GROUP BY
-- Count employees in each department
SELECT
    departments.name AS department_name,
    COUNT(employees.id) AS employee_count
FROM departments
LEFT JOIN employees
ON departments.id = employees.department_id
GROUP BY departments.id, departments.name;


-- 9. HAVING
-- Show departments having more than 1 employee
SELECT
    departments.name AS department_name,
    COUNT(employees.id) AS employee_count
FROM departments
JOIN employees
ON departments.id = employees.department_id
GROUP BY departments.id, departments.name
HAVING COUNT(employees.id) > 1;


-- 10. Poor Facilities
-- Display facilities with cleanliness score below 6
SELECT *
FROM facilities
WHERE cleanliness_score < 6;


-- 11. Complaint Counts
-- Count complaints for each facility
SELECT
    facilities.name AS facility_name,
    COUNT(complaints.id) AS complaint_count
FROM facilities
LEFT JOIN complaints
ON facilities.id = complaints.facility_id
GROUP BY facilities.id, facilities.name;


-- 12. Facilities Having More Than One Complaint
SELECT
    facilities.name AS facility_name,
    COUNT(complaints.id) AS complaint_count
FROM facilities
JOIN complaints
ON facilities.id = complaints.facility_id
GROUP BY facilities.id, facilities.name
HAVING COUNT(complaints.id) > 1;


-- 13. Inspection History
-- Display inspection history for every facility
SELECT
    facilities.name AS facility_name,
    inspections.inspector_name,
    inspections.inspection_date,
    inspections.score,
    inspections.remarks
FROM inspections
JOIN facilities
ON inspections.facility_id = facilities.id
ORDER BY inspections.inspection_date DESC;


-- 14. Latest Inspection for a Facility
-- Find the latest inspection date for each facility
SELECT
    facilities.name AS facility_name,
    MAX(inspections.inspection_date) AS latest_inspection
FROM facilities
JOIN inspections
ON facilities.id = inspections.facility_id
GROUP BY facilities.id, facilities.name;


-- 15. Subquery
-- Find employees earning more than the average salary
SELECT
    name,
    salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);


-- 16. JOIN Users and Complaints
-- Display complaints with the user who submitted them
SELECT
    users.name AS user_name,
    facilities.name AS facility_name,
    complaints.complaint_text,
    complaints.status,
    complaints.complaint_date
FROM complaints
JOIN users
ON complaints.user_id = users.id
JOIN facilities
ON complaints.facility_id = facilities.id;


-- 17. Transaction Example
-- Transfer an employee to another department
START TRANSACTION;

UPDATE employees
SET department_id = 2
WHERE id = 1;

-- Check the change before committing
SELECT *
FROM employees
WHERE id = 1;

COMMIT;


-- 18. Rollback Example
-- Example of cancelling a change
START TRANSACTION;

UPDATE facilities
SET status = 'Under Maintenance'
WHERE id = 1;

-- Cancel the change
ROLLBACK;


-- 19. Index Check
-- Show indexes on employees table
SHOW INDEX FROM employees;


-- 20. Search Employees by Department
SELECT
    employees.name AS employee_name,
    employees.salary,
    departments.name AS department_name
FROM employees
JOIN departments
ON employees.department_id = departments.id
WHERE departments.name = 'Computer Science';
