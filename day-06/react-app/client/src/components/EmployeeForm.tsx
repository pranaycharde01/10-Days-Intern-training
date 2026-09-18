import type { FormEvent } from "react";
import { useState } from "react";
import type { Employee } from "../types/Employee";

interface EmployeeFormProps {
    onAdd: (employee: Omit<Employee, "id">) => void;
}

function EmployeeForm({ onAdd }: EmployeeFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [salary, setSalary] = useState("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!name.trim()) {
            alert("Please enter employee name");
            return;
        }

        if (!email.trim()) {
            alert("Please enter email");
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

        onAdd({
            name: name.trim(),
            email: email.trim(),
            department: department.trim(),
            salary: Number(salary)
        });

        setName("");
        setEmail("");
        setDepartment("");
        setSalary("");
    };

    return (
        <section className="section">
            <h2>Add Employee</h2>

            <form onSubmit={handleSubmit} className="form">
                <input
                    placeholder="Name"
                    value={name}
                    onChange={event =>
                        setName(event.target.value)
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={event =>
                        setEmail(event.target.value)
                    }
                />

                <input
                    placeholder="Department"
                    value={department}
                    onChange={event =>
                        setDepartment(event.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Salary"
                    value={salary}
                    onChange={event =>
                        setSalary(event.target.value)
                    }
                />

                <button type="submit">
                    Add Employee
                </button>
            </form>
        </section>
    );
}

export default EmployeeForm;
