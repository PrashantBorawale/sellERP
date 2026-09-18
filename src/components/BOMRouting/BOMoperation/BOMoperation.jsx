import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./BOMoperation.css"
import { toast , ToastContainer } from "react-toastify";

import {
    saveOperation,
    getOperations,
    updateOperation,
    deleteOperation,
    getDepartments,
    getMachineTypes
  } from "../../../Service/Api.jsx";
  
  const BOMoperation = () => {
    const [formData, setFormData] = useState({
      Std_Otp: "",
      Operation_Name: "",
      Prefix: "",
      Mhr_Rate: "",
      BomQc: "",
      ProductionDept: "",
      MachineType: "",
      Production_Cycle_Time: "",
      Stop_Mc_Booking: "",
      Per_Day_Prod_Qty: "",
    });
  const [departments, setDepartments] = useState([]);
  const [machineTypes, setMachineTypes] = useState([]);
  
    const [errors, setErrors] = useState({});
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
  
    // Fetch operations on mount
    useEffect(() => {
      fetchOperations();
    }, []);
  
    const fetchOperations = async () => {
      try {
        const result = await getOperations();
        setData(result);
      } catch (error) {
        console.error("Error fetching operations:", error);
      }
    };
  
    const handleInputChange1 = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSave1 = async (e) => {
      e.preventDefault();
  
      if (!formData.Std_Otp || !formData.Operation_Name) {
        setErrors({ Std_Otp: "Required", Operation_Name: "Required" });
        return;
      }
  
      try {
        if (isEditing) {
          await updateOperation(editId, formData);
        } else {
          await saveOperation(formData);
        }
        fetchOperations();
        handleClear1();
        toast.success("Operation Edit successfully!");
      } catch (error) {
        console.error("Error saving operation:", error);
        toast.error("Failed to save Operation.");
      }
    };
  
    const handleEdit1 = (item) => {
      setFormData(item);
      setIsEditing(true);
      setEditId(item.id);
    };
  
    const handleDelete1 = async (id) => {
      
        try {
          await deleteOperation(id);
          fetchOperations();
          toast.success("Operation Edit successfully!");
        } catch (error) {
          console.error("Error deleting operation:", error);
          toast.error("Failed to edit Operation.");
        }
      
    };



    // Fetch Data on Component Mount
    useEffect(() => {
      const fetchData = async () => {
        setDepartments(await getDepartments());
        setMachineTypes(await getMachineTypes());
      };
      fetchData();
    }, []);
  
    // Handle Input Change
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleClear1 = () => {
      setFormData({
        Std_Otp: "",
        Operation_Name: "",
        Prefix: "",
        Mhr_Rate: "",
        BomQc: "",
        ProductionDept: "",
        MachineType: "",
        Production_Cycle_Time: "",
        Stop_Mc_Booking: "",
        Per_Day_Prod_Qty: "",
      });
      setErrors({});
      setIsEditing(false);
      setEditId(null);
    };
  
    const toggleCardOperation = () => {
      document.querySelector(".Operation").classList.toggle("d-none");
    };


    
  return (
    <div className="Operation">
        <ToastContainer/>
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h5 style={{ color: "blue" }}>Operation Master</h5>
        <button
          className="Closebom"
          onClick={toggleCardOperation}
        >
          X
        </button>
      </div>


      <div className="card-body">
        <form onSubmit={handleSave1}>
          <div className="row mb-3 text-start">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4 mt-3">
                  <label>Std. OP No.</label>
                </div>
                <div className="col-md-8 mt-4">
                  <input
                    type="text"
                    name="Std_Otp"
                    value={formData.Std_Otp}
                    onChange={handleInputChange1}
                    className={`form-control ${
                      errors.Std_Otp ? "is-invalid" : ""
                    }`}
                  />
                  {errors.Std_Otp && (
                    <div className="invalid-feedback">
                      {errors.Std_Otp}
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mt-3">
                  <label>Operation Name</label>
                </div>
                <div className="col-md-8 mt-4">
                  <input
                    type="text"
                    name="Operation_Name"
                    value={formData.Operation_Name}
                    onChange={handleInputChange1}
                    className={`form-control ${
                      errors.Operation_Name
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {errors.Operation_Name && (
                    <div className="invalid-feedback">
                      {errors.Operation_Name}
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mt-3">
                  <label>Prefix</label>
                </div>
                <div className="col-md-8 mt-4">
                  <input
                    type="text"
                    name="Prefix"
                    value={formData.Prefix}
                    onChange={handleInputChange1}
                    className={`form-control ${
                      errors.Prefix ? "is-invalid" : ""
                    }`}
                  />
                  {errors.Prefix && (
                    <div className="invalid-feedback">
                      {errors.Prefix}
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mt-3">
                  <label>MHR Rate</label>
                </div>
                <div className="col-md-8 mt-4">
                  <input
                    type="text"
                    name="Mhr_Rate"
                    value={formData.Mhr_Rate}
                    onChange={handleInputChange1}
                    className={`form-control ${
                      errors.Mhr_Rate ? "is-invalid" : ""
                    }`}
                  />
                  {errors.Mhr_Rate && (
                    <div className="invalid-feedback">
                      {errors.Mhr_Rate}
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mt-3">
                  <label>BOM QC</label>
                </div>
                <div className="col-md-8 mt-4">
                  <select
                    name="BomQc"
                    value={formData.BomQc}
                    onChange={handleInputChange1}
                    className={`form-control ${
                      errors.BomQc ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.BomQc && (
                    <div className="invalid-feedback">
                      {errors.BomQc}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4 mt-3">
                  <label>Production Dept</label>
                </div>
                <div className="col-md-8 mt-4">
                <select
            name="ProductionDept"
            value={formData.ProductionDept}
            onChange={handleInputChange}
            className={`form-control ${errors.ProductionDept ? "is-invalid" : ""}`}
          >
            <option value="">Select</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.Department_Name}>
                {dept.Department_Name}
              </option>
            ))}
          </select>
                  {errors.ProductionDept && (
                    <div className="invalid-feedback">
                      {errors.ProductionDept}
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mt-3">
                  <label>Machine Type</label>
                </div>
                <div className="col-md-8 mt-4">
                <select
            name="MachineType"
            value={formData.MachineType}
            onChange={handleInputChange}
            className={`form-control ${errors.MachineType ? "is-invalid" : ""}`}
          >
            <option value="">Select</option>
            {machineTypes.map((machine) => (
              <option key={machine.id} value={machine.EnterType}>
                {machine.EnterType}
              </option>
            ))}
          </select>
                  {errors.MachineType && (
                    <div className="invalid-feedback">
                      {errors.MachineType}
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mt-3">
                  <label>Production Cycle Time</label>
                </div>
                <div className="col-md-8 mt-4">
                  <input
                    type="text"
                    name="Production_Cycle_Time"
                    value={formData.Production_Cycle_Time}
                    onChange={handleInputChange1}
                    className={`form-control ${
                      errors.Production_Cycle_Time
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {errors.Production_Cycle_Time && (
                    <div className="invalid-feedback">
                      {errors.Production_Cycle_Time}
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mt-3">
                  <label>Stop M/C Booking</label>
                </div>
                <div className="col-md-8 mt-4">
                  <input
                    type="text"
                    name="Stop_Mc_Booking"
                    value={formData.Stop_Mc_Booking}
                    onChange={handleInputChange1}
                    className={`form-control ${
                      errors.Stop_Mc_Booking
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {errors.Stop_Mc_Booking && (
                    <div className="invalid-feedback">
                      {errors.Stop_Mc_Booking}
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mt-3">
                  <label>Per Day Prod Qty</label>
                </div>
                <div className="col-md-8 mt-4">
                  <input
                    type="text"
                    name="Per_Day_Prod_Qty"
                    value={formData.Per_Day_Prod_Qty}
                    onChange={handleInputChange1}
                    className={`form-control ${
                      errors.Per_Day_Prod_Qty
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {errors.Per_Day_Prod_Qty && (
                    <div className="invalid-feedback">
                      {errors.Per_Day_Prod_Qty}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-12 text-end">
              <button
                type="submit"
                className="bomButton"
                style={{ marginTop: "24px" }}
              >
                {isEditing ? "Update" : "Save"}
              </button>
              <button
                type="button"
                className="bomButton"
                style={{
                  marginTop: "24px",
                  marginLeft: "10px",
                }}
                onClick={handleClear1}
              >
                Clear
              </button>
            </div>
          </div>
        </form>

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">Sr. No.</th>
                    <th scope="col">Std. Op No</th>
                    <th scope="col">Operation Name</th>
                    <th scope="col">Prefix</th>
                    <th scope="col">MC-IR Rate</th>
                    <th scope="col">Qc Apply</th>
                    <th scope="col">Department</th>
                    <th scope="col">Machine Type</th>
                    <th scope="col">Allow Cycle Time</th>
                    <th scope="col">Step wc Booking</th>
                    <th scope="col">Print</th>
                    <th scope="col">SAC Code</th>
                    <th scope="col">Operation Rate</th>
                    <th scope="col">Per Day Per Qty</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.Std_Otp}</td>
                        <td>{item.Operation_Name}</td>
                        <td>{item.Prefix}</td>
                        <td>{item.Mhr_Rate}</td>
                        <td>{item.BomQc}</td>
                        <td>{item.ProductionDept}</td>
                        <td>{item.MachineType}</td>
                        <td>{item.Production_Cycle_Time}</td>
                        <td>{item.Stop_Mc_Booking}</td>
                        <td>{item.Print}</td>
                        <td>{item.SAC_Code}</td>
                        <td>{item.Operation_Rate}</td>
                        <td>{item.Per_Day_Per_Qty}</td>
                        <td>
                          <FaEdit
                            className="text-primary mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEdit1(item)}
                          />
                        </td>
                        <td>
                          <FaTrash
                            className="text-danger mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleDelete1(item.id)
                            }
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="16"
                        className="text-center"
                      >
                        No Records Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row text-start mt-5">
          <div className="col-md-12">
            <h6>Total Records: {data.length}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default BOMoperation
