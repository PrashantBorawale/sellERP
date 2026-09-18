import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaSearch, FaFileExcel, FaFilter, FaArrowLeft, FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MinMaxPlanning.css";
import * as XLSX from "xlsx";

const MinMaxPlanning = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [currentView, setCurrentView] = useState("planning"); // 'planning' or 'warehouse'
  const [loading, setLoading] = useState(false);
  const [planningData, setPlanningData] = useState([]);
  const [itemSummary, setItemSummary] = useState([]);
  const [mainGroups, setMainGroups] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    mainGroup: "ALL",
    itemGroup: "ALL",
    itemCode: "",
    grnTol: true
  });

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  // Fetch Item Summary for autocomplete
  useEffect(() => {
    const fetchItemSummary = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("https://sellerp-backend.onrender.com/All_Masters/api/item/summary/", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
          const result = await response.json();
          const data = result?.data || result?.results || result || [];
          const itemsArray = Array.isArray(data) ? data : [];
          setItemSummary(itemsArray);
          setAllItems(itemsArray); // Store for local filtering
        }
      } catch (error) {
        console.error("Error fetching item summary:", error);
      }
    };
    fetchItemSummary();

    const fetchMainGroupsData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("https://sellerp-backend.onrender.com/All_Masters/api/maingroup/", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setMainGroups(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching main groups:", error);
      }
    };
    fetchMainGroupsData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSearch = () => {
    setLoading(true);
    setHasSearched(true);

    const filtered = allItems.filter(item => {
      const matchesMainGroup = searchFilters.mainGroup === "ALL" || (item.main_group || item.subgroup_name) === searchFilters.mainGroup;
      const matchesItemGroup = searchFilters.itemGroup === "ALL" || (item.item_group || item.group_name) === searchFilters.itemGroup;
      const matchesItemCode = !searchFilters.itemCode || 
        (item.part_no || item.item_code || item.Part_Code || "").toLowerCase().includes(searchFilters.itemCode.toLowerCase());
      
      return matchesMainGroup && matchesItemGroup && matchesItemCode;
    });

    setPlanningData(filtered);
    setLoading(false);
  };

  const [initialValue, setInitialValue] = useState(null);

  const handleFocus = (value) => {
    setInitialValue(value);
  };

  const handleUpdate = async (item, field, value) => {
    // Prevent saving if the value hasn't changed
    if (value === initialValue) return;

    const updatedValue = field.includes('grn') ? value : Number(value);
    
    // Map frontend field names to backend keys provided by user
    const fieldMapping = {
      'MinLevel': 'min_level',
      'ReOrderLevel': 're_order_level',
      'MaxLevel': 'max_level',
      'MinOrder': 'min_order',
      'MaxOrder': 'max_order',
      'GRN_Tol_Neg': 'grn_tol_sub',
      'GRN_Tol_Pos': 'grn_tol_add'
    };

    const backendField = fieldMapping[field] || field;

    // Local update for immediate feedback
    setPlanningData(prev => prev.map(row => {
      const isMatch = row.id === item.id || (row.part_no && row.part_no === item.part_no);
      return isMatch ? { ...row, [field]: updatedValue } : row;
    }));

    try {
      const token = localStorage.getItem("accessToken");
      
      // Construct the FULL payload with all fields to prevent null overwrites in backend
      const payload = {
        id: item.id,
        item_no: item.part_no || item.itemCode || item.item_code,
        item_code: item.Part_Code || item.item_code || "",
        description: item.Name_Description || item.itemName || "",
        item_groups: item.item_group || item.group_name || "",
        main_groups: item.main_group || item.subgroup_name || "",
        unit: item.Unit_Code || item.unit || "",
        tariff_no: item.HSN_SAC_Code || item.TariffNo || "",
        min_level: item.min_level || item.MinLevel || 0,
        re_order_level: item.re_order_level || item.ReOrderLevel || 0,
        max_level: item.max_level || item.MaxLevel || 0,
        min_order: item.min_order || item.MinOrder || 0,
        max_order: item.max_order || item.MaxOrder || 0,
        grn_tol_sub: item.grn_tol_neg || item.GRN_Tol_Neg || 0,
        grn_tol_add: item.grn_tol_pos || item.GRN_Tol_Pos || 0,
        user: item.User || ""
      };

      // Overwrite the specific field being updated
      payload[backendField] = updatedValue;

      const response = await fetch("https://sellerp-backend.onrender.com/Planning/update-item-wise-min-max/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to update item level:", errorText);
        toast.error("Failed to save data!");
      } else {
        toast.success("Saved successfully!");
      }
    } catch (error) {
      console.error("Error updating item level:", error);
      toast.error("Network error while saving!");
    }
  };

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (currentView !== "planning") {
        setCurrentView("planning");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [currentView]);

  useEffect(() => {
    if (currentView !== "planning") {
      window.history.pushState({ view: currentView }, "");
    }
  }, [currentView]);

  const handleExportExcel = () => {
    if (planningData.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = planningData.map((row, index) => {
      return {
        "Sr.": index + 1,
        "Item No": row.part_no || row.itemCode || row.item_code || "",
        "Item Code": row.Part_Code || "",
        "Desc.": row.Name_Description || row.itemName || row.item_name || row.item_description || "",
        "Item Group": row.item_group || row.group_name || "",
        "Main Group": row.main_group || row.subgroup_name || "",
        "Unit": row.Unit_Code || row.unit || "",
        "TariffNo": row.HSN_SAC_Code || row.TariffNo || "",
        "MinLevel": row.min_level || row.MinLevel || 0,
        "ReOrderLevel": row.reorder_level || row.ReOrderLevel || 0,
        "MaxLevel": row.max_level || row.MaxLevel || 0,
        "MinOrder": row.min_order || row.MinOrder || 0,
        "MaxOrder": row.max_order || row.MaxOrder || 0,
        "GRN (%) Tol (-)": row.grn_tol_neg || row.GRN_Tol_Neg || 0,
        "GRN (%) Tol (+)": row.grn_tol_pos || row.GRN_Tol_Pos || 0,
        "User": row.User || ""
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Min Max Planning");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Itemwise_Min_Max.xlsx");
  };

  return (
    <div className="MinMaxPlanningMaster">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                {/* --- VIEW 1: MIN-MAX PLANNING --- */}
                {currentView === "planning" && (
                  <div className="MinMaxPlanning mt-2">
                    {/* Header */}
                    <div className="MinMaxPlanning-header mb-4 text-start">
                      <div className="row align-items-center">
                        <div className="col-md-4">
                          <h5 className="header-title mb-0">Update Itemwise Min-Max</h5>
                        </div>
                        <div className="col-md-8 text-end d-flex justify-content-md-end gap-2 mt-3 mt-md-0 flex-wrap">
                          <button className="vndrbtn border-0 d-flex align-items-center gap-1" onClick={() => setCurrentView("warehouse")} style={{ height: '34px' }}>
                             Warehouse Item
                          </button>
                          <button className="vndrbtn border-0 d-flex align-items-center gap-1" onClick={() => setCurrentView("movingDays")} style={{ height: '34px' }}>
                             Update Moving Non Moving Days
                          </button>
                          <button className="vndrbtn border-0 d-flex align-items-center gap-1" onClick={handleExportExcel} style={{ height: '34px' }}>
                             Export Report
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="MinMaxPlanning-filter">
                      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                        <div className="card-body">
                          <div className="row g-3 align-items-end text-start">
                            <div className="col-md-2">
                              <label className="form-label">Main Group</label>
                              <select 
                                className="form-select" 
                                name="mainGroup"
                                value={searchFilters.mainGroup}
                                onChange={handleFilterChange}
                              >
                                <option value="ALL">ALL</option>
                                {mainGroups.map((group, idx) => (
                                  <option key={idx} value={group.subgroup_name}>
                                    {group.subgroup_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">Item Group</label>
                              <select 
                                className="form-select" 
                                name="itemGroup"
                                value={searchFilters.itemGroup}
                                onChange={handleFilterChange}
                              >
                                <option>ALL</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <div className="d-flex align-items-center gap-2 mb-1">
                                 <input type="checkbox" className="form-check-input mb-0 mt-0" defaultChecked />
                                 <label className="form-label fw-bold mb-0" style={{ fontSize: "0.85rem", color: "#475569" }}>ItemCode</label>
                              </div>
                              <input 
                                type="text" 
                                className="form-control" 
                                name="itemCode"
                                list={searchFilters.itemCode.length > 0 ? "itemSummaryList" : ""}
                                value={searchFilters.itemCode}
                                onChange={handleFilterChange}
                              />
                              <datalist id="itemSummaryList">
                                 {itemSummary
                                   .filter(it => (it.part_no || it.item_code || it.itemCode || "").toLowerCase().includes(searchFilters.itemCode.toLowerCase()))
                                   .map((it, i) => (
                                     <option key={i} value={it.part_no || it.item_code || it.itemCode} />
                                   ))
                                 }
                              </datalist>
                            </div>
                            <div className="col-md-2">
                              <div className="d-flex align-items-center gap-2 h-100 pb-2">
                                 <input 
                                   type="checkbox" 
                                   className="form-check-input mt-0" 
                                   name="grnTol"
                                   checked={searchFilters.grnTol}
                                   onChange={handleFilterChange}
                                 />
                                 <label className="form-label fw-bold mb-0" style={{ fontSize: "0.85rem", color: "#475569" }}>GRN% Tol. {'>'} 0</label>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <button 
                                className="vndrbtn w-100 border-0 d-flex justify-content-center align-items-center gap-1" 
                                onClick={handleSearch}
                                disabled={loading}
                                style={{ height: '34px' }}
                              >
                                 <FaSearch /> {loading ? "Searching..." : "Search"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Table Area */}
                    {hasSearched && (
                      <div className="MinMaxPlanning-table table-responsive">
                          <table className="table table-bordered table-striped table-sm text-center">
                            <thead className="ps-table-header">
                              <tr>
                                <th className="text-nowrap">Sr.</th>
                                <th className="text-nowrap">Item No</th>
                                <th className="text-nowrap">Item Code</th>
                                <th className="text-nowrap">Desc.</th>
                                <th className="text-nowrap">Item Group</th>
                                <th className="text-nowrap">Main Group</th>
                                <th className="text-nowrap">Unit</th>
                                <th className="text-nowrap">TariffNo</th>
                                <th className="text-nowrap">MinLevel</th>
                                <th className="text-nowrap">ReOrderLevel</th>
                                <th className="text-nowrap">MaxLevel</th>
                                <th className="text-nowrap">MinOrder</th>
                                <th className="text-nowrap">MaxOrder</th>
                                <th className="text-nowrap">GRN (%) Tol (-)</th>
                                <th className="text-nowrap">GRN (%) Tol (+)</th>
                                <th className="text-nowrap">User</th>
                              </tr>
                            </thead>
                            <tbody>
                              {planningData.length > 0 ? planningData.map((row, index) => {
                                return (
                                  <tr key={row.id || index}>
                                    <td>{index + 1}</td>
                                    <td>{row.part_no || row.itemCode || row.item_code}</td>
                                    <td>{row.Part_Code || ""}</td>
                                    <td className="text-start">{row.Name_Description || row.itemName || row.item_name || row.item_description}</td>
                                    <td>{row.item_group || row.group_name}</td>
                                    <td>{row.main_group || row.subgroup_name}</td>
                                    <td>{row.Unit_Code || row.unit}</td>
                                    <td>{row.HSN_SAC_Code || row.TariffNo || ""}</td>
                                    <td style={{ width: '70px' }}>
                                      <input 
                                        type="text" 
                                        className="form-control form-control-sm text-center px-1" 
                                        defaultValue={row.min_level || row.MinLevel || 0}
                                        onFocus={(e) => handleFocus(e.target.value)}
                                        onBlur={(e) => handleUpdate(row, 'MinLevel', e.target.value)}
                                      />
                                    </td>
                                    <td style={{ width: '70px' }}>
                                      <input 
                                        type="text" 
                                        className="form-control form-control-sm text-center px-1" 
                                        defaultValue={row.reorder_level || row.ReOrderLevel || 0}
                                        onFocus={(e) => handleFocus(e.target.value)}
                                        onBlur={(e) => handleUpdate(row, 'ReOrderLevel', e.target.value)}
                                      />
                                    </td>
                                    <td style={{ width: '70px' }}>
                                      <input 
                                        type="text" 
                                        className="form-control form-control-sm text-center px-1" 
                                        defaultValue={row.max_level || row.MaxLevel || 0}
                                        onFocus={(e) => handleFocus(e.target.value)}
                                        onBlur={(e) => handleUpdate(row, 'MaxLevel', e.target.value)}
                                      />
                                    </td>
                                    <td style={{ width: '70px' }}>
                                      <input 
                                        type="text" 
                                        className="form-control form-control-sm text-center px-1" 
                                        defaultValue={row.min_order || row.MinOrder || ""}
                                        onFocus={(e) => handleFocus(e.target.value)}
                                        onBlur={(e) => handleUpdate(row, 'MinOrder', e.target.value)}
                                      />
                                    </td>
                                    <td style={{ width: '70px' }}>
                                      <input 
                                        type="text" 
                                        className="form-control form-control-sm text-center px-1" 
                                        defaultValue={row.max_order || row.MaxOrder || ""}
                                        onFocus={(e) => handleFocus(e.target.value)}
                                        onBlur={(e) => handleUpdate(row, 'MaxOrder', e.target.value)}
                                      />
                                    </td>
                                    <td style={{ width: '70px' }}>
                                      <input 
                                        type="text" 
                                        className="form-control form-control-sm text-center px-1" 
                                        defaultValue={row.grn_tol_neg || row.GRN_Tol_Neg || 0}
                                        onFocus={(e) => handleFocus(e.target.value)}
                                        onBlur={(e) => handleUpdate(row, 'GRN_Tol_Neg', e.target.value)}
                                      />
                                    </td>
                                    <td style={{ width: '70px' }}>
                                      <input 
                                        type="text" 
                                        className="form-control form-control-sm text-center px-1" 
                                        defaultValue={row.grn_tol_pos || row.GRN_Tol_Pos || 0}
                                        onFocus={(e) => handleFocus(e.target.value)}
                                        onBlur={(e) => handleUpdate(row, 'GRN_Tol_Pos', e.target.value)}
                                      />
                                    </td>
                                    <td>{row.User || ""}</td>
                                  </tr>
                                );
                              }) : (
                                <tr>
                                  <td colSpan="16" className="p-4 text-muted">No records found for the selected filters.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        {/* Footer */}
                        <div className="MinMaxPlanning-Footer p-2 mt-0 border-top">
                          Total Record : {String(planningData?.length || 0).padStart(2, '0')}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* --- VIEW 2: WAREHOUSE MASTER --- */}
                {currentView === "warehouse" && (
                  <div className="WarehouseMaster mt-2 border rounded">
                    {/* Header */}
                    <div className="WarehouseMaster-header mb-4 text-start">
                      <div className="row align-items-center">
                        <div className="col-md-4">
                          <h5 className="header-title mb-0">Warehouse Master</h5>
                        </div>
                      </div>
                    </div>

                    {/* Form Bar */}
                    <div className="WarehouseMaster-filter">
                      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                        <div className="card-body">
                          <div className="row g-3 align-items-end text-start">
                            <div className="col-md-2">
                              <label className="form-label">Warehouse</label>
                              <select className="form-select">
                                <option>MainStore</option>
                              </select>
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Item</label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">Min Level</label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">Max Level</label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">Action</label>
                              <select className="form-select">
                                <option>Ignore</option>
                              </select>
                            </div>
                            <div className="col-md-1">
                               <button className="vndrbtn w-100 d-flex align-items-center justify-content-center gap-1">
                                 <FaPlus /> Save
                               </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section - Left Aligned */}
                    <div className="WarehouseMaster-Content p-2 border-bottom" style={{ minHeight: '300px', backgroundColor: '#fff' }}>
                       <div className="p-2 border rounded text-info fw-bold text-start" style={{ backgroundColor: '#f0ffff' }}>
                          No Data Found !!!
                       </div>
                    </div>

                    {/* Footer - Left Aligned */}
                    <div className="WarehouseMaster-Footer p-2 bg-light text-start" style={{ fontSize: '12px', color: '#007bff', fontWeight: '600' }}>
                      Total records : 0
                    </div>
                  </div>
                )}

                {/* --- VIEW 3: MOVING NON-MOVING DAYS --- */}
                {currentView === "movingDays" && (
                  <div className="MovingDays mt-2">
                    {/* Header */}
                    {/* Header */}
                    <div className="MovingDays-header mb-4 text-start">
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <h5 className="header-title mb-0">Update Itemwise Moving Non-Moving Days</h5>
                        </div>
                        <div className="col-md-4 text-end d-flex justify-content-end">
                          <button className="vndrbtn" onClick={() => setCurrentView("planning")}>
                             Update Itemwise Min-Max
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="MovingDays-filter">
                      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                        <div className="card-body">
                          <div className="row g-3 align-items-end text-start">
                            <div className="col-md-3">
                              <label className="form-label">Main Group</label>
                              <select className="form-select">
                                <option>ALL</option>
                              </select>
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Item Group</label>
                              <select className="form-select">
                                <option>ALL</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <div className="d-flex align-items-center gap-2 mb-1">
                                 <input type="checkbox" className="form-check-input mb-0 mt-0" defaultChecked />
                                 <label className="form-label fw-bold mb-0" style={{ fontSize: "0.85rem", color: "#475569" }}>Item</label>
                              </div>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-2">
                              <button className="vndrbtn w-100 d-flex align-items-center justify-content-center gap-1">
                                 <FaSearch /> Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Empty Content Area */}
                    <div className="MinMaxPlanning-Content border" style={{ minHeight: '400px', backgroundColor: '#fff' }}></div>

                    {/* Footer */}
                    <div className="MinMaxPlanning-Footer p-2 border bg-light mt-0" style={{ fontSize: '12px', fontWeight: '600' }}>
                      Total Record : 00
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

export default MinMaxPlanning;
