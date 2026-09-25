const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

export interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
    salary: number;
}

export interface EmployeeInput {
    name: string;
    email: string;
    department: string;
    salary: number;
}

export async function getEmployees(): Promise<Employee[]> {
    const url =
        typeof window === "undefined"
            ? `${API_URL}/api/employees`
            : "/api/employees";

    const response = await fetch(url, {
        cache: "no-store"
    });

    if (!response.ok) {
        const data = await response.json();

        throw new Error(
            data.message || "Failed to fetch employees"
        );
    }

    return response.json();
}

export async function getEmployee(
    id: string
): Promise<Employee> {
    const url =
        typeof window === "undefined"
            ? `${API_URL}/api/employees/${id}`
            : `/api/employees/${id}`;

    const response = await fetch(url, {
        cache: "no-store"
    });

    if (!response.ok) {
        const data = await response.json();

        throw new Error(
            data.message || "Employee not found"
        );
    }

    return response.json();
}

export async function createEmployee(
    employee: EmployeeInput
): Promise<Employee> {
    const response = await fetch(
        "/api/employees",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to create employee"
        );
    }

    return data.employee;
}

export async function updateEmployee(
    id: string,
    employee: EmployeeInput
): Promise<Employee> {
    const response = await fetch(
        `/api/employees/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update employee"
        );
    }

    return data.employee;
}

export async function deleteEmployee(
    id: number
): Promise<void> {
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
}
