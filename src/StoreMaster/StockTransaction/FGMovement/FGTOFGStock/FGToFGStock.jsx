import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import "./FGToFGStock.css";
import Cached from "@mui/icons-material/Cached.js";
import { Link } from "react-router-dom";
const FGToFGStock = () => {
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
    <div className="NewStoreFgMoventStock">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="FgMoventStock-header mb-4 mt-2 p-3 bg-white rounded-3 shadow-sm border">
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <h5 className="header-title mb-0" style={{ fontWeight: 800, fontSize: "1.8rem", background: "linear-gradient(90deg, #2563eb, #4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      FG To FG Stock Movement (Shop-Floor)
                    </h5>
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                      <select className="form-select" style={{ height: "34px", width: "auto" }}>
                        <option>Produlink</option>
                      </select>
                      <Link className="btn btn-success" to="/AddNewFGMovent" style={{ height: "34px", display: "flex", alignItems: "center" }}>
                        Add New FG Movement
                      </Link>
                      <Link className="btn btn-primary" to="/FG-Movement" style={{ height: "34px", display: "flex", alignItems: "center" }}>
                        FG Movement Report
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="FgMoventStock-main p-4 bg-white rounded-3 shadow-sm border mt-3">
                  <div className="container-fluid text-start p-0">
                    <div className="row g-4">
                      {/* Section 1: Source Stock */}
                      <div className="col-lg-6 col-md-12 border-end border-secondary-subtle pe-lg-4">
                        <h6 className="fw-bold text-primary mb-3 pb-2 border-bottom">Source Stock Details</h6>
                        
                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Trn No:</label>
                          </div>
                          <div className="col-sm-6">
                            <input className="form-control form-control-sm" placeholder="Trn No" />
                          </div>
                          <div className="col-sm-2 text-center">
                            <Cached className="text-primary cursor-pointer" style={{ cursor: "pointer" }} />
                          </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Tran. Date:</label>
                          </div>
                          <div className="col-sm-8">
                            <input className="form-control form-control-sm" type="date" />
                          </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Item Code:</label>
                          </div>
                          <div className="col-sm-8">
                            <input className="form-control form-control-sm" placeholder="Item Code" />
                          </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Part Code:</label>
                          </div>
                          <div className="col-sm-8">
                            <select className="form-select form-select-sm">
                              <option value="">Select Part Code</option>
                            </select>
                          </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Heat No:</label>
                          </div>
                          <div className="col-sm-8">
                            <select className="form-select form-select-sm">
                              <option value="">Select Heat No</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Target Transfer */}
                      <div className="col-lg-6 col-md-12 ps-lg-4">
                        <h6 className="fw-bold text-primary mb-3 pb-2 border-bottom">Select Item to Transfer Stock</h6>
                        
                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Item Code:</label>
                          </div>
                          <div className="col-sm-8">
                            <input className="form-control form-control-sm" placeholder="Transfer Item Code" />
                          </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Part Code:</label>
                          </div>
                          <div className="col-sm-8">
                            <select className="form-select form-select-sm">
                              <option value="">Select Part Code</option>
                            </select>
                          </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Heat No:</label>
                          </div>
                          <div className="col-sm-8">
                            <select className="form-select form-select-sm">
                              <option value="">Select Heat No</option>
                            </select>
                          </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                          <div className="col-sm-4">
                            <label className="form-label fw-semibold text-secondary mb-0">Transfer Qty:</label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control form-control-sm" placeholder="0" />
                          </div>
                          <div className="col-sm-4 pt-1 pt-sm-0">
                            <span className="badge bg-light text-dark border p-2 w-100 fw-semibold d-block text-truncate">
                              BOM WIP WT: = 0
                            </span>
                          </div>
                        </div>

                        <div className="row mb-3 align-items-start">
                          <div className="col-sm-4 pt-1">
                            <label className="form-label fw-semibold text-secondary mb-0">Remark:</label>
                          </div>
                          <div className="col-sm-8">
                            <textarea className="form-control form-control-sm" rows="2" placeholder="Enter remarks..."></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4 pt-3 border-top">
                      <div className="col-12 d-flex justify-content-end">
                        <button type="submit" className="btn btn-success px-5 py-2 fw-bold shadow-sm">
                          Save Movement
                        </button>
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

export default FGToFGStock;