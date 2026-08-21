import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./RepairList.css";
import { FaPlus, FaFileExcel, FaSearch, FaEdit, FaEye, FaTrash } from "react-icons/fa";

const RepairList = () => {
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
    <div className="repair-list-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="repair-report-container">
                  {/* Header Section */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6 text-start">
                        <h5 className="header-title mb-0">Maintenance: Repair Report</h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaPlus /> Add New Repair Entry
                        </button>
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaFileExcel className="text-success" /> Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section - Reverted to Centered Label Alignment */}
                  <div className="header-section mb-3">
                    <div className="filter-row-flex">
                      <div className="filter-item">
                        <label>Plant :</label>
                        <select className="form-select" style={{ width: "100px" }}><option>SHARP</option></select>
                      </div>
                      <div className="filter-item">
                        <label>Series :</label>
                        <select className="form-select" style={{ width: "100px" }}><option>ALL</option></select>
                      </div>
                      <div className="filter-item">
                        <label>From :</label>
                        <input type="date" className="form-control" defaultValue="2026-04-08" style={{ width: "135px" }} />
                      </div>
                      <div className="filter-item">
                        <label>To Date :</label>
                        <input type="date" className="form-control" defaultValue="2026-05-09" style={{ width: "135px" }} />
                      </div>
                      <div className="filter-item">
                        <label>Asset Category</label>
                        <select className="form-select" style={{ width: "130px" }}><option>ALL</option></select>
                      </div>
                      <div className="filter-item">
                        <label>Status</label>
                        <select className="form-select" style={{ width: "100px" }}><option>ALL</option></select>
                      </div>
                      <div className="filter-item search-group">
                        <div className="checkbox-label-group">
                          <input type="checkbox" id="breakdownCheck" />
                          <label htmlFor="breakdownCheck">BreakDown No</label>
                        </div>
                        <div className="d-flex gap-1">
                          <input type="text" className="form-control" style={{ width: "180px" }} />
                          <button className="btn">
                            <FaSearch /> Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Table */}
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Sr.No</th>
                          <th>Plant</th>
                          <th>Year</th>
                          <th>Repair No</th>
                          <th>Rep. Date</th>
                          <th>BreakDown No</th>
                          <th>Code</th>
                          <th>Tool / Machine</th>
                          <th>Department</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Category</th>
                          <th>Repair Cost</th>
                          <th>Status</th>
                          <th>User</th>
                          <th>Doc</th>
                          <th>Edit</th>
                          <th>View</th>
                          <th>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="19" className="text-center py-5 text-muted">No Data Found...!!!</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Totals */}
                  <div className="footer-totals-bar d-flex justify-content-between mt-3 p-2 border-top">
                    <div className="fw-bold text-muted" style={{ fontSize: "14px" }}>Total Record : 0</div>
                    <div className="fw-bold text-muted" style={{ fontSize: "14px" }}>Total Repair Cost : 0</div>
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

export default RepairList;
