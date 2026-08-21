import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaFileExcel, FaList, FaEye, FaPlus, FaTrash, FaHistory, FaTable, FaCalendarAlt } from "react-icons/fa";
import "./ProductionSchedule.css";

const ProductionSchedule = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState({ month: "APR-2024", revNo: "0" });
  const [currentView, setCurrentView] = useState("list"); // 'list', 'planning', or 'edit'

  // Handle browser back button to return to the list view instead of leaving the page
  useEffect(() => {
    const handlePopState = (event) => {
      if (currentView !== "list") {
        setCurrentView("list");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [currentView]);

  // Push state to history when changing view away from list
  useEffect(() => {
    if (currentView !== "list") {
      // Check if we already pushed a state for this view to avoid duplicates
      if (!window.history.state || window.history.state.view !== currentView) {
        window.history.pushState({ view: currentView }, "");
      }
    }
  }, [currentView]);

  const fetchSchedules = async () => {
    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Settings/schedule-month/");
      if (response.ok) {
        const result = await response.json();
        const rawData = Array.isArray(result) ? result : (result.data || result.results || []);
        
        // Fetch ALL items once to count them for each schedule more efficiently
        let allItems = [];
        try {
          const itemsRes = await fetch("https://sellerp-backend.onrender.com/Planning/production-schedule/");
          if (itemsRes.ok) {
            const itemsResult = await itemsRes.json();
            allItems = Array.isArray(itemsResult) ? itemsResult : (itemsResult.data || result.results || itemsResult.data || itemsResult.results || []);
            // Support different API response structures
            if (!Array.isArray(allItems)) {
               allItems = itemsResult.data || itemsResult.results || [];
            }
          }
        } catch (e) {
          console.error("Error fetching all items for count:", e);
        }

        const mappedData = rawData.map((item, index) => {
          // Format "MAY 2026" to "MAY-2026" or similar
          const monthYear = (item.month_name || "").replace(" ", "-");
          
          // Count items that belong to this schedule month ID
          const totalItemCount = allItems.filter(i => 
            i.schedule_month !== null && 
            i.schedule_month !== undefined && 
            Number(i.schedule_month) === Number(item.id)
          ).length;

          // Format YYYY-MM-DD to DD/MM/YYYY
          const formatDt = (d) => {
            if (!d) return "";
            if (d.includes("/")) return d;
            const [y, m, d1] = d.split("-");
            return `${d1}/${m}/${y}`;
          };

          return {
            id: item.id || index,
            monthYear: monthYear,
            fromDate: formatDt(item.from_date),
            toDate: formatDt(item.to_date),
            revNo: item.rev_no || "0",
            totalItem: totalItemCount,
            workingDays: item.w_days || item.w_day || 0
          };
        });
        setScheduleData(mappedData);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const [itemData, setItemData] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [itemList, setItemList] = useState([]);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://sellerp-backend.onrender.com/Sales/items/customers-list/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const result = await response.json();
        const data = result.data || result.results || result || [];
        setCustomers(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://sellerp-backend.onrender.com/All_Masters/api/item/summary/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const result = await response.json();
        const data = result.data || result.results || result || [];
        setItemList(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchScheduleItems = async (scheduleMonthId, monthYear) => {
    setLoadingItems(true);
    try {
      const formattedMonth = monthYear ? monthYear.replace("-", " ") : "";
      const response = await fetch(`https://sellerp-backend.onrender.com/Planning/schedule-month-filter/?month_name=${encodeURIComponent(formattedMonth)}`);
      let rawItems = [];
      if (response.ok) {
        const result = await response.json();
        
        const dataArray = Array.isArray(result.data) ? result.data : [];
        if (dataArray.length > 0) {
           const scheduleData = dataArray[0];
           if (Array.isArray(scheduleData.production_schedules)) {
             rawItems = scheduleData.production_schedules;
           }
        }
        
        setItemData(rawItems);
      }

      // 2. Parse Month/Year for the Report API call
      const monthMap = {
        "JAN": 1, "JANUARY": 1, "FEB": 2, "FEBRUARY": 2, "MAR": 3, "MARCH": 3,
        "APR": 4, "APRIL": 4, "MAY": 5, "JUN": 6, "JUNE": 6,
        "JUL": 7, "JULY": 7, "AUG": 8, "AUGUST": 8, "SEP": 9, "SEPTEMBER": 9,
        "OCT": 10, "OCTOBER": 10, "NOV": 11, "NOVEMBER": 11, "DEC": 12, "DECEMBER": 12
      };
      const parts = (monthYear || "").split("-");
      const monthName = parts[0] ? parts[0].toUpperCase() : "";
      const year = parts[1] || new Date().getFullYear();
      const monthNum = monthMap[monthName] || (new Date().getMonth() + 1);

      // 3. Fetch Data from the Month-Wise Invoice Report API
      // Using the exact pattern: https://sellerp-backend.onrender.com/Planning/month-wise-invoice-report/?month=5&year=2026
      const rptResponse = await fetch(`https://sellerp-backend.onrender.com/Planning/month-wise-invoice-report/?month=${monthNum}&year=${year}`);
      let reportData = [];
      if (rptResponse.ok) {
        const rptResult = await rptResponse.json();
        reportData = Array.isArray(rptResult) ? rptResult : (rptResult.data || rptResult.results || []);
      }

      // 4. Merge Data Item Wise
      // We prioritize rawItems from the production-schedule API, 
      // but enrich/overwrite with the latest status from the invoice report.
      const mergedItems = rawItems.map((schItem) => {
        const match = reportData.find((rpt) => {
          const rptItemNo = String(rpt.item_no || "").trim().toLowerCase();
          const rptItemCode = String(rpt.item_code || "").trim().toLowerCase();
          const schItemNo = String(schItem.item_no || "").trim().toLowerCase();
          const schItemCode = String(schItem.item_code || "").trim().toLowerCase();
          return (
            (rptItemNo && rptItemNo === schItemNo) ||
            (rptItemCode && rptItemCode === schItemCode)
          );
        });

        // API values item wise
        // 1. Sch.Qty comes from report if available, else from schedule
        const schQty = (match && match.sch_qty !== undefined) ? Number(match.sch_qty) : Number(schItem.sch_qty || 0);
        // 2. Dis.Qty (Dispatched) comes from report's total_inv_qty
        const disQty = Number(match?.total_inv_qty || 0);
        // 3. Bal.Qty (Balance) is calculated from the report data
        const balQty = (match && match.bal_qty !== undefined) ? Number(match.bal_qty) : (schQty - disQty);

        return {
          ...schItem,
          // Update values from the Month-Wise Report API
          sch_qty: schQty,
          total_inv_qty: disQty,
          bal_qty: balQty,
          // Map additional status fields using EXACT TitleCase keys from API
          days_comp: match?.Days_Comp || 0,
          cur_avg: match?.Cur_Avg || 0,
          days_rem: match?.Days_Rem || 0,
          ask_rate: match?.Ask_Rate || 0,
          // Calculate status percentage based on latest figures
          status: schQty > 0 ? Math.round((disQty / schQty) * 100) : 0,
          item_description:
            schItem.item_description ||
            schItem.item_desc ||
            schItem.item_description ||
            match?.item_description ||
            "-",
        };
      });

      setItemData(mergedItems);
    } catch (error) {
      console.error("Error fetching/merging data:", error);
    } finally {
      setLoadingItems(false);
    }
  };

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  useEffect(() => {
    fetchSchedules();
    fetchCustomers();
    fetchItems();
  }, []);

  const handleViewStatus = (row) => {
    setSelectedPeriod({ 
      id: row.id, 
      month: row.monthYear, 
      revNo: row.revNo, 
      workingDays: row.workingDays 
    });
    fetchScheduleItems(row.id, row.monthYear);
    setCurrentView("planning");
  };

  const [editFormData, setEditFormData] = useState({
    customer_name: "",
    po_no_date: "",
    item_code: "",
    sch_rec_on: "",
    sch_qty: "",
    buffer_qty: "",
    next_month_sc: "0",
    due_dispatch_date: ""
  });

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = async () => {
    // Extract parts if the user selected from the datalist (formatted as "PartNo - PartCode - Description")
    let itemParts = editFormData.item_code.split(" - ");
    let finalItemNo = itemParts[0] || "";
    let finalItemCode = itemParts[1] || itemParts[0] || "";
    let finalItemDesc = itemParts[2] || "";

    const payload = {
      customer_name: editFormData.customer_name,
      po_no_date: editFormData.po_no_date,
      item_no: finalItemNo,
      item_code: finalItemCode,
      item_description: finalItemDesc,
      sch_rec_on: editFormData.sch_rec_on,
      sch_qty: editFormData.sch_qty,
      buffer_qty: editFormData.buffer_qty,
      next_month_sc: editFormData.next_month_sc,
      due_dispatch_date: editFormData.due_dispatch_date,
      month: selectedPeriod.month,
      schedule_month: selectedPeriod.id,
      rev_no: selectedPeriod.revNo
    };

    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Planning/production-schedule/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Item added to schedule successfully!");
        setEditFormData({
          customer_name: "",
          po_no_date: "ALL",
          item_code: "",
          sch_rec_on: "",
          sch_qty: "",
          buffer_qty: "",
          next_month_sc: "0",
          due_dispatch_date: ""
        });
        fetchScheduleItems(selectedPeriod.id, selectedPeriod.month); // Refresh the items table
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to add: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Error adding schedule item:", error);
    }
  };

  const handleEdit = (row) => {
    setSelectedPeriod({ 
      id: row.id, 
      month: row.monthYear, 
      revNo: row.revNo, 
      workingDays: row.workingDays 
    });
    fetchScheduleItems(row.id, row.monthYear);
    setCurrentView("edit");
  };

  return (
    <div className="ProductionScheduleMaster">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                {/* --- CASE 1: SUMMARY LIST VIEW --- */}
                {currentView === "list" && (
                  <div className="ProductionSchedule mt-2">
                    <div className="ProductionSchedule-header mb-4 text-start">
                      <div className="row align-items-center">
                        <div className="col-md-4">
                          <h5 className="header-title mb-0">Production Schedule</h5>
                        </div>
                        <div className="col-md-8 text-end d-flex justify-content-end gap-2">
                          <button type="button" className="vndrbtn">Schedule Search</button>
                          <button type="button" className="vndrbtn">Schedule Month Master</button>
                          <button type="button" className="vndrbtn">MRP - Report</button>
                          <button type="button" className="vndrbtn">Report</button>
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col" style={{textAlign: 'left'}}>Month / Year</th>
                            <th scope="col">Total Item</th>
                            <th scope="col">Working Days</th>
                            <th scope="col">View</th>
                            <th scope="col">Action</th>
                            <th scope="col">Planning</th>
                            <th scope="col">Report</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scheduleData.map((row, index) => (
                            <tr key={row.id}>
                              <td>{index + 1}</td>
                              <td style={{textAlign: 'left'}}>
                                {row.monthYear}&nbsp;
                                <span className="text-muted" style={{ fontSize: "14px" }}>({row.fromDate} – {row.toDate})</span>
                                {row.revNo !== "-" && (
                                  <span className="ms-2" style={{ fontSize: "14px", color: "#0a6638", fontWeight: "bold" }}>Rev No: {row.revNo}</span>
                                )}
                              </td>
                              <td>{row.totalItem}</td>
                              <td>{row.workingDays}</td>
                              <td>
                                <button className="btn btn-primary btn-sm" onClick={() => handleViewStatus(row)}>View Status</button>
                              </td>
                              <td>
                                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(row)}>Add/Edit</button>
                              </td>
                              <td><button className="btn btn-link">📋</button></td>
                              <td><button className="btn btn-link">📄</button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-2 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center" style={{ gap: "4px" }}>
                        <button className="btn btn-sm btn-outline-secondary">Previous</button>
                        <button className="btn btn-sm btn-primary">1</button>
                        <button className="btn btn-sm btn-outline-secondary">Next</button>
                      </div>
                      <div className="d-flex align-items-center">
                        <span style={{ fontSize: "14px", fontWeight: "500" }}>Report Format :</span>
                        <select className="ms-2 form-select form-select-sm" style={{ width: "100px", height: "35px" }}>
                          <option value="PDF">PDF</option>
                          <option value="Excel">Excel</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- CASE 2: PLANNING STATUS VIEW --- */}
                {currentView === "planning" && (
                  <div className="ProductionScheduleStatus mt-2">
                    <div className="ProductionScheduleStatus-header mb-4 text-start">
                      <div className="d-flex justify-content-between align-items-center mb-0">
                        <div className="d-flex align-items-center gap-2">
                          <h5 className="header-title mb-0">Production Schedule Planning</h5>
                          <span className="text-primary fw-bold">{selectedPeriod.month}</span>
                          <span className="fs-6 fw-normal text-muted ms-3">Rev No :</span>
                          <select className="form-select form-select-sm" style={{width: 'auto'}}>
                            <option>ALL</option>
                            <option>{selectedPeriod.revNo}</option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <button className="vndrbtn"><FaFileExcel /> Export Excel</button>
                          <button className="vndrbtn"><FaFileExcel /> Export Excel V2</button>
                          <button className="vndrbtn" onClick={() => setCurrentView("list")}>
                            <FaList /> Schedule List
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="ProductionScheduleStatus-filter">
                      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                        <div className="card-body">
                          <div className="row g-3 align-items-end text-start">
                            <div className="col-md-2">
                              <label className="form-label">Report Type :</label>
                              <select className="form-select"><option>Item</option></select>
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Select Cust. :</label>
                              <select className="form-select"><option>ALL Customer</option></select>
                            </div>
                            <div className="col-md-3">
                              <div className="d-flex align-items-center gap-2 mb-1">
                                 <input type="checkbox" className="form-check-input" />
                                 <label className="form-label fw-bold mb-0" style={{ fontSize: "0.85rem", color: "#475569" }}>Select Item :</label>
                              </div>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">Item Group :</label>
                              <select className="form-select"><option>ALL</option></select>
                            </div>
                            <div className="col-md-2">
                              <button className="vndrbtn w-100" onClick={() => fetchScheduleItems(selectedPeriod.id, selectedPeriod.month)}>
                                 <FaSearch /> Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-sm text-center">
                        <thead className="ps-table-header">
                          <tr>
                            <th>Sr.</th><th>Item No / Code</th><th style={{width: '25%'}}>Item Desc</th>
                            <th>Sch.Qty</th><th>Dis.Qty</th><th>Bal.Qty</th><th>Days.Comp</th>
                            <th>Cur.Avg</th><th>Days.Rem.</th><th>Ask.Rate</th>
                            <th style={{width: '120px'}}>Status (%)</th><th>Rev Nos</th><th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {itemData.map((item, idx) => (
                            <tr key={idx} className="align-middle">
                              <td>{idx + 1}</td>
                              {/* Item No / Code */}
                              <td>
                                {(item.item_no || "-") + " / " + (item.item_code || "-")}
                              </td>
                              {/* Item Description */}
                              <td className="text-start">
                                {item.item_description ||
                                  item.item_desc ||
                                  item.Name_Description ||
                                  "-"}
                              </td>
                              {/* Schedule Qty */}
                              <td>{item.sch_qty || 0}</td>
                              {/* Dis.Qty */}
                              <td>{item.total_inv_qty || 0}</td>
                              {/* Bal.Qty */}
                              <td className="bg-danger text-white fw-bold">
                                {item.bal_qty || 0}
                              </td>
                              <td>{item.days_comp || 0}</td>
                              <td>{item.cur_avg || item.curAvg || 0}</td>
                              <td>{item.days_rem || item.daysRem || 0}</td>
                              <td>{item.ask_rate || item.askRate || 0}</td>
                              <td>
                                <div className="progress">
                                  <div className="progress-bar bg-danger" style={{width: `${item.status || 0}%`}}></div>
                                  <span className="progress-text">{item.status || 0}%</span>
                                </div>
                              </td>
                              <td className="text-primary">{item.rev_no || item.revNos || "-"}</td>
                              <td><button className="btn btn-link p-0 text-dark" onClick={() => setCurrentView("edit")}><FaEye /></button></td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="table-light fw-bold">
                          <tr>
                            <td colSpan="13" className="text-start ps-2">Total Item : {itemData.length}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}

                {/* --- CASE 3: ADD/EDIT VIEW --- */}
                {currentView === "edit" && (
                  <div className="ProductionScheduleEdit mt-2">
                    {/* Header */}
                    <div className="ProductionScheduleEdit-header mb-4 text-start">
                       <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <h5 className="header-title mb-0 me-2" style={{color: '#007bff'}}>Edit - Production Schedule</h5>
                            <span className="fw-bold me-1">- Rev No :</span>
                            <select className="form-select form-select-sm d-inline-block" style={{width: '70px'}}>
                              <option>0</option>
                            </select>
                            <span className="ms-4 fw-bold" style={{fontSize: '14px', color: '#007bff'}}>Schedule Type : Sales Order</span>
                          </div>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => setCurrentView("list")}>Back to List</button>
                       </div>
                    </div>

                    {/* Entry Form Card */}
                    <div className="ProductionScheduleEdit-filter">
                      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                        <div className="card-body">
                          <div className="row g-3 align-items-end text-start">
                            <div className="col-md-2">
                               <label className="form-label">Customer Name</label>
                               <div className="input-group">
                                  <input 
                                    type="text" 
                                    className="form-control" 
                                    name="customer_name" 
                                    list="customerList"
                                    value={editFormData.customer_name} 
                                    onChange={handleEditInputChange} 
                                    placeholder="Enter Name" 
                                  />
                                  <datalist id="customerList">
                                    {editFormData.customer_name.length > 0 && customers.map((c, i) => (
                                      <option key={i} value={c.Name || c.customer_name || c.CustomerName || c.party_name || c.name || (typeof c === 'string' ? c : "")} />
                                    ))}
                                  </datalist>
                                  <button className="btn btn-outline-secondary" style={{ borderColor: '#cbd5e1' }}><FaSearch /></button>
                               </div>
                            </div>
                            <div className="col-md-2">
                               <label className="form-label">PO Date</label>
                               <div className="input-group">
                                  <input type="date" className="form-control" name="po_no_date" value={editFormData.po_no_date} onChange={handleEditInputChange} id="input-po-date" />
                               </div>
                            </div>
                            <div className="col-md-2">
                               <label className="form-label">Item Name</label>
                               <input 
                                 type="text" 
                                 className="form-control" 
                                 name="item_code" 
                                 list="itemList"
                                 value={editFormData.item_code} 
                                 onChange={handleEditInputChange} 
                                 placeholder="Enter Code No" 
                               />
                               <datalist id="itemList">
                                  {editFormData.item_code.length > 0 && itemList.map((it, i) => {
                                    const displayValue = `${it.part_no || ""} - ${it.Part_Code || ""} - ${it.Name_Description || it.item_description || ""}`;
                                    return (
                                      <option key={i} value={displayValue}>
                                        {displayValue}
                                      </option>
                                    );
                                  })}
                               </datalist>
                            </div>
                            <div className="col-md-1">
                               <label className="form-label">Rec.On</label>
                               <input type="date" className="form-control px-1" name="sch_rec_on" value={editFormData.sch_rec_on} onChange={handleEditInputChange} id="input-rec-date" />
                            </div>
                            <div className="col-md-1">
                               <label className="form-label">Qty</label>
                               <input type="text" className="form-control" name="sch_qty" value={editFormData.sch_qty} onChange={handleEditInputChange} />
                            </div>
                            <div className="col-md-1">
                               <label className="form-label">Buffer</label>
                               <input type="text" className="form-control" name="buffer_qty" value={editFormData.buffer_qty} onChange={handleEditInputChange} />
                            </div>
                            <div className="col-md-1">
                               <label className="form-label">Next</label>
                               <input type="text" className="form-control" name="next_month_sc" value={editFormData.next_month_sc} onChange={handleEditInputChange} />
                            </div>
                            <div className="col-md-1">
                               <label className="form-label">Due Date</label>
                               <input type="date" className="form-control px-1" name="due_dispatch_date" value={editFormData.due_dispatch_date} onChange={handleEditInputChange} id="input-due-date" />
                            </div>
                            <div className="col-md-1">
                               <button className="vndrbtn w-100 px-1" onClick={handleAddItem}>Add >></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Table View */}
                    <div className="table-responsive edit-table-wrapper">
                       <table className="table table-bordered table-striped table-sm text-center align-middle">
                          <thead className="ps-table-header">
                             <tr>
                                <th rowSpan="2">Sr.</th>
                                <th rowSpan="2">Customer Name</th>
                                <th>SO No</th>
                                <th>PO No</th>
                                <th rowSpan="2">Schedule No</th>
                                <th rowSpan="2">Item No / Code</th>
                                <th rowSpan="2">Item Description</th>
                                <th rowSpan="2">Schedule Qty</th>
                                <th rowSpan="2">Cust/ sch Qty</th>
                                <th rowSpan="2">Buffer Qty</th>
                                <th rowSpan="2">Next Month schedule</th>
                                <th rowSpan="2">Schedule Received dt. <FaTable /></th>
                                <th rowSpan="2">Due / Dispatch Dt. <FaTable /></th>
                                <th rowSpan="2">Del</th>
                                <th rowSpan="2"><input type="checkbox" /> All</th>
                                <th rowSpan="2">Create/Update By</th>
                                <th rowSpan="2">Hist</th>
                             </tr>
                             <tr>
                                <th>/ Date</th>
                                <th>/ Date</th>
                             </tr>
                          </thead>
                          <tbody>
                             {itemData.length > 0 ? itemData.map((item, idx) => (
                               <tr key={idx}>
                                 <td>{idx + 1}</td>
                                 <td className="text-start">{item.customer_name}</td>
                                 <td>{item.so_no_date || "-"}</td>
                                 <td>{item.po_no_date || "-"}</td>
                                 <td>{item.schedule_no || "-"}</td>
                                 <td>{(item.item_no || "-") + " / " + (item.item_code || "-")}</td>
                                 <td className="text-start">{item.itemDesc || item.item_description || item.Name_Description || "-"}</td>
                                 <td>{item.sch_qty}</td>
                                 <td>{item.cust_sch_qty || 0}</td>
                                 <td>{item.buffer_qty}</td>
                                 <td>{item.next_month_sc}</td>
                                 <td>{item.sch_rec_on}</td>
                                 <td>{item.due_dispatch_date}</td>
                                 <td><FaTrash className="text-danger" style={{cursor: 'pointer'}} /></td>
                                 <td><input type="checkbox" /></td>
                                 <td>{item.user || "Admin"}</td>
                                 <td><FaHistory /></td>
                               </tr>
                             )) : (
                               <tr style={{height: '200px'}}>
                                  <td colSpan="17" className="text-muted">No records added yet. Use the form above to add items.</td>
                               </tr>
                             )}
                          </tbody>
                       </table>
                    </div>

                    {/* Footer */}
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                       <span className="text-primary fw-bold" style={{cursor: 'pointer', fontSize: '14px'}}>View All Item</span>
                       <button className="btn btn-light btn-sm border shadow-sm"><FaTrash className="me-1" /> Delete Selected</button>
                    </div>
                  </div>
                )}

              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionSchedule;
