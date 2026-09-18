import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaPlus } from "react-icons/fa";
import "./ScheduleStatusGenerate.css";

const ScheduleStatusGenerate = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const toggleSideNav = () => setSideNavOpen(!sideNavOpen);

  return (
    <div className="ScheduleStatusGenerateMaster">
      <NavBar toggleSideNav={toggleSideNav} />
      <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
      
      <div className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
        <div className="VendorScheduleList-Container mt-3">
          <div className="VendorScheduleList-header mb-3">
            <h5 className="header-title">Vendor Schedule List</h5>
            <div className="header-actions">
              <button className="btn btn-generate">
                <FaPlus className="me-1" /> Generate Vendor Schedule
              </button>
            </div>
          </div>
          
          <div className="VendorScheduleList-TableSection">
            <table className="VendorScheduleList-table">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>Sr No</th>
                  <th>Month</th>
                  <th style={{ width: '100px' }}>Total Item</th>
                  <th style={{ width: '80px' }}>Report</th>
                  <th style={{ width: '60px' }}>Edit</th>
                  <th style={{ width: '60px' }}>Del.</th>
                </tr>
              </thead>
            </table>
            <div className="VendorScheduleList-GridSection">
              {/* Empty grid space as seen in screenshot */}
            </div>
          </div>

          <div className="VendorScheduleList-Footer">
            <span>Total Record : 0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleStatusGenerate;
