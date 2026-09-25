"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
    salary: number;
}

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadEmployees() {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "/api/employees",
                {
                    cache: "no-store"
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch employees"
                );
            }

            const data = await response.json();

            setEmployees(data);
        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load employees."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadEmployees();
    }, []);

    async function handleDelete(id: number) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `/api/employees/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to delete employee"
                );
            }

            setEmployees(currentEmployees =>
                currentEmployees.filter(
                    employee => employee.id !== id
                )
            );
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to delete employee."
            );
        }
    }

    if (loading) {
        return (
            <main className="loading-container">
                <div className="loading-card">
                    <div className="spinner"></div>

                    <h2>
                        Loading employees...
                    </h2>

                    <p>
                        Please wait while employee
                        data is loading.
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="error-container">
                <div className="error-card">
                    <h1>
                        Something went wrong
                    </h1>

                    <p>{error}</p>

                    <button
                        onClick={loadEmployees}
                        className="primary-button"
                    >
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="employees-container">
            <div className="page-header">
                <div>
                    <h1>Employees</h1>

                    <p>
                        Manage all company employees.
                    </p>
                </div>

                <Link
                    href="/employees/create"
                    className="primary-button"
                >
                    Add Employee
                </Link>
            </div>

            <div className="employee-grid">
                {employees.length === 0 ? (
                    <div className="empty-state">
                        <h2>
                            No employees found
                        </h2>

                        <p>
                            Add a new employee to
                            get started.
                        </p>
                    </div>
                ) : (
                    employees.map(employee => (
                        <div
                            className="employee-card"
                            key={employee.id}
                        >
                            <h2>
                                {employee.name}
                            </h2>

                            <p>
                                <strong>
                                    Email:
                                </strong>{" "}
                                {employee.email}
                            </p>

                            <p>
                                <strong>
                                    Department:
                                </strong>{" "}
                                {employee.department}
                            </p>

                            <p>
                                <strong>
                                    Salary:
                                </strong>{" "}
                                ₹
                                {employee.salary.toLocaleString(
                                    "en-IN"
                                )}
                            </p>

                            <div className="button-group">
                                <Link
                                    href={`/employees/${employee.id}`}
                                    className="secondary-button"
                                >
                                    View
                                </Link>

                                <Link
                                    href={`/employees/${employee.id}/edit`}
                                    className="primary-button"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            employee.id
                                        )
                                    }
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}  
