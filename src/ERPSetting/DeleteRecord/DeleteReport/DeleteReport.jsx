import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./DeleteReport.css";

const DeleteReport = () => {
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
    <div className="DeleteReport mt-5">
      <NavBar toggleSideNav={toggleSideNav} />
      <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
      <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
        <div className="Itemmaindelete">
          <div className="container-fluid">
            {/* Title and button */}

            <div className="DeleteRecord-header mb-4 text-start">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <h5 className="header-title">Delete History Report</h5>
                </div>
                <div className="col-md-8  text-end">
                  <button type="button" className="btn">
                    Print Report
                  </button>
                </div>
              </div>
            </div>

            {/* Filters section */}
            <div className="row mb-3 text-start">
              <div className="col-lg-2 col-md-6 col-sm-12 mb-2">
                <label htmlFor="fromDate">From Date</label>
                <input type="date" className="form-control" id="fromDate" />
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12 mb-2">
                <label htmlFor="toDate">To Date</label>
                <input type="date" className="form-control" id="toDate" />
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12 mb-2">
                <label htmlFor="type">Type</label>
                <select className="form-control" id="type" style={{marginTop:"-1px"}}>
                  <option value="ALL Trn.">ALL Trn.</option>
                  <option value="DELETE_REPROD">DELETE_REPROD</option>
                  <option value="DELETE_InvoiceItem">DELETE_InvoiceItem</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                <label htmlFor="search">
                  Search by Doc No/ Item/ Party/ Desc
                </label>
                <textarea className="form-control" id="search"></textarea>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12 mt-4">
                <button className="btn">Search </button>
                <button className="btn">View All</button>
              </div>
            </div>

            {/* Table */}
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table table-striped text-start">
                    <thead>
                      <tr>
                        <th>Sr.</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Item</th>
                        <th>Details</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Example row */}
                      <tr>
                        <td>1</td>
                        <td>09/09/2024</td>
                        <td>DELETE_REPROD</td>
                        <td>FG1117</td>
                        <td>Item details here</td>
                        <td>
                          <button className="btn">View</button>
                        </td>
                      </tr>
                      {/* Add more rows dynamically if necessary */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeleteReport;
