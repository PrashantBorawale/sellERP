import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./CommodityMaster.css";

const CommodityMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  return (
    <div className="erp-page CommodityMaster">
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
                <div className="CommodityMaster1 overflow-hidden p-4">
                
                  <div className="erp-header mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title mb-0">Commodity Master</h5>
                      <div className="d-flex gap-2">
                        <button className="vndrbtn">Export Report</button>
                      </div>
                    </div>
                  </div>
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 align-items-end">
                        <div className="col-md-3 text-start">
                          <label htmlFor="commodityName" className="form-label text-start w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                            Commodity Name <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" id="commodityName" />
                        </div>
                        <div className="col-md-3 text-start">
                          <label htmlFor="tariffNo" className="form-label text-start w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                            Tariff No <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" id="tariffNo" />
                        </div>
                        <div className="col-md-2 mt-auto text-start">
                          <button className="vndrbtn w-100">Save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="CommodityTable mt-5">
                    <div className="container-fluid">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                          <thead className="table-primary">
                            <tr>
                              <th scope="col">No Found Data!!</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div
                    className="record-count text-start"
                    style={{ color: "blue", padding: "10px" }}
                  >
                    Total Records: 00
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

export default CommodityMaster;
