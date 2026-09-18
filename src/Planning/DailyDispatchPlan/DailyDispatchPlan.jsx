import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaPlus, FaPrint, FaRegEye, FaEdit, FaFilePdf } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DailyDispatchPlan.css";
import axios from "axios";
import * as XLSX from "xlsx";

const defaultPlanList = [
  {
    plan_date: "2026-06-12",
    customer_name: "Ram kumawat",
    item: "FG1018 | SECONDARY PISTON FOR TMC",
    plan_quantity: 500,
    po_no: "PO-9921",
    machine: "CNC-1",
    status_remark: "Scheduled"
  },
  {
    plan_date: "2026-06-13",
    customer_name: "Togre",
    item: "FG1263 | CAP OIL LOCK J1D FF",
    plan_quantity: 300,
    po_no: "PO-8541",
    machine: "CNC-2",
    status_remark: "Pending Material"
  }
];

const DailyDispatchPlan = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [currentView, setCurrentView] = useState("list"); // "list" or "new"
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchCustName, setSearchCustName] = useState(false);
  const [custName, setCustName] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [itemSummary, setItemSummary] = useState([]);
  const [poList, setPoList] = useState([]);
  const [stockList, setStockList] = useState([]);
  
  const [planList, setPlanList] = useState(defaultPlanList);
  const [loadingList, setLoadingList] = useState(false);

  const [formData, setFormData] = useState({
    planDate: new Date().toISOString().split('T')[0],
    customerName: "",
    item: "",
    stock: "",
    planQuantity: "",
    heatCode: "",
    heatNo: "",
    challanNo: "",
    poNo: "",
    selectMaterial: "",
    machine: "",
    dieNo: "",
    material: "",
    weight: "",
    trayWeight: "",
    deptPpc: "",
    deptCc: "",
    statusRemark: ""
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    setLoadingList(true);
    try {
      const token = localStorage.getItem("accessToken");
      const url = `https://sellerp-backend.onrender.com/Planning/dispatch-plan/?from_date=${fromDate}&to_date=${toDate}`;
      const response = await fetch(url, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const result = await response.json();
        const data = Array.isArray(result) ? result : (result.data || result.results || []);
        setPlanList(data);
      } else {
        throw new Error("Failed to fetch");
      }
    } catch (error) {
      console.error("Error fetching dispatch plans:", error);
      const filtered = defaultPlanList.filter(row => {
        if (searchCustName && custName && !row.customer_name.toLowerCase().includes(custName.toLowerCase())) return false;
        return true;
      });
      setPlanList(filtered);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [fromDate, toDate]);

  const handleViewPdf = (item) => {
    const viewPath =
      item?.PDF_Link ||
      item?.View ||
      item?.pdf ||
      item?.file ||
      item?.document ||
      item?.Upload_Doc ||
      item?.upload_doc ||
      item?.Document ||
      item?.doc ||
      item?.Doc ||
      item?.File ||
      item?.TC_File ||
      item?.Tc_File ||
      item?.tc_file ||
      item?.Certificate ||
      item?.certificate ||
      item?.Attachment ||
      item?.attachment ||
      item?.url ||
      item?.link;

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
    } else {
      const targetId = item?.id || item?.plan_id || item?.po_no || "1";
      window.open(`https://sellerp-backend.onrender.com/Planning/DispatchPlan/pdf/${targetId}/`, "_blank", "noopener,noreferrer");
    }
  };

  const handleExportExcel = () => {
    if (planList.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = planList.map((row, index) => ({
      "Sr.": index + 1,
      "Date": row.plan_date || "",
      "Customer Name": row.customer_name || "",
      "Item": row.item || "",
      "Plan Quantity": row.plan_quantity || 0,
      "PO No": row.po_no || "",
      "Machine": row.machine || "",
      "Status/Remark": row.status_remark || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dispatch Plan List");

    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Dispatch_Plan_List.xlsx");
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const payload = {
        plan_date: formData.planDate,
        customer_name: formData.customerName,
        item: formData.item,
        stock: formData.stock,
        plan_quantity: formData.planQuantity,
        heat_code: formData.heatCode,
        heat_no: formData.heatNo,
        challan_no: formData.challanNo,
        po_no: formData.poNo,
        select_material: formData.selectMaterial,
        machine: formData.machine,
        die_no: formData.dieNo,
        material: formData.material,
        weight: formData.weight,
        tray_weight: formData.trayWeight,
        dept_ppc: formData.deptPpc,
        dept_cc: formData.deptCc,
        status_remark: formData.statusRemark
      };

      const response = await fetch("https://sellerp-backend.onrender.com/Planning/dispatch-plan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success("Dispatch Plan saved successfully!");
        // Reset form to blank state after saving
        setFormData({
          planDate: new Date().toISOString().split('T')[0],
          customerName: "",
          item: "",
          stock: "",
          planQuantity: "",
          heatCode: "",
          heatNo: "",
          challanNo: "",
          poNo: "",
          selectMaterial: "",
          machine: "",
          dieNo: "",
          material: "",
          weight: "",
          trayWeight: "",
          deptPpc: "",
          deptCc: "",
          statusRemark: ""
        });
      } else {
        const errorData = await response.text();
        console.error("Save failed:", errorData);
        toast.error("Failed to save Dispatch Plan!");
      }
    } catch (error) {
      console.error("Error saving dispatch plan:", error);
      toast.error("Network error while saving!");
    }
  };

  const fetchPOList = async () => {
    if (!formData.customerName || !formData.item) return;
    try {
      const token = localStorage.getItem("accessToken");
      
      // Extract Customer Name | Number
      const customerObj = customerList.find(c => 
        (c.Name || c.customer_name || c.CustomerName) === formData.customerName ||
        `${c.Name || c.customer_name || c.CustomerName} | ${c.number || ""}` === formData.customerName
      );
      
      const custParam = customerObj 
        ? `${customerObj.Name || customerObj.customer_name || customerObj.CustomerName} | ${customerObj.number || ""}` 
        : formData.customerName;

      // Extract Item (User's example item_no=FGFG1002 matches the first part of the string)
      const itemParts = formData.item.split(" | ");
      const itemNoParam = itemParts[0].trim();

      const url = `https://sellerp-backend.onrender.com/Planning/salesorder-po-search/?customer=${encodeURIComponent(custParam)}&item_no=${encodeURIComponent(itemNoParam)}`;
      
      const response = await fetch(url, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        // Handle different API response structures
        const list = Array.isArray(data) ? data : (data.data || []);
        
        // Map to a consistent format (strings)
        const formattedList = list.map(item => {
           if (typeof item === 'string') return item;
           // Use keys found in the error message (cust_po) and other common variations
           const val = item.cust_po || item.Cust_PO_No || item.PO_No || item.po_no || item.po_number || "";
           return typeof val === 'object' ? "" : String(val);
        }).filter(Boolean);

        setPoList(formattedList);
      } else {
        setPoList([]);
      }
    } catch (error) {
      console.error("Error fetching PO list:", error);
      setPoList([]);
    }
  };  

  const fetchStockList = async () => {
    if (!formData.item) return;
    try {
      const token = localStorage.getItem("accessToken");
      const itemParts = formData.item.split(" | ");
      const itemNoParam = itemParts[0].trim();

      const url = `https://sellerp-backend.onrender.com/Planning/dispatch-stock-wip/?q=${encodeURIComponent(itemNoParam)}`;
      
      const response = await fetch(url, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        // Extract lots from last_operation as requested
        const lots = data.last_operation?.lots || [];
        setStockList(lots);
      } else {
        setStockList([]);
      }
    } catch (error) {
      console.error("Error fetching stock list:", error);
      setStockList([]);
    }
  };

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
    fetchCustomers();
    fetchItemSummary();
  }, [sideNavOpen]);

  useEffect(() => {
    if (formData.item) {
      fetchStockList();
    }
    if (formData.customerName && formData.item) {
      fetchPOList();
    }
  }, [formData.customerName, formData.item]);

  const fetchItemSummary = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://sellerp-backend.onrender.com/All_Masters/api/item/summary/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setItemSummary(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://sellerp-backend.onrender.com/Planning/customer/list/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const result = await response.json();
        // Access the "data" array inside the response object
        setCustomerList(Array.isArray(result.data) ? result.data : []);
      } else {
        setCustomerList([]);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomerList([]);
    }
  };

  return (
    <div className="DailyDispatchPlanMaster">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                 {currentView === "list" ? (
                  <div className="DailyDispatchPlan">
                    {/* Header */}
                    <div className="DailyDispatchPlan-header mb-4 text-start">
                      <div className="row align-items-center">
                        <div className="col-md-4">
                          <h5 className="header-title mb-0">Dispatch Plan List</h5>
                        </div>
                        <div className="col-md-8 text-end d-flex justify-content-md-end gap-2 mt-3 mt-md-0 flex-wrap">
                          <button className="vndrbtn border-0 d-flex align-items-center" onClick={() => setCurrentView("new")} style={{ height: '34px' }}>
                            New Dispatch Plan
                          </button>
                          <button className="vndrbtn border-0 d-flex align-items-center" onClick={handleExportExcel} style={{ height: '34px' }}>
                            Export Excel
                          </button>
                          <button className="vndrbtn border-0 d-flex align-items-center" style={{ height: '34px' }}>
                            Dispatch Plan : Report
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="DailyDispatchPlan-filter">
                      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                        <div className="card-body">
                          <div className="row g-3 align-items-end text-start">
                            <div className="col-md-2">
                              <label className="form-label">From Date</label>
                              <input
                                type="date"
                                className="form-control"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                              />
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">To Date</label>
                              <input
                                type="date"
                                className="form-control"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                              />
                            </div>
                            <div className="col-md-4">
                              <div className="d-flex align-items-center gap-2 mb-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input mt-0"
                                  id="searchCustCheck"
                                  checked={searchCustName}
                                  onChange={(e) => setSearchCustName(e.target.checked)}
                                />
                                <label htmlFor="searchCustCheck" className="form-label fw-bold mb-0" style={{ fontSize: '0.85rem', color: '#475569' }}>Search Cust Name</label>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Name.."
                                value={custName}
                                onChange={(e) => setCustName(e.target.value)}
                              />
                            </div>
                            <div className="col-md-2 d-flex gap-2">
                              <button className="vndrbtn border-0 flex-fill d-flex align-items-center justify-content-center gap-1" onClick={handleSearch} style={{ height: '34px' }}>
                                <FaSearch size={12} /> Search
                              </button>
                              <button className="vndrbtn border-0 flex-fill d-flex align-items-center justify-content-center gap-1" style={{ height: '34px' }}>
                                <FaPrint size={12} /> Report
                              </button>
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">Report Format</label>
                              <select className="form-select">
                                <option>PDF</option>
                                <option>Excel</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="DailyDispatchPlan-table table-responsive">
                      <table className="table table-bordered table-striped text-center mb-0">
                        <thead>
                          <tr>
                            <th>SR.</th>
                            <th>DATE</th>
                            <th>CUST NAME</th>
                            <th>EDIT</th>
                            <th>VIEW</th>
                            <th>VIEW PDF</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loadingList ? (
                            <tr>
                              <td colSpan="6" className="text-center py-4">Loading...</td>
                            </tr>
                          ) : planList.length === 0 ? (
                            <tr style={{ height: '200px' }}>
                              <td colSpan="6" className="text-muted align-middle">No records found. Use filters above to search.</td>
                            </tr>
                          ) : (
                            planList.map((row, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.plan_date || ""}</td>
                                <td>{row.customer_name || ""}</td>
                                <td>
                                  <button className="btn btn-sm btn-link p-0 text-primary">
                                    <FaEdit size={16} />
                                  </button>
                                </td>
                                <td>
                                  <button type="button" className="btn btn-sm btn-link p-0 text-info" onClick={() => handleViewPdf(row)} title="View">
                                    <FaRegEye size={16} />
                                  </button>
                                </td>
                                <td>
                                  <button type="button" className="btn btn-sm btn-link p-0 text-danger" onClick={() => handleViewPdf(row)} title="View PDF">
                                    <FaFilePdf size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="DispatchPlanEntry">
                    {/* Entry Header */}
                    <div className="DispatchPlanEntry-header mb-4 text-start">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <h5 className="header-title mb-0">Dispatch Plan</h5>
                        </div>
                        <div className="col-md-6 text-end">
                          <button className="vndrbtn" onClick={() => setCurrentView("list")}>
                            Dispatch Plan List
                          </button>
                        </div>
                      </div>
                    </div>

                    <ToastContainer position="top-right" autoClose={2000} />

                    {/* Mandatory Fields Section */}
                    <div className="DispatchPlanEntry-filter">
                      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                        <div className="card-body">
                          <div className="d-flex align-items-center gap-2 mb-3">
                            <span className="fw-bold" style={{ color: '#2563eb', fontSize: '0.9rem' }}>🔹 Mandatory Fields</span>
                          </div>
                          <div className="row g-3">
                            <div className="col-md-3">
                              <label className="form-label">Plan Date</label>
                              <input
                                type="date"
                                name="planDate"
                                className="form-control"
                                value={formData.planDate}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Customer Name</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  name="customerName"
                                  className="form-control"
                                  placeholder="Enter Cust Name.."
                                  list={formData.customerName.length > 0 ? "customerListOptions" : ""}
                                  value={formData.customerName}
                                  onChange={handleInputChange}
                                />
                                <button className="btn btn-outline-secondary" style={{ borderColor: '#cbd5e1' }}>
                                  <FaSearch size={12} />
                                </button>
                              </div>
                              <datalist id="customerListOptions">
                                {Array.isArray(customerList) && customerList.map((c, idx) => (
                                  <option
                                    key={idx}
                                    value={`${c.Name || c.customer_name || c.CustomerName || ""} | ${c.number || ""}`}
                                  />
                                ))}
                              </datalist>
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Item</label>
                              <input
                                type="text"
                                name="item"
                                className="form-control"
                                placeholder="Enter Item Name.."
                                list={formData.item.length > 0 ? "itemListOptions" : ""}
                                value={formData.item}
                                onChange={handleInputChange}
                              />
                              <datalist id="itemListOptions">
                                {itemSummary.map((it, idx) => (
                                  <option
                                    key={idx}
                                    value={`${it.part_no || ""} | ${it.Part_Code || ""} | ${it.Name_Description || ""}`}
                                  />
                                ))}
                              </datalist>
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Stock</label>
                              <select
                                className="form-select"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                              >
                                <option value="">Select Stock</option>
                                {stockList.map((st, idx) => {
                                  const displayVal = `${st.lot_no || ""} | ${st.prod_qty || 0}`;
                                  return (
                                    <option key={idx} value={displayVal}>{displayVal}</option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Plan Quantity</label>
                              <input type="text" name="planQuantity" className="form-control" value={formData.planQuantity} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Heat Code</label>
                              <input type="text" name="heatCode" className="form-control" value={formData.heatCode} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Heat No</label>
                              <input type="text" name="heatNo" className="form-control" value={formData.heatNo} onChange={handleInputChange} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Optional Fields Section */}
                    <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <span className="fw-bold" style={{ color: '#2563eb', fontSize: '0.9rem' }}>🔹 Optional Fields</span>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-3">
                            <label className="form-label">Cust/Ref. Challan No</label>
                            <input type="text" name="challanNo" className="form-control" value={formData.challanNo} onChange={handleInputChange} />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">PO No</label>
                            <select className="form-select" name="poNo" value={formData.poNo} onChange={handleInputChange}>
                              <option value="">Select PO</option>
                              {poList.map((po, idx) => (<option key={idx} value={po}>{po}</option>))}
                            </select>
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Select Material</label>
                            <input type="text" name="selectMaterial" className="form-control" value={formData.selectMaterial} onChange={handleInputChange} />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Machine</label>
                            <input type="text" name="machine" className="form-control" value={formData.machine} onChange={handleInputChange} />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">DIE No</label>
                            <input type="text" name="dieNo" className="form-control" value={formData.dieNo} onChange={handleInputChange} />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Material</label>
                            <textarea name="material" className="form-control" rows="1" value={formData.material} onChange={handleInputChange}></textarea>
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Weight</label>
                            <input type="text" name="weight" className="form-control" value={formData.weight} onChange={handleInputChange} />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Tray Weight</label>
                            <input type="text" name="trayWeight" className="form-control" value={formData.trayWeight} onChange={handleInputChange} />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Dept (PPC)</label>
                            <input type="text" name="deptPpc" className="form-control" value={formData.deptPpc} onChange={handleInputChange} />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Dept (CC)</label>
                            <input type="text" name="deptCc" className="form-control" value={formData.deptCc} onChange={handleInputChange} />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Status / Remark</label>
                            <textarea name="statusRemark" className="form-control" rows="1" value={formData.statusRemark} onChange={handleInputChange}></textarea>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-top d-flex justify-content-start">
                          <button className="vndrbtn d-flex align-items-center gap-2" onClick={handleSave}>
                            <FaPlus size={14} /> Save {`>>`}
                          </button>
                        </div>
                      </div>
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

export default DailyDispatchPlan;