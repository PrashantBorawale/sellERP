import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaPrint, FaFileExcel } from "react-icons/fa";
import "./UpcomingDispatchList.css";

const UpcomingDispatchList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [dateType, setDateType] = useState("plan"); // 'plan' or 'due'
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterCustomer, setFilterCustomer] = useState(false);
  const [filterItem, setFilterItem] = useState(false);
  const [filterPO, setFilterPO] = useState(false);
  
  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  return (
    <div className="UpcomingDispatchListMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                <div className="UpcomingDispatchList mt-2 border rounded shadow-sm">
                  {/* Header */}
                  <div className="UpcomingDispatchList-header d-flex justify-content-between align-items-center p-1 bg-white border-bottom">
                    <h6 className="header-title mb-0">Upcoming Dispatch List</h6>
                    <div className="header-actions d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center gap-1" style={{ fontSize: '11px' }}>
                           <label className="mb-0 fw-bold">Format :</label>
                           <select className="form-select form-select-xs" style={{ width: '60px' }}>
                              <option>F1</option>
                           </select>
                        </div>
                        <button className="erp-btn-grey-sm d-flex align-items-center gap-1">
                           <FaPrint size={10} /> Print Report
                        </button>
                        <button className="erp-btn-grey-sm d-flex align-items-center gap-1">
                           <FaFileExcel size={10} /> Export To Excel
                        </button>
                    </div>
                  </div>

                  {/* Filter Bar */}
                  <div className="UpcomingDispatchList-Filters p-2 bg-white">
                    <div className="d-flex align-items-center gap-3 flex-wrap">
                      <div className="d-flex align-items-center gap-2 border-end pe-2">
                        <div className="d-flex align-items-center gap-1">
                           <input type="radio" id="planDate" name="dateType" checked={dateType === "plan"} onChange={() => setDateType("plan")} />
                           <label htmlFor="planDate" className="mb-0">Plan Date</label>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                           <input type="radio" id="dueDate" name="dateType" checked={dateType === "due"} onChange={() => setDateType("due")} />
                           <label htmlFor="dueDate" className="mb-0">Due Date</label>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-center gap-1">
                        <input type="date" className="form-control form-control-xs" style={{ width: '110px' }} value={fromDate} onChange={e => setFromDate(e.target.value)} />
                        <input type="date" className="form-control form-control-xs" style={{ width: '110px' }} value={toDate} onChange={e => setToDate(e.target.value)} />
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold">Type</label>
                        <select className="form-select form-select-xs" style={{ width: '80px' }}>
                           <option>ALL</option>
                        </select>
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold">Filter By</label>
                        <select className="form-select form-select-xs" style={{ width: '80px' }}>
                           <option>ALL</option>
                        </select>
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <input type="checkbox" checked={filterCustomer} onChange={e => setFilterCustomer(e.target.checked)} />
                        <label className="fw-bold">Select Customer :</label>
                        <input type="text" className="form-control form-control-xs" placeholder="Name..." style={{ width: '130px' }} />
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <input type="checkbox" checked={filterItem} onChange={e => setFilterItem(e.target.checked)} />
                        <label className="fw-bold">Select Item</label>
                        <input type="text" className="form-control form-control-xs" placeholder="Enter Item Code.." style={{ width: '130px' }} />
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <input type="checkbox" checked={filterPO} onChange={e => setFilterPO(e.target.checked)} />
                        <label className="fw-bold">Cust PONo :</label>
                        <input type="text" className="form-control form-control-xs" placeholder="Cust PO No.." style={{ width: '90px' }} />
                        <button className="erp-btn-grey-sm d-flex align-items-center gap-1">
                           <FaSearch size={10} /> Search
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Table Area Removed as per request */}
                  <div className="UpcomingDispatchList-Content bg-white" style={{ minHeight: '400px' }}>
                     {/* Table removed */}
                  </div>

                  {/* Footer */}
                  <div className="UpcomingDispatchList-Footer d-flex justify-content-between flex-wrap p-1 bg-white border-top">
                     <span>Total Record: Total Records : 0</span>
                     <div className="d-flex gap-3">
                        <span>Plan Qty : 0.00</span>
                        <span>Invoice Qty : 0.00</span>
                        <span>Balance Qty : 0.00</span>
                        <span>Balance Amount : 0.00</span>
                        <span>Delay Days : 0.00</span>
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

export default UpcomingDispatchList;
