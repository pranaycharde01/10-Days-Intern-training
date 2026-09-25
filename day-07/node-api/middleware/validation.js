function validateEmployee(req, res, next) {
    const {
        name,
        email,
        department,
        salary
    } = req.body;

    // Validate name
    if (!name || !name.trim()) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    // Validate email
    if (!email || !email.includes("@")) {
        return res.status(400).json({
            message: "Valid email is required"
        });
    }

    // Validate department
    if (!department || !department.trim()) {
        return res.status(400).json({
            message: "Department is required"
        });
    }

    // Validate salary
    if (
        salary === undefined ||
        salary === null ||
        salary === "" ||
        Number(salary) <= 0
    ) {
        return res.status(400).json({
            message: "Salary must be greater than 0"
        });
    }

    // Clean the data before sending it to controller
    req.body = {
        name: name.trim(),
        email: email.trim(),
        department: department.trim(),
        salary: Number(salary)
    };

    next();
}

module.exports = validateEmployee;
