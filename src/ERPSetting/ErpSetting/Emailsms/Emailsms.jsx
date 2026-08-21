import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";

const Emailsms = () => {
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
    <div className="Userplant">
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
                      <h5 className="header-title">User Plant</h5>
                    </div>
                  </div>
                </div>

                <div className="plant-table mt-3">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th>Sr.</th>
                          <th>Module Name</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example row, replace with dynamic data */}
                        <tr>
                          <td>1</td>
                          <td>Plant 1</td>
                          <td>
                            <select className="form-select">
                              <option>User_Plant</option>
                              <option>All</option>
                            </select>
                          </td>
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
  )
}

export default Emailsms
