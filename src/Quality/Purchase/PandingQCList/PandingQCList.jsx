import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import * as XLSX from "xlsx";
import "./PandingQCList.css";
// import { FaEdit, FaTrash } from "react-icons/fa";

const PandingQCList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [qcList, setQcList] = useState([]);

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

  useEffect(() => {
    // setQcList(dummyData); // Uncomment and ensure dummyData is defined
  }, []);

  const handleExportExcel = () => {
    // Currently no dynamic data array exists in this component.
    // When API fetching is implemented, map that data here instead.
    alert("No data to export");
  };

  return (
    <div className="PandingQCListMaster">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="PandingQCList">
                  <div className="PandingQCList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title mb-0"> <span className="purch">Purchase GRN : </span> Pending QC List </h5>
                      </div>
                      <div className="col-md-8 d-flex justify-content-md-end mt-3 mt-md-0">
                        <button type="button" className="vndrbtn" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}>
                          Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>
  
                  <div className="PandingQCList-Main">
                    <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <div className="row g-3 text-start align-items-end">
                          {/* Plant */}
                          <div className="col-md-2">
                            <label className="form-label">Plant :</label>
                            <select className="form-select">
                              <option>SHARP</option>
                              <option>DI</option>
                            </select>
                          </div>
  
                          {/* From Date */}
                          <div className="col-md-2">
                            <label className="form-label">From:</label>
                            <input type="date" className="form-control" />
                          </div>
  
                          {/* To Date */}
                          <div className="col-md-2">
                            <label className="form-label">To Date:</label>
                            <input type="date" className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">Main Group :</label>
                            <select className="form-select">
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
  
                          {/* Item Name */}
                          <div className="col-md-2">
                            <label className="form-label">Item Group:</label>
                            <select className="form-select">
                              <option>ALL</option>
                              <option>BEARING</option>
                              <option>BELTS</option>
                              <option>CAMS</option>
                              <option>COLLECTS & HOLDERS</option>
                              <option>COMPUTER</option>
                              <option>CUTTING TOOLS</option>
                              <option>ELECTRICAL PARTS</option>
                              <option>END PIECE</option>
                              <option>FIXCTURE</option>
                              <option>FORMING TOOLS</option>
                              <option>GAUGES & INSTUMENTS</option>
                              <option>GENRAL</option>
                              <option>HOLDERS</option>
                              <option>INSERTS</option>
                              <option>IT SUPPORTS</option>
                              <option>MACHINE SPARE</option>
                              <option>MACHINING</option>
                              <option>OIL & LUBRICANTS</option>
                              <option>PACKING</option>
                              <option>SERVICES</option>
                              <option>STATIONARY</option>
                              <option>TOOLING SPARE</option>
                            </select>
                          </div>
  
                          {/* Supplier Name */}
                          <div className="col-md-2">
                            <label className="form-label">Supplier Name:</label>
                            <input type="text" placeholder="Name..." className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <label className="form-label">Item No Desc:</label>
                            <input type="text" placeholder="Item..." className="form-control" />
                          </div>
                          <div className="col-md-2">
                            <label className="form-label">PO No:</label>
                            <input type="text" placeholder="PO No..." className="form-control" />
                          </div>
                          <div className="col-md-2">
                            <label className="form-label">GRN No:</label>
                            <input type="text" placeholder="GRN No..." className="form-control" />
                          </div>
  
                          <div className="col-md-2">
                            <button type="button" className="vndrbtn w-100" style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr No</th>
                          <th scope="col">Year</th>
                          <th scope="col">Plant</th>
                          <th scope="col">Return No</th>
                          <th scope="col">Return Date</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Item Code</th>
                          <th scope="col">Item Desc</th>
                          <th scope="col">Return Qty</th>
                          <th scope="col">User</th>
                          <th scope="col">QC</th>
                        </tr>
                      </thead>
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

export default PandingQCList;