import { useEffect, useState } from "react";
import type { Employee } from "../types/Employee";

function useEmployees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // GET - Load employees
    const fetchEmployees = async () => {
        try {
            setLoading(true);

            const response = await fetch("/api/employees");

            if (!response.ok) {
                throw new Error("Failed to load employees");
            }

            const data: Employee[] = await response.json();
            setEmployees(data);
            setError("");
        } catch {
            setError("Could not load employees");
        } finally {
            setLoading(false);
        }
    };

    // POST - Add employee
    const addEmployee = async (employee: Omit<Employee, "id">) => {
        try {
            const response = await fetch("/api/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                throw new Error("Failed to add employee");
            }

            const newEmployee: Employee = await response.json();

            setEmployees(current => [...current, newEmployee]);
        } catch {
            setError("Could not add employee");
        }
    };

    // PUT - Update employee
    const updateEmployee = async (employee: Employee) => {
        try {
            const response = await fetch(`/api/employees/${employee.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employee)
            });

            if (!response.ok) {
                throw new Error("Failed to update employee");
            }

            const updatedEmployee: Employee = await response.json();

            setEmployees(current =>
                current.map(item =>
                    item.id === updatedEmployee.id ? updatedEmployee : item
                )
            );
        } catch {
            setError("Could not update employee");
        }
    };

    // DELETE - Delete employee
    const deleteEmployee = async (id: number) => {
        try {
            const response = await fetch(`/api/employees/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete employee");
            }

            setEmployees(current =>
                current.filter(employee => employee.id !== id)
            );
        } catch {
            setError("Could not delete employee");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return {
        employees,
        loading,
        error,
        addEmployee,
        updateEmployee,
        deleteEmployee
    };
}

export default useEmployees;
