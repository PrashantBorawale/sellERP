import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./GateInwardEntry.css";
import { getgateInward, deleteGateInward } from "../../Service/StoreApi.jsx";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Typography, Box, Tooltip, Button, Pagination, TextField, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import ListAltIcon from "@mui/icons-material/ListAltOutlined";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import * as XLSX from "xlsx";

const GateInwardEntry = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [gateInwardData, setGateInwardData] = useState([]);
  const [grnDataMap, setGrnDataMap] = useState({});

  // Filter States
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [plant, setPlant] = useState("VISHWA S.I.");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [itemName, setItemName] = useState("");
  const [gateEntryNo, setGateEntryNo] = useState("");

  useEffect(() => {
    fetchGateInward();
    fetchGrnData();
  }, []);

  const fetchGateInward = async () => {
    const data = await getgateInward();
    setGateInwardData(data.sort((a, b) => b.id - a.id));
  };

  const fetchGrnData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch("https://sellerp-backend.onrender.com/Store/gate-entry-wise-grn-data/", { headers });
      const json = await response.json();
      if (json.status && Array.isArray(json.results)) {
        const map = {};
        json.results.forEach((entry) => {
          if (entry.GateEntryNo && Array.isArray(entry.data) && entry.data.length > 0) {
            map[entry.GateEntryNo] = {
              GrnNo: entry.data[0].GrnNo || "-",
              GrnDate: entry.data[0].GrnDate || "-",
            };
          }
        });
        setGrnDataMap(map);
      }
    } catch (error) {
      console.error("Error fetching GRN data:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
      try {
        const response = await deleteGateInward(id);
        if (response.status === 204 || response.status === 200) {
          alert("Entry Deleted Successfully");
          setGateInwardData(gateInwardData.filter((item) => item.id !== id));
        } else {
          alert("Failed to delete entry");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
      }
    }
  };

  const handleExportExcel = () => {
    if (gateInwardData.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = gateInwardData.map((item, index) => {
      return {
        "Sr no.": index + 1,
        "Year": new Date(item.GE_Date).getFullYear(),
        "Plant": item.Plant,
        "Entry No": item.GE_No,
        "Entry Date": item.GE_Date,
        "Entry Time": item.GE_Time,
        "Type": item.Type,
        "Custo/Supplier Name": item.Supp_Cust,
        "Challan No": item.ChallanNo,
        "Challan Date": item.ChallanDate,
        "Invoice No": item.InVoiceNo,
        "Invoice Date": item.Invoicedate,
        "Ref Doc No": grnDataMap[item.GE_No]?.GrnNo || "-",
        "Ref Doc Date": grnDataMap[item.GE_No]?.GrnDate || "-",
        "User": item.User || "-"
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Gate Entry Inward");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Gate_Entry_Inward.xlsx");
  };

  const handleViewPdf = (item) => {
    const viewPath = item?.View || item?.PDF_Link || item?.pdf || item?.file || item?.document;
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
      window.open(`https://sellerp-backend.onrender.com/Store/gate-inward-pdf/${item.id}/`, "_blank", "noopener,noreferrer");
    } else {
      alert(`No PDF attached or generated for gate entry: ${item?.GE_No || "this record"}`);
    }
  };

  return (
    <div className="NewStoreGateInward1">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header Section */}
                  <div className="erp-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          Gate Entry Inward Register
                        </Typography>
                      </div>
                      <div className="col-md-8 d-flex justify-content-end gap-2">
                        <Link to={"/New-Gate-Entry"} style={{ textDecoration: 'none' }}>
                          <button className="vndrbtn bg-primary border-primary"><AddIcon className="me-1" /> New Gate Entry</button>
                        </Link>
                        <button className="vndrbtn bg-primary border-primary"><ListAltIcon className="me-1" /> Material Reg</button>
                        <button className="vndrbtn bg-primary border-primary"><ListAltIcon className="me-1" /> Query</button>
                        <button className="vndrbtn bg-success border-success" onClick={handleExportExcel}><DownloadIcon className="me-1" /> Export To Excel</button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="centerMain mt-4">
                    <form>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'flex-end', mb: 4, width: '100%' }}>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 120px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>From Date</Typography>
                          <TextField
                            type="date"
                            size="small"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 120px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>To Date</Typography>
                          <TextField
                            type="date"
                            size="small"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 120px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Plant</Typography>
                          <TextField
                            select
                            size="small"
                            value={plant}
                            onChange={(e) => setPlant(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%', display: 'flex', alignItems: 'center' } }}
                          >
                            <MenuItem value="VISHWA S.I." sx={{ fontSize: '0.75rem' }}>VISHWA S.I.</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 150px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Type</Typography>
                          <TextField
                            select
                            size="small"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%', display: 'flex', alignItems: 'center' } }}
                          >
                            <MenuItem value="" sx={{ fontSize: '0.75rem' }}>Select Type</MenuItem>
                            <MenuItem value="PurchaseGRN" sx={{ fontSize: '0.75rem' }}>Purchase GRN</MenuItem>
                            <MenuItem value="ScheduleGRN" sx={{ fontSize: '0.75rem' }}>Schedule GRN</MenuItem>
                            <MenuItem value="ImportGRN" sx={{ fontSize: '0.75rem' }}>Import GRN</MenuItem>
                            <MenuItem value="57F4GRN" sx={{ fontSize: '0.75rem' }}>57F4 GRN</MenuItem>
                            <MenuItem value="jobworkGRN" sx={{ fontSize: '0.75rem' }}>jobwork GRN</MenuItem>
                            <MenuItem value="DC GRN" sx={{ fontSize: '0.75rem' }}>DC GRN</MenuItem>
                            <MenuItem value="InterStoreInvoice" sx={{ fontSize: '0.75rem' }}>Inter Store Invoice</MenuItem>
                            <MenuItem value="InterStoreChallan" sx={{ fontSize: '0.75rem' }}>Inter Store Challan</MenuItem>
                            <MenuItem value="Sales Return" sx={{ fontSize: '0.75rem' }}>Sales Return</MenuItem>
                            <MenuItem value="DirectGRN" sx={{ fontSize: '0.75rem' }}>Direct GRN</MenuItem>
                            <MenuItem value="General/Document/Courier" sx={{ fontSize: '0.75rem' }}>General/Document/Courier</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 120px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Status</Typography>
                          <TextField
                            select
                            size="small"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%', display: 'flex', alignItems: 'center' } }}
                          >
                            <MenuItem value="" sx={{ fontSize: '0.75rem' }}>Select Status</MenuItem>
                            <MenuItem value="Pending" sx={{ fontSize: '0.75rem' }}>Pending</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 150px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Supplier Name</Typography>
                          <TextField
                            size="small"
                            placeholder="Supplier Name"
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 150px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Item Name</Typography>
                          <TextField
                            size="small"
                            placeholder="Item Name"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 150px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Gate Entry No.</Typography>
                          <TextField
                            size="small"
                            placeholder="Gate Entry No."
                            value={gateEntryNo}
                            onChange={(e) => setGateEntryNo(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.2 }}>
                          <button type="button" className="vndrbtn bg-primary border-primary" style={{ padding: '4px 16px', height: '32px' }}>
                            <FaSearch className="me-1" /> Search
                          </button>
                        </Box>

                      </Box>
                    </form>
                  </div>

                  {/* Table Section */}
                  <div className="card shadow-sm border-0 mb-4 erp-table-container" style={{ borderRadius: '12px' }}>
                    <div className="table-responsive erp-table-wrapper">
                      <table className="table table-bordered table-hover mb-0" style={{ width: '100%', tableLayout: 'fixed' }}>
                        <thead className="table-light sticky-top" style={{ zIndex: 10 }}>
                          <tr>
                            {["Sr no.", "Year", "Plant", "Entry No", "Entry Date", "Entry Time", "Type", "Custo/Supplier Name", "Challan No", "Challan Date", "Invoice No", "Invoice Date", "Ref Doc No", "Ref Doc Date", "User", "Actions"].map((head, index) => {
                              const colWidths = ["4%", "4%", "6%", "5%", "6%", "5%", "8%", "11%", "6%", "6%", "6%", "6%", "6%", "6%", "5%", "10%"];
                              return (
                                <th key={index} style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.62rem', textTransform: 'uppercase', padding: '4px 4px', textAlign: (head.includes("No") || head === "Sr no.") ? "center" : "left", width: colWidths[index] }}>
                                  <div className="cell-clamp">
                                    {head}
                                  </div>
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {gateInwardData.length === 0 ? (
                            <tr>
                              <td colSpan={16} className="text-center py-5 text-muted fw-bold">No Data Found !!</td>
                            </tr>
                          ) : (
                            gateInwardData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                              <tr key={item.id}>
                                <td style={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{new Date(item.GE_Date).getFullYear()}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.Plant}</div></td>
                                <td style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}><div className="cell-clamp">{item.GE_No}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.GE_Date}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.GE_Time}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.Type}</div></td>
                                <td style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.Supp_Cust}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}><div className="cell-clamp">{item.ChallanNo}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.ChallanDate}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}><div className="cell-clamp">{item.InVoiceNo}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.Invoicedate}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}><div className="cell-clamp">{grnDataMap[item.GE_No]?.GrnNo || "-"}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{grnDataMap[item.GE_No]?.GrnDate || "-"}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.User || "-"}</div></td>
                                <td style={{ textAlign: 'center', padding: '4px 8px', whiteSpace: 'nowrap' }}>
                                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                                    <Tooltip title="Edit Gate Entry">
                                      <Button component={Link} to={`/New-Gate-Entry/${item.id}`} sx={{ minWidth: 0, p: 0.5, color: '#f59e0b', bgcolor: '#fef3c7', borderRadius: '6px', '&:hover': { bgcolor: '#fde68a' } }}>
                                        <FaEdit size={14} />
                                      </Button>
                                    </Tooltip>
                                    <Tooltip title="View Document">
                                      <Button onClick={() => handleViewPdf(item)} sx={{ minWidth: 0, p: 0.5, color: '#3b82f6', bgcolor: '#dbeafe', borderRadius: '6px', '&:hover': { bgcolor: '#bfdbfe' } }}>
                                        <VisibilityIcon sx={{ fontSize: 16 }} />
                                      </Button>
                                    </Tooltip>
                                    <Tooltip title="Delete Entry">
                                      <Button onClick={() => handleDelete(item.id)} sx={{ minWidth: 0, p: 0.5, color: '#ef4444', bgcolor: '#fee2e2', borderRadius: '6px', '&:hover': { bgcolor: '#fecaca' } }}>
                                        <FaTrash size={14} />
                                      </Button>
                                    </Tooltip>
                                  </Box>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pagination Section */}
                  {gateInwardData.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                      <Pagination 
                        count={Math.ceil(gateInwardData.length / itemsPerPage)} 
                        page={currentPage} 
                        onChange={(e, value) => setCurrentPage(value)} 
                        color="primary" 
                        shape="rounded"
                      />
                    </Box>
                  )}

                </div>
              </main>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GateInwardEntry;
