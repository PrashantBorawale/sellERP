import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./PurchaseRegister.css";
import { Box, Tooltip, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, FormControl, Select, MenuItem, Grid, Dialog, DialogTitle, DialogContent, FormControlLabel, Checkbox, Radio, RadioGroup } from "@mui/material";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlined";
import WarningIcon from "@mui/icons-material/WarningAmberOutlined";
import ListAltIcon from "@mui/icons-material/ListAltOutlined";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOffOutlined";
import { FaFileExcel, FaTimes, FaSearch, FaCheck } from "react-icons/fa";
import axios from "axios";
import * as XLSX from "xlsx";

const PurchaseRegister = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [showMasterModal, setShowMasterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Query");
  const [masterTab, setMasterTab] = useState("Query Master");
  const [detailsTab, setDetailsTab] = useState("Query");
  
  const [fromDate, setFromDate] = useState("2026-04-01");
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      
      const [jobworkResponse, purchaseResponse] = await Promise.all([
        axios.get(`https://sellerp-backend.onrender.com/Account/jobwork-bill-register/?from_date=${fromDate}&to_date=${toDate}`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => {
          console.error("Error fetching jobwork bills:", err);
          return { data: [] };
        }),
        axios.get(`https://sellerp-backend.onrender.com/Account/bill-register/?from_date=${fromDate}&to_date=${toDate}`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => {
          console.error("Error fetching purchase bills:", err);
          return { data: [] };
        })
      ]);
      
      const rawJobworkData = Array.isArray(jobworkResponse.data) ? jobworkResponse.data : 
                      (jobworkResponse.data?.data ? jobworkResponse.data.data : []);
      const processedJobwork = rawJobworkData.map(item => ({ ...item, isJobwork: true }));
                      
      const rawPurchaseData = Array.isArray(purchaseResponse.data) ? purchaseResponse.data : 
                      (purchaseResponse.data?.data ? purchaseResponse.data.data : []);
      const processedPurchase = rawPurchaseData.map(item => ({ ...item, isJobwork: false }));
                      
      const combinedRawData = [...processedJobwork, ...processedPurchase];
      
      const mappedData = combinedRawData.map((item, index) => ({
        sr: index + 1,
        id: item.id,
        pdfId: item.id,
        isJobwork: item.isJobwork,
        year: "",
        billNo: item.bill_no || item.no || "",
        billDate: item.posting_date || item.bill_date || "",
        type: item.type || "",
        billType: item.bill_type || "",
        challanNo: item.inv_challan_no || item.challan_no || "",
        challanDate: item.inv_challan_date || item.challan_date || "",
        poNo: item.items?.[0]?.po_no || "",
        grnNo: item.items?.[0]?.grn_no || "",
        code: item.supplier_code || "",
        supplier: item.supplier || item.supplier_name || "",
        assAmt: item.assable_value || "",
        totalAmt: item.grand_total || item.net_total || "",
        user: item.prepared_by || ""
      }));

      setData(mappedData);
    } catch (error) {
      console.error("Error fetching purchase register:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const handleExportExcel = () => {
    if (data.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = data.map((row) => ({
      "Sr": row.sr || "",
      "Year": row.year || "",
      "Bill (P) No.": row.billNo || "",
      "Bill (P) Date": row.billDate || "",
      "Type": row.type || "",
      "Bill Type": row.billType || "",
      "Challan No": row.challanNo || "",
      "Challan Date": row.challanDate || "",
      "PO No": row.poNo || "",
      "GRN No": row.grnNo || "",
      "Code": row.code || "",
      "Supplier/Vendor Name": row.supplier || "",
      "Ass Amt.": row.assAmt || "",
      "Total Amt.": row.totalAmt || "",
      "User": row.user || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Register");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Purchase_Register.xlsx");
  };

  const handleViewPdf = async (id, isJobwork) => {
    if (!id) {
      alert("Invalid ID for PDF generation.");
      return;
    }
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write('<html><head><title>Loading PDF...</title></head><body style="font-family: sans-serif; padding: 20px;">Loading PDF securely...</body></html>');
    }

    try {
      const token = localStorage.getItem("accessToken");
      const endpoint = isJobwork ? 'jobwork-bill-pdf' : 'bill-register-pdf';
      const response = await axios.get(`https://sellerp-backend.onrender.com/Account/${endpoint}/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      });
      
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      
      if (newWindow) {
        newWindow.location.href = fileURL;
      } else {
        window.open(fileURL, '_blank');
      }
    } catch (error) {
      if (newWindow) newWindow.close();
      console.error("Error viewing PDF:", error);
      alert("Failed to load PDF. Make sure you have permission or the record exists.");
    }
  };

  return (
    <div className="purchase-register">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div>

                  {/* Header Section */}
                  <div className="erp-header mb-4">
    <div className="row align-items-center">
      <div className="col-md-6 d-flex justify-content-start align-items-center">
        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
          Purchase Register
        </Typography>
      </div>
      <div className="col-md-6 d-flex justify-content-end gap-2">
        <button className="vndrbtn bg-primary border-primary" onClick={() => setShowQueryModal(true)}><SearchIcon className="me-1" /> Register Query</button>
        <button className="vndrbtn bg-primary border-primary" onClick={() => setShowDetailsModal(true)}><ListAltIcon className="me-1" /> Register Details</button>
        <button className="vndrbtn bg-success border-success" onClick={handleExportExcel}><DownloadIcon className="me-1" /> Export To Excel</button>
      </div>
    </div>
  </div>

                  {/* Filter Section */}
                  <div className="centerMain mt-4">
                    <form>
                      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1.5, alignItems: 'flex-end', mb: 4, width: '100%' }}>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
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

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
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

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Bill Type</Typography>
                          <TextField
                            select
                            size="small"
                            defaultValue="ALL"
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%', display: 'flex', alignItems: 'center' } }}
                          >
                            <MenuItem value="ALL" sx={{ fontSize: '0.75rem' }}>ALL</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Type</Typography>
                          <TextField
                            select
                            size="small"
                            defaultValue="ALL"
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%', display: 'flex', alignItems: 'center' } }}
                          >
                            <MenuItem value="ALL" sx={{ fontSize: '0.75rem' }}>ALL</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Item Type</Typography>
                          <TextField
                            select
                            size="small"
                            defaultValue="ALL"
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%', display: 'flex', alignItems: 'center' } }}
                          >
                            <MenuItem value="ALL" sx={{ fontSize: '0.75rem' }}>ALL</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Item Group</Typography>
                          <TextField
                            select
                            size="small"
                            defaultValue="ALL"
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%', display: 'flex', alignItems: 'center' } }}
                          >
                            <MenuItem value="ALL" sx={{ fontSize: '0.75rem' }}>ALL</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>GST</Typography>
                          <TextField
                            select
                            size="small"
                            defaultValue="ALL"
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%', display: 'flex', alignItems: 'center' } }}
                          >
                            <MenuItem value="ALL" sx={{ fontSize: '0.75rem' }}>ALL</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 0.5, mt: 'auto', flexShrink: 0, height: '32px' }}>
                          <Button type="button" onClick={handleSearch} disabled={loading} variant="contained" sx={{ height: '32px', minWidth: '70px', padding: '0 10px', borderRadius: '6px', textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', background: 'linear-gradient(to right, #6366f1, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)' } }}>
                            <SearchIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> {loading ? "..." : "Search"}
                          </Button>
                          <Button type="button" onClick={() => { setFromDate(""); setToDate(""); }} variant="outlined" sx={{ height: '32px', minWidth: '60px', padding: '0 10px', borderRadius: '6px', textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', color: '#64748b', borderColor: '#cbd5e1', '&:hover': { backgroundColor: '#f1f5f9', borderColor: '#94a3b8' } }}>
                            <FilterAltOffIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> Clear
                          </Button>
                        </Box>
                                            </Box>
                    </form>
                  </div>

  {/* Table Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px', overflow: 'hidden', width: '100%' }}>
    <div className="table-responsive" style={{ maxHeight: '600px' }}>
      <table className="table table-bordered table-hover mb-0" style={{ width: '100%', tableLayout: 'auto' }}>
        <thead className="table-light sticky-top">
          <tr>
            {["Sr", "Year", "Bill (P) No.", "Bill (P) Date", "Type", "Bill Type", "Challan No", "Challan Date", "PO No", "GRN No", "Code", "Supplier/Vendor Name", "Ass Amt.", "Total Amt.", "User", "Auth", "View", "Edit", "Del", "Doc"].map((head) => (
              <th key={head} style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', padding: '6px 8px', textAlign: 'center' }}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                <td style={{ color: '#64748b', fontWeight: 500, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{row.sr}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{row.year}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{row.billNo}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{row.billDate}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{row.type}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{row.billType}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{row.challanNo}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{row.challanDate}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{row.poNo}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{row.grnNo}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{row.code}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.supplier}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', fontWeight: 500, textAlign: 'right' }}>{row.assAmt}</td>
                <td style={{ color: '#0f172a', fontSize: '0.75rem', padding: '4px 8px', fontWeight: 600, textAlign: 'right' }}>{row.totalAmt}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{row.user}</td>
                <td style={{ textAlign: 'center', padding: '4px 8px' }}>
                  {index % 3 === 0 ? (
                    <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-1 d-inline-flex align-items-center"><CheckCircleIcon fontSize="small" /></span>
                  ) : (
                    <span className="badge bg-warning bg-opacity-10 text-warning rounded-pill px-2 py-1 d-inline-flex align-items-center"><WarningIcon fontSize="small" /></span>
                  )}
                </td>
                <td style={{ textAlign: 'center', padding: '4px 8px' }}>
                  <FaSearch className="text-primary cursor-pointer" onClick={() => handleViewPdf(row.pdfId, row.isJobwork)} />
                </td>
                <td style={{ textAlign: 'center', padding: '4px 8px' }}>
                  <EditIcon fontSize="small" className="text-success cursor-pointer" />
                </td>
                <td style={{ textAlign: 'center', padding: '4px 8px' }}>
                  <DeleteIcon fontSize="small" className="text-danger cursor-pointer" />
                </td>
                <td style={{ textAlign: 'center', padding: '4px 8px' }}>
                  <DescriptionIcon fontSize="small" className="text-primary cursor-pointer" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={20} className="text-center py-5 text-muted">
                No records found for the selected criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <div className="card-footer bg-light p-2 border-top d-flex justify-content-between align-items-center">
      <span className="small fw-bold text-muted">Total Record's: {data.length}</span>
      <span className="small fw-bold text-dark">Total Amt: 6,53,48,404.87</span>
    </div>
  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      {/* Query Modal */}
            <Dialog open={showQueryModal} onClose={() => setShowQueryModal(false)} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '16px', overflow: 'hidden' } }}>
        <DialogTitle sx={{ background: 'linear-gradient(to right, #2563eb, #4f46e5)', color: '#fff', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, m: 0 }}>Purchase Register Query</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControlLabel control={<Checkbox defaultChecked sx={{ color: '#fff', '&.Mui-checked': { color: '#fff' }, py: 0 }} />} label={<Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>With Company Header</Typography>} sx={{ m: 0 }} />
            <Button variant="contained" size="small" onClick={() => setShowMasterModal(true)} sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }, textTransform: 'none', borderRadius: '8px', boxShadow: 'none' }}>
              <i className="fa fa-database me-1"></i> Query Master
            </Button>
            <Button variant="contained" size="small" onClick={handleExportExcel} sx={{ bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' }, textTransform: 'none', borderRadius: '8px', boxShadow: 'none' }}>
              <FaFileExcel className="me-1" /> Export Report
            </Button>
            <IconButton onClick={() => setShowQueryModal(false)} sx={{ color: '#fff', p: 0.5 }}>
              <FaTimes />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <Box sx={{ display: 'flex', borderBottom: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
          <Button onClick={() => setActiveTab("Query")} sx={{ flex: 1, py: 1.5, borderRadius: 0, color: activeTab === "Query" ? '#2563eb' : '#64748b', fontWeight: activeTab === "Query" ? 700 : 500, borderBottom: activeTab === "Query" ? '2px solid #2563eb' : 'none', textTransform: 'none' }}>
            Query
          </Button>
          <Button onClick={() => setActiveTab("Result")} sx={{ flex: 1, py: 1.5, borderRadius: 0, color: activeTab === "Result" ? '#2563eb' : '#64748b', fontWeight: activeTab === "Result" ? 700 : 500, borderBottom: activeTab === "Result" ? '2px solid #2563eb' : 'none', textTransform: 'none' }}>
            Result
          </Button>
        </Box>

        <DialogContent sx={{ p: 3, bgcolor: '#f8fafc' }}>
          {activeTab === "Query" ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#fff', p: 2, borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <FormControlLabel value="billDate" control={<Radio name="dateType" defaultChecked size="small" sx={{ py: 0 }} />} label={<Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#475569' }}>Bill_Date</Typography>} sx={{ m: 0 }} />
                  <FormControlLabel value="challanDate" control={<Radio name="dateType" size="small" sx={{ py: 0 }} />} label={<Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#475569' }}>Challan_Date :</Typography>} sx={{ m: 0 }} />
                  <TextField type="date" size="small" defaultValue="2026-05-09" sx={{ width: '130px', '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.75rem' }}>To</Typography>
                  <TextField type="date" size="small" defaultValue="2026-05-09" sx={{ width: '130px', '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, bgcolor: '#fff', p: 2, borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ width: '100px', fontWeight: 600, color: '#475569', fontSize: '0.75rem' }}>Bill Type</Typography>
                    <TextField select size="small" defaultValue="ALL" sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }}><MenuItem value="ALL" sx={{ fontSize: '0.75rem' }}>ALL</MenuItem></TextField>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ width: '100px', fontWeight: 600, color: '#475569', fontSize: '0.75rem' }}>Type :</Typography>
                    <TextField select size="small" defaultValue="ALL" sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }}><MenuItem value="ALL" sx={{ fontSize: '0.75rem' }}>ALL</MenuItem></TextField>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ width: '100px', fontWeight: 600, color: '#475569', fontSize: '0.75rem' }}>Item Type :</Typography>
                    <TextField select size="small" defaultValue="ALL" sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }}><MenuItem value="ALL" sx={{ fontSize: '0.75rem' }}>ALL</MenuItem></TextField>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ width: '100px', fontWeight: 600, color: '#475569', fontSize: '0.75rem' }}>Item Group :</Typography>
                    <TextField select size="small" defaultValue="ALL" sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }}><MenuItem value="ALL" sx={{ fontSize: '0.75rem' }}>ALL</MenuItem></TextField>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ width: '100px', fontWeight: 600, color: '#475569', fontSize: '0.75rem' }}>GST :</Typography>
                    <TextField select size="small" defaultValue="ALL" sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }}><MenuItem value="ALL" sx={{ fontSize: '0.75rem' }}>ALL</MenuItem></TextField>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, bgcolor: '#fff', p: 2, borderRadius: '8px', border: '1px solid #e2e8f0', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FormControlLabel control={<Checkbox size="small" sx={{ py: 0 }} />} label={<Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', fontSize: '0.75rem', minWidth: '80px' }}>Cust Bill No :</Typography>} sx={{ m: 0 }} />
                    <TextField size="small" sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.75rem' }}>To</Typography>
                    <TextField size="small" sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FormControlLabel control={<Checkbox size="small" sx={{ py: 0 }} />} label={<Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', fontSize: '0.75rem', minWidth: '80px' }}>Supplier Name :</Typography>} sx={{ m: 0 }} />
                    <TextField size="small" sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FormControlLabel control={<Checkbox size="small" sx={{ py: 0 }} />} label={<Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', fontSize: '0.75rem', minWidth: '80px' }}>Item Name :</Typography>} sx={{ m: 0 }} />
                    <TextField size="small" sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
                    <FormControlLabel control={<Radio name="queryType" size="small" sx={{ py: 0 }} />} label={<Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', fontSize: '0.75rem', minWidth: '80px' }}>User Query</Typography>} sx={{ m: 0 }} />
                    <TextField select size="small" defaultValue="Select" sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '32px', fontSize: '0.75rem' } }}><MenuItem value="Select" sx={{ fontSize: '0.75rem' }}>Select</MenuItem></TextField>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Button variant="contained" sx={{ background: 'linear-gradient(to right, #2563eb, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)', borderRadius: '8px', px: 4, py: 1, textTransform: 'none', fontWeight: 600, fontSize: '0.85rem' }}>
                    <FaSearch className="me-2" /> Execute
                  </Button>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Box sx={{ height: '350px', bgcolor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flex: 1, p: 2 }}>
                {/* Results table or data would go here */}
              </Box>
              <Box sx={{ borderTop: '1px solid #e2e8f0', p: 1, bgcolor: '#f1f5f9', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#475569', fontSize: '0.75rem', ml: 1 }}>00</Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
      {/* Query Master Modal (Nested) */}
      {showMasterModal && (
        <div className="query-modal-overlay second-modal" style={{ zIndex: 1100 }}>
          <div className="query-modal-content shadow-lg animate-fade-in" style={{ maxWidth: '600px' }}>
            <div className="query-modal-header d-flex justify-content-between align-items-center p-2">
              <span className="modal-title fw-bold ms-2" style={{ color: '#007bff' }}>Sales Query Master</span>
              <button
                className="btn border-0 p-0 me-1"
                onClick={() => setShowMasterModal(false)}
                style={{ color: '#000', fontSize: '18px' }}
              >
                <FaTimes />
              </button>
            </div>

            <div className="query-modal-tabs d-flex">
              <button
                className={`tab-btn ${masterTab === "Query Master" ? "active" : ""}`}
                onClick={() => setMasterTab("Query Master")}
              >
                Query Master
              </button>
              <button
                className={`tab-btn ${masterTab === "Query Designer" ? "active" : ""}`}
                onClick={() => setMasterTab("Query Designer")}
              >
                Query Designer
              </button>
            </div>

            <div className="query-modal-body p-4" style={{ height: '400px' }}>
              {masterTab === "Query Master" ? (
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label className="fw-bold small">Report Name</label>
                  </div>
                  <div className="col">
                    <input type="text" className="form-control form-control-sm" />
                  </div>
                  <div className="col-auto">
                    <button className="btn btn-sm btn-light border d-flex align-items-center gap-1 px-3">
                      <FaCheck className="text-success" /> Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="query-designer-form">
                  <div className="row g-2 mb-3">
                    <div className="col-md-6 d-flex align-items-center gap-2">
                      <label className="small fw-bold text-nowrap" style={{ width: '100px' }}>Select Report</label>
                      <select className="form-select form-select-sm"><option>Select</option></select>
                    </div>
                    <div className="col-md-6 d-flex align-items-center gap-2">
                      <label className="small fw-bold text-nowrap" style={{ width: '100px' }}>Type :</label>
                      <select className="form-select form-select-sm"><option>Select</option></select>
                    </div>
                  </div>

                  <div className="row g-2">
                    {/* Left List */}
                    <div className="col-5">
                      <label className="small fw-bold mb-1">All Data- Column List :</label>
                      <select multiple className="form-select" style={{ height: '220px', fontSize: '11px' }}>
                        {/* Options would go here */}
                      </select>
                    </div>

                    {/* Middle Action Buttons */}
                    <div className="col-1 d-flex flex-column justify-content-center align-items-center gap-2">
                      <button className="btn btn-sm btn-light border px-1 w-100" style={{ fontSize: '11px' }}>{">"}</button>
                      <button className="btn btn-sm btn-light border px-1 w-100" style={{ fontSize: '11px' }}>{">>"}</button>
                    </div>

                    {/* Right List */}
                    <div className="col-4">
                      <label className="small fw-bold mb-1">Selectd Data- Column List</label>
                      <select multiple className="form-select" style={{ height: '220px', fontSize: '11px' }}>
                        {/* Selected Options would go here */}
                      </select>
                    </div>

                    {/* Far Right Navigation Buttons */}
                    <div className="col-2 d-flex flex-column justify-content-start gap-2 mt-4">
                      <button className="btn btn-sm btn-light border w-100 py-1" style={{ fontSize: '11px' }}>Up</button>
                      <button className="btn btn-sm btn-light border w-100 py-1" style={{ fontSize: '11px' }}>Down</button>
                      <button className="btn btn-sm btn-light border w-100 py-1 mt-auto" style={{ fontSize: '11px' }}>Remove</button>
                    </div>
                  </div>

                  <div className="text-center mt-3">
                    <button className="btn btn-sm btn-light border d-inline-flex align-items-center gap-1 px-4">
                      <FaCheck className="text-success" /> Update
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Details Modal (Bill Register Summary) */}
      {showDetailsModal && (
        <div className="query-modal-overlay">
          <div className="query-modal-content shadow-lg animate-fade-in">
            <div className="query-modal-header d-flex justify-content-between align-items-center p-2">
              <span className="modal-title fw-bold ms-2">Bill Register Summary</span>
              <div className="header-actions d-flex align-items-center gap-2">
                <button className="btn btn-sm btn-light border d-flex align-items-center gap-1 px-2 py-1" style={{ fontSize: '11px' }} onClick={handleExportExcel}>
                  <FaFileExcel className="text-success" /> Export to Excel
                </button>
                <button
                  className="btn border-0 p-0 ms-2"
                  onClick={() => setShowDetailsModal(false)}
                  style={{ color: '#000', fontSize: '18px' }}
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="query-modal-tabs d-flex">
              <button
                className={`tab-btn ${detailsTab === "Query" ? "active" : ""}`}
                onClick={() => setDetailsTab("Query")}
              >
                Query
              </button>
              <button
                className={`tab-btn ${detailsTab === "Result" ? "active" : ""}`}
                onClick={() => setDetailsTab("Result")}
              >
                Result
              </button>
            </div>

            <div className="query-modal-body p-3" style={{ height: '500px', overflowY: 'auto' }}>
              {detailsTab === "Query" ? (
                <div className="query-form row g-2">
                  <div className="col-12 mb-2">
                    <div className="row align-items-center">
                      <label className="col-2 small fw-bold">Group :</label>
                      <div className="col-3">
                        <select className="form-select form-select-sm"><option>ALL</option></select>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="row align-items-center mb-1">
                      <div className="col-3 d-flex align-items-center gap-1">
                        <input type="checkbox" id="postingDate" />
                        <label htmlFor="postingDate" className="small text-nowrap">Posting Date From :</label>
                      </div>
                      <div className="col-9 d-flex align-items-center gap-2">
                        <input type="text" className="form-control form-control-sm w-25" defaultValue="09/05/2026" />
                        <span className="small">To</span>
                        <input type="text" className="form-control form-control-sm w-25" defaultValue="09/05/2026" />
                      </div>
                    </div>

                    <div className="row align-items-center mb-1">
                      <div className="col-3 d-flex align-items-center gap-1">
                        <input type="checkbox" id="challanDateFrom" />
                        <label htmlFor="challanDateFrom" className="small text-nowrap">Challan Date From :</label>
                      </div>
                      <div className="col-9 d-flex align-items-center gap-2">
                        <input type="text" className="form-control form-control-sm w-25" defaultValue="09/05/2026" />
                        <span className="small">To</span>
                        <input type="text" className="form-control form-control-sm w-25" defaultValue="09/05/2026" />
                      </div>
                    </div>

                    <div className="row align-items-center mb-1">
                      <div className="col-3 d-flex align-items-center gap-1">
                        <input type="checkbox" id="detailsItemName" />
                        <label htmlFor="detailsItemName" className="small">Item Name :</label>
                      </div>
                      <div className="col-6">
                        <input type="text" className="form-control form-control-sm" />
                      </div>
                    </div>

                    <div className="row align-items-center mb-1">
                      <div className="col-3 d-flex align-items-center gap-1">
                        <input type="checkbox" id="detailsSuppName" />
                        <label htmlFor="detailsSuppName" className="small">Supp Name :</label>
                      </div>
                      <div className="col-6">
                        <input type="text" className="form-control form-control-sm" />
                      </div>
                    </div>

                    <div className="row align-items-center mb-1">
                      <div className="col-3 d-flex align-items-center gap-1">
                        <input type="checkbox" id="detailsChallanNo" />
                        <label htmlFor="detailsChallanNo" className="small">Challan No :</label>
                      </div>
                      <div className="col-6">
                        <input type="text" className="form-control form-control-sm" />
                      </div>
                    </div>

                    <div className="mt-4 ms-5">
                      <button className="btn btn-sm btn-light border d-inline-flex align-items-center gap-2 px-3">
                        <FaSearch className="text-primary" /> Execute-Report
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="result-tab-container d-flex flex-column h-100">
                  <div className="result-content-area flex-grow-1 bg-white border" style={{ minHeight: '350px' }}>
                  </div>
                  <div className="result-footer border mt-1 p-1 bg-light d-flex align-items-center">
                    <span className="fw-bold ms-2" style={{ fontSize: '12px' }}>00</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseRegister;
