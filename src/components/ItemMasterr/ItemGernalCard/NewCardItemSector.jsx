import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  saveItemSection,
  getItemSections,
  deleteItemSection,
  updateItemSection,
} from "../../../Service/Api.jsx";

const NewCardItemSector = () => {
  const [formData, setFormData] = useState({ Prefix: "", Section_Name: "" });
  const [errors, setErrors] = useState({});
  const [ItemSection, setItemSection] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItemSections();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Prefix) {
      newErrors.Prefix = "This field is required.";
    }
    if (!formData.Section_Name) {
      newErrors.Section_Name = "This field is required.";
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
        await updateItemSection(editId, formData);
        toast.success("Data updated successfully!");
      } else {
        await saveItemSection(formData);
        toast.success("Data saved successfully!");
      }
      fetchItemSections(); // Refresh data
      setFormData({ Prefix: "", Section_Name: "" });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save data.");
      console.error("Error saving data:", error);
    }
  };

  const fetchItemSections = async () => {
    try {
      const response = await getItemSections();
      setItemSection(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItemSection(id);
      toast.success("Data deleted successfully!");
      fetchItemSections(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete data.");
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      Prefix: item.Prefix,
      Section_Name: item.Section_Name,
    });
    setIsEditing(true);
    setEditId(item.id);
  };

  return (
    <div>
      <div className="card-body">
        
        <form onSubmit={handleSave}>
          <div className="row mb-3" style={{ marginTop: "40px" }}>
            <div className="col-sm-4 mb-3 text-start">
              <label htmlFor="prefix" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
                Prefix:
              </label>
              <input
                type="text"
                className={`form-control ${errors.Prefix ? "is-invalid" : ""}`}
                id="prefix"
                name="Prefix"
                value={formData.Prefix}
                onChange={handleInputChange}
                placeholder="Enter prefix"
              />
              {errors.Prefix && (
                <div className="invalid-feedback">{errors.Prefix}</div>
              )}
            </div>
            <div className="col-sm-4 mb-3 text-start">
              <label htmlFor="name" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
                Name:
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.Section_Name ? "is-invalid" : ""
                }`}
                id="name"
                name="Section_Name"
                value={formData.Section_Name}
                onChange={handleInputChange}
                placeholder="Enter name"
              />
              {errors.Section_Name && (
                <div className="invalid-feedback">{errors.Section_Name}</div>
              )}
            </div>
            <div className="col-sm-4 d-flex align-items-end">
              <button
                type="submit"
                className="btn-save w-100"
                style={{ marginTop: "-50px" }}
              >
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </form>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Prefix</th>
              <th scope="col">Name</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {ItemSection.length > 0 ? (
              ItemSection.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.Prefix}</td>
                  <td>{item.Section_Name}</td>
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
                <td colSpan="5" className="text-center">
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

export default NewCardItemSector;
