import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { FaFileExcel, FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const OpeningWIPReport = () => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState("2026-05-01");
  const [toDate, setToDate] = useState(today);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://sellerp-backend.onrender.com/Store/opening-stock-fg/");
      if (response.data && response.data.status) {
        setAllData(response.data.data || []);
        // Apply default filter on load
        applyFilter(response.data.data || [], "2026-05-01", today);
      } else {
        setError(response.data?.message || "Failed to fetch data");
      }
    } catch (err) {
      console.error("Error fetching report data:", err);
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (data, from, to) => {
    if (!from || !to) {
      setFilteredData(data);
      return;
    }
    const fromDateObj = new Date(from);
    const toDateObj = new Date(to);
    const filtered = data.filter(item => {
      if (!item.tm_date) return false;
      const itemDate = new Date(item.tm_date);
      return itemDate >= fromDateObj && itemDate <= toDateObj;
    });
    setFilteredData(filtered);
  };

  const handleSearch = () => {
    applyFilter(allData, fromDate, toDate);
  };

  return (
    <div className="OpeningWIPReport">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="container-fluid mt-4 px-4">
                  
                  {/* Header Section */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0" style={{ fontWeight: 800, fontSize: '1.8rem', background: 'linear-gradient(90deg, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Opening WIP Report
                    </h5>
                    <button className="btn btn-outline-success btn-sm d-flex align-items-center fw-medium px-3 py-2 shadow-sm" style={{ borderRadius: "8px" }}>
                      <FaFileExcel className="me-2" /> Export Report
                    </button>
                  </div>

                  {/* Filters Card */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "10px", backgroundColor: "#ffffff" }}>
                    <div className="card-body p-4">
                      <div className="row g-3 align-items-end">
                        
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                          <label className="fw-medium text-secondary d-block mb-1 text-start" style={{ fontSize: "14px" }}>From Date :</label>
                          <input type="date" className="form-control form-control-sm shadow-none" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                        </div>
                        
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                          <label className="fw-medium text-secondary d-block mb-1 text-start" style={{ fontSize: "14px" }}>To Date :</label>
                          <input type="date" className="form-control form-control-sm shadow-none" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                          <label className="fw-medium text-secondary d-block mb-1 text-start" style={{ fontSize: "14px" }}>##. :</label>
                          <select className="form-select form-select-sm shadow-none">
                            <option>SHARP</option>
                          </select>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                          <label className="fw-medium text-secondary d-block mb-1 text-start" style={{ fontSize: "14px" }}>Item Group :</label>
                          <select className="form-select form-select-sm shadow-none">
                            <option>ALL</option>
                          </select>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                          <label className="fw-medium text-secondary d-block mb-1 text-start" style={{ fontSize: "14px" }}>User :</label>
                          <select className="form-select form-select-sm shadow-none">
                            <option>ALL User</option>
                          </select>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                          <div className="form-check d-flex align-items-center gap-2 mb-1 p-0">
                            <input className="form-check-input shadow-none m-0" type="checkbox" id="chkItemCode" />
                            <label className="form-check-label fw-medium text-secondary" style={{ fontSize: "14px" }} htmlFor="chkItemCode">Item Code</label>
                          </div>
                          <input type="text" className="form-control form-control-sm shadow-none" placeholder="Item Code" disabled />
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                          <div className="form-check d-flex align-items-center gap-2 mb-1 p-0">
                            <input className="form-check-input shadow-none m-0" type="checkbox" id="chkStore" />
                            <label className="form-check-label fw-medium text-secondary" style={{ fontSize: "14px" }} htmlFor="chkStore">Store</label>
                          </div>
                          <select className="form-select form-select-sm shadow-none" disabled>
                            <option>Main Store</option>
                          </select>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                          <button onClick={handleSearch} className="btn btn-primary btn-sm d-flex justify-content-center align-items-center shadow-sm w-100 py-2" style={{ borderRadius: "6px" }}>
                            <FaSearch className="me-2" /> Search
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Table Card */}
                  <div className="card shadow-sm border-0 mb-5" style={{ borderRadius: "10px", backgroundColor: "#ffffff" }}>
                    <div className="card-body p-0">
                      <div className="table-responsive" style={{ maxHeight: "calc(100vh - 350px)", borderRadius: "10px 10px 0 0" }}>
                        <table className="table table-hover mb-0" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                          <thead className="table-light" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                            <tr>
                              <th className="text-secondary fw-bold text-center align-middle py-3">Sr. No.</th>
                              <th className="text-secondary fw-bold text-center align-middle py-3">##.</th>
                              <th className="text-secondary fw-bold text-center align-middle py-3">TrnDate</th>
                              <th className="text-secondary fw-bold align-middle py-3">ItemNo</th>
                              <th className="text-secondary fw-bold align-middle py-3">Item Desc</th>
                              <th className="text-secondary fw-bold align-middle py-3">PartCode</th>
                              <th className="text-secondary fw-bold text-center align-middle py-3">HeatCode</th>
                              <th className="text-secondary fw-bold align-middle py-3">GroupName</th>
                              <th className="text-secondary fw-bold text-center align-middle py-3">Opening Qty</th>
                              <th className="text-secondary fw-bold text-center align-middle py-3">Reject Qty</th>
                              <th className="text-secondary fw-bold text-center align-middle py-3">Rework Qty</th>
                              <th className="text-secondary fw-bold text-center align-middle py-3">Item Rate</th>
                              <th className="text-secondary fw-bold text-center align-middle py-3">Item Value</th>
                              <th className="text-secondary fw-bold align-middle py-3">Remark</th>
                              <th className="text-secondary fw-bold text-center align-middle py-3">User</th>
                              <th className="text-secondary fw-bold text-center align-middle py-3">Create Date</th>
                              <th className="text-secondary fw-bold text-center align-middle py-3">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan="17" className="text-center py-4">
                                  <div className="spinner-border text-primary spinner-border-sm me-2" role="status"></div>
                                  Loading data...
                                </td>
                              </tr>
                            ) : error ? (
                              <tr>
                                <td colSpan="17" className="text-center py-4 text-danger fw-medium">
                                  {error}
                                </td>
                              </tr>
                            ) : filteredData.length === 0 ? (
                              <tr>
                                <td colSpan="17" className="text-center py-4 text-secondary">
                                  No records found for the selected date range.
                                </td>
                              </tr>
                            ) : (
                              filteredData.map((row, index) => {
                                const rate = parseFloat(row.rate || 0);
                                const okQty = parseFloat(row.ok_qty || 0);
                                const itemValue = (rate * okQty).toFixed(2);
                                
                                return (
                                  <tr key={row.id || index} style={{ verticalAlign: 'middle' }}>
                                    <td className="text-center text-muted fw-medium">{index + 1}</td>
                                    <td className="text-center">{row.plant || "-"}</td>
                                    <td className="text-center">{row.tm_date || "-"}</td>
                                    <td className="fw-medium text-dark">{row.item_code || "-"}</td>
                                    <td className="text-muted">-</td>
                                    <td className="text-muted">{row.part_code || "-"}</td>
                                    <td className="text-center text-muted">{row.new_heat_no || row.heat_no || "-"}</td>
                                    <td>-</td>
                                    <td className="text-center fw-medium text-primary">{row.ok_qty || "0"}</td>
                                    <td className="text-center">{row.reject_qty || "0"}</td>
                                    <td className="text-center">{row.rework_qty || "0"}</td>
                                    <td className="text-center">{row.rate || "0"}</td>
                                    <td className="text-center">{itemValue}</td>
                                    <td className="text-muted">{row.remark_note || "-"}</td>
                                    <td className="text-center">-</td>
                                    <td className="text-center text-muted">{row.tm_date || "-"}</td>
                                    <td className="text-center">
                                      <div className="d-flex justify-content-center gap-2">
                                        <button className="btn btn-sm btn-outline-primary shadow-none border-0 p-1" title="Edit">
                                          <FaEdit style={{ fontSize: '15px' }} />
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger shadow-none border-0 p-1" title="Delete">
                                          <FaTrash style={{ fontSize: '14px' }} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="card-footer bg-white py-3" style={{ borderTop: '1px solid #f1f5f9', borderRadius: "0 0 10px 10px" }}>
                      <span className="fw-bold text-primary" style={{ fontSize: '13px' }}>
                        Total Records : {filteredData.length}
                      </span>
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

export default OpeningWIPReport;
