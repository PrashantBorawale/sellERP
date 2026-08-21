import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./Report.css";
import { getGrnDetails } from "../../Service/StoreApi.jsx";

const Report = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [reportData, setReportData] = useState([]);
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
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const data = await getGrnDetails();
      if (Array.isArray(data)) {
        setReportData(data.sort((a, b) => b.id - a.id));
      }
    } catch (error) {
      console.error("Error fetching GRN report details:", error);
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
      window.open(`https://sellerp-backend.onrender.com/Store/grn-pdf/${item.id}/`, "_blank", "noopener,noreferrer");
    } else {
      alert(`No PDF attached or generated for GRN: ${item?.GrnNo || "this record"}`);
    }
  };

  return (
    <div className="NewStoreGateInward">
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
                <div className="GateInward-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="header-title mb-0">Purchase GRN List</h5>
                    <div className="d-flex gap-2">
                      <Link className="vndrbtn">GRN Report</Link>
                      <Link type="button" className="vndrbtn" to="/ReportQuery">GRN Query</Link>
                    </div>
                  </div>
                </div>
                
                <div className="GateInward-main mt-3">
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

                          {/* Supplier Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Supplier Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Supplier Name"
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

                          {/* GRN No. */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">GRN No.</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Gate Entry No."
                            />
                          </div>

                          {/* PO No. */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">PO No.</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Gate Entry No."
                            />
                          </div>

                          {/* Plant */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                            </select>
                          </div>

                          {/* Main Group */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Main Group</label>
                            <select className="form-select">
                              <option value="">ALL</option>
                            </select>
                          </div>

                          {/* Search Button */}
                          <div className="col-md-2 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="vndrbtn w-100">
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="StoreGateInward">
                  <div className="container-fluid p-0 mt-4 text-start">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>Sr no.</th>
                            <th>Year</th>
                            <th>Plant</th>
                            <th>GRN No</th>
                            <th>GRN Date</th>
                            <th>Entry Date</th>
                            <th>Challan No</th>
                            <th>Challan Date</th>
                            <th>Invoice No</th>
                            <th>Invoice Date</th>
                            <th>Supplier Name</th>
                            <th>PO No</th>                           
                            <th>User</th>
                            <th>Info</th>
                            <th>Doc</th>
                            <th>Qc</th>
                            <th>Bill</th>
                            <th>Email</th>
                            <th>Delete</th>
                            <th>Edit</th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan={21} className="text-center py-4 text-muted">Loading...</td>
                            </tr>
                          ) : reportData.length === 0 ? (
                            <tr>
                              <td colSpan={21} className="text-center py-4 text-muted">No Records Found</td>
                            </tr>
                          ) : (
                            reportData.map((item, index) => (
                              <tr key={item.id || index}>
                                <td className="text-center">{index + 1}</td>
                                <td>{item.GrnDate ? new Date(item.GrnDate).getFullYear() : "-"}</td>
                                <td>{item.Plant || "-"}</td>
                                <td className="text-center fw-bold">{item.GrnNo || "-"}</td>
                                <td>{item.GrnDate || "-"}</td>
                                <td>{item.GrnDate || "-"}</td>
                                <td className="text-center">{item.ChallanNo || "-"}</td>
                                <td>{item.ChallanDate || "-"}</td>
                                <td className="text-center">{item.InvoiceNo || "-"}</td>
                                <td>{item.InvoiceDate || "-"}</td>
                                <td>{item.SelectSupplier || "-"}</td>
                                <td className="text-center">{item.SelectPO || "-"}</td>
                                <td>Admin</td>
                                <td className="text-center">-</td>
                                <td className="text-center">-</td>
                                <td className="text-center">-</td>
                                <td className="text-center">-</td>
                                <td className="text-center">-</td>
                                <td className="text-center">-</td>
                                <td className="text-center">-</td>
                                <td className="text-center">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary"
                                    style={{ padding: "2px 8px", fontSize: "0.75rem" }}
                                    onClick={() => handleViewPdf(item)}
                                  >
                                    View PDF
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
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

export default Report;
