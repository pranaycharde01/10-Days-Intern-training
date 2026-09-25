import { NextResponse } from "next/server";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

// GET employee by ID
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const response = await fetch(
            `${API_URL}/api/employees/${id}`,
            {
                cache: "no-store"
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
                message: "Unable to fetch employee"
            },
            {
                status: 500
            }
        );
    }
}

// PUT update employee
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const response = await fetch(
            `${API_URL}/api/employees/${id}`,
            {
                method: "PUT",
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
                message: "Unable to update employee"
            },
            {
                status: 500
            }
        );
    }
}

// DELETE employee
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const response = await fetch(
            `${API_URL}/api/employees/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer day7-token"
                }
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
                message: "Unable to delete employee"
            },
            {
                status: 500
            }
        );
    }
}
