import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  saveQtyPack,
  getQtyPacks,
  deleteQtyPack,
  updateQtyPack,
} from "../../../Service/Api.jsx";

const NewCardQtyPack = () => {
  const [formData, setFormData] = useState({ EnterUnit_Name: "" });
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchQtyPacks();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.EnterUnit_Name) {
      newErrors.EnterUnit_Name = "This field is required.";
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
        await updateQtyPack(editId, formData);
        toast.success("Data updated successfully!");
      } else {
        await saveQtyPack(formData);
        toast.success("Data saved successfully!");
      }
      fetchQtyPacks(); // Refresh data
      setFormData({ EnterUnit_Name: "" });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save data.");
      console.error("Error saving data:", error);
    }
  };

  const fetchQtyPacks = async () => {
    try {
      const response = await getQtyPacks();
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteQtyPack(id);
      toast.success("Data deleted successfully!");
      fetchQtyPacks(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete data.");
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      EnterUnit_Name: item.EnterUnit_Name,
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
              <label htmlFor="name" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
                Enter Unit Name:
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.EnterUnit_Name ? "is-invalid" : ""
                }`}
                id="name"
                name="EnterUnit_Name"
                value={formData.EnterUnit_Name}
                onChange={handleInputChange}
                placeholder="Enter unit name"
              />
              {errors.EnterUnit_Name && (
                <div className="invalid-feedback">{errors.EnterUnit_Name}</div>
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
              <th scope="col">Enter Unit Name</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.EnterUnit_Name}</td>
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

export default NewCardQtyPack;
