import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./WorkSchedule.css";

const WorkSchedule = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  return (
    <div className="erp-page WorkSchedule">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Workschedule1 overflow-hidden p-4">
                  <div className="erp-header mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title mb-0">Work Center Idle Time | Setting</h5>
                    </div>
                  </div>
               
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 align-items-end text-start">
                        <div className="col-md-3">
                          <label htmlFor="selectPlant" className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                            Shift:
                          </label>
                          <select
                            id="selectPlant"
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>All</option>
                            <option value="1">
                              FIRST 8HRS FROM :07:00:00 TO :15:30:00
                            </option>
                            <option value="2">
                              SECOND 8HRS FROM :15:30:00 TO :23:30:00
                            </option>
                            <option value="3">THIRD</option>
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="machineType" className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                            Work Center Type
                          </label>
                          <select
                            id="machineType"
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>ALL</option>
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
                        <div className="col-md-1 mt-auto">
                          <button className="vndrbtn w-100">Search</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped">
                      <thead className="table-primary">
                        <tr>
                          <th>Work Center Type</th>
                          <th>Shift</th>
                          <th>Status</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-muted">
                            <i className="fas fa-folder-open me-2"></i> No Found Data !!!
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default WorkSchedule;
