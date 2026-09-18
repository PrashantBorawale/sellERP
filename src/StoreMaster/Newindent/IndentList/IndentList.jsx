import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./IndentList.css";
const IndentList = () => {
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
    <div className="NewStoreIndentList">
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
                <div className="IndentList-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">Indent List</h5>
                    </div>

                    <div className="col-md-9 text-end">
                      <div className="row justify-content-end">
                        <div className="col-md-4 d-flex align-items-end">
                          <Link className="pobtn">Indent Status Report</Link>

                          <Link className="pobtn">Export Excel</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="IndentList-main">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="text-start">
                          {/* Row 1: Dropdown Filters (Responsive, allowed to wrap) */}
                          <div className="row g-2 mb-3">
                            <div className="col-md-2 col-sm-4">
                              <label className="form-label fw-bold text-secondary" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>Plant</label>
                              <select className="form-select form-select-sm">
                                <option value="VISHWA S.I.">VISHWA S.I.</option>
                              </select>
                            </div>
                            <div className="col-md-2 col-sm-4">
                              <label className="form-label fw-bold text-secondary" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>Type</label>
                              <select className="form-select form-select-sm">
                                <option value="">Select Type</option>
                                <option value="PurchaseGRN">Purchase GRN</option>
                                <option value="ScheduleGRN">Schedule GRN</option>
                                <option value="ImportGRN">Import GRN</option>
                                <option value="57F4GRN">57F4 GRN</option>
                                <option value="jobworkGRN">jobwork GRN</option>
                                <option value="DC GRN">DC GRN</option>
                                <option value="InterStoreInvoice">Inter Store Invoice</option>
                                <option value="InterStoreChallan">Inter Store Challan</option>
                                <option value="Sales Return">Sales Return</option>
                                <option value="DirectGRN">Direct GRN</option>
                                <option value="General/Document/Courier">General/Document/Courier</option>
                              </select>
                            </div>
                            <div className="col-md-2 col-sm-4">
                              <label className="form-label fw-bold text-secondary" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>Status</label>
                              <select className="form-select form-select-sm">
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                              </select>
                            </div>
                            <div className="col-md-2 col-sm-4">
                              <label className="form-label fw-bold text-secondary" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>Main Group</label>
                              <select className="form-select form-select-sm">
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                              </select>
                            </div>
                            <div className="col-md-2 col-sm-4">
                              <label className="form-label fw-bold text-secondary" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>Item Group</label>
                              <select className="form-select form-select-sm">
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                              </select>
                            </div>
                            <div className="col-md-2 col-sm-4">
                              <label className="form-label fw-bold text-secondary" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>User</label>
                              <select className="form-select form-select-sm">
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                              </select>
                            </div>
                            <div className="col-md-2 col-sm-4">
                              <label className="form-label fw-bold text-secondary" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>Department</label>
                              <select className="form-select form-select-sm">
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                              </select>
                            </div>
                            <div className="col-md-2 col-sm-4">
                              <label className="form-label fw-bold text-secondary" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>Direct/MRP</label>
                              <select className="form-select form-select-sm">
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                              </select>
                            </div>
                          </div>

                          {/* Row 2: Search Section (Forced to ONE line, never wraps even if sidebar opens) */}
                          <div className="d-flex align-items-end flex-nowrap gap-2 w-100" style={{ overflowX: "auto", paddingBottom: "4px" }}>
                            <div style={{ flex: "1 1 auto", minWidth: "120px" }}>
                              <label className="form-label fw-bold text-secondary" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>From Date</label>
                              <input type="date" className="form-control form-control-sm" />
                            </div>
                            <div style={{ flex: "1 1 auto", minWidth: "120px" }}>
                              <label className="form-label fw-bold text-secondary" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>To Date</label>
                              <input type="date" className="form-control form-control-sm" />
                            </div>
                            <div style={{ flex: "1 1 auto", minWidth: "140px" }}>
                              <label className="form-label fw-bold text-secondary" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>Item</label>
                              <input type="text" className="form-control form-control-sm" placeholder="Enter Item" />
                            </div>
                            <div style={{ flex: "1 1 auto", minWidth: "140px" }}>
                              <label className="form-label fw-bold text-secondary" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>Indent No</label>
                              <input type="text" className="form-control form-control-sm" placeholder="Enter Indent No" />
                            </div>
                            {/* Search and Clear Buttons locked together */}
                            <div className="d-flex flex-nowrap gap-2" style={{ flexShrink: 0 }}>
                              <button type="submit" className="vndrbtn px-4" style={{ height: "34px", margin: "0", whiteSpace: "nowrap" }}>
                                Search
                              </button>
                              <button type="button" className="vndrbtn px-4" style={{ height: "34px", margin: "0", whiteSpace: "nowrap" }}>
                                Clear
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreIndentList">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Year</th>
                              <th>Ind No | Date</th>
                              <th>Required Delivery</th>
                              <th>Item No | Desc</th>
                              <th>Ind. Qty</th>
                              <th>MRP Run Date</th>
                              <th>Autho. Details</th>
                              <th>Status</th>
                              <th>Supplier</th>
                              <th>User</th>
                              <th>Delete</th>
                              <th>Edit</th>
                              <th>View</th>
                              <th>Doc.</th>
                              <th>Email</th>
                            </tr>
                          </thead>
                          <tbody>{/* Table rows will go here */}</tbody>
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

export default IndentList;
