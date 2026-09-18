import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./ContractorReport.css";
import { Link } from "react-router-dom";

const ContractorReport = () => {
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
    <div className="ContractorReportMaster">
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
                <div className="ContractorReport mt-5">
                  <div className="ContractorReport-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4 col-12 mb-2 mb-md-0">
                        <h5 className="header-title">Contractor Payment List</h5>
                      </div>
                      <div className="col-md-2">
                      <select className="form-select w-auto">
                            <option>Pay</option>
                          </select>
                      </div>
                         
                     
                      <div className="col-md-6 col-12 text-end">
                       
                        
                          <button type="button" className="btn">
                            Efficiency Report
                          </button>
                          <button type="button" className="btn">
                            Contractor Pay Report
                          </button>
                          <Link type="button" className="btn" to="/ContractirList">
                            New Contractor Payment
                          </Link>
                        </div>
                      </div>
                    
                  </div>

                  <div className="ContractorReport-Main">
                    <div className="container-fluid">
                      <div className="row g-3 text-start">
                        <div className="col-6 col-md-2">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-6 col-md-2">
                          <label>To Date:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-6 col-md-2">
                          <label>Type:</label>
                          <select className="form-select">
                            <option>Select All</option>
                            <option value="Company">Company</option>
                            <option value="Sainath Jadhav">
                              Sainath Jadhav
                            </option>
                            <option value="Momin Patel">Momin Patel</option>
                            <option value="Quality Control">
                              Quality Control
                            </option>
                          </select>
                        </div>

                        <div className="col-6 col-md-1 mt-5">
                          <button type="button" className="btn btn-primary">
                            Search
                          </button>
                        </div>
                        <div className="col-6 col-md-2 mt-5">
                          <button
                            type="button"
                            className="btn btn-primary"
                          >
                            Search Option
                          </button>
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
  );
};

export default ContractorReport;
