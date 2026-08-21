import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  saveMainGroup,
  getMainGroups,
  deleteMainGroup,
  updateMainGroup,
} from "../../../Service/Api";

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

  useEffect(() => {
    fetchMainGroups();
  }, []);

  const fetchMainGroups = async () => {
    try {
      const data = await getMainGroups();
      setMainGroups(data);
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
      if (editId) {
        await updateMainGroup(editId, formData);
        toast.success("Main Group updated successfully");
      } else {
        await saveMainGroup(formData);
        toast.success("Main Group created successfully");
      }

      setFormData({
        prefix: "",
        subgroup_code: "",
        subgroup_name: "",
        inventory: "YES",
      });
      setEditId(null);
      fetchMainGroups();
      setErrors({});
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data || {});
        Object.values(error.response.data).forEach((msg) =>
          toast.error(msg[0])
        );
      } else {
        toast.error("Something went wrong");
        console.error(error);
      }
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
   

    try {
      await deleteMainGroup(id);
      toast.success("Main Group deleted");
      fetchMainGroups();
    } catch (error) {
      toast.error("Failed to delete");
      console.error(error);
    }
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
          {mainGroups.map((item) => (
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
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default NewCardMainGroup;
