import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import * as XLSX from "xlsx";
import "./ProReportt.css";

const ProReport = () => {
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
    <div className="ProReportMaster">
    
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
              <div className="ProReport">
                <div className="ProReport-header mb-4 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title mb-0">Material Defect - Rejection Report</h5>
                    </div>
                    <div className="col-md-8 d-flex flex-wrap gap-2 justify-content-md-end mt-3 mt-md-0">
                      <button type="button" className="vndrbtn" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}>
                        Export To Excel
                      </button>
                      <button type="button" className="vndrbtn" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>
                        Print Format
                      </button>
                      <button type="button" className="vndrbtn" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>
                        Print Format 2
                      </button>
                      <button type="button" className="vndrbtn" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>
                        Machine Wise Defect Report
                      </button>
                      <button type="button" className="vndrbtn" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>
                        Rejection Report - OP Wise
                      </button>
                      <button type="button" className="vndrbtn" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>
                        Rejection Report - Quary
                      </button>
                    </div>
                  </div>
                </div>

                <div className="ProReport-Main">
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 text-start align-items-end">
                        {/* Plant */}
                        <div className="col-md-2">
                        <label className="form-label">Plant:</label>
                        <select className="form-select">
                          <option>Select All</option>
                        </select>
                      </div>

                      {/* From Date */}
                      <div className="col-md-2">
                        <label className="form-label">From:</label>
                        <input type="date" className="form-control" />
                      </div>

                      {/* To Date */}
                      <div className="col-md-2">
                        <label className="form-label">To Date:</label>
                        <input type="date" className="form-control" />
                      </div>

                      {/* Months Wise */}
                      <div className="col-md-2">
                        <label className="form-label">Months Wise :</label>
                        <select className="form-select">
                          <option>Select All</option>
                          <option>Select All</option>
                          <option>Select All</option>
                          <option>Select All</option>
                        </select>
                      </div>

                      {/* Operator Wise */}
                      <div className="col-md-2">
                        <label className="form-label">Operator Wise:</label>
                        <input type="text" className="form-control"/>
                      </div>

                      {/* Reason Wise */}
                      <div className="col-md-2">
                        <label className="form-label">Reason Wise:</label>
                        <select className="form-select">
                          <option>Select All</option>
                          <option>Select All</option>
                          <option>Select All</option>
                        </select>
                      </div>

                      {/* Item Wise */}
                      <div className="col-md-2">
                        <label className="form-label">Item Wise:</label>
                        <input type="text" className="form-control" />
                      </div>

                      {/* Machine Wise */}
                      <div className="col-md-2">
                        <label className="form-label">Machine Wise :</label>
                        <select className="form-select">
                          <option>Select All</option>
                          <option>Select All</option>
                          <option>Select All</option>
                        </select>
                      </div>

                      <div className="col-md-2">
                      <button type="button" className="vndrbtn w-100" style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          Search
                      </button>   
                      </div>

                   
                     
                      </div>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                <table className="table table-striped table-bordered ">
      <thead>
        <tr className="clr"> 
          <th>Sr</th>
          <th>Date </th>
          <th>Part Name</th>
          <th>M/C No</th>
          <th>CP No</th>
          <th>Shift</th>
          <th>Operator Name</th>
          <th>Supervisor Name</th>
          <th>Pord Qty </th>
          <th>Rej. Qty</th>
          <th>Rej. %</th>
          <th>Rej. Reason</th>
          <th>Slip No</th>
          <th>Type</th>
          <th>Remark</th>
        </tr>
      </thead>

      <tbody>
          {/* Example row, you can map rows here */}
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

export default ProReport
