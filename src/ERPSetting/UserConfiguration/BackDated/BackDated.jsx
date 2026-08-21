import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./BackDated.css";

const BackDated = () => {
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
    <div className="BackDatedEntry">
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
                <div className="backdated mt-5">
                  <div className="back-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">
                          Back Dated Entry Setting
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button type="button" className="btn export-btn">
                          Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="back-main text-start">
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-2">
                        <label>Select Module:</label>
                      </div>
                      <div className="col-md-2">
                        <select className="form-select">
                          <option value="">Select Module Name</option>
                          <option value="Purchase Order">Purchase Order</option>
                          <option value="Purchase GRN">Purchase GRN</option>
                          <option value="GRN QC">GRN QC</option>
                          <option value="Inward 57F4 Challan">
                            Inward 57F4 Challan
                          </option>
                          <option value="Outward 57F4 challan">
                            Outward 57F4 challan
                          </option>
                          <option value="Jobwork Inward Challan">
                            Jobwork Inward Challan
                          </option>
                          <option value="Jobwork QC">Jobwork QC</option>
                          <option value="Material Issue Challan">
                            Material Issue Challan
                          </option>
                        </select>
                      </div>
                      <div className="col-md-1">
                        <label>Days:</label>
                      </div>
                      <div className="col-md-1">
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-2 text-end">
                        <button className="btn  me-2">Set To All</button>
                        <button className="btn">Apply</button>
                      </div>
                    </div>
                  </div>
                  <div className="back-table text-start">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>User Name</th>
                            <th>Name</th>
                            <th>Days</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>user1</td>
                            <td>Dashboard View</td>
                            <td><input type="text" className="form-control" /></td>
                          </tr>
                          <tr>
                            <td>user2</td>
                            <td>Purchase Order</td>
                            <td><input type="text" className="form-control" /></td>
                          </tr>
                        </tbody>
                      </table>
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

export default BackDated;
