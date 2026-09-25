import { NextResponse } from "next/server";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

// GET all employees
export async function GET() {
    try {
        const response = await fetch(
            `${API_URL}/api/employees`,
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                {
                    message: "Failed to fetch employees"
                },
                {
                    status: response.status
                }
            );
        }

        const employees = await response.json();

        return NextResponse.json(employees);
    } catch (error) {
        return NextResponse.json(
            {
                message: "Unable to connect to employee API"
            },
            {
                status: 500
            }
        );
    }
}

// POST create employee
export async function POST(
    request: Request
) {
    try {
        const body = await request.json();

        const response = await fetch(
            `${API_URL}/api/employees`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer day7-token"
                },
                body: JSON.stringify(body)
            }
        );

        const data = await response.json();

        return NextResponse.json(
            data,
            {
                status: response.status
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Unable to create employee"
            },
            {
                status: 500
            }
        );
    }
}
