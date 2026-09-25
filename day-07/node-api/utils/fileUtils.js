const fs = require("fs");
const path = require("path");

const filePath = path.join(
    __dirname,
    "..",
    "data",
    "employees.json"
);

function readEmployees() {
    const data = fs.readFileSync(filePath, "utf8");

    return JSON.parse(data);
}

function writeEmployees(employees) {
    fs.writeFileSync(
        filePath,
        JSON.stringify(employees, null, 4)
    );
}

module.exports = {
    readEmployees,
    writeEmployees
};
