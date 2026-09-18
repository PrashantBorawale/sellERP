import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./BreakdownList.css";
import {
  FaPlus,
  FaFileExcel,
  FaListUl,
  FaSearch,
  FaTimes,
  FaSearchPlus,
  FaPrint
} from "react-icons/fa";

const BreakdownList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [showMtbfModal, setShowMtbfModal] = useState(false);
  const [activeTab, setActiveTab] = useState("breakdownReport");
  const [filterType, setFilterType] = useState("month");
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
    <div className="breakdown-list">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title mb-0 text-start">Maintenance : Breakdown Report</h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button className="btn d-inline-flex align-items-center gap-2" onClick={() => navigate("/breakdown-slip")}>
                          <FaPlus /> Add New Break Down Log
                        </button>
                        <button className="btn d-inline-flex align-items-center gap-2" onClick={() => setShowMtbfModal(true)}>
                          <FaListUl /> MTBF & MTTR / BreakDown Register
                        </button>
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaFileExcel /> Export To Excel
                        </button>
                        <button className="btn d-inline-flex align-items-center gap-2">
                          <FaFileExcel /> Export To Excel (Details)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-3">
                    <div className="filter-row-container">
                      <div className="filter-label-row">
                        <div style={{ width: "100px" }}>Plant :</div>
                        <div style={{ width: "135px" }}>From :</div>
                        <div style={{ width: "135px" }}>To Date :</div>
                        <div style={{ width: "140px" }}>Series :</div>
                        <div style={{ width: "120px" }}>Category :</div>
                        <div style={{ width: "120px" }}>Status :</div>
                        <div style={{ width: "260px" }} className="d-flex align-items-center gap-2">
                          <input type="checkbox" id="itemCheck" />
                          <label className="mb-0 fw-bold" htmlFor="itemCheck">Item :</label>
                        </div>
                      </div>
                      <div className="filter-input-row">
                        <select className="form-select" style={{ width: "100px" }}>
                          <option>SHARP</option>
                        </select>
                        <input type="date" className="form-control" defaultValue="2026-04-07" style={{ width: "135px" }} />
                        <input type="date" className="form-control" defaultValue="2026-05-08" style={{ width: "135px" }} />
                        <select className="form-select" style={{ width: "140px" }}>
                          <option>ALL</option>
                        </select>
                        <select className="form-select" style={{ width: "120px" }}>
                          <option>ALL</option>
                        </select>
                        <select className="form-select" style={{ width: "120px" }}>
                          <option>ALL</option>
                        </select>
                        <div className="d-flex gap-1" style={{ width: "260px" }}>
                          <input type="text" className="form-control" placeholder="Enter Item..." />
                          <button className="btn filter-search-btn">
                            <FaSearch /> Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results Table */}
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Sr.No</th>
                          <th>Plant</th>
                          <th>Year</th>
                          <th>BreakDown No</th>
                          <th>Date</th>
                          <th>Code</th>
                          <th>Tool/Machine</th>
                          <th>Department</th>
                          <th>Category</th>
                          <th>Priority</th>
                          <th>Auth</th>
                          <th>User</th>
                          <th>Status</th>
                          <th>Doc</th>
                          <th>Email</th>
                          <th>Edit</th>
                          <th>View</th>
                          <th>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="18" className="text-center py-5 text-muted fw-bold">
                            No Records Found...!!!
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Footer */}
                  <div className="mt-2 text-start">
                    <span className="total-records">Total Record : 0</span>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* MTBF & MTTR Modal */}
      {showMtbfModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content" style={{ maxHeight: "90vh" }}>
              <div className="modal-header">
                <h5 className="modal-title">MTBF & MTTR Report</h5>
                <button type="button" className="btn-close" onClick={() => setShowMtbfModal(false)}>
                  <FaTimes />
                </button>
              </div>

              {/* Tabs Fixed Below Header */}
              <div className="modal-tabs d-flex">
                <div
                  className={`modal-tab ${activeTab === "breakdownReport" ? "active" : ""}`}
                  onClick={() => setActiveTab("breakdownReport")}
                >
                  Breakdown Report
                </div>
                <div
                  className={`modal-tab ${activeTab === "mtbfReport" ? "active" : ""}`}
                  onClick={() => setActiveTab("mtbfReport")}
                >
                  MTBF & MTTR Report
                </div>
                <div
                  className={`modal-tab ${activeTab === "breakdownAnalysis" ? "active" : ""}`}
                  onClick={() => setActiveTab("breakdownAnalysis")}
                >
                  BreakDown Analysis
                </div>
              </div>

              {/* Scrollable Body Content */}
              <div className="modal-body p-0" style={{ overflowY: "auto", maxHeight: "60vh" }}>
                <div className="tab-content-container p-4">
                  {activeTab === "breakdownReport" && (
                    <div className="breakdown-report-form">
                      <div className="row mb-3 align-items-center">
                        <div className="col-md-5 d-flex align-items-center gap-2">
                          <input
                            type="radio"
                            name="filterType"
                            id="monthRadio"
                            checked={filterType === "month"}
                            onChange={() => setFilterType("month")}
                          />
                          <label htmlFor="monthRadio" className="form-label mb-0">Month:</label>
                          <select className="form-select form-select-sm" disabled={filterType !== "month"}>
                            <option>Select</option>
                          </select>
                        </div>
                        <div className="col-md-5 d-flex align-items-center gap-2">
                          <input
                            type="radio"
                            name="filterType"
                            id="yearRadio"
                            checked={filterType === "year"}
                            onChange={() => setFilterType("year")}
                          />
                          <label htmlFor="yearRadio" className="form-label mb-0">Year:</label>
                          <select className="form-select form-select-sm" disabled={filterType !== "year"}>
                            <option>Select</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mb-3 align-items-center">
                        <div className="col-md-2">
                          <label className="form-label mb-0">Series :</label>
                        </div>
                        <div className="col-md-6">
                          <select className="form-select form-select-sm">
                            <option>Select</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mb-4 align-items-center">
                        <div className="col-md-2">
                          <label className="form-label mb-0">Group :</label>
                        </div>
                        <div className="col-md-6">
                          <select className="form-select form-select-sm">
                            <option>ALL</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-md-8 offset-md-2">
                          <button className="btn d-inline-flex align-items-center gap-2" style={{ border: "1px solid #ccc" }}>
                            <FaListUl /> View Report
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "mtbfReport" && (
                    <div className="mtbf-report-form">
                      <div className="row mb-2 align-items-center">
                        <div className="col-md-3">
                          <label className="form-label mb-0">Plant :</label>
                        </div>
                        <div className="col-md-6">
                          <select className="form-select form-select-sm" style={{ height: "30px" }}>
                            <option>SHARP</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mb-2 align-items-center">
                        <div className="col-md-3">
                          <label className="form-label mb-0">Section :</label>
                        </div>
                        <div className="col-md-6">
                          <select className="form-select form-select-sm" style={{ height: "30px" }}>
                            <option>ALL</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mb-2 align-items-center">
                        <div className="col-md-3 d-flex align-items-center gap-2">
                          <input
                            type="radio"
                            name="mtbfFilter"
                            id="monthWiseRadio"
                            checked={filterType === "month"}
                            onChange={() => setFilterType("month")}
                          />
                          <label htmlFor="monthWiseRadio" className="form-label mb-0">Month Wise :</label>
                        </div>
                        <div className="col-md-6">
                          <select className="form-select form-select-sm" disabled={filterType !== "month"} style={{ height: "30px" }}>
                            <option>Select</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mb-2 align-items-center">
                        <div className="col-md-3 d-flex align-items-center gap-2">
                          <input
                            type="radio"
                            name="mtbfFilter"
                            id="dateWiseRadio"
                            checked={filterType === "year"}
                            onChange={() => setFilterType("year")}
                          />
                          <label htmlFor="dateWiseRadio" className="form-label mb-0">Date Wise :</label>
                        </div>
                        <div className="col-md-6 d-flex gap-1">
                          <input type="date" className="form-control form-control-sm" disabled={filterType !== "year"} style={{ height: "30px" }} />
                          <input type="date" className="form-control form-control-sm" disabled={filterType !== "year"} style={{ height: "30px" }} />
                        </div>
                      </div>

                      <div className="row mb-2 align-items-center">
                        <div className="col-md-3">
                          <label className="form-label mb-0">Series :</label>
                        </div>
                        <div className="col-md-8">
                          <select className="form-select form-select-sm" style={{ height: "30px" }}>
                            <option>Select</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mb-2 align-items-center">
                        <div className="col-md-3">
                          <label className="form-label mb-0 text-nowrap">Line BreakDown :</label>
                        </div>
                        <div className="col-md-6">
                          <select className="form-select form-select-sm" style={{ height: "30px" }}>
                            <option>ALL</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mb-3 align-items-center">
                        <div className="col-md-2">
                          <label className="form-label mb-0">Group :</label>
                        </div>
                        <div className="col-md-3">
                          <select className="form-select form-select-sm" style={{ height: "30px" }}>
                            <option>ALL</option>
                          </select>
                        </div>
                        <div className="col-md-3 text-end">
                          <label className="form-label mb-0">Report Type :</label>
                        </div>
                        <div className="col-md-3">
                          <select className="form-select form-select-sm" style={{ height: "30px" }}>
                            <option>PDF</option>
                            <option>EXCEL</option>
                            <option>ALL</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mt-4 mb-4">
                        <div className="col-md-11 d-flex justify-content-between offset-md-1 px-4 pb-4">
                          <button className="btn d-inline-flex align-items-center gap-2" style={{ border: "1px solid #ccc" }}>
                            <FaSearchPlus style={{ fontSize: "14px" }} /> MTBF & MTTR
                          </button>
                          <button className="btn d-inline-flex align-items-center gap-2" style={{ border: "1px solid #ccc" }}>
                            <FaPrint style={{ fontSize: "14px" }} /> BreakDown Register
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "breakdownAnalysis" && (
                    <div className="breakdown-analysis-form">
                      <div className="row mb-3 align-items-center">
                        <div className="col-md-3">
                          <label className="form-label mb-0">Report Type :</label>
                        </div>
                        <div className="col-md-4">
                          <select className="form-select form-select-sm" style={{ height: "30px" }}>
                            <option>PDF</option>
                            <option>EXCEL</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mb-3 align-items-center">
                        <div className="col-md-3">
                          <label className="form-label mb-0">Group :</label>
                        </div>
                        <div className="col-md-5">
                          <select className="form-select form-select-sm" style={{ height: "30px" }}>
                            <option>ALL</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mb-4 align-items-center">
                        <div className="col-md-3 offset-md-3">
                          <input type="text" className="form-control form-control-sm" style={{ height: "30px" }} />
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-md-8 offset-md-3">
                          <button className="btn d-inline-flex align-items-center gap-2" style={{ border: "1px solid #ccc" }}>
                            <FaSearchPlus /> Breakdown Analysis
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="modal-internal-footer px-4 py-2 border-top">
                <p className="mb-0 text-muted" style={{ fontSize: "11px" }}>
                  Setting {"->"} MTBF,MTTR Format No :- 1, Breakdown Register Format No :- 1
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreakdownList;
