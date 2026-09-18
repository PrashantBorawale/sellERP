import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  saveGrade,
  getGrades,
  deleteGrade,
  updateGrade,
} from "../../../Service/Api.jsx";

const NewCardGrade = () => {
  const [grades, setGrades] = useState([]);
  const [newGrade, setNewGrade] = useState({
    SubGroup: "",
    Prefix: "",
    Item_Grade_Name: "",
    Colour_Code: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchGrades();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!newGrade.SubGroup) {
      newErrors.SubGroup = "This field is required.";
    }
    if (!newGrade.Prefix) {
      newErrors.Prefix = "This field is required.";
    }
    if (!newGrade.Item_Grade_Name) {
      newErrors.Item_Grade_Name = "This field is required.";
    }
    if (!newGrade.Colour_Code) {
      newErrors.Colour_Code = "This field is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGrade({ ...newGrade, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (isEditing) {
        await updateGrade(editId, newGrade);
        toast.success("Data updated successfully!");
      } else {
        await saveGrade(newGrade);
        toast.success("Data saved successfully!");
      }
      fetchGrades(); // Refresh data
      setNewGrade({
        SubGroup: "",
        Prefix: "",
        Item_Grade_Name: "",
        Colour_Code: "",
      });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save data.");
      console.error("Error saving data:", error);
    }
  };

  const fetchGrades = async () => {
    try {
      const response = await getGrades();
      setGrades(response);
    } catch (error) {
      toast.error("Failed to fetch grades.");
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGrade(id);
      toast.success("Data deleted successfully!");
      fetchGrades(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete data.");
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (grade) => {
    setNewGrade({
      SubGroup: grade.SubGroup,
      Prefix: grade.Prefix,
      Item_Grade_Name: grade.Item_Grade_Name,
      Colour_Code: grade.Colour_Code,
    });
    setIsEditing(true);
    setEditId(grade.id);
  };

  return (
    <div>
      <div className="card-body">
        
        <form onSubmit={handleSave}>
          <div className="row mb-3" style={{ marginTop: "40px" }}>
            <div className="col-sm-2 mb-3 text-start">
              <label htmlFor="SubGroup" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
                Sub Group:
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.SubGroup ? "is-invalid" : ""
                }`}
                id="SubGroup"
                name="SubGroup"
                placeholder="Enter sub group"
                value={newGrade.SubGroup}
                onChange={handleInputChange}
              />
              {errors.SubGroup && (
                <div className="invalid-feedback">{errors.SubGroup}</div>
              )}
            </div>
            <div className="col-sm-2 mb-3 text-start">
              <label htmlFor="Prefix" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
                Prefix Group:
              </label>
              <input
                type="text"
                className={`form-control ${errors.Prefix ? "is-invalid" : ""}`}
                id="Prefix"
                name="Prefix"
                placeholder="Enter Prefix"
                value={newGrade.Prefix}
                onChange={handleInputChange}
              />
              {errors.Prefix && (
                <div className="invalid-feedback">{errors.Prefix}</div>
              )}
            </div>
            <div className="col-sm-3 mb-3 text-start">
              <label htmlFor="Item_Grade_Name" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
                Item Grade Name:
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.Item_Grade_Name ? "is-invalid" : ""
                }`}
                id="Item_Grade_Name"
                name="Item_Grade_Name"
                placeholder="Enter item grade name"
                value={newGrade.Item_Grade_Name}
                onChange={handleInputChange}
              />
              {errors.Item_Grade_Name && (
                <div className="invalid-feedback">{errors.Item_Grade_Name}</div>
              )}
            </div>
            <div className="col-sm-2 mb-3 text-start">
              <label htmlFor="Colour_Code" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
                Colour Code:
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.Colour_Code ? "is-invalid" : ""
                }`}
                id="Colour_Code"
                name="Colour_Code"
                placeholder="Enter colour code"
                value={newGrade.Colour_Code}
                onChange={handleInputChange}
              />
              {errors.Colour_Code && (
                <div className="invalid-feedback">{errors.Colour_Code}</div>
              )}
            </div>
            <div className="col-sm-2 mt-6 d-flex align-items-end">
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
              <th scope="col">#</th>
              <th scope="col">Sub Group</th>
              <th scope="col">Prefix</th>
              <th scope="col">Item Grade Name</th>
              <th scope="col">Colour Code</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {grades.length > 0 ? (
              grades.map((grade, index) => (
                <tr key={grade.id}>
                  <td>{index + 1}</td>
                  <td>{grade.SubGroup}</td>
                  <td>{grade.Prefix}</td>
                  <td>{grade.Item_Grade_Name}</td>
                  <td>{grade.Colour_Code}</td>
                  <td>
                    <FaEdit
                      className="text-primary mx-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEdit(grade)}
                    />
                  </td>
                  <td>
                    <FaTrash
                      className="text-danger mx-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(grade.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
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

export default NewCardGrade;
