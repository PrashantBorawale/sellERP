import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  saveItem,
  getItems,
  updateItem,
  deleteItem,
} from "../../../Service/Api.jsx";

const NewCardGradeMaster = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    Main_Group: "",
    Sub_Group: "",
    Prefix: "",
    Name: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!newItem.Main_Group) {
      newErrors.Main_Group = "This field is required.";
    }
    if (!newItem.Sub_Group) {
      newErrors.Sub_Group = "This field is required.";
    }
    if (!newItem.Prefix) {
      newErrors.Prefix = "This field is required.";
    }
    if (!newItem.Name) {
      newErrors.Name = "This field is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (isEditing) {
        await updateItem(editId, newItem);
        toast.success("Data updated successfully!");
      } else {
        await saveItem(newItem);
        toast.success("Data saved successfully!");
      }
      fetchItems(); // Refresh data
      setNewItem({
        Main_Group: "",
        Sub_Group: "",
        Prefix: "",
        Name: "",
      });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save data.");
      console.error("Error saving data:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await getItems();
      setItems(response);
    } catch (error) {
      toast.error("Failed to fetch items.");
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      toast.success("Data deleted successfully!");
      fetchItems(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete data.");
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (item) => {
    setNewItem({
      Main_Group: item.Main_Group,
      Sub_Group: item.Sub_Group,
      Prefix: item.Prefix,
      Name: item.Name,
    });
    setIsEditing(true);
    setEditId(item.id);
  };

  return (
    <div>
      <div className="card-body">
        
        <form onSubmit={handleSave}>
          <div className="row mb-3" style={{ marginTop: "40px" }}>
            <div className="col-sm-3 mb-3 text-start">
              <label htmlFor="Main_Group" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
                Main Group:
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.Main_Group ? "is-invalid" : ""
                }`}
                id="Main_Group"
                name="Main_Group"
                placeholder="Enter main group"
                value={newItem.Main_Group}
                onChange={handleInputChange}
              />
              {errors.Main_Group && (
                <div className="invalid-feedback">{errors.Main_Group}</div>
              )}
            </div>
            <div className="col-sm-3 mb-3 text-start">
              <label htmlFor="Sub_Group" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
                Sub Group:
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.Sub_Group ? "is-invalid" : ""
                }`}
                id="Sub_Group"
                name="Sub_Group"
                placeholder="Enter sub group"
                value={newItem.Sub_Group}
                onChange={handleInputChange}
              />
              {errors.Sub_Group && (
                <div className="invalid-feedback">{errors.Sub_Group}</div>
              )}
            </div>
            <div className="col-sm-2 mb-3 text-start">
              <label htmlFor="Prefix" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
                Prefix:
              </label>
              <input
                type="text"
                className={`form-control ${errors.Prefix ? "is-invalid" : ""}`}
                id="Prefix"
                name="Prefix"
                placeholder="Enter prefix"
                value={newItem.Prefix}
                onChange={handleInputChange}
              />
              {errors.Prefix && (
                <div className="invalid-feedback">{errors.Prefix}</div>
              )}
            </div>
            <div className="col-sm-2 mb-3 text-start">
              <label htmlFor="Name" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>
                Name:
              </label>
              <input
                type="text"
                className={`form-control ${errors.Name ? "is-invalid" : ""}`}
                id="Name"
                name="Name"
                placeholder="Enter name"
                value={newItem.Name}
                onChange={handleInputChange}
              />
              {errors.Name && (
                <div className="invalid-feedback">{errors.Name}</div>
              )}
            </div>
            <div className="col-sm-2 d-flex align-items-end">
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
              <th scope="col">Main Group</th>
              <th scope="col">Sub Group</th>
              <th scope="col">Prefix</th>
              <th scope="col">Name</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.Main_Group}</td>
                  <td>{item.Sub_Group}</td>
                  <td>{item.Prefix}</td>
                  <td>{item.Name}</td>
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

export default NewCardGradeMaster;
