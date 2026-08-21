import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./AlertSetting.css";

const AlertSetting = () => {
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
    <div className="plant-Alertt">
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
                <div className="Alertt mt-5">
                  <div className="prod-header mb-4 text-start">
                    <div className="row ">
                      <div className="col-md-12">
                        <h5 className="header-title">Dept. Wise Alert Setup</h5>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="Alertt-main">
                        <div className="row">
                          <div className="col-md-2 mt-2">
                            <div className="select-department">
                              <label htmlFor="select-department">
                                Select Dept:
                              </label>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="select-department">
                              <select
                                id="select-department"
                                className="form-select"
                              >
                                <option>Select</option>
                                <option value="Admin">Admin</option>
                                <option value="Purchase">Purchase</option>
                                <option value="Store">Store</option>
                                <option value="Quality">Quality</option>
                                <option value="Planning">Planning</option>
                                <option value="Sales">Sales</option>
                                <option value="Account">Account</option>
                                <option value="CRM">CRM</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-2 mt-2">
                            <div className="form-check mt-">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="select-all"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="select-all"
                              >
                                All
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="table-responsive mt-3">
                        <table className="table table-bordered">
                          <thead className="table-dark">
                            <tr>
                              <th>Sr.</th>
                              <th>Alert Type</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Admin</td>
                              <td>
                                {" "}
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="select-all"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Purchase</td>
                              <td>
                                {" "}
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="select-all"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-md-6 mt-3">
                      <div className="row mt-6 text-start">
                        <div className="col-md-12">
                          <h5 className="header-title">
                            User - Dept Wise Alert (Allocated)
                          </h5>
                        </div>
                      </div>
                      <div className="table-responsive mt-3">
                        <table className="table table-bordered">
                          <thead className="table-dark">
                            <tr>
                              <th>Sr.</th>
                              <th>Dept Name</th>
                              <th>Alert Count</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Admin</td>
                              <td>72</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Purchase</td>
                              <td>0</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Store</td>
                              <td>6</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>Quality</td>
                              <td>7</td>
                            </tr>
                            <tr>
                              <td>5</td>
                              <td>Planning</td>
                              <td>5</td>
                            </tr>
                            {/* Add more rows dynamically */}
                          </tbody>
                        </table>
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

export default AlertSetting;
