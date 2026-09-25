const express = require("express");

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

const PORT = 5000;

// Middleware to read JSON request bodies
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Day 7 Employee API is running"
    });
});

// Health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is healthy"
    });
});

// Employee API routes
app.use("/api/employees", employeeRoutes);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
