import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  saveMetalType,
  getMetalTypes,
  updateMetalType,
  deleteMetalType,
} from "../../../Service/Api.jsx";

const NewCardModelType = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    Prefix: "",
    MetalType: "",
    ItemSizeUnit: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Prefix) {
      newErrors.Prefix = "This field is required.";
    }
    if (!formData.MetalType) {
      newErrors.MetalType = "This field is required.";
    }
    if (!formData.ItemSizeUnit) {
      newErrors.ItemSizeUnit = "This field is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (isEditing) {
        await updateMetalType(editId, formData);
        toast.success("Data updated successfully!");
      } else {
        await saveMetalType(formData);
        toast.success("Data saved successfully!");
      }
      fetchItems(); // Refresh data
      setFormData({ Prefix: "", MetalType: "", ItemSizeUnit: "" });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save data.");
      console.error("Error saving data:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await getMetalTypes();
      setData(response);
    } catch (error) {
      toast.error("Failed to fetch items.");
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMetalType(id);
      toast.success("Data deleted successfully!");
      fetchItems(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete data.");
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      Prefix: item.Prefix,
      MetalType: item.MetalType,
      ItemSizeUnit: item.ItemSizeUnit,
    });
    setIsEditing(true);
    setEditId(item.id);
  };

  return (
    <div className="card-body">
      
      <form onSubmit={handleSave}>
        <div className="row mb-3" style={{ marginTop: "40px" }}>
          <div className="col-sm-3 mb-3 text-start">
            <label htmlFor="Prefix" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
              Prefix:
            </label>
            <input
              type="text"
              className={`form-control ${errors.Prefix ? "is-invalid" : ""}`}
              id="Prefix"
              name="Prefix"
              value={formData.Prefix}
              onChange={handleInputChange}
              placeholder="Enter prefix"
            />
            {errors.Prefix && (
              <div className="invalid-feedback">{errors.Prefix}</div>
            )}
          </div>
          <div className="col-sm-3 mb-3 text-start">
            <label htmlFor="MetalType" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
              Metal Type:
            </label>
            <input
              type="text"
              className={`form-control ${errors.MetalType ? "is-invalid" : ""}`}
              id="MetalType"
              name="MetalType"
              value={formData.MetalType}
              onChange={handleInputChange}
              placeholder="Enter metal type"
            />
            {errors.MetalType && (
              <div className="invalid-feedback">{errors.MetalType}</div>
            )}
          </div>
          <div className="col-sm-3 mb-3 text-start">
            <label htmlFor="ItemSizeUnit" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
              Item Size Unit:
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.ItemSizeUnit ? "is-invalid" : ""
              }`}
              id="ItemSizeUnit"
              name="ItemSizeUnit"
              value={formData.ItemSizeUnit}
              onChange={handleInputChange}
              placeholder="Enter item size unit"
            />
            {errors.ItemSizeUnit && (
              <div className="invalid-feedback">{errors.ItemSizeUnit}</div>
            )}
          </div>
          <div className="col-sm-3 d-flex align-items-end">
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
            <th scope="col">Metal Type</th>
            <th scope="col">Item Size Unit</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.Prefix}</td>
                <td>{item.MetalType}</td>
                <td>{item.ItemSizeUnit}</td>
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
              <td colSpan="6" className="text-center">
                No data found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default NewCardModelType;
