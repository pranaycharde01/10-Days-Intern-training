const db = require("../config/db");

// Get all complaints
async function getAllComplaints() {
    const [rows] = await db.query(`
        SELECT
            complaints.id,
            complaints.facility_id,
            facilities.name AS facility_name,
            complaints.complaint_title,
            complaints.description,
            complaints.reported_by,
            complaints.priority,
            complaints.status,
            complaints.created_at
        FROM complaints
        INNER JOIN facilities
            ON complaints.facility_id = facilities.id
        ORDER BY complaints.id DESC
    `);

    return rows;
}

// Get complaint by ID
async function getComplaintById(id) {
    const [rows] = await db.query(`
        SELECT
            complaints.id,
            complaints.facility_id,
            facilities.name AS facility_name,
            complaints.complaint_title,
            complaints.description,
            complaints.reported_by,
            complaints.priority,
            complaints.status,
            complaints.created_at
        FROM complaints
        INNER JOIN facilities
            ON complaints.facility_id = facilities.id
        WHERE complaints.id = ?
    `, [id]);

    return rows[0];
}

// Create a new complaint
async function createComplaint(complaintData) {
    const {
        facility_id,
        complaint_title,
        description,
        reported_by,
        priority,
        status
    } = complaintData;

    const [result] = await db.query(`
        INSERT INTO complaints
        (
            facility_id,
            complaint_title,
            description,
            reported_by,
            priority,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `, [
        facility_id,
        complaint_title,
        description,
        reported_by,
        priority || "Medium",
        status || "Open"
    ]);

    return {
        id: result.insertId,
        facility_id,
        complaint_title,
        description,
        reported_by,
        priority: priority || "Medium",
        status: status || "Open"
    };
}

// Update a complaint
async function updateComplaint(id, complaintData) {
    const {
        facility_id,
        complaint_title,
        description,
        reported_by,
        priority,
        status
    } = complaintData;

    const [result] = await db.query(`
        UPDATE complaints
        SET
            facility_id = ?,
            complaint_title = ?,
            description = ?,
            reported_by = ?,
            priority = ?,
            status = ?
        WHERE id = ?
    `, [
        facility_id,
        complaint_title,
        description,
        reported_by,
        priority,
        status,
        id
    ]);

    return result;
}

// Delete a complaint
async function deleteComplaint(id) {
    const [result] = await db.query(
        "DELETE FROM complaints WHERE id = ?",
        [id]
    );

    return result;
}

module.exports = {
    getAllComplaints,
    getComplaintById,
    createComplaint,
    updateComplaint,
    deleteComplaint
};
