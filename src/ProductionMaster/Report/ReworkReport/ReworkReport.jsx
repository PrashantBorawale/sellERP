import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './RewokReport.css';
const ReworkReport = () => { const [sideNavOpen, setSideNavOpen] = useState(false);

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
      <div className="ReworkReportMaster">
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
                <div className="ReworkReport">
                  <div className="ReworkReport-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title mb-0">Process Defect - Rewok Report</h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="vndrbtn me-2" to="/AddQuater">
                          Process Defect Rework
                        </button>
                        <button type="button" className="vndrbtn me-2" to="#/">
                          Print Format
                        </button>
                        <button type="button" className="vndrbtn" to="#/">
                          Print Format 2
                        </button>
                      </div>
                    </div>
                  </div>
  
                  <div className="ReworkReport-Main">
                    <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <div className="row g-3 text-start align-items-end">
                          
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
    
                          <div className="col-md-2">
                            <button type="button" className="vndrbtn w-100" >
                                Search
                            </button>   
                          </div>
                       </div>
                      </div>
                    </div>
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

export default ReworkReport