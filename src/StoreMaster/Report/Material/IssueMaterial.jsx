import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import { Tooltip, IconButton } from "@mui/material";
import { FaInfoCircle, FaTrash, FaEye } from "react-icons/fa";
import "./IssueMaterial.css";

const IssueMaterial = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [materialIssues, setMaterialIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API URLs
  const GET_API_URL = "https://sellerp-backend.onrender.com/Store/api/New-Material-Issue/";
  const PDF_API_BASE_URL =
    "https://sellerp-backend.onrender.com/Store/generate-materialissue/";
  const DELETE_API_BASE_URL =
    "https://sellerp-backend.onrender.com/Store/material-challan/delete/"; // New Delete API URL

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(GET_API_URL); // Fetching data from API
      
      let fetchedData = [];
      if (Array.isArray(response.data)) {
        fetchedData = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        fetchedData = response.data.data;
      }
      
      // Sort highest ID at the top
      fetchedData.sort((a, b) => {
        const idA = parseInt(a.id || a.pk || 0, 10);
        const idB = parseInt(b.id || b.pk || 0, 10);
        return idB - idA;
      });

      setMaterialIssues(fetchedData);
      setError(null);
    } catch (err) {
      setError("Error while fetching data. Please check the API server.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(materialIssues.length / itemsPerPage);
  const currentMaterialIssues = materialIssues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Action Functions ---

  // View: Opens the PDF in a new tab
  const handleViewClick = (id) => {
    const pdfUrl = PDF_API_BASE_URL + id + "/";
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  // Delete: Deletes the record using the new API
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        // Using the new delete API URL
        await axios.delete(DELETE_API_BASE_URL + id + "/");

        // Remove the deleted item from UI in real-time
        setMaterialIssues(materialIssues.filter((item) => item.id !== id));

        toast.success("Item deleted successfully!");
      } catch (err) {
        setError("Error while deleting item.");
        console.error("Error deleting item:", err);
      }
    }
  };

  // Info
  const handleInfoClick = (id) => alert("Info for item ID: " + id);

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

  return (
    <div className="IssueMaterial">
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
                <div className="IssueMaterial-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="header-title mb-0">Material Issue List</h5>
                    {/* <div className="d-flex gap-2">
                      <Link className="vndrbtn">Report</Link>
                      <Link type="button" className="vndrbtn" to="/MaterialQuery">M-Issue Query</Link>
                    </div> */}
                  </div>
                </div>

                <div className="IssueMaterial-main mt-3">
                  <div className="container-fluid p-0">
                    <div className="card shadow-sm border-0 mb-4 mt-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <form className="row g-3 text-start">
                          {/* Form Inputs */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">From Date</label>
                            <input type="date" className="form-control" />
                          </div>
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">To Date</label>
                            <input type="date" className="form-control" />
                          </div>
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="VISHWA S.I.">VISHWA S.I.</option>
                            </select>
                          </div>
                          <div className="col-md-2 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="vndrbtn w-100">
                              Search
                            </button>
                          </div>
                          <div className="col-md-2 col-sm-6 mt-1 align-self-end">
                            <button type="button" className="btn btn-secondary w-100">
                              Reset
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreIssueMaterial mt-4">
                    <div className="container-fluid p-0 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Year</th>
                              <th>Plant</th>
                              <th>M Issue No</th>
                              <th>M Issue Date</th>
                              <th>MRN No</th>
                              <th>WO No</th>
                              <th>Emp Operator | Dept</th>
                              <th>Item | Desc | Qty</th>
                              <th>User</th>
                              <th>Info</th>
                              <th>Del</th>
                              <th>View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan="13" className="text-center">
                                  Loading...
                                </td>
                              </tr>
                            ) : error ? (
                              <tr>
                                <td colSpan="13" className="text-center text-danger">
                                  {error}
                                </td>
                              </tr>
                            ) : currentMaterialIssues.length === 0 ? (
                              <tr>
                                <td colSpan="13" className="text-center">
                                  No records found.
                                </td>
                              </tr>
                            ) : (
                              currentMaterialIssues.map((issue, index) => (
                                <tr key={issue.id}>
                                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                  <td>{new Date(issue.MaterialIssueDate).getFullYear()}</td>
                                  <td>{issue.Plant || "VISHWA S.I."}</td>
                                  <td>{issue.ChallanNo}</td>
                                  <td>
                                    {issue.MaterialIssueDate ? issue.MaterialIssueDate : "N/A"} <br/>
                                    {issue.MaterialIssueTime ? ` ${issue.MaterialIssueTime}` : ""}
                                  </td>
                                  <td>{issue.MaterialChallanTable?.[0]?.MrnNo || " "}</td>                                
                                  <td>{"N/A"}</td>
                                  <td>{`${issue.MaterialChallanTable?.[0]?.Employee || "N/A"} | ${issue.MaterialChallanTable?.[0]?.Dept || "N/A"}`}</td>
                                  <td>{`${issue.Item || "N/A"} | ${issue.MaterialChallanTable?.[0]?.ItemDescription || "N/A"} | ${issue.MaterialChallanTable?.[0]?.Qty || "N/A"}`}</td>
                                  <td>{"N/A"}</td>
                                  <td className="text-center">
                                    <Tooltip title="View Information">
                                      <IconButton size="small" onClick={() => handleInfoClick(issue.id)} sx={{ color: '#0ea5e9', '&:hover': { bgcolor: '#e0f2fe' } }}>
                                        <FaInfoCircle size={16} />
                                      </IconButton>
                                    </Tooltip>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip title="Delete Record">
                                      <IconButton size="small" onClick={() => handleDelete(issue.id)} sx={{ color: '#ef4444', '&:hover': { bgcolor: '#fee2e2' } }}>
                                        <FaTrash size={16} />
                                      </IconButton>
                                    </Tooltip>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip title="View PDF Document">
                                      <IconButton size="small" onClick={() => handleViewClick(issue.id)} sx={{ color: '#64748b', '&:hover': { bgcolor: '#f1f5f9' } }}>
                                        <FaEye size={16} />
                                      </IconButton>
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
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueMaterial;
