import Link from "next/link";

export default function Home() {
    return (
        <main className="home-container">
            <div className="home-card">
                <h1>Employee Dashboard</h1>

                <p>
                    Manage employees using Next.js,
                    Node.js and Express.
                </p>

                <Link
                    href="/employees"
                    className="primary-button"
                >
                    View Employees
                </Link>
            </div>
        </main>
    );
}
