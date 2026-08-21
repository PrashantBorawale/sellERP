import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./SubcontractStock.css";
import { Tooltip, IconButton } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";
import axios from "axios";
import * as XLSX from "xlsx";

const SubcontractStock = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [stockData, setStockData] = useState([]); // <-- array
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");

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

  // ✅ Fetch API (SubcornStock)
  const fetchStock = async (q = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://sellerp-backend.onrender.com/Store/api/SubcornStock/?q=" + q
      );
      setStockData(res.data || []); // <-- array
    } catch (error) {
      console.error("Error fetching stock:", error);
      setStockData([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load data initially
  useEffect(() => {
    fetchStock();
  }, []);

  // ✅ Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchStock(query);
  };

  // ✅ Merge inward + outward challans
  const allChallans = stockData.flatMap((challan) => {
    if (challan.type === "inward") {
      return challan.InwardChallanTable.map((item) => ({
        challanType: "inward",
        challanNo: challan.ChallanNo,
        supplier: challan.SupplierName,
        itemDescription: item.ItemDescription,
        qty: item.ChallanQty,
        itemCode: "-", // inward me item_code nahi hai
      }));
    } else if (challan.type === "outward") {
      return challan.items.map((item) => ({
        challanType: "outward",
        challanNo: challan.challan_no,
        supplier: challan.vendor,
        itemDescription: item.description,
        qty: item.qtyNo,
        itemCode: item.item_code || "-",
      }));
    }
    return [];
  });

  // ✅ Supplier list (unique)
  const supplierList = [...new Set(allChallans.map((c) => c.supplier))];

  // ✅ Filtered challans
  const filteredChallans = selectedSupplier
    ? allChallans.filter((c) => c.supplier === selectedSupplier)
    : allChallans;

  const handleExportExcel = () => {
    if (filteredChallans.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = filteredChallans.map((item, index) => {
      return {
        "Sr no.": index + 1,
        "Item type": item.challanType,
        "Challan No": item.challanNo,
        "Item Code": item.itemCode,
        "Supplier": item.supplier,
        "Item Description": item.itemDescription,
        "Stock(NOS)": item.qty
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Subcontract Stock");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Subcontract_Stock.xlsx");
  };

  return (
    <div className="SubcontractStock">
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
                <div className="SubcontractStock-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="header-title mb-0">Subcontract Stock</h5>
                    <div className="d-flex align-items-center gap-3">
                      {/* Plant dropdown moved to filter section */}
                      <div className="d-flex gap-2">
                        <Link className="vndrbtn" to="/OurVendorStock" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>Data Wise Stock</Link>
                        <button className="vndrbtn" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}>Export To Excel</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="SubcontractStock-main mt-3">
                  <div className="container-fluid p-0">
                    <div className="card shadow-sm border-0 mb-4 mt-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <form className="row g-3 mt-1 text-start align-items-end" onSubmit={handleSearch}>
                          {/* Plant (Moved from header) */}
                          <div className="col-md-2">
                            <label htmlFor="series" className="form-label mb-1" style={{ fontSize: '0.85rem' }}>Plant</label>
                            <select id="series" name="series" className="form-select form-select-sm">
                              <option value="">ProduLink</option>
                            </select>
                          </div>

                          {/* Vendor Type & Search Name */}
                          <div className="col-md-3">
                            <div className="d-flex gap-3 mb-1 align-items-center" style={{ height: '21px' }}>
                              <label className="d-flex align-items-center gap-2 mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                <input type="radio" name="stockLevel" value="" /> All Vendor
                              </label>
                              <label className="d-flex align-items-center gap-2 mb-0" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                <input type="radio" name="stockLevel" value="" /> Select Vendor
                              </label>
                            </div>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              name="itemSize"
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder="Enter Name .."
                            />
                          </div>

                          {/* Item Code */}
                          <div className="col-md-2">
                            <label className="form-label mb-1" style={{ fontSize: '0.85rem' }}>Item Code</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              name="itemSize2"
                            />
                          </div>

                          {/* Supplier Dropdown */}
                          <div className="col-md-3">
                            <label className="form-label mb-1" style={{ fontSize: '0.85rem' }}>Supplier</label>
                            <select
                              className="form-select form-select-sm"
                              value={selectedSupplier}
                              onChange={(e) => setSelectedSupplier(e.target.value)}
                            >
                              <option value="">All Suppliers</option>
                              {supplierList.map((s, i) => (
                                <option key={i} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>

                          {/* Search Button */}
                          <div className="col-md-2">
                            <button type="submit" className="btn btn-primary w-100" style={{ height: '31px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to right, #3b82f6, #4f46e5)', border: 'none' }}>
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreSubcontractStock mt-4">
                    <div className="container-fluid p-0 text-start">
                      <div className="table-responsive">
                        {loading ? (
                          <p className="text-center mt-3">Loading data...</p>
                        ) : (
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Sr.no</th>
                                <th>Item type</th>
                                <th>Challan No</th>
                                <th>Item Code</th>
                                <th>Supplier</th>
                                <th>Item Description</th>
                                <th>Stock(NOS)</th>
                                <th>View3</th>
                                <th>View2</th>
                                <th>View</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredChallans.length > 0 ? (
                                filteredChallans.map((row, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{row.challanType}</td>
                                    <td>{row.challanNo}</td>
                                    <td>{row.itemCode}</td>
                                    <td>{row.supplier}</td>
                                    <td>{row.itemDescription}</td>
                                    <td>{row.qty}</td>
                                    <td className="text-center">
                                      <Tooltip title="View Document">
                                        <IconButton size="small" sx={{ color: '#0ea5e9', '&:hover': { bgcolor: '#e0f2fe' } }}>
                                          <IoDocument size={16} />
                                        </IconButton>
                                      </Tooltip>
                                    </td>
                                    <td className="text-center">
                                      <Tooltip title="View Alternate Document">
                                        <IconButton size="small" sx={{ color: '#8b5cf6', '&:hover': { bgcolor: '#ede9fe' } }}>
                                          <IoDocument size={16} />
                                        </IconButton>
                                      </Tooltip>
                                    </td>
                                    <td className="text-center">
                                      <Tooltip title="View Item">
                                        <IconButton size="small" sx={{ color: '#64748b', '&:hover': { bgcolor: '#f1f5f9' } }}>
                                          <FaEye size={16} />
                                        </IconButton>
                                      </Tooltip>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="10" className="text-center py-4 text-muted">
                                    No data found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        )}
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

export default SubcontractStock;