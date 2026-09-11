import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const BASE_URL = "https://sellerp-backend.onrender.com/All_Masters/api/maingroup/";

const NewCardMainGroup = () => {
  const [editId, setEditId] = useState(null);
  const [mainGroups, setMainGroups] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    prefix: "",
    subgroup_code: "",
    subgroup_name: "",
    inventory: "YES",
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchMainGroups();
  }, []);

  const fetchMainGroups = async () => {
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) {
        const data = await response.json();
        setMainGroups(data);
      }
    } catch (error) {
      console.error("Error fetching main groups:", error);
    }
  };

  const validateForm = () => {
    let valid = true;
    let validationErrors = {};

    if (!formData.prefix.trim()) {
      validationErrors.prefix = "Prefix is required";
      valid = false;
    }
    if (!formData.subgroup_code.trim()) {
      validationErrors.subgroup_code = "Subgroup Code is required";
      valid = false;
    }
    if (!formData.subgroup_name.trim()) {
      validationErrors.subgroup_name = "Subgroup Name is required";
      valid = false;
    }

    setErrors(validationErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      let response;
      if (editId) {
        response = await fetch(`${BASE_URL}${editId}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch(BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        toast.success(editId ? "Main Group updated successfully" : "Main Group created successfully");
        setFormData({
          prefix: "",
          subgroup_code: "",
          subgroup_name: "",
          inventory: "YES",
        });
        setEditId(null);
        fetchMainGroups();
        setErrors({});
      } else {
        const errData = await response.json();
        setErrors(errData || {});
        if (errData) {
          Object.values(errData).forEach((msg) => {
            if (Array.isArray(msg)) toast.error(msg[0]);
            else toast.error(msg);
          });
        } else {
          toast.error("Failed to save");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      prefix: item.prefix,
      subgroup_code: item.subgroup_code,
      subgroup_name: item.subgroup_name,
      inventory: item.inventory,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Main Group?")) return;
    try {
      const response = await fetch(`${BASE_URL}${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Main Group deleted");
        fetchMainGroups();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Failed to delete");
      console.error(error);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mainGroups.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mainGroups.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container-fluid p-0">
      
      <form onSubmit={handleSubmit}>
        <div className="row">
          {["prefix", "subgroup_code", "subgroup_name"].map((field) => (
            <div className="col-md-2 text-start" key={field}>
              <label className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>{field.replace("_", " ").toUpperCase()}</label>
              <input
                type="text"
                name={field}
                className={`form-control ${
                  errors[field] ? "is-invalid" : ""
                }`}
                value={formData[field]}
                onChange={handleChange}
              />
              {errors[field] && (
                <div className="invalid-feedback">{errors[field]}</div>
              )}
            </div>
          ))}
          <div className="col-md-2">
            <label className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>Inventory</label>
            <select
              name="inventory"
              className="form-select"
              value={formData.inventory}
              onChange={handleChange}
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button type="submit" className="btn-save w-100">
              {editId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Prefix</th>
            <th>Subgroup Code</th>
            <th>Subgroup Name</th>
            <th>Inventory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.prefix}</td>
                <td>{item.subgroup_code}</td>
                <td>{item.subgroup_name}</td>
                <td>{item.inventory}</td>
                <td>
                  <FaEdit
                    className="text-primary me-2"
                    onClick={() => handleEdit(item)}
                    style={{ cursor: "pointer" }}
                  />
                  <FaTrash
                    className="text-danger"
                    onClick={() => handleDelete(item.id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No Data Available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </div>
      )}

      {/* Toast container with high zIndex so it's not hidden behind modal or headers */}
      <ToastContainer position="top-right" style={{ zIndex: 9999999, marginTop: "80px" }} />
    </div>
  );
};

export default NewCardMainGroup;
