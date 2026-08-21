import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './Plantwiseseries.css';
const Plantwiseseries = () => {
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
    <div className="plant-series-permission">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
               
                <div className="series-permission mt-5">
                  <div className="prod-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Plant Series Permission</h5>
                      </div>
                    </div>
                  </div>

                  <div className="permission-table mt-3">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead className="table-dark">
                          <tr>
                            <th>Module</th>
                            <th>Series</th>
                            <th>Plant</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="scrollable-list">
                                <ul>
                                  <li>FG Scrap / Rejection Note</li>
                                  <li>First Piece Inspection (FPI)</li>
                                  <li>Gate Inward (GE)</li>
                                  <li>Gate Outward (GEOUT)</li>
                                  <li>GST SALES</li>
                                  <li>GST SALES RETURN</li>
                                  <li>Purchase INDENT (INDENT)</li>
                                  <li>...</li>
                                  {/* Add more items dynamically */}
                                </ul>
                              </div>
                            </td>
                            <td>
                              {/* Add series selection here, could be dropdowns or inputs */}
                              <select className="form-select">
                                <option>Series 1</option>
                                <option>Series 2</option>
                                <option>Series 3</option>
                              </select>
                            </td>
                            <td>
                              {/* Add plant selection here */}
                              <select className="form-select">
                                <option>Plant 1</option>
                                <option>Plant 2</option>
                                <option>Plant 3</option>
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

export default Plantwiseseries
