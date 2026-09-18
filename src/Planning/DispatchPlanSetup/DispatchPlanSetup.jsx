import React, { useState, useEffect } from "react";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaPrint, FaFileExcel, FaEye, FaSave, FaPlay } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DispatchPlanSetup.css";

const DispatchPlanSetup = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [currentView, setCurrentView] = useState("setup"); // "setup" or "viewReport"
  
  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  const renderSetupView = () => (
    <div className="DispatchPlanSetup p-2">
      <ToastContainer position="top-right" autoClose={2000} />
      
      {/* Header */}
      <div className="DispatchPlanSetup-header d-flex justify-content-between align-items-center mb-0 p-1 bg-white border-bottom">
        <h6 className="header-title mb-0" style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold' }}>Dispatch Plan Setup</h6>
        <div className="header-actions d-flex gap-2">
            <button className="erp-btn-grey-sm d-flex align-items-center gap-1 border">
               <FaFileExcel size={10} style={{ color: 'green' }} /> Export Report
            </button>
            <button className="erp-btn-grey-sm d-flex align-items-center gap-1 border" onClick={() => setCurrentView("viewReport")}>
               <FaEye size={10} /> View Dispatch Plan
            </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="DispatchPlanSetup-Filters p-2 border-bottom bg-white shadow-sm">
        <div className="d-flex align-items-center gap-3 flex-wrap" style={{ fontSize: '11px' }}>
          <div className="d-flex align-items-center gap-2 border-end pe-2">
            <div className="d-flex align-items-center gap-1">
              <input type="radio" id="weekDay" name="planType" defaultChecked />
              <label htmlFor="weekDay" className="mb-0 fw-bold">WeekDay</label>
            </div>
            <div className="d-flex align-items-center gap-1">
              <input type="radio" id="daily" name="planType" />
              <label htmlFor="daily" className="mb-0 fw-bold">Daily</label>
            </div>
          </div>

          <div className="d-flex align-items-center gap-1">
            <label className="fw-bold">Customer :</label>
            <input type="text" className="form-control form-control-xs" placeholder="Please enter Name..." style={{ width: '180px' }} />
          </div>

          <div className="d-flex align-items-center gap-2 border-start ps-2 border-end pe-2 flex-wrap">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <div className="d-flex align-items-center gap-1" key={day}>
                <input type="checkbox" id={day} />
                <label htmlFor={day} className="mb-0">{day}</label>
              </div>
            ))}
          </div>

          <div className="d-flex align-items-center gap-1">
            <label className="fw-bold">Employee :</label>
            <select className="form-select form-select-xs" style={{ width: '150px' }}>
              <option>Select</option>
            </select>
          </div>

          <button className="erp-btn-grey-sm d-flex align-items-center gap-1 border px-2 py-1">
            Save
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="DispatchPlanSetup-Content bg-white border" style={{ height: 'calc(100vh - 200px)', marginTop: '2px' }}>
        <div className="p-2 text-danger fw-bold" style={{ fontSize: '12px' }}>
          No Data Found !!!
        </div>
      </div>
    </div>
  );

  const renderReportView = () => (
    <div className="DispatchPlanSetup p-2">
      <ToastContainer position="top-right" autoClose={2000} />
      
      {/* Header */}
      <div className="DispatchPlanSetup-header d-flex justify-content-between align-items-center mb-0 p-1 bg-white border-bottom">
        <h6 className="header-title mb-0" style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold' }}>Dispatch Plan</h6>
        <div className="header-actions d-flex gap-2">
            <button className="erp-btn-grey-sm d-flex align-items-center gap-1 border">
               <FaFileExcel size={10} style={{ color: 'green' }} /> Export Report
            </button>
            <button className="erp-btn-grey-sm d-flex align-items-center gap-1 border" onClick={() => setCurrentView("setup")}>
               Back
            </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="DispatchPlanSetup-Filters p-2 border-bottom bg-white shadow-sm">
        <div className="d-flex align-items-center gap-3 flex-wrap" style={{ fontSize: '11px' }}>
          <div className="d-flex align-items-center gap-1">
            <label className="fw-bold">Select Month :</label>
            <select className="form-select form-select-xs" style={{ width: '100px' }}>
              <option>Select</option>
            </select>
          </div>

          <div className="d-flex align-items-center gap-1">
            <label className="fw-bold">Employee :</label>
            <select className="form-select form-select-xs" style={{ width: '150px' }}>
              <option>ALL</option>
            </select>
          </div>

          <button className="erp-btn-grey-sm d-flex align-items-center gap-1 border px-2 py-1 bg-light">
            <FaPlay size={10} className="text-primary" /> Execute
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="DispatchPlanSetup-Content bg-white border" style={{ height: 'calc(100vh - 200px)', marginTop: '2px' }}>
         {/* Table or Data area */}
      </div>
    </div>
  );

  return (
    <div className="DispatchPlanSetupMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                {currentView === "setup" ? renderSetupView() : renderReportView()}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispatchPlanSetup;
