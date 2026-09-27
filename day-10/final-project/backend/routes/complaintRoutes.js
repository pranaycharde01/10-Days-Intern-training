const express = require("express");

const {
    getComplaints,
    getComplaint,
    createComplaint,
    updateComplaint,
    deleteComplaint
} = require("../controllers/complaintController");

const router = express.Router();

// GET all complaints
router.get("/", getComplaints);

// GET complaint by ID
router.get("/:id", getComplaint);

// POST create a new complaint
router.post("/", createComplaint);

// PUT update a complaint
router.put("/:id", updateComplaint);

// DELETE a complaint
router.delete("/:id", deleteComplaint);

module.exports = router;
