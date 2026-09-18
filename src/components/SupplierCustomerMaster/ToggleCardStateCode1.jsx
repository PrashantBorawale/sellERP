import React, { useState, useEffect } from "react";
import {
  fetchStates,
  addState,
  updateState,
  deleteState,
} from "../../Service/Api.jsx";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const ToggleCardStateCode1 = () => {
  const [states, setStates] = useState([]);
  const [StateName, setStateName] = useState("");
  const [StateNoNumeric, setStateNoNumeric] = useState("");
  const [StateCodeAlpha, setStateCodeAlpha] = useState("");
  const [editingState, setEditingState] = useState(null);
  const [editStateName, setEditStateName] = useState("");
  const [editStateNoNumeric, setEditStateNoNumeric] = useState("");
  const [editStateCodeAlpha, setEditStateCodeAlpha] = useState("");

  useEffect(() => {
    const getStates = async () => {
      try {
        const data = await fetchStates();
        setStates(data);
      } catch (error) {
        toast.error("Failed to fetch states");
      }
    };

    getStates();
  }, []);

  const handleAddState = async () => {
    if (!StateName.trim() || !StateNoNumeric.trim() || !StateCodeAlpha.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      const newState = await addState(
        StateName,
        StateNoNumeric,
        StateCodeAlpha
      );
      setStates([...states, newState]);
      setStateName("");
      setStateNoNumeric("");
      setStateCodeAlpha("");
      toast.success("State added successfully");
    } catch (error) {
      toast.error("Failed to add state");
    }
  };

  const handleEditState = (id, name, noNumeric, codeAlpha) => {
    setEditingState(id);
    setEditStateName(name);
    setEditStateNoNumeric(noNumeric);
    setEditStateCodeAlpha(codeAlpha);
  };

  const handleSaveEdit = async () => {
    if (
      !editStateName.trim() ||
      !editStateNoNumeric.trim() ||
      !editStateCodeAlpha.trim()
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const updatedState = await updateState(
        editingState,
        editStateName,
        editStateNoNumeric,
        editStateCodeAlpha
      );
      setStates(
        states.map((s) =>
          s.id === editingState
            ? {
                ...s,
                StateName: updatedState.StateName,
                State_No_Numeric: updatedState.State_No_Numeric,
                State_Code_Alpha: updatedState.State_Code_Alpha,
              }
            : s
        )
      );
      setEditingState(null);
      setEditStateName("");
      setEditStateNoNumeric("");
      setEditStateCodeAlpha("");
      toast.success("State updated successfully");
    } catch (error) {
      toast.error("Failed to update state");
    }
  };

  const handleDeleteState = async (id) => {
    try {
      await deleteState(id);
      setStates(states.filter((s) => s.id !== id));
      toast.success("State deleted successfully");
    } catch (error) {
      toast.error("Failed to delete state");
    }
  };

  return (
    <div className="container">
      <div className="card-body">
        <div className="row text-start mb-3">
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="StateName" className="form-label">
                State Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="StateName"
                value={StateName}
                onChange={(e) => setStateName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="State_No_Numeric" className="form-label">
                State No Numeric:
              </label>
              <input
                type="text"
                className="form-control"
                id="State_No_Numeric"
                value={StateNoNumeric}
                onChange={(e) => setStateNoNumeric(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="State_Code_Alpha" className="form-label">
                State Code Alpha:
              </label>
              <input
                type="text"
                className="form-control"
                id="State_Code_Alpha"
                value={StateCodeAlpha}
                onChange={(e) => setStateCodeAlpha(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3 mt-4">
            <div className="mb-3">
              <button type="button" className="btn " onClick={handleAddState}>
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
                  <th>State Name</th>
                  <th>State No</th>
                  <th>State Short Code</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {states.map((s, index) => (
                  <tr key={s.id}>
                    <td>{index + 1}</td>
                    <td>
                      {editingState === s.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editStateName}
                          onChange={(e) => setEditStateName(e.target.value)}
                        />
                      ) : (
                        s.StateName
                      )}
                    </td>
                    <td>
                      {editingState === s.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editStateNoNumeric}
                          onChange={(e) =>
                            setEditStateNoNumeric(e.target.value)
                          }
                        />
                      ) : (
                        s.State_No_Numeric
                      )}
                    </td>
                    <td>
                      {editingState === s.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editStateCodeAlpha}
                          onChange={(e) =>
                            setEditStateCodeAlpha(e.target.value)
                          }
                        />
                      ) : (
                        s.State_Code_Alpha
                      )}
                    </td>
                    <td>
                      {editingState === s.id ? (
                        <button type="button" className="btn me-2" onClick={handleSaveEdit}>
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn  me-2"
                          onClick={() =>
                            handleEditState(
                              s.id,
                              s.StateName,
                              s.State_No_Numeric,
                              s.State_Code_Alpha
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
                        className="btn "
                        onClick={() => handleDeleteState(s.id)}
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

export default ToggleCardStateCode1;
