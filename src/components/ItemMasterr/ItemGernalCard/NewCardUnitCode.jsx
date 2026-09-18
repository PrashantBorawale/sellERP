import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  saveUnitCode,
  getUnitCodes,
  deleteUnitCode,
  updateUnitCode,
} from "../../../Service/Api.jsx";

const NewCardUnitCode = () => {
  const [formData, setFormData] = useState({ UnitName: "" });
  const [errors, setErrors] = useState({});
  const [unitCode, setUnitCode] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUnitCodes();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.UnitName) {
      newErrors.UnitName = "This field is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setFormData({ UnitName: item.UnitName || "" });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (isEditing) {
        await updateUnitCode(editId, formData);
        toast.success("Data updated successfully!");
      } else {
        await saveUnitCode(formData);
        toast.success("Data saved successfully!");
      }
      fetchUnitCodes();
      setFormData({ UnitName: "" });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save data.");
      console.error("Error saving data:", error);
    }
  };

  const fetchUnitCodes = async () => {
    try {
      const response = await getUnitCodes();
      setUnitCode(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUnitCode(id);
      toast.success("Data deleted successfully!");
      fetchUnitCodes();
    } catch (error) {
      toast.error("Failed to delete data.");
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      <div className="card-body">
        <form onSubmit={handleSave}>
          <div className="row mb-3 align-items-end">
            <div className="col-sm-8 text-start">
              <label className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }} htmlFor="unitName">
                Unit Name:
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.UnitName ? "is-invalid" : ""
                }`}
                id="unitName"
                name="UnitName"
                value={formData.UnitName}
                onChange={handleInputChange}
              />
              {errors.UnitName && (
                <div className="invalid-feedback">{errors.UnitName}</div>
              )}
            </div>
            <div className="col-sm-4">
              <button type="submit" className="btn-save w-100">
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </form>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Unit</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {unitCode.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.UnitName}</td>
                <td>
                  <FaEdit
                    className="text-primary mx-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(item)}
                  />
                </td>
                <td>
                  <FaTrash
                    className="text-danger mx-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewCardUnitCode;
