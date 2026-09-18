import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./TaxInvoiceList.css";
import { FaFilePdf, FaFileExcel, FaSearch, FaEye } from "react-icons/fa";
import { Typography, Button, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import * as XLSX from "xlsx";

const TaxInvoiceList = () => {
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

  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvoiceData();
  }, []);

  const fetchInvoiceData = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://sellerp-backend.onrender.com/Sales/invoice/");
      const resData = await res.json();
      if (Array.isArray(resData)) {
        setInvoiceList(resData);
      } else if (resData.data && Array.isArray(resData.data)) {
        setInvoiceList(resData.data);
      }
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateInvoiceTotal = (invoice) => {
    if (!invoice.items || !Array.isArray(invoice.items)) return 0;
    return invoice.items.reduce((acc, item) => acc + ((Number(item.inv_qty) || 0) * (Number(item.rate) || 0)), 0);
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

  const getYear = (invoiceNo) => {
    if (!invoiceNo) return "-";
    if (invoiceNo.length >= 4 && !isNaN(invoiceNo.substring(0, 4))) {
      return `${invoiceNo.substring(0, 2)}-${invoiceNo.substring(2, 4)}`;
    }
    return "-";
  };

  const handleViewPdf = (invoice) => {
    const viewPath = invoice?.View || invoice?.pdf || invoice?.file || invoice?.invoice_pdf;
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
    } else if (invoice?.id) {
      window.open(`https://sellerp-backend.onrender.com/Sales/invoice-pdf/${invoice.id}/`, "_blank", "noopener,noreferrer");
    } else {
      alert(`No PDF attached or generated for invoice: ${invoice?.invoice_no || "this invoice"}`);
    }
  };

  const handleExportExcel = () => {
    if (invoiceList.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = invoiceList.map((invoice, index) => ({
      "SrNo.": index + 1,
      "Year": getYear(invoice.invoice_no),
      "Invoice No": invoice.invoice_no || "-",
      "Invoice Date": formatDate(invoice.invoice_date),
      "Cust PO No": invoice.po_number || "-",
      "Type": invoice.invoice_type || "-",
      "Customer Name": invoice.party_name || "-",
      "TOTAL": calculateInvoiceTotal(invoice).toFixed(2),
      "User": "prakash"
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tax Invoice List");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Tax_Invoice_List.xlsx");
  };

  const handleExportPdf = () => {
    if (invoiceList.length === 0) {
      alert("No data to export to PDF");
      return;
    }
    const printWindow = window.open('', '_blank');
    const tableHtml = `
      <html>
        <head>
          <title>Tax Invoice List Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; color: #333; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12px; }
            th { background-color: #f8fafc; font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>Tax Invoice List ((GST) Sales Register)</h2>
          <table>
            <thead>
              <tr>
                <th>SrNo.</th>
                <th>Year</th>
                <th>Invoice No</th>
                <th>Invoice Date</th>
                <th>Cust PO No</th>
                <th>Type</th>
                <th>Customer Name</th>
                <th>TOTAL</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceList.map((invoice, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${getYear(invoice.invoice_no)}</td>
                  <td>${invoice.invoice_no || "-"}</td>
                  <td>${formatDate(invoice.invoice_date)}</td>
                  <td>${invoice.po_number || "-"}</td>
                  <td>${invoice.invoice_type || "-"}</td>
                  <td style="text-align: left;">${invoice.party_name || "-"}</td>
                  <td style="text-align: right; font-weight: bold;">${calculateInvoiceTotal(invoice).toFixed(2)}</td>
                  <td>prakash</td>
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
    <div className="tax-invoice-list">
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
                      <div className="col-md-3 d-flex justify-content-start align-items-center">
                        <h5 className="header-title mb-0">
                          Tax Invoice List
                        </h5>
                      </div>
                      <div className="col-md-9 d-flex justify-content-end align-items-center gap-2 flex-wrap">
                        <div className="d-flex align-items-center gap-2 me-3">
                          <label className="form-label mb-0 text-muted">(GST) Sales Register</label>
                          <select className="form-select form-select-sm" defaultValue="Format 1 (Invoice Wise)" style={{ width: '180px' }}>
                            <option value="Format 1 (Invoice Wise)">Format 1 (Invoice Wise)</option>
                          </select>
                        </div>
                        
                        <select className="form-select form-select-sm me-2" defaultValue="PDF" style={{ width: '80px' }}>
                          <option value="PDF">PDF</option>
                        </select>
                        
                        <button className="vndrbtn">
                          <i className="fas fa-search me-2"></i> Execute
                        </button>
                        
                        <div className="d-flex align-items-center gap-2 ms-2 ps-3 border-start">
                          <label className="form-label mb-0 text-muted">(Excise) Sales Register</label>
                          <button className="vndrbtn" onClick={handleExportPdf}>
                            <i className="fas fa-file-pdf me-2"></i> PDF
                          </button>
                          <button className="vndrbtn" onClick={handleExportExcel}>
                            <i className="fas fa-file-excel me-2"></i> EXCEL
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 align-items-end text-start">
                        <div className="col-md-2">
                          <label className="form-label mb-1">Invoice Type</label>
                          <select className="form-select form-select-sm" defaultValue="Domestic">
                            <option value="Domestic">Domestic</option>
                          </select>
                        </div>
                        <div className="col-md-2">
                          <label className="form-label mb-1">From Date</label>
                          <input type="date" className="form-control form-control-sm" defaultValue="2026-05-08" />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label mb-1">To Date</label>
                          <input type="date" className="form-control form-control-sm" defaultValue="2026-05-09" />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label mb-1">Customer Name</label>
                          <input type="text" className="form-control form-control-sm" placeholder="Customer Name..." />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label mb-1">Select Item</label>
                          <div className="d-flex gap-1">
                            <input type="text" className="form-control form-control-sm" placeholder="Item Name..." />
                            <button className="btn btn-sm btn-outline-secondary"><i className="fas fa-search"></i></button>
                          </div>
                        </div>
                        <div className="col-md-2">
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
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px', overflow: 'hidden', width: '100%' }}>
                    <div className="table-responsive" style={{ maxHeight: '600px' }}>
                      <table className="table table-bordered table-hover mb-0" style={{ width: '100%', tableLayout: 'auto' }}>
        <thead className="table-light sticky-top">
          <tr>
            {["SrNo.", "Year", "AP", "Invoice No", "Invoice Date", "Cust PO No", "Type", "Customer Name", "TOTAL", "Item Qty | Desc", "Cancel", "User", "View"].map((head, index) => (
              <th key={index} style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', padding: '6px 8px', textAlign: 'center' }}>
                {head === "AP" ? (
                  <div className="d-flex align-items-center justify-content-center gap-1">AP <input type="checkbox" className="form-check-input mt-0" /></div>
                ) : head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={13} className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          ) : invoiceList.length > 0 ? (
            invoiceList.map((invoice, index) => (
              <tr key={index}>
                <td style={{ color: '#64748b', fontWeight: 500, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{getYear(invoice.invoice_no)}</td>
                <td style={{ textAlign: 'center', padding: '4px 8px' }}><input type="checkbox" className="form-check-input" /></td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{invoice.invoice_no || "-"}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{formatDate(invoice.invoice_date)}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{invoice.po_number || "-"}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{invoice.invoice_type || "-"}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{invoice.party_name || "-"}</td>
                <td style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{calculateInvoiceTotal(invoice).toFixed(2)}</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>
                  <button className="btn btn-sm btn-outline-primary" style={{ padding: '0px 6px', fontSize: '0.7rem' }}>Item Details</button>
                </td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>-</td>
                <td style={{ color: '#475569', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>prakash</td>
                <td style={{ textAlign: 'center', padding: '4px 8px' }}>
                  <FaEye 
                    className="text-primary" 
                    style={{ cursor: 'pointer', fontSize: '16px' }} 
                    onClick={() => handleViewPdf(invoice)} 
                    title="View PDF" 
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={13} className="text-center py-5 text-muted">
                No invoices found.
              </td>
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

export default TaxInvoiceList;
