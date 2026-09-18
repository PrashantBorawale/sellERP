import React, { useState, useEffect } from "react";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaRedo, FaFilePdf, FaEnvelope } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./WorkOrderReportV2.css";

const WorkOrderReportV2 = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateType: "WO Date",
    fromDate: new Date().toISOString().split('T')[0],
    toDate: new Date().toISOString().split('T')[0],
    plant: "SHARP",
    status: "ALL",
    type: "ALL",
    series: "Select",
    auth: "ALL",
    customerName: "",
    itemName: "",
    woNo: ""
  });

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const tableHeaders = [
    "Sr.", "Year", "Plant", "WO No", "WO Date", "Code", "Customer Name", 
    "Item Code | Description", "SO/MO No", "Cust PO No", "WO Status", 
    "User", "Auth", "MI", "Info", "Doc", "Act.", "View"
  ];

  return (
    <div className="WorkOrderReportV2Master">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="WorkOrderReportV2 p-2">
                  <ToastContainer position="top-right" autoClose={2000} />
                  
                  {/* Header */}
                  <div className="WorkOrderReportV2-header d-flex justify-content-between align-items-center mb-0 p-1 bg-white border-bottom">
                    <h6 className="header-title mb-0" style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold' }}>Work Order List</h6>
                    <div className="header-actions d-flex gap-2">
                        <button className="erp-btn-grey-sm border d-flex align-items-center gap-1">
                           <span style={{color:'orange'}}>📊</span> WorkOrder : Report
                        </button>
                        <button className="erp-btn-grey-sm border d-flex align-items-center gap-1">
                           <span style={{color:'blue'}}>🔍</span> Work Order - Query
                        </button>
                    </div>
                  </div>

                  {/* High Density Filter Bar */}
                  <div className="WorkOrderReportV2-Filters p-1 border-bottom bg-white shadow-sm">
                    <div className="d-flex align-items-center gap-2 flex-wrap" style={{ fontSize: '11px' }}>
                      
                      <div className="d-flex align-items-center gap-1 border-end pe-2">
                        <input type="radio" id="woDate" name="dateType" checked={filters.dateType === "WO Date"} onChange={() => setFilters(p => ({...p, dateType: "WO Date"}))} />
                        <label htmlFor="woDate" className="mb-0">WO Date</label>
                        <input type="radio" id="targetDate" name="dateType" checked={filters.dateType === "Target Date"} onChange={() => setFilters(p => ({...p, dateType: "Target Date"}))} />
                        <label htmlFor="targetDate" className="mb-0">Target Date</label>
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <input type="date" className="form-control form-control-xs" style={{ width: '105px' }} />
                        <input type="date" className="form-control form-control-xs" style={{ width: '105px' }} />
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <label className="mb-0">Plant:</label>
                        <select className="form-select form-select-xs" style={{ width: '70px' }}>
                          <option>SHARP</option>
                        </select>
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <label className="mb-0">Status:</label>
                        <select className="form-select form-select-xs" style={{ width: '60px' }}>
                          <option>ALL</option>
                        </select>
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <label className="mb-0">Type:</label>
                        <select className="form-select form-select-xs" style={{ width: '60px' }}>
                          <option>ALL</option>
                        </select>
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <label className="mb-0">Series:</label>
                        <select className="form-select form-select-xs" style={{ width: '80px' }}>
                          <option>Select</option>
                        </select>
                      </div>

                      <div className="d-flex align-items-center gap-1 border-end pe-2">
                        <label className="mb-0">Auth:</label>
                        <select className="form-select form-select-xs" style={{ width: '60px' }}>
                          <option>ALL</option>
                        </select>
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <input type="checkbox" id="checkCust" />
                        <label htmlFor="checkCust" className="mb-0">Customer Name:</label>
                        <input type="text" className="form-control form-control-xs" placeholder="Name..." style={{ width: '90px' }} />
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <input type="checkbox" id="checkItem" />
                        <label htmlFor="checkItem" className="mb-0">Item Name:</label>
                        <input type="text" className="form-control form-control-xs" placeholder="Item Code.." style={{ width: '90px' }} />
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <input type="checkbox" id="checkWO" />
                        <label htmlFor="checkWO" className="mb-0">WO.No:</label>
                        <input type="text" className="form-control form-control-xs" placeholder="WO NO" style={{ width: '60px' }} />
                      </div>

                      <button className="erp-btn-grey-sm border px-2 py-0 d-flex align-items-center gap-1">
                        <FaSearch size={10} /> Search
                      </button>
                      <button className="erp-btn-grey-sm border px-2 py-0 d-flex align-items-center gap-1">
                        <span style={{color:'green'}}>🔍</span> Search Option
                      </button>
                      <FaRedo size={12} className="text-primary cursor-pointer" />
                    </div>
                  </div>

                  {/* Table Area */}
                  <div className="WorkOrderReportV2-TableContainer bg-white border mt-1" style={{ overflowX: 'auto' }}>
                    <table className="erp-table w-100">
                      <thead>
                        <tr>
                          {tableHeaders.map((h, i) => (
                            <th key={i}>{h}</th>
                          ))}
                          <th><input type="checkbox" /></th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Empty Body as per screenshot */}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Action */}
                  <div className="WorkOrderReportV2-Footer d-flex justify-content-between align-items-center p-1 bg-light border-top mt-1" style={{ fontSize: '11px' }}>
                    <div className="fw-bold">Total Record: 0</div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="text-primary fw-bold">Total Qty : 0</div>
                        <select className="form-select form-select-xs" style={{ width: '70px' }}>
                          <option>PDF</option>
                          <option>EXCEL</option>
                        </select>
                        <button className="erp-btn-grey-sm border d-flex align-items-center gap-1">
                           <FaEnvelope size={10} /> Send Email
                        </button>
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

export default WorkOrderReportV2;
