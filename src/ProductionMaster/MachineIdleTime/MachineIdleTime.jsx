import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./MachineIdleTime.css"; // Custom CSS file
import { Link } from "react-router-dom";

const MachineIdleTime = () => {
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
    <div className="MachineIdleMaster">
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
                <div className="MachineIdle mt-5">
                  <div className="MachineIdle-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">
                          Machine Idle Time | Setting
                        </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <Link type="button" className="btn" to='/NewIdleMaster'>
                          Idle List
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="MachineIdle-Main card p-4">
                    <form>
                      <div className="row text-start">
                        <div className="col-md-1 mb-3">
                          <label htmlFor="date" className="form-label">
                            Date
                          </label>
                        </div>
                        <div className="col-md-1 mb-3">
                          <input
                            type="date"
                            id="date"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-1 mb-3">
                          <label htmlFor="shift" className="form-label">
                            Shift
                          </label>
                        </div>
                        <div className="col-md-1 mb-3">
                          <select id="shift" className="form-select">
                            <option>ALL</option>
                            <option>FIRST 8HRS: 07:00 - 15:30</option>
                            <option>SECOND 8HRS: 15:30 - 23:00</option>
                            <option>THIRD 8HRS: 23:00 - 07:00</option>
                          </select>
                        </div>
                        <div className="col-md-1 mb-3">
                          <label htmlFor="machineType" className="form-label">
                            Machine Type
                          </label>
                        </div>
                        <div className="col-md-1 mb-3">
                          <select id="machineType" className="form-select">
                            <option>ALL</option>
                            <option>Type 1</option>
                            <option>Type 2</option>
                            <option>Type 3</option>
                          </select>
                        </div>
                        <div className="col-md-2 mb-3 d-flex align-items-center ">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="machineUtilizeCheckbox"
                            />
                            <label
                              htmlFor="machineUtilizeCheckbox"
                              className="form-check-label"
                            >
                              100% Utilize
                            </label>
                          </div>
                        </div>

                        <div className="col-md-1 mt-2">
                          <button type="button" className="btn">
                            Search
                          </button>
                        </div>
                      </div>
                      <div className="row text-start">
                        <div className="col-md-1 mb-3">
                          <label htmlFor="reason" className="form-label">
                            Reason
                          </label>
                        </div>
                        <div className="col-md-1 mb-3">
                          <select id="machineType" className="form-select">
                            <option>Select Change</option>
                            <option>Type 1</option>
                            <option>Type 2</option>
                            <option>Type 3</option>
                          </select>
                        </div>
                        <div className="col-md-1 mb-3">
                          <button type="button" className="btn">
                            Set to -- All
                          </button>
                        </div>
                        <div className="col-md-9 text-end">
                          <button type="button" className="btn">
                            Save Idle Time
                          </button>
                        </div>
                      </div>
                    </form>
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

export default MachineIdleTime;
