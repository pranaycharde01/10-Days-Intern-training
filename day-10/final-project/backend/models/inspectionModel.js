const db = require("../config/db");

// Get all inspections
async function getAllInspections() {
    const [rows] = await db.query(`
        SELECT
            inspections.id,
            inspections.facility_id,
            facilities.name AS facility_name,
            inspections.inspection_date,
            inspections.inspector_name,
            inspections.cleanliness_score,
            inspections.safety_score,
            inspections.remarks,
            inspections.status,
            inspections.created_at
        FROM inspections
        INNER JOIN facilities
            ON inspections.facility_id = facilities.id
        ORDER BY inspections.id DESC
    `);

    return rows;
}

// Get inspection by ID
async function getInspectionById(id) {
    const [rows] = await db.query(`
        SELECT
            inspections.id,
            inspections.facility_id,
            facilities.name AS facility_name,
            inspections.inspection_date,
            inspections.inspector_name,
            inspections.cleanliness_score,
            inspections.safety_score,
            inspections.remarks,
            inspections.status,
            inspections.created_at
        FROM inspections
        INNER JOIN facilities
            ON inspections.facility_id = facilities.id
        WHERE inspections.id = ?
    `, [id]);

    return rows[0];
}

// Create a new inspection
async function createInspection(inspectionData) {
    const {
        facility_id,
        inspection_date,
        inspector_name,
        cleanliness_score,
        safety_score,
        remarks,
        status
    } = inspectionData;

    const [result] = await db.query(`
        INSERT INTO inspections
        (
            facility_id,
            inspection_date,
            inspector_name,
            cleanliness_score,
            safety_score,
            remarks,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
        facility_id,
        inspection_date,
        inspector_name,
        cleanliness_score,
        safety_score,
        remarks || null,
        status || "Pending"
    ]);

    return {
        id: result.insertId,
        facility_id,
        inspection_date,
        inspector_name,
        cleanliness_score,
        safety_score,
        remarks: remarks || null,
        status: status || "Pending"
    };
}

// Update an inspection
async function updateInspection(id, inspectionData) {
    const {
        facility_id,
        inspection_date,
        inspector_name,
        cleanliness_score,
        safety_score,
        remarks,
        status
    } = inspectionData;

    const [result] = await db.query(`
        UPDATE inspections
        SET
            facility_id = ?,
            inspection_date = ?,
            inspector_name = ?,
            cleanliness_score = ?,
            safety_score = ?,
            remarks = ?,
            status = ?
        WHERE id = ?
    `, [
        facility_id,
        inspection_date,
        inspector_name,
        cleanliness_score,
        safety_score,
        remarks || null,
        status,
        id
    ]);

    return result;
}

// Delete an inspection
async function deleteInspection(id) {
    const [result] = await db.query(
        "DELETE FROM inspections WHERE id = ?",
        [id]
    );

    return result;
}

module.exports = {
    getAllInspections,
    getInspectionById,
    createInspection,
    updateInspection,
    deleteInspection
};
