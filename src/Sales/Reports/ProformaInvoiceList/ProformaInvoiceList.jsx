import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./ProformaInvoiceList.css";
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";

const ProformaInvoiceList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://sellerp-backend.onrender.com/Sales/profoma-invoice/");
      const list = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setInvoices(list);
    } catch (error) {
      console.error("Error fetching proforma invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

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

  const handleExportExcel = () => {
    if (invoices.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = invoices.map((inv, index) => {
      const [custName, custCode] = (inv.customer || "").split(" | ");
      const invDate = inv.order_date || "";
      const year = invDate ? invDate.split("-")[0] : "";
      return {
        "Sr.": index + 1,
        "Year": year,
        "Series": inv.series || "",
        "Type": inv.type || "",
        "Invoice No": inv.invoice_no || "",
        "Inv. Date": invDate,
        "Cust PO No": inv.items?.[0]?.po_no || inv.select_so || "",
        "Cust Code": custCode || "",
        "Customer Name": custName || inv.customer || "",
        "Total": inv.grand_total || ""
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Proforma Invoice List");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Proforma_Invoice_List.xlsx");
  };

  return (
    <div className="erp-page">
    <div className="container-fluid p-0">
      <div className="row g-0">
        <div className="col-md-12">
          <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
    <div className="container-fluid py-3 overflow-hidden">
                  {/* ===== HEADER ===== */}
                  <div className="erp-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6 text-start">
                        <h5 className="header-title mb-0" style={{ fontSize: "22px", fontWeight: "700", color: "blue" }}>Proforma Invoice List</h5>
                      </div>
                      <div className="col-md-6 text-end d-flex justify-content-md-end gap-2 mt-3 mt-md-0 flex-wrap">
                        <button type="button" className="vndrbtn fw-bold border-0 d-flex align-items-center" onClick={handleExportExcel} style={{ color: "green", height: '34px' }}>
                          EXPORT EXCEL
                        </button>
                        <button type="button" className="vndrbtn fw-bold text-primary border-0 d-flex align-items-center" style={{ height: '34px' }}>
                          <span className="me-1">🌐</span> Proforma Invoice Query
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ===== FILTERS ===== */}
                  
                  <div className="p-3 bg-light border mb-3 rounded shadow-sm">
                    <div className="d-flex flex-wrap align-items-end gap-3 text-start">
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>From Date :</label>
                        <input type="date" className="form-control form-control-sm" defaultValue="2026-04-01" />
                      </div>
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>To Date :</label>
                        <input type="date" className="form-control form-control-sm" defaultValue="2026-05-29" />
                      </div>
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Series :</label>
                        <select className="form-control form-control-sm">
                          <option>ALL</option>
                        </select>
                      </div>
                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <input type="checkbox" id="chkCustName" className="me-1" style={{width: '16px', height: '16px', cursor: 'pointer'}} />
                          <label htmlFor="chkCustName" className="mb-0 fw-bold" style={{fontSize: '13px', cursor: 'pointer'}}>Customer Name :</label>
                        </div>
                        <input type="text" className="form-control form-control-sm" placeholder="Customer Name..." />
                      </div>
                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <input type="checkbox" id="chkInvNo" className="me-1" style={{width: '16px', height: '16px', cursor: 'pointer'}} />
                          <label htmlFor="chkInvNo" className="mb-0 fw-bold" style={{fontSize: '13px', cursor: 'pointer'}}>Invoice No :</label>
                        </div>
                        <input type="text" className="form-control form-control-sm" placeholder="No." />
                      </div>
                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <input type="checkbox" id="chkItemDesc" className="me-1" style={{width: '16px', height: '16px', cursor: 'pointer'}} />
                          <label htmlFor="chkItemDesc" className="mb-0 fw-bold" style={{fontSize: '13px', cursor: 'pointer'}}>Item Code / Description :</label>
                        </div>
                        <input type="text" className="form-control form-control-sm" />
                      </div>
                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <input type="checkbox" id="chkSONo" className="me-1" style={{width: '16px', height: '16px', cursor: 'pointer'}} />
                          <label htmlFor="chkSONo" className="mb-0 fw-bold" style={{fontSize: '13px', cursor: 'pointer'}}>SO No :</label>
                        </div>
                        <input type="text" className="form-control form-control-sm" placeholder="SO No..." />
                      </div>
                      <div>
                        <button type="button" className="vndrbtn border-0 d-flex align-items-center justify-content-center" onClick={fetchInvoices} style={{ height: '34px' }}>
                          <span className="me-1">🔍</span> Search
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ===== TABLE ===== */}
                  
                  <div className="table-responsive search-results-table mt-2">
                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 2 }}>
                      <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                        <TableHead>
                          <TableRow>
                            {['Sr.', 'Year', 'Series', 'Type', 'Invoice No', 'Inv. Date', 'Cust PO No', 'Cust Code', 'Customer Name', 'Total'].map(h => (
                              <TableCell key={h} sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', textAlign: 'center' }}>
                                {h}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loading ? (
                            <TableRow>
                              <TableCell colSpan={10} sx={{ textAlign: 'center', py: 3, color: '#475569' }}>
                                Loading...
                              </TableCell>
                            </TableRow>
                          ) : invoices.length > 0 ? (
                            invoices.map((inv, index) => {
                              const [custName, custCode] = (inv.customer || "").split(" | ");
                              const invDate = inv.order_date || "";
                              const year = invDate ? invDate.split("-")[0] : "";
                              return (
                                <TableRow hover key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{index + 1}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{year}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{inv.series}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{inv.type}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{inv.invoice_no}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{invDate}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{inv.items?.[0]?.po_no || inv.select_so}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{custCode || ""}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{custName || inv.customer}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{inv.grand_total}</TableCell>
                                </TableRow>
                              );
                            })
                          ) : (
                            <TableRow>
                              <TableCell colSpan={10} sx={{ textAlign: 'center', py: 3, color: '#475569' }}>
                                No records found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
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

export default ProformaInvoiceList;
