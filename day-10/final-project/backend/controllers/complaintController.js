const complaintModel = require("../models/complaintModel");

// Get all complaints
async function getComplaints(req, res) {
    try {
        const complaints = await complaintModel.getAllComplaints();

        res.status(200).json({
            success: true,
            count: complaints.length,
            data: complaints
        });
    } catch (error) {
        console.error("Error fetching complaints:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch complaints"
        });
    }
}

// Get complaint by ID
async function getComplaint(req, res) {
    try {
        const { id } = req.params;

        const complaint = await complaintModel.getComplaintById(id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            success: true,
            data: complaint
        });
    } catch (error) {
        console.error("Error fetching complaint:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch complaint"
        });
    }
}

// Create complaint
async function createComplaint(req, res) {
    try {
        const {
            facility_id,
            complaint_title,
            description,
            reported_by,
            priority,
            status
        } = req.body;

        if (
            !facility_id ||
            !complaint_title ||
            !description ||
            !reported_by
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Facility, complaint title, description and reported by are required"
            });
        }

        const validPriorities = ["Low", "Medium", "High"];

        if (priority && !validPriorities.includes(priority)) {
            return res.status(400).json({
                success: false,
                message: "Priority must be Low, Medium or High"
            });
        }

        const complaint = await complaintModel.createComplaint({
            facility_id,
            complaint_title,
            description,
            reported_by,
            priority,
            status
        });

        res.status(201).json({
            success: true,
            message: "Complaint created successfully",
            data: complaint
        });
    } catch (error) {
        console.error("Error creating complaint:", error.message);

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                success: false,
                message: "Selected facility does not exist"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to create complaint"
        });
    }
}

// Update complaint
async function updateComplaint(req, res) {
    try {
        const { id } = req.params;

        const {
            facility_id,
            complaint_title,
            description,
            reported_by,
            priority,
            status
        } = req.body;

        if (
            !facility_id ||
            !complaint_title ||
            !description ||
            !reported_by ||
            !priority ||
            !status
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Facility, title, description, reported by, priority and status are required"
            });
        }

        const validPriorities = ["Low", "Medium", "High"];
        const validStatuses = ["Open", "In Progress", "Resolved", "Closed"];

        if (!validPriorities.includes(priority)) {
            return res.status(400).json({
                success: false,
                message: "Priority must be Low, Medium or High"
            });
        }

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message:
                    "Status must be Open, In Progress, Resolved or Closed"
            });
        }

        const result = await complaintModel.updateComplaint(id, {
            facility_id,
            complaint_title,
            description,
            reported_by,
            priority,
            status
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        const updatedComplaint =
            await complaintModel.getComplaintById(id);

        res.status(200).json({
            success: true,
            message: "Complaint updated successfully",
            data: updatedComplaint
        });
    } catch (error) {
        console.error("Error updating complaint:", error.message);

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                success: false,
                message: "Selected facility does not exist"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update complaint"
        });
    }
}

// Delete complaint
async function deleteComplaint(req, res) {
    try {
        const { id } = req.params;

        const result = await complaintModel.deleteComplaint(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Complaint deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting complaint:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to delete complaint"
        });
    }
}

module.exports = {
    getComplaints,
    getComplaint,
    createComplaint,
    updateComplaint,
    deleteComplaint
};
