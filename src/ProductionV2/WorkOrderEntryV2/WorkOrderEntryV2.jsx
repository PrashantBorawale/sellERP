import React, { useState, useEffect } from "react";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaPlus, FaClock, FaList, FaTrash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./WorkOrderEntryV2.css";

const WorkOrderEntryV2 = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    plant: "SHARP",
    woSeries: "Select",
    woNo: "",
    woType: "Select",
    woDate: new Date().toISOString().split('T')[0],
    scheduleMonth: "MAY-2026",
    targetDate: new Date().toISOString().split('T')[0],
    customer: "",
    po: "",
    item: ""
  });

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const tableHeaders = [
    "Sr.", "PO Details", "Item No", "Description", "SO.Qty/Sch.Qty", 
    "Bal.Qty", "Work Order Qty", "Remark", "Machine", "Shift", "Process", 
    "Raw Material", "BOM", "Del."
  ];

  return (
    <div className="WorkOrderEntryV2Master">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="WorkOrderEntryV2 p-2">
                  <ToastContainer position="top-right" autoClose={2000} />
                  
                  {/* Header */}
                  <div className="WorkOrderEntryV2-header d-flex justify-content-between align-items-center mb-0 p-1 bg-white border-bottom">
                    <div className="d-flex align-items-center gap-3">
                        <h6 className="header-title mb-0" style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold' }}>New Work Order</h6>
                        <div className="d-flex align-items-center gap-1" style={{fontSize: '11px'}}>
                            <label className="mb-0">Plant :</label>
                            <select className="form-select form-select-xs" style={{width: '90px'}}>
                                <option>SHARP</option>
                            </select>
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="erp-btn-grey-sm border d-flex align-items-center gap-1">
                           <FaList size={10} style={{color: 'red'}} /> WorkOrder List
                        </button>
                    </div>
                  </div>

                  {/* High Density Form Section */}
                  <div className="WorkOrderEntryV2-Filters p-3 border-bottom bg-white shadow-sm mt-1">
                    <div className="row g-4" style={{ fontSize: '11px' }}>
                      
                      {/* Column 1 */}
                      <div className="col-md-3">
                         <div className="d-flex align-items-center mb-2">
                            <label className="fw-bold form-label-width">WO Series:</label>
                            <select className="form-select form-select-xs"><option>Select</option></select>
                         </div>
                         <div className="d-flex align-items-center mb-2">
                            <label className="fw-bold form-label-width">WO Type:</label>
                            <select className="form-select form-select-xs"><option>Select</option></select>
                         </div>
                         <div className="d-flex align-items-center">
                            <label className="fw-bold form-label-width">Schedule Month:</label>
                            <select className="form-select form-select-xs"><option>MAY-2026</option></select>
                         </div>
                      </div>

                      {/* Column 2 */}
                      <div className="col-md-3">
                         <div className="d-flex align-items-center mb-2">
                            <label className="fw-bold form-label-width">WO No:</label>
                            <input type="text" className="form-control form-control-xs" defaultValue="0" />
                         </div>
                         <div className="d-flex align-items-center mb-2">
                            <label className="fw-bold form-label-width">WO Date:</label>
                            <input type="date" className="form-control form-control-xs" defaultValue="2026-05-12" />
                         </div>
                         <div className="d-flex align-items-center">
                            <label className="fw-bold form-label-width">Schedule/Target Date:</label>
                            <input type="date" className="form-control form-control-xs" defaultValue="2026-05-12" />
                         </div>
                      </div>

                      {/* Column 3 */}
                      <div className="col-md-3">
                         <div className="d-flex align-items-center mb-2">
                            <label className="fw-bold form-label-width">Select Cust:</label>
                            <div className="input-group input-group-xs">
                                <input type="text" className="form-control form-control-xs" placeholder="Enter Name.." />
                                <button className="btn btn-outline-secondary p-0 px-1 border-start-0"><FaSearch size={10}/></button>
                            </div>
                         </div>
                         <div className="d-flex align-items-center mb-2">
                            <label className="fw-bold form-label-width">Select PO:</label>
                            <select className="form-select form-select-xs"><option></option></select>
                         </div>
                         <div className="d-flex align-items-center">
                            <label className="fw-bold form-label-width text-primary">Select Item:</label>
                            <div className="input-group input-group-xs">
                                <input type="text" className="form-control form-control-xs" placeholder="Enter Code No.." />
                                <button className="btn btn-outline-secondary p-0 px-1 text-success border-start-0"><FaPlus size={10} /> Add</button>
                            </div>
                         </div>
                      </div>

                      {/* Column 4 - Action Buttons */}
                      <div className="col-md-3 d-flex flex-column gap-2 justify-content-center">
                         <button className="erp-action-btn w-100 text-start">
                            <FaClock className="text-info me-2" /> Pending CustPO For WorkOrder
                         </button>
                         <button className="erp-action-btn w-100 text-start">
                            <span className="me-2">⇌</span> Add All Item
                         </button>
                         <button className="erp-action-btn w-100 text-start">
                            <span className="me-2">⇌</span> Production From Existing Stock
                         </button>
                      </div>

                    </div>
                  </div>

                  {/* Table Area */}
                  <div className="WorkOrderEntryV2-TableContainer bg-white border mt-1" style={{ overflowX: 'auto' }}>
                    <table className="erp-table w-100">
                      <thead>
                        <tr>
                          {tableHeaders.map((h, i) => (
                            <th key={i}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td></td>
                          <td><div className="border p-1" style={{width:'30px', height:'25px', margin:'auto'}}><span style={{fontSize:'10px'}}>🖼️</span></div></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td><input type="text" className="form-control form-control-xs text-center" /></td>
                          <td><textarea className="form-control form-control-xs" rows="1"></textarea></td>
                          <td><select className="form-select form-select-xs"><option>Select an ...</option></select></td>
                          <td><select className="form-select form-select-xs"><option></option></select></td>
                          <td><select className="form-select form-select-xs"><option></option></select></td>
                          <td><div className="d-flex flex-column" style={{fontSize: '9px'}}><select className="form-select form-select-xs p-0"><option></option></select><span className="text-primary text-start">Stock</span></div></td>
                          <td><div className="d-flex flex-column text-primary" style={{fontSize: '9px'}}><span>View 1</span><span>View 2</span></div></td>
                          <td><button className="btn btn-sm p-0 px-1 border"><FaTrash size={10} className="text-danger" /></button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Notes & Footer */}
                  <div className="WorkOrderEntryV2-Bottom mt-1">
                    <div className="row g-2">
                        {["Note 1 :", "Note 2 :", "Note 3 :"].map((note, i) => (
                            <div className="col-md-4" key={i}>
                                <div className="d-flex align-items-center gap-1">
                                    <label className="fw-bold" style={{fontSize: '11px', whiteSpace:'nowrap'}}>{note}</label>
                                    <textarea className="form-control form-control-xs" rows="2"></textarea>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                        <button className="erp-btn-grey-sm border px-3 py-1 d-flex align-items-center gap-1">
                           <span className="text-success">✔</span> Save Work Order
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

export default WorkOrderEntryV2;
