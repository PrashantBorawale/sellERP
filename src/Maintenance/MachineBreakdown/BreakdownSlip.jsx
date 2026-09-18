import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./BreakdownSlip.css";
import { FaSync, FaSearch, FaPlus, FaList, FaCheckCircle, FaTrash, FaQuestionCircle } from "react-icons/fa";

const BreakdownSlip = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

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
    <div className="breakdown-slip">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header - Matching mb-4 from ToolManagement */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-8 d-flex align-items-center gap-4">
                        <h5 className="header-title mb-0">Maintenance : Breakdown Log</h5>
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 fw-bold">Plant :</label>
                          <select className="form-select form-select-sm" style={{ width: "120px" }}>
                            <option>SHARP</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2" onClick={() => navigate("/breakdown-list")}>
                          <FaList /> Breakdown List
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-4">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="row align-items-center mb-1">
                          <div className="col-md-4">
                            <label className="form-label mb-0">Series :</label>
                          </div>
                          <div className="col-md-8">
                            <select className="form-select">
                              <option>Select</option>
                            </select>
                          </div>
                        </div>
                        <div className="row align-items-center mb-1">
                          <div className="col-md-4">
                            <label className="form-label mb-0">BreakDown No :</label>
                          </div>
                          <div className="col-md-8">
                            <div className="d-flex gap-1">
                              <input type="text" className="form-control" />
                              <button className="btn btn-outline-secondary p-1">
                                <FaSync size={11} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="row align-items-center mb-1">
                          <div className="col-md-4">
                            <label className="form-label mb-0">Tool/Machine :</label>
                          </div>
                          <div className="col-md-8">
                            <div className="d-flex gap-1">
                              <input type="text" className="form-control" />
                              <button className="btn btn-outline-secondary d-flex align-items-center gap-1 p-1 px-2">
                                <FaSearch size={11} /> Search
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="row align-items-center mb-1">
                          <div className="col-md-4">
                            <label className="form-label mb-0">Priority :</label>
                          </div>
                          <div className="col-md-8">
                            <select className="form-select">
                              <option>High</option>
                            </select>
                          </div>
                        </div>
                        <div className="row align-items-center mb-1">
                          <div className="col-md-4">
                            <label className="form-label mb-0">Log By :</label>
                          </div>
                          <div className="col-md-8">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="row align-items-center mb-1">
                          <div className="col-md-4">
                            <label className="form-label mb-0">Line Breakdown:</label>
                          </div>
                          <div className="col-md-8">
                            <select className="form-select">
                              <option>Select</option>
                            </select>
                          </div>
                        </div>
                        <div className="row align-items-center mb-1">
                          <div className="col-md-4">
                            <label className="form-label mb-0">BreakDown Date :</label>
                          </div>
                          <div className="col-md-8 d-flex gap-1 align-items-center">
                            <input type="date" className="form-control" style={{ width: "130px" }} />
                            <label className="form-label mb-0 ms-1">Time</label>
                            <input type="time" className="form-control" style={{ width: "100px" }} />
                          </div>
                        </div>
                        <div className="row align-items-center mb-1">
                          <div className="col-md-4">
                            <label className="form-label mb-0">Department :</label>
                          </div>
                          <div className="col-md-8">
                            <select className="form-select">
                              <option>Select</option>
                            </select>
                          </div>
                        </div>
                        <div className="row align-items-center mb-1">
                          <div className="col-md-4">
                            <label className="form-label mb-0">Shift :</label>
                          </div>
                          <div className="col-md-8">
                            <select className="form-select">
                              <option>Select</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Breakdown Details - First Table */}
                  <div className="mt-4">
                    <h6 className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: "14px", fontWeight: "600" }}>
                      <FaQuestionCircle /> BreakDown Details :
                    </h6>
                    <div className="table-responsive">
                      <table className="table entry-table mb-0">
                        <thead>
                          <tr>
                            <th>Nature Of BreakDown</th>
                            <th>BreakDown Description</th>
                            <th>BreakDown Type</th>
                            <th>Specification / Additional Info</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex gap-1">
                                <select className="form-select form-select-sm">
                                  <option>Select</option>
                                </select>
                                <button className="btn btn-sm btn-outline-secondary p-1">
                                  <FaPlus size={10} />
                                </button>
                                <button className="btn btn-sm btn-outline-secondary p-1">
                                  <FaSync size={10} />
                                </button>
                              </div>
                            </td>
                            <td>
                              <textarea className="form-control form-control-sm" rows="1"></textarea>
                            </td>
                            <td>
                              <select className="form-select form-select-sm">
                                <option>Critical</option>
                              </select>
                            </td>
                            <td>
                              <textarea className="form-control form-control-sm" rows="1"></textarea>
                            </td>
                            <td className="text-center">
                              <button className="btn btn-sm px-3">Add</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* List Table - Exactly matching ToolManagement */}
                  <div className="table-responsive mt-3">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Sr No.</th>
                          <th>Breakdown Type</th>
                          <th>Breakdown Description</th>
                          <th>Breakdown Type</th>
                          <th>Specification / Additional Info</th>
                          <th>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">1</td>
                          <td>
                            <select className="form-select form-select-sm">
                              <option>Select</option>
                            </select>
                          </td>
                          <td>
                            <textarea className="form-control form-control-sm" rows="1"></textarea>
                          </td>
                          <td>
                            <select className="form-select form-select-sm">
                              <option>Critical</option>
                            </select>
                          </td>
                          <td>
                            <textarea className="form-control form-control-sm" rows="1"></textarea>
                          </td>
                          <td className="text-center">
                            <button className="btn">
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Footer */}
                  <div className="footer-section mt-3 mb-5">
                    <button className="btn d-inline-flex align-items-center gap-2">
                      <FaCheckCircle /> Save Break Down Log
                    </button>
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

export default BreakdownSlip;
