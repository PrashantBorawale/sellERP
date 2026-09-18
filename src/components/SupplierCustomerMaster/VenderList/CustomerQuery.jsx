import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";

const CustomerQuery = () => {
  const [activeTab, setActiveTab] = useState("query");
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleClose = () => {
    navigate("/Supplier-Customer-Vendor-List"); // Make sure this matches actual list route
  };

  return (
    <div className="CustomerQuery erp-page">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="container-fluid py-3 overflow-hidden">
                  
                  {/* Header Section */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="header-title mb-0" style={{ fontSize: "22px", fontWeight: "700", color: "blue" }}>Customer Supplier Query</h5>
                    <div className="d-flex gap-2 align-items-center">
                      <button className="vndrbtn mx-1" onClick={() => navigate("/CustomerQueryMaster")}>
                        Query Master
                      </button>
                      <button className="vndrbtn mx-1">
                        Export Report
                      </button>
                      <button className="vndrbtn mx-1 text-danger fw-bold" onClick={handleClose}>
                        X
                      </button>
                    </div>
                  </div>

                  <div className="custom-tabs-container">
                    <div className="tab-buttons d-flex gap-2 mb-3">
                      <button
                        className={activeTab === "query" ? "active vndrbtn" : "vndrbtn"}
                        onClick={() => setActiveTab("query")}
                      >
                        Query
                      </button>
                      <button
                        className={activeTab === "result" ? "active vndrbtn" : "vndrbtn"}
                        onClick={() => setActiveTab("result")}
                      >
                        Result
                      </button>
                    </div>

                    <div className="tab-content border p-3 rounded bg-white shadow-sm">
                      {activeTab === "query" && (
                        <div className="tab-panel">
                          
                          <div className="d-flex align-items-center flex-wrap gap-4">
                            <div className="d-flex flex-column gap-1 align-items-start">
                              <label htmlFor="customerType" className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px" }}>Customer Type:</label>
                              <select className="form-select form-select-sm" id="customerType" style={{ width: "150px" }}>
                                <option value="">All</option>
                                <option value="type1">Type 1</option>
                              </select>
                            </div>

                            <div className="d-flex flex-column gap-1 align-items-start">
                              <label htmlFor="status" className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px" }}>Status:</label>
                              <select className="form-select form-select-sm" id="status" style={{ width: "150px" }}>
                                <option value="">All</option>
                                <option value="active">Active</option>
                              </select>
                            </div>

                            <div className="d-flex flex-column gap-1 align-items-start">
                              <label htmlFor="custName" className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px" }}>Cust Name:</label>
                              <input type="text" className="form-control form-control-sm" id="custName" style={{ width: "180px" }} />
                            </div>

                            <div className="d-flex flex-column gap-1 align-items-start">
                              <label htmlFor="cityName" className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px" }}>City Name:</label>
                              <input type="text" className="form-control form-control-sm" id="cityName" style={{ width: "150px" }} />
                            </div>
                          </div>

                          <hr className="my-4" />

                          <div className="d-flex align-items-center flex-wrap gap-4 mt-3">
                            <div className="d-flex align-items-center gap-2">
                              <input type="radio" id="userQuery" name="queryType" />
                              <label htmlFor="userQuery" className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px", cursor: "pointer" }}>User Query:</label>
                              <select className="form-select form-select-sm" style={{ width: "200px" }}>
                                <option value="">Select</option>
                              </select>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                              <input type="radio" id="erpQuery" name="queryType" />
                              <label htmlFor="erpQuery" className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px", cursor: "pointer" }}>ERP Query:</label>
                            </div>
                          </div>

                          <div className="mt-4">
                            <button className="vndrbtn">Execute</button>
                          </div>

                        </div>
                      )}
                      
                      {activeTab === "result" && (
                        <div className="tab-panel">
                          <h6 className="text-success fw-bold">Result</h6>
                          <p className="text-muted" style={{ fontSize: "13px" }}>The result of the query will be displayed here...</p>
                        </div>
                      )}
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

export default CustomerQuery;
