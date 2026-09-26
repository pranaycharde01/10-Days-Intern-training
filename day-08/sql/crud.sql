-- Day 8: SQL CRUD Practice

USE internship_db;


-- =========================================
-- CREATE / INSERT
-- =========================================

-- Add a new facility
INSERT INTO facilities
(name, location, cleanliness_score, status)
VALUES
('Conference Room', 'Building A', 8.00, 'Good');


-- =========================================
-- READ / SELECT
-- =========================================

-- Display all facilities
SELECT * FROM facilities;

-- Display facilities with good cleanliness
SELECT *
FROM facilities
WHERE cleanliness_score >= 8;


-- =========================================
-- UPDATE
-- =========================================

-- Update the status of a facility
UPDATE facilities
SET status = 'Good'
WHERE id = 2;


-- Update cleanliness score
UPDATE facilities
SET cleanliness_score = 7.00
WHERE id = 2;


-- =========================================
-- DELETE
-- =========================================

-- Delete the newly added facility
DELETE FROM facilities
WHERE name = 'Conference Room';


-- =========================================
-- VERIFY FINAL DATA
-- =========================================

SELECT *
FROM facilities
ORDER BY id;
