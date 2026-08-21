import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaRegCheckCircle, FaFileExcel } from "react-icons/fa";
import "./ScheduleSetup.css";

const ScheduleSetup = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const toggleSideNav = () => setSideNavOpen(!sideNavOpen);

  return (
    <div className="ScheduleSetupMaster">
      <NavBar toggleSideNav={toggleSideNav} />
      <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
      
      <div className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
        <div className="VendorSchedule-Container mt-3">
          <div className="VendorSchedule-header mb-2">
            <h5 className="header-title">Vendor Schedule</h5>
            <div className="header-actions">
              <button className="btn btn-export">
                <FaFileExcel className="me-1" /> Export To Excel
              </button>
            </div>
          </div>
          
          <div className="VendorSchedule-FormSection">
            <div className="row g-2 align-items-end">
              <div className="col-md-3">
                <label className="form-label">Item :</label>
                <input type="text" className="form-control form-control-xs" />
              </div>
              <div className="col-md-2">
                <label className="form-label">Part Code :</label>
                <input type="text" className="form-control form-control-xs" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Vendor :</label>
                <input type="text" className="form-control form-control-xs" />
              </div>
              <div className="col-md-2">
                <label className="form-label">Schedule %</label>
                <input type="text" className="form-control form-control-xs" />
              </div>
              <div className="col-md-1">
                <button className="btn btn-save">
                  <FaRegCheckCircle className="me-1" /> Save
                </button>
              </div>
            </div>
          </div>

          <div className="VendorSchedule-GridSection">
            <div className="grid-separator"></div>
            <div className="grid-content">
              <div className="no-data">No Data Found !!!</div>
            </div>
          </div>

          <div className="VendorSchedule-Footer">
            <span>Total Record : 0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSetup;
