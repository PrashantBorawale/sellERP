import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaSearch, FaFileExcel, FaSave, FaEraser, FaTrashAlt, FaUpload } from "react-icons/fa";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./CustomerSupplierLink.css";
import { postSupplierItem } from "../../Service/Api.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerSupplierLink = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("add"); // Default to "Add Item"

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
    Main_Group: "",
    ItemName: "",
    Rate: "",
    // Filter tab states
    isCustomerSupplierChecked: false,
    customerSupplierName: "",
    isItemNameChecked: false,
    itemName: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.Cust_Supp_Name) {
      valid = false;
      newErrors.Cust_Supp_Name = "Required";
    }
    if (!formData.Main_Group) {
      valid = false;
      newErrors.Main_Group = "Required";
    }
    if (!formData.ItemName) {
      valid = false;
      newErrors.ItemName = "Required";
    }
    if (!formData.Rate) {
      valid = false;
      newErrors.Rate = "Required";
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
      await postSupplierItem(formData);
      toast.success("Data successfully saved");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save data");
    }
  };

  const handleClear = () => {
    setFormData({
      ...formData,
      Cust_Supp_Name: "",
      Main_Group: "",
      ItemName: "",
      Rate: "",
    });
    setErrors({});
    toast.info("Form cleared");
  };

  const handleExport = () => {
    toast.info("Exporting to Excel...");
  };

  const handleUpload = () => {
    toast.info("Opening Upload dialog...");
  };

  return (
    <div className="erp-page customer-supplier-link">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="customer-supplier-link-main overflow-hidden p-4">
                {/* Header Section - Exactly as GL Master */}
                <div className="erp-header mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="header-title mb-0">Customer / Supplier Items Link</h5>
                    <div className="d-flex gap-2">
                      <button className="vndrbtn" onClick={handleUpload}>
                        CustomerMaster Item Upload
                      </button>
                      <button className="vndrbtn" onClick={handleExport}>
                        Export to Excel
                      </button>
                    </div>
                  </div>
                </div>

                {/* Unified Tab & Input Section - Matching GL Master UI Design */}
                <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                  <div className="tabs-wrapper border-bottom">
                    <ul className="nav nav-tabs custom-nav-tabs border-0 p-2">
                      <li className="nav-item">
                        <button
                          className={`nav-link ${activeTab === "add" ? "active" : ""}`}
                          onClick={() => setActiveTab("add")}
                        >
                          Add Item
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${activeTab === "filter" ? "active" : ""}`}
                          onClick={() => setActiveTab("filter")}
                        >
                          Filter
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3">
                    {activeTab === "add" ? (
                      <div className="row align-items-end mt-2 mb-3 px-2">
                        <div className="col-md-3">
                          <label htmlFor="Cust_Supp_Name" className="form-label mb-1">Cust / Supp Name :</label>
                          <div className="d-flex gap-1">
                            <input
                              type="text"
                              className={`form-control ${errors.Cust_Supp_Name ? "is-invalid" : ""}`}
                              id="Cust_Supp_Name"
                              name="Cust_Supp_Name"
                              placeholder="Please Enter Cust/Supp Name"
                              value={formData.Cust_Supp_Name}
                              onChange={handleChange}
                            />
                            <button className="vndrbtn" onClick={() => toast.info("Searching...")}>
                              Search
                            </button>
                          </div>
                        </div>

                        <div className="col-md-2">
                          <label htmlFor="Main_Group" className="form-label mb-1">Main Group :</label>
                          <select
                            className={`form-select ${errors.Main_Group ? "is-invalid" : ""}`}
                            id="Main_Group"
                            name="Main_Group"
                            value={formData.Main_Group}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="1">Group One</option>
                            <option value="2">Group Two</option>
                          </select>
                        </div>

                        <div className="col-md-3">
                          <label htmlFor="ItemName" className="form-label mb-1">Item Name :</label>
                          <input
                            type="text"
                            className={`form-control ${errors.ItemName ? "is-invalid" : ""}`}
                            id="ItemName"
                            name="ItemName"
                            placeholder="Please Enter Item Name"
                            value={formData.ItemName}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-1">
                          <label htmlFor="Rate" className="form-label mb-1">Rate :</label>
                          <input
                            type="text"
                            className={`form-control ${errors.Rate ? "is-invalid" : ""}`}
                            id="Rate"
                            name="Rate"
                            placeholder="Rate"
                            value={formData.Rate}
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
                      <div className="row align-items-end mt-2 mb-3 px-2">
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <input
                              type="checkbox"
                              className="form-check-input mt-0"
                              name="isCustomerSupplierChecked"
                              checked={formData.isCustomerSupplierChecked}
                              onChange={handleChange}
                            />
                            <label className="form-label mb-0">Customer/Supplier Name :</label>
                          </div>
                          <div className="d-flex gap-1">
                            <input
                              type="text"
                              className="form-control"
                              name="customerSupplierName"
                              placeholder="Enter Name"
                              value={formData.customerSupplierName}
                              onChange={handleChange}
                            />
                            <button className="vndrbtn" onClick={() => toast.info("Filtering...")}>
                              Search
                            </button>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <input
                              type="checkbox"
                              className="form-check-input mt-0"
                              name="isItemNameChecked"
                              checked={formData.isItemNameChecked}
                              onChange={handleChange}
                            />
                            <label className="form-label mb-0">Item Name :</label>
                          </div>
                          <div className="d-flex gap-1">
                            <input
                              type="text"
                              className="form-control"
                              name="itemName"
                              placeholder="Enter Item Name"
                              value={formData.itemName}
                              onChange={handleChange}
                            />
                            <button className="vndrbtn" onClick={() => toast.info("Filtering...")}>
                              Search
                            </button>
                          </div>
                        </div>

                        <div className="col-md-4 d-flex gap-2 justify-content-end mt-auto">
                          <button className="vndrbtn erp-btn-outline" onClick={handleClear}>
                            Clear
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Table Section */}
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>Sr. No.</th>
                          <th style={{ width: "100px" }}>Cust Code</th>
                          <th>Cust Name</th>
                          <th style={{ width: "100px" }}>Item No</th>
                          <th style={{ width: "120px" }}>Item Code</th>
                          <th>Item Desc</th>
                          <th style={{ width: "100px" }}>Item Rate</th>
                          <th style={{ width: "80px" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
                          <tr key={row}>
                            <td className="text-center">{row}</td>
                            <td className="text-center">00{row}</td>
                            <td>John Doe {row}</td>
                            <td className="text-center">N-{row}</td>
                            <td className="text-center">C-{row}00</td>
                            <td>Sample Item Description {row} for scroll testing</td>
                            <td className="text-right">{100 + row * 10}.00</td>
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
                  </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupplierLink;
