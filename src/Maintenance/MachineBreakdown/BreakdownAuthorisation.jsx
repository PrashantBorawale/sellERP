import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./BreakdownAuthorisation.css";
import {
  FaFileExcel,
  FaSearch
} from "react-icons/fa";

const BreakdownAuthorisation = () => {
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
    <div className="breakdown-auth-page">
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
                        <h5 className="header-title text-start mb-0">
                          Maintenance : Breakdown Log List
                        </h5>
                      </div>
                      <div className="col-md-6 text-end d-flex justify-content-end gap-2">
                        <button className="btn d-inline-flex align-items-center gap-1">
                          <FaFileExcel className="excel-icon" /> Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-3">
                    <div className="d-flex align-items-center flex-wrap gap-3 text-start">
                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label fw-bold">Plant :</label>
                        <select className="form-select form-select-sm" style={{ width: "120px" }}>
                          <option>SHARP</option>
                        </select>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label fw-bold">From :</label>
                        <input type="date" className="form-control form-control-sm" style={{ width: "135px" }} defaultValue="2026-04-07" />
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label fw-bold">To Date :</label>
                        <input type="date" className="form-control form-control-sm" style={{ width: "135px" }} defaultValue="2026-05-08" />
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label fw-bold">Category :</label>
                        <select className="form-select form-select-sm" style={{ width: "120px" }}>
                          <option>ALL</option>
                        </select>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label fw-bold">Status :</label>
                        <select className="form-select form-select-sm" style={{ width: "120px" }}>
                          <option>ALL</option>
                        </select>
                      </div>

                      <button className="btn d-flex align-items-center gap-1">
                        <FaSearch className="search-icon" /> Search
                      </button>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-container">
                    <div className="table-responsive">
                      <table className="custom-table table-bordered">
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Plant</th>
                            <th>Year</th>
                            <th>BreakDown No</th>
                            <th>Date</th>
                            <th>Code</th>
                            <th>Tool/Machine</th>
                            <th>Department</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Auth</th>
                            <th>User</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan="13" className="text-center py-5 text-muted fw-bold bg-white">
                              No Records Found...!!!
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* Footer Summary */}
                    <div className="footer-summary">
                      Total Records : 0
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

export default BreakdownAuthorisation;
