import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

function InspectionForm({
    inspectionToEdit,
    onInspectionAdded,
    onInspectionUpdated,
    onCancelEdit
}) {
    const [facilities, setFacilities] = useState([]);

    const [formData, setFormData] = useState({
        facility_id: "",
        inspection_date: "",
        inspector_name: "",
        cleanliness_score: "",
        safety_score: "",
        remarks: "",
        status: "Pending"
    });

    const [loading, setLoading] = useState(false);
    const [loadingFacilities, setLoadingFacilities] =
        useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchFacilities();
    }, []);

    useEffect(() => {
        if (inspectionToEdit) {
            setFormData({
                facility_id:
                    inspectionToEdit.facility_id ||
                    "",
                inspection_date:
                    inspectionToEdit.inspection_date
                        ? String(
                              inspectionToEdit.inspection_date
                          ).substring(0, 10)
                        : "",
                inspector_name:
                    inspectionToEdit.inspector_name ||
                    "",
                cleanliness_score:
                    inspectionToEdit.cleanliness_score ??
                    "",
                safety_score:
                    inspectionToEdit.safety_score ??
                    "",
                remarks:
                    inspectionToEdit.remarks || "",
                status:
                    inspectionToEdit.status ||
                    "Pending"
            });

            setMessage("");
            setError("");
        }
    }, [inspectionToEdit]);

    const fetchFacilities = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/facilities`
            );

            setFacilities(response.data.data);
        } catch (err) {
            console.error(
                "Facilities API error:",
                err
            );

            setError(
                "Unable to load facilities."
            );
        } finally {
            setLoadingFacilities(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            facility_id: "",
            inspection_date: "",
            inspector_name: "",
            cleanliness_score: "",
            safety_score: "",
            remarks: "",
            status: "Pending"
        });

        setMessage("");
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        if (
            !formData.facility_id ||
            !formData.inspection_date ||
            !formData.inspector_name ||
            formData.cleanliness_score === "" ||
            formData.safety_score === ""
        ) {
            setError(
                "Please fill all required fields."
            );
            return;
        }

        const cleanlinessScore = Number(
            formData.cleanliness_score
        );

        const safetyScore = Number(
            formData.safety_score
        );

        if (
            cleanlinessScore < 0 ||
            cleanlinessScore > 10 ||
            safetyScore < 0 ||
            safetyScore > 10
        ) {
            setError(
                "Scores must be between 0 and 10."
            );
            return;
        }

        try {
            setLoading(true);

            const requestData = {
                ...formData,
                facility_id: Number(
                    formData.facility_id
                ),
                cleanliness_score:
                    cleanlinessScore,
                safety_score: safetyScore
            };

            if (inspectionToEdit) {
                const response = await axios.put(
                    `${API_URL}/inspections/${inspectionToEdit.id}`,
                    requestData
                );

                setMessage(
                    response.data.message ||
                        "Inspection updated successfully."
                );

                if (onInspectionUpdated) {
                    onInspectionUpdated(
                        response.data.data
                    );
                }
            } else {
                const response = await axios.post(
                    `${API_URL}/inspections`,
                    requestData
                );

                setMessage(
                    response.data.message ||
                        "Inspection added successfully."
                );

                if (onInspectionAdded) {
                    onInspectionAdded(
                        response.data.data
                    );
                }

                resetForm();
            }
        } catch (err) {
            console.error(
                "Inspection save error:",
                err
            );

            setError(
                err.response?.data?.message ||
                    "Failed to save inspection."
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
                {inspectionToEdit
                    ? "Edit Inspection"
                    : "Add New Inspection"}
            </h2>

            <form onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                    <label>Facility</label>

                    <select
                        name="facility_id"
                        value={formData.facility_id}
                        onChange={handleChange}
                        style={inputStyle}
                        disabled={
                            loadingFacilities
                        }
                    >
                        <option value="">
                            {loadingFacilities
                                ? "Loading facilities..."
                                : "Select facility"}
                        </option>

                        {facilities.map(
                            (facility) => (
                                <option
                                    key={
                                        facility.id
                                    }
                                    value={
                                        facility.id
                                    }
                                >
                                    {facility.name} -{" "}
                                    {
                                        facility.location
                                    }
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div style={formGroupStyle}>
                    <label>
                        Inspection Date
                    </label>

                    <input
                        type="date"
                        name="inspection_date"
                        value={
                            formData.inspection_date
                        }
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>

                <div style={formGroupStyle}>
                    <label>
                        Inspector Name
                    </label>

                    <input
                        type="text"
                        name="inspector_name"
                        value={
                            formData.inspector_name
                        }
                        onChange={handleChange}
                        placeholder="Enter inspector name"
                        style={inputStyle}
                    />
                </div>

                <div style={formGroupStyle}>
                    <label>
                        Cleanliness Score
                    </label>

                    <input
                        type="number"
                        name="cleanliness_score"
                        value={
                            formData.cleanliness_score
                        }
                        onChange={handleChange}
                        placeholder="Enter score from 0 to 10"
                        min="0"
                        max="10"
                        step="0.01"
                        style={inputStyle}
                    />
                </div>

                <div style={formGroupStyle}>
                    <label>
                        Safety Score
                    </label>

                    <input
                        type="number"
                        name="safety_score"
                        value={
                            formData.safety_score
                        }
                        onChange={handleChange}
                        placeholder="Enter score from 0 to 10"
                        min="0"
                        max="10"
                        step="0.01"
                        style={inputStyle}
                    />
                </div>

                <div style={formGroupStyle}>
                    <label>Remarks</label>

                    <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        placeholder="Enter inspection remarks"
                        rows="4"
                        style={{
                            ...inputStyle,
                            resize: "vertical"
                        }}
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
                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                        <option value="Failed">
                            Failed
                        </option>
                    </select>
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
                        : inspectionToEdit
                        ? "Update Inspection"
                        : "Add Inspection"}
                </button>

                {inspectionToEdit && (
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

export default InspectionForm;
