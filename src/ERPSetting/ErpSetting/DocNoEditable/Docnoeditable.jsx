import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./Docnoeditable.css";
import { Link } from "react-router-dom";

const Docnoeditable = () => {
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
    <div className="Docnoeditable">
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
                <div className="Docnoeditable mt-5">
                  <div className="Docnoeditable-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">Parameter Setting</h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <Link
                          type="button"
                          to="/DocCompanySetting"
                          className="btn"
                        >
                          Setting History
                        </Link>
                        <button type="button" className="btn">
                         
                         Print Company Info
                        </button>
                        <Link type="button" className="btn" to="/Companysetup">
                          Company Info
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="Docnoeditable-section mb-3 p-4">
                    <div className="row text-start">
                      <div className="col-md-2">
                        <label>Select Module</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Module Name"
                        />
                      </div>
                      <div className="col-md-2">
                        <label>Document No Editable</label>
                        <select className="form-control" style={{marginTop:"-1px"}} >
                          <option value="">Select Setting</option>
                          <option>Setting 1</option>
                          <option>Setting 2</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label>Setting Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Setting Name"
                        />
                      </div>

                      <div className="col-md-2 mt-4">
                        <button type="button" className="btn">
                          Search
                        </button>
                        <button type="button" className="btn">
                          View All
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="table-section">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Sr.</th>
                                <th>Setting Name</th>
                                <th>Value</th>
                                <th>Update</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>
                                  Allow to View & Print Tag from Material Return
                                </td>
                                <td>
                                  <select className="form-control">
                                    <option>Yes</option>
                                    <option>No</option>
                                  </select>
                                </td>
                                <td>
                                  <button className="btn btn-primary btn-sm">
                                    Update
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>QC Tag Print</td>
                                <td>
                                  <select className="form-control">
                                    <option>Yes</option>
                                    <option>No</option>
                                  </select>
                                </td>
                                <td>
                                  <button className="btn btn-primary btn-sm">
                                    Update
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>RM Opening Stock Tag Print</td>
                                <td>
                                  <select className="form-control">
                                    <option>Yes</option>
                                    <option>No</option>
                                  </select>
                                </td>
                                <td>
                                  <button className="btn btn-primary btn-sm">
                                    Update
                                  </button>
                                </td>
                              </tr>
                              {/* Add more rows as needed */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="table-section">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>No Found Data</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
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

export default Docnoeditable;
