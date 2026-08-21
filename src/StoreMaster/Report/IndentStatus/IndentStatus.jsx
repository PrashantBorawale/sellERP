
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./IndentStatus.css";

const IndentStatus = () => {
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
    <div className="IndentStatus">
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
                <div className="IndentStatus-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">
                        Indent Status
                      </h5>
                    </div>

                    <div className="col-md-9 text-end">
                      {/* <div className="row justify-content-end">
                        <div className="col-md-3 d-flex align-items-end"> */}
                           <Link type="button" className="vndrbtn">
                              Export To Excel
                           </Link>
                        {/* </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                
                <div className="IndentStatus-main mt-3">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="row g-3 text-start">
                          {/* From Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">From Date</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* To Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">To Date</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* Plant */}
                            <div className="col-md-2 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                            <div className="col-md-2 col-sm-6">
                            <label className="form-label">Item</label>
                            <input type="text" className="form-control" />
                          </div>

                            <div className="col-md-2 col-sm-6">
                            <label className="form-label">Indent No</label>
                            <input type="text" className="form-control" />
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Type</label>
                            <select className="form-select">
                              <option value="Produlink">Critical</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Status</label>
                            <select className="form-select">
                              <option value="Produlink">All</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Main Group</label>
                            <select className="form-select">
                              <option value="Produlink">All</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Item Group</label>
                            <select className="form-select">
                              <option value="Produlink">All</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Users Name</label>
                            <select className="form-select">
                              <option value="Produlink">All</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          {/* Search Button */}
                          <div className="col-md-2 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="vndrbtn w-100">
                              Search
                            </button>
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreIndentStatus">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Year</th>
                              <th>Indent No</th>
                              <th> Indent Date</th>
                              <th> Type </th>
                              <th>SO  No </th>
                              <th> Item No </th>
                              <th>Item Desc</th>
                              <th> Indenter</th>
                              <th>Ind. Qty</th>
                              <th>Sch. Date</th>
                              <th>Auth Details</th>
                              <th>Auth Days</th>
                              <th>PO Details</th>
                              <th>PO Rev Days</th>
                              <th>GRN Details</th>
                              <th>GRN Days</th> 
                              <th>PO Qty</th> 
                              <th>PO Bal.Qty</th> 
                              <th>Status</th> 
                              <th>All</th> 
                            </tr>
                          </thead>

                          <tbody>

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

export default IndentStatus;
