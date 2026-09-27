const db = require("../config/db");

// Get dashboard statistics
async function getDashboardStats(req, res) {
    try {
        const [facilityCount] = await db.query(
            "SELECT COUNT(*) AS total_facilities FROM facilities"
        );

        const [inspectionCount] = await db.query(
            "SELECT COUNT(*) AS total_inspections FROM inspections"
        );

        const [complaintCount] = await db.query(
            "SELECT COUNT(*) AS total_complaints FROM complaints"
        );

        const [activeFacilityCount] = await db.query(
            `SELECT COUNT(*) AS active_facilities
             FROM facilities
             WHERE status = 'Active'`
        );

        const [pendingInspectionCount] = await db.query(
            `SELECT COUNT(*) AS pending_inspections
             FROM inspections
             WHERE status = 'Pending'`
        );

        const [openComplaintCount] = await db.query(
            `SELECT COUNT(*) AS open_complaints
             FROM complaints
             WHERE status IN ('Open', 'In Progress')`
        );

        const [averageScores] = await db.query(
            `SELECT
                ROUND(AVG(cleanliness_score), 2) AS average_cleanliness_score,
                ROUND(AVG(safety_score), 2) AS average_safety_score
             FROM inspections`
        );

        const [complaintsByPriority] = await db.query(
            `SELECT
                priority,
                COUNT(*) AS count
             FROM complaints
             GROUP BY priority
             ORDER BY count DESC`
        );

        const [inspectionsByStatus] = await db.query(
            `SELECT
                status,
                COUNT(*) AS count
             FROM inspections
             GROUP BY status
             ORDER BY count DESC`
        );

        res.status(200).json({
            success: true,
            data: {
                total_facilities: facilityCount[0].total_facilities,
                total_inspections: inspectionCount[0].total_inspections,
                total_complaints: complaintCount[0].total_complaints,
                active_facilities: activeFacilityCount[0].active_facilities,
                pending_inspections: pendingInspectionCount[0].pending_inspections,
                open_complaints: openComplaintCount[0].open_complaints,
                average_cleanliness_score:
                    averageScores[0].average_cleanliness_score || 0,
                average_safety_score:
                    averageScores[0].average_safety_score || 0,
                complaints_by_priority: complaintsByPriority,
                inspections_by_status: inspectionsByStatus
            }
        });
    } catch (error) {
        console.error("Error fetching dashboard statistics:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics"
        });
    }
}

module.exports = {
    getDashboardStats
};
