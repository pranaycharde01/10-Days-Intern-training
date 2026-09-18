import { useMemo, useState } from "react";
import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeDetails from "./components/EmployeeDetails";
import useEmployees from "./hooks/useEmployees";
import type { Employee } from "./types/Employee";

function App() {
    const {
        employees,
        loading,
        error,
        addEmployee,
        updateEmployee,
        deleteEmployee
    } = useEmployees();

    const [selectedEmployee, setSelectedEmployee] =
        useState<Employee | null>(null);

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("All");
    const [sortBy, setSortBy] = useState("name");

    const departments = useMemo(() => {
        return [...new Set(employees.map(employee => employee.department))];
    }, [employees]);

    const filteredEmployees = useMemo(() => {
        let result = employees.filter(employee => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                employee.name.toLowerCase().includes(searchText) ||
                employee.email.toLowerCase().includes(searchText) ||
                employee.department.toLowerCase().includes(searchText);

            const matchesDepartment =
                department === "All" ||
                employee.department === department;

            return matchesSearch && matchesDepartment;
        });

        result = [...result].sort((a, b) => {
            if (sortBy === "name") {
                return a.name.localeCompare(b.name);
            }

            if (sortBy === "salary-low") {
                return a.salary - b.salary;
            }

            if (sortBy === "salary-high") {
                return b.salary - a.salary;
            }

            return 0;
        });

        return result;
    }, [employees, search, department, sortBy]);

    const handleAdd = async (
        employee: Omit<Employee, "id">
    ) => {
        await addEmployee(employee);
    };

    const handleUpdate = async (employee: Employee) => {
        await updateEmployee(employee);
        setSelectedEmployee(employee);
    };

    const handleDelete = async (id: number) => {
        await deleteEmployee(id);

        if (selectedEmployee?.id === id) {
            setSelectedEmployee(null);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <h2>Loading employees...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div className="app">
            <header className="header">
                <h1>Employee Management Dashboard</h1>
                <p>Manage employees using React, TypeScript and REST API</p>
            </header>

            <Dashboard employees={employees} />

            <section className="controls">
                <input
                    type="text"
                    placeholder="Search employee..."
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                />

                <select
                    value={department}
                    onChange={event =>
                        setDepartment(event.target.value)
                    }
                >
                    <option value="All">All Departments</option>

                    {departments.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    value={sortBy}
                    onChange={event => setSortBy(event.target.value)}
                >
                    <option value="name">Sort by Name</option>
                    <option value="salary-low">
                        Salary: Low to High
                    </option>
                    <option value="salary-high">
                        Salary: High to Low
                    </option>
                </select>
            </section>

            <div className="main-grid">
                <div>
                    <EmployeeForm onAdd={handleAdd} />

                    <EmployeeList
                        employees={filteredEmployees}
                        onSelect={setSelectedEmployee}
                        onDelete={handleDelete}
                    />
                </div>

                <EmployeeDetails
                    employee={selectedEmployee}
                    onUpdate={handleUpdate}
                />
            </div>
        </div>
    );
}

export default App;
