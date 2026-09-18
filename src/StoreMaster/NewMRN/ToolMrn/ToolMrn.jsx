import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./ToolMrn.css";
import { FaTrash } from "react-icons/fa";

const ToolMrn = () => {
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
    <div className="NewStoreToolMRn">
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
                <div className="ToolMRn-header mb-4 text-start mt-5">
                    <div className="row align-items-center">
                    <div className="col-md-2">
                      <h5 className="header-title text-start">New MRN</h5>
                    </div>
                    <div className="col-md-9 mt-4">
                      <div className="row mb-3">
                        {/* Label: Series and Series Select Option */}
                        <div className="col-md-1">
                          <label htmlFor="seriesSelect" className="form-label">
                            Series:
                          </label>
                        </div>
                        <div className="col-md-2">
                          <select id="seriesSelect" className="form-select">
                            <option selected>Select</option>
                            <option value="MRN">MRN</option>
                            
                          </select>
                        </div>

                        <div className="col-md-1">
                          <label htmlFor="seriesSelect" className="form-label">
                            MRN No:
                          </label>
                        </div>
                        {/* Input Field */}
                        <div className="col-md-2">
                          <input
                            type="text"
                            id="inputField"
                            className="form-control"
                            placeholder="Enter value"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ToolMRn-main">
                  <div className="container-fluid text-start">
                    <div className="row mt-4">
                      <div className="Col-md-12">
                        <div className="container-fluid">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>
                                  <label className="form-label">Sr.</label>
                                </th>
                                <th>
                                  <label className="form-label">Item No</label>
                                </th>
                                <th>
                                  {" "}
                                  <label className="form-label">
                                    Description
                                  </label>
                                </th>
                                <th>
                                  <label className="form-label">Unit</label>
                                </th>
                                <th>
                                  {" "}
                                  <label className="form-label">Qty</label>
                                </th>
                                <th>
                                  {" "}
                                  <label className="form-label">Type</label>
                                </th>

                                <th>
                                  {" "}
                                  <label className="form-label">Remark</label>
                                </th>

                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-2"
                                  />
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>
                                
                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    rows="1"
                                  ></textarea>
                                </td>
                                <td>
                                  <button className="btn">
                                    <FaTrash />
                                  </button>
                                </td>
                              </tr>
                              {/* Add more rows as needed */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ToolMRn-Footer">
                    <div className="container-fluid">
                      <div className="row justify-content-end align-items-center mb-3">
                        <div className="col-md-1 text-end">
                          <label className="form-label">Remarks:</label>
                        </div>
                        <div className="col-md-3">
                          <textarea
                            cols="3"
                            className="form-control"
                          ></textarea>
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

export default ToolMrn;
