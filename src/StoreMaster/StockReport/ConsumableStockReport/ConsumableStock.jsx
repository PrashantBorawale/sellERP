import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import "./ConsumableStock.css";

const ConsumableStock = () => {
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

  const [rows, setRows] = useState([]);
  
  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const currentRows = rows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportExcel = () => {
    // Currently no dynamic data array exists in this component.
    // When API fetching is implemented, map that data here instead.
    alert("No data to export");
  };

  return (
    <div className="ConsumableStock">
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
                <div className="ConsumableStock-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="header-title mb-0">Consumable Stock Report</h5>
                    <div className="d-flex gap-2">
                      <button type="button" className="vndrbtn" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}>Export To Excel</button>
                      {/* <Link type="button" className="vndrbtn" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>CON DataWise Stock</Link> */}
                    </div>
                  </div>
                </div>
                
                <div className="ConsumableStock-main mt-3">
                  <div className="container-fluid p-0">
                    <div className="card shadow-sm border-0 mb-4 mt-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <form className="row g-3 text-start align-items-end">
                          <div className="col-md-12 mb-2">
                            <div className="d-flex gap-4 align-items-center flex-wrap">
                              <label className="fw-bold mb-0">Filter By:</label>
                              <label className="d-flex align-items-center gap-2 mb-0">
                                <input type="radio" name="stockLevel" value="" />
                                All 
                              </label>
                              <label className="d-flex align-items-center gap-2 mb-0">
                                <input type="radio" name="stockLevel" value="" />
                                In Stock  
                              </label>
                              <label className="d-flex align-items-center gap-2 mb-0">
                                <input type="radio" name="stockLevel" value="" />
                                Out Of Stock 
                              </label>
                              <label className="d-flex align-items-center gap-2 mb-0">
                                <input type="radio" name="stockLevel" value="" />
                                Negative Stock 
                              </label>
                            </div>
                          </div>
                          
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="VISHWA S.I.">VISHWA S.I.</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Store</label>
                            <select className="form-select">
                              <option value="">Main Store</option>
                              {/* Add more options here */}
                            </select>
                          </div>    

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label"> Main Group</label>
                            <select className="form-select">
                              <option value="">Select</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label"> Group</label>
                            <select className="form-select">
                              <option value="">All</option>
                              {/* Add more options here */}
                            </select>
                          </div>


                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Sub Group</label>
                            <select className="form-select">
                              <option value="">All</option>
                              {/* Add more options here */}
                            </select>
                          </div> 

                          <div className="col-md-1 col-sm-6">
                            <label className="form-label"> Item </label>
                            <input type="text" className="form-control" />
                          </div>

                          {/* Search Button */}
                          <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="vndrbtn w-100" style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              Search
                            </button>
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreConsumableStock mt-4">
                    <div className="container-fluid p-0 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Item No</th>
                              <th>Item Desc</th>
                              <th>Item Size</th>
                              <th>Group Name</th>
                              <th>UnitCode</th>
                              <th>PO Bal. Qty</th>
                              <th>ShopFloor</th>
                              <th>Stock</th>
                              <th>Rate</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentRows.length > 0 ? (
                              currentRows.map((r, index) => (
                                <tr key={r.id || index}>
                                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                  <td>{r.item_no}</td>
                                  <td>{r.item_desc}</td>
                                  <td>{r.item_size}</td>
                                  <td>{r.group_name}</td>
                                  <td>{r.unit_code}</td>
                                  <td>{r.po_bal_qty}</td>
                                  <td>{r.shopfloor}</td>
                                  <td>{r.stock}</td>
                                  <td>{r.rate}</td>
                                  <td>{r.value}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="11" className="text-center py-4 text-muted">No data available</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Pagination Controls */}
                      {totalPages > 1 && (
                        <div className="d-flex justify-content-end align-items-center mt-3 mb-2 px-2" style={{ backgroundColor: '#fff' }}>
                          <span className="me-3" style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>
                            Page {currentPage} of {totalPages}
                          </span>
                          <div className="btn-group shadow-sm">
                            <button
                              className="btn btn-light border"
                              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                              disabled={currentPage === 1}
                              style={{ padding: "4px 12px", fontSize: "0.85rem", fontWeight: 600 }}
                            >
                              Prev
                            </button>
                            <button
                              className="btn btn-light border"
                              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                              disabled={currentPage === totalPages}
                              style={{ padding: "4px 12px", fontSize: "0.85rem", fontWeight: 600 }}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      )}
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

export default ConsumableStock;
