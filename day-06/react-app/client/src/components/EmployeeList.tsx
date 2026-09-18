import type { Employee } from "../types/Employee";

interface EmployeeListProps {
    employees: Employee[];
    onSelect: (employee: Employee) => void;
    onDelete: (id: number) => void;
}

function EmployeeList({
    employees,
    onSelect,
    onDelete
}: EmployeeListProps) {
    return (
        <section className="section">
            <h2>Employee List</h2>

            {employees.length === 0 ? (
                <p className="empty">
                    No employees found.
                </p>
            ) : (
                <div className="employee-list">
                    {employees.map(employee => (
                        <div
                            className="employee-card"
                            key={employee.id}
                        >
                            <div>
                                <h3>{employee.name}</h3>

                                <p>
                                    {employee.department}
                                </p>

                                <p>
                                    ₹{employee.salary}
                                </p>
                            </div>

                            <div className="actions">
                                <button
                                    onClick={() =>
                                        onSelect(employee)
                                    }
                                >
                                    View Details
                                </button>

                                <button
                                    className="delete"
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                `Delete ${employee.name}?`
                                            )
                                        ) {
                                            onDelete(
                                                employee.id
                                            );
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default EmployeeList;
