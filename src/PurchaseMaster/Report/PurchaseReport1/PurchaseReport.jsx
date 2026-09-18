import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./PurchaseReport.css";
const PurchaseReport = () => {
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
    <div className="NewPurchaseReport">
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
                <div className="PurchaseReport-header text-start mt-5">
                    <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title text-start">
                        Purchase Report (Cost Center Wise)
                      </h5>
                    </div>
                    <div className="col-md-8 text-end">
                      
                          <button className="btn">Export To Excel</button>
                       
                    </div>
                  </div>
                </div>
                <div className="PurchaseReport-main111 mt-5">
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="pills-Item-Details-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-Item-Details"
                        type="button"
                        role="tab"
                        aria-controls="pills-Item-Details"
                        aria-selected="true"
                      >
                        Group Wise Summary
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-GST-Details-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-GST-Details"
                        type="button"
                        role="tab"
                        aria-controls="pills-GST-Details"
                        aria-selected="false"
                      >
                        Cose Center Wise Report
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-Item-Details"
                      role="tabpanel"
                      aria-labelledby="pills-Item-Details-tab"
                      tabindex="0"
                    >
                      <div className="PurchaseReportstatus">
                        <div className="container-fluid mt-4">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>From Date</th>
                                  <th>To Date</th>

                                  <th>Cost Center Group</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <input
                                      type="date"
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="date"
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    <select className="form-control">
                                      <option>Plant 1</option>
                                      <option>Plant 2</option>
                                      <option>Plant 3</option>
                                    </select>
                                  </td>

                                  <td>
                                    <button className="pobtn">Search</button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="Purchaseordertable">
                          <div className="container-fluid mt-4">
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Sr</th>

                                    <th>Cose Center Code</th>
                                    <th>Cost Center Description</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>{/* Data rows will go here */}</tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-GST-Details"
                      role="tabpanel"
                      aria-labelledby="pills-GST-Details-tab"
                      tabindex="0"
                    >
                      <div className="PurchaseReportstatus1">
                        <div className="container-fluid mt-4">
                          <div className="row align-items-start">
                            <div className="col-md-3 d-flex align-items-start">
                              <input
                                type="checkbox"
                                id="costCenterCodeCheck"
                                className="me-2"
                              />
                              <label
                                htmlFor="costCenterCodeCheck"
                                className="form-label mb-0"
                              >
                                Cost Center Code
                              </label>
                            </div>
                            <div className="col-md-3 d-flex align-items-start">
                              <input
                                type="text"
                                id="costCenterCodeInput"
                                className="form-control"
                                placeholder="Enter Cost Center Code"
                              />
                            </div>
                            <div className="col-md-4 d-flex justify-content-start align-items-start">
                              <button className="pobtn">Search</button>
                            </div>
                          </div>
                        </div>

                        <div className="Purchaseordertable">
                          <div className="container-fluid mt-4">
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Sr</th>

                                    <th>Cose Center Group</th>
                                    <th>Cose Center Group Code</th>
                                    <th>Cost Center Description</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>{/* Data rows will go here */}</tr>
                                </tbody>
                              </table>
                            </div>
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
  );
};

export default PurchaseReport;
