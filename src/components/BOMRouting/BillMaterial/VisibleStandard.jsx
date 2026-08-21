import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  saveStdRouting,
  getStdRoutings,
  updateStdRouting,
  deleteStdRouting,
} from "../../../Service/Api";
import "./BillMaterial.css";

const VisibleStandard = () => {
  
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    Std_Routing_No: "",
    Op_No: "",
    Op_Name: "",
    Part_Type: "",
    Wip_Wt: "",
    Op_Type: "",
    QC: "",
    Ass_Prod: "",
    Part_Code: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStdRoutings();
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
        await updateStdRouting(editId, formData);
        toast.success("Std Routing updated successfully!");
      } else {
        await saveStdRouting(formData);
        toast.success("Std Routing saved successfully!");
      }
      fetchStdRoutings(); // Refresh data
      setFormData({
        Std_Routing_No: "",
        Op_No: "",
        Op_Name: "",
        Part_Type: "",
        Wip_Wt: "",
        Op_Type: "",
        QC: "",
        Ass_Prod: "",
        Part_Code: "",
      });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save std routing.");
      console.error("Error saving std routing:", error);
    }
  };

  const fetchStdRoutings = async () => {
    try {
      const response = await getStdRoutings();
      setData(response);
    } catch (error) {
      toast.error("Failed to fetch std routings.");
      console.error("Error fetching std routings:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStdRouting(id);
      toast.success("Std Routing deleted successfully!");
      fetchStdRoutings(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete std routing.");
      console.error("Error deleting std routing:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      Std_Routing_No: item.Std_Routing_No,
      Op_No: item.Op_No,
      Op_Name: item.Op_Name,
      Part_Type: item.Part_Type,
      Wip_Wt: item.Wip_Wt,
      Op_Type: item.Op_Type,
      QC: item.QC,
      Ass_Prod: item.Ass_Prod,
      Part_Code: item.Part_Code,
    });
    setIsEditing(true);
    setEditId(item.id);
  };

  return (
    <div className="container ">
      <div className="card-body mb-4 scrollable-card" style={{maxHeight:"400px",overflowY:"auto"}}>
        <ToastContainer />
        <div className="row mb-3">
          <div className="col-md-2 text-start">
            <label className="form-label">Std Routing No:</label>
          </div>
          <div className="col-md-4 text-start">
            <select
              className="form-select"
              name="Std_Routing_No"
              value={formData.Std_Routing_No}
              onChange={handleInputChange}
            >
              <option value="">ALL</option>
              <option value="Value1">Value1</option>
              <option value="Value2">Value2</option>
            </select>
            {errors.Std_Routing_No && (
              <span className="text-danger">{errors.Std_Routing_No}</span>
            )}
          </div>
          <div className="col-md-6 text-end">
            <button className="Standardbtn me-2">Copy Routing Sheet</button>
            <button className="Standardbtn">Export To Excel</button>
          </div>
        </div>
        <form onSubmit={handleSave}>
          <div className="row mb-4 text-start">
            <div className="col-md-6">
              {/* <div className="row mb-3">
                <div className="col-md-4">
                  <label>
                    STD Routing No<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    name="Std_Routing_No"
                    value={formData.Std_Routing_No}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                  {errors.Std_Routing_No && (
                    <span className="text-danger">{errors.Std_Routing_No}</span>
                  )}
                </div>
              </div> */}
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Op No</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    name="Op_No"
                    value={formData.Op_No}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                  {errors.Op_No && (
                    <span className="text-danger">{errors.Op_No}</span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Op Name</label>
                </div>
                <div className="col-md-8">
                  <select
                    className="form-select"
                    name="Op_Name"
                    value={formData.Op_Name}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="ASSEMLY">ASSEMLY</option>
                    <option value="BENDING">BENDING</option>
                    <option value="BLACK PLATING">BLACK PLATING</option>
                    <option value="BLOCKDISING">BLOCKDISING</option>
                    <option value="CED COATING">CED COATING</option>
                    <option value="CHAKING">CHAKING</option>
                    <option value="CHAMPFER 1X45">CHAMPFER 1X45</option>
                    <option value="CNC1">CNC1</option>
                    <option value="COLD FORGING">COLD FORGING</option>
                    <option value="CROSS HOLE">CROSS HOLE</option>
                  </select>
                  {errors.Op_Name && (
                    <span className="text-danger">{errors.Op_Name}</span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Ass Prod</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    name="Ass_Prod"
                    value={formData.Ass_Prod}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                  {errors.Ass_Prod && (
                    <span className="text-danger">{errors.Ass_Prod}</span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Part Code</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    name="Part_Code"
                    value={formData.Part_Code}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                  {errors.Part_Code && (
                    <span className="text-danger">{errors.Part_Code}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Part Type</label>
                </div>
                <div className="col-md-8">
                  <select
                    className="form-select"
                    name="Part_Type"
                    value={formData.Part_Type}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="RM">RM</option>
                    <option value="WIP">WIP</option>
                    <option value="SFG">SFG</option>
                    <option value="FG">FG</option>
                  </select>
                  {errors.Part_Type && (
                    <span className="text-danger">{errors.Part_Type}</span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>WIP Wt</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    name="Wip_Wt"
                    value={formData.Wip_Wt}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                  {errors.Wip_Wt && (
                    <span className="text-danger">{errors.Wip_Wt}</span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Op Type</label>
                </div>
                <div className="col-md-8">
                  <select
                    className="form-select"
                    name="Op_Type"
                    value={formData.Op_Type}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="Setup">Setup</option>
                    <option value="Production">Production</option>
                  </select>
                  {errors.Op_Type && (
                    <span className="text-danger">{errors.Op_Type}</span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>QC</label>
                </div>
                <div className="col-md-8">
                  <select
                    className="form-select"
                    name="QC"
                    value={formData.QC}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.QC && (
                    <span className="text-danger">{errors.QC}</span>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-8 offset-md-4">
                  <button type="submit" className="Standardbtn">
                    {isEditing ? "Update" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Std Routing No</th>
              <th>Op No</th>
              <th>Op Name</th>
              <th>Part Type</th>
              <th>Wip Wt</th>
              <th>Op Type</th>
              <th>QC</th>
              <th>Ass Prod</th>
              <th>Part Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.Std_Routing_No}</td>
                <td>{item.Op_No}</td>
                <td>{item.Op_Name}</td>
                <td>{item.Part_Type}</td>
                <td>{item.Wip_Wt}</td>
                <td>{item.Op_Type}</td>
                <td>{item.QC}</td>
                <td>{item.Ass_Prod}</td>
                <td>{item.Part_Code}</td>
                <td>
                  <button
                    onClick={() => handleEdit(item)}
                    className="btn btn-primary btn-sm me-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default VisibleStandard;
