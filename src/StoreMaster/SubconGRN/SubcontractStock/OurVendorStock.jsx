import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./SubcontractStock.css";
import { FaEye } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";

const OurVendorStock = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorList, setVendorList] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // ✅ NEW: Control dropdown visibility

  const dropdownRef = useRef(null);
  const inputRef = useRef(null); // ✅ NEW: Input reference

  const toggleSideNav = () => {
    setSideNavOpen((prev) => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  // ✅ Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setVendorList([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Vendor Suggestion fetch
  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchVendors = async () => {
        // ✅ CRITICAL: Don't fetch if input is empty or too short
        if (!vendorName || vendorName.trim().length < 2) {
          setVendorList([]);
          setShowDropdown(false);
          return;
        }

        try {
          setDropdownLoading(true);
          setShowDropdown(true); // ✅ Show dropdown when fetching
          console.log("🔍 Fetching vendors for:", vendorName);

          const res = await fetch(
            `https://sellerp-backend.onrender.com/Store/api/SubcornStock/?q=${encodeURIComponent(vendorName)}`
          );

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          console.log("✅ API Response:", data);

          let rawList = [];

          if (Array.isArray(data)) {
            rawList = data;
          } else if (data.results && Array.isArray(data.results)) {
            rawList = data.results;
          } else if (data.data && Array.isArray(data.data)) {
            rawList = data.data;
          }

          console.log("📋 Raw list:", rawList);

          // ✅ Handle multiple field names
          const filteredList = rawList
            .map((v) => {
              const supplierName =
                v?.supplier || v?.SupplierName || v?.vendor || v?.vender;
              return supplierName ? { supplier: supplierName } : null;
            })
            .filter((v) => v !== null && v.supplier && v.supplier.trim() !== "");

          // ✅ Remove duplicates
          const uniqueList = Array.from(
            new Map(
              filteredList.map((item) => [item.supplier.toLowerCase(), item])
            ).values()
          );

          console.log("✅ Filtered & unique list:", uniqueList);
          setVendorList(uniqueList);
          
          // ✅ Only show dropdown if we have results
          setShowDropdown(uniqueList.length > 0);
          
        } catch (err) {
          console.error("❌ Error fetching vendors:", err);
          setVendorList([]);
          setShowDropdown(false);
        } finally {
          setDropdownLoading(false);
        }
      };

      fetchVendors();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [vendorName]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!fromDate || !toDate || !vendorName) {
      alert("Please select From Date, To Date and Vendor Name");
      return;
    }

    try {
      setLoading(true);
      console.log("🔍 Searching stock for:", {
        vendor: vendorName,
        from: fromDate,
        to: toDate,
      });

      const response = await fetch(
        `https://sellerp-backend.onrender.com/Store/vender-stock/?q=${encodeURIComponent(
          vendorName.trim() // ✅ Trim whitespace
        )}&start=${fromDate}&end=${toDate}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Stock data received:", data);
      console.log("✅ Data length:", data.length);
      console.log("✅ First item:", data[0]);

      if (Array.isArray(data)) {
        setStockData(data);
        if (data.length === 0) {
          alert("No data found for the selected vendor and date range");
        }
      } else if (data.results) {
        setStockData(data.results);
      } else {
        console.warn("⚠️ Unexpected data structure:", data);
        setStockData([]);
      }
    } catch (error) {
      console.error("❌ Error fetching vendor stock:", error);
      setStockData([]);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Handle vendor selection properly
  const handleVendorSelect = (supplier) => {
    console.log("✅ Selected vendor:", supplier);
    setVendorName(supplier); // Set the vendor name
    setVendorList([]); // Clear the list
    setShowDropdown(false); // ✅ Hide dropdown immediately
    
    // ✅ Optional: Focus back on input
    if (inputRef.current) {
      inputRef.current.blur(); // Remove focus
    }
  };

  // ✅ Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log("📝 Input changed:", value);
    setVendorName(value);
    
    // ✅ Show dropdown when typing
    if (value.trim().length >= 2) {
      setShowDropdown(true);
    }
  };

  return (
    <div className="RMStock">
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
                <div className="RMStock-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">
                        Vendor (Our) Stock Report
                      </h5>
                    </div>
                    <div className="col-md-9 text-end">
                      <Link className="vndrbtn">Item Unit Code Setting</Link>
                      <Link className="vndrbtn">Sub-Con Stock Report</Link>
                      <Link className="vndrbtn me-2">Export To Excel</Link>
                    </div>
                  </div>
                </div>

                <div className="RMStock-main mt-3">
                  <div className="container-fluid">
                    <form
                      className="row g-3 text-start"
                      onSubmit={handleSearch}
                    >
                      {/* From Date */}
                      <div className="col-md-2 col-sm-6">
                        <label className="form-label">From :</label>
                        <input
                          type="date"
                          className="form-control"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                        />
                      </div>

                      {/* To Date */}
                      <div className="col-md-2 col-sm-6">
                        <label className="form-label">TO :</label>
                        <input
                          type="date"
                          className="form-control"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                        />
                      </div>

                      {/* ✅ COMPLETELY FIXED: Vendor Name dropdown */}
                      <div className="col-md-3 col-sm-6" ref={dropdownRef}>
                        <label className="form-label">Vendor Name :</label>
                        <div style={{ position: "relative" }}>
                          <input
                            ref={inputRef}
                            type="text"
                            className="form-control"
                            placeholder="Type to search vendor..."
                            value={vendorName}
                            onChange={handleInputChange}
                            autoComplete="off"
                          />

                          {/* ✅ ONLY show dropdown when conditions are met */}
                          {showDropdown && (
                            <>
                              {/* Loading state */}
                              {dropdownLoading && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    right: 0,
                                    zIndex: 9999,
                                    backgroundColor: "#fff",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    padding: "10px",
                                    marginTop: "2px",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                  }}
                                >
                                  <small className="text-muted">Loading...</small>
                                </div>
                              )}

                              {/* Vendor list */}
                              {!dropdownLoading && vendorList.length > 0 && (
                                <ul
                                  className="list-group"
                                  style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    right: 0,
                                    zIndex: 9999,
                                    maxHeight: "250px",
                                    overflowY: "auto",
                                    backgroundColor: "#fff",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                                    marginTop: "2px",
                                    padding: 0,
                                    listStyle: "none",
                                    margin: 0,
                                  }}
                                >
                                  {vendorList.map((v, i) => (
                                    <li
                                      key={i}
                                      className="list-group-item"
                                      onMouseDown={(e) => {
                                        // ✅ Use onMouseDown instead of onClick for better UX
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleVendorSelect(v.supplier);
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        padding: "10px 15px",
                                        borderBottom:
                                          i < vendorList.length - 1
                                            ? "1px solid #eee"
                                            : "none",
                                        transition: "background-color 0.2s",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "#fff";
                                      }}
                                    >
                                      {v.supplier}
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {/* No results - ONLY show when not loading and no results */}
                              {!dropdownLoading && vendorList.length === 0 && vendorName.trim().length >= 2 && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    right: 0,
                                    zIndex: 9999,
                                    backgroundColor: "#fff",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    padding: "10px",
                                    marginTop: "2px",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                  }}
                                >
                                  <small className="text-muted">No vendors found</small>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      {/* Item Desc */}
                      <div className="col-md-2 col-sm-6">
                        <label className="form-label">Item Desc</label>
                        <input
                          type="text"
                          className="form-control"
                          name="itemName"
                        />
                      </div>

                      {/* Search Button */}
                      <div className="col-md-2 col-sm-6 align-self-end mt-1">
                        <button
                          type="submit"
                          className="vndrbtn"
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "Challan Wise"}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* ✅ Table with detailed logging */}
                  <div className="StoreRMStock">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr.no</th>
                              <th>Code</th>
                              <th>Vendor Name</th>
                              <th>Date</th>
                              <th>Part Code</th>
                              <th>Item Description</th>
                              <th>OP Qty</th>
                              <th>Out Qty</th>
                              <th>In Qty</th>
                              <th>Challan_InQty</th>
                              <th>Balance Qty</th>
                              <th>UnitCode</th>
                              <th>View2</th>
                              <th>View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan="14" className="text-center">
                                  <div
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                  >
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                  Loading data...
                                </td>
                              </tr>
                            ) : stockData.length > 0 ? (
                              (() => {
                                let srNo = 0;
                                return stockData.flatMap((record, recordIndex) => {
                                  console.log(`Record ${recordIndex}:`, record);
                                  
                                  if (!record.items || record.items.length === 0) {
                                    console.warn(`Record ${recordIndex} has no items`);
                                    return [];
                                  }
                                  
                                  return record.items.map((item, itemIndex) => {
                                    srNo++;
                                    return (
                                      <tr key={`${recordIndex}-${itemIndex}`}>
                                        <td>{srNo}</td>
                                        <td>{item.ItemCode || "-"}</td>
                                        <td>{record.supplier || "-"}</td>
                                        <td>{record.date || "-"}</td>
                                        <td>{item.ItemCode || "-"}</td>
                                        <td>{item.ItemDescription || "-"}</td>
                                        <td>{item.op_qty ?? 0}</td>
                                        <td>{item.outward_qty ?? 0}</td>
                                        <td>{item.inward_qty ?? 0}</td>
                                        <td>{item.InQtyKg ?? 0}</td>
                                        <td>{item.balance_qty ?? 0}</td>
                                        <td>-</td>
                                        <td style={{ cursor: "pointer" }}>
                                          <FaEye />
                                        </td>
                                        <td style={{ cursor: "pointer" }}>
                                          <IoDocument />
                                        </td>
                                      </tr>
                                    );
                                  });
                                });
                              })()
                            ) : (
                              <tr>
                                <td colSpan="14" className="text-center">
                                  {vendorName && fromDate && toDate
                                    ? "No Data Found. Please check console for API response."
                                    : "Please select dates and vendor to search"}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurVendorStock;