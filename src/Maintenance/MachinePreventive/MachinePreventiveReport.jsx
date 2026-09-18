import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./MachinePreventiveReport.css";
import { FaChartBar, FaSearch, FaTrash } from "react-icons/fa";

const MachinePreventiveReport = () => {
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
    <div className="machine-preventive-report">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header - Synchronized with ToolManagement standard */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title text-start mb-0">
                          Machine Preventive Report
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2 border">
                          <FaChartBar /> Preventive Report Detail
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section - Synchronized Search and Gaps */}
                  <div className="header-section mb-4">
                    <div className="row align-items-end g-3 mt-1 mb-2">
                      <div className="col-md-2">
                        <label className="form-label mb-1 fw-bold">From Date:</label>
                        <input type="date" className="form-control form-control-sm" />
                      </div>

                      <div className="col-md-2">
                        <label className="form-label mb-1 fw-bold">To Date:</label>
                        <input type="date" className="form-control form-control-sm" />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label mb-1 fw-bold">Machine Item:</label>
                        <div className="d-flex align-items-center gap-1 flex-nowrap">
                           <input type="checkbox" className="form-check-input mt-0" id="itemCheck" />
                           <label className="form-check-label mb-0 text-nowrap me-1" htmlFor="itemCheck">Item:</label>
                           <input type="text" className="form-control form-control-sm" placeholder="Enter Item Name..." />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label className="form-label mb-1 fw-bold">Frequency :</label>
                        <div className="d-flex align-items-center gap-1 flex-nowrap">
                          <select className="form-select form-select-sm">
                            <option value="">All Frequency</option>
                          </select>
                          <button className="btn btn-sm d-inline-flex align-items-center gap-1 border" style={{ whiteSpace: "nowrap" }}>
                            <FaSearch size={10} /> Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>Sr.</th>
                          <th>Trn No</th>
                          <th>Trn Date</th>
                          <th>Machine Name</th>
                          <th>M. Type</th>
                          <th>Part Name</th>
                          <th>M. Parameter</th>
                          <th>Method Name</th>
                          <th>Specification</th>
                          <th>Frequency</th>
                          <th>Reaction Plan</th>
                          <th>Action Taken</th>
                          <th>Doc</th>
                          <th style={{ width: "60px" }}>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="14" className="text-center py-5 text-muted fw-bold">
                            No Preventive Records Found...!!!
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Footer - Moved Total Records here to match Standard */}
                  <div className="d-flex justify-content-between align-items-center mt-3 p-2 bg-light border shadow-sm">
                    <div style={{ fontSize: "13px" }}>Total Records : <b>00</b></div>
                    <div style={{ fontSize: "13px" }}><b>Report Generated Successfully</b></div>
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

export default MachinePreventiveReport;
