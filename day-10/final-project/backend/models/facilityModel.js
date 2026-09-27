const db = require("../config/db");

// Get all facilities
async function getAllFacilities() {
    const [rows] = await db.query(
        "SELECT * FROM facilities ORDER BY id DESC"
    );

    return rows;
}

// Get facility by ID
async function getFacilityById(id) {
    const [rows] = await db.query(
        "SELECT * FROM facilities WHERE id = ?",
        [id]
    );

    return rows[0];
}

// Create a new facility
async function createFacility(facilityData) {
    const {
        name,
        location,
        facility_type,
        status,
        manager_name
    } = facilityData;

    const [result] = await db.query(
        `INSERT INTO facilities
        (name, location, facility_type, status, manager_name)
        VALUES (?, ?, ?, ?, ?)`,
        [
            name,
            location,
            facility_type,
            status || "Active",
            manager_name || null
        ]
    );

    return {
        id: result.insertId,
        name,
        location,
        facility_type,
        status: status || "Active",
        manager_name: manager_name || null
    };
}

// Update a facility
async function updateFacility(id, facilityData) {
    const {
        name,
        location,
        facility_type,
        status,
        manager_name
    } = facilityData;

    const [result] = await db.query(
        `UPDATE facilities
        SET name = ?,
            location = ?,
            facility_type = ?,
            status = ?,
            manager_name = ?
        WHERE id = ?`,
        [
            name,
            location,
            facility_type,
            status,
            manager_name || null,
            id
        ]
    );

    return result;
}

// Delete a facility
async function deleteFacility(id) {
    const [result] = await db.query(
        "DELETE FROM facilities WHERE id = ?",
        [id]
    );

    return result;
}

module.exports = {
    getAllFacilities,
    getFacilityById,
    createFacility,
    updateFacility,
    deleteFacility
};
