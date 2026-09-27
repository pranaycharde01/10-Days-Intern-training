import { useEffect, useState } from "react";
import axios from "axios";
import FacilityForm from "./FacilityForm";

const API_URL = import.meta.env.VITE_API_URL;

function FacilityList() {
    const [facilities, setFacilities] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [facilityToEdit, setFacilityToEdit] =
        useState(null);

    useEffect(() => {
        fetchFacilities();
    }, []);

    const fetchFacilities = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/facilities`
            );

            setFacilities(response.data.data);
            setError("");
        } catch (err) {
            console.error(
                "Facilities API error:",
                err
            );

            setError("Unable to load facilities.");
        } finally {
            setLoading(false);
        }
    };

    const handleFacilityAdded = (newFacility) => {
        setFacilities((currentFacilities) => [
            newFacility,
            ...currentFacilities
        ]);
    };

    const handleFacilityUpdated = (
        updatedFacility
    ) => {
        setFacilities((currentFacilities) =>
            currentFacilities.map((facility) =>
                facility.id === updatedFacility.id
                    ? updatedFacility
                    : facility
            )
        );

        setFacilityToEdit(null);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this facility?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await axios.delete(
                `${API_URL}/facilities/${id}`
            );

            setFacilities((currentFacilities) =>
                currentFacilities.filter(
                    (facility) =>
                        facility.id !== id
                )
            );

            if (
                facilityToEdit &&
                facilityToEdit.id === id
            ) {
                setFacilityToEdit(null);
            }
        } catch (err) {
            console.error(
                "Delete facility error:",
                err
            );

            alert("Failed to delete facility.");
        }
    };

    const filteredFacilities = facilities.filter(
        (facility) => {
            const searchText =
                search.toLowerCase();

            return (
                facility.name
                    .toLowerCase()
                    .includes(searchText) ||
                facility.location
                    .toLowerCase()
                    .includes(searchText) ||
                facility.facility_type
                    .toLowerCase()
                    .includes(searchText) ||
                (facility.manager_name || "")
                    .toLowerCase()
                    .includes(searchText)
            );
        }
    );

    return (
        <div className="page">
            <h1>Facilities</h1>

            <FacilityForm
                facilityToEdit={facilityToEdit}
                onFacilityAdded={
                    handleFacilityAdded
                }
                onFacilityUpdated={
                    handleFacilityUpdated
                }
                onCancelEdit={() =>
                    setFacilityToEdit(null)
                }
            />

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search facilities..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    style={{
                        width: "100%",
                        maxWidth: "450px",
                        padding: "12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "15px"
                    }}
                />
            </div>

            {loading && (
                <p>Loading facilities...</p>
            )}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <>
                    <p style={{ marginBottom: "15px" }}>
                        Total Facilities:{" "}
                        {filteredFacilities.length}
                    </p>

                    {filteredFacilities.length ===
                    0 ? (
                        <div className="card">
                            <p>
                                No facilities found.
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
                                            Name
                                        </th>

                                        <th
                                            style={
                                                tableHeaderStyle
                                            }
                                        >
                                            Location
                                        </th>

                                        <th
                                            style={
                                                tableHeaderStyle
                                            }
                                        >
                                            Type
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
                                            Manager
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
                                    {filteredFacilities.map(
                                        (facility) => (
                                            <tr
                                                key={
                                                    facility.id
                                                }
                                            >
                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        facility.id
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        facility.name
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        facility.location
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        facility.facility_type
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {
                                                        facility.status
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    {facility.manager_name ||
                                                        "Not assigned"}
                                                </td>

                                                <td
                                                    style={
                                                        tableCellStyle
                                                    }
                                                >
                                                    <button
                                                        onClick={() =>
                                                            setFacilityToEdit(
                                                                facility
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
                                                                facility.id
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
    backgroundColor: "#f9fafb"
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

export default FacilityList;
