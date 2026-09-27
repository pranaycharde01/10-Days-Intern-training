import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

function FacilityForm({
    facilityToEdit,
    onFacilityAdded,
    onFacilityUpdated,
    onCancelEdit
}) {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        facility_type: "",
        status: "Active",
        manager_name: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (facilityToEdit) {
            setFormData({
                name: facilityToEdit.name || "",
                location:
                    facilityToEdit.location || "",
                facility_type:
                    facilityToEdit.facility_type || "",
                status:
                    facilityToEdit.status || "Active",
                manager_name:
                    facilityToEdit.manager_name || ""
            });

            setMessage("");
            setError("");
        }
    }, [facilityToEdit]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            location: "",
            facility_type: "",
            status: "Active",
            manager_name: ""
        });

        setMessage("");
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        if (
            !formData.name ||
            !formData.location ||
            !formData.facility_type
        ) {
            setError(
                "Name, location and facility type are required."
            );
            return;
        }

        try {
            setLoading(true);

            if (facilityToEdit) {
                const response = await axios.put(
                    `${API_URL}/facilities/${facilityToEdit.id}`,
                    formData
                );

                setMessage(
                    response.data.message ||
                        "Facility updated successfully."
                );

                if (onFacilityUpdated) {
                    onFacilityUpdated(
                        response.data.data
                    );
                }
            } else {
                const response = await axios.post(
                    `${API_URL}/facilities`,
                    formData
                );

                setMessage(
                    response.data.message ||
                        "Facility added successfully."
                );

                if (onFacilityAdded) {
                    onFacilityAdded(
                        response.data.data
                    );
                }

                resetForm();
            }
        } catch (err) {
            console.error(
                "Facility save error:",
                err
            );

            setError(
                err.response?.data?.message ||
                    "Failed to save facility."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        resetForm();

        if (onCancelEdit) {
            onCancelEdit();
        }
    };

    return (
        <div
            className="card"
            style={{ marginBottom: "25px" }}
        >
            <h2 style={{ marginBottom: "20px" }}>
                {facilityToEdit
                    ? "Edit Facility"
                    : "Add New Facility"}
            </h2>

            <form onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                    <label>Facility Name</label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter facility name"
                        style={inputStyle}
                    />
                </div>

                <div style={formGroupStyle}>
                    <label>Location</label>

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter location"
                        style={inputStyle}
                    />
                </div>

                <div style={formGroupStyle}>
                    <label>Facility Type</label>

                    <input
                        type="text"
                        name="facility_type"
                        value={
                            formData.facility_type
                        }
                        onChange={handleChange}
                        placeholder="Example: Office, Hospital, School"
                        style={inputStyle}
                    />
                </div>

                <div style={formGroupStyle}>
                    <label>Status</label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="Active">
                            Active
                        </option>

                        <option value="Inactive">
                            Inactive
                        </option>

                        <option value="Maintenance">
                            Maintenance
                        </option>
                    </select>
                </div>

                <div style={formGroupStyle}>
                    <label>Manager Name</label>

                    <input
                        type="text"
                        name="manager_name"
                        value={
                            formData.manager_name
                        }
                        onChange={handleChange}
                        placeholder="Enter manager name"
                        style={inputStyle}
                    />
                </div>

                {error && (
                    <p
                        style={{
                            marginBottom: "15px",
                            color: "#b91c1c"
                        }}
                    >
                        {error}
                    </p>
                )}

                {message && (
                    <p
                        style={{
                            marginBottom: "15px",
                            color: "#166534"
                        }}
                    >
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={buttonStyle}
                >
                    {loading
                        ? "Saving..."
                        : facilityToEdit
                        ? "Update Facility"
                        : "Add Facility"}
                </button>

                {facilityToEdit && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        style={cancelButtonStyle}
                    >
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
}

const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    marginBottom: "15px"
};

const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "15px"
};

const buttonStyle = {
    padding: "10px 18px",
    backgroundColor: "#1f2937",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    marginRight: "10px"
};

const cancelButtonStyle = {
    padding: "10px 18px",
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px"
};

export default FacilityForm;
