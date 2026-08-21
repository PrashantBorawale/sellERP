import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import * as XLSX from "xlsx";
import "./QualityPlan.css";
// import { FaEdit, FaTrash } from "react-icons/fa";

const QualityPlan = () => {
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

  const handleExportExcel = () => {
    // Currently no dynamic data array exists in this component.
    // When API fetching is implemented, map that data here instead.
    alert("No data to export");
  };

  return (
    <div className="QualityPlanMaster">
    <div className="container-fluid p-0">
      <div className="row m-0">
        <div className="col-md-12 p-0">
          <div className="Main-NavBar">
            <NavBar toggleSideNav={toggleSideNav} />
            <SideNav
              sideNavOpen={sideNavOpen}
              toggleSideNav={toggleSideNav}
            />
            <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
              <div className="QualityPlanList">
                <div className="QualityPlanList-header mb-4 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title mb-0"> Quality Control Plan List </h5>
                    </div>
                    <div className="col-md-8 d-flex flex-wrap gap-2 justify-content-md-end mt-3 mt-md-0">
                      <button type="button" className="vndrbtn" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>
                        New Plan
                      </button>
                      <button type="button" className="vndrbtn" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}>
                        Export Report
                      </button>
                     </div>
                  </div>
                </div>

                <div className="ProQualityPlan-Main">
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 text-start align-items-end">
                        {/* Plant */}
                        <div className="col-md-2">
                        <label className="form-label">Main Group :</label>
                        <select className="form-select">
                          <option>Select</option>
                          <option>FG</option>
                          <option>RM</option>
                          <option>Tools</option>
                          <option>Instrument</option>
                          <option>Machine</option>
                          <option>Consumable</option>
                          <option>Safety Equ</option>
                          <option>Service</option>
                          <option>Asset</option>
                          <option>F4</option>
                          <option>Scrap</option>
                          <option>SF</option>
                          <option>BO</option>
                          <option>DI</option>
                        </select>
                      </div>

                      {/* Item Name */}
                      <div className="col-md-2">
                        <label className="form-label">Item Name:</label>
                        <input type="text" className="form-control"/>
                      </div>

                      <div className="col-md-2">
                      <button type="button" className="vndrbtn w-100" style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          Search
                      </button> 
                      </div>
                      <div className="col-md-2">
                      <button type="button" className="vndrbtn w-100" style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          Clear
                      </button> 
                      </div>
                      <div className="col-md-2">
                      <button type="button" className="vndrbtn w-100" style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          View All
                      </button> 
                      </div>
                
                      </div>
                    </div>
                  </div>
                </div>

             <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Item No</th>
                          <th scope="col">Item Code</th>
                          <th scope="col">Item Description</th>
                          <th scope="col">Operation</th>
                          <th scope="col">User</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Del</th>
                          <th scope="col">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example data row */}
                        <tr>
                          <td>1</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
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
  )
}

export default QualityPlan