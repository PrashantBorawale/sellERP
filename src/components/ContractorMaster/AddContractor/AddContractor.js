import React, { useEffect, useState } from "react";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import "./AddContractor.css";
import { addContractor } from "../../../Service/Api.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddContractor = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

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
    if (!formData.ContractorName) {
      newErrors.ContractorName = "This field is required";
    }
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
    } catch (error) {
      toast.error("Error adding contractor");
      console.log(error);
    }
  };

  const handleClear = () => {
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
    setErrors({});
  };

  return (
    <div className="AddContractorMaster">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="AddContractorMaster1">
                  
                   <div className="AddContractor-header mb-4 text-start mt-5">
                     <div className="row align-items-center">
                        <div className="col-md-4">
                          <h5 className="header-title">
                            Add New Contractor Master
                          </h5>
                        </div>
                      </div>
                    </div>
                  
                  <div className="AddContractorMain mt-5">
                    <div className="container-fluid">
                      <div className="row text-start mt-4">
                        <div className="col-md-6">
                          <div className="row mb-3">
                            <label
                              htmlFor="Plant"
                              className="col-sm-4 col-form-label"
                            >
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
                                <option value="Produlink">Produlink</option>
                                <option value="plant2">Plant 2</option>
                                <option value="plant3">Plant 3</option>
                              </select>
                              {errors.Plant && (
                                <div className="text-danger">
                                  {errors.Plant}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="ContractorName"
                              className="col-sm-4 col-form-label"
                            >
                              Contractor Name:<span className="text-danger">*</span>
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
                                <div className="text-danger">
                                  {errors.ContractorName}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="ContactNo"
                              className="col-sm-4 col-form-label"
                            >
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
                                <div className="text-danger">
                                  {errors.ContactNo}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="GstNo"
                              className="col-sm-4 col-form-label"
                            >
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
                                <div className="text-danger">
                                  {errors.GstNo}
                                </div>
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
                                <div className="text-danger">
                                  {errors.NatureOfService}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="Email"
                              className="col-sm-4 col-form-label"
                            >
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
                                <div className="text-danger">
                                  {errors.Email}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="RefCode"
                              className="col-sm-4 col-form-label"
                            >
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
                                <div className="text-danger">
                                  {errors.RefCode}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row mb-3">
                            <label
                              htmlFor="Address"
                              className="col-sm-4 col-form-label"
                            >
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
                                <div className="text-danger">
                                  {errors.Address}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="PanNo"
                              className="col-sm-4 col-form-label"
                            >
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
                                <div className="text-danger">
                                  {errors.PanNo}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="Tds"
                              className="col-sm-4 col-form-label"
                            >
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
                              {errors.Tds && (
                                <div className="text-danger">{errors.Tds}</div>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              htmlFor="FirName"
                              className="col-sm-4 col-form-label"
                            >
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
                                <div className="text-danger">
                                  {errors.FirName}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 text-end">
                            <button
                              className="btn"
                              onClick={handleSubmit}
                            >
                              Save
                            </button>
                            <button
                              className="btn"
                              onClick={handleClear}
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContractor;
