import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./PendingIndent.css";
import * as XLSX from "xlsx";

const PendingIndent = () => {
  // Side‐nav control
  const [sideNavOpen, setSideNavOpen] = useState(false);

  // Raw list from API
  const [indentList, setIndentList] = useState([]);

  // Filter states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [plant, setPlant] = useState("");
  const [indentNo, setIndentNo] = useState("");
  const [item, setItem] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [mainGroup, setMainGroup] = useState("");
  const [directMrp, setDirectMrp] = useState("");
  const [department, setDepartment] = useState("");

  // Dummy toggle to re-run filters on Search click
  // removed searchToggle as it is unused

  // Fetch pending indents
  const fetchPendingAuthIndents = async () => {
    try {
      const res = await fetch(
        "https://sellerp-backend.onrender.com/Purchase/pending-indents/"
      );
      const { data } = await res.json();
      setIndentList(data);
    } catch (err) {
      console.error("Failed fetching indents:", err);
    }
  };

  // Take approve/reject action
  const handleTakeAction = async (id, action) => {
    try {
      await fetch(
        "https://sellerp-backend.onrender.com/Purchase/indent-auth-update/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ indent_id: id, auth_status: action }),
        }
      );
      // refresh list
      fetchPendingAuthIndents();
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  useEffect(() => {
    fetchPendingAuthIndents();
  }, []);

  // Apply or remove body class for side‑nav
  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  // Compute filtered list
  const filteredIndents = useMemo(() => {
    return indentList.filter((ind) => {
      if (fromDate && ind.Date < fromDate) return false;
      if (toDate && ind.Date > toDate) return false;
      if (plant && ind.Plant !== plant) return false;
      if (indentNo && !ind.IndentNo.includes(indentNo)) return false;
      if (
        item &&
        !ind.indent_details.some((d) =>
          d.ItemNoCpcCode.includes(item)
        )
      )
        return false;
      if (
        typeFilter &&
        !ind.indent_details.some((d) => d.Type === typeFilter)
      )
        return false;
      if (mainGroup && ind.Category !== mainGroup) return false;
      if (directMrp && ind.CPCCode !== directMrp) return false;
      if (department && ind.WorkOrder !== department) return false;
      return true;
    });
  }, [
    indentList,
    fromDate,
    toDate,
    plant,
    indentNo,
    item,
    typeFilter,
    mainGroup,
    directMrp,
    department,
  ]);

  const handleExportExcel = () => {
    if (filteredIndents.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = [];
    filteredIndents.forEach((ind, i) => {
      if (ind.indent_details && ind.indent_details.length > 0) {
        ind.indent_details.forEach((d, j) => {
          exportData.push({
            "Sr No.": `${i + 1}.${j + 1}`,
            "Plant": ind.Plant || "",
            "Series": ind.Series || "",
            "Indent No": ind.IndentNo || "",
            "Date": ind.Date || "",
            "Time": ind.Time || "",
            "Category": ind.Category || "",
            "CPC Code": ind.CPCCode || "",
            "Work Order": ind.WorkOrder || "",
            "Remark": ind.Remark || "",
            "Auth": ind.Auth || "",
            "Item No": d.ItemNoCpcCode || "",
            "Description": d.Description || "",
            "Qty": d.Qty || "",
            "Unit": d.Unit || "",
            "Sch Date": d.SchDate || "",
            "Type": d.Type || ""
          });
        });
      } else {
        exportData.push({
          "Sr No.": `${i + 1}`,
          "Plant": ind.Plant || "",
          "Series": ind.Series || "",
          "Indent No": ind.IndentNo || "",
          "Date": ind.Date || "",
          "Time": ind.Time || "",
          "Category": ind.Category || "",
          "CPC Code": ind.CPCCode || "",
          "Work Order": ind.WorkOrder || "",
          "Remark": ind.Remark || "",
          "Auth": ind.Auth || ""
        });
      }
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pending Indents");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Pending_Indents.xlsx");
  };

  return (
    <div className="erp-page NewPendingIndentMaster">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={() => setSideNavOpen((s) => !s)} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={() => setSideNavOpen((s) => !s)}
              />

              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="PendingIndent-content p-4">
                  
                  {/* Header */}
                  <div className="erp-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title mb-0">
                          Pending Indent Release List
                        </h5>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end">
                        <button className="vndrbtn" onClick={handleExportExcel}>
                          <i className="fas fa-file-excel me-2"></i> Export To Excel
                        </button>
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
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>ALL PENDING INDENT</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>FROM DATE</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>TO DATE</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>PLANT</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                <div className="form-check d-flex justify-content-center mb-0">
                                  <input className="form-check-input me-2" type="checkbox" id="supplierNameCheck" />
                                  <label className="form-check-label mb-0" htmlFor="supplierNameCheck">INDENT NO</label>
                                </div>
                              </th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                <div className="form-check d-flex justify-content-center mb-0">
                                  <input className="form-check-input me-2" type="checkbox" id="itemCheck" />
                                  <label className="form-check-label mb-0" htmlFor="itemCheck">ITEM</label>
                                </div>
                              </th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                <div className="form-check d-flex justify-content-center mb-0">
                                  <input className="form-check-input me-2" type="checkbox" id="typeCheck" />
                                  <label className="form-check-label mb-0" htmlFor="typeCheck">TYPE</label>
                                </div>
                              </th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>MAIN GROUP</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>DIRECT/MRP</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>DEPARTMENT</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ padding: '8px' }}>
                                <button className="btn btn-sm btn-light w-100 fw-bold text-secondary" style={{ fontSize: '0.75rem' }}>All Pending Indent</button>
                              </td>
                              <td style={{ padding: '8px' }}>
                                <input type="date" className="form-control form-control-sm" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                              </td>
                              <td style={{ padding: '8px' }}>
                                <input type="date" className="form-control form-control-sm" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                              </td>
                              <td style={{ padding: '8px' }}>
                                <select className="form-select form-select-sm" value={plant} onChange={(e) => setPlant(e.target.value)}>
                                  <option value="">All Plants</option>
                                  <option>Plant 1</option>
                                  <option>Plant 2</option>
                                  <option>Plant 3</option>
                                </select>
                              </td>
                              <td style={{ padding: '8px' }}>
                                <input type="text" className="form-control form-control-sm" placeholder="Indent No" value={indentNo} onChange={(e) => setIndentNo(e.target.value)} />
                              </td>
                              <td style={{ padding: '8px' }}>
                                <input type="text" className="form-control form-control-sm" placeholder="Item" value={item} onChange={(e) => setItem(e.target.value)} />
                              </td>
                              <td style={{ padding: '8px' }}>
                                <select className="form-select form-select-sm" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                                  <option value="">All Types</option>
                                  <option>type1</option>
                                  <option>type2</option>
                                </select>
                              </td>
                              <td style={{ padding: '8px' }}>
                                <select className="form-select form-select-sm" value={mainGroup} onChange={(e) => setMainGroup(e.target.value)}>
                                  <option value="">All Groups</option>
                                  <option>Category 1</option>
                                </select>
                              </td>
                              <td style={{ padding: '8px' }}>
                                <select className="form-select form-select-sm" value={directMrp} onChange={(e) => setDirectMrp(e.target.value)}>
                                  <option value="">Direct/MRP</option>
                                  <option>CR Name 1</option>
                                </select>
                              </td>
                              <td style={{ padding: '8px' }}>
                                <select className="form-select form-select-sm" value={department} onChange={(e) => setDepartment(e.target.value)}>
                                  <option value="">All Departments</option>
                                  <option>Dept 1</option>
                                </select>
                              </td>
                              <td style={{ padding: '8px', textAlign: 'center' }}>
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
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>#</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>PLANT</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>SERIES</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>INDENT NO</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>DATE</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>TIME</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>CATEGORY</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>CPC CODE</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>WORK ORDER</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>REMARK</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>AUTH</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>DETAILS</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>APPROVE</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>REJECT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredIndents.length === 0 && (
                              <tr>
                                <td colSpan="14" className="text-center py-4 text-muted" style={{ fontSize: '0.85rem' }}>
                                  No pending indents found.
                                </td>
                              </tr>
                            )}
                            {filteredIndents.map((ind, idx) => (
                              <tr key={ind.id}>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{idx + 1}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{ind.Plant || "—"}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{ind.Series}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{ind.IndentNo}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{ind.Date}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{ind.Time}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{ind.Category || "—"}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{ind.CPCCode || "—"}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{ind.WorkOrder || "—"}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{ind.Remark || "—"}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                  <span
                                    className={`badge ${ind.Auth === "Pending"
                                      ? "bg-warning text-dark"
                                      : ind.Auth === "Approved"
                                        ? "bg-success"
                                        : "bg-danger"
                                      }`}
                                  >
                                    {ind.Auth}
                                  </span>
                                </td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                  <ul className="mb-0 ps-3 text-start">
                                    {ind.indent_details.map((d) => (
                                      <li key={d.id}>
                                        {d.ItemNoCpcCode} — {d.Description} ×{" "}
                                        {d.Qty} ({d.Unit})
                                        <br />
                                        <span className="text-muted">Sch: {d.SchDate} | Type: {d.Type}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                  <button 
                                    className="btn btn-sm btn-outline-success border-0" 
                                    title="Approve Indent" 
                                    onClick={() => handleTakeAction(ind.id, "Approved")}
                                  >
                                    <i className="fas fa-check-circle" style={{ fontSize: '1.25rem' }}></i>
                                  </button>
                                </td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                  <button 
                                    className="btn btn-sm btn-outline-danger border-0" 
                                    title="Reject Indent" 
                                    onClick={() => handleTakeAction(ind.id, "Rejected")}
                                  >
                                    <i className="fas fa-times-circle" style={{ fontSize: '1.25rem' }}></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
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

export default PendingIndent;
