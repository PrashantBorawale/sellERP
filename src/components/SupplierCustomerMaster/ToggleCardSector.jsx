import React, { useState, useEffect } from "react";
import {
  fetchSectors,
  addSector,
  updateSector,
  deleteSector,
} from "../../Service/Api.jsx";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const ToggleCardSector = () => {
  const [sectors, setSectors] = useState([]);
  const [sectorPrefix, setSectorPrefix] = useState("");
  const [sectorName, setSectorName] = useState("");
  const [editingSector, setEditingSector] = useState(null);
  const [editSectorPrefix, setEditSectorPrefix] = useState("");
  const [editSectorName, setEditSectorName] = useState("");

  useEffect(() => {
    const getSectors = async () => {
      try {
        const data = await fetchSectors();
        setSectors(data);
      } catch (error) {
        toast.error("Failed to fetch sectors");
      }
    };

    getSectors();
  }, []);

  const handleAddSector = async () => {
    if (!sectorPrefix.trim() || !sectorName.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      await addSector(sectorPrefix, sectorName);
      setSectors([
        ...sectors,
        { Sector_Prefix: sectorPrefix, SectorName: sectorName },
      ]);
      setSectorPrefix("");
      setSectorName("");
      toast.success("Sector added successfully");
    } catch (error) {
      toast.error("Failed to add sector");
    }
  };

  const handleEditSector = (id, prefix, name) => {
    setEditingSector(id);
    setEditSectorPrefix(prefix);
    setEditSectorName(name);
  };

  const handleSaveEdit = async () => {
    if (!editSectorPrefix.trim() || !editSectorName.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      await updateSector(editingSector, editSectorPrefix, editSectorName);
      setSectors(
        sectors.map((s) =>
          s.id === editingSector
            ? {
                ...s,
                Sector_Prefix: editSectorPrefix,
                SectorName: editSectorName,
              }
            : s
        )
      );
      setEditingSector(null);
      setEditSectorPrefix("");
      setEditSectorName("");
      toast.success("Sector updated successfully");
    } catch (error) {
      toast.error("Failed to update sector");
    }
  };

  const handleDeleteSector = async (id) => {
    try {
      await deleteSector(id);
      setSectors(sectors.filter((s) => s.id !== id));
      toast.success("Sector deleted successfully");
    } catch (error) {
      toast.error("Failed to delete sector");
    }
  };

  return (
    <div className="container">
      <div className="card-body">
        <div className="row text-start mb-3">
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="sectorPrefix" className="form-label">
                Sector Profile:
              </label>
              <input
                type="text"
                className="form-control"
                id="sectorPrefix"
                value={sectorPrefix}
                onChange={(e) => setSectorPrefix(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="sectorName" className="form-label">
                Sector Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="sectorName"
                value={sectorName}
                onChange={(e) => setSectorName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-2 mt-4">
            <div className="mb-3">
              <button type="button" className="btn" onClick={handleAddSector}>
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Sector Profile</th>
                  <th>Sector Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {sectors.map((s, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {editingSector === s.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editSectorPrefix}
                          onChange={(e) => setEditSectorPrefix(e.target.value)}
                        />
                      ) : (
                        s.Sector_Prefix
                      )}
                    </td>
                    <td>
                      {editingSector === s.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editSectorName}
                          onChange={(e) => setEditSectorName(e.target.value)}
                        />
                      ) : (
                        s.SectorName
                      )}
                    </td>
                    <td>
                      {editingSector === s.id ? (
                        <button
                          type="button"
                          className="card11 me-2"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="card11 me-2"
                          onClick={() =>
                            handleEditSector(
                              s.id,
                              s.Sector_Prefix,
                              s.SectorName
                            )
                          }
                        >
                          <FaEdit />
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="card11"
                        onClick={() => handleDeleteSector(s.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToggleCardSector;
