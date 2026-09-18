import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  saveBomItemGroup,
  getBomItemGroups,
  updateBomItemGroup,
  deleteBomItemGroup,
} from "../../../Service/Api";
import "./BillMaterial.css";

const VisibleBomitem = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    Bom_Item_Group: "",
    Item: "",
    Qty: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBomItemGroups();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave2 = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    if (!validateForm()) {
      console.log("Validation errors:", errors);
      return;
    }
    try {
      if (isEditing) {
        await updateBomItemGroup(editId, formData);
        toast.success("BOM Item Group updated successfully!");
      } else {
        await saveBomItemGroup(formData);
        toast.success("BOM Item Group saved successfully!");
      }
      fetchBomItemGroups();
      setFormData({
        Bom_Item_Group: "",
        Item: "",
        Qty: "",
      });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save BOM Item Group.");
      console.error("Error saving BOM Item Group:", error);
    }
  };

  const fetchBomItemGroups = async () => {
    try {
      console.log("Fetching BOM Item Groups...");
      const response = await getBomItemGroups();
      setData(response);
    } catch (error) {
      toast.error("Failed to fetch BOM Item Groups.");
      console.error("Error fetching BOM Item Groups:", error);
    }
  };

  const handleDelete2 = async (id) => {
    try {
      await deleteBomItemGroup(id);
      toast.success("BOM Item Group deleted successfully!");
      fetchBomItemGroups();
    } catch (error) {
      toast.error("Failed to delete BOM Item Group.");
      console.error("Error deleting BOM Item Group:", error);
    }
  };

  const handleEdit2 = (item) => {
    setFormData({
      Bom_Item_Group: item.Bom_Item_Group,
      Item: item.Item,
      Qty: item.Qty,
    });
    setIsEditing(true);
    setEditId(item.id);
  };

  return (
    <div>
      <div className="card-body">
        <ToastContainer />
        <div className="row mb-3">
          <div className="col-md-6 text-start" style={{ color: "blue" }}>
            <label className="form-label">BOM Item Group Details:</label>
          </div>
          <div className="col-md-6 text-end">
            <button className="Bomitembtn">BOM Item Group Master</button>
          </div>
        </div>
        <form onSubmit={handleSave2}>
          <div className="row mb-3">
            <div className="col-md-3 mb-3">
              <label className="form-label">BOM Item Group:<span className="text-danger">*</span>
                                               </label>
              <select
               style={{marginTop:"-1px"}}
                className={`form-select ${
                  errors.Bom_Item_Group ? "is-invalid" : ""
                }`}
                name="Bom_Item_Group"
                value={formData.Bom_Item_Group}
                onChange={handleInputChange2}
              >
                <option value="">Select Option</option>
                <option value="Option1">Option 1</option>
                <option value="Option2">Option 2</option>
              </select>
              {errors.Bom_Item_Group && (
                <div className="invalid-feedback">{errors.Bom_Item_Group}</div>
              )}
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Item:</label>
              <input
                type="text"
                className={`form-control ${errors.Item ? "is-invalid" : ""}`}
                name="Item"
                value={formData.Item}
                onChange={handleInputChange2}
              />
              {errors.Item && (
                <div className="invalid-feedback">{errors.Item}</div>
              )}
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Qty:</label>
              <input
                type="text"
                className={`form-control ${errors.Qty ? "is-invalid" : ""}`}
                name="Qty"
                value={formData.Qty}
                onChange={handleInputChange2}
              />
              {errors.Qty && (
                <div className="invalid-feedback">{errors.Qty}</div>
              )}
            </div>
            <div className="col-md-1 text-end">
              <button
                type="submit"
                className="BomitemButton"
                style={{ marginTop: "31px" }}
              >
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </form>
        <div className="row mb-3">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>BOM Item Group</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.Bom_Item_Group}</td>
                        <td>{item.Item}</td>
                        <td>{item.Qty}</td>
                        <td>
                          <FaEdit
                            className="text-primary mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEdit2(item)}
                          />
                        </td>
                        <td>
                          <FaTrash
                            className="text-danger mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete2(item.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No Records Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisibleBomitem;
