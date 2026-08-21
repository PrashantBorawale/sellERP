"use client";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./WIPStock.css";
import axios from "axios";
import { Tooltip, IconButton } from "@mui/material";
import { FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";

const WIPStock = () => {
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

  // Search API Table

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [items, setItems] = useState([]);
  const [totals, setTotals] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(
        "https://sellerp-backend.onrender.com/Store/api/WIPstockreport/?q=" + value
      );
      setSearchResults(res.data.data || []);
    } catch (error) {
      console.error("Error fetching search results", error);
      setSearchResults([]);
    }
  };

  const handleSelectItem = async (item) => {
    const fullItemDisplay = item.part_code + " | " + item.part_no + " | " + item.Name_Description;
    setSearchTerm(fullItemDisplay);
    setSearchResults([]);

    try {
      const res = await axios.get(
        "https://sellerp-backend.onrender.com/Store/api/WIPstockreport/?q=" + item.part_no
      );

      const allItems = res.data.data || [];

      const exactItems = allItems.filter(
        (dataItem) => dataItem.part_no === item.part_no
      );
      setItems(exactItems);

      setTotals(res.data.totals || {});
    } catch (error) {
      console.error("Error fetching item details", error);
    }
  };

  const handleViewHeatDetails = async (item) => {
    if (!item) return;

    setSelectedItem(item);
    setModalData([]);
    setShowModal(true);

    try {

      const res = await axios.get(
        "https://sellerp-backend.onrender.com/Store/heat-summary/?part_no=" + item.part_no
      );

      const data = res.data;

      let finalDisplayData = [];

      const currentOp = parseInt(item.OPNo) || 0;
      const targetOpString = String(currentOp);

      // Look for exactly the OP key, or a key that starts with it if it has trailing characters
      const foundKey = Object.keys(data).find(key => key === targetOpString || key.startsWith(targetOpString + "|"));

      if (foundKey) {
        const heatDataObj = data[foundKey] || {};

        finalDisplayData = Object.entries(heatDataObj).map(([heatNo, qty]) => ({
          display_heat: heatNo,  // Key ban gayi Heat No
          display_qty: String(qty) // Ensures it renders correctly in React
        }));
      }

      setModalData(finalDisplayData);

    } catch (error) {
      console.error("Error fetching heat details", error);
      setModalData([]);
    }
  };

  const handleExportExcel = () => {
    if (items.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = items.map((item, index) => {
      return {
        "Sr no.": index + 1,
        "Item No": item.part_no,
        "Item Code": item.part_code,
        "Item Description": item.Name_Description,
        "OP No": item.OPNo,
        "Operation": item.Operation || "-",
        "Part Code": item.PartCode,
        "OK Qty": item.prod_qty || 0,
        "Rework Qty": item.rework_qty || 0,
        "Reject Qty": item.reject_qty || 0,
        "Pending QC": item.pending_qc || 0,
        "Subcon": item.subcon,
        "Total": item.Total,
        "Rate": item.WipRate || 0,
        "WipWt": item.WipWt || 0,
        "TotalWt": item.totalwt
      };
    });

    exportData.push({
      "Sr no.": "Totals",
      "Item No": "",
      "Item Code": "",
      "Item Description": "",
      "OP No": "",
      "Operation": "",
      "Part Code": "",
      "OK Qty": totals.total_prod || 0,
      "Rework Qty": totals.total_rework || 0,
      "Reject Qty": totals.total_reject || 0,
      "Pending QC": totals.total_pending_qc || 0,
      "Subcon": totals.total_subcon || 0,
      "Total": totals.total_total || 0,
      "Rate": "",
      "WipWt": "",
      "TotalWt": ""
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "WIP Stock");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "WIP_Stock_Report.xlsx");
  };


  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setModalData([]);
    setSelectedItem(null);
  };

  return (
    <div className="WIPStock">
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
                <div className="WIPStock-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="header-title mb-0">WIP Stock Report</h5>
                    <div className="d-flex gap-2">
                      <button type="button" className="vndrbtn" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}>Export To Excel</button>
                      <Link type="button" className="vndrbtn" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>WIP-Under Decaration Stock</Link>
                      <Link type="button" className="vndrbtn" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>WIP Delewise Stock</Link>
                    </div>
                  </div>
                </div>

                <div className="WIPStock-main mt-3">
                  <div className="container-fluid p-0">
                    <div className="card shadow-sm border-0 mb-4 mt-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <form className="g-3 text-start">
                          <div className="row">
                            {/* Plant */}
                            <div className="col-md-2 col-sm-6">
                              <label className="form-label">Store</label>
                              <select className="form-select">
                                <option value="Produlink">Main Store</option>
                              </select>
                            </div>

                            {/* Search PartName  */}
                            <div className="col-md-3 col-sm-6 position-relative">
                              <label className="form-label">Search Item No Code Desc</label>
                              <input
                                type="text"
                                className="form-control"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search by Part Code | No | Description"
                              />
                              {searchResults.length > 0 && (
                                <ul
                                  className="list-group position-absolute w-100"
                                  style={{
                                    zIndex: 1000,
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                  }}
                                >
                                  {searchResults.map((item, index) => (
                                    <li
                                      key={index}
                                      className="list-group-item list-group-item-action"
                                      style={{ cursor: "pointer", padding: "8px 12px" }}
                                      onClick={() => handleSelectItem(item)}
                                    >
                                      {item.Part_Code} | {item.part_no} | {item.Name_Description}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>

                            <div className="col-md-1 col-sm-6">
                              <button
                                type="button"
                                className="vndrbtn w-100"
                                style={{ marginTop: "30px", height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                Search
                              </button>
                            </div>

                            <div className="col-md-4 col-sm-6">
                              <div className="d-flex gap-3 mb-2 mt-1 align-items-center">
                                <label className="form-label mb-0 fw-bold">Heat No</label>
                                <label className="d-flex align-items-center gap-2">
                                  <input type="radio" name="heatLevel" value="" />
                                  All
                                </label>
                                <label className="d-flex align-items-center gap-2">
                                  <input type="radio" name="heatLevel" value="" />
                                  In Stock
                                </label>
                              </div>
                              <select className="form-select">
                                <option value="Produlink"> </option>
                              </select>
                            </div>

                            <div className="col-md-1 col-sm-6 align-self-end">
                              <button type="submit" className="btn btn-secondary w-100" style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Clear
                              </button>
                            </div>
                          </div>

                          <div className="row mt-4 align-items-end">
                            <div className="col-md-4 col-sm-6">
                              <label className="form-label">Stock Level</label>
                              <div className="d-flex gap-3 mt-1">
                                <label className="d-flex align-items-center gap-2">
                                  <input type="radio" name="stockLevel" value="" />
                                  All Part Code
                                </label>
                                <label className="d-flex align-items-center gap-2">
                                  <input type="radio" name="stockLevel" value="" />
                                  In Stock Part Code
                                </label>
                              </div>
                            </div>

                            <div className="col-md-1 col-sm-6">
                              <button type="submit" className="vndrbtn w-100" style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                View
                              </button>
                            </div>

                            <div className="col-md-2 col-sm-6">
                              <label className="form-label">Part Code Like</label>
                              <input type="text" className="form-control" />
                            </div>

                            <div className="col-md-1 col-sm-6">
                              <button type="submit" className="vndrbtn w-100" style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                View
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="WIPStock-main mt-4">
                    <div className="container-fluid p-0 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr</th>
                              <th>Item No</th>
                              <th>Item Code</th>
                              <th>Item Description</th>
                              <th>OP No</th>
                              <th>Operation</th>
                              <th>Part Code</th>
                              <th>OK Qty</th>
                              <th>Rework Qty</th>
                              <th>Reject Qty</th>
                              <th>Pending QC</th>
                              <th>Subcon</th>
                              <th>Total</th>
                              <th>Rate</th>
                              <th>WipWt</th>
                              <th>TotalWt</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.length > 0 ? (
                              <>
                                {items.map((item, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.part_no}</td>
                                    <td>{item.part_code}</td>
                                    <td>{item.Name_Description}</td>
                                    <td>{item.OPNo}</td>
                                    <td>{item.Operation || "-"}</td>
                                    <td>{item.PartCode}</td>
                                    <td>
                                      <div className="d-flex align-items-center justify-content-center gap-2">
                                        {item.prod_qty || 0}
                                        <Tooltip title="View Details">
                                          <IconButton size="small" sx={{ color: '#0ea5e9', '&:hover': { bgcolor: '#e0f2fe' } }} onClick={() => handleViewHeatDetails(item)}>
                                            <FaEye size={16} />
                                          </IconButton>
                                        </Tooltip>
                                      </div>
                                    </td>
                                    <td>{item.rework_qty || 0}</td>
                                    <td>{item.reject_qty || 0}</td>
                                    <td>{item.pending_qc || 0}</td>
                                    <td>{item.subcon}</td>
                                    <td>{item.Total}</td>
                                    <td>{item.WipRate || 0}</td>
                                    <td>{item.WipWt || 0}</td>
                                    <td>{item.totalwt}</td>
                                  </tr>
                                ))}
                                {/* ✅ Totals Row from API */}
                                <tr style={{ fontWeight: "bold", background: "#f8fafc" }}>
                                  <td colSpan="7" className="text-end">Totals</td>
                                  <td>{totals.total_prod || 0}</td>
                                  <td>{totals.total_rework || 0}</td>
                                  <td>{totals.total_reject || 0}</td>
                                  <td>{totals.total_pending_qc || 0}</td>
                                  <td>{totals.total_subcon || 0}</td>
                                  <td>{totals.total_total || 0}</td>
                                  <td colSpan="3"></td>
                                </tr>
                              </>
                            ) : (
                              <tr>
                                <td colSpan="16" className="text-center py-4 text-muted">
                                  No Data Found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>

            {/* Modal for Heat Details */}
            {showModal && (
              <>
                <div
                  className="modal-backdrop fade show"
                  onClick={handleBackdropClick}
                  style={{ zIndex: 1040 }}
                ></div>
                <div
                  className="modal fade show d-flex align-items-center justify-content-center"
                  style={{ display: "flex", zIndex: 1050 }}
                  tabIndex="-1"
                  onClick={handleBackdropClick}
                >
                  <div className="modal-dialog modal-dialog-centered modal-lg" style={{ width: "100%", maxWidth: "800px", margin: "auto" }} onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content" style={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                      <div className="modal-header border-bottom-0 pb-0 pt-4 px-4">
                        <div>
                          <h5 className="header-title text-start mb-1" style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b' }}>Stock & Heat Details</h5>
                          {selectedItem && (
                            <small className="text-muted">
                              Item: {selectedItem.part_no} | OP: {selectedItem.OPNo}
                            </small>
                          )}
                        </div>
                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                      </div>
                      <div className="modal-body p-4">
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover text-center mb-0">
                            <thead className="table-light">
                              <tr>
                                <th style={{ background: '#f8fafc', color: '#475569', fontWeight: '600' }}>Sr No.</th>
                                <th style={{ background: '#f8fafc', color: '#475569', fontWeight: '600' }}>Heat No / Lot No</th>
                                <th style={{ background: '#f8fafc', color: '#475569', fontWeight: '600' }}>Qty / Stock</th>
                              </tr>
                            </thead>
                            <tbody>
                              {modalData.length > 0 ? (
                                modalData.map((row, index) => (
                                  <tr key={index}>
                                    <td className="text-muted">{index + 1}</td>
                                    <td>{row.display_heat ? row.display_heat : "-"}</td>
                                    <td className="fw-medium">{row.display_qty !== undefined && row.display_qty !== null ? row.display_qty : "0"}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="3" className="text-center p-4 text-muted">
                                    No Data Found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="modal-footer border-top-0 pt-0 pb-4 px-4">
                        <button type="button" className="btn btn-secondary px-4 rounded-pill" onClick={closeModal}>Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WIPStock;
