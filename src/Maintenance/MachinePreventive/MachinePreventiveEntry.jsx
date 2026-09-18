import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./MachinePreventiveEntry.css";
import { FaPrint } from "react-icons/fa";

const MachinePreventiveEntry = () => {
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
    <div className="machinepreventiveentry">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row">
                      <div className="col-md-3">
                        <h5 className="header-title text-start">
                          Repair Entry
                        </h5>
                      </div>
                      <div className="col-md-9 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaPrint /> View Report
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="header-section mb-4">
                    <div className="row mt-2 mb-3">
                      <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-2">
                        <div className="d-flex align-items-center gap-2 w-100">
                          <label className="form-label mb-0 text-nowrap">Tool/Machine:</label>
                          <input type="text" className="form-control flex-grow-1" />
                        </div>
                      </div>

                      <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-2">
                        <div className="d-flex align-items-center gap-2 w-100">
                          <label className="form-label mb-0 text-nowrap">Select Year:</label>
                          <select className="form-select flex-grow-1">
                            <option value="">Select year</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-2">
                        <div className="d-flex align-items-center gap-2 w-100">
                          <label className="form-label mb-0 text-nowrap">Select Quarter:</label>
                          <select className="form-select flex-grow-1">
                            <option value="">Quarter-1</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-2">
                        <div className="d-flex align-items-center gap-2 w-100">
                          <label className="form-label mb-0 text-nowrap">Select Frequency:</label>
                          <select className="form-select flex-grow-1">
                            <option value="">All</option>
                          </select>
                          <button className="btn text-nowrap">Search</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Sr</th>
                          <th>Maint. type</th>
                          <th>M/C Part</th>
                          <th>Parameter</th>
                          <th>Method</th>
                          <th>Specification</th>
                          <th>Freq</th>
                          <th>M1</th>
                          <th>M2</th>
                          <th>M3</th>
                          <th>Entry</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* No data inside for now as requested */}
                        <tr>
                          <td colSpan="11" className="text-center">No Data Found...!!!</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-3 text-end">
                    <button className="btn">Save & Update</button>
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

export default MachinePreventiveEntry;
