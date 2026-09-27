import { useEffect, useState } from "react";
import axios from "axios";
import InspectionForm from "./InspectionForm";

const API_URL = "http://localhost:5000/api";

function InspectionList() {
    const [inspections, setInspections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [inspectionToEdit, setInspectionToEdit] =
        useState(null);

    useEffect(() => {
        fetchInspections();
    }, []);

    const fetchInspections = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/inspections`
            );

            setInspections(response.data.data);
            setError("");
        } catch (err) {
            console.error(
                "Inspections API error:",
                err
            );

            setError("Unable to load inspections.");
        } finally {
            setLoading(false);
        }
    };

    const handleInspectionAdded = (
        newInspection
    ) => {
        setInspections((currentInspections) => [
            newInspection,
            ...currentInspections
        ]);
    };

    const handleInspectionUpdated = (
        updatedInspection
    ) => {
        setInspections((currentInspections) =>
            currentInspections.map((inspection) =>
                inspection.id ===
                updatedInspection.id
                    ? updatedInspection
                    : inspection
            )
        );

        setInspectionToEdit(null);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this inspection?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await axios.delete(
                `${API_URL}/inspections/${id}`
            );

            setInspections((currentInspections) =>
                currentInspections.filter(
                    (inspection) =>
                        inspection.id !== id
                )
            );

            if (
                inspectionToEdit &&
                inspectionToEdit.id === id
            ) {
                setInspectionToEdit(null);
            }
        } catch (err) {
            console.error(
                "Delete inspection error:",
                err
            );

            alert("Failed to delete inspection.");
        }
    };

    return (
        <div className="page">
            <h1>Inspections</h1>

            <InspectionForm
                inspectionToEdit={inspectionToEdit}
                onInspectionAdded={
                    handleInspectionAdded
                }
                onInspectionUpdated={
                    handleInspectionUpdated
                }
                onCancelEdit={() =>
                    setInspectionToEdit(null)
                }
            />

            {loading && (
                <p>Loading inspections...</p>
            )}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <>
                    <p style={{ marginBottom: "15px" }}>
                        Total Inspections:{" "}
                        {inspections.length}
                    </p>

                    {inspections.length === 0 ? (
                        <div className="card">
                            <p>
                                No inspections found.
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
                                            Date
                                        </th>

                                        <th
                                            style={
                                                tableHeaderStyle
                                            }
                                        >
                                            Inspector
                                        </th>

                                        <th
                                            style={
                                                tableHeaderStyle
                                            }
                                        >
                                            Cleanliness
                                        </th>

                                        <th
                                            style={
                                                tableHeaderStyle
                                            }
                                        >
                                            Safety
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
                                            Remarks
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
                                    {inspections.map(
                                        (inspection) => (
                                            <tr
                                                key={
                                                    inspection.id
                                                }
                                            >
                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        inspection.id
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        inspection.facility_name
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {new Date(
                                                        inspection.inspection_date
                                                    ).toLocaleDateString()}
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        inspection.inspector_name
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        inspection.cleanliness_score
                                                    }
                                                    /10
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        inspection.safety_score
                                                    }
                                                    /10
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        inspection.status
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        inspection.remarks ||
                                                        "No remarks"
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    <button
                                                        onClick={() =>
                                                            setInspectionToEdit(
                                                                inspection
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
                                                                inspection.id
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
    borderBottom: "1px solid #e5e7eb",
    whiteSpace: "nowrap"
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

export default InspectionList;
