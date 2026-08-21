import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import { Tooltip, IconButton } from "@mui/material";
import { FaInfoCircle, FaUndo, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "./DeliveryChlln.css";
import { getDeliveryChallans } from "../../../Service/StoreApi.jsx";

const DeliveryChlln = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [challanList, setChallanList] = useState([]);
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
    fetchDeliveryChallans();
  }, []);

  const fetchDeliveryChallans = async () => {
    try {
      setLoading(true);
      const res = await getDeliveryChallans();
      const data = res?.data || res;
      if (Array.isArray(data)) {
        setChallanList(data.sort((a, b) => b.id - a.id));
      }
    } catch (error) {
      console.error("Error fetching delivery challans:", error);
    } finally {
      setLoading(false);
    }
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
      window.open(`https://sellerp-backend.onrender.com/Store/DeliveryChallan/pdf/${item.id}/`, "_blank", "noopener,noreferrer");
    } else {
      alert(`No PDF attached or generated for Delivery Challan: ${item?.DCNo || item?.ChallanNo || "this record"}`);
    }
  };

  return (
    <div className="NewStoreDeliveryChlln">
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
                <div className="DeliveryChlln-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="header-title mb-0">Delivery Challan List</h5>
                    <div className="d-flex gap-2">
                      <Link className="vndrbtn">DC - Report</Link>
                      <Link type="button" className="vndrbtn" to="/DeliveryQuery">Delivery Challan Query</Link>
                    </div>
                  </div>
                </div>

                <div className="DeliveryChlln-main mt-3">
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

                          {/* Customer Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Customer Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Customer Name"
                            />
                          </div>

                          {/* DC Series */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">DC Series</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                            </select>
                          </div>

                          {/* DC Type */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">DC Type</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                            </select>
                          </div>

                          {/* DC No. */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">DC No.</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter DC No."
                            />
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

                          {/* Plant */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                            </select>
                          </div>

                          {/* Inventory */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Inventory</label>
                            <select className="form-select">
                              <option value="">ALL</option>
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

                  <div className="StoreDeliveryChlln mt-4">
                    <div className="container-fluid p-0 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Year</th>
                              <th>Plant</th>
                              <th>DC No</th>
                              <th>DC Date</th>
                              <th>Type </th>
                              <th>Cust Code</th>
                              <th>Cust Name</th>
                              <th>Inventry</th>
                              <th>User</th>
                              <th>Info</th>
                              <th>Return</th>
                              <th>Edit</th>
                              <th>Del</th>
                              <th>View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan={15} className="text-center py-4 text-muted">Loading...</td>
                              </tr>
                            ) : challanList.length === 0 ? (
                              <tr>
                                <td colSpan={15} className="text-center py-4 text-muted">No Records Found</td>
                              </tr>
                            ) : (
                              challanList.map((item, index) => (
                                <tr key={item.id || index}>
                                  <td className="text-center">{index + 1}</td>
                                  <td>{item.ChallanDate ? new Date(item.ChallanDate).getFullYear() : "-"}</td>
                                  <td>{item.Plant || "-"}</td>
                                  <td className="text-center fw-bold">{item.DCNo || item.ChallanNo || "-"}</td>
                                  <td>{item.ChallanDate || "-"}</td>
                                  <td>{item.Type || item.DCType || "-"}</td>
                                  <td>{item.CustCode || item.Contractor || "-"}</td>
                                  <td>{item.CustName || item.Contractor || "-"}</td>
                                  <td>{item.Inventory || item.Department || "-"}</td>
                                  <td>Admin</td>
                                  <td className="text-center">
                                    <Tooltip title="View Information">
                                      <IconButton size="small" sx={{ color: '#0ea5e9', '&:hover': { bgcolor: '#e0f2fe' } }}><FaInfoCircle size={16} /></IconButton>
                                    </Tooltip>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip title="Return Item">
                                      <IconButton size="small" sx={{ color: '#8b5cf6', '&:hover': { bgcolor: '#ede9fe' } }}><FaUndo size={16} /></IconButton>
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
                                    <Tooltip title="View Document">
                                      <IconButton size="small" sx={{ color: '#64748b', '&:hover': { bgcolor: '#f1f5f9' } }} onClick={() => handleViewPdf(item)}><FaEye size={16} /></IconButton>
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

export default DeliveryChlln;
