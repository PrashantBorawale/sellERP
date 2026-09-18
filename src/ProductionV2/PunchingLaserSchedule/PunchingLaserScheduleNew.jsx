import React, { useState, useEffect } from "react";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PunchingLaserScheduleNew.css";

const PunchingLaserScheduleNew = () => {
  const navigate = useNavigate();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  return (
    <div className="PunchingLaserScheduleNewMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="PunchingLaserScheduleNew p-2">
                  <ToastContainer position="top-right" autoClose={2000} />
                  
                  {/* Header */}
                  <div className="PunchingLaserScheduleNew-header d-flex justify-content-between align-items-center mb-0 p-1 bg-white border-bottom">
                    <h6 className="header-title mb-0" style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold', paddingLeft: '10px' }}>Punching And Laser Schedule New</h6>
                    <button 
                      className="erp-btn-grey-sm border"
                      onClick={() => navigate("/PunchingLaserSchedule")}
                    >
                       View List
                    </button>
                  </div>

                  {/* Form Container */}
                  <div className="PunchingLaserScheduleNew-Form bg-white border p-3 mt-2 shadow-sm" style={{ maxWidth: '1000px', margin: 'auto' }}>
                    <div className="row g-3">
                      
                      {/* Column 1 */}
                      <div className="col-md-6">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <label className="fw-bold entry-label">Sr No :</label>
                          <input type="text" className="form-control form-control-xs bg-warning-subtle" defaultValue="1" style={{ width: '120px', border: '1px solid black' }} />
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <label className="fw-bold entry-label">Priority :</label>
                          <input type="text" className="form-control form-control-xs" style={{ width: '120px' }} />
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <label className="fw-bold entry-label">Select Item :</label>
                          <div className="input-group input-group-xs" style={{ width: '200px' }}>
                            <input type="text" className="form-control" placeholder="Enter Item Code.." />
                            <button className="btn btn-outline-secondary px-2"><FaSearch size={10} /> Search</button>
                          </div>
                        </div>
                        <div className="d-flex align-items-start gap-2 mb-2">
                          <label className="fw-bold entry-label">Description :</label>
                          <textarea className="form-control form-control-xs" rows="2" style={{ width: '250px' }} defaultValue="0"></textarea>
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <label className="fw-bold entry-label">Order Qty :</label>
                          <input type="text" className="form-control form-control-xs" style={{ width: '120px' }} defaultValue="0" />
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <label className="fw-bold entry-label">Punched Qty :</label>
                          <input type="text" className="form-control form-control-xs" style={{ width: '120px' }} defaultValue="0" />
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <label className="fw-bold entry-label">Sheet Thikness :</label>
                          <input type="text" className="form-control form-control-xs" style={{ width: '120px' }} defaultValue="0" />
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <label className="fw-bold entry-label">Sheet Size :</label>
                          <input type="text" className="form-control form-control-xs" style={{ width: '120px' }} defaultValue="0" />
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <label className="fw-bold entry-label">Material :</label>
                          <input type="text" className="form-control form-control-xs" style={{ width: '120px' }} defaultValue="0" />
                        </div>
                      </div>

                      {/* Column 2 */}
                      <div className="col-md-6">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <label className="fw-bold entry-label">Schedule Date :</label>
                          <input type="date" className="form-control form-control-xs" style={{ width: '140px' }} defaultValue="2026-05-12" />
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <label className="fw-bold entry-label">WO No :</label>
                          <input type="text" className="form-control form-control-xs" style={{ width: '120px' }} defaultValue="0" />
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <label className="fw-bold entry-label">Item Code :</label>
                          <input type="text" className="form-control form-control-xs" style={{ width: '120px' }} defaultValue="0" />
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2 mt-4 pt-4">
                          <label className="fw-bold entry-label">Process Detp :</label>
                          <select className="form-select form-select-xs" style={{ width: '120px' }}><option>Punching</option></select>
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <label className="fw-bold entry-label">Balance Qty :</label>
                          <input type="text" className="form-control form-control-xs" style={{ width: '120px' }} defaultValue="0" />
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <label className="fw-bold entry-label">Sheet Qty :</label>
                          <input type="text" className="form-control form-control-xs" style={{ width: '120px' }} defaultValue="0" />
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-5">
                          {/* Spacing to match screenshot layout */}
                        </div>
                        <div className="d-flex align-items-center gap-2 mt-3">
                          <label className="fw-bold entry-label">Availability :</label>
                          <input type="text" className="form-control form-control-xs" style={{ width: '120px' }} />
                        </div>
                      </div>

                      {/* Full Width Remark */}
                      <div className="col-12">
                        <div className="d-flex align-items-center gap-2">
                          <label className="fw-bold entry-label">Remark :</label>
                          <input type="text" className="form-control form-control-xs" style={{ width: '250px' }} />
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="col-12 mt-3">
                        <button className="erp-btn-grey-sm border px-4 py-1">Save</button>
                      </div>

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

export default PunchingLaserScheduleNew;
