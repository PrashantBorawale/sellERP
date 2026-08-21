import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaSave, FaFileAlt, FaCopy, FaTrash, FaEdit } from "react-icons/fa";
import "./BusinessPlan.css";

const BusinessPlan = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [plant, setPlant] = useState("");
  const [month, setMonth] = useState("");
  const [currentView, setCurrentView] = useState("list"); // 'list', 'annualReport', or 'copyPlan'
  const [fromMonth, setFromMonth] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterCustomer, setFilterCustomer] = useState(false);
  const [filterItem, setFilterItem] = useState(false);
  const [weightType, setWeightType] = useState("rm_wip"); // 'rm_wip' or 'gross'
  
  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  // Handle browser back button to return to the list view instead of leaving the page
  useEffect(() => {
    const handlePopState = (event) => {
      if (currentView !== "list") {
        setCurrentView("list");
        // Prevent the browser from actually going back if we're just switching internal views
        window.history.pushState(null, "", window.location.href);
      }
    };
    
    // Add a state to history so there's something to pop
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentView]);

  return (
    <div className="BusinessPlanMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                {currentView === "list" && (
                  <div className="BusinessPlan mt-2">
                    {/* Header */}
                    <div className="BusinessPlan-header d-flex justify-content-between align-items-center mb-0 p-1 bg-white border-bottom">
                      <h6 className="header-title mb-0">Business Plan</h6>
                      <div className="header-actions d-flex align-items-center gap-2">
                          <button className="erp-btn-cyan d-flex align-items-center gap-1" onClick={() => setCurrentView("annualReport")}>
                            Annual Report
                          </button>
                          <button className="erp-btn-cyan d-flex align-items-center gap-1">
                            Report
                          </button>
                          <button className="erp-btn-cyan d-flex align-items-center gap-1" onClick={() => setCurrentView("copyPlan")}>
                            Copy Plan
                          </button>
                      </div>
                    </div>

                    {/* Filter/Entry Bar */}
                    <div className="BusinessPlan-Entry p-2 border-bottom bg-white">
                      <div className="row g-2 align-items-end">
                        <div className="col-auto">
                          <label className="filter-label d-block">Plant :</label>
                          <select 
                            className="form-select form-select-xs" 
                            style={{ width: '120px' }}
                            value={plant}
                            onChange={(e) => setPlant(e.target.value)}
                          >
                            <option>Select</option>
                            <option>ProduLink</option>
                          </select>
                        </div>
                        <div className="col-auto">
                          <label className="filter-label d-block">Select Month :</label>
                          <select 
                            className="form-select form-select-xs" 
                            style={{ width: '120px' }}
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                          >
                            <option>Select</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            {/* Add other months */}
                          </select>
                        </div>
                        <div className="col-auto">
                          <label className="filter-label d-block">Select Customer :</label>
                          <div className="d-flex gap-1">
                            <input type="text" className="form-control form-control-xs" placeholder="Enter Name.." style={{ width: '180px' }} />
                            <button className="erp-btn-grey-sm"><FaSearch size={10} /> Search</button>
                          </div>
                        </div>
                        <div className="col-auto">
                          <label className="filter-label d-block">Select Item Name :</label>
                          <input type="text" className="form-control form-control-xs" placeholder="Enter Code No.." style={{ width: '200px' }} />
                        </div>
                        <div className="col-auto">
                          <label className="filter-label d-block">Plan.Qty :</label>
                          <input type="number" className="form-control form-control-xs" style={{ width: '80px' }} />
                        </div>
                        <div className="col-auto">
                          <button className="erp-btn-grey d-flex align-items-center gap-1">
                            <FaSave size={12} /> Save
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="BusinessPlan-Content" style={{ minHeight: '400px', backgroundColor: '#fff' }}>
                      <div className="table-responsive">
                        <table className="table table-bordered erp-table text-center mb-0">
                          <thead>
                            <tr>
                              <th>Sr.</th>
                              <th>Plant</th>
                              <th>Month Name</th>
                              <th>Customer Name</th>
                              <th>Item No</th>
                              <th>Item Code</th>
                              <th>Description</th>
                              <th>Plan Qty</th>
                              <th>Rate</th>
                              <th>Plan Value</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Example row to match screenshot */}
                            <tr>
                              <td>1</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td><span className="text-primary cursor-pointer">Edit</span></td>
                              <td><span className="text-danger cursor-pointer">Delete</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="BusinessPlan-Footer d-flex justify-content-between align-items-center p-1 bg-light border-top">
                      <div className="footer-stat">Total Records : 1</div>
                      <div className="footer-stat">Total Value : 00</div>
                    </div>
                  </div>
                )}

                {currentView === "annualReport" && (
                  <div className="BusinessAnnualReport mt-2">
                    {/* Header */}
                    <div className="BusinessPlan-header d-flex justify-content-between align-items-center mb-0 p-1 bg-white border-bottom">
                      <h6 className="header-title mb-0">Annual Business Plan Report</h6>
                      <div className="header-actions d-flex align-items-center gap-2">
                          <button className="erp-btn-grey-sm d-flex align-items-center gap-1">
                             Export To Excel
                          </button>
                          <button className="erp-btn-cyan btn-sm" onClick={() => setCurrentView("list")}>
                             Back to Plan
                          </button>
                      </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="BusinessPlan-Entry p-2 border-bottom bg-white">
                       <div className="d-flex align-items-center gap-3 flex-wrap text-start" style={{ fontSize: '11px' }}>
                          <div className="d-flex align-items-center gap-1">
                             <label className="fw-bold">From Date :</label>
                             <input type="date" className="form-control form-control-xs" style={{width: '110px'}} value={fromDate} onChange={e => setFromDate(e.target.value)} />
                          </div>
                          <div className="d-flex align-items-center gap-1">
                             <label className="fw-bold">To Date :</label>
                             <input type="date" className="form-control form-control-xs" style={{width: '110px'}} value={toDate} onChange={e => setToDate(e.target.value)} />
                          </div>
                          <div className="d-flex align-items-center gap-1">
                             <input type="checkbox" checked={filterCustomer} onChange={e => setFilterCustomer(e.target.checked)} />
                             <label className="fw-bold">Customer :</label>
                             <input type="text" className="form-control form-control-xs" placeholder="Item Name.." style={{width: '130px'}} />
                          </div>
                          <div className="d-flex align-items-center gap-1">
                             <input type="checkbox" checked={filterItem} onChange={e => setFilterItem(e.target.checked)} />
                             <label className="fw-bold">Item :</label>
                             <input type="text" className="form-control form-control-xs" placeholder="Item Name.." style={{width: '130px'}} />
                          </div>
                          <div className="d-flex align-items-center gap-2 border-start ps-2">
                             <div className="d-flex align-items-center gap-1">
                                <input type="radio" name="weightType" id="rm_wip" checked={weightType === "rm_wip"} onChange={() => setWeightType("rm_wip")} />
                                <label htmlFor="rm_wip" className="mb-0">RM Wip Wt</label>
                             </div>
                             <div className="d-flex align-items-center gap-1">
                                <input type="radio" name="weightType" id="gross_wt" checked={weightType === "gross_wt"} onChange={() => setWeightType("gross_wt")} />
                                <label htmlFor="gross_wt" className="mb-0">Gross Wt</label>
                             </div>
                          </div>
                          <button className="erp-btn-grey-sm d-flex align-items-center gap-1">
                             <FaSearch size={10} /> Search
                          </button>
                       </div>
                    </div>

                    {/* Table */}
                    <div className="BusinessPlan-Content" style={{ minHeight: '400px', backgroundColor: '#fff' }}>
                      <div className="table-responsive">
                        <table className="table table-bordered erp-table text-center mb-0">
                          <tbody>
                            <tr style={{ height: '300px' }}>
                               <td colSpan="10" className="text-muted py-5">No Data Found !!</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Multi-Field Footer */}
                    <div className="BusinessPlan-Footer p-1 bg-light border-top" style={{ fontSize: '10px' }}>
                       <div className="d-flex justify-content-between flex-wrap gap-2 fw-bold text-nowrap">
                          <span>Total Record : 0</span>
                          <span>Plan Qty : 00</span>
                          <span>ANNUAL BDG Qty : 00</span>
                          <span>ANL QTY+25% : 00</span>
                          <span>ANNUAL TONNAGE : 00</span>
                          <span>A+25% TONNAGE : 00</span>
                          <span>ANNUAL AMT : 00</span>
                          <span>A+25% AMT : 00</span>
                       </div>
                    </div>
                  </div>
                )}

                {currentView === "copyPlan" && (
                  <div className="BusinessPlan-Copy-Container d-flex justify-content-center align-items-center" style={{ minHeight: '500px' }}>
                    <div className="BusinessPlan-Copy-Modal border shadow-sm" style={{ width: '350px', backgroundColor: '#f8f9fa', borderRadius: '4px', overflow: 'hidden' }}>
                       <div className="modal-header-custom p-1 px-2 d-flex justify-content-between align-items-center text-white" style={{ backgroundColor: '#16bfff', fontSize: '12px' }}>
                          <span className="fw-bold">Copy Business Plan..</span>
                          <span className="cursor-pointer fw-bold" style={{ fontSize: '16px' }} onClick={() => setCurrentView("list")}>&times;</span>
                       </div>
                       <div className="modal-body-custom p-3 bg-white">
                          <div className="mb-3">
                             <label className="filter-label d-block mb-1">Select From Month :</label>
                             <select className="form-select form-select-sm" value={fromMonth} onChange={e => setFromMonth(e.target.value)}>
                                <option>Select</option>
                                <option>January</option>
                                <option>February</option>
                                <option>March</option>
                             </select>
                          </div>
                          <div className="mb-3">
                             <label className="filter-label d-block mb-1">Select To Month :</label>
                             <select className="form-select form-select-sm" value={toMonth} onChange={e => setToMonth(e.target.value)}>
                                <option>Select</option>
                                <option>January</option>
                                <option>February</option>
                                <option>March</option>
                             </select>
                          </div>
                          <div className="text-center mt-3">
                             <button className="erp-btn-grey d-flex align-items-center gap-1 mx-auto px-4" style={{ height: '32px' }}>
                                <FaCopy size={12} /> Copy
                             </button>
                          </div>
                       </div>
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

export default BusinessPlan;
