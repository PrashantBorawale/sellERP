import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./MasterReport.css";

const MasterReport = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("itemReport");

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

  return (
    <div className="Report">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Reportrmaster">
                  
                  {/* Header Section - Matching Reference */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <h5 className="header-title text-start">
                          Master Report
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                      </div>
                    </div>
                  </div>
                  
                  {/* Unified Tab & Input Section - Matching Reference UI */}
                  <div className="header-section mb-4 p-0 border-0">
                    <div className="tabs-wrapper border-0">
                      <ul className="nav nav-tabs custom-nav-tabs border-0 p-2">
                        <li className="nav-item">
                          <button
                            className={`nav-link ${activeTab === "itemReport" ? "active" : ""}`}
                            onClick={() => setActiveTab("itemReport")}
                          >
                            Item Report
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={`nav-link ${activeTab === "customerSupplierReport" ? "active" : ""}`}
                            onClick={() => setActiveTab("customerSupplierReport")}
                          >
                            Customer/Supplier Report
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="filter-inputs-container">
                      {activeTab === "itemReport" ? (
                        <div className="row align-items-end mt-2 mb-3 px-2">
                          <div className="col-md-4">
                            <label htmlFor="selectReport1" className="form-label mb-1">Select Report Name :</label>
                            <select id="selectReport1" className="form-select">
                              <option defaultValue="Produlink">Produlink</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                          
                          <div className="col-md-4">
                            <label htmlFor="mainGroup" className="form-label mb-1">Main Group :</label>
                            <select id="mainGroup" className="form-select">
                              <option defaultValue="ALL">ALL</option>
                              <option value="1">CENTERLESS GRINDING</option>
                              <option value="2">CNC</option>
                              <option value="3">DRILLING</option>
                              <option value="4">GRINDER</option>
                              <option value="5">INDUCTION</option>
                              <option value="6">LATHE</option>
                              <option value="7">MANUAL</option>
                              <option value="8">MILLING</option>
                              <option value="9">PRESS</option>
                              <option value="10">SECOND OPERATION</option>
                              <option value="11">SPM</option>
                              <option value="12">TAPPING</option>
                              <option value="13">THREAD ROLLING</option>
                              <option value="14">TROUB</option>
                              <option value="15">VMC</option>
                            </select>
                          </div>

                          <div className="col-md-4 d-flex gap-2 justify-content-end">
                            <button className="btn filter-btn">Search</button>
                            <button className="btn filter-btn">Export Report</button>
                          </div>
                        </div>
                      ) : (
                        <div className="row align-items-end mt-2 mb-3 px-2">
                          <div className="col-md-4">
                            <label htmlFor="selectReport2" className="form-label mb-1">Select Report Name :</label>
                            <select id="selectReport2" className="form-select">
                              <option defaultValue="Produlink">Produlink</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                          
                          <div className="col-md-4">
                            <label htmlFor="reportType" className="form-label mb-1">Type :</label>
                            <select id="reportType" className="form-select">
                              <option defaultValue="ALL">ALL</option>
                              <option value="1">CENTERLESS GRINDING</option>
                              <option value="2">CNC</option>
                              <option value="3">DRILLING</option>
                              <option value="4">GRINDER</option>
                              <option value="5">INDUCTION</option>
                              <option value="6">LATHE</option>
                              <option value="7">MANUAL</option>
                              <option value="8">MILLING</option>
                              <option value="9">PRESS</option>
                              <option value="10">SECOND OPERATION</option>
                              <option value="11">SPM</option>
                              <option value="12">TAPPING</option>
                              <option value="13">THREAD ROLLING</option>
                              <option value="14">TROUB</option>
                              <option value="15">VMC</option>
                            </select>
                          </div>

                          <div className="col-md-4 d-flex gap-2 justify-content-end">
                            <button className="btn filter-btn">Search</button>
                            <button className="btn filter-btn">Export Report</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-container border-0">
                    <div className="table-responsive">
                      <table className="custom-table table-hover">
                        <thead>
                          {activeTab === "itemReport" ? (
                            <tr>
                              <th style={{ width: "50px" }}>Sr</th>
                              <th>Item No</th>
                              <th>Item Code</th>
                              <th>Item Desc</th>
                              <th>Group</th>
                              <th>Grade</th>
                              <th>Size</th>
                              <th>HSN Code</th>
                              <th>Item Id</th>
                            </tr>
                          ) : (
                            <tr>
                              <th style={{ width: "50px" }}>Sr</th>
                              <th>Cust Code</th>
                              <th>Cust Name</th>
                              <th>Code Address</th>
                              <th>Gst No</th>
                              <th>Cust Id</th>
                            </tr>
                          )}
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={activeTab === "itemReport" ? "9" : "6"} className="text-center py-4 text-muted">
                              No data found...!!!
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="footer-totals-bar">
                      <span className="total-label">Total Record : <span className="total-value">0</span></span>
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

export default MasterReport;
