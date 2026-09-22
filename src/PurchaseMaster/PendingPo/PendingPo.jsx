import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./PendingPo.css";
import { Link } from "react-router-dom";
const PendingPo = () => {
  // side‑nav
  const [sideNavOpen, setSideNavOpen] = useState(false);

  // raw list
  const [pendingPoList, setPendingPoList] = useState([]);

  // filter states
  const [plantFilter, setPlantFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("");
  const [poNoFilter, setPoNoFilter] = useState("");
  const [crNameFilter, setCrNameFilter] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // toggle to re-run filters on Search click
  // removed searchToggle as it is unused

  // fetch once on mount
    const fetchPendingPo = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      let regularPOs = [];

      try {
        const res = await fetch(
          "https://sellerp-backend.onrender.com/Purchase/purchase-orders/unverified/simple/",
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );
        
        if (res.ok) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            regularPOs = data.data || data || [];
            if (!Array.isArray(regularPOs)) regularPOs = [];
          }
        }
      } catch (err) {
        console.error("Failed to fetch Regular POs:", err);
      }

      regularPOs.sort((a, b) => b.id - a.id);
      setPendingPoList(regularPOs);
    } catch (err) {
      console.error("Critical error in fetchPendingPo:", err);
    }
  };

  useEffect(() => {
    fetchPendingPo();
  }, []);

  // update body class
  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  // approve / reject handler
  const handleTakeAction = async (id, action, isJW) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (isJW) {
        if (action === "Approved") {
          await fetch(`https://sellerp-backend.onrender.com/Purchase/jobwork-po/approval/${id}/`, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ action: "approve" }),
          });
        } else if (action === "Rejected") {
          // If rejected, delete it
          await fetch(`https://sellerp-backend.onrender.com/Purchase/jobwork-po/${id}/`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
        }
      } else {
        await fetch(
          `https://sellerp-backend.onrender.com/Purchase/purchase-po/${id}/update-status-fbv/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ approved_status: action }),
          }
        );
      }
      fetchPendingPo();
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  // apply filters
    const filteredList = useMemo(() => {
    return pendingPoList
      .filter((po) => {
        if (plantFilter && po.Plant !== plantFilter) return false;
        if (fromDate && po.PoDate < fromDate) return false;
        if (toDate && po.PoDate > toDate) return false;
        if (typeFilter && po.Type !== typeFilter) return false;
        if (categoryFilter && po.Series !== categoryFilter) return false;
        if (
          supplierFilter &&
          !po.Supplier?.toLowerCase().includes(supplierFilter.toLowerCase())
        )
          return false;
        if (
          poNoFilter &&
          !po.PoNo.toString().includes(poNoFilter)
        )
          return false;
        if (
          crNameFilter &&
          !po.CPCCode?.toLowerCase().includes(crNameFilter.toLowerCase())
        )
          return false;
        return true;
      })
      .sort((a, b) => (b.id || 0) - (a.id || 0));
  }, [
    pendingPoList,
    plantFilter,
    fromDate,
    toDate,
    typeFilter,
    categoryFilter,
    supplierFilter,
    poNoFilter,
    crNameFilter,
  ]);

  // reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    plantFilter,
    fromDate,
    toDate,
    typeFilter,
    categoryFilter,
    supplierFilter,
    poNoFilter,
    crNameFilter,
  ]);

  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewPdf = (orderId, orderNo) => {
    if (orderId) {
      window.open(`https://sellerp-backend.onrender.com/Purchase/PoOrder/pdf/${orderId}/`, "_blank", "noopener,noreferrer");
    } else {
      alert(`No PDF available for PO: ${orderNo || "this order"}`);
    }
  };

  return (
    <div className="erp-page NewPendingpoMaster">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={() => setSideNavOpen((p) => !p)} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={() => setSideNavOpen((p) => !p)}
              />

              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="NewPendingpoMaster-content p-4">
                  
                  {/* Header */}
                  <div className="erp-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <h5 className="header-title mb-0">
                          Pending Purchase Order Release List
                        </h5>
                      </div>
        
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-bordered align-middle mb-0">
                          <thead className="table-light">
                            <tr>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>VIEW ALL</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>PLANT</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>FROM DATE</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>TO DATE</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>TYPE</th>
                              {/* <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>CATEGORY</th> */}
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                <div className="form-check d-flex justify-content-center mb-0">
                                  <input className="form-check-input me-2" type="checkbox" id="supplierNameCheck" />
                                  <label className="form-check-label mb-0" htmlFor="supplierNameCheck">SUPPLIER</label>
                                </div>
                              </th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                <div className="form-check d-flex justify-content-center mb-0">
                                  <input className="form-check-input me-2" type="checkbox" id="poNoCheck" />
                                  <label className="form-check-label mb-0" htmlFor="poNoCheck">PO NO</label>
                                </div>
                              </th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>CR NAME</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px' }}>
                                <Link to="/purchase-order-list" className="btn btn-sm btn-light w-100 fw-bold text-secondary" style={{ fontSize: '0.75rem', textDecoration: 'none', display: 'block', textAlign: 'center' }}>View All Purchase</Link>
                              </td>
                              <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px' }}>
                                <select className="form-select form-select-sm" value={plantFilter} onChange={(e) => setPlantFilter(e.target.value)}>
                                  <option value="">All Plants</option>
                                  <option value="VISHWA S.I.">VISHWA S.I.</option>
                                </select>
                              </td>
                              <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px' }}>
                                <input type="date" className="form-control form-control-sm" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                              </td>
                              <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px' }}>
                                <input type="date" className="form-control form-control-sm" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                              </td>
                              <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px' }}>
                                <select className="form-select form-select-sm" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                                  <option value="All">All</option>
                                  <option value="Open">Open</option>
                                  <option value="Close">Close</option>
                                </select>
                              </td>
                              {/* <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px' }}>
                                <select className="form-select form-select-sm" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                                  <option value="">All Categories</option>
                                  <option>Category 1</option>
                                  <option>Category 2</option>
                                </select>
                              </td> */}
                              <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px' }}>
                                <input type="text" className="form-control form-control-sm" placeholder="Supplier" value={supplierFilter} onChange={(e) => setSupplierFilter(e.target.value)} />
                              </td>
                              <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px' }}>
                                <input type="text" className="form-control form-control-sm" placeholder="PO No" value={poNoFilter} onChange={(e) => setPoNoFilter(e.target.value)} />
                              </td>
                              <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px' }}>
                                <select className="form-select form-select-sm" value={crNameFilter} onChange={(e) => setCrNameFilter(e.target.value)}>
                                  <option value="">All</option>
                                </select>
                              </td>
                              <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px', textAlign: 'center' }}>
                                <button className="vndrbtn btn-sm px-3 w-100" style={{ fontSize: '0.75rem', minHeight: '30px' }}>Search</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Color Legend */}
                  <div className="d-flex justify-content-end mb-2 gap-3" style={{ fontSize: '0.85rem' }}>
                    <div className="d-flex align-items-center gap-1">
                      <div style={{ width: '16px', height: '16px', backgroundColor: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: '3px' }}></div>
                      <span className="text-muted fw-bold">New Today</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <div style={{ width: '16px', height: '16px', backgroundColor: '#fff3cd', border: '1px solid #ffe69c', borderRadius: '3px' }}></div>
                      <span className="text-muted fw-bold">Updated/Edited</span>
                    </div>
                  </div>

                  {/* Data Table Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-0">
                      <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        <table className="table table-bordered table-striped table-hover align-middle mb-0">
                          <thead className="table-primary sticky-top" style={{ zIndex: 1 }}>
                            <tr>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>PO NO.</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>ENQUIRY NO.</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>TYPE</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>PLANT</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>SERIES</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>SUPPLIER</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>DELIVERY DATE</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>PO DATE</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>CREATED BY</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>ITEMS</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>VIEW</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>APPROVE</th>
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>REJECT</th>
                            </tr>
                          </thead>
                          <tbody>
                              {filteredList.length === 0 ? (
                              <tr>
                                <td colSpan="13" className="text-center py-4 text-muted" style={{ fontSize: '0.85rem' }}>
                                  No pending purchase orders.
                                </td>
                              </tr>
                            ) : (
                              paginatedList.map((po) => {
                                const getRowStyle = (order) => {
                                  const isEdited = order.is_edited || order.isEdited || (order.updated_at && order.created_at && order.updated_at !== order.created_at);
                                  const today = new Date().toISOString().split("T")[0];
                                  const isToday = order.PoDate === today || (order.created_at && order.created_at.startsWith(today)) || (order.createdAt && order.createdAt.startsWith(today));
                                  
                                  if (isEdited) {
                                    return { backgroundColor: '#fff3cd' }; // Highlight updated/edited
                                  } else if (isToday) {
                                    return { backgroundColor: '#e8f5e9' }; // Highlight new today
                                  }
                                  return {};
                                };

                                return (
                                  <tr key={po.id} style={getRowStyle(po)}>
                                  <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{po.PoNo}</td>
                                  <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{po.EnquiryNo}</td>
                                  <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{po.Type}</td>
                                  <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{po.Plant}</td>
                                  <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{po.Series}</td>
                                  <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{po.Supplier || "—"}</td>
                                  <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{po.DeliveryDate}</td>
                                  <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{po.PoDate}</td>
                                  <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{po.created_by_username}</td>
                                  <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                    {(po.item_details || [])
                                      .map((it) => `${it.Item} – ${it.ItemDescription}`)
                                      .join(", ")}
                                  </td>
                                  <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-info border-0"
                                      title="View PO PDF"
                                      onClick={() => handleViewPdf(po.id, po.PoNo)}
                                    >
                                      <i className="fas fa-eye" style={{ fontSize: '1.25rem' }}></i>
                                    </button>
                                  </td>
                                  <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                    <button 
                                      className="btn btn-sm btn-outline-success border-0" 
                                      title="Approve PO" 
                                      onClick={() => handleTakeAction(po.id, "Approved", po.isJW)}
                                    >
                                      <i className="fas fa-check-circle" style={{ fontSize: '1.25rem' }}></i>
                                    </button>
                                  </td>
                                  <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                    <button 
                                      className="btn btn-sm btn-outline-danger border-0" 
                                      title="Reject PO" 
                                      onClick={() => handleTakeAction(po.id, "Rejected", po.isJW)}
                                    >
                                      <i className="fas fa-times-circle" style={{ fontSize: '1.25rem' }}></i>
                                    </button>
                                  </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                                    <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                    <div className="record-count fw-bold">
                      Total Record : <span className="badge bg-primary text-white fs-6">{filteredList.length}</span>
                    </div>

                    {totalPages > 1 && (
                      <nav>
                        <ul className="pagination pagination-sm mb-0">
                          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button
                              type="button"
                              className="page-link"
                              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            >
                              Previous
                            </button>
                          </li>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <li
                              key={page}
                              className={`page-item ${currentPage === page ? "active" : ""}`}
                            >
                              <button
                                type="button"
                                className="page-link"
                                onClick={() => setCurrentPage(page)}
                              >
                                {page}
                              </button>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button
                              type="button"
                              className="page-link"
                              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    )}
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

export default PendingPo;
