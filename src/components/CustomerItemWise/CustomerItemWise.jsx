import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaSearch, FaFileExcel, FaSave, FaEraser, FaTrashAlt } from "react-icons/fa";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./CustomerItemWise.css";
import { toast, ToastContainer } from "react-toastify";
import { saveItemRate } from "../../Service/Api.jsx";
import "react-toastify/dist/ReactToastify.css";

const CustomerItemWise = () => {
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
    Cust_Supp_Name: "",
    ItemName: "",
    VARate1: "",
    VARate2: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.Cust_Supp_Name) {
      valid = false;
      newErrors.Cust_Supp_Name = "Required";
    }
    if (!formData.ItemName) {
      valid = false;
      newErrors.ItemName = "Required";
    }
    if (!formData.VARate1) {
      valid = false;
      newErrors.VARate1 = "Required";
    }
    if (!formData.VARate2) {
      valid = false;
      newErrors.VARate2 = "Required";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validate()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await saveItemRate(formData);
      toast.success("Data saved successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save data");
    }
  };

  const handleClear = () => {
    setFormData({
      Cust_Supp_Name: "",
      ItemName: "",
      VARate1: "",
      VARate2: "",
    });
    setErrors({});
    toast.info("Form cleared");
  };

  const handleExport = () => {
    toast.info("Exporting to Excel...");
    // Export logic would go here
  };

  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="erp-page customer-item-wise">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="customer-item-wise-main overflow-hidden p-4">
                {/* Header Section */}
                <div className="erp-header mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="header-title mb-0">Customer Item Wise Value Addition Rate</h5>
                    <button className="vndrbtn" onClick={handleExport}>
                      Export
                    </button>
                  </div>
                </div>

                {/* Filter / Action Section (Includes Tabs) */}
                <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                  {/* Tabs Section at the top of the container */}
                  <div className="tabs-wrapper border-bottom">
                    <ul className="nav nav-tabs custom-nav-tabs border-0 p-2">
                      <li className="nav-item">
                        <button
                          className={`nav-link ${activeTab === "search" ? "active" : ""}`}
                          onClick={() => setActiveTab("search")}
                        >
                          Search Option
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${activeTab === "add" ? "active" : ""}`}
                          onClick={() => setActiveTab("add")}
                        >
                          Add Item
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3">
                    {activeTab === "search" ? (
                      <div className="row g-3 align-items-end px-2">
                        <div className="col-md-4">
                          <label htmlFor="Cust_Supp_Name" className="form-label mb-1">Cust / Supp Name:</label>
                          <div className="d-flex gap-1">
                            <input
                              type="text"
                              className={`form-control form-control-sm ${errors.Cust_Supp_Name ? "is-invalid" : ""}`}
                              id="Cust_Supp_Name"
                              placeholder="Enter Name"
                              value={formData.Cust_Supp_Name}
                              onChange={handleChange}
                            />
                            <button className="vndrbtn" onClick={() => toast.info("Searching...")}>
                              Search
                            </button>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <label htmlFor="ItemName" className="form-label mb-1">Item Name:</label>
                          <div className="d-flex align-items-center gap-2">
                            <input type="checkbox" className="form-check-input mt-0" />
                            <input
                              type="text"
                              className={`form-control form-control-sm ${errors.ItemName ? "is-invalid" : ""}`}
                              id="ItemName"
                              placeholder="Enter Item"
                              value={formData.ItemName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-1">
                          <label htmlFor="VARate1" className="form-label mb-1">VA Rate1:</label>
                          <input
                            type="text"
                            className={`form-control form-control-sm ${errors.VARate1 ? "is-invalid" : ""}`}
                            id="VARate1"
                            value={formData.VARate1}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-1">
                          <label htmlFor="VARate2" className="form-label mb-1">VA Rate2:</label>
                          <input
                            type="text"
                            className={`form-control form-control-sm ${errors.VARate2 ? "is-invalid" : ""}`}
                            id="VARate2"
                            value={formData.VARate2}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-3 d-flex gap-2 justify-content-end mt-auto">
                          <button className="vndrbtn" onClick={handleSubmit}>
                            Save
                          </button>
                          <button className="vndrbtn erp-btn-outline" onClick={handleClear}>
                            Clear
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted">Add Item form will be implemented here.</p>
                      </div>
                    )}
                  </div>
                </div>

                {activeTab === "search" && (
                  <>
                    <div className="table-responsive mt-4">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th style={{ width: "50px" }}>SR</th>
                            <th style={{ width: "100px" }}>Cust Code</th>
                            <th>Cust Name</th>
                            <th style={{ width: "120px" }}>Item Code</th>
                            <th>Item Desc</th>
                            <th style={{ width: "100px" }}>VA1</th>
                            <th style={{ width: "100px" }}>VA2</th>
                            <th style={{ width: "80px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
                            <tr key={row}>
                              <td className="text-center">{row}</td>
                              <td className="text-center">00{row}</td>
                              <td>Customer Name {row}</td>
                              <td className="text-center">ITM-00{row}</td>
                              <td>Sample Item Description {row} for scroll testing</td>
                              <td className="text-right">VA1-{row}</td>
                              <td className="text-right">VA2-{row}</td>
                              <td className="text-center">
                                <button className="btn btn-sm text-danger border-0 p-0" title="Delete">
                                  <FaTrashAlt size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="row mt-3 align-items-center">
                      <div className="col-md-6 text-start">
                        <span className="record-count">Total Records: <strong>8</strong></span>
                      </div>
                    </div>
                  </>
                )}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerItemWise;
