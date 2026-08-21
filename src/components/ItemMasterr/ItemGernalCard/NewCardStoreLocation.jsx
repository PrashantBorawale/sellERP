import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  saveStoreLocation,
  getStoreLocations,
  deleteStoreLocation,
  updateStoreLocation,
} from "../../../Service/Api.jsx";

const NewCardStoreLocation = () => {
  const [formData, setFormData] = useState({ EnterStoreName: "" });
  const [errors, setErrors] = useState({});
  const [storelocation, setStoreLocation] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStoreLocations();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.EnterStoreName) {
      newErrors.EnterStoreName = "This field is required.";
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

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (isEditing) {
        await updateStoreLocation(editId, formData);
        toast.success("Data updated successfully!");
      } else {
        await saveStoreLocation(formData);
        toast.success("Data saved successfully!");
      }
      fetchStoreLocations(); // Refresh data
      setFormData({ EnterStoreName: "" });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save data.");
      console.error("Error saving data:", error);
    }
  };

  const fetchStoreLocations = async () => {
    try {
      const response = await getStoreLocations();
      setStoreLocation(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStoreLocation(id);
      toast.success("Data deleted successfully!");
      fetchStoreLocations(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete data.");
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ EnterStoreName: item.EnterStoreName });
    setIsEditing(true);
    setEditId(item.id);
  };

  return (
    <div>
      <div className="card-body">
        <form onSubmit={handleSave}>
          <div className="row mb-3">
            <label className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }} htmlFor="unitName" className="col-sm-4 col-form-label">
              Enter Store Name:
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className={`form-control ${
                  errors.EnterStoreName ? "is-invalid" : ""
                }`}
                id="unitName"
                name="EnterStoreName"
                value={formData.EnterStoreName}
                onChange={handleInputChange}
                placeholder="Enter store name"
              />
              {errors.EnterStoreName && (
                <div className="invalid-feedback">{errors.EnterStoreName}</div>
              )}
            </div>
            <div className="col-sm-2">
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
              <th scope="col">Enter Store Name</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {storelocation.length > 0 ? (
              storelocation.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.EnterStoreName}</td>
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
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No data found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewCardStoreLocation;
