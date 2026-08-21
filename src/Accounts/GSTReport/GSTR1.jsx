import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./GSTR1.css";
import { FaSearch, FaFileExcel } from "react-icons/fa";
import { 
  Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, Select, MenuItem 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import * as XLSX from "xlsx";

const GSTR1 = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`https://sellerp-backend.onrender.com/Account/invoice/date-filter/`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          from_date: fromDate,
          to_date: toDate,
        },
      });

      console.log("GSTR-1 API Response:", response.data);
      
      const rawData = Array.isArray(response.data) ? response.data : 
                      (response.data?.data ? response.data.data : []);

      if (Array.isArray(rawData) && rawData.length > 0) {
        const flattenedData = rawData.flatMap((invoice) => {
          const gst = invoice.GSTdetails?.[0] || {};
          return (Array.isArray(invoice.items) ? invoice.items : []).map((item) => ({
            custName: item.customer || invoice.bill_to || "",
            gstin: "", // GSTIN not directly provided in this API endpoint
            stateCode: invoice.place_of_supply || "",
            pos: invoice.place_of_supply || "",
            invoiceNo: invoice.invoice_no || "",
            invoiceDate: invoice.invoice_Date || invoice.date || "",
            invoiceValue: gst.grand_total || "0",
            hsn: item.hsn_code || "",
            description: item.description || "",
            taxableValue: gst.assessble_value || item.assessable_value || "0",
            qty: item.inv_qty || item.qty || "0",
            unitCode: "NOS",
            cgstPer: gst.cgst || item.cgst || "0",
            cgstAmt: gst.cgst_amt || item.cgst_amt || "0",
            sgstPer: gst.sgst || item.sgst || "0",
            sgstAmt: gst.sgst_amt || item.sgst_amt || "0",
            igstPer: gst.igst || item.igst || "0",
            igstAmt: gst.igst_amt || item.igst_amt || "0",
            cess: "0",
            cessAmt: "0",
            tcsPer: "0",
            tcsAmt: "0",
            transport: gst.transport_crg || "0",
            freight: gst.freight_crg || "0",
            other: gst.other_crg || "0",
            pack: gst.pack_fwrd || "0",
            cancel: "N",
          }));
        });
        setReportData(flattenedData);
      } else {
        setReportData([]);
      }
    } catch (error) {
      console.error("Error fetching GSTR-1 report:", error);
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (reportData.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = reportData.map((row) => {
      return {
        "CustName": row.custName,
        "GSTIN": row.gstin,
        "StateCode": row.stateCode,
        "POS": row.pos,
        "Invoice_No": row.invoiceNo,
        "Invoice_Date": row.invoiceDate,
        "Invoice_Value": row.invoiceValue,
        "HSN/SAC": row.hsn,
        "Goods/Service description": row.description,
        "Taxable_Value": row.taxableValue,
        "Qty": row.qty,
        "UnitCode": row.unitCode,
        "CGST_Per": row.cgstPer,
        "CGSTAmt": row.cgstAmt,
        "SGST_Per": row.sgstPer,
        "SGSTAmt": row.sgstAmt,
        "IGS_Per": row.igstPer,
        "IGSTAmt": row.igstAmt,
        "Cess": row.cess,
        "CessAmt": row.cessAmt,
        "TcsPer": row.tcsPer,
        "TcsAmt": row.tcsAmt,
        "TransportCharges": row.transport,
        "FreightCharges": row.freight,
        "OtherInstallCharges": row.other,
        "PackCharges": row.pack,
        "Cancel": row.cancel
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "GSTR-1");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "GSTR_1_Report.xlsx");
  };

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

  return (
    <div className="gstr-1">
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
                      <div className="col-md-12 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          GSTR - 1
                        </Typography>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
      <div className="row g-3 align-items-end text-start">
        <div className="col-md-2">
          <label className="form-label mb-1">From</label>
          <input type="date" className="form-control form-control-sm" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div className="col-md-2">
          <label className="form-label mb-1">To</label>
          <input type="date" className="form-control form-control-sm" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <div className="col-md-2">
          <label className="form-label mb-1">Sales Type</label>
          <select className="form-select form-select-sm" defaultValue="GST_Invoice">
            <option value="GST_Invoice">GST_Invoice</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label mb-1">Type</label>
          <select className="form-select form-select-sm" defaultValue="Invoice_Wise">
            <option value="Invoice_Wise">Invoice_Wise</option>
          </select>
        </div>
                        <div className="col-md-4 d-flex gap-2 flex-wrap">
                          <Button 
                            variant="contained" 
                            startIcon={<SearchIcon />}
                            onClick={handleSearch}
                            disabled={loading}
                            sx={{ 
                              height: '34px', borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                              background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
                              boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)', transition: 'all 0.2s ease',
                              '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)', transform: 'translateY(-1px)' } 
                            }}
                          >
                            {loading ? "Searching..." : "Search"}
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
                            Export Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px', width: '100%', overflow: 'hidden' }}>
                    <div className="table-responsive" style={{ maxHeight: 'calc(100vh - 320px)', width: '100%', overflowY: 'auto', overflowX: 'auto' }}>
                      <table className="table table-bordered table-hover mb-0" style={{ whiteSpace: 'nowrap', minWidth: '2000px' }}>
                        <thead className="table-light sticky-top">
                          <tr>
                            {[
                              "CustName", "GSTIN", "StateCode", "POS", "Invoice_No", "Invoice_Date", "Invoice_Value",
                              "HSN/SAC", "Goods/Service description", "Taxable_Value", "Qty", "UnitCode",
                              "CGST_Per", "CGSTAmt", "SGST_Per", "SGSTAmt", "IGS_Per", "IGSTAmt",
                              "Cess", "CessAmt", "TcsPer", "TcsAmt", "TransportCharges", "FreightCharges",
                              "OtherInstallCharges", "PackCharges", "Cancel"
                            ].map((head, index) => (
                              <th key={index} style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', padding: '6px 8px', textAlign: (head.includes("Amt") || head.includes("Value") || head.includes("Per") || head.includes("Qty") || head.includes("Charges") || head === "Cess") ? "right" : "left" }}>
                                {head}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan={27} className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              </td>
                            </tr>
                          ) : Array.isArray(reportData) && reportData.length > 0 ? (
                            reportData.map((row, index) => (
                              <tr key={index}>
                                <td style={{ color: '#334155', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.custName}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.gstin}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.stateCode}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.pos}</td>
                                <td style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.invoiceNo}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.invoiceDate}</td>
                                <td style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.invoiceValue}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.hsn}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left', minWidth: '150px' }}>{row.description}</td>
                                <td style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.taxableValue}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.qty}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.unitCode}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.cgstPer}</td>
                                <td style={{ color: '#10b981', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.cgstAmt}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.sgstPer}</td>
                                <td style={{ color: '#10b981', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.sgstAmt}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.igstPer}</td>
                                <td style={{ color: '#10b981', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.igstAmt}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.cess}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.cessAmt}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.tcsPer}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.tcsAmt}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.transport}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.freight}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.other}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.pack}</td>
                                <td style={{ textAlign: 'center', padding: '4px 8px' }}>
                                  <Box sx={{ bgcolor: row.cancel === 'Y' ? '#fee2e2' : '#dcfce7', color: row.cancel === 'Y' ? '#ef4444' : '#10b981', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: 700, fontSize: '0.7rem', margin: 'auto' }}>
                                    {row.cancel}
                                  </Box>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={27} className="text-center py-5 text-muted fw-bold">No Data Found !!</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b' }}>Total Records : <Box component="span" sx={{ color: '#0f172a', ml: 1 }}>{reportData.length}</Box></Typography>
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

export default GSTR1;
