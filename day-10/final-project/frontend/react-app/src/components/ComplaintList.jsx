import { useEffect, useState } from "react";
import axios from "axios";
import ComplaintForm from "./ComplaintForm";

const API_URL = import.meta.env.VITE_API_URL;

function ComplaintList() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [complaintToEdit, setComplaintToEdit] =
        useState(null);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/complaints`
            );

            setComplaints(response.data.data);
            setError("");
        } catch (err) {
            console.error(
                "Complaints API error:",
                err
            );

            setError("Unable to load complaints.");
        } finally {
            setLoading(false);
        }
    };

    const handleComplaintAdded = (
        newComplaint
    ) => {
        setComplaints((currentComplaints) => [
            newComplaint,
            ...currentComplaints
        ]);
    };

    const handleComplaintUpdated = (
        updatedComplaint
    ) => {
        setComplaints((currentComplaints) =>
            currentComplaints.map((complaint) =>
                complaint.id ===
                updatedComplaint.id
                    ? updatedComplaint
                    : complaint
            )
        );

        setComplaintToEdit(null);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this complaint?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await axios.delete(
                `${API_URL}/complaints/${id}`
            );

            setComplaints((currentComplaints) =>
                currentComplaints.filter(
                    (complaint) =>
                        complaint.id !== id
                )
            );

            if (
                complaintToEdit &&
                complaintToEdit.id === id
            ) {
                setComplaintToEdit(null);
            }
        } catch (err) {
            console.error(
                "Delete complaint error:",
                err
            );

            alert("Failed to delete complaint.");
        }
    };

    return (
        <div className="page">
            <h1>Complaints</h1>

            <ComplaintForm
                complaintToEdit={
                    complaintToEdit
                }
                onComplaintAdded={
                    handleComplaintAdded
                }
                onComplaintUpdated={
                    handleComplaintUpdated
                }
                onCancelEdit={() =>
                    setComplaintToEdit(null)
                }
            />

            {loading && (
                <p>Loading complaints...</p>
            )}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <>
                    <p style={{ marginBottom: "15px" }}>
                        Total Complaints:{" "}
                        {complaints.length}
                    </p>

                    {complaints.length === 0 ? (
                        <div className="card">
                            <p>
                                No complaints found.
                            </p>
                        </div>
                    ) : (
                        <div
                            className="card"
                            style={{
                                overflowX: "auto"
                            }}
                        >
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse:
                                        "collapse"
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th
                                            style={
                                                tableHeaderStyle
                                            }
                                        >
                                            ID
                                        </th>

                                        <th
                                            style={
                                                tableHeaderStyle
                                            }
                                        >
                                            Facility
                                        </th>

                                        <th
                                            style={
                                                tableHeaderStyle
                                            }
                                        >
                                            Title
                                        </th>

                                        <th
                                            style={
                                                tableHeaderStyle
                                            }
                                        >
                                            Description
                                        </th>

                                        <th
                                            style={
                                                tableHeaderStyle
                                            }
                                        >
                                            Reported By
                                        </th>

                                        <th
                                            style={
                                                tableHeaderStyle
                                            }
                                        >
                                            Priority
                                        </th>

                                        <th
                                            style={
                                                tableHeaderStyle
                                            }
                                        >
                                            Status
                                        </th>

                                        <th
                                            style={
                                                tableHeaderStyle
                                            }
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {complaints.map(
                                        (complaint) => (
                                            <tr
                                                key={
                                                    complaint.id
                                                }
                                            >
                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        complaint.id
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        complaint.facility_name
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        complaint.complaint_title
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        complaint.description
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        complaint.reported_by
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        complaint.priority
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        complaint.status
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    <button
                                                        onClick={() =>
                                                            setComplaintToEdit(
                                                                complaint
                                                            )
                                                        }
                                                        style={
                                                            editButtonStyle
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                complaint.id
                                                            )
                                                        }
                                                        style={
                                                            deleteButtonStyle
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

const tableHeaderStyle = {
    textAlign: "left",
    padding: "12px",
    borderBottom: "2px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    whiteSpace: "nowrap"
};

const tableCellStyle = {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb"
};

const editButtonStyle = {
    padding: "7px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#374151",
    color: "white",
    marginRight: "8px"
};

const deleteButtonStyle = {
    padding: "7px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#dc2626",
    color: "white"
};

export default ComplaintList;
