import React, { useState, useEffect } from "react";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PunchingProgram.css";

const PunchingProgram = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  const tableHeaders = [
    "Sr.", "Sch. Date", "Priority", "WO No", "Description", "Order Qty", 
    "Punched Qty", "Bal.Qty", "Sheet Thk", "Sheet Size", "Material", 
    "Sheet Avail.", "Program No", "Status", "Doc.", "Remark"
  ];

  return (
    <div className="PunchingProgramMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="PunchingProgram p-2">
                  <ToastContainer position="top-right" autoClose={2000} />
                  
                  {/* Header */}
                  <div className="PunchingProgram-header p-1 bg-white border-bottom">
                    <h6 className="header-title mb-0" style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold', paddingLeft: '10px' }}>Punching Program</h6>
                  </div>

                  {/* Filter Section */}
                  <div className="PunchingProgram-Filters p-2 border-bottom bg-white shadow-sm mt-1">
                    <div className="d-flex align-items-center gap-3 flex-wrap" style={{ fontSize: '11px' }}>
                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold">From :</label>
                        <input type="date" className="form-control form-control-xs" style={{ width: '105px' }} defaultValue="2026-05-10" />
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <label className="fw-bold">To Date :</label>
                        <input type="date" className="form-control form-control-xs" style={{ width: '105px' }} defaultValue="2026-05-12" />
                      </div>
                      <button className="erp-btn-grey-sm border px-3 py-0 d-flex align-items-center gap-1">
                        <FaSearch size={10} /> Search
                      </button>
                    </div>
                  </div>

                  {/* Table Area */}
                  <div className="PunchingProgram-TableContainer bg-white border mt-1" style={{ overflowX: 'auto', height: 'calc(100vh - 250px)' }}>
                    <table className="erp-table w-100">
                      <thead>
                        <tr>
                          {tableHeaders.map((h, i) => (
                            <th key={i}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Empty Body as per screenshot */}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer */}
                  <div className="PunchingProgram-Footer p-1 bg-light border-top mt-1" style={{ fontSize: '11px', fontWeight: 'bold' }}>
                    Total Records : 0
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

export default PunchingProgram;
