import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./OperatorReport.css";

const OperatorReport = () => {
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
    <div className="OperatorReportMaster">
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
                <div className="OperatorReport mt-5">
                  <div className="OperatorReport-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">
                          Operator Perfomance Report
                        </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn" to="#/">
                          Export Report
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="OperatorReport-Main mt-5">
                    <div className="container-fluid">
                      <div className="row g-3 text-start">
                        {/* From Date */}
                        <div className="col-md-1">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        {/* To Date */}
                        <div className="col-md-1">
                          <label>To :</label>
                          <input type="date" className="form-control" />
                        </div>

                        {/* Operator Supervisor */}
                        <div className="col-md-2">
                          <label>Operator Supervisor :</label>
                          <input type="text" className="form-control" />
                        </div>

                        {/*   Machine */}
                        <div className="col-md-1">
                          <label> Machine :</label>
                          <select
                            className="form-select"
                            style={{ marginTop: "-2px" }}
                          >
                            <option>Select All</option>
                            <option>Select All</option>
                            <option>Select All</option>
                          </select>
                        </div>

                        {/* Item */}
                        <div className="col-md-2">
                          <label>Item :</label>
                          <input type="text" className="form-control" />
                        </div>

                        <div className="col-sm-2">
                          <button
                            type="button"
                            className="btn"
                            style={{ marginTop: "34px" }}
                          >
                            Search
                          </button>
                        </div>

                        {/* <div className="col-md-1">
                          <label></label>
                          <select
                            className="form-select"
                            style={{ marginTop: "-2px" }}
                          >
                            <option>Select All</option>
                            <option>Select All</option>
                            <option>Select All</option>
                          </select>
                        </div> */}

                        {/* <div className="col-sm-2">
                          <button
                            type="button"
                            className="btn"
                            style={{ marginTop: "34px" }}
                          >
                            Search
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive mt-5">
                    <table className="table table-striped table-bordered table-hover">
                      <thead>
                        <tr className="clr">
                          <th>Sr</th>
                          <th>Prod No </th>
                          <th>Prod Date</th>
                          <th>Op Code</th>
                          <th>Operator</th>
                          <th>Machine</th>
                          <th>Item Desc</th>
                          <th>Heat No</th>
                          <th>Op No</th>
                          <th>Part Code</th>
                          <th>Operation</th>
                          <th>Start Time</th>
                          <th>End Time</th>
                          <th>Actual Qty</th>
                          <th>Target Qty</th>
                          <th>Productivity Qty</th>
                          <th>Prod Time</th>
                          <th>Actual Time</th>
                          <th>Productivity Time</th>
                        </tr>
                      </thead>

                      <tbody>
                        {/* Example row, you can map rows here */}
                        <tr>
                          <td>1</td>
                          <td>242525201</td>
                          <td>20/09/2024</td>
                          <td>221</td>
                          <td>New</td>
                          <td>Visual</td>
                          <td>520QJ00312WEEL CYL5LOTTED PVSTONREAR</td>
                          <td>F240046</td>
                          <td>75</td>
                          <td>CHFG1021</td>
                          <td>CHECKING</td>
                          <td>07:00</td>
                          <td>15:30</td>
                          <td>5500</td>
                          <td>9600</td>
                          <td>57.29</td>
                          <td>08:00</td>
                          <td>04:35</td>
                          <td>57.25</td>
                        </tr>
                      </tbody>
                      <tbody>
                        {/* Example row, you can map rows here */}
                        <tr>
                          <td>2</td>
                          <td>242525202</td>
                          <td>20/09/2024</td>
                          <td>221</td>
                          <td>New</td>
                          <td>Visual</td>
                          <td>520DU00102 FIX-NUT</td>
                          <td>A533333</td>
                          <td>45</td>
                          <td>CHFG1051</td>
                          <td>CHECKING</td>
                          <td>07:00</td>
                          <td>15:30</td>
                          <td>2800</td>
                          <td>9600</td>
                          <td>29.17</td>
                          <td>08:00</td>
                          <td>02:20</td>
                          <td>29.13</td>
                        </tr>
                      </tbody>
                      <tbody>
                        {/* Example row, you can map rows here */}
                        <tr>
                          <td>3</td>
                          <td>242525147</td>
                          <td>20/09/2024</td>
                          <td>221</td>
                          <td>New</td>
                          <td>Visual</td>
                          <td>520QJ00312WEEL CYL5LOTTED PVSTONREAR</td>
                          <td>F240046</td>
                          <td>75</td>
                          <td>CHFG1021</td>
                          <td>CHECKING</td>
                          <td>07:00</td>
                          <td>15:30</td>
                          <td>6149</td>
                          <td>9600</td>
                          <td>64.05</td>
                          <td>08:00</td>
                          <td>05:07</td>
                          <td>64.00</td>
                        </tr>
                      </tbody>
                    </table>
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

export default OperatorReport;
