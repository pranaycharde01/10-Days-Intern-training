const facilityModel = require("../models/facilityModel");

// Get all facilities
async function getFacilities(req, res) {
    try {
        const facilities = await facilityModel.getAllFacilities();

        res.status(200).json({
            success: true,
            count: facilities.length,
            data: facilities
        });
    } catch (error) {
        console.error("Error fetching facilities:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch facilities"
        });
    }
}

// Get facility by ID
async function getFacility(req, res) {
    try {
        const { id } = req.params;

        const facility = await facilityModel.getFacilityById(id);

        if (!facility) {
            return res.status(404).json({
                success: false,
                message: "Facility not found"
            });
        }

        res.status(200).json({
            success: true,
            data: facility
        });
    } catch (error) {
        console.error("Error fetching facility:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch facility"
        });
    }
}

// Create facility
async function createFacility(req, res) {
    try {
        const {
            name,
            location,
            facility_type,
            status,
            manager_name
        } = req.body;

        if (!name || !location || !facility_type) {
            return res.status(400).json({
                success: false,
                message: "Name, location and facility type are required"
            });
        }

        const facility = await facilityModel.createFacility({
            name,
            location,
            facility_type,
            status,
            manager_name
        });

        res.status(201).json({
            success: true,
            message: "Facility created successfully",
            data: facility
        });
    } catch (error) {
        console.error("Error creating facility:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to create facility"
        });
    }
}

// Update facility
async function updateFacility(req, res) {
    try {
        const { id } = req.params;

        const {
            name,
            location,
            facility_type,
            status,
            manager_name
        } = req.body;

        if (!name || !location || !facility_type || !status) {
            return res.status(400).json({
                success: false,
                message: "Name, location, facility type and status are required"
            });
        }

        const result = await facilityModel.updateFacility(id, {
            name,
            location,
            facility_type,
            status,
            manager_name
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Facility not found"
            });
        }

        const updatedFacility = await facilityModel.getFacilityById(id);

        res.status(200).json({
            success: true,
            message: "Facility updated successfully",
            data: updatedFacility
        });
    } catch (error) {
        console.error("Error updating facility:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to update facility"
        });
    }
}

// Delete facility
async function deleteFacility(req, res) {
    try {
        const { id } = req.params;

        const result = await facilityModel.deleteFacility(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Facility not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Facility deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting facility:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to delete facility"
        });
    }
}

module.exports = {
    getFacilities,
    getFacility,
    createFacility,
    updateFacility,
    deleteFacility
};
