const Employee = require("../models/Employee");
const {
    readEmployees,
    writeEmployees
} = require("../utils/fileUtils");

function getAllEmployees() {
    return readEmployees();
}

function getEmployeeById(id) {
    const employees = readEmployees();

    return employees.find(
        employee => employee.id === Number(id)
    );
}

function createEmployee(data) {
    const employees = readEmployees();

    const newId =
        employees.length > 0
            ? Math.max(...employees.map(employee => employee.id)) + 1
            : 1;

    const employee = new Employee(
        newId,
        data.name,
        data.email,
        data.department,
        Number(data.salary)
    );

    employees.push(employee);

    writeEmployees(employees);

    return employee;
}

function updateEmployee(id, data) {
    const employees = readEmployees();

    const index = employees.findIndex(
        employee => employee.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    const updatedEmployee = new Employee(
        Number(id),
        data.name,
        data.email,
        data.department,
        Number(data.salary)
    );

    employees[index] = updatedEmployee;

    writeEmployees(employees);

    return updatedEmployee;
}

function deleteEmployee(id) {
    const employees = readEmployees();

    const index = employees.findIndex(
        employee => employee.id === Number(id)
    );

    if (index === -1) {
        return false;
    }

    employees.splice(index, 1);

    writeEmployees(employees);

    return true;
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};
