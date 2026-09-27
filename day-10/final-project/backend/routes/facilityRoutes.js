const express = require("express");

const {
    getFacilities,
    getFacility,
    createFacility,
    updateFacility,
    deleteFacility
} = require("../controllers/facilityController");

const router = express.Router();

// GET all facilities
router.get("/", getFacilities);

// GET facility by ID
router.get("/:id", getFacility);

// POST create a new facility
router.post("/", createFacility);

// PUT update a facility
router.put("/:id", updateFacility);

// DELETE a facility
router.delete("/:id", deleteFacility);

module.exports = router;
