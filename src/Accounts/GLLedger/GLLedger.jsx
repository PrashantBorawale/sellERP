import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./GLLedger.css";
import { FaFileExcel, FaSearch, FaFilePdf } from "react-icons/fa";
import { 
  Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import * as XLSX from "xlsx";

const GLLedger = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("2026-05-08");
  const [toDate, setToDate] = useState("2026-05-09");
  const [glName, setGlName] = useState("");

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

  // Mock data for the ledger table
  const ledgerData = [
    { id: 1, date: "08/05/2026", particular: "Cash Sale", voucherType: "Sales", voucherNo: "S/001", debit: "1500.00", credit: "0.00", balance: "1500.00 Dr" },
    { id: 2, date: "09/05/2026", particular: "Rent Payment", voucherType: "Payment", voucherNo: "P/005", debit: "0.00", credit: "5000.00", balance: "3500.00 Cr" },
  ];

  const handleExportExcel = () => {
    if (ledgerData.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = ledgerData.map((row) => {
      return {
        "Date": row.date,
        "Particular": row.particular,
        "Voucher Type": row.voucherType,
        "Voucher No": row.voucherNo,
        "Debit": row.debit,
        "Credit": row.credit,
        "Balance": row.balance
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "GL Ledger");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "GL_Ledger.xlsx");
  };

  const handleExportPdf = () => {
    if (ledgerData.length === 0) {
      alert("No data to export to PDF");
      return;
    }
    const printWindow = window.open('', '_blank');
    const tableHtml = `
      <html>
        <head>
          <title>GL Ledger Summary Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; color: #333; margin-bottom: 5px; }
            p { text-align: center; color: #666; font-size: 14px; margin-top: 0; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f8fafc; font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>GL Ledger Summary Report</h2>
          <p>Period: ${fromDate} to ${toDate}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Particular</th>
                <th>Voucher Type</th>
                <th>Voucher No</th>
                <th style="text-align: right;">Debit</th>
                <th style="text-align: right;">Credit</th>
                <th style="text-align: right;">Balance</th>
              </tr>
            </thead>
            <tbody>
              ${ledgerData.map((row) => `
                <tr>
                  <td>${row.date || "-"}</td>
                  <td>${row.particular || "-"}</td>
                  <td>${row.voucherType || "-"}</td>
                  <td>${row.voucherNo || "-"}</td>
                  <td style="text-align: right; color: #ef4444;">${row.debit || "0.00"}</td>
                  <td style="text-align: right; color: #10b981;">${row.credit || "0.00"}</td>
                  <td style="text-align: right; font-weight: bold;">${row.balance || "-"}</td>
                </tr>
              `).join('')}
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
    <div className="gl-ledger-page">
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
          GL Ledger
        </Typography>
      </div>
      <div className="col-md-6 d-flex justify-content-end align-items-center gap-3 flex-wrap">
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
          Excel
        </Button>
      </div>
    </div>
  </div>

                  {/* Filter Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
    <div className="card-body">
      <div className="row g-3 align-items-end text-start">
        <div className="col-md-2">
          <label className="form-label mb-1">From Date</label>
          <input type="date" className="form-control form-control-sm" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div className="col-md-2">
          <label className="form-label mb-1">To Date</label>
          <input type="date" className="form-control form-control-sm" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label mb-1">GL Name</label>
          <input type="text" className="form-control form-control-sm" placeholder="Enter GL Name.." value={glName} onChange={(e) => setGlName(e.target.value)} />
        </div>
        <div className="col-md-5 d-flex gap-2 flex-wrap">
          <Button 
            variant="contained" 
            startIcon={<SearchIcon />}
            sx={{ 
              height: '34px', borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
              background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
              boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)', transition: 'all 0.2s ease',
              '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)', transform: 'translateY(-1px)' } 
            }}
          >
            Search
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
            Export To Excel
          </Button>
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
            Export To PDF (Summary)
          </Button>
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
            {["Date", "Particular", "Voucher Type", "Voucher No", "Debit", "Credit", "Balance"].map((head, index) => (
              <th key={index} style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', padding: '6px 8px', textAlign: ["Debit", "Credit", "Balance"].includes(head) ? "right" : "left" }}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ledgerData.length > 0 ? (
            ledgerData.map((row) => (
              <tr key={row.id}>
                <td style={{ color: '#64748b', fontWeight: 500, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.date}</td>
                <td style={{ color: '#334155', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.particular}</td>
                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.voucherType}</td>
                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.voucherNo}</td>
                <td style={{ color: '#ef4444', fontWeight: 500, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.debit}</td>
                <td style={{ color: '#10b981', fontWeight: 500, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.credit}</td>
                <td style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.balance}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-5 text-muted fw-bold">No data available for the selected range.</td>
            </tr>
          )}
        </tbody>
      </table>
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

export default GLLedger;