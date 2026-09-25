import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Employee Dashboard",
    description: "Day 7 Next.js Employee Dashboard"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
