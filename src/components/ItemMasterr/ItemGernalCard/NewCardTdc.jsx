import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { saveTdc, getTdcs, deleteTdc } from "../../../Service/Api.jsx";

const NewCardTdc = () => {
  const [formData, setFormData] = useState({ Prefix: "", Name: "" });
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTdcs();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Prefix) {
      newErrors.Prefix = "This field is required.";
    }
    if (!formData.Name) {
      newErrors.Name = "This field is required.";
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
      await saveTdc(formData);
      toast.success("Data saved successfully!");
      fetchTdcs(); // Refresh data
      setFormData({ Prefix: "", Name: "" });
    } catch (error) {
      toast.error("Failed to save data.");
      console.error("Error saving data:", error);
    }
  };

  const fetchTdcs = async () => {
    try {
      const response = await getTdcs();
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTdc(id);
      toast.success("Data deleted successfully!");
      fetchTdcs(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete data.");
      console.error("Error deleting data:", error);
    }
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
                className={`form-control ${errors.Name ? "is-invalid" : ""}`}
                id="name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                placeholder="Enter name"
              />
              {errors.Name && (
                <div className="invalid-feedback">{errors.Name}</div>
              )}
            </div>
            <div className="col-sm-4 d-flex align-items-end">
              <button
                type="submit"
                className="btn-save w-100"
                style={{ marginTop: "-50px" }}
              >
                Save
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
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.Prefix}</td>
                  <td>{item.Name}</td>
                  <td>
                    <FaEdit
                      className="text-primary mx-2"
                      style={{ cursor: "pointer" }}
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

export default NewCardTdc;
