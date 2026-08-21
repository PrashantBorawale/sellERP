import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./TDSRegister.css";
import { FaFileExcel, FaSearch, FaPrint } from "react-icons/fa";

const TDSRegister = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="tds-register-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="register-container">
                  
                  {/* Header Section */}
                  <div className="WorkOrderEntry-header mb-3">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title mb-0 text-start">TDS Register</h5>
                      </div>
                      <div className="col-md-6 text-end d-flex justify-content-end gap-2">
                        <button className="btn d-inline-flex align-items-center gap-1">
                          <FaPrint className="text-dark" /> PRINT TDS
                        </button>
                        <button className="btn d-inline-flex align-items-center gap-1">
                          <FaFileExcel className="excel-icon" /> Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-3">
                    <div className="d-flex align-items-center gap-3 flex-wrap text-start">
                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label fw-bold">From:</label>
                        <input type="date" className="form-control form-control-sm" style={{ width: "135px" }} defaultValue="2026-04-08" />
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label fw-bold">To:</label>
                        <input type="date" className="form-control form-control-sm" style={{ width: "135px" }} defaultValue="2026-05-09" />
                      </div>
                      <div className="d-flex align-items-center gap-2 flex-grow-1">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-label fw-bold">Customer :</label>
                        <input type="text" className="form-control form-control-sm ms-1" placeholder="Enter Customer Name" style={{ maxWidth: "400px" }} />
                        <button className="btn d-flex align-items-center gap-1">
                          <FaSearch className="search-icon" /> Search
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-container">
                    <div className="table-responsive">
                      <table className="custom-table table-bordered">
                        <thead>
                          <tr>
                            <th style={{ width: "50px" }}>Sr.</th>
                            <th>Doc Date</th>
                            <th>Inv No.</th>
                            <th>Inv Date</th>
                            <th>Cust Code</th>
                            <th>Customer Name</th>
                            <th>GST No</th>
                            <th>PAN No</th>
                            <th>TDS GL</th>
                            <th>TCS GL</th>
                            <th>SubTotal</th>
                            <th>TDS Rate</th>
                            <th>TDS Amt</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan="13" className="text-center py-5 text-muted fw-bold bg-white">
                               No records found !!
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* Footer Summary */}
                    <div className="footer-summary d-flex justify-content-between">
                      <span>Total Records : 0</span>
                      <span>Total Amt : 0</span>
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

export default TDSRegister;
