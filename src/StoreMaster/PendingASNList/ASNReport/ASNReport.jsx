import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./ASNReport.css";
const ASNReport = () => {
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
    <div className="NewStoreASN-Report">
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
                <div className="ASN-Report-header mb-4 text-start mt-5">
                    <div className="row align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">
                        Vendor ASN List
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="ASN-Report-main mt-5">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="row g-3 text-start">
                          {/* From Date */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">From Date</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* To Date */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">To Date</label>
                            <input type="date" className="form-control" />
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Vendor Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                            />
                          </div>
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Challan Number</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                            />
                          </div>
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">In-Bound No</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                            />
                          </div>

                          {/* Search Button */}
                          <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="btn" style={{marginTop:"39px"}}>
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreASN-Report">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr.</th>
                              <th>ASN NO</th>

                              <th>Challan No</th>
                              <th>Challan Date</th>
                              <th>Supp Code</th>
                              <th>Supp Name</th>
                              <th>ASN Qty</th>
                              <th>GRN Qty</th>
                              <th>Inward Date | No</th>
                            </tr>
                          </thead>
                          <tbody>{/* Table rows will go here */}</tbody>
                        </table>
                      </div>
                    </div>

                    <div className="container-fluid mt-4 text-start">
                      <div className="row">
                        <div className="col-md-3">
                          <p>Total Records:0</p>
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

export default ASNReport;
