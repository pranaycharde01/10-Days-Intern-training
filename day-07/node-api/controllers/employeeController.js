const employeeService = require("../services/employeeService");

// GET all employees
function getEmployees(req, res) {
    const employees = employeeService.getAllEmployees();

    res.status(200).json(employees);
}

// GET employee by ID
function getEmployee(req, res) {
    const employee = employeeService.getEmployeeById(
        req.params.id
    );

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    res.status(200).json(employee);
}

// POST create employee
function createEmployee(req, res) {
    const employee = employeeService.createEmployee(
        req.body
    );

    res.status(201).json({
        message: "Employee created successfully",
        employee: employee
    });
}

// PUT update employee
function updateEmployee(req, res) {
    const employee = employeeService.updateEmployee(
        req.params.id,
        req.body
    );

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    res.status(200).json({
        message: "Employee updated successfully",
        employee: employee
    });
}

// DELETE employee
function deleteEmployee(req, res) {
    const deleted = employeeService.deleteEmployee(
        req.params.id
    );

    if (!deleted) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    res.status(200).json({
        message: "Employee deleted successfully"
    });
}

module.exports = {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
};
