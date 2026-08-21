import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import { Tooltip, IconButton } from "@mui/material";
import { FaFileAlt, FaEdit, FaTrash, FaEye, FaEnvelope } from "react-icons/fa";
import * as XLSX from "xlsx";
import "./IndentReport.css";
import { getIndentData } from "../../../Service/StoreApi.jsx";

const IndentReport = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [indentList, setIndentList] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchIndentList();
  }, []);

  const fetchIndentList = async () => {
    try {
      setLoading(true);
      const res = await getIndentData();
      const data = res?.data || res;
      if (Array.isArray(data)) {
        setIndentList(data.sort((a, b) => b.id - a.id));
      }
    } catch (error) {
      console.error("Error fetching indent list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (indentList.length === 0) {
      alert("No data to export");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(indentList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Indents");
    XLSX.writeFile(wb, "IndentList.xlsx");
  };

  const handleViewPdf = (item) => {
    const viewPath = item?.PDF_Link || item?.View || item?.pdf || item?.file || item?.document;
    if (viewPath && viewPath !== "null" && viewPath !== "undefined" && viewPath !== "") {
      let url = viewPath;
      if (viewPath.startsWith("http://") || viewPath.startsWith("https://")) {
        url = viewPath;
      } else if (viewPath.startsWith("/")) {
        url = `https://sellerp-backend.onrender.com${viewPath}`;
      } else {
        url = `https://sellerp-backend.onrender.com/${viewPath}`;
      }
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (item?.id) {
      window.open(`https://sellerp-backend.onrender.com/Store/NewIndent/pdf/${item.id}/`, "_blank", "noopener,noreferrer");
    } else {
      alert(`No PDF attached or generated for Indent: ${item?.IndentNo || "this record"}`);
    }
  };

  return (
    <div className="IndentReport">
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
                <div className="IndentReport-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="header-title mb-0">Indent List</h5>
                    <div className="d-flex gap-2">
                      <Link className="vndrbtn" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>Indent Status Report</Link>
                      <button className="vndrbtn" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}>Excel</button>
                    </div>
                  </div>
                </div>

                <div className="IndentReport-main mt-3">
                  <div className="container-fluid p-0">
                    <div className="card shadow-sm border-0 mb-4 mt-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <form className="row g-3 text-start">
                          {/* From Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">From Date</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* To Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">To Date</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* Indent Series */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Indent Series</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                            </select>
                          </div>

                          {/* Item Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Item Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Item Name"
                            />
                          </div>

                          {/* Indent No. */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Indent No.</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Indent No."
                            />
                          </div>

                          {/* Plant */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                            </select>
                          </div>

                          {/* Search Button */}
                          <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="vndrbtn w-100">
                              Search
                            </button>
                          </div>

                          {/* Reset Button */}
                          <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button type="button" className="btn btn-secondary w-100">
                              Reset
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreIndentReport mt-4">
                    <div className="container-fluid p-0 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Year</th>
                              <th>Plant</th>
                              <th>Indent No | Date</th>
                              <th>Required Delivery</th>
                              <th>Indent No | Desc</th>
                              <th>Indent Qty</th>
                              <th>MRN RUN Date</th>
                              <th>Auth Detail</th>
                              <th>Status</th>
                              <th>Supplier</th>
                              <th>User</th>
                              <th>DOC</th>
                              <th>Edit</th>
                              <th>Del</th>
                              <th>View</th>
                              <th>Email</th> 
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan={17} className="text-center py-4 text-muted">Loading...</td>
                              </tr>
                            ) : indentList.length === 0 ? (
                              <tr>
                                <td colSpan={17} className="text-center py-4 text-muted">No Records Found</td>
                              </tr>
                            ) : (
                              indentList.map((item, index) => (
                                <tr key={item.id || index}>
                                  <td className="text-center">{index + 1}</td>
                                  <td>{item.IndentDate ? new Date(item.IndentDate).getFullYear() : "-"}</td>
                                  <td>{item.Plant || "-"}</td>
                                  <td>{item.IndentNo || "-"} | {item.IndentDate || "-"}</td>
                                  <td>{item.RequiredDelivery || "-"}</td>
                                  <td>{item.IndentNo || "-"} | {item.Description || "-"}</td>
                                  <td>{item.IndentQty || "-"}</td>
                                  <td>{item.MRNRunDate || "-"}</td>
                                  <td>{item.AuthDetail || "-"}</td>
                                  <td>{item.Status || "Pending"}</td>
                                  <td>{item.Supplier || "-"}</td>
                                  <td>Admin</td>
                                  <td className="text-center">
                                    <Tooltip title="View Document">
                                      <IconButton size="small" sx={{ color: '#0ea5e9', '&:hover': { bgcolor: '#e0f2fe' } }}><FaFileAlt size={16} /></IconButton>
                                    </Tooltip>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip title="Edit Record">
                                      <IconButton size="small" sx={{ color: '#f59e0b', '&:hover': { bgcolor: '#fef3c7' } }}><FaEdit size={16} /></IconButton>
                                    </Tooltip>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip title="Delete Record">
                                      <IconButton size="small" sx={{ color: '#ef4444', '&:hover': { bgcolor: '#fee2e2' } }}><FaTrash size={16} /></IconButton>
                                    </Tooltip>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip title="View Details / PDF">
                                      <IconButton size="small" sx={{ color: '#64748b', '&:hover': { bgcolor: '#f1f5f9' } }} onClick={() => handleViewPdf(item)}><FaEye size={16} /></IconButton>
                                    </Tooltip>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip title="Send Email">
                                      <IconButton size="small" sx={{ color: '#10b981', '&:hover': { bgcolor: '#d1fae5' } }}><FaEnvelope size={16} /></IconButton>
                                    </Tooltip>
                                  </td>
                                </tr>
                              ))
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

export default IndentReport;
