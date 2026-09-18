import React, { useState, useEffect } from "react";
import {
  fetchRegions,
  addRegion,
  updateRegion,
  deleteRegion,
} from "../../Service/Api.jsx";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const ToggleCardRegion1 = () => {
  const [regions, setRegions] = useState([]);
  const [regionCode, setRegionCode] = useState("");
  const [regionName, setRegionName] = useState("");
  const [editingRegion, setEditingRegion] = useState(null);
  const [editRegionCode, setEditRegionCode] = useState("");
  const [editRegionName, setEditRegionName] = useState("");

  useEffect(() => {
    const getRegions = async () => {
      try {
        const data = await fetchRegions();
        setRegions(data);
      } catch (error) {
        toast.error("Failed to fetch regions");
      }
    };

    getRegions();
  }, []);

  const handleAddRegion = async () => {
    if (!regionCode.trim() || !regionName.trim()) {
      toast.error("All fields are required");
      return;
    }
  
    try {
      await addRegion(regionCode, regionName);
      // Re-fetch the regions
      const updatedRegions = await fetchRegions();
      setRegions(updatedRegions);
  
      setRegionCode("");
      setRegionName("");
      toast.success("Region added successfully");
    } catch (error) {
      toast.error("Failed to add region");
    }
  };
  
  const handleEditRegion = (id, code, name) => {
    setEditingRegion(id);
    setEditRegionCode(code);
    setEditRegionName(name);
  };

  const handleSaveEdit = async () => {
    if (!editRegionCode.trim() || !editRegionName.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      await updateRegion(editingRegion, editRegionCode, editRegionName);
      setRegions(
        regions.map((r) =>
          r.id === editingRegion
            ? { ...r, RegionCode: editRegionCode, RegionName: editRegionName }
            : r
        )
      );
      setEditingRegion(null);
      setEditRegionCode("");
      setEditRegionName("");
      toast.success("Region updated successfully");
    } catch (error) {
      toast.error("Failed to update region");
    }
  };

  const handleDeleteRegion = async (id) => {
    try {
      await deleteRegion(id);
      setRegions(regions.filter((r) => r.id !== id));
      toast.success("Region deleted successfully");
    } catch (error) {
      toast.error("Failed to delete region");
    }
  };

  return (
    <div className="container">
      <div className="card-body">
        <div className="row text-start mb-3">
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="regionCode" className="form-label">
                State Code:
              </label>
              <input
                type="text"
                className="form-control"
                id="regionCode"
                value={regionCode}
                onChange={(e) => setRegionCode(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="regionName" className="form-label">
                State Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="regionName"
                value={regionName}
                onChange={(e) => setRegionName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4 mt-4">
            <div className="mb-3">
              <button type="button" className="btn" onClick={handleAddRegion}>
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
                  <th>Region Code</th>
                  <th>Region Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((r, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {editingRegion === r.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editRegionCode}
                          onChange={(e) => setEditRegionCode(e.target.value)}
                        />
                      ) : (
                        r.RegionCode
                      )}
                    </td>
                    <td>
                      {editingRegion === r.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editRegionName}
                          onChange={(e) => setEditRegionName(e.target.value)}
                        />
                      ) : (
                        r.RegionName
                      )}
                    </td>
                    <td>
                      {editingRegion === r.id ? (
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
                            handleEditRegion(r.id, r.RegionCode, r.RegionName)
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
                        onClick={() => handleDeleteRegion(r.id)}
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

export default ToggleCardRegion1;
