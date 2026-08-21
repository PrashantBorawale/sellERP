import "../Contractoraaa/Contractoraaa.css";
import React, { useState } from "react";
import { addContractor } from "../../../Service/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Contractoraaa = () => {
  const [formData, setFormData] = useState({
    Plant: "",
    ContractorName: "",
    ContactNo: "",
    GstNo: "",
    NatureOfService: "",
    Email: "",
    RefCode: "",
    Address: "",
    PanNo: "",
    Tds: "",
    FirName: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await addContractor(formData);
      toast.success("Contractor added successfully");
      console.log("Form Data:", formData);
      setFormData({
        Plant: "",
        ContractorName: "",
        ContactNo: "",
        GstNo: "",
        NatureOfService: "",
        Email: "",
        RefCode: "",
        Address: "",
        PanNo: "",
        Tds: "",
        FirName: "",
      });
    } catch (error) {
      toast.error("Error adding contractor");
    }
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="row text-start">
        <div className="col-md-6">
          <div className="row mb-3">
            <label htmlFor="Plant" className="col-sm-4 col-form-label">
              Plant:
            </label>
            <div className="col-sm-8">
              <select
                id="Plant"
                className="form-select"
                value={formData.Plant}
                onChange={handleChange}
              >
                <option value="">Select Plant</option>
                <option value="plant1">Plant 1</option>
                <option value="plant2">Plant 2</option>
                <option value="plant3">Plant 3</option>
              </select>
              {errors.Plant && (
                <div className="text-danger">{errors.Plant}</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="ContractorName" className="col-sm-4 col-form-label">
              Contractor Name:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="ContractorName"
                value={formData.ContractorName}
                onChange={handleChange}
              />
              {errors.ContractorName && (
                <div className="text-danger">{errors.ContractorName}</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="ContactNo" className="col-sm-4 col-form-label">
              Contact No:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="ContactNo"
                value={formData.ContactNo}
                onChange={handleChange}
              />
              {errors.ContactNo && (
                <div className="text-danger">{errors.ContactNo}</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="GstNo" className="col-sm-4 col-form-label">
              GST No:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="GstNo"
                value={formData.GstNo}
                onChange={handleChange}
              />
              {errors.GstNo && (
                <div className="text-danger">{errors.GstNo}</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="NatureOfService"
              className="col-sm-4 col-form-label"
            >
              Nature Of Service:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="NatureOfService"
                value={formData.NatureOfService}
                onChange={handleChange}
              />
              {errors.NatureOfService && (
                <div className="text-danger">{errors.NatureOfService}</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="Email" className="col-sm-4 col-form-label">
              Email:
            </label>
            <div className="col-sm-8">
              <input
                type="email"
                className="form-control"
                id="Email"
                value={formData.Email}
                onChange={handleChange}
              />
              {errors.Email && (
                <div className="text-danger">{errors.Email}</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="RefCode" className="col-sm-4 col-form-label">
              Ref Code:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="RefCode"
                value={formData.RefCode}
                onChange={handleChange}
              />
              {errors.RefCode && (
                <div className="text-danger">{errors.RefCode}</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row mb-3">
            <label htmlFor="Address" className="col-sm-4 col-form-label">
              Address:
            </label>
            <div className="col-sm-8">
              <textarea
                className="form-control"
                id="Address"
                value={formData.Address}
                onChange={handleChange}
              />
              {errors.Address && (
                <div className="text-danger">{errors.Address}</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="PanNo" className="col-sm-4 col-form-label">
              Pan No:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="PanNo"
                value={formData.PanNo}
                onChange={handleChange}
              />
              {errors.PanNo && (
                <div className="text-danger">{errors.PanNo}</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="Tds" className="col-sm-4 col-form-label">
              TDS %:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="Tds"
                value={formData.Tds}
                onChange={handleChange}
              />
              {errors.Tds && <div className="text-danger">{errors.Tds}</div>}
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="FirName" className="col-sm-4 col-form-label">
              First Name:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="FirName"
                value={formData.FirName}
                onChange={handleChange}
              />
              {errors.FirName && (
                <div className="text-danger">{errors.FirName}</div>
              )}
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contractoraaa;
