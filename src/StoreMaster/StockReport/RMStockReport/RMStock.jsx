import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./RMStock.css";
import { Tooltip, IconButton } from "@mui/material";
import { FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";

const OurVendorStock = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  // Filter form fields
  const [filters, setFilters] = useState({
    plant: "VISHWA S.I.",
    store: "Main Store",
    group: "All",
    itemGrade: "All",
    itemSection: "All",
    itemType: "All",
    itemSize: "",
    itemDesc: "",
  });

  // Data for the main table
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // New state variables search  
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // State for Modal
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleSideNav = () => {
    setSideNavOpen((prev) => !prev);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  };

  const handleItemSearchChange = (e) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  };

  // Search  useEffect
  useEffect(() => {
    if (filters.itemDesc.trim() === "") {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    const debounceTimer = setTimeout(() => {
      const fetchItems = async () => {
        setLoading(true);
        try {
          const [resp, missingResp] = await Promise.all([
            axios.get("https://sellerp-backend.onrender.com/Store/api/grn/items/", { params: { q: filters.itemDesc } }).catch(() => ({ data: { success: false, data: [] } })),
            axios.get("https://sellerp-backend.onrender.com/Store/get-missing-rm/", { params: { q: filters.itemDesc } }).catch(() => ({ data: { success: false, data: [] } }))
          ]);

          let allSearchData = [];
          if (resp.data.success && resp.data.data) {
            allSearchData = [...allSearchData, ...resp.data.data];
          }
          if (missingResp.data.success && missingResp.data.data) {
            const query = filters.itemDesc.toLowerCase();
            const missingFiltered = missingResp.data.data.filter(item => 
              (item.description && item.description.toLowerCase().includes(query)) ||
              (item.item_code && item.item_code.toLowerCase().includes(query))
            );
            allSearchData = [...allSearchData, ...missingFiltered];
          }

          const uniqueSearchData = Array.from(new Map(allSearchData.map(item => [item.item_code, item])).values());

          if (uniqueSearchData.length > 0) {
            setSearchResults(uniqueSearchData);
            setShowSuggestions(true);
          } else {
            setSearchResults([]);
            setShowSuggestions(false);
          }
        } catch (err) {
          console.error("Error fetching item suggestions:", err);
          setSearchResults([]);
          setShowSuggestions(false);
        } finally {
          setLoading(false);
        }
      };
      
      fetchItems();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [filters.itemDesc]);

  const handleSelectItem = (item) => {
    const isItemAlreadyAdded = rows.some(row => row.item_code === item.item_code);

    if (!isItemAlreadyAdded) {
      setRows(prevRows => [...prevRows, item]);
    } else {
      alert("This item is already in the table.");
    }
    
    setFilters(f => ({ ...f, itemDesc: '' }));
    setSearchResults([]);
    setShowSuggestions(false);
  };

  // ---  FUNCTION: 'VIEW ALL' BUTTON  ---
  const handleViewAll = async () => {
    setLoading(true);
    try {
      const [resp, missingResp] = await Promise.all([
        axios.get("https://sellerp-backend.onrender.com/Store/api/grn/items/").catch(() => ({ data: { success: false, data: [] } })),
        axios.get("https://sellerp-backend.onrender.com/Store/get-missing-rm/").catch(() => ({ data: { success: false, data: [] } }))
      ]);

      let allData = [];
      if (resp.data.success && resp.data.data) {
        allData = [...allData, ...resp.data.data];
      }
      if (missingResp.data.success && missingResp.data.data) {
        allData = [...allData, ...missingResp.data.data];
      }

      const uniqueData = Array.from(new Map(allData.map(item => [item.item_code, item])).values());

      if (uniqueData.length > 0) {
        setRows(uniqueData);
      } else {
        alert("Could not fetch all data.");
        setRows([]);
      }
    } catch (err) {
      console.error("Error fetching all items:", err);
      alert("An error occurred while fetching data.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const getTotalStock = (variants) => {
    if (!variants || !Array.isArray(variants)) return 0;
    return variants.reduce((sum, v) => sum + (parseFloat(v.stock) || 0), 0);
  };

  const getHeatCount = (variants) => {
    if (!variants || !Array.isArray(variants)) return 0;
    const heatNos = variants
      .map(v => v.heat_no)
      .filter(h => h && h.trim() !== "");
    return heatNos.length;
  };

  const handleExportExcel = () => {
    if (rows.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = rows.map((r, index) => {
      return {
        "Sr no.": index + 1,
        "Item Code": r.item_code,
        "Desc": r.description,
        "Size": r.size,
        "Group Name": r.group_name,
        "UnitCode": r.unit_code,
        "Item Type": r.item_type,
        "PO Rat. Qty": r.po_rate_qty,
        "QC Stock": r.qc_stock || "-",
        "F4 Stock": r.f4_stock || "-",
        "ShopFloor": r.shop_floor || "-",
        "Stock": getTotalStock(r.variants),
        "Heat No": getHeatCount(r.variants) > 0 ? getHeatCount(r.variants) + " Heat No(s)" : "N/A",
        "Rate": r.rate,
        "Amt": r.amount
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RM Stock Report");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "RM_Stock_Report.xlsx");
  };

  const handleViewHeatDetails = (item) => {
    if (!item || !item.variants) {
      console.warn("No variants data available", item);
      return;
    }
    setSelectedItem(item);
    setModalData(item.variants || []);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setModalData([]);
    setSelectedItem(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="RMStock">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="RMStock-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="header-title mb-0">RM Stock Report</h5>
                    <div className="d-flex gap-2">
                      <button type="button" className="vndrbtn" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}>Export To Excel</button>
                      <Link className="vndrbtn" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>RM DataWise Stock</Link>
                    </div>
                  </div>
                </div>

                <div className="RMStock-main mt-3">
                  <div className="container-fluid p-0">
                    <div className="card shadow-sm border-0 mb-4 mt-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <form className="row g-3 text-start">
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select" name="plant" value={filters.plant} onChange={handleChange}>
                              <option>VISHWA S.I.</option>
                            </select>
                          </div>
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Store</label>
                            <select className="form-select" name="store" value={filters.store} onChange={handleChange}>
                              <option>Main Store</option>
                            </select>
                          </div>
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Group</label>
                            <select className="form-select" name="group" value={filters.group} onChange={handleChange}>
                              <option>All</option>
                            </select>
                          </div>
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Item Grade</label>
                            <select className="form-select" name="itemGrade" value={filters.itemGrade} onChange={handleChange}>
                              <option>All</option>
                            </select>
                          </div>
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Item Section</label>
                            <select className="form-select" name="itemSection" value={filters.itemSection} onChange={handleChange}>
                               <option>All</option>
                            </select>
                          </div>
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Item Type</label>
                            <select className="form-select" name="itemType" value={filters.itemType} onChange={handleChange}>
                              <option>All</option>
                            </select>
                          </div>
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Item Size</label>
                            <input type="text" className="form-control" name="itemSize" value={filters.itemSize} onChange={handleChange} />
                          </div>

                          <div className="col-md-3 col-sm-6 position-relative">
                            <label className="form-label">Item/Description Search</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              name="itemDesc" 
                              value={filters.itemDesc} 
                              onChange={handleItemSearchChange}
                              autoComplete="off"
                              placeholder="Type to search..."
                            />
                            {showSuggestions && searchResults.length > 0 && (
                              <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: '300px', overflowY: 'auto' }}>
                                {searchResults.map(item => (
                                  <li
                                    key={item.item_code}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handleSelectItem(item)}
                                    style={{ cursor: 'pointer', padding: "8px 12px" }}
                                  >
                                    <strong>{item.item_code}</strong> - {item.description}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          
                          <div className="col-md-1 col-sm-6 align-self-end">
                            <button type="button" className="btn btn-secondary w-100" onClick={() => setRows([])} style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              Clear
                            </button>
                          </div>

                          {/* --- Changes--- */}
                          <div className="col-md-1 col-sm-6 align-self-end">
                            <button type="button" className="vndrbtn w-100" onClick={handleViewAll} style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              View All
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreRMStock mt-4">
                    <div className="container-fluid p-0 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Item Code</th>
                              <th>Desc</th>
                              <th>Size</th>
                              <th>Group Name</th>
                              <th>UnitCode</th>
                              <th>Item Type</th>
                              <th>PO Rat. Qty</th>
                              <th>QC Stock</th>
                              <th>F4 Stock</th>
                              <th>ShopFloor</th>
                              <th>Stock</th>
                              <th>Heat No</th>
                              <th>Rate</th>
                              <th>Amt</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((r, index) => (
                              <tr key={r.item_code || index}>
                                <td>{index + 1}</td>
                                <td>{r.item_code}</td>
                                <td>{r.description}</td>
                                <td>{r.size}</td>
                                <td>{r.group_name}</td>
                                <td>{r.unit_code}</td>
                                <td>{r.item_type}</td>
                                <td>{r.po_rate_qty}</td>
                                <td>{r.qc_stock || "-"}</td>
                                <td>{r.f4_stock || "-"}</td>
                                <td>{r.shop_floor || "-"}</td>
                                <td>
                                  <div className="d-flex align-items-center justify-content-center gap-2">
                                    <span>{getTotalStock(r.variants)}</span>
                                    <Tooltip title="View Stock Details">
                                      <IconButton size="small" sx={{ color: '#0ea5e9', '&:hover': { bgcolor: '#e0f2fe' } }} onClick={() => handleViewHeatDetails(r)}>
                                        <FaEye size={16} />
                                      </IconButton>
                                    </Tooltip>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center justify-content-center gap-2">
                                    <span>
                                      {getHeatCount(r.variants) > 0 
                                        ? getHeatCount(r.variants) + " Heat No(s)" 
                                        : "N/A"
                                      }
                                    </span>
                                    {r.variants && r.variants.length > 0 && (
                                      <Tooltip title="View Heat Details">
                                        <IconButton size="small" sx={{ color: '#0ea5e9', '&:hover': { bgcolor: '#e0f2fe' } }} onClick={() => handleViewHeatDetails(r)}>
                                          <FaEye size={16} />
                                        </IconButton>
                                      </Tooltip>
                                    )}
                                  </div>
                                </td>
                                <td>{r.rate}</td>
                                <td>{r.amount}</td>
                              </tr>
                            ))}
                            {rows.length === 0 && !loading && (
                              <tr>
                                <td colSpan="15" className="text-center py-4 text-muted">
                                  No data to display. Use 'View All' or search for an item.
                                </td>
                              </tr>
                            )}
                            {loading && (
                                <tr>
                                    <td colSpan="15" className="text-center py-4 text-muted">Loading...</td>
                                </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </main>

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
                    <div className="modal-dialog modal-dialog-centered modal-xl" style={{ width: "100%", maxWidth: "1140px", margin: "auto" }} onClick={(e) => e.stopPropagation()}>
                      <div className="modal-content" style={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                        <div className="modal-header border-bottom-0 pb-0 pt-4 px-4">
                          <div>
                            <h5 className="header-title text-start mb-1" style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b' }}>Stock & Heat Details</h5>
                            {selectedItem && (
                              <small className="text-muted">
                                Item Code: {selectedItem.item_code} - {selectedItem.description}
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
                                  <th style={{ background: '#f8fafc', color: '#475569', fontWeight: '600' }}>Heat No</th>
                                  <th style={{ background: '#f8fafc', color: '#475569', fontWeight: '600' }}>Stock (KG)</th>
                                  <th style={{ background: '#f8fafc', color: '#475569', fontWeight: '600' }}>GRN Qty (KG)</th>
                                  <th style={{ background: '#f8fafc', color: '#475569', fontWeight: '600' }}>Challan Qty (KG)</th>
                                  <th style={{ background: '#f8fafc', color: '#475569', fontWeight: '600' }}>Short/Excess Qty (KG)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {modalData.length > 0 ? (
                                  modalData.map((variant, index) => (
                                    <tr key={index}>
                                      <td className="text-muted">{index + 1}</td>
                                      <td>
                                        {variant.heat_no && variant.heat_no.trim() !== "" 
                                          ? variant.heat_no 
                                          : <span className="text-muted">-</span>
                                        }
                                      </td>
                                      <td className="fw-medium">{variant.stock ?? 0}</td>
                                      <td className="fw-medium">{variant.grn_qty ?? 0}</td>
                                      <td className="fw-medium">{variant.challan_qty ?? 0}</td>
                                      <td className="fw-medium">{variant.short_excess_qty ?? 0}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="6" className="text-center text-muted py-4">
                                      No variant details available
                                    </td>
                                  </tr>
                                )}
                                {modalData.total && (
                                  <tr className="table-secondary fw-bold">
                                    <td colSpan="2" className="text-end">Total:</td>
                                    <td className="text-end">{modalData.total.stock ?? 0}</td>
                                    <td className="text-end">{modalData.total.grn_qty ?? 0}</td>
                                    <td className="text-end">{modalData.total.challan_qty ?? 0}</td>
                                    <td className="text-end">{modalData.total.short_excess_qty ?? 0}</td>
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
    </div>
  );
};

export default OurVendorStock;