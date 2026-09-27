const express = require("express");

const {
    getInspections,
    getInspection,
    createInspection,
    updateInspection,
    deleteInspection
} = require("../controllers/inspectionController");

const router = express.Router();

// GET all inspections
router.get("/", getInspections);

// GET inspection by ID
router.get("/:id", getInspection);

// POST create a new inspection
router.post("/", createInspection);

// PUT update an inspection
router.put("/:id", updateInspection);

// DELETE an inspection
router.delete("/:id", deleteInspection);

module.exports = router;
