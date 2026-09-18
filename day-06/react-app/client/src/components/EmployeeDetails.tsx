import { useState } from "react";
import type { Employee } from "../types/Employee";

interface EmployeeDetailsProps {
    employee: Employee | null;
    onUpdate: (employee: Employee) => void;
}

function EmployeeDetails({
    employee,
    onUpdate
}: EmployeeDetailsProps) {
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [salary, setSalary] = useState("");

    if (!employee) {
        return (
            <section className="section details">
                <h2>Employee Details</h2>
                <p>Select an employee to see details.</p>
            </section>
        );
    }

    const startEditing = () => {
        setName(employee.name);
        setEmail(employee.email);
        setDepartment(employee.department);
        setSalary(String(employee.salary));
        setIsEditing(true);
    };

    const handleUpdate = (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        if (!name.trim()) {
            alert("Please enter employee name");
            return;
        }

        if (!email.includes("@")) {
            alert("Please enter a valid email");
            return;
        }

        if (!department.trim()) {
            alert("Please enter department");
            return;
        }

        if (!salary || Number(salary) <= 0) {
            alert("Salary must be greater than 0");
            return;
        }

        onUpdate({
            id: employee.id,
            name: name.trim(),
            email: email.trim(),
            department: department.trim(),
            salary: Number(salary)
        });

        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <section className="section details">
                <h2>Edit Employee</h2>

                <form
                    onSubmit={handleUpdate}
                    className="form"
                >
                    <input
                        value={name}
                        onChange={event =>
                            setName(event.target.value)
                        }
                        placeholder="Name"
                    />

                    <input
                        type="email"
                        value={email}
                        onChange={event =>
                            setEmail(event.target.value)
                        }
                        placeholder="Email"
                    />

                    <input
                        value={department}
                        onChange={event =>
                            setDepartment(
                                event.target.value
                            )
                        }
                        placeholder="Department"
                    />

                    <input
                        type="number"
                        value={salary}
                        onChange={event =>
                            setSalary(
                                event.target.value
                            )
                        }
                        placeholder="Salary"
                    />

                    <button type="submit">
                        Save Changes
                    </button>

                    <button
                        type="button"
                        className="secondary"
                        onClick={() =>
                            setIsEditing(false)
                        }
                    >
                        Cancel
                    </button>
                </form>
            </section>
        );
    }

    return (
        <section className="section details">
            <h2>Employee Details</h2>

            <p>
                <strong>ID:</strong> {employee.id}
            </p>

            <p>
                <strong>Name:</strong> {employee.name}
            </p>

            <p>
                <strong>Email:</strong> {employee.email}
            </p>

            <p>
                <strong>Department:</strong>{" "}
                {employee.department}
            </p>

            <p>
                <strong>Salary:</strong> ₹
                {employee.salary}
            </p>

            <button onClick={startEditing}>
                Edit Employee
            </button>
        </section>
    );
}

export default EmployeeDetails;
