import React, { useState, useEffect } from "react";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { FaSearch, FaFileExcel } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContractorWorkOrderList.css";

const ContractorWorkOrderList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  const tableHeaders = [
    "No.", "WO No", "Cust PO No", "Cont WO No", "Issue Date", "Contractor", 
    "Item No", "Item Code", "Item Desc", "Operation Name", "Qty", "Delete"
  ];

  return (
    <div className="ContractorWorkOrderListMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="ContractorWorkOrderList p-2">
                  <ToastContainer position="top-right" autoClose={2000} />
                  
                  {/* Header */}
                  <div className="ContractorWorkOrderList-header d-flex justify-content-between align-items-center mb-0 p-1 bg-white border-bottom">
                    <h6 className="header-title mb-0" style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold', paddingLeft: '10px' }}>Contractor Work Order List</h6>
                    <button className="erp-btn-grey-sm border d-flex align-items-center gap-1">
                       <FaFileExcel size={12} className="text-success" /> Export
                    </button>
                  </div>

                  {/* Filter Section */}
                  <div className="ContractorWorkOrderList-Filters p-2 border-bottom bg-white shadow-sm mt-1">
                    <div className="d-flex align-items-center gap-3 flex-wrap" style={{ fontSize: '11px' }}>
                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold">From :</label>
                        <input type="date" className="form-control form-control-xs" style={{ width: '105px' }} defaultValue="2026-05-10" />
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold">To Date :</label>
                        <input type="date" className="form-control form-control-xs" style={{ width: '105px' }} defaultValue="2026-05-12" />
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <input type="checkbox" id="checkCont" />
                        <label htmlFor="checkCont" className="fw-bold mb-0">Contractor Name :</label>
                        <select className="form-select form-select-xs" style={{ width: '120px' }}><option>Select</option></select>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <input type="checkbox" id="checkItem" />
                        <label htmlFor="checkItem" className="fw-bold mb-0">Item :</label>
                        <input type="text" className="form-control form-control-xs" placeholder="Enter Item Code.." style={{ width: '120px' }} />
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <input type="checkbox" id="checkWO" />
                        <label htmlFor="checkWO" className="fw-bold mb-0">WO No :</label>
                        <input type="text" className="form-control form-control-xs" placeholder="No..." style={{ width: '80px' }} />
                      </div>
                      <button className="erp-btn-grey-sm border px-3 py-0 d-flex align-items-center gap-1">
                        <FaSearch size={10} /> Search
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="ContractorWorkOrderList-Content bg-white border mt-1" style={{ height: 'calc(100vh - 250px)' }}>
                    <div className="p-2 text-danger fw-bold" style={{ fontSize: '12px' }}>
                      No Data Found !!
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="ContractorWorkOrderList-Footer p-1 bg-light border-top mt-1" style={{ fontSize: '11px', fontWeight: 'bold' }}>
                    Total Record: 0
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

export default ContractorWorkOrderList;
