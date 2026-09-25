"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createEmployee } from "../../../lib/api";

export default function CreateEmployeePage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        department: "",
        salary: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
            setLoading(true);

            await createEmployee({
                name: form.name,
                email: form.email,
                department: form.department,
                salary: Number(form.salary)
            });

            router.push("/employees");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to create employee."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="form-container">
            <div className="form-card">
                <h1>Add Employee</h1>

                <p>
                    Enter employee information below.
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
                        placeholder="Enter employee name"
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
                        placeholder="Enter email"
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
                        placeholder="Enter department"
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
                        placeholder="Enter salary"
                    />

                    <button
                        type="submit"
                        className="primary-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Adding..."
                            : "Add Employee"}
                    </button>
                </form>
            </div>
        </main>
    );
}
