const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Database connection
require("./config/db");

// API routes
const facilityRoutes = require("./routes/facilityRoutes");
const inspectionRoutes = require("./routes/inspectionRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// Basic Routes
// ===============================

// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Smart Facility Management API is running"
    });
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Server and API are working properly",
        timestamp: new Date().toISOString()
    });
});

// ===============================
// API Routes
// ===============================

app.use("/api/facilities", facilityRoutes);

app.use("/api/inspections", inspectionRoutes);

app.use("/api/complaints", complaintRoutes);

app.use("/api/dashboard", dashboardRoutes);

// ===============================
// 404 Handler
// ===============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});

// ===============================
// Global Error Handler
// ===============================

app.use((err, req, res, next) => {
    console.error("Server Error:", err);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
