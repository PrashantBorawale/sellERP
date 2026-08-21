import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./HSNSACSummary.css";
import { Typography, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import * as XLSX from "xlsx";

const HSNSACSummary = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState("2026-05-08");
  const [toDate, setToDate] = useState("2026-05-09");
  const [type, setType] = useState("Sales");
  const [hsnData, setHsnData] = useState([]);
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

  useEffect(() => {
    fetchHsnData();
  }, []);

  const fetchHsnData = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://sellerp-backend.onrender.com/Account/hsn-summary/");
      const resData = await res.json();
      if (Array.isArray(resData)) {
        setHsnData(resData);
      } else if (resData.data && Array.isArray(resData.data)) {
        setHsnData(resData.data);
      }
    } catch (error) {
      console.error("Error fetching HSN summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatNum = (num) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(num || 0);

  const totals = hsnData.reduce((acc, curr) => ({
    qty: acc.qty + (Number(curr.total_qty) || 0),
    amt: acc.amt + (Number(curr.total_amt) || 0),
    taxable: acc.taxable + (Number(curr.taxable_value) || 0),
    igst: acc.igst + (Number(curr.igst_amt) || 0),
    cgst: acc.cgst + (Number(curr.cgst_amt) || 0),
    sgst: acc.sgst + (Number(curr.sgst_amt) || 0),
    totalGst: acc.totalGst + (Number(curr.total_gst_amt) || 0)
  }), { qty: 0, amt: 0, taxable: 0, igst: 0, cgst: 0, sgst: 0, totalGst: 0 });

  const handleExportExcel = () => {
    if (hsnData.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = hsnData.map((row, index) => {
      return {
        "Sr.": index + 1,
        "HSN/SAC": row.hsn_sac,
        "Description": row.description,
        "Type Of Supply": row.type_of_supply || "GST Sales",
        "Group": row.group || "FG",
        "UOM": row.uom || "NOS",
        "Total Qty": row.total_qty,
        "Total Amt": row.total_amt,
        "GST %": row.gst_percent || 0,
        "Taxable_Value": row.taxable_value,
        "IGST Amt": row.igst_amt,
        "CGST Amt": row.cgst_amt,
        "SGST Amt": row.sgst_amt,
        "CESS": row.cess,
        "TCS Amt": row.tcs_amt,
        "Total GST Amt": row.total_gst_amt
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "HSN Wise Summary");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "HSN_Wise_Summary.xlsx");
  };

  return (
    <div className="hsn-summary">
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
                          HSN Wise Summary
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
          <label className="form-label mb-1">Type</label>
          <select className="form-select form-select-sm" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Sales">Sales</option>
          </select>
        </div>
                        <div className="col-md-4 d-flex gap-2 flex-wrap">
                          <Button 
                            variant="contained" 
                            startIcon={<SearchIcon />}
                            onClick={fetchHsnData}
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
                            Export To Excel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="card shadow-sm border-0 mb-4 erp-table-container" style={{ borderRadius: '12px', width: '100%', overflow: 'hidden', display: 'block' }}>
                    <div className="table-responsive erp-table-wrapper" style={{ overflowX: 'auto', width: '100%', display: 'block', maxWidth: '100%' }}>
                      <table className="table table-bordered table-hover mb-0" style={{ width: '100%' }}>
                        <thead className="table-light sticky-top" style={{ zIndex: 10 }}>
                          <tr>
                            {["Sr.", "HSN/SAC", "Description", "Type Of Supply", "Group", "UOM", "Total Qty", "Total Amt", "GST %", "Taxable_Value", "IGST Amt", "CGST Amt", "SGST Amt", "CESS", "TCS Amt", "Total GST Amt"].map((head, index) => (
                              <th key={index} style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', padding: '6px 8px', textAlign: (head.includes("Amt") || head.includes("Value") || head.includes("Qty") || head === "CESS") ? "right" : "left" }}>
                                {head}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan={16} className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              </td>
                            </tr>
                          ) : hsnData.length === 0 ? (
                            <tr>
                              <td colSpan={16} className="text-center py-5 text-muted fw-bold">No Records Found</td>
                            </tr>
                          ) : (
                            hsnData.map((row, index) => (
                              <tr key={index}>
                                <td style={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{index + 1}</td>
                                <td style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.hsn_sac}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left', minWidth: '150px' }}>{row.description}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.type_of_supply || "GST Sales"}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.group || "FG"}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.uom || "NOS"}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{row.total_qty}</td>
                                <td style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{formatNum(row.total_amt)}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}>{row.gst_percent || 0}</td>
                                <td style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{formatNum(row.taxable_value)}</td>
                                <td style={{ color: '#10b981', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{formatNum(row.igst_amt)}</td>
                                <td style={{ color: '#10b981', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{formatNum(row.cgst_amt)}</td>
                                <td style={{ color: '#10b981', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{formatNum(row.sgst_amt)}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{formatNum(row.cess)}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{formatNum(row.tcs_amt)}</td>
                                <td style={{ color: '#10b981', fontWeight: 700, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'right' }}>{formatNum(row.total_gst_amt)}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                        {hsnData.length > 0 && (
                          <tfoot style={{ position: 'sticky', bottom: 0, zIndex: 10 }}>
                            <tr style={{ backgroundColor: '#f1f5f9' }}>
                              <td colSpan={6} style={{ fontWeight: 700, color: '#0f172a', padding: '8px', fontSize: '0.75rem', textAlign: 'right', borderTop: '2px solid #e2e8f0' }}>Total Amt :</td>
                              <td style={{ fontWeight: 700, color: '#0f172a', padding: '8px', fontSize: '0.75rem', textAlign: 'right', borderTop: '2px solid #e2e8f0' }}>{totals.qty}</td>
                              <td style={{ fontWeight: 700, color: '#0f172a', padding: '8px', fontSize: '0.75rem', textAlign: 'right', borderTop: '2px solid #e2e8f0' }}>{formatNum(totals.amt)}</td>
                              <td style={{ fontWeight: 700, color: '#0f172a', padding: '8px', fontSize: '0.75rem', textAlign: 'left', borderTop: '2px solid #e2e8f0' }}></td>
                              <td style={{ fontWeight: 700, color: '#ef4444', padding: '8px', fontSize: '0.75rem', textAlign: 'right', borderTop: '2px solid #e2e8f0' }}>{formatNum(totals.taxable)}</td>
                              <td style={{ fontWeight: 700, color: '#10b981', padding: '8px', fontSize: '0.75rem', textAlign: 'right', borderTop: '2px solid #e2e8f0' }}>{formatNum(totals.igst)}</td>
                              <td style={{ fontWeight: 700, color: '#10b981', padding: '8px', fontSize: '0.75rem', textAlign: 'right', borderTop: '2px solid #e2e8f0' }}>{formatNum(totals.cgst)}</td>
                              <td style={{ fontWeight: 700, color: '#10b981', padding: '8px', fontSize: '0.75rem', textAlign: 'right', borderTop: '2px solid #e2e8f0' }}>{formatNum(totals.sgst)}</td>
                              <td style={{ fontWeight: 700, color: '#0f172a', padding: '8px', fontSize: '0.75rem', textAlign: 'right', borderTop: '2px solid #e2e8f0' }}>0</td>
                              <td style={{ fontWeight: 700, color: '#0f172a', padding: '8px', fontSize: '0.75rem', textAlign: 'right', borderTop: '2px solid #e2e8f0' }}>0</td>
                              <td style={{ fontWeight: 700, color: '#10b981', padding: '8px', fontSize: '0.75rem', textAlign: 'right', borderTop: '2px solid #e2e8f0' }}>{formatNum(totals.totalGst)}</td>
                            </tr>
                          </tfoot>
                        )}
                      </table>
                    </div>
                    <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b' }}>Total Records : <Box component="span" sx={{ color: '#0f172a', ml: 1 }}>{hsnData.length}</Box></Typography>
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

export default HSNSACSummary;
