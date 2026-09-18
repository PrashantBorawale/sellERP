import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import './DocCompanySetting.css';

const DocCompanySetting = () => {
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
    <div className="CompanySettingChange">
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
                <div className="CompanyHistory mt-5">
                  <div className="CompanyHistory-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">
                          Company Setting Change History
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <Link
                          type="button"
                          className="btn btn-primary me-2"
                         
                        >
                          Export To Excel
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="CompanyHistory mb-3 p-4">
                    <div className="row text-start">
                      <div className="col-md-2">
                        <label>From Date:</label>
                        <input type="date" className="form-control" placeholder="Module Name" />
                      </div>
                      <div className="col-md-2">
                        <label>To Date:</label>
                        <input type="date" className="form-control" placeholder="Module Name" />
                      </div>
                      <div className="col-md-2">
                        <label>Setting Name</label>
                        <textarea style={{marginTop:"-1px"}} type="text" className="form-control" placeholder="Setting Name" ></textarea>
                      </div>
                     
                      <div className="col-md-1" style={{marginTop:"27px"}}>
                      <button type="button" className="btn btn-primary">Search</button>
                      
                      </div>

                    </div>
                  </div>

                  <div className="table-section">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>No Data Found !!</th>
                          
                          </tr>
                        </thead>
                        <tbody>
                         
                        </tbody>
                      </table>
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

export default DocCompanySetting
