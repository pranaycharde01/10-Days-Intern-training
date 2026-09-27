import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink
} from "react-router-dom";
import axios from "axios";

import FacilityList from "./components/FacilityList";
import InspectionList from "./components/InspectionList";
import ComplaintList from "./components/ComplaintList";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/dashboard/stats`
            );

            setStats(response.data.data);
            setError("");
        } catch (err) {
            console.error(
                "Dashboard API error:",
                err
            );

            setError(
                "Unable to load dashboard statistics."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <h1>Dashboard</h1>

            {loading && (
                <p>Loading dashboard...</p>
            )}

            {error && <p>{error}</p>}

            {!loading && !error && stats && (
                <>
                    <div className="cards">
                        <div className="card">
                            <h3>Total Facilities</h3>
                            <p>
                                {stats.total_facilities}
                            </p>
                        </div>

                        <div className="card">
                            <h3>Total Inspections</h3>
                            <p>
                                {stats.total_inspections}
                            </p>
                        </div>

                        <div className="card">
                            <h3>Total Complaints</h3>
                            <p>
                                {stats.total_complaints}
                            </p>
                        </div>

                        <div className="card">
                            <h3>Active Facilities</h3>
                            <p>
                                {stats.active_facilities}
                            </p>
                        </div>

                        <div className="card">
                            <h3>Pending Inspections</h3>
                            <p>
                                {stats.pending_inspections}
                            </p>
                        </div>

                        <div className="card">
                            <h3>Open Complaints</h3>
                            <p>
                                {stats.open_complaints}
                            </p>
                        </div>
                    </div>

                    <div
                        className="card"
                        style={{
                            marginTop: "25px"
                        }}
                    >
                        <h3>Average Scores</h3>

                        <p
                            style={{
                                fontSize: "18px",
                                marginTop: "10px"
                            }}
                        >
                            Cleanliness Score:{" "}
                            {
                                stats.average_cleanliness_score
                            }
                        </p>

                        <p
                            style={{
                                fontSize: "18px",
                                marginTop: "10px"
                            }}
                        >
                            Safety Score:{" "}
                            {stats.average_safety_score}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

function App() {
    const openAngularAnalytics = () => {
        window.open(
            "https://smart-facility-angular.vercel.app/inspection-analytics",
            "_blank"
        );
    };

    return (
        <BrowserRouter>
            <div>
                <nav className="navbar">
                    <div className="logo">
                        Smart Facility Management
                    </div>

                    <div className="nav-links">
                        <NavLink to="/">
                            Dashboard
                        </NavLink>

                        <NavLink to="/facilities">
                            Facilities
                        </NavLink>

                        <NavLink to="/inspections">
                            Inspections
                        </NavLink>

                        <NavLink to="/complaints">
                            Complaints
                        </NavLink>

                        <button
                            onClick={openAngularAnalytics}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#d1d5db",
                                fontSize: "15px",
                                cursor: "pointer",
                                padding: "8px 0"
                            }}
                        >
                            Analytics
                        </button>
                    </div>
                </nav>

                <Routes>
                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/facilities"
                        element={<FacilityList />}
                    />

                    <Route
                        path="/inspections"
                        element={<InspectionList />}
                    />

                    <Route
                        path="/complaints"
                        element={<ComplaintList />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

// Deployment update
