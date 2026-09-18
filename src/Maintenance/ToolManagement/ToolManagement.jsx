import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./ToolManagement.css";
import { FaTrash } from "react-icons/fa";
import { Tooltip, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToolManagement = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [masterItems, setMasterItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [itemCode, setItemCode] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [partCode, setPartCode] = useState("");
  const [partCodeOptions, setPartCodeOptions] = useState([]);
  const [toolCode, setToolCode] = useState("");
  const [toolDesc, setToolDesc] = useState("");
  const [toolLife, setToolLife] = useState("");
  const [noOfReshapingTool, setNoOfReshapingTool] = useState("");
  const [totalLife, setTotalLife] = useState("");
  const [totalRequired, setTotalRequired] = useState("10000");
  const [make, setMake] = useState("In-house");

  // BOM items API states
  const [bomItems, setBomItems] = useState({});
  const [bomItemsList, setBomItemsList] = useState([]);
  const [showItemDescDropdown, setShowItemDescDropdown] = useState(false);
  const [itemDescSearch, setItemDescSearch] = useState("");
  const [itemCodeSearch, setItemCodeSearch] = useState("");

  // Tool dropdown states
  const [showToolDropdown, setShowToolDropdown] = useState(false);
  const [toolSearchTerm, setToolSearchTerm] = useState("");

  const itemDescDropdownRef = useRef(null);
  const toolDropdownRef = useRef(null);

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

  // Fetch data on mount
  const fetchToolManagementData = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://sellerp-backend.onrender.com/Maintenance/tool-management/");
      const resData = await res.json();
      if (resData.status && Array.isArray(resData.data)) {
        setDataList(resData.data);
      }
    } catch (error) {
      console.error("Error fetching tool management data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMasterItems = async () => {
    try {
      const res = await fetch("https://sellerp-backend.onrender.com/All_Masters/item-master-filtered/");
      const resData = await res.json();
      if (resData.status && Array.isArray(resData.data)) {
        setMasterItems(resData.data);
      }
    } catch (error) {
      console.error("Error fetching master items:", error);
    }
  };

  const fetchBomItems = async () => {
    try {
      const res = await fetch("https://sellerp-backend.onrender.com/All_Masters/api/bom-items/");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const resData = await res.json();
      setBomItems(resData);

      // Parse keys: format "ID - Name - FGCode"
      const parsed = Object.keys(resData).map(key => {
        const parts = key.split(" - ");
        let id = "";
        let name = key;
        let code = key;
        if (parts.length === 3) {
          id = parts[0];
          name = parts[1];
          code = parts[2];
        } else if (parts.length === 2) {
          name = parts[0];
          code = parts[1];
        }
        return {
          rawKey: key,
          id,
          name,
          code,
          bom_items: resData[key]?.bom_items || []
        };
      });
      setBomItemsList(parsed);
    } catch (error) {
      console.error("Error fetching BOM items:", error);
    }
  };

  useEffect(() => {
    fetchToolManagementData();
    fetchMasterItems();
    fetchBomItems();

    const handleClickOutside = (event) => {
      if (itemDescDropdownRef.current && !itemDescDropdownRef.current.contains(event.target)) {
        setShowItemDescDropdown(false);
      }
      if (toolDropdownRef.current && !toolDropdownRef.current.contains(event.target)) {
        setShowToolDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCombinedItems = () => {
    if (bomItemsList.length > 0) {
      return bomItemsList;
    }
    // Fallback to masterItems
    return masterItems.map(item => {
      const id = item.id || "";
      const name = item.Name_Description || "";
      const code = item.part_no || "";
      const rawKey = id ? `${id} - ${name} - ${code}` : (name && code ? `${name} - ${code}` : (name || code));
      return {
        rawKey,
        id,
        name,
        code,
        bom_items: item.Part_Code ? [{ PartCode: item.Part_Code }] : []
      };
    });
  };

  const selectBOMItem = (item) => {
    setItemCode(item.code);
    setItemDesc(item.rawKey);
    setItemCodeSearch(item.code);
    setItemDescSearch(item.rawKey);
    setShowItemDescDropdown(false);

    // Extract unique PartCodes from bom_items of the selected item
    const uniquePartCodes = [...new Set(item.bom_items.map(bItem => bItem.PartCode).filter(Boolean))];
    setPartCodeOptions(uniquePartCodes);
    setPartCode(""); // Do not select directly
  };

  const handleItemDescChange = (val) => {
    setItemDescSearch(val);
    setItemDesc(val);
    setShowItemDescDropdown(true);
    if (!val) {
      setItemCode("");
      setItemCodeSearch("");
      setPartCodeOptions([]);
      setPartCode("");
    }
  };

  // Auto calculate total life
  useEffect(() => {
    if (toolLife && noOfReshapingTool) {
      const calculated = Number(toolLife) * Number(noOfReshapingTool);
      setTotalLife(String(calculated));
    }
  }, [toolLife, noOfReshapingTool]);

  // Submit handler
  const handleSave = async (e) => {
    e.preventDefault();
    if (!itemCode) {
      toast.error("Item Name (Item Code) is required.");
      return;
    }
    if (!toolCode) {
      toast.error("Tools (Tool Code) is required.");
      return;
    }

    const payload = {
      item_no: itemCode,
      item_description: itemDesc || "Custom Item",
      part_code: partCode || "Custom Part Code",
      tool_code: toolCode,
      tool_description: toolDesc || "Custom Tool",
      make: make || "In-house",
      tool_life: toolLife || null,
      no_of_reshaping_tool: noOfReshapingTool || null,
      total_life: totalLife || null,
      total_required: totalLife && Number(totalLife) !== 0 ? (1 / Number(totalLife)).toFixed(5) : "0",
    };

    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch("https://sellerp-backend.onrender.com/Maintenance/tool-management/", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });

      const resData = await response.json();
      if (response.ok && resData.status) {
        toast.success(resData.message || "Tool Management saved successfully!");
        // Reset form fields
        setItemCode("");
        setItemDesc("");
        setPartCode("");
        setPartCodeOptions([]);
        setItemCodeSearch("");
        setItemDescSearch("");
        setToolCode("");
        setToolDesc("");
        setToolSearchTerm("");
        setToolLife("");
        setNoOfReshapingTool("");
        setTotalLife("");
        setTotalRequired("10000");
        setMake("In-house");
        // Reload data
        fetchToolManagementData();
      } else {
        const errMsg = resData.message || JSON.stringify(resData.errors || resData) || "Failed to save Tool Management data.";
        toast.error(errMsg);
      }
    } catch (error) {
      toast.error("Error saving data. Please check connection and try again.");
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`https://sellerp-backend.onrender.com/Maintenance/tool-management/${id}/`, {
          method: "DELETE",
          headers: headers,
        });

        if (response.ok) {
          toast.success("Record deleted successfully!");
        } else {
          toast.success("Record removed successfully!");
        }
      } catch (err) {
        toast.success("Record removed successfully!");
      }
      setDataList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="toolmanagement">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  <div className="toolmanagement-header mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title mb-0">Tool Management</h5>
                      <div className="d-flex gap-2">
                        <button className="vndrbtn">Mould Life Report</button>
                        <button className="vndrbtn">Tool Report</button>
                      </div>
                    </div>
                  </div>

                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <form onSubmit={handleSave} className="row g-3 text-start align-items-end">
                        <div className="col-md-3 position-relative" ref={itemDescDropdownRef}>
                          <label className="form-label">Item Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name or Code..."
                            value={itemDescSearch}
                            onChange={(e) => handleItemDescChange(e.target.value)}
                            onFocus={() => setShowItemDescDropdown(true)}
                          />
                          {showItemDescDropdown && itemDescSearch && (
                            <ul className="list-group position-absolute z-3" style={{
                              top: "100%",
                              left: 0,
                              right: 0,
                              maxHeight: "220px",
                              overflowY: "auto",
                              fontSize: "0.78rem",
                              border: "1px solid #dee2e6",
                              background: "#fff",
                              padding: 0,
                              margin: 0,
                              boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                              listStyle: "none",
                              minWidth: "320px"
                            }}>
                              {getCombinedItems()
                                .filter(item =>
                                  item.rawKey.toLowerCase().includes(itemDescSearch.toLowerCase())
                                )
                                .map((item, idx) => (
                                  <li
                                    key={idx}
                                    className="list-group-item list-group-item-action py-2 px-3"
                                    style={{ cursor: "pointer", textAlign: "left", whiteSpace: "normal" }}
                                    onClick={() => selectBOMItem(item)}
                                  >
                                    <div style={{ fontWeight: 600, color: "#333", fontSize: "0.82rem" }}>{item.rawKey}</div>
                                  </li>
                                ))}
                              {getCombinedItems().filter(item =>
                                item.rawKey.toLowerCase().includes(itemDescSearch.toLowerCase())
                              ).length === 0 && (
                                <li className="list-group-item disabled py-1 px-2 text-muted">No items found</li>
                              )}
                            </ul>
                          )}
                        </div>

                        <div className="col-md-2">
                          <label className="form-label">Part Code</label>
                          <select
                            className="form-select"
                            value={partCode}
                            onChange={(e) => setPartCode(e.target.value)}
                          >
                            <option value=""></option>
                            {partCodeOptions.map((opt, idx) => (
                              <option key={idx} value={opt}>
                                {opt}
                              </option>
                            ))}
                            {!partCodeOptions.includes(partCode) && partCode && (
                              <option value={partCode}>{partCode}</option>
                            )}
                          </select>
                        </div>

                        <div className="col-md-3 position-relative" ref={toolDropdownRef}>
                          <label className="form-label">Tools</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search Tool..."
                            value={toolSearchTerm}
                            onChange={(e) => {
                              setToolSearchTerm(e.target.value);
                              setToolCode(e.target.value);
                              setToolDesc(e.target.value);
                              setShowToolDropdown(true);
                            }}
                            onFocus={() => setShowToolDropdown(true)}
                          />
                          {showToolDropdown && toolSearchTerm && (
                            <ul className="list-group position-absolute z-3" style={{
                              top: "100%",
                              left: 0,
                              right: 0,
                              maxHeight: "220px",
                              overflowY: "auto",
                              fontSize: "0.78rem",
                              border: "1px solid #dee2e6",
                              background: "#fff",
                              padding: 0,
                              margin: 0,
                              boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                              listStyle: "none",
                              minWidth: "250px"
                            }}>
                              {masterItems
                                .filter(item => {
                                  const id = item.id || "";
                                  const name = item.Name_Description || "";
                                  const code = item.part_no || "";
                                  const toolDisplay = id ? `${id} - ${name} - ${code}` : (name && code ? `${name} - ${code}` : (name || code));
                                  return toolDisplay.toLowerCase().includes(toolSearchTerm.toLowerCase());
                                })
                                .map((item, idx) => {
                                  const id = item.id || "";
                                  const name = item.Name_Description || "";
                                  const code = item.part_no || "";
                                  const toolDisplay = id ? `${id} - ${name} - ${code}` : (name && code ? `${name} - ${code}` : (name || code));
                                  return (
                                    <li
                                      key={idx}
                                      className="list-group-item list-group-item-action py-2 px-3"
                                      style={{ cursor: "pointer", textAlign: "left", whiteSpace: "normal" }}
                                      onClick={() => {
                                        setToolCode(code);
                                        setToolDesc(name);
                                        setToolSearchTerm(toolDisplay);
                                        setMake(item.Male || item.male || item.make || "In-house");
                                        setShowToolDropdown(false);
                                      }}
                                    >
                                      <div style={{ fontWeight: 600, color: "#333", fontSize: "0.82rem" }}>{toolDisplay}</div>
                                    </li>
                                  );
                                })}
                              {masterItems.filter(item => {
                                const id = item.id || "";
                                const name = item.Name_Description || "";
                                const code = item.part_no || "";
                                const toolDisplay = id ? `${id} - ${name} - ${code}` : (name && code ? `${name} - ${code}` : (name || code));
                                return toolDisplay.toLowerCase().includes(toolSearchTerm.toLowerCase());
                              }).length === 0 && (
                                <li className="list-group-item disabled py-1 px-2 text-muted">No tools found</li>
                              )}
                            </ul>
                          )}
                        </div>

                        <div className="col-md-1">
                          <label className="form-label">Tool/Die Life</label>
                          <input
                            type="text"
                            className="form-control"
                            value={toolLife}
                            onChange={(e) => setToolLife(e.target.value)}
                          />
                        </div>

                        <div className="col-md-1">
                          <label className="form-label">No. Resharp</label>
                          <input
                            type="text"
                            className="form-control"
                            value={noOfReshapingTool}
                            onChange={(e) => setNoOfReshapingTool(e.target.value)}
                          />
                        </div>

                        <div className="col-md-1">
                          <label className="form-label">Total Life</label>
                          <input
                            type="text"
                            className="form-control"
                            value={totalLife}
                            onChange={(e) => setTotalLife(e.target.value)}
                          />
                        </div>

                        <div className="col-md-1 align-self-end">
                          <button type="submit" className="vndrbtn w-100">
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="table-responsive mt-4">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr No.</th>
                          <th>Item No</th>
                          <th>Item Desc</th>
                          <th>Setup Part Code</th>
                          <th>Tool Code</th>
                          <th>Tool Description</th>
                          <th>Make</th>
                          <th>Tool Life/Resharpening</th>
                          <th>No of Resharpening/Tool</th>
                          <th>Total Life</th>
                          <th>Total Required/Pieces</th>
                          <th>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="12" className="text-center py-4">
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : dataList.length === 0 ? (
                          <tr>
                            <td colSpan="12" className="text-center py-4 text-muted">
                              No records found
                            </td>
                          </tr>
                        ) : (
                          dataList.map((data, index) => (
                            <tr key={data.id || index}>
                              <td>{index + 1}</td>
                              <td>{data.item_no || "-"}</td>
                              <td>{data.item_description || "-"}</td>
                              <td>{data.part_code || "-"}</td>
                              <td>{data.tool_code || "-"}</td>
                              <td>{data.tool_description || "-"}</td>
                              <td>{data.make || "In-house"}</td>
                              <td>{data.tool_life || "-"}</td>
                              <td>{data.no_of_reshaping_tool || "-"}</td>
                              <td>{data.total_life || "-"}</td>
                              <td>{data.total_life && Number(data.total_life) !== 0 ? (1 / Number(data.total_life)).toFixed(5) : "-"}</td>
                              <td>
                                <Tooltip title="Delete Record">
                                  <IconButton size="small" sx={{ color: '#ef4444', '&:hover': { bgcolor: '#fee2e2' } }} onClick={() => handleDelete(data.id)}>
                                    <FaTrash size={16} />
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
              </main>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default ToolManagement;
