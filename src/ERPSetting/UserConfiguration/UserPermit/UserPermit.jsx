import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./UserPermit.css";
import {
  fetchUsersDropdown,
  assignPermissions,
} from "../../../Service/Erpsetting.jsx";

import { Typography, Paper, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopyOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";

const availablePermissions = {
  Dashboard: [
    "Dashboard",
    "Dashboard View",
    "Financial",
    "Purchase",
    "PPC",
    "OEE",
    "Quality",
    "Stores",
    "Subcon",
    "Planning",
    "Sales",
    "Account",
    "CRM",
  ],
  All_Masters: [
   "Masters", "Customer", "Business Partner Address", "Item Master", "Cross Reference", "Customer / Supplier Item Link", "Item Cross Reference", "GST Rate Master", 
                             "Commodity Master", "BOM Routing Master", "Work Center Master", "Cycle Time Master", 
                             "Operator and Supervisor Master", "Contractor Master", "Shift Master", "Work Center Schedule", 
                             "Unit Conversion", "Price List", "Price List Master", "Price List Entry", "Cost Center Master", "Project Management", 
                             "Document Management", "Master Report", "Customer State", "Master Customers", "Master State"
  ],
  Purchase: [
  "Purchase", "New Indent", "New Purchase Order", "New Jobwork Purchase Order", "Pending PO Release", 
                             "Pending Indent Release", "Purchase MRN Release", "Purchase Order Status", "Quote Comparison", "RFO", "Quoto Comparison Statement", "Quoto Comparison Pending", "Reports", "Purchase Order List", "Jobwork Purchase Order List", "Supplier Wise Item Purchase List", "Purchase Report (Cost Center Wise)", "Import"
  ],
  Store: [
  "Store", "Gate Inward Entry", "Pending ASN List", "New MRN", "Purchase GRN", "Subcon GRN", "57F4 Inward Challan", "JobWork Inward Challan", "Vendor Scrap Inward", 
                             "Material Issue Challan", "Material Issue Gernal", "Stock Transaction", "Opening Stock", "FG Movement", "RM Stock Transaction", "Stock Transfer", "Delivery Challan", 
                             "DC GRN", "Store Report", "GRN List", "MRN List", "Inward 57F4 Challan List", "Material Issue Challan List", "General Material Issue Challan List", "Deliver Challan List", "DC GRN List", "Indent List", "Indent Status", "Stock Report", "Subcontract Stock", "WIP Stock Report", "RM Stock Report", "Consumable Stock Report", "FG Stock Report"
  ],
  Production: [
   "Production", "Work Order Entry", "Work Order List", "Production Plan List", "Production Entry",
                              "Production Entry Ass.", "Production Report", "Rework Production", "Rework Production Entry2", "Rework Production Entry", "Rework Production Report", 
                                "Scrap Production", "Scrap/Rejection Entry", "Scrap/Rejection Report", "FG Scrap/Rejection Entry", "FG Scrap/Rejection Report", "Material Idle Time", "Breakdown Time Entry",
                                  "Breakdown Time Report", "Contractor Payment", "P Report", "Rejection Report", "Rework Report", "Default Ideal Time Report", "Breakdown Analysis Report", "Cycle Time Report", "Operator Performance Report"  ],
  ERPSetting: [
   "User Configuration", "ERP Configuration", "Change Password",
                              "Login History", "Dealer Management", "Dashboard Backup",
                                "Delete Record"
  ],
  Quality: [
    "Quality",
    "Quality Planning",
    "Purchase GRN QC",
    "Pending QC List",
    "Inward Test Certificate",
    "Subcon / JobWork GRN QC",
    "Pending QC Inward",
    "Inward Inspection List",
    "Inprocess QC",
    "Inprocess Inspection",
    "Inprocess Inspection List",
    "Sales Return QC",
    "Sales Return QC Pending List",
    "Sales Return QC List",
    "Gauges And Instruction Calibration",
    "Heat Code Register",
    "DTC - Dispatch Test Certificate",
    "PDI - Pre Dispatch Inspection",
    "First Piece Approval",
    "Set Up Approval",
    "Hot Inspection",
    "Sampling Plan",
    "Customer Complaint",
    "Customer Complaint Entry",
    "Customer Complaint Authorization",
    "Customer Complaint List",
    "Test Master",
    "Test Report",
    "Test Master",
    "Test Master List",
  ],
  Planning: [
    "Planning",
    "Manufacturing Order",
    "Production Schedule",
    "Min Max Planning",
    "Dispatch Plan Setup",
    "Daily Dispatch Plan",
    "Business Plan",
    "Upcoming Dispatch List",
    "Capacity Planning",
    "Costing",
    "Vendor Schedule",
  ],
  Sales: [
    "Sales",
    "E-Invoicing",
    "GST Sales",
    "JobWork Sales",
    "Debit Note",
    "Credit Note",
    "Customer Sales Order",
    "Customer Sales Order Amendment",
    "Schedule Sales Order",
    "Customer Sales Order Status",
    "GST Invoice",
    "GST JobWork",
    "GST JobWork Invoice",
    "GST JobWork DC Return",
    "OutWard 57F4 Challan",
    "Credit / Debit Note",
    "Purchase Debit Note",
    "Sales Rate Diff Debit Note",
    "Jobwork Rate Diff Debit Note",
    "Credit Note Entry",
    "GST Sales Return",
    "Material GatePass",
    "Material GatePass New",
    "Pending Material GatePass",
    "Material GatePass List",
    "Report",
    "Customer Sales Order List",
    "Proforma Invoice List",
    "Tax Invoice List",
    "Tax Invoice List Bajaj",
    "JobWork Invoice List",
    "JobWork DC List",
    "OutWard 57F4 Challan List",
    "Debit Note List",
    "Credit Note List",
    "GST Sales Return List",
    "RG1 Register",
    "Transport List",
  ],
  Accounts: [
    "Accounts", "Bill Passing", "Purchase Bill", "Jobwork Bill", "Direct Bill", "GL Master", "GST Report", "Purchase Register", "AC Purchase Register", "TDS Register", "TCS Register", "GL Ledger"
  ],
  Maintenance: [
    "Maintenance", "Asset List", "Item Asset Master", "Machine Breakdown", "Breakdown List", "Breakdown Authorisation", "Breakdown Report", "Breakdown Slip", "Machine Repair", "Repair Entry", "Repair List", "Machine Preventive", "Machine Preventive Entry", "Machine Preventive Report", "Machine Preventive Schedule", "Machine Preventive SetUp", "Tool Management"
  ],
  VendorsUserManagement: ["VendorsUserManagement"],
};

const UserPermit = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [permissions, setPermissions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    fetchUsers();
    initializePermissions();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await fetchUsersDropdown();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };

  const initializePermissions = () => {
    const initialPermissions = {};
    Object.keys(availablePermissions).forEach((module) => {
      initialPermissions[module] = {};
      availablePermissions[module].forEach((permission) => {
        initialPermissions[module][permission] = false;
      });
    });
    setPermissions(initialPermissions);
  };

  const handleSelectAll = () => {
    const updatedPermissions = { ...permissions };
    Object.keys(availablePermissions).forEach((module) => {
      availablePermissions[module].forEach((permission) => {
        updatedPermissions[module][permission] = !selectAll;
      });
    });
    setPermissions(updatedPermissions);
    setSelectAll(!selectAll);
  };

  const handleModuleSelect = (module) => {
    const modulePermissions = permissions[module];
    const allChecked = Object.values(modulePermissions).every(Boolean);
    const updatedPermissions = {
      ...permissions,
      [module]: Object.keys(modulePermissions).reduce((acc, permission) => {
        acc[permission] = !allChecked;
        return acc;
      }, {}),
    };
    setPermissions(updatedPermissions);
    setSelectedModule(module);
  };

  const handlePermissionToggle = (module, permission) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [permission]: !prev[module][permission],
      },
    }));
  };

  const handleSubmit = async () => {
    if (!selectedUser) {
      toast.warning("Please select a user");
      return;
    }

    const modulesToSubmit = {};
    Object.entries(permissions).forEach(([module, modulePermissions]) => {
      const selectedPermissions = Object.entries(modulePermissions)
        .filter(([_, isSelected]) => isSelected)
        .map(([permission]) => permission);

      if (selectedPermissions.length > 0) {
        modulesToSubmit[module] = selectedPermissions;
      }
    });

    try {
      const response = await assignPermissions(selectedUser, modulesToSubmit);
      console.log("Full response:", response);
      if (response.message === "Permissions assigned successfully") {
        toast.success("Permissions assigned successfully");
      } else {
        toast.info("Unexpected response format");
      }
    } catch (error) {
      console.error("Error assigning permissions:", error);
      toast.error("Error assigning permissions");
    }
  };

  const renderPermissions = (module) => {
    return (
      <div className="master-pages">
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
          {module.replace('_', ' ')} Permissions
        </Typography>
        <div className="row">
          {availablePermissions[module]
            .filter((permission) =>
              permission.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((permission) => (
              <div key={permission} className="col-md-3 mb-2">
                <div className="permission-item form-check d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input mt-0 me-2"
                    checked={permissions[module]?.[permission] || false}
                    onChange={() => handlePermissionToggle(module, permission)}
                    id={`${module}-${permission}`}
                    style={{ cursor: 'pointer', width: '1.2rem', height: '1.2rem' }}
                  />
                  <label 
                    className="form-check-label" 
                    htmlFor={`${module}-${permission}`}
                    style={{ cursor: 'pointer', fontSize: '0.9rem', color: '#475569', userSelect: 'none' }}
                  >
                    {permission}
                  </label>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="UserPermit">
      <ToastContainer/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={() => setSideNavOpen(!sideNavOpen)} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={() => setSideNavOpen(!sideNavOpen)}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-permit mt-3 px-3">
                  <div className="permit-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          User Permission
                        </Typography>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end gap-2">
                        <Button 
                          onClick={handleSubmit}
                          variant="contained" 
                          startIcon={<SaveIcon />}
                          sx={{ 
                            borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                            background: 'linear-gradient(to right, #10b981, #059669)', color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)', transition: 'all 0.2s ease',
                            '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)' } 
                          }}
                        >
                          Assign Permissions
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <label className="form-label mb-1 fw-bold text-muted" style={{ fontSize: '0.85rem' }}>Select User:</label>
                        <select
                          value={selectedUser}
                          onChange={(e) => setSelectedUser(e.target.value)}
                          className="form-select"
                          style={{ borderColor: '#cbd5e1', boxShadow: 'none' }}
                        >
                          <option value="">Select User</option>
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.FullName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-9 d-flex flex-wrap justify-content-end gap-2 align-items-end mt-3 mt-md-0">
                        <Button variant="outlined" size="small" startIcon={<DownloadIcon />} sx={{ borderRadius: '6px', textTransform: 'none', fontWeight: 600, borderColor: '#e2e8f0', color: '#475569', '&:hover': { borderColor: '#cbd5e1', backgroundColor: '#f8fafc' } }}>Export User</Button>
                        <Button variant="outlined" size="small" startIcon={<DownloadIcon />} sx={{ borderRadius: '6px', textTransform: 'none', fontWeight: 600, borderColor: '#e2e8f0', color: '#475569', '&:hover': { borderColor: '#cbd5e1', backgroundColor: '#f8fafc' } }}>Export All</Button>
                        <Button variant="outlined" size="small" startIcon={<DownloadIcon />} sx={{ borderRadius: '6px', textTransform: 'none', fontWeight: 600, borderColor: '#e2e8f0', color: '#475569', '&:hover': { borderColor: '#cbd5e1', backgroundColor: '#f8fafc' } }}>Export Modulewise</Button>
                        <Button variant="outlined" size="small" startIcon={<DownloadIcon />} sx={{ borderRadius: '6px', textTransform: 'none', fontWeight: 600, borderColor: '#e2e8f0', color: '#475569', '&:hover': { borderColor: '#cbd5e1', backgroundColor: '#f8fafc' } }}>Export Active</Button>
                        <Button variant="outlined" size="small" startIcon={<ContentCopyIcon />} sx={{ borderRadius: '6px', textTransform: 'none', fontWeight: 600, borderColor: '#e2e8f0', color: '#475569', '&:hover': { borderColor: '#cbd5e1', backgroundColor: '#f8fafc' } }}>Copy</Button>
                        <div className="ms-3 d-flex align-items-center" style={{ height: '30px' }}>
                          <input
                            type="checkbox"
                            className="form-check-input mt-0 me-2"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            id="select-all"
                            style={{ cursor: 'pointer' }}
                          />
                          <label htmlFor="select-all" className="form-check-label fw-bold" style={{ cursor: 'pointer', color: '#1e293b' }}>All</label>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <input
                          type="text"
                          placeholder="Search permissions..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="form-control"
                          style={{ borderColor: '#cbd5e1', boxShadow: 'none', borderRadius: '8px', padding: '10px 16px' }}
                        />
                      </div>
                    </div>
                  </Paper>

                  <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: 'white', mb: 4 }}>
                    <div className="modules-list row">
                      {Object.keys(availablePermissions).map((module) => (
                        <div key={module} className="col-md-12 mb-2">
                          <div 
                            className="module-item p-3" 
                            style={{ 
                              border: selectedModule === module ? '2px solid #3b82f6' : '1px solid #e2e8f0', 
                              borderRadius: '10px', 
                              backgroundColor: selectedModule === module ? '#eff6ff' : '#f8fafc',
                              transition: 'all 0.2s ease',
                              cursor: 'pointer'
                            }}
                            onClick={() => setSelectedModule(selectedModule === module ? null : module)}
                          >
                            <div className="module-header d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                <input
                                  type="checkbox"
                                  className="form-check-input me-3 mt-0"
                                  checked={Object.values(
                                    permissions[module] || {}
                                  ).every(Boolean) && Object.values(permissions[module] || {}).length > 0}
                                  onChange={(e) => { e.stopPropagation(); handleModuleSelect(module); }}
                                  id={`module-${module}`}
                                  style={{ cursor: 'pointer', width: '1.2rem', height: '1.2rem' }}
                                />
                                <label 
                                  htmlFor={`module-${module}`} 
                                  onClick={(e) => { e.stopPropagation(); handleModuleSelect(module); }}
                                  className="form-check-label fw-bold m-0" 
                                  style={{ cursor: 'pointer', fontSize: '1.1rem', color: selectedModule === module ? '#1d4ed8' : '#1e293b', userSelect: 'none' }}
                                >
                                  {module.replace('_', ' ')}
                                </label>
                              </div>
                              <span style={{ fontSize: '1.1rem', color: selectedModule === module ? '#1d4ed8' : '#64748b', transition: 'transform 0.2s ease', display: 'inline-block', transform: selectedModule === module ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                ▼
                              </span>
                            </div>
                            {selectedModule === module && (
                              <div className="mt-4 pt-4 border-top" style={{ borderColor: '#bfdbfe !important', cursor: 'default' }} onClick={(e) => e.stopPropagation()}>
                                {renderPermissions(module)}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Paper>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPermit;
