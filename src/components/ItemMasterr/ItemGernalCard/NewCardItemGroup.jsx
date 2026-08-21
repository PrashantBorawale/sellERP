import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  saveItemGroup,
  getItemGroups,
  deleteItemGroup,
  updateItemGroup,
} from "../../../Service/Api.jsx";

const NewCardItemGroup = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [itemGroups, setItemGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({
    main_group_name: "",
    prefix: "",
    group_name: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItemGroups();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!newGroup.main_group_name.trim()) {
      errors.main_group_name = "Main Group Name is required";
      isValid = false;
    }
  
    if (!newGroup.group_name.trim()) {
      errors.group_name = "Group Name is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup({ ...newGroup, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isEditing) {
        await updateItemGroup(editId, newGroup);
        toast.success("Item group updated successfully!");
      } else {
        await saveItemGroup(newGroup);
        toast.success("Item group saved successfully!");
      }

      fetchItemGroups();
      setNewGroup({
        main_group_name: "",
        prefix: "",
        group_name: "",
      });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save item group.");
      console.error("Error saving item group:", error);
    }
  };

  const fetchItemGroups = async () => {
    try {
      const response = await getItemGroups();
      setItemGroups(response);
    } catch (error) {
      console.error("Error fetching item groups:", error);
    }
  };

  const handleDelete = async (id) => {
   
      try {
        await deleteItemGroup(id);
        toast.success("Item group deleted successfully!");
        fetchItemGroups();
      } catch (error) {
        toast.error("Failed to delete item group.");
        console.error("Error deleting item group:", error);
      }
    
  };

  const handleEdit = (group) => {
    setIsEditing(true);
    setNewGroup({
      main_group_name: group.main_group_name,
      prefix: group.prefix,
      group_name: group.group_name,
    });
    setEditId(group.id);
  };

  return (
    <div className="container-fluid p-0">
      <div className="text-start mt-2 mb-3 d-flex gap-2 border-bottom pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`btn btn-sm ${
            activeTab === "general" ? "btn-primary font-weight-bold" : "btn-outline-secondary"
          }`}
          style={{ borderRadius: "6px", fontSize: "0.82rem", fontWeight: 600 }}
        >
          General
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("itemGroup")}
          className={`btn btn-sm ${
            activeTab === "itemGroup" ? "btn-primary font-weight-bold" : "btn-outline-secondary"
          }`}
          style={{ borderRadius: "6px", fontSize: "0.82rem", fontWeight: 600 }}
        >
          Item Group Linking Main Group
        </button>
      </div>

      <div className="text-start mt-3">
        {activeTab === "general" && (
          <div>
            <form onSubmit={handleSave}>
              <div className="row align-items-end mb-3">
                <div className="col-md-3 mb-2">
                  <label className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>Main Group Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.main_group_name ? "is-invalid" : ""}`}
                    name="main_group_name"
                    value={newGroup.main_group_name}
                    onChange={handleInputChange}
                  />
                  {errors.main_group_name && (
                    <div className="invalid-feedback">{errors.main_group_name}</div>
                  )}
                </div>

                <div className="col-md-3 mb-2">
                  <label className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>Prefix</label>
                  <input
                    type="text"
                    className={`form-control ${errors.prefix ? "is-invalid" : ""}`}
                    name="prefix"
                    value={newGroup.prefix}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-3 mb-2">
                  <label className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>Group Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.group_name ? "is-invalid" : ""}`}
                    name="group_name"
                    value={newGroup.group_name}
                    onChange={handleInputChange}
                  />
                  {errors.group_name && (
                    <div className="invalid-feedback">{errors.group_name}</div>
                  )}
                </div>

                <div className="col-md-3 mb-2">
                  <button type="submit" className="btn-save w-100">
                    {isEditing ? "Update" : "Save"}
                  </button>
                </div>
              </div>
            </form>

            <div className="row">
              <div className="col-md-12">
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th>Sc. No</th>
                      <th>Main Group</th>
                      <th>Prefix</th>
                      <th>Group Name</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemGroups.length > 0 ? (
                      itemGroups.map((group, index) => (
                        <tr key={group.id}>
                          <td>{index + 1}</td>
                          <td>{group.main_group_name}</td>
                          <td>{group.prefix}</td>
                          <td>{group.group_name}</td>
                          <td>
                            <FaEdit
                              className="text-primary mx-2"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEdit(group)}
                            />
                          </td>
                          <td>
                            <FaTrash
                              className="text-danger mx-2"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDelete(group.id)}
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
              </div>
            </div>
          </div>
        )}

        {activeTab === "itemGroup" && <p>Item group linking main group feature goes here</p>}
      </div>

      <ToastContainer />
    </div>
  );
};

export default NewCardItemGroup;
