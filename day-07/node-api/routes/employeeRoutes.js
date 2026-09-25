const express = require("express");

const {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");

const validateEmployee = require("../middleware/validation");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all employees
router.get("/", getEmployees);

// GET employee by ID
router.get("/:id", getEmployee);

// POST create employee
router.post(
    "/",
    auth,
    validateEmployee,
    createEmployee
);

// PUT update employee
router.put(
    "/:id",
    auth,
    validateEmployee,
    updateEmployee
);

// DELETE employee
router.delete(
    "/:id",
    auth,
    deleteEmployee
);

module.exports = router;
