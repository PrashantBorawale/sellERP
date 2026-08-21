import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { FaDownload, FaSearch } from "react-icons/fa";

const MaterialIssueReport = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="erp-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  
                  {/* Header */}
                  <div className="erp-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h5 className="header-title" style={{ fontWeight: 800, fontSize: '1.5rem', background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 0 }}>
                          Work Order Material Issue Report
                        </h5>
                      </div>
                      <div className="col-md-4 text-end">
                        <button type="button" className="vndrbtn bg-success border-success">
                          <FaDownload className="me-2" /> Export Report
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter / Search Section */}
                  <div className="centerMain mt-4">
                    <div className="row g-3 align-items-end text-start">
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">Wo Date:</label>
                        <input type="date" className="form-control form-control-sm" />
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">Target Date:</label>
                        <input type="date" className="form-control form-control-sm" />
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">Plant:</label>
                        <select className="form-select form-select-sm">
                          <option>Produlink</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">Series:</label>
                        <select className="form-select form-select-sm">
                          <option>Select</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-2">
                        <label className="fw-bold text-secondary small mb-1">Report Type:</label>
                        <select className="form-select form-select-sm">
                          <option>Details</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">Is Pending:</label>
                        <select className="form-select form-select-sm">
                          <option>All</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-2">
                        <label className="fw-bold text-secondary small mb-1">Customer Name:</label>
                        <input type="text" className="form-control form-control-sm" placeholder="Enter name" />
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">Item Name:</label>
                        <input type="text" className="form-control form-control-sm" placeholder="Item" />
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">Main Group:</label>
                        <select className="form-select form-select-sm">
                          <option>Select</option>
                          <option>FG</option>
                          <option>RM</option>
                          <option>Tools</option>
                          <option>Instrument</option>
                          <option>Machine</option>
                          <option>Consumable</option>
                          <option>Safety Equ</option>
                          <option>Service</option>
                          <option>Asset</option>
                          <option>F4</option>
                          <option>Scrap</option>
                          <option>SF</option>
                          <option>BO</option>
                          <option>DI</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-1 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">Project:</label>
                        <select className="form-select form-select-sm">
                          <option>Details</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-1 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">WOrder No:</label>
                        <input type="text" className="form-control form-control-sm" placeholder="WO No" />
                      </div>
                      <div className="col-sm-6 col-md-1 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">SO No:</label>
                        <input type="text" className="form-control form-control-sm" placeholder="SO No" />
                      </div>
                      <div className="col-sm-12 col-md-1 col-lg-1">
                        <button type="button" className="vndrbtn bg-primary border-primary w-100">
                          <FaSearch /> Search
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Data Table */}
                  <div className="centerMain mt-3">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', padding: '12px' }}>No Data.</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* <tr><td>...</td></tr> */}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaterialIssueReport;
