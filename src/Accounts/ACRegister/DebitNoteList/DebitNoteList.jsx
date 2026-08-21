import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./DebitNoteList.css";
import { FaFilePdf, FaFileExcel, FaSearch, FaCheck, FaEye } from "react-icons/fa";
import { 
  Box, Typography, Paper, TextField, FormControl, Select, MenuItem, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, InputAdornment, Checkbox 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlined";
import * as XLSX from "xlsx";

const DebitNoteList = () => {
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

  const [debitNotes, setDebitNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDebitNotes();
  }, []);

  const fetchDebitNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://sellerp-backend.onrender.com/Sales/debitnote/");
      const resData = await res.json();
      if (Array.isArray(resData)) {
        setDebitNotes(resData);
      } else if (resData.data && Array.isArray(resData.data)) {
        setDebitNotes(resData.data);
      }
    } catch (error) {
      console.error("Error fetching debit note data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getTaxAmount = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((acc, item) => 
      acc + (Number(item.cgst) || 0) + (Number(item.sgst) || 0) + (Number(item.igst) || 0) + (Number(item.utgst) || 0), 0
    );
  };

  const getGrandTotal = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((acc, item) => acc + (Number(item.grand_total) || 0), 0);
  };

  const totalAssessableValue = debitNotes.reduce((acc, row) => {
    const items = row.items || [];
    return acc + items.reduce((itemAcc, item) => itemAcc + (Number(item.amount) || 0), 0);
  }, 0);

  const handleExportExcel = () => {
    if (debitNotes.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = debitNotes.map((row, index) => {
      const taxAmount = getTaxAmount(row.items);
      const grandTotal = getGrandTotal(row.items);
      return {
        "Sr. No.": index + 1,
        "Type": row.notetype || "Purchase DN",
        "Cert. No": row.debit_note_no || "-",
        "Date": formatDate(row.debit_note_date),
        "Name of Party": row.party_name || "-",
        "Tax Amount": taxAmount.toFixed(2),
        "Amount": grandTotal.toFixed(2),
        "User": "prakash"
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Debit Note List");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Debit_Note_List.xlsx");
  };

  const handleViewPdf = (row) => {
    const viewPath = row?.View || row?.pdf || row?.file || row?.debit_note_pdf;
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
    } else if (row?.id) {
      window.open(`https://sellerp-backend.onrender.com/Sales/debit-note-pdf/${row.id}/`, "_blank", "noopener,noreferrer");
    } else {
      alert(`No PDF attached or generated for debit note: ${row?.debit_note_no || "this record"}`);
    }
  };

  const handleExportPdf = () => {
    if (debitNotes.length === 0) {
      alert("No data to export to PDF");
      return;
    }
    const printWindow = window.open('', '_blank');
    const tableHtml = `
      <html>
        <head>
          <title>Debit Note List Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; color: #333; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12px; }
            th { background-color: #f8fafc; font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>Debit Note List</h2>
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Type</th>
                <th>Cert. No</th>
                <th>Date</th>
                <th>Name of Party</th>
                <th>Tax Amount</th>
                <th>Amount</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              ${debitNotes.map((row, index) => {
                const taxAmount = getTaxAmount(row.items);
                const grandTotal = getGrandTotal(row.items);
                return `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${row.notetype || "Purchase DN"}</td>
                    <td>${row.debit_note_no || "-"}</td>
                    <td>${formatDate(row.debit_note_date)}</td>
                    <td style="text-align: left;">${row.party_name || "-"}</td>
                    <td style="text-align: right;">${taxAmount.toFixed(2)}</td>
                    <td style="text-align: right; font-weight: bold;">${grandTotal.toFixed(2)}</td>
                    <td>prakash</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(tableHtml);
    printWindow.document.close();
  };

  return (
    <div className="debit-note-list">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header Section */}
                  <div className="erp-header mb-4 text-start">
    <div className="row align-items-center">
      <div className="col-md-6 d-flex justify-content-start align-items-center">
        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
          Debit Note List
        </Typography>
      </div>
      <div className="col-md-6 d-flex justify-content-end align-items-center gap-3 flex-wrap">
        <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>Debit Note Register</Typography>
        
        <Button 
          variant="contained" 
          startIcon={<DescriptionIcon />}
          onClick={handleExportPdf}
          sx={{ 
            height: '34px', borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
            background: 'linear-gradient(to right, #ef4444, #dc2626)', color: 'white',
            boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.39)', transition: 'all 0.2s ease',
            '&:hover': { background: 'linear-gradient(to right, #dc2626, #b91c1c)', transform: 'translateY(-1px)' } 
          }}
        >
          PDF
        </Button>
        <Button 
          variant="contained" 
          startIcon={<DownloadIcon />}
          onClick={handleExportExcel}
          sx={{ 
            height: '34px', borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
            background: 'linear-gradient(to right, #10b981, #059669)', color: 'white',
            boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)', transition: 'all 0.2s ease',
            '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)' } 
          }}
        >
          EXCEL
        </Button>
      </div>
    </div>
  </div>

                  {/* Filter Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 align-items-end text-start">
                        <div className="col-md-3">
                          <div className="d-flex align-items-center gap-1 mb-1">
                            <input type="checkbox" className="form-check-input mt-0" defaultChecked />
                            <label className="form-label mb-0">From Date</label>
                          </div>
                          <input type="date" className="form-control form-control-sm" defaultValue="2026-04-08" />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label mb-1">To Date</label>
                          <input type="date" className="form-control form-control-sm" defaultValue="2026-05-09" />
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-1 mb-1">
                            <input type="checkbox" className="form-check-input mt-0" />
                            <label className="form-label mb-0">Party Name</label>
                          </div>
                          <div className="d-flex gap-1">
                            <input type="text" className="form-control form-control-sm" placeholder="Party Name..." />
                            <button className="btn btn-sm btn-outline-secondary"><i className="fas fa-search"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

  {/* Table Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px', overflow: 'hidden', width: '100%' }}>
    <div className="table-responsive" style={{ maxHeight: '600px' }}>
      <table className="table table-bordered table-hover mb-0" style={{ width: '100%', tableLayout: 'auto' }}>
        <thead className="table-light sticky-top">
          <tr>
            {["Sr. No.", "Type", "AP", "Cert. No", "Date", "Name of Party", "Tax Amount", "Amount", "User", "View"].map((head, index) => (
              <th key={index} style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', padding: '6px 8px', textAlign: head.includes("Amount") ? "right" : "center" }}>
                {head === "AP" ? (
                  <div className="d-flex align-items-center justify-content-center gap-1">AP <input type="checkbox" className="form-check-input mt-0" defaultChecked /></div>
                ) : head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={10} className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          ) : debitNotes.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center py-5 text-muted fw-bold">No Records Found</td>
            </tr>
          ) : (
            debitNotes.map((row, index) => {
              const taxAmount = getTaxAmount(row.items);
              const grandTotal = getGrandTotal(row.items);
              return (
                <tr key={row.id || index}>
                  <td style={{ color: '#64748b', fontWeight: 500, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ padding: '4px 8px', textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', fontSize: '0.75rem', fontWeight: 600 }}>{row.notetype || "Purchase DN"}</div>
                  </td>
                  <td style={{ textAlign: 'center', padding: '4px 8px' }}><input type="checkbox" className="form-check-input" /></td>
                  <td style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{row.debit_note_no || "-"}</td>
                  <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{formatDate(row.debit_note_date)}</td>
                  <td style={{ color: '#334155', fontWeight: 500, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.party_name || "-"}</td>
                  <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{taxAmount.toFixed(2)}</td>
                  <td style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{grandTotal.toFixed(2)}</td>
                  <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>prakash</td>
                  <td style={{ textAlign: 'center', padding: '4px 8px' }}>
                    <IconButton size="small" onClick={() => handleViewPdf(row)} sx={{ bgcolor: '#eff6ff', color: '#3b82f6', borderRadius: '8px', '&:hover': { bgcolor: '#dbeafe', transform: 'scale(1.05)' }, transition: 'all 0.2s' }}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
    <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
      <Button 
        variant="contained" 
        startIcon={<CheckCircleIcon />}
        sx={{ 
          height: '28px', borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
          background: 'linear-gradient(to right, #10b981, #059669)', color: 'white',
          boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)', transition: 'all 0.2s ease',
          '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)' } 
        }}
      >
        Post To A/c
      </Button>
      <div className="d-flex gap-4">
        <span className="small fw-bold text-muted">Total Records : <span className="text-dark fs-6">{debitNotes.length}</span></span>
        <span className="small fw-bold text-muted">Assessable Value : <span className="text-dark fs-6">{totalAssessableValue.toFixed(2)}</span></span>
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

export default DebitNoteList;