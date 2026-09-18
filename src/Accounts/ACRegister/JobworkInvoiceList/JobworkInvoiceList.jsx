import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./JobworkInvoiceList.css";
import { FaFilePdf, FaFileExcel, FaSearch, FaCheck, FaTrashAlt, FaEye } from "react-icons/fa";
import { 
  Box, Typography, Paper, TextField, FormControl, Select, MenuItem, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, InputAdornment 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlined";
import * as XLSX from "xlsx";

const JobworkInvoiceList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const [jobworkInvoices, setJobworkInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  useEffect(() => {
    fetchJobworkInvoices();
  }, []);

  const fetchJobworkInvoices = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://sellerp-backend.onrender.com/Sales/gst-jobwork-invoice/");
      const resData = await res.json();
      if (Array.isArray(resData)) {
        setJobworkInvoices(resData);
      } else if (resData.data && Array.isArray(resData.data)) {
        setJobworkInvoices(resData.data);
      }
    } catch (error) {
      console.error("Error fetching job-work invoice data:", error);
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

  const calculateTotalQty = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((acc, item) => acc + (Number(item.invoice_qty_nos) || 0) + (Number(item.invoice_qty_kg) || 0), 0);
  };

  const totalAssessableValue = jobworkInvoices.reduce((acc, row) => acc + (Number(row.gst_details?.assessable_value) || 0), 0);
  const totalNetTotal = jobworkInvoices.reduce((acc, row) => acc + (Number(row.gst_details?.gr_total) || 0), 0);

  const handleViewPdf = (inv) => {
    const targetId = inv?.id || inv?.pk || inv?.invoice_id || inv?.invoice_no || "1";
    const viewPath =
      inv?.pdf_url ||
      inv?.pdf_link ||
      inv?.PDF_Link ||
      inv?.PDF_URL ||
      inv?.pdf ||
      inv?.PDF ||
      inv?.Pdf ||
      inv?.View ||
      inv?.view ||
      inv?.VIEW ||
      inv?.file ||
      inv?.File ||
      inv?.FILE ||
      inv?.file_url ||
      inv?.file_path ||
      inv?.document ||
      inv?.Document ||
      inv?.Upload_Doc ||
      inv?.upload_doc ||
      inv?.doc ||
      inv?.Doc ||
      inv?.invoice_pdf ||
      inv?.Invoice_Pdf ||
      inv?.invoice_doc ||
      inv?.TC_File ||
      inv?.Tc_File ||
      inv?.tc_file ||
      inv?.Certificate ||
      inv?.certificate ||
      inv?.Attachment ||
      inv?.attachment ||
      inv?.url ||
      inv?.link;

    if (viewPath && viewPath !== "null" && viewPath !== "undefined" && viewPath !== "") {
      let url = viewPath;
      if (viewPath.startsWith("http://") || viewPath.startsWith("https://")) {
        url = viewPath;
      } else if (viewPath.startsWith("/")) {
        url = `https://sellerp-backend.onrender.com${viewPath}`;
      } else {
        url = `https://sellerp-backend.onrender.com/${viewPath}`;
      }
      // Fix any legacy or incorrect path structures to use the correct API endpoint
      url = url.replace("/Sales/JobworkInvoice/pdf/", "/Sales/gst-jobwork-invoice-pdf/")
               .replace("/Sales/gst-jobwork-invoice/pdf/", "/Sales/gst-jobwork-invoice-pdf/");
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      // Use the exact Render API endpoint for GST Job-work invoice PDF generation
      window.open(`https://sellerp-backend.onrender.com/Sales/gst-jobwork-invoice-pdf/${targetId}/`, "_blank", "noopener,noreferrer");
    }
  };

  const handleExportExcel = () => {
    if (jobworkInvoices.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = jobworkInvoices.map((row, index) => {
      const totalQty = calculateTotalQty(row.items);
      const gst = row.gst_details || {};
      return {
        "SrNo.": index + 1,
        "Invoice No": row.invoice_no || "-",
        "Date": formatDate(row.invoice_date),
        "Customer Name": row.bill_to_cust || "-",
        "Total Qty": totalQty,
        "Assessable Value": Number(gst.assessable_value || 0).toFixed(2),
        "CGST": Number(gst.cgst_amt || 0).toFixed(2),
        "SGST": Number(gst.sgst_amt || 0).toFixed(2),
        "IGST": Number(gst.igst_amt || 0).toFixed(2),
        "TCS": Number(gst.tcs_amt || 0).toFixed(2),
        "Net Total": Number(gst.gr_total || 0).toFixed(2),
        "User": "prakash"
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jobwork Invoice List");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Jobwork_Invoice_List.xlsx");
  };

  const handleExportPdf = () => {
    if (jobworkInvoices.length === 0) {
      alert("No data to export to PDF");
      return;
    }
    const printWindow = window.open('', '_blank');
    const tableHtml = `
      <html>
        <head>
          <title>Job-Work Invoice List Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; color: #333; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12px; }
            th { background-color: #f8fafc; font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>Job-Work Invoice List</h2>
          <table>
            <thead>
              <tr>
                <th>SrNo.</th>
                <th>Invoice No</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Total Qty</th>
                <th>Assessable Value</th>
                <th>CGST</th>
                <th>SGST</th>
                <th>IGST</th>
                <th>TCS</th>
                <th>Net Total</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              ${jobworkInvoices.map((row, index) => {
                const totalQty = calculateTotalQty(row.items);
                const gst = row.gst_details || {};
                return `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${row.invoice_no || "-"}</td>
                    <td>${formatDate(row.invoice_date)}</td>
                    <td style="text-align: left;">${row.bill_to_cust || "-"}</td>
                    <td>${totalQty}</td>
                    <td>${Number(gst.assessable_value || 0).toFixed(2)}</td>
                    <td>${Number(gst.cgst_amt || 0).toFixed(2)}</td>
                    <td>${Number(gst.sgst_amt || 0).toFixed(2)}</td>
                    <td>${Number(gst.igst_amt || 0).toFixed(2)}</td>
                    <td>${Number(gst.tcs_amt || 0).toFixed(2)}</td>
                    <td style="font-weight: bold;">${Number(gst.gr_total || 0).toFixed(2)}</td>
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
    <div className="jobwork-invoice-list">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header Section */}
                  <div className="WorkOrderEntry-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          Job-Work Invoice List
                        </Typography>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end align-items-center gap-3 flex-wrap">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>Report :</Typography>
                          <FormControl size="small">
                            <Select defaultValue="Job-Work Sales Register" sx={{ height: '32px', borderRadius: '8px', fontSize: '13px', backgroundColor: '#fef9c3' }}>
                              <MenuItem value="Job-Work Sales Register">Job-Work Sales Register</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        
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
                        <div className="col-md-2">
                          <label className="form-label mb-1">Plant</label>
                          <select className="form-select form-select-sm" defaultValue="SHARP">
                            <option value="SHARP">SHARP</option>
                          </select>
                        </div>
                        <div className="col-md-2">
                          <label className="form-label mb-1">From Date</label>
                          <input type="date" className="form-control form-control-sm" defaultValue="2026-05-08" />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label mb-1">To Date</label>
                          <div className="d-flex gap-1">
                            <input type="date" className="form-control form-control-sm" defaultValue="2026-05-09" />
                            <button className="btn btn-sm btn-outline-secondary"><i className="fas fa-search"></i></button>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label mb-1">Customer Name</label>
                          <div className="d-flex gap-1">
                            <input type="text" className="form-control form-control-sm" placeholder="Name..." />
                            <button className="btn btn-sm btn-outline-secondary"><i className="fas fa-search"></i></button>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label mb-1">Invoice No</label>
                          <div className="d-flex gap-1">
                            <input type="text" className="form-control form-control-sm" placeholder="No" />
                            <button className="btn btn-sm btn-outline-secondary"><i className="fas fa-search"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '12px', border: '1px solid #e2e8f0', width: '100%', mb: 4, maxWidth: '100%' }}>
                    <Table size="small" sx={{ width: '100%', tableLayout: 'auto' }}>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                          {["SrNo.", "Invoice No", "Date", "Customer Name", "Total Qty", "Assessable Value", "CGST", "SGST", "IGST", "TCS", "Net Total", "User", "View"].map((head, index) => (
                            <TableCell key={index} sx={{ fontWeight: 700, color: '#334155', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.02em', py: 1.5, px: 1, borderBottom: '2px solid #cbd5e1', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: index >= 4 && index <= 10 ? 'right' : 'left', lineHeight: 1.25 }}>
                              {head}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={13} align="center" sx={{ py: 4 }}>
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : jobworkInvoices.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={13} align="center" sx={{ py: 5, color: '#64748b', fontWeight: 600 }}>No Data Found !!</TableCell>
                          </TableRow>
                        ) : (
                          jobworkInvoices.map((row, index) => {
                            const totalQty = calculateTotalQty(row.items);
                            const gst = row.gst_details || {};
                            return (
                              <TableRow key={row.id || index} sx={{ '&:hover': { backgroundColor: '#f8fafc' }, transition: 'background-color 0.2s ease' }}>
                                <TableCell sx={{ color: '#64748b', fontWeight: 500, fontSize: '10.5px', whiteSpace: 'normal', wordBreak: 'break-word', py: 1, px: 1 }}>{index + 1}</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#0f172a', fontSize: '10.5px', whiteSpace: 'normal', wordBreak: 'break-word', py: 1, px: 1 }}>{row.invoice_no || "-"}</TableCell>
                                <TableCell sx={{ color: '#64748b', fontSize: '10.5px', whiteSpace: 'normal', wordBreak: 'break-word', py: 1, px: 1 }}>{formatDate(row.invoice_date)}</TableCell>
                                <TableCell sx={{ color: '#334155', fontWeight: 500, fontSize: '10.5px', py: 1, px: 1, wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>{row.bill_to_cust || "-"}</TableCell>
                                <TableCell sx={{ color: '#64748b', fontSize: '10.5px', whiteSpace: 'normal', wordBreak: 'break-word', py: 1, px: 1, textAlign: 'right' }}>{totalQty}</TableCell>
                                <TableCell sx={{ color: '#64748b', fontSize: '10.5px', whiteSpace: 'normal', wordBreak: 'break-word', py: 1, px: 1, textAlign: 'right' }}>{Number(gst.assessable_value || 0).toFixed(2)}</TableCell>
                                <TableCell sx={{ color: '#64748b', fontSize: '10.5px', whiteSpace: 'normal', wordBreak: 'break-word', py: 1, px: 1, textAlign: 'right' }}>{Number(gst.cgst_amt || 0).toFixed(2)}</TableCell>
                                <TableCell sx={{ color: '#64748b', fontSize: '10.5px', whiteSpace: 'normal', wordBreak: 'break-word', py: 1, px: 1, textAlign: 'right' }}>{Number(gst.sgst_amt || 0).toFixed(2)}</TableCell>
                                <TableCell sx={{ color: '#64748b', fontSize: '10.5px', whiteSpace: 'normal', wordBreak: 'break-word', py: 1, px: 1, textAlign: 'right' }}>{Number(gst.igst_amt || 0).toFixed(2)}</TableCell>
                                <TableCell sx={{ color: '#64748b', fontSize: '10.5px', whiteSpace: 'normal', wordBreak: 'break-word', py: 1, px: 1, textAlign: 'right' }}>{Number(gst.tcs_amt || 0).toFixed(2)}</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#0f172a', fontSize: '10.5px', whiteSpace: 'normal', wordBreak: 'break-word', py: 1, px: 1, textAlign: 'right' }}>{Number(gst.gr_total || 0).toFixed(2)}</TableCell>
                                <TableCell sx={{ color: '#64748b', fontSize: '10.5px', whiteSpace: 'normal', wordBreak: 'break-word', py: 1, px: 1 }}>prakash</TableCell>
                                <TableCell align="center" sx={{ py: 1, px: 1, whiteSpace: 'normal', wordBreak: 'break-word' }}><FaEye size={18} color="#0d6efd" style={{ cursor: 'pointer' }} onClick={() => handleViewPdf(row)} title="View PDF" /></TableCell>
                              </TableRow>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                    
                    <Box sx={{ backgroundColor: '#f8fafc', p: 2, borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b' }}>Total Records : <Box component="span" sx={{ color: '#0f172a' }}>{jobworkInvoices.length}</Box></Typography>
                      <Button 
                        variant="contained" 
                        startIcon={<CheckCircleIcon />}
                        sx={{ 
                          borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                          background: 'linear-gradient(to right, #10b981, #059669)', color: 'white',
                          boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)', transition: 'all 0.2s ease',
                          '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)' } 
                        }}
                      >
                        Post To A/c
                      </Button>
                      <Box sx={{ display: 'flex', gap: 4 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b' }}>Assessable Value : <Box component="span" sx={{ color: '#0f172a', fontSize: '1.1em' }}>{totalAssessableValue.toFixed(2)}</Box></Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b' }}>Net Total : <Box component="span" sx={{ color: '#0f172a', fontSize: '1.1em' }}>{totalNetTotal.toFixed(2)}</Box></Typography>
                      </Box>
                    </Box>
                  </TableContainer>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobworkInvoiceList;