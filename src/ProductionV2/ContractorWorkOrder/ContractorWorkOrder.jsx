import React, { useState, useEffect } from "react";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaSave, FaTrash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContractorWorkOrder.css";

const ContractorWorkOrder = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  return (
    <div className="ContractorWorkOrderMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="ContractorWorkOrder p-2">
                  <ToastContainer position="top-right" autoClose={2000} />
                  
                  {/* Header */}
                  <div className="ContractorWorkOrder-header p-1 bg-white border-bottom">
                    <h6 className="header-title mb-0" style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold' }}>Contractor Work Order Entry</h6>
                  </div>

                  {/* Filter Section */}
                  <div className="ContractorWorkOrder-Filters p-2 border-bottom bg-white shadow-sm mt-1">
                    <div className="d-flex align-items-center gap-3 flex-wrap" style={{ fontSize: '11px' }}>
                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold">From Date :</label>
                        <input type="date" className="form-control form-control-xs" style={{ width: '105px' }} defaultValue="2026-05-12" />
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold">To Date :</label>
                        <input type="date" className="form-control form-control-xs" style={{ width: '105px' }} defaultValue="2026-05-12" />
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <input type="checkbox" id="checkCust" />
                        <label htmlFor="checkCust" className="fw-bold mb-0">Customer Name :</label>
                        <input type="text" className="form-control form-control-xs" placeholder="Name..." style={{ width: '120px' }} />
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <input type="checkbox" id="checkWO" />
                        <label htmlFor="checkWO" className="fw-bold mb-0">WO No:</label>
                        <input type="text" className="form-control form-control-xs" placeholder="WO NO..." style={{ width: '80px' }} />
                      </div>
                      <button className="erp-btn-grey-sm border px-2 py-0 d-flex align-items-center gap-1">
                        <FaSearch size={10} /> Search
                      </button>
                    </div>
                  </div>

                  {/* Table 1 */}
                  <div className="ContractorWorkOrder-TableContainer bg-white border mt-1" style={{ overflowX: 'auto', maxHeight: '200px' }}>
                    <table className="erp-table w-100">
                      <thead>
                        <tr>
                          {["No.", "WO No", "Cust PO No", "WO Date", "Cust.Code", "Cust.Name", "Item No", "Item Code", "Item Desc", "WO Qty", "Cont.WO Qty", "Select"].map((h, i) => (
                            <th key={i}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                          <td className="text-primary cursor-pointer">Select</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Entry Form */}
                  <div className="ContractorWorkOrder-EntryForm p-2 bg-white border mt-1">
                    <div className="d-flex align-items-center gap-4 flex-wrap" style={{ fontSize: '11px' }}>
                      <div className="fw-bold">WO No :</div>
                      <div className="fw-bold">Cust PO No :</div>
                      <div className="fw-bold">Item Details :</div>
                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold">Date :</label>
                        <input type="date" className="form-control form-control-xs" style={{ width: '105px' }} defaultValue="2026-05-12" />
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold">Contractor :</label>
                        <select className="form-select form-select-xs" style={{ width: '120px' }}><option>Select</option></select>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold">Operation :</label>
                        <select className="form-select form-select-xs" style={{ width: '120px' }}><option></option></select>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold">Qty :</label>
                        <input type="text" className="form-control form-control-xs" style={{ width: '60px' }} />
                      </div>
                      <div className="fw-bold">Bal Qty :</div>
                      <button className="erp-btn-grey-sm border px-3 py-1 d-flex align-items-center gap-1">
                        <span className="text-success">✔</span> Save
                      </button>
                    </div>
                  </div>

                  {/* Table 2 */}
                  <div className="ContractorWorkOrder-TableContainer bg-white border mt-1" style={{ overflowX: 'auto', height: 'calc(100vh - 500px)' }}>
                    <table className="erp-table w-100">
                      <thead>
                        <tr>
                          {["No.", "WO No", "Cust PO No", "Cont WO No", "Issue Date", "Contractor", "Item No", "Item Code", "Item Desc", "Operation Name", "Qty", "Delete"].map((h, i) => (
                            <th key={i}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                          <td className="text-primary cursor-pointer">Delete</td>
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

export default ContractorWorkOrder;
