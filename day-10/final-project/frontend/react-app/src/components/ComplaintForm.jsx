import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function ComplaintForm({
    complaintToEdit,
    onComplaintAdded,
    onComplaintUpdated,
    onCancelEdit
}) {
    const [facilities, setFacilities] = useState([]);

    const [formData, setFormData] = useState({
        facility_id: "",
        complaint_title: "",
        description: "",
        reported_by: "",
        priority: "Medium",
        status: "Open"
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
        if (complaintToEdit) {
            setFormData({
                facility_id:
                    complaintToEdit.facility_id ||
                    "",
                complaint_title:
                    complaintToEdit.complaint_title ||
                    "",
                description:
                    complaintToEdit.description ||
                    "",
                reported_by:
                    complaintToEdit.reported_by ||
                    "",
                priority:
                    complaintToEdit.priority ||
                    "Medium",
                status:
                    complaintToEdit.status ||
                    "Open"
            });

            setMessage("");
            setError("");
        }
    }, [complaintToEdit]);

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
            complaint_title: "",
            description: "",
            reported_by: "",
            priority: "Medium",
            status: "Open"
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
            !formData.complaint_title ||
            !formData.description ||
            !formData.reported_by
        ) {
            setError(
                "Please fill all required fields."
            );
            return;
        }

        try {
            setLoading(true);

            const requestData = {
                ...formData,
                facility_id: Number(
                    formData.facility_id
                )
            };

            if (complaintToEdit) {
                const response = await axios.put(
                    `${API_URL}/complaints/${complaintToEdit.id}`,
                    requestData
                );

                setMessage(
                    response.data.message ||
                        "Complaint updated successfully."
                );

                if (onComplaintUpdated) {
                    onComplaintUpdated(
                        response.data.data
                    );
                }
            } else {
                const response = await axios.post(
                    `${API_URL}/complaints`,
                    requestData
                );

                setMessage(
                    response.data.message ||
                        "Complaint added successfully."
                );

                if (onComplaintAdded) {
                    onComplaintAdded(
                        response.data.data
                    );
                }

                resetForm();
            }
        } catch (err) {
            console.error(
                "Complaint save error:",
                err
            );

            setError(
                err.response?.data?.message ||
                    "Failed to save complaint."
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
                {complaintToEdit
                    ? "Edit Complaint"
                    : "Add New Complaint"}
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
                        Complaint Title
                    </label>

                    <input
                        type="text"
                        name="complaint_title"
                        value={
                            formData.complaint_title
                        }
                        onChange={handleChange}
                        placeholder="Enter complaint title"
                        style={inputStyle}
                    />
                </div>

                <div style={formGroupStyle}>
                    <label>
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the complaint"
                        rows="4"
                        style={{
                            ...inputStyle,
                            resize: "vertical"
                        }}
                    />
                </div>

                <div style={formGroupStyle}>
                    <label>
                        Reported By
                    </label>

                    <input
                        type="text"
                        name="reported_by"
                        value={
                            formData.reported_by
                        }
                        onChange={handleChange}
                        placeholder="Enter reporter name"
                        style={inputStyle}
                    />
                </div>

                <div style={formGroupStyle}>
                    <label>Priority</label>

                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="Low">
                            Low
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="High">
                            High
                        </option>

                        <option value="Critical">
                            Critical
                        </option>
                    </select>
                </div>

                <div style={formGroupStyle}>
                    <label>Status</label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="Open">
                            Open
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Resolved">
                            Resolved
                        </option>

                        <option value="Closed">
                            Closed
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
                        : complaintToEdit
                        ? "Update Complaint"
                        : "Add Complaint"}
                </button>

                {complaintToEdit && (
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

export default ComplaintForm;
