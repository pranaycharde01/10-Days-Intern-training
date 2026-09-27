const inspectionModel = require("../models/inspectionModel");

// Get all inspections
async function getInspections(req, res) {
    try {
        const inspections = await inspectionModel.getAllInspections();

        res.status(200).json({
            success: true,
            count: inspections.length,
            data: inspections
        });
    } catch (error) {
        console.error("Error fetching inspections:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch inspections"
        });
    }
}

// Get inspection by ID
async function getInspection(req, res) {
    try {
        const { id } = req.params;

        const inspection = await inspectionModel.getInspectionById(id);

        if (!inspection) {
            return res.status(404).json({
                success: false,
                message: "Inspection not found"
            });
        }

        res.status(200).json({
            success: true,
            data: inspection
        });
    } catch (error) {
        console.error("Error fetching inspection:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch inspection"
        });
    }
}

// Create inspection
async function createInspection(req, res) {
    try {
        const {
            facility_id,
            inspection_date,
            inspector_name,
            cleanliness_score,
            safety_score,
            remarks,
            status
        } = req.body;

        if (
            !facility_id ||
            !inspection_date ||
            !inspector_name ||
            cleanliness_score === undefined ||
            safety_score === undefined
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Facility, inspection date, inspector name, cleanliness score and safety score are required"
            });
        }

        if (
            cleanliness_score < 0 ||
            cleanliness_score > 10 ||
            safety_score < 0 ||
            safety_score > 10
        ) {
            return res.status(400).json({
                success: false,
                message: "Scores must be between 0 and 10"
            });
        }

        const inspection = await inspectionModel.createInspection({
            facility_id,
            inspection_date,
            inspector_name,
            cleanliness_score,
            safety_score,
            remarks,
            status
        });

        res.status(201).json({
            success: true,
            message: "Inspection created successfully",
            data: inspection
        });
    } catch (error) {
        console.error("Error creating inspection:", error.message);

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                success: false,
                message: "Selected facility does not exist"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to create inspection"
        });
    }
}

// Update inspection
async function updateInspection(req, res) {
    try {
        const { id } = req.params;

        const {
            facility_id,
            inspection_date,
            inspector_name,
            cleanliness_score,
            safety_score,
            remarks,
            status
        } = req.body;

        if (
            !facility_id ||
            !inspection_date ||
            !inspector_name ||
            cleanliness_score === undefined ||
            safety_score === undefined ||
            !status
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Facility, inspection date, inspector name, scores and status are required"
            });
        }

        if (
            cleanliness_score < 0 ||
            cleanliness_score > 10 ||
            safety_score < 0 ||
            safety_score > 10
        ) {
            return res.status(400).json({
                success: false,
                message: "Scores must be between 0 and 10"
            });
        }

        const result = await inspectionModel.updateInspection(id, {
            facility_id,
            inspection_date,
            inspector_name,
            cleanliness_score,
            safety_score,
            remarks,
            status
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Inspection not found"
            });
        }

        const updatedInspection =
            await inspectionModel.getInspectionById(id);

        res.status(200).json({
            success: true,
            message: "Inspection updated successfully",
            data: updatedInspection
        });
    } catch (error) {
        console.error("Error updating inspection:", error.message);

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                success: false,
                message: "Selected facility does not exist"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update inspection"
        });
    }
}

// Delete inspection
async function deleteInspection(req, res) {
    try {
        const { id } = req.params;

        const result = await inspectionModel.deleteInspection(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Inspection not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Inspection deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting inspection:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to delete inspection"
        });
    }
}

module.exports = {
    getInspections,
    getInspection,
    createInspection,
    updateInspection,
    deleteInspection
};
