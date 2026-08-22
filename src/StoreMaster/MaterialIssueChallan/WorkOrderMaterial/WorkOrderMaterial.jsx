import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import { FaDownload, FaSearch } from "react-icons/fa";
import * as XLSX from "xlsx";
import "./WorkOrderMaterial.css";

const WorkOrderMaterial = () => {
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

  const exportToExcel = () => {
    // Replace `exportData` with actual state data when API is integrated.
    const exportData = [];

    if (!exportData || exportData.length === 0) {
      alert("No data available to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Work Order Material");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, 20)
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Work_Order_Material_Issue_Report.xlsx");
  };

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
                        <button type="button" className="vndrbtn bg-success border-success" onClick={exportToExcel}>
                          <FaDownload className="me-2" /> Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter / Search Section */}
                  <div className="centerMain mt-4">
                    <div className="row g-3 align-items-end text-start">
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">From Date</label>
                        <input type="date" className="form-control form-control-sm" />
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">To Date</label>
                        <input type="date" className="form-control form-control-sm" />
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">Plant</label>
                        <select className="form-select form-select-sm">
                          <option value="">VISHWA S.I.</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">Series</label>
                        <select className="form-select form-select-sm">
                          <option value="">Select</option>
                          <option value="WorkOrder">WorkOrder</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-2">
                        <label className="fw-bold text-secondary small mb-1">Report Type</label>
                        <select className="form-select form-select-sm">
                          <option value="Details">Details</option>
                          <option value="Cumulative">Cumulative</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">Is Pending</label>
                        <select className="form-select form-select-sm">
                          <option value="All">All</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-2">
                        <label className="fw-bold text-secondary small mb-1">Item Name</label>
                        <input type="text" className="form-control form-control-sm" placeholder="Enter Item" />
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">Main Group</label>
                        <select className="form-select form-select-sm">
                          <option value="">ALL</option>
                          <option value="FG">FG</option>
                          <option value="RM">RM</option>
                          <option value="Tools">Tool</option>
                          <option value="Instrument">Instrument</option>
                          <option value="Machine">Machine</option>
                          <option value="Consumable">Consumable</option>
                          <option value="Safety Equ">Safety Equ</option>
                          <option value="Service">Service</option>
                          <option value="Asset">Asset</option>
                          <option value="F4">F4</option>
                          <option value="Scrap">Scrap</option>
                          <option value="SF">SF</option>
                          <option value="BO">BO</option>
                          <option value="DI">DI</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-1 col-lg-1">
                        <label className="fw-bold text-secondary small mb-1">WorderNo:</label>
                        <input type="text" className="form-control form-control-sm" placeholder="WO No" />
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
                            <th scope="col" style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', padding: '12px' }}>No Data Found!!</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Table rows will go here */}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-3 text-start">
                      <p className="fw-bold text-secondary mb-0">Total Records: 0</p>
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

export default WorkOrderMaterial;
