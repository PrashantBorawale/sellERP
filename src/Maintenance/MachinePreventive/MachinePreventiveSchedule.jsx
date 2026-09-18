import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./MachinePreventiveSchedule.css";
import { FaList, FaSearch } from "react-icons/fa";

const MachinePreventiveSchedule = () => {
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
    <div className="machinepreventiveschedule">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title text-start mb-0">
                          Preventive Maintenance Plan
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaList /> PM Plan(Yearly)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section - Strictly following SetUp style */}
                  <div className="header-section mb-4">
                    <div className="row align-items-center g-3 mt-2 mb-3">
                      <div className="col-auto d-flex align-items-center gap-2">
                        <div className="form-check mb-0">
                          <input className="form-check-input" type="checkbox" id="itemsCheck" />
                          <label className="form-label mb-0 fw-bold" htmlFor="itemsCheck">
                            Items :
                          </label>
                        </div>
                        <input type="text" className="form-control" style={{ width: "200px" }} />
                      </div>

                      <div className="col-auto d-flex align-items-center gap-2">
                        <label className="form-label mb-0 fw-bold">Frequency :</label>
                        <select className="form-select" style={{ width: "150px" }}>
                          <option>All</option>
                        </select>
                      </div>

                      <div className="col-auto d-flex align-items-center gap-2">
                        <label className="form-label mb-0 fw-bold">Maintenance Type :</label>
                        <select className="form-select" style={{ width: "150px" }}>
                          <option>All</option>
                        </select>
                      </div>

                      <div className="col-auto d-flex align-items-center gap-2">
                        <label className="form-label mb-0 fw-bold">Check Point Type :</label>
                        <select className="form-select" style={{ width: "150px" }}>
                          <option>All</option>
                        </select>
                      </div>

                      <div className="col-auto">
                        <button className="btn d-flex align-items-center gap-2">
                          <FaSearch /> Search
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive">
                    <table className="table table-bordered user-list-table">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Machine Part</th>
                          <th>Parameter</th>
                          <th>Specification</th>
                          <th>Frequency</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="6" className="text-center py-5 text-muted fw-bold">
                            No Data Found...!!!
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Section */}
                  <div className="mt-3 text-start">
                    <span className="fw-bold" style={{ fontSize: "14px", color: "#333" }}>
                      Total Records : 00
                    </span>
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

export default MachinePreventiveSchedule;
