import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  saveParentFgCode,
  getParentFgCodes,
  updateParentFgCode,
  deleteParentFgCode,
} from "../../../Service/Api.jsx";

const NewCardParentFg = () => {
  const [ParentFG, setParentFG] = useState([]);
  const [formData, setFormData] = useState({
    Parent_FG_Code: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Parent_FG_Code) {
      newErrors.Parent_FG_Code = "This field is required.";
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
        await updateParentFgCode(editId, formData);
        toast.success("Data updated successfully!");
      } else {
        await saveParentFgCode(formData);
        toast.success("Data saved successfully!");
      }
      fetchItems(); // Refresh data
      setFormData({ Parent_FG_Code: "" });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save data.");
      console.error("Error saving data:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await getParentFgCodes();
      setParentFG(response);
    } catch (error) {
      toast.error("Failed to fetch items.");
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteParentFgCode(id);
      toast.success("Data deleted successfully!");
      fetchItems(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete data.");
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ Parent_FG_Code: item.Parent_FG_Code });
    setIsEditing(true);
    setEditId(item.id);
  };

  return (
    <div className="card-body">
     
      <form onSubmit={handleSave}>
        <div className="row mb-3" style={{ marginTop: "40px" }}>
          <div className="col-sm-4 mb-3 text-start">
            <label htmlFor="Parent_FG_Code" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
            Parent FG Name:
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.Parent_FG_Code ? "is-invalid" : ""
              }`}
              id="Parent_FG_Code"
              name="Parent_FG_Code"
              placeholder="Enter unit name"
              value={formData.Parent_FG_Code}
              onChange={handleInputChange}
            />
            {errors.Parent_FG_Code && (
              <div className="invalid-feedback">{errors.Parent_FG_Code}</div>
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
            <th scope="col">Enter Parent Name</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {ParentFG.length > 0 ? (
            ParentFG.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.Parent_FG_Code}</td>
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
      <ToastContainer />
    </div>
  );
};

export default NewCardParentFg;
