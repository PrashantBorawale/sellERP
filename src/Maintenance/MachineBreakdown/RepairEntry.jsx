import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./RepairEntry.css";
import {
  FaListUl,
  FaSearch,
  FaSync,
  FaInfoCircle,
  FaSave,
  FaTrash
} from "react-icons/fa";

const RepairEntry = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

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
    <div className="repair-entry">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header Section */}
                  <div className="WorkOrderEntry-header mb-2">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <div className="d-flex align-items-center gap-3">
                          <h5 className="header-title text-start mb-0">
                            Maintenance : <span className="text-primary">Repair Entry</span>
                          </h5>
                          <div className="d-flex align-items-center gap-2">
                            <label className="mb-0 fw-bold">Plant :</label>
                            <select className="form-select form-select-sm" style={{ width: "100px" }}>
                              <option>SHARP</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaListUl /> Break Down Repair List
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tabs Section */}
                  <div className="custom-tabs-container mb-3">
                    <button
                      className={`tab-btn ${activeTab === "general" ? "active" : ""}`}
                      onClick={() => setActiveTab("general")}
                    >
                      General Details
                    </button>
                    <button
                      className={`tab-btn ${activeTab === "spare" ? "active" : ""}`}
                      onClick={() => setActiveTab("spare")}
                    >
                      Spare/Consumable Details
                    </button>
                  </div>

                  {/* Main Content Area */}
                  <div className="header-section">
                    {activeTab === "general" && (
                      <div className="general-details-form">
                        <div className="row mb-3 align-items-center">
                          <div className="col-md-4 d-flex align-items-center gap-2">
                            <label className="form-label mb-0 fw-bold" style={{ minWidth: "80px" }}>Series :</label>
                            <select className="form-select">
                              <option>Select</option>
                            </select>
                          </div>
                        </div>

                        {/* Section Sub-Header */}
                        <div className="section-subheader mb-3">
                          <FaInfoCircle className="text-info" /> General Details
                        </div>

                        {/* Form Grid */}
                        <div className="form-grid-container p-2 border rounded bg-light">
                          <div className="row g-3">
                            {/* Left Column */}
                            <div className="col-md-6 pe-4">
                              <div className="row mb-2 align-items-center">
                                <label className="col-sm-4 form-label mb-0">Repairing No :</label>
                                <div className="col-sm-8 d-flex gap-2">
                                  <input type="text" className="form-control" style={{ width: "80px" }} />
                                  <input type="text" className="form-control" />
                                  <button className="btn p-1"><FaSync /></button>
                                </div>
                              </div>

                              <div className="row mb-2 align-items-center">
                                <label className="col-sm-4 form-label mb-0">Breakdown Slip No :</label>
                                <div className="col-sm-8 d-flex gap-2">
                                  <input type="text" className="form-control" />
                                  <button className="btn d-inline-flex align-items-center gap-1">
                                    <FaSearch /> Search
                                  </button>
                                </div>
                              </div>

                              <div className="row mb-2 align-items-center">
                                <label className="col-sm-4 form-label mb-0">Tool :</label>
                                <div className="col-sm-8">
                                  <input type="text" className="form-control" />
                                </div>
                              </div>

                              <div className="row mb-2 align-items-center">
                                <label className="col-sm-4 form-label mb-0">Attended By Date :</label>
                                <div className="col-sm-8 d-flex gap-2 align-items-center">
                                  <input type="date" className="form-control" defaultValue="2026-05-07" />
                                  <label className="mb-0">Time</label>
                                  <input type="text" className="form-control" style={{ width: "70px" }} defaultValue="10:41" />
                                </div>
                              </div>

                              <div className="row mb-2 align-items-center">
                                <label className="col-sm-4 form-label mb-0">Shift :</label>
                                <div className="col-sm-8">
                                  <select className="form-select">
                                    <option>Select</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="col-md-6 ps-4">
                              <div className="row mb-2 align-items-center">
                                <label className="col-sm-4 form-label mb-0">Received By / Repair Date :</label>
                                <div className="col-sm-8 d-flex gap-2 align-items-center">
                                  <input type="date" className="form-control" defaultValue="2026-05-07" />
                                  <label className="mb-0">Time</label>
                                  <input type="text" className="form-control" style={{ width: "70px" }} defaultValue="10:41" />
                                </div>
                              </div>

                              <div className="row mb-2 align-items-center">
                                <label className="col-sm-4 form-label mb-0">Department :</label>
                                <div className="col-sm-8">
                                  <select className="form-select">
                                    <option>Select</option>
                                  </select>
                                </div>
                              </div>

                              <div className="row mb-2 align-items-center">
                                <label className="col-sm-4 form-label mb-0">Breakdown Date :</label>
                                <div className="col-sm-8 d-flex gap-2 align-items-center">
                                  <input type="text" className="form-control" />
                                  <label className="mb-0">Time</label>
                                  <input type="text" className="form-control" style={{ width: "70px" }} />
                                </div>
                              </div>

                              <div className="row mb-2 align-items-center">
                                <label className="col-sm-4 form-label mb-0">Return Date :</label>
                                <div className="col-sm-8 d-flex gap-2 align-items-center">
                                  <input type="date" className="form-control" defaultValue="2026-05-07" />
                                  <label className="mb-0">Time</label>
                                  <input type="text" className="form-control" style={{ width: "70px" }} defaultValue="10:41" />
                                </div>
                              </div>

                              <div className="row mb-2 align-items-center">
                                <label className="col-sm-4 form-label mb-0">Repair InHouse/OutSource :</label>
                                <div className="col-sm-8">
                                  <select className="form-select">
                                    <option>InHouse</option>
                                    <option>OutSource</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Breakdown Details Header */}
                        <div className="section-subheader mt-4 mb-2">
                          <FaInfoCircle className="text-info" /> Breakdown Details :
                        </div>
                        <div className="border-top pt-2">
                          {/* Potential additional content for Breakdown Details */}
                        </div>
                      </div>
                    )}

                    {activeTab === "spare" && (
                      <div className="spare-details-content">
                        {/* Entry Row for Spare Parts */}
                        <div className="form-grid-container p-2 mb-3 border rounded bg-light">
                          <div className="row g-2 align-items-end">
                            <div className="col-md-4">
                              <label className="form-label mb-1 fw-bold">Spare/Consumable Details</label>
                              <div className="d-flex gap-2">
                                <input type="text" className="form-control" placeholder="Enter Item Code.." />
                                <button className="btn btn-sm text-nowrap d-flex align-items-center gap-1">
                                  <FaSearch /> Search
                                </button>
                              </div>
                            </div>
                            <div className="col-md-1">
                              <label className="form-label mb-1 fw-bold">Quantity</label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-2">
                              <label className="form-label mb-1 fw-bold">Date</label>
                              <input type="date" className="form-control" defaultValue="2026-05-07" />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label mb-1 fw-bold">Specification</label>
                              <textarea className="form-control" rows="1"></textarea>
                            </div>
                            <div className="col-md-1">
                              <button className="btn w-100 btn-sm">Add</button>
                            </div>
                          </div>
                        </div>

                        {/* Spare Parts Table */}
                        <div className="table-responsive mb-4">
                          <table className="table table-bordered table-hover user-list-table">
                            <thead>
                              <tr>
                                <th style={{ width: "50px" }}>Sr.</th>
                                <th>Spare Part Name</th>
                                <th style={{ width: "100px" }}>Quantity</th>
                                <th style={{ width: "150px" }}>Date</th>
                                <th>Specification</th>
                                <th style={{ width: "80px" }}>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                  <button className="btn btn-sm">
                                    <FaTrash />
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Bottom Metadata Fields Section */}
                        <div className="footer-metadata-section p-3 border rounded bg-light">
                          <div className="row g-3">
                            {/* Left Col */}
                            <div className="col-md-3">
                              <div className="row mb-2 align-items-center">
                                <label className="col-5 form-label mb-0 text-nowrap">Received By</label>
                                <div className="col-7"><input type="text" className="form-control" /></div>
                              </div>
                              <div className="row mb-2 align-items-center">
                                <label className="col-5 form-label mb-0 text-nowrap">Attended By :</label>
                                <div className="col-7"><input type="text" className="form-control" /></div>
                              </div>
                              <div className="row mb-2 align-items-center">
                                <label className="col-5 form-label mb-0 text-nowrap">Return To :</label>
                                <div className="col-7"><input type="text" className="form-control" /></div>
                              </div>
                              <div className="row mb-2 align-items-center">
                                <label className="col-5 form-label mb-0 text-nowrap fw-bold">Repair Cost:</label>
                                <div className="col-7"><input type="text" className="form-control" /></div>
                              </div>
                            </div>

                            {/* Middle Col */}
                            <div className="col-md-5">
                              <div className="row mb-2 align-items-center">
                                <label className="col-5 form-label mb-0 text-nowrap">Repair By (Multiple):</label>
                                <div className="col-7"><input type="text" className="form-control" /></div>
                              </div>
                              <div className="row mb-2 align-items-center">
                                <div className="col-5">
                                  <label className="form-label mb-0 text-nowrap">Time :</label>
                                </div>
                                <div className="col-7 d-flex align-items-center gap-2">
                                  <label className="form-label mb-0 text-nowrap small text-muted">MTBF : hh:mm:ss</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="row mb-2 align-items-center">
                                <div className="col-5">
                                  <label className="form-label mb-0 text-nowrap">Time :</label>
                                </div>
                                <div className="col-7 d-flex align-items-center gap-2">
                                  <label className="form-label mb-0 text-nowrap small text-muted">MTTR : hh:mm:ss</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="row mb-2 align-items-center">
                                <label className="col-5 form-label mb-0 text-nowrap">(ISO)Format No :</label>
                                <div className="col-7"><input type="text" className="form-control" /></div>
                              </div>
                            </div>

                            {/* Right Col (ISO Rev Info) */}
                            <div className="col-md-4">
                                <div className="row mb-2 align-items-center mt-5 pt-3">
                                    <label className="col-4 form-label mb-0 text-nowrap">(ISO)Rev. No :</label>
                                    <div className="col-8"><input type="text" className="form-control" /></div>
                                </div>
                                <div className="row mb-2 align-items-center">
                                    <label className="col-4 form-label mb-0 text-nowrap">(ISO) Rev Date:</label>
                                    <div className="col-8"><input type="date" className="form-control" /></div>
                                </div>
                            </div>
                          </div>

                          {/* Save Repair Log Button */}
                          <div className="mt-4 text-start">
                            <button className="btn d-inline-flex align-items-center gap-2">
                              <FaSave className="text-success" /> Save Repair Log
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
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

export default RepairEntry;
