import Link from "next/link";
import { getEmployee } from "../../../lib/api";

interface EmployeeDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EmployeeDetailsPage({
    params
}: EmployeeDetailsPageProps) {
    const { id } = await params;

    const employee = await getEmployee(id);

    return (
        <main className="details-container">
            <div className="details-card">
                <Link
                    href="/employees"
                    className="back-link"
                >
                    ← Back to Employees
                </Link>

                <h1>{employee.name}</h1>

                <div className="details-list">
                    <p>
                        <strong>ID:</strong>{" "}
                        {employee.id}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {employee.email}
                    </p>

                    <p>
                        <strong>Department:</strong>{" "}
                        {employee.department}
                    </p>

                    <p>
                        <strong>Salary:</strong>{" "}
                        ₹{employee.salary.toLocaleString("en-IN")}
                    </p>
                </div>

                <div className="button-group">
                    <Link
                        href={`/employees/${employee.id}/edit`}
                        className="primary-button"
                    >
                        Edit Employee
                    </Link>

                    <Link
                        href="/employees"
                        className="secondary-button"
                    >
                        Back to Employee List
                    </Link>
                </div>
            </div>
        </main>
    );
}
