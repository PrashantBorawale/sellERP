import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./SupplierWiseList.css";
const SupplierWiseList = () => {
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
    <div className="SupplierWiseList">
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
                <div className="SupplierWiseList-header text-start mt-5">
                    <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title text-start">
                        SupplierWise Item Purchase List
                      </h5>
                    </div>
                    <div className="col-md-8">
                      <div className="row text-end">
                        <div className="col-md-2 d-flex align-items-end justify-content-end">
                          <label htmlFor="reportFormat" className="form-label">
                            Report Format
                          </label>
                        </div>
                        <div className="col-md-2 d-flex align-items-end justify-content-end">
                          <select id="reportFormat" className="form-select">
                            <option>PDF</option>
                            <option>Type 2</option>
                            <option>Type 3</option>
                          </select>
                        </div>
                        <div className="col-md-2 d-flex align-items-end justify-content-end">
                          <label htmlFor="reportName" className="form-label">
                            Report Name
                          </label>
                        </div>
                        <div className="col-md-2 d-flex align-items-end justify-content-end">
                          <select id="reportName" className="form-select">
                            <option>Select</option>
                            <option>Type 2</option>
                            <option>Type 3</option>
                          </select>
                        </div>
                        <div className="col-md-2 d-flex align-items-end justify-content-end">
                          <button className="pobtn">Execute</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="SupplierWiseListstatus mt-5">
                  <div className="container-fluid mt-4">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Plant</th>
                            <th>PO Series</th>

                            <th>
                              <input type="checkbox" id="supplier" />
                              <label htmlFor="supplier" className="ml-2">
                                Supplier Name
                              </label>
                            </th>
                            <th>Item Main Group</th>
                            <th>Item Group</th>
                            <th>
                              <input type="checkbox" id="item" />
                              <label htmlFor="item" className="ml-2">
                                Item Name
                              </label>
                            </th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <input type="date" className="form-control" />
                            </td>
                            <td>
                              <input type="date" className="form-control" />
                            </td>
                            <td>
                              <select className="form-control">
                                <option>Plant 1</option>
                                <option>Plant 2</option>
                                <option>Plant 3</option>
                              </select>
                            </td>
                            <td>
                              <select className="form-control">
                                <option>All</option>
                                <option>Type 2</option>
                                <option>Type 3</option>
                              </select>
                            </td>
                            <td>
                              <input type="text" className="form-control" />
                            </td>
                            <td>
                              <select className="form-control">
                                <option>All</option>
                                <option>Status 2</option>
                                <option>Status 3</option>
                              </select>
                            </td>
                            <td>
                              <select className="form-control">
                                <option>All</option>
                                <option>Status 2</option>
                                <option>Status 3</option>
                              </select>
                            </td>

                            <td>
                              <input type="text" className="form-control" />
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

                              <th>PO No</th>
                              <th>Fy</th>
                              <th>PO Date</th>
                              <th>Category</th>
                              <th>Code</th>
                              <th>Supplier Name</th>
                              <th>Item No</th>
                              <th>Ver</th>

                              <th>Item Disc (%)</th>
                              <th>Qty</th>
                              <th>Rate</th>

                              <th>Disc (%)</th>
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
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierWiseList;
