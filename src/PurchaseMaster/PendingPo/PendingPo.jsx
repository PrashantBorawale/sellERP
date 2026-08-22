import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./PendingPo.css";

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

  // toggle to re-run filters on Search click
  // removed searchToggle as it is unused

  // fetch once on mount
  const fetchPendingPo = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      
      let regularPOs = [];
      let jwPOs = [];

      // 1. Fetch Regular Pending POs
      try {
        const res1 = await fetch(
          "https://sellerp-backend.onrender.com/Purchase/purchase-orders/unverified/simple/",
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );
        
        if (res1.ok) {
          const contentType = res1.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data1 = await res1.json();
            regularPOs = data1.data || data1 || [];
            if (!Array.isArray(regularPOs)) regularPOs = [];
          }
        }
      } catch (err) {
        console.error("Failed to fetch Regular POs:", err);
      }

      // 2. Fetch Jobwork Pending POs
      try {
        const res2 = await fetch(
          "https://sellerp-backend.onrender.com/Purchase/jobwork-po/pending/",
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );
        
        if (res2.ok) {
          const contentType = res2.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data2 = await res2.json();
            jwPOs = data2.data || data2 || [];
            if (!Array.isArray(jwPOs)) jwPOs = [];
            
            // Tag and normalize JW POs to match table columns
            jwPOs = jwPOs.map((po) => ({ 
              ...po, 
              isJW: true,
              Type: po.Type || po.PoType,
              DeliveryDate: po.DeliveryDate || po.Delivery,
              EnquiryNo: po.EnquiryNo || po.QuotNo || "",
              item_details: po.Item_Detail_Enter
                ? po.Item_Detail_Enter.map((it) => ({
                    Item: it.ItemName || "",
                    ItemDescription: it.ItemDescription || "",
                  }))
                : [],
            }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch Jobwork POs:", err);
      }

      // Combine both
      setPendingPoList([...regularPOs, ...jwPOs]);
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
    return pendingPoList.filter((po) => {
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
    });
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
                      <div className="col-md-7 d-flex flex-wrap justify-content-end align-items-center gap-2">
                        <span style={{ fontWeight: 600, color: '#475569', marginRight: '8px', fontSize: '0.85rem' }}>Ageing Days:</span>
                        <button className="btn btn-outline-secondary btn-sm" style={{ borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>0-7</button>
                        <button className="btn btn-outline-secondary btn-sm" style={{ borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>8-15</button>
                        <button className="btn btn-outline-secondary btn-sm" style={{ borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>16-30</button>
                        <button className="btn btn-outline-secondary btn-sm" style={{ borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>31-60</button>
                        <button className="btn btn-outline-secondary btn-sm" style={{ borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>Above 60</button>
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
                              <th style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>CATEGORY</th>
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
                                <button className="btn btn-sm btn-light w-100 fw-bold text-secondary" style={{ fontSize: '0.75rem' }}>View All Purchase</button>
                              </td>
                              <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px' }}>
                                <select className="form-select form-select-sm" value={plantFilter} onChange={(e) => setPlantFilter(e.target.value)}>
                                  <option value="">All Plants</option>
                                  <option>Plant 1</option>
                                  <option>Plant 2</option>
                                  <option>Plant 3</option>
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
                                  <option value="">All Types</option>
                                  <option>Type 1</option>
                                  <option>Type 2</option>
                                  <option>Type 3</option>
                                </select>
                              </td>
                              <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px' }}>
                                <select className="form-select form-select-sm" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                                  <option value="">All Categories</option>
                                  <option>Category 1</option>
                                  <option>Category 2</option>
                                </select>
                              </td>
                              <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px' }}>
                                <input type="text" className="form-control form-control-sm" placeholder="Supplier" value={supplierFilter} onChange={(e) => setSupplierFilter(e.target.value)} />
                              </td>
                              <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px' }}>
                                <input type="text" className="form-control form-control-sm" placeholder="PO No" value={poNoFilter} onChange={(e) => setPoNoFilter(e.target.value)} />
                              </td>
                              <td style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "80px", maxWidth: "150px",  padding: '8px' }}>
                                <select className="form-select form-select-sm" value={crNameFilter} onChange={(e) => setCrNameFilter(e.target.value)}>
                                  <option value="">All CR Names</option>
                                  <option>CR Name 1</option>
                                  <option>CR Name 2</option>
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
                              filteredList.map((po) => (
                                <tr key={po.id}>
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

export default PendingPo;
