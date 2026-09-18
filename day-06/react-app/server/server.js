const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 5000;
const FILE = "./employees.json";

app.use(express.json());

// GET - Get all employees
app.get("/api/employees", (req, res) => {
    const employees = JSON.parse(fs.readFileSync(FILE, "utf8"));
    res.json(employees);
});

// POST - Add employee
app.post("/api/employees", (req, res) => {
    const employees = JSON.parse(fs.readFileSync(FILE, "utf8"));

    const newEmployee = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email,
        department: req.body.department,
        salary: Number(req.body.salary)
    };

    employees.push(newEmployee);

    fs.writeFileSync(FILE, JSON.stringify(employees, null, 4));

    res.status(201).json(newEmployee);
});

// PUT - Update employee
app.put("/api/employees/:id", (req, res) => {
    const employees = JSON.parse(fs.readFileSync(FILE, "utf8"));

    const id = Number(req.params.id);
    const index = employees.findIndex(employee => employee.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Employee not found" });
    }

    employees[index] = {
        ...employees[index],
        ...req.body,
        id
    };

    fs.writeFileSync(FILE, JSON.stringify(employees, null, 4));

    res.json(employees[index]);
});

// DELETE - Delete employee
app.delete("/api/employees/:id", (req, res) => {
    const employees = JSON.parse(fs.readFileSync(FILE, "utf8"));

    const id = Number(req.params.id);
    const filteredEmployees = employees.filter(employee => employee.id !== id);

    if (employees.length === filteredEmployees.length) {
        return res.status(404).json({ message: "Employee not found" });
    }

    fs.writeFileSync(FILE, JSON.stringify(filteredEmployees, null, 4));

    res.json({ message: "Employee deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
