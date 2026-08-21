import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import axios from "axios";
import "./FGStock.css";

const FGStock = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "Produlink",
    store: "Main Store",
    group: "FG",
    subGroup: "All",
  });

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

  // Helper to safely calculate stock from variants if present
  const getTotalStock = (item) => {
    if (item?.variants && Array.isArray(item.variants)) {
      return item.variants.reduce((sum, v) => sum + (parseFloat(v.stock) || 0), 0);
    }
    return parseFloat(item?.stock || item?.qty || 0);
  };

  // Fetch API Data with Error Resilience & Optimization
  const fetchFGStock = async (query = "") => {
    setLoading(true);
    try {
      const params = query.trim() ? { q: query.trim() } : {};
      const res = await axios.get("https://sellerp-backend.onrender.com/Store/api/grn/items/", { params });
      
      // Safe response parsing handling 204 No Content or empty payloads
      let data = res?.data?.data || (Array.isArray(res?.data) ? res.data : []);
      
      // If query exists but API didn't filter server-side, filter client-side as fallback
      if (query.trim() && Array.isArray(data)) {
        const lowerQ = query.trim().toLowerCase();
        data = data.filter((item) => {
          const code = (item?.item_code || "").toLowerCase();
          const desc = (item?.description || "").toLowerCase();
          return code.includes(lowerQ) || desc.includes(lowerQ);
        });
      }

      setRows(data);
    } catch (error) {
      console.error("Error fetching FG Stock data:", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFGStock();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevents page reload / 404 error
    fetchFGStock(searchTerm);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleExportExcel = () => {
    if (!rows || rows.length === 0) {
      alert("No data available to export.");
      return;
    }

    const exportData = rows.map((item, index) => {
      const stockQty = getTotalStock(item);
      const rateVal = parseFloat(item?.rate || 0);
      const valueVal = parseFloat(item?.amount || (stockQty * rateVal).toFixed(2));

      return {
        "Sr no.": index + 1,
        "Item NO": item?.item_no || item?.id || "-",
        "Item Code": item?.item_code || "-",
        "Item Desc": item?.description || "-",
        "Store": filters.store || "Main Store",
        "Stock": stockQty,
        "Rate": rateVal,
        "Value": valueVal,
        "WIP Wt": item?.wip_wt || item?.wip_weight || "-",
        "Total Wt": item?.total_wt || item?.total_weight || "-",
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FG Stock Report");

    const wscols = Object.keys(exportData[0] || {}).map((key) => ({
      wch: Math.max(key.length, ...exportData.map((r) => (r[key] ? r[key].toString().length : 0))) + 3,
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "FG_Stock_Report.xlsx");
  };

  return (
    <div className="FGStock">
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
                <div className="FGStock-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="header-title mb-0">Finish Good Stock Report</h5>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="vndrbtn"
                        onClick={handleExportExcel}
                        style={{ height: "34px", display: "flex", alignItems: "center", border: "none", cursor: "pointer" }}
                      >
                        Export To Excel
                      </button>
                      <Link
                        to="#/"
                        className="vndrbtn"
                        style={{ height: "34px", display: "flex", alignItems: "center" }}
                      >
                        FG DataWise Stock
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="FGStock-main mt-3">
                  <div className="container-fluid p-0">
                    <div className="card shadow-sm border-0 mb-4 mt-4" style={{ borderRadius: "12px" }}>
                      <div className="card-body">
                        <form className="row g-3 text-start align-items-end" onSubmit={handleSearchSubmit}>
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Loc.</label>
                            <select
                              className="form-select"
                              name="location"
                              value={filters.location}
                              onChange={handleFilterChange}
                            >
                              <option value="Produlink">Produlink</option>
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Store</label>
                            <select
                              className="form-select"
                              name="store"
                              value={filters.store}
                              onChange={handleFilterChange}
                            >
                              <option value="Main Store">Main Store</option>
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Group</label>
                            <select
                              className="form-select"
                              name="group"
                              value={filters.group}
                              onChange={handleFilterChange}
                            >
                              <option value="FG">FG</option>
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Sub Group</label>
                            <select
                              className="form-select"
                              name="subGroup"
                              value={filters.subGroup}
                              onChange={handleFilterChange}
                            >
                              <option value="All">All</option>
                            </select>
                          </div>

                          <div className="col-md-3 col-sm-6">
                            <label className="form-label">Item</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Item Code or Desc..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>

                          {/* Search Button */}
                          <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button
                              type="submit"
                              className="vndrbtn w-100"
                              style={{ height: "34px", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreFGStock mt-4">
                    <div className="container-fluid p-0 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Item NO</th>
                              <th>Item Code</th>
                              <th>Item Desc</th>
                              <th>Store</th>
                              <th>Stock</th>
                              <th>Rate</th>
                              <th>Value</th>
                              <th>WIP Wt</th>
                              <th>Total Wt</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan="10" className="text-center py-4">
                                  <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                </td>
                              </tr>
                            ) : rows && rows.length > 0 ? (
                              rows.map((item, index) => {
                                const stockQty = getTotalStock(item);
                                const rateVal = parseFloat(item?.rate || 0);
                                const valueVal = parseFloat(item?.amount || (stockQty * rateVal).toFixed(2));

                                return (
                                  <tr key={item?.id || item?.item_code || index}>
                                    <td>{index + 1}</td>
                                    <td>{item?.item_no || item?.id || "-"}</td>
                                    <td>{item?.item_code || "-"}</td>
                                    <td>{item?.description || "-"}</td>
                                    <td>{filters.store || "Main Store"}</td>
                                    <td>{stockQty}</td>
                                    <td>{rateVal}</td>
                                    <td>{valueVal}</td>
                                    <td>{item?.wip_wt || item?.wip_weight || "-"}</td>
                                    <td>{item?.total_wt || item?.total_weight || "-"}</td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan="10" className="text-center text-muted py-4">
                                  No finish good stock records found.
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

export default FGStock;
