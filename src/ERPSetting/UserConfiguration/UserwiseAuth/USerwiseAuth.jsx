import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './USerwiseAuth.css';

const USerwiseAuth = () => {
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
    <div className="USerwiseAuth">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="userAuth mt-5">
                <div className="prod-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                    <h5 className="header-title">User Wise Auth Setting</h5>
                  </div>
                  </div>
                  </div>

                  <div className="Auth-main text-start">
                    <div className="row mb-3 align-items-center">
                      
                      <div className="col-md-2 col-sm-3">
                      <input type="checkbox" />
                      <span> User Name :</span>
                        
                      </div>
                    
                      <div className="col-md-2 col-sm-9">
                       
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-1 col-sm-3">
                        <label>Plant:</label>
                      </div>
                      <div className="col-md-2 col-sm-9">
                        <select className="form-select">
                          <option>Plant 1</option>
                          <option>Plant 2</option>
                        </select>
                      </div>
                      <div className="col-md-2 text-end">
                        <button className="btn">Search</button>
                      </div>
                    </div>
                  </div>

                  <div className="Auth-table mt-3">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>Sr.</th>
                            <th>Plant</th>
                            <th>Department</th>
                            <th>Full Name</th>
                            <th>User Name</th>
                            <th>Item New / Edit Main Group</th>
                            <th>Item Auth Main Group</th>
                            <th>Cust/Supp Auth Cust/Supp Type</th>
                            <th>Quotation with limit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Example row, replace with dynamic data */}
                          <tr>
                            <td>1</td>
                            <td>Plant 1</td>
                            <td>Production</td>
                            <td>John Doe</td>
                            <td>john.doe</td>
                            <td>Yes</td>
                            <td>No</td>
                            <td>Yes</td>
                            <td>No</td>
                          </tr>
                          {/* Add more rows dynamically */}
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
  );
};

export default USerwiseAuth;
