import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import * as XLSX from "xlsx";

import "react-toastify/dist/ReactToastify.css";
import "./RMStoclTransaction.css";
import { Link } from "react-router-dom";
const RMStockTransaction = () => {
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

    const handleExportExcel = () => {
      // Currently no dynamic data array exists in this component.
      // When API fetching is implemented, map that data here instead.
      alert("No data to export");
    };

  return (
    <div className="NewStoreRMStock">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="erp-header mb-4 mt-4">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h5 className="header-title mb-0">RM Stock Transaction Report</h5>
                    <div className="d-flex gap-2 flex-wrap">
                      <button className="vndrbtn" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}>Export To Excel</button>
                      <Link className="vndrbtn" to="/RMTOtherGroup" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>RM To Other Group</Link>
                      <Link className="vndrbtn" to="/RMToTransaction" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>RM To RM Transaction</Link>
                    </div>
                  </div>
                </div>
<div className="RMStock-main">
                  <div className="container-fluid">
                    <div className="card shadow-sm border-0 mb-4 mt-4" style={{ borderRadius: '12px' }}>
  <div className="card-body">
    <form className="row g-3 align-items-end text-start">
      {/* From Date */}
      <div className="col-md-2 col-sm-6">
        <label className="form-label mb-1" style={{ fontSize: '0.85rem' }}>From Date</label>
        <input type="date" className="form-control form-control-sm" />
      </div>

      {/* To Date */}
      <div className="col-md-2 col-sm-6">
        <label className="form-label mb-1" style={{ fontSize: '0.85rem' }}>To Date</label>
        <input type="date" className="form-control form-control-sm" />
      </div>

      {/* Plant */}
      <div className="col-md-2 col-sm-6">
        <label className="form-label mb-1" style={{ fontSize: '0.85rem' }}>Plant</label>
        <select className="form-select form-select-sm">
          <option value="Produlink">Produlink</option>
          {/* Add more options here */}
        </select>
      </div>

      {/* Series */}
      <div className="col-md-2 col-sm-6">
        <label className="form-label mb-1" style={{ fontSize: '0.85rem' }}>Series</label>
        <select className="form-select form-select-sm">
          <option value="">All</option>
          <option value="Scrap">Scrap</option>
          <option value="Rejection">Rejection</option>
          <option value="RM To RM">RM To RM</option>
          <option value="RM to End Pices">RM to End Pices</option>
        </select>
      </div>

      {/* Item Name */}
      <div className="col-md-2 col-sm-6">
        <label className="form-label mb-1" style={{ fontSize: '0.85rem' }}>Search Item Code</label>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Enter Item Name"
        />
      </div>

      {/* Search Button */}
      <div className="col-md-2 col-sm-6">
        <button type="submit" className="btn btn-primary w-100" style={{ height: '31px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to right, #3b82f6, #4f46e5)', border: 'none' }}>
          Search
        </button>
      </div>
    </form>
  </div>
</div>
                  </div>

                  <div className="StoreRMStock">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr</th>
                              <th>Year</th>
                              <th>##</th>
                              <th>Trn No.</th>
                              <th>Trn Date</th>
                              <th>Type</th>
                              <th>Item No(from)</th>
                              <th>Item Desc (from)</th>
                              <th>Heat (Dr)</th>
                              <th>Qty (Dr)</th>
                              <th>UOM</th>
                              <th>Item No(To)</th>
                              <th>Item Desc(To)</th>
                              <th>Heat(cr)</th>
                              <th>Qty (Cr)</th>
                              <th>UOM</th>
                              <th>User</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Table rows will go here */}
                          </tbody>
                        </table>
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
  )
}

export default RMStockTransaction
