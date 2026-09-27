const express = require("express");

const {
    getDashboardStats
} = require("../controllers/dashboardController");

const router = express.Router();

// GET dashboard statistics
router.get("/stats", getDashboardStats);

module.exports = router;
