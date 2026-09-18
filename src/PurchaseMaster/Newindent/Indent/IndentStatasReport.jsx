import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import '../Indent/ListIndent.css';


const IndentStutasReport = () => {
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
    <div className="ListIndent">
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
                <div className="ListIndent-header  mb-4 text-start">
                    <div className="row align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title">
                        Indent Status Report
                      </h5>
                    </div>

                    <div className="col-md-9 text-end">
                          {/* <Link className="vndrbtn" to={"/IndentStutasReport"}>
                            Indent Stutas Report
                          </Link> */}
                          <Link className="vndrbtn">Export Excel</Link>
                     </div>
                  </div>
                </div>
                <div className="ListIndent-main1 mt-3">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="row g-3 text-start">
                          {/* From Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">From Date</label>
                            <input type="date" className="form-control mt-1" />
                          </div>

                          {/* To Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">To Date</label>
                            <input type="date" className="form-control mt-1" />
                          </div>

                          {/* Type */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Item</label>
                            <input type="date" className="form-control mt-1" />
                          </div>

                          {/* Status */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">MRN No</label>
                            <input type="date" className="form-control mt-1" />
                          </div>

                          {/* Search Button */}
                          <div className="col-md-2 col-sm-6 mt-4 align-self-end">
                            <button type="submit" className="vndrbtn">
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreListIndent">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Ind No</th>
                              <th>Item Code</th>
                              <th>Item Desc</th>
                              <th>Ind Qty</th>
                              <th>Ind Date</th>
                              <th>Auth Qty</th>
                              <th>Auth Date</th>
                              <th>Auth Days</th>
                              <th>PO No</th>
                              <th>PO/Ray Date</th>
                              <th>PO/Ray Day</th>
                              <th>GRN No</th>
                              <th>GRN Date</th>
                              <th>GRN Days</th>
                              <th>Total Days</th>
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

export default IndentStutasReport;