"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEmployee, updateEmployee } from "../../../../lib/api";

export default function EditEmployeePage() {
    const params = useParams();
    const router = useRouter();

    const id = params.id as string;

    const [form, setForm] = useState({
        name: "",
        email: "",
        department: "",
        salary: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadEmployee() {
            try {
                const employee = await getEmployee(id);

                setForm({
                    name: employee.name,
                    email: employee.email,
                    department: employee.department,
                    salary: String(employee.salary)
                });
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load employee."
                );
            } finally {
                setLoading(false);
            }
        }

        loadEmployee();
    }, [id]);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setError("");

        if (
            !form.name ||
            !form.email ||
            !form.department ||
            !form.salary
        ) {
            setError("Please fill all fields.");
            return;
        }

        try {
            setSaving(true);

            await updateEmployee(id, {
                name: form.name,
                email: form.email,
                department: form.department,
                salary: Number(form.salary)
            });

            router.push(`/employees/${id}`);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update employee."
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <main className="loading-container">
                <div className="loading-card">
                    <div className="spinner"></div>
                    <h2>Loading employee...</h2>
                </div>
            </main>
        );
    }

    return (
        <main className="form-container">
            <div className="form-card">
                <h1>Edit Employee</h1>

                <p>
                    Update employee information below.
                </p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">
                        Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="department">
                        Department
                    </label>

                    <input
                        id="department"
                        name="department"
                        type="text"
                        value={form.department}
                        onChange={handleChange}
                    />

                    <label htmlFor="salary">
                        Salary
                    </label>

                    <input
                        id="salary"
                        name="salary"
                        type="number"
                        value={form.salary}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="primary-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Updating..."
                            : "Update Employee"}
                    </button>
                </form>
            </div>
        </main>
    );
}
