import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaFileExcel, FaPlus, FaFileAlt, FaProjectDiagram, FaSearch, FaListAlt } from "react-icons/fa";
import "./CostingList.css";

const CostingList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [currentView, setCurrentView] = useState("list"); // "list", "report", "add"
  const [activeTab, setActiveTab] = useState("master"); // "master", "details", "spec"
  const [showReportModal, setShowReportModal] = useState(false);

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  return (
    <div className="CostingListMaster">
      <NavBar toggleSideNav={toggleSideNav} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <SideNav sideNavOpen={sideNavOpen} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                {/* List View */}
                {currentView === "list" && (
                  <div className="CostingList mt-2 border rounded shadow-sm bg-white">
                    <div className="CostingList-header d-flex justify-content-between align-items-center p-2 border-bottom">
                      <h6 className="header-title mb-0">Costing List</h6>
                      <div className="d-flex gap-1">
                          <button 
                              className="erp-btn-grey-sm d-flex align-items-center gap-1"
                              onClick={() => setCurrentView("report")}
                          >
                             <FaFileAlt size={10} /> Costing Report
                          </button>
                          <button 
                              className="erp-btn-grey-sm d-flex align-items-center gap-1"
                              onClick={() => {
                                  setCurrentView("add");
                                  setActiveTab("master");
                              }}
                          >
                             <FaPlus size={10} /> Add New Costing
                          </button>
                          <button className="erp-btn-grey-sm d-flex align-items-center gap-1">
                             <FaFileExcel size={10} /> Export To Excel
                          </button>
                          <button className="erp-btn-grey-sm d-flex align-items-center gap-1">
                             <FaProjectDiagram size={10} /> BOM Wise Costing
                          </button>
                      </div>
                    </div>
                    <div className="CostingList-Content p-0">
                        <div style={{ minHeight: '450px' }} className="d-flex align-items-center justify-content-center">
                            <span className="text-muted fw-bold">No Data Available</span>
                        </div>

                        {/* Footer Section */}

                        {/* Footer Section */}
                        <div className="CostingList-Footer p-2 border-top bg-light text-start">
                        <span className="total-records">Total Record's : 0</span>
                        </div>
                    </div>
                  </div>
                )}

                {/* Report View */}
                {currentView === "report" && (
                  <div className="CostingReport-View mt-2 border rounded shadow-sm bg-white p-3">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                         <h6 className="header-title mb-0">Costing Report</h6>
                         <button className="erp-btn-grey-sm">
                            <FaFileExcel size={10} /> Export To Excel
                         </button>
                      </div>
                      <div className="search-bar-row border p-2 mb-3 bg-light d-flex align-items-center gap-2">
                         <label className="fw-bold mb-0">Item Search:</label>
                         <input type="text" className="form-control form-control-xs" style={{ width: '300px' }} />
                         <button className="erp-btn-grey-sm d-flex align-items-center gap-1">
                            <FaSearch size={10} /> Search
                         </button>
                         <button className="erp-btn-grey-sm ms-auto" onClick={() => setCurrentView("list")}>Back to List</button>
                      </div>
                      <div className="border" style={{ minHeight: '300px' }}>
                         <div className="d-flex align-items-center justify-content-center h-100 py-5">
                            <span className="text-muted">No Data Available</span>
                         </div>
                      </div>
                  </div>
                )}

                {/* Add New Costing View */}
                {currentView === "add" && (
                  <div className="AddNewCosting-View mt-2 border rounded shadow-sm bg-white p-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                         <h6 className="header-title mb-0">Add New Costing</h6>
                         <button className="erp-btn-grey-sm d-flex align-items-center gap-1" onClick={() => setCurrentView("list")}>
                            <FaListAlt size={10} /> Costing List
                         </button>
                      </div>

                      {/* Tabs */}
                      <div className="nav nav-tabs erp-tabs mb-3">
                         <button className={`nav-link ${activeTab === "master" ? "active" : ""}`} onClick={() => setActiveTab("master")}>Master</button>
                         <button className={`nav-link ${activeTab === "details" ? "active" : ""}`} onClick={() => setActiveTab("details")}>Details</button>
                         <button className={`nav-link ${activeTab === "spec" ? "active" : ""}`} onClick={() => setActiveTab("spec")}>Other Specifications</button>
                      </div>

                      <div className="tab-content border p-3 bg-light">
                         {/* Master Tab */}
                         {activeTab === "master" && (
                           <div className="tab-pane active">
                              <div className="row g-2 mb-2">
                                 <div className="col-md-9">
                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '85px', fontSize: '11px' }}>Costing NO :</label>
                                          <input type="text" className="form-control form-control-xs" value="1" readOnly />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '85px', fontSize: '11px' }}>Costing Date :</label>
                                          <input type="date" className="form-control form-control-xs" defaultValue={new Date().toISOString().split('T')[0]} />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '65px', fontSize: '11px' }}>Part No :</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '75px', fontSize: '11px' }}>Part Name :</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                    </div>
                                    
                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '85px', fontSize: '11px' }}>RM Size :</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '85px', fontSize: '11px' }}>RM Grade :</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '75px', fontSize: '11px' }}>RM Rate/Kg :</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '90px', fontSize: '11px' }}>Scrap Rate/Kg:</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '85px', fontSize: '11px' }}>Bar Dia In MM :</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '85px', fontSize: '11px' }}>Finish length :</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '95px', fontSize: '11px' }}>Cutting Allow:</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '95px', fontSize: '11px' }}>End Piece Allow:</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '85px', fontSize: '11px' }}>Gross Length :</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%', fontSize: '10px' }}>
                                          <input type="checkbox" className="form-check-input mb-1" />
                                          <label className="fw-bold mb-0 flex-shrink-0">Gross Wt(Gms):</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '95px', fontSize: '11px' }}>Net Weight(Gms):</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '105px', fontSize: '11px' }}>Scrap Wt(Gms):</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '85px', fontSize: '11px' }}>Gross RM Cost:</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '85px', fontSize: '11px' }}>Scrap Recov %:</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '95px', fontSize: '11px' }}>Scrap Recovery:</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                       <div className="d-flex align-items-center gap-1" style={{ width: '24%' }}>
                                          <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '95px', fontSize: '11px' }}>Net RM Cost :</label>
                                          <input type="text" className="form-control form-control-xs" />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-md-3">
                                    <div className="d-flex gap-1 mb-2">
                                       {['(1)', '(2)', '(3)', '(4)'].map((label, idx) => (
                                          <div key={idx} className="flex-grow-1">
                                             <label className="d-block text-center fw-bold mb-0" style={{ fontSize: '10px' }}>{label}</label>
                                             <input type="text" className="form-control form-control-xs" />
                                          </div>
                                       ))}
                                    </div>
                                    <div className="d-flex align-items-center gap-1 mb-2">
                                       <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '75px', fontSize: '11px' }}>Qty / Month:</label>
                                       <input type="text" className="form-control form-control-xs" />
                                    </div>
                                    <div className="d-flex align-items-center gap-1">
                                       <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '75px', fontSize: '11px' }}>Annual.Qty :</label>
                                       <input type="text" className="form-control form-control-xs" />
                                    </div>
                                 </div>
                              </div>

                              {/* Operations Sub-Table */}
                              <div className="operations-table-section mt-4">
                                 <div className="table-responsive border">
                                    <table className="table table-sm erp-table mb-0 text-center">
                                       <thead>
                                          <tr className="bg-light">
                                             <th>Operations</th>
                                             <th>Machine</th>
                                             <th>M/c Hrs Rate</th>
                                             <th>Cycle Time</th>
                                             <th>Effi</th>
                                             <th>Cost</th>
                                             <th>Action</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr className="bg-white">
                                             <td><select className="form-select form-select-xs"><option>Select</option></select></td>
                                             <td><select className="form-select form-select-xs"><option>Select</option></select></td>
                                             <td><input type="text" className="form-control form-control-xs" /></td>
                                             <td><input type="text" className="form-control form-control-xs" /></td>
                                             <td><input type="text" className="form-control form-control-xs" /></td>
                                             <td><input type="text" className="form-control form-control-xs" /></td>
                                             <td><button className="btn btn-xs btn-primary py-0 px-3">Add</button></td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                                 <div className="table-responsive border mt-2" style={{ maxHeight: '200px' }}>
                                    <table className="table table-bordered erp-table mb-0 text-center">
                                       <thead className="ps-table-header">
                                          <tr>
                                             <th style={{ width: '50px' }}>Sr.</th>
                                             <th>Operation</th>
                                             <th>Machine</th>
                                             <th>M/c Hrs Rate</th>
                                             <th>Cycle Time</th>
                                             <th>Effi</th>
                                             <th>Cost</th>
                                             <th style={{ width: '50px' }}>Delete</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td>1</td>
                                             <td></td>
                                             <td></td>
                                             <td></td>
                                             <td></td>
                                             <td></td>
                                             <td></td>
                                             <td><button className="btn btn-xs btn-outline-danger py-0 px-2">X</button></td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                         )}

                         {/* Details Tab */}
                         {activeTab === "details" && (
                           <div className="tab-pane active">
                              <div className="row g-2 mb-3 border p-3 rounded" style={{ borderColor: '#007bff !important' }}>
                                 {/* First Row of Pairs */}
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '100px', fontSize: '11px' }}>Profit On RM % :</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '105px', fontSize: '11px' }}>Profit On RM Cost :</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '110px', fontSize: '11px' }}>Profit On Labour % :</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '100px', fontSize: '11px' }}>Profit On Labour :</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '85px', fontSize: '11px' }}>Rejection % :</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '90px', fontSize: '11px' }}>Rejection Cost :</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>

                                 {/* Second Row of Pairs */}
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '100px', fontSize: '11px' }}>Packing % :</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '105px', fontSize: '11px' }}>Pack Cost :</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '110px', fontSize: '11px' }}>Trasport % :</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '100px', fontSize: '11px' }}>Trasport Cost :</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '110px', fontSize: '11px' }}>Over Head % on RM:</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '110px', fontSize: '11px' }}>Over Head on RM:</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>

                                 {/* Third Row of Pairs */}
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '100px', fontSize: '11px' }}>Inspection % :</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '105px', fontSize: '11px' }}>Inspection Cost :</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '115px', fontSize: '11px' }}>Inventory Carring %:</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '125px', fontSize: '11px' }}>Inventory Carring Cost:</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '135px', fontSize: '10px' }}>Over Head % on Process Cost:</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>
                                 <div className="col-md-2 d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '135px', fontSize: '10px' }}>Over Head on Process Cost:</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>

                                 {/* Final Cost - Below Inventory */}
                                 <div className="col-md-2 d-flex align-items-center gap-1 mt-1">
                                    <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '100px', fontSize: '11px' }}>Final Cost :</label>
                                    <input type="text" className="form-control form-control-xs" />
                                 </div>

                                 <div className="col-md-12 mt-3 p-2 border bg-white rounded">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                       <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '70px', fontSize: '11px' }}>Customer :</label>
                                       <input type="text" className="form-control form-control-xs" style={{ width: '300px' }} />
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                       <label className="fw-bold mb-0 flex-shrink-0" style={{ width: '70px', fontSize: '11px' }}>Pro.Qty :</label>
                                       <input type="text" className="form-control form-control-xs" style={{ width: '100px' }} />
                                    </div>
                                 </div>
                              </div>
                           </div>
                         )}

                         {/* Other Specifications Tab */}
                         {activeTab === "spec" && (
                           <div className="tab-pane active">
                              <div className="filter-row d-flex align-items-center gap-3 mb-4 p-2 border bg-white">
                                 <div className="d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0">Type :</label>
                                    <select className="form-select form-select-xs" style={{ width: '120px' }}><option>Select</option></select>
                                 </div>
                                 <div className="d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0">Select Parameter :</label>
                                    <div className="d-flex align-items-center gap-1">
                                       <select className="form-select form-select-xs" style={{ width: '180px' }}><option>Select</option></select>
                                       <button className="btn btn-xs btn-outline-secondary py-0 px-1">+</button>
                                       <button className="btn btn-xs btn-outline-secondary py-0 px-1"><FaSearch size={10} /></button>
                                    </div>
                                 </div>
                                 <div className="d-flex align-items-center gap-1">
                                    <label className="fw-bold mb-0">Value :</label>
                                    <input type="text" className="form-control form-control-xs" style={{ width: '100px' }} />
                                 </div>
                                 <div className="d-flex gap-2">
                                    <button className="btn btn-xs btn-outline-primary py-0 px-2 d-flex align-items-center gap-1">
                                       <span style={{ fontSize: '14px' }}>✔</span> ADD
                                    </button>
                                    <button className="btn btn-xs btn-outline-primary py-0 px-2 d-flex align-items-center gap-1">
                                       <FaListAlt size={10} /> ADD ALL
                                    </button>
                                 </div>
                              </div>

                              <div className="table-responsive border">
                                 <table className="table table-bordered erp-table mb-0 text-center">
                                    <thead className="ps-table-header">
                                       <tr>
                                          <th style={{ width: '50px' }}>Sr.</th>
                                          <th>Type</th>
                                          <th>Print Sr.No</th>
                                          <th>Term Name</th>
                                          <th>Value</th>
                                          <th style={{ width: '50px' }}>Del</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr>
                                          <td>1</td>
                                          <td></td>
                                          <td><input type="text" className="table-input-xs" style={{ width: '60px' }} /></td>
                                          <td><input type="text" className="table-input-xs" /></td>
                                          <td><input type="text" className="table-input-xs" /></td>
                                          <td><button className="btn btn-xs btn-outline-danger py-0 px-2">X</button></td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                         )}
                      </div>

                      {/* Common Footer Save Button for Add View */}
                      <div className="mt-3">
                         <button className="erp-btn-save d-flex align-items-center gap-1 px-3">
                            <span style={{ color: 'green', fontWeight: 'bold' }}>✔</span> Save
                         </button>
                      </div>
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostingList;
