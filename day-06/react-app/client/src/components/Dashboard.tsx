import type { Employee } from "../types/Employee";

interface DashboardProps {
    employees: Employee[];
}

function Dashboard({ employees }: DashboardProps) {
    const totalEmployees = employees.length;

    const averageSalary =
        totalEmployees === 0
            ? 0
            : employees.reduce(
                  (sum, employee) => sum + employee.salary,
                  0
              ) / totalEmployees;

    const departments = [
        ...new Set(
            employees.map(employee => employee.department)
        )
    ];

    return (
        <section className="dashboard">
            <div className="card">
                <h3>Total Employees</h3>
                <p>{totalEmployees}</p>
            </div>

            <div className="card">
                <h3>Average Salary</h3>
                <p>₹{averageSalary.toFixed(2)}</p>
            </div>

            <div className="card">
                <h3>Departments</h3>
                <p>{departments.length}</p>
                <small>{departments.join(", ")}</small>
            </div>
        </section>
    );
}

export default Dashboard;
