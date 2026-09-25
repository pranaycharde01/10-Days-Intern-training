"use client";

export default function Error({
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="error-container">
            <div className="error-card">
                <h1>Something went wrong</h1>

                <p>
                    We could not load the employee dashboard.
                    Please try again.
                </p>

                <button onClick={() => reset()}>
                    Try Again
                </button>
            </div>
        </main>
    );
}
