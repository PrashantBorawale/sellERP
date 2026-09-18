import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./GLMaster.css";
import { FaTrash, FaEdit, FaFileExcel } from "react-icons/fa";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import axios from "axios";
import * as XLSX from "xlsx";

const GLMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [glCode, setGlCode] = useState("");
  const [glName, setGlName] = useState("");
  const [glCategory, setGlCategory] = useState("General");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get("https://sellerp-backend.onrender.com/Account/general-ledger/", { headers });
      setDataList(response.data);
    } catch (error) {
      console.error("Error fetching GL data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!glCode.trim() || !glName.trim()) {
      alert("Please enter GL Code and GL Name");
      return;
    }
    const token = localStorage.getItem("accessToken");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const username = localStorage.getItem("username") || "Admin";

    const payload = {
      gl_code: glCode,
      gl_description: glName,
      gl_category: glCategory,
      user: username
    };

    try {
      if (editingId) {
        // Update
        const response = await axios.put(`https://sellerp-backend.onrender.com/Account/general-ledger/${editingId}/`, payload, { headers });
        if (response.status === 200 || response.status === 201) {
          alert("General Ledger updated successfully");
          setEditingId(null);
        }
      } else {
        // Create
        const response = await axios.post("https://sellerp-backend.onrender.com/Account/general-ledger/", payload, { headers });
        if (response.status === 200 || response.status === 201) {
          alert("General Ledger created successfully");
        }
      }
      setGlCode("");
      setGlName("");
      setGlCategory("General");
      fetchData();
    } catch (error) {
      console.error("Error saving General Ledger:", error);
      alert("Failed to save. Please try again.");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setGlCode(item.gl_code || "");
    setGlName(item.gl_description || "");
    setGlCategory(item.gl_category || "General");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this General Ledger?")) {
      return;
    }
    const token = localStorage.getItem("accessToken");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      const response = await axios.delete(`https://sellerp-backend.onrender.com/Account/general-ledger/${id}/`, { headers });
      if (response.status === 200 || response.status === 204) {
        alert("General Ledger deleted successfully");
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting General Ledger:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  const handleExportExcel = () => {
    if (!Array.isArray(dataList) || dataList.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = dataList.map((data, index) => ({
      "Sr. No.": index + 1,
      "GL Code": data.gl_code || "",
      "GL Description": data.gl_description || "",
      "GL Category": data.gl_category || "",
      "User": data.user || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "GL Master");

    // Auto-size columns
    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "General_Ledger_Master.xlsx");
  };

  return (
    <div className="erp-page gl-master">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management p-4">
                  <div className="erp-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6 d-flex justify-content-start align-items-center">
                        <h5 className="header-title mb-0">
                          General Ledger Master
                        </h5>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end">
                        <button 
                          className="vndrbtn"
                          onClick={handleExportExcel}
                        >
                          <i className="fas fa-file-excel me-2"></i> Export Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 align-items-end text-start">
                        <div className="col-md-3">
                          <label className="form-label mb-1">GL Code</label>
                          <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="Enter GL Code" 
                            value={glCode}
                            onChange={(e) => setGlCode(e.target.value)}
                          />
                        </div>

                        <div className="col-md-4">
                          <label className="form-label mb-1">GL Name</label>
                          <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="Enter GL Name" 
                            value={glName}
                            onChange={(e) => setGlName(e.target.value)}
                          />
                        </div>

                        <div className="col-md-3">
                          <label className="form-label mb-1">GL Category</label>
                          <select 
                            className="form-select form-select-sm"
                            value={glCategory}
                            onChange={(e) => setGlCategory(e.target.value)}
                          >
                            <option value="General">General</option>
                            <option value="Other">Other</option>
                            <option value="TCS">TCS</option>
                          </select>
                        </div>

                        <div className="col-md-2">
                          <button 
                            className="vndrbtn w-100" 
                            onClick={handleSave} 
                            style={{ minHeight: '31px' }}
                          >
                            <i className="fas fa-save me-2"></i>{editingId ? "Update" : "Save"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-0">
                      <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        <table className="table table-bordered table-striped table-hover align-middle mb-0">
                          <thead className="table-primary sticky-top" style={{ zIndex: 1 }}>
                            <tr>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>SR. NO.</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>GL CODE</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>GL DESCRIPTION</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>GL CATEGORY</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>USER</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>EDIT</th>
                              <th style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>DEL</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.isArray(dataList) && dataList.map((data, index) => (
                              <tr key={data.id}>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{index + 1}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{data.gl_code}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{data.gl_description}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{data.gl_category}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>{data.user}</td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                  <button 
                                    className="btn btn-sm btn-outline-primary border-0" 
                                    title="Edit" 
                                    onClick={() => handleEdit(data)}
                                  >
                                    <i className="fas fa-edit" style={{ fontSize: '1.1rem' }}></i>
                                  </button>
                                </td>
                                <td style={{ fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center' }}>
                                  <button 
                                    className="btn btn-sm btn-outline-danger border-0" 
                                    title="Delete" 
                                    onClick={() => handleDelete(data.id)}
                                  >
                                    <i className="fas fa-trash" style={{ fontSize: '1.1rem' }}></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {(!Array.isArray(dataList) || dataList.length === 0) && !loading && (
                              <tr>
                                <td colSpan="7" className="text-center py-4 text-muted" style={{ fontSize: '0.85rem' }}>
                                  No General Ledger records found.
                                </td>
                              </tr>
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

export default GLMaster;
