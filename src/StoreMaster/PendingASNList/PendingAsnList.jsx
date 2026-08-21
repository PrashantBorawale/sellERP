import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./PendingAsnList.css";
const PendingAsnList = () => {
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
    <div className="NewStoreArnList">
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
                <div className="ArnList-header mb-4 text-start mt-5">
                    <div className="row align-items-center">
                    <div className="col-md-2">
                      <h5 className="header-title text-start">ASN List</h5>
                    </div>

                    <div className="col-md-10 text-end">
                      
                          <Link className="btn" to="/PDL-List">
                            PDI List
                          </Link>

                          <Link className="btn" to="/Vendor-Bill-List">
                            Bill List
                          </Link>

                          <Link className="btn">Export To Excel</Link>

                          <Link className="btn">Short Qty Report</Link>

                          <Link className="btn" to="/Vendor-Asn-List">
                            ASN Modify Logs
                          </Link>

                          <Link className="btn" to="/ASN-Report">
                            ASN Report
                          </Link>
                      
                    </div>
                  </div>
                </div>
                <div className="ArnList-main mt-5">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="row g-3 text-start">
                          {/* Plant */}
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                              {/* Add more options here */}
                            </select>
                          </div>

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

                          {/* Supplier Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Vendor Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                            />
                          </div>

                          {/* Item Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Challan Number</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Item Name"
                            />
                          </div>

                          {/* Gate Entry No. */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">In-Bound No.</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Gate Entry No."
                            />
                          </div>

                          {/* Search Button */}
                          <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="btn" style={{marginTop:"-39px"}}>
                              Search
                            </button>
                          </div>
                          <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="btn" style={{marginTop:"-39px"}}>
                              View All
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreArnList">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>No Data Found!!</th>
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

export default PendingAsnList;
