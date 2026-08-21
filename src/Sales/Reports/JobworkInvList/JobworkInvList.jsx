import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./JobworkInvList.css";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";

const defaultInvoices = [
  {
    id: 1,
    plant: "SHARP",
    invoice_no: "JWINV-2526-001",
    invoice_date: "15/05/2025",
    addr_code: "C0012",
    bill_to_cust: "BAJAJ AUTO LTD",
    items: [
      {
        po_no: "PO-44512",
        line_podt: "10/05/2025",
        item_code: "FG1009",
        description: "SLEEVE GEAR SHIFT",
        jobwork_rate: "45.00",
        invoice_qty_nos: "100",
        rate_type: "NOS"
      }
    ],
    gst_details: {
      assessable_value: "4500.00",
      gr_total: "5310.00"
    }
  }
];

const JobworkInvList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState(defaultInvoices);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Sales/gst-jobwork-invoice/");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setInvoiceData(data);
        } else if (data && Array.isArray(data.value) && data.value.length > 0) {
          setInvoiceData(data.value);
        }
      }
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    } finally {
      setLoading(false);
    }
  };

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
      url = url.replace("/Sales/JobworkInvoice/pdf/", "/Sales/gst-jobwork-invoice-pdf/")
               .replace("/Sales/gst-jobwork-invoice/pdf/", "/Sales/gst-jobwork-invoice-pdf/");
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.open(`https://sellerp-backend.onrender.com/Sales/gst-jobwork-invoice-pdf/${targetId}/`, "_blank", "noopener,noreferrer");
    }
  };

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const totalRecords = invoiceData.length;
  const totalQty = invoiceData.reduce((sum, inv) => {
    const qty = inv.items && inv.items.length > 0 ? parseFloat(inv.items[0].invoice_qty_nos) : 0;
    return sum + (isNaN(qty) ? 0 : qty);
  }, 0);
  const assessableValue = invoiceData.reduce((sum, inv) => {
    const val = inv.gst_details?.assessable_value ? parseFloat(inv.gst_details.assessable_value) : 0;
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  const cgstTotal = invoiceData.reduce((sum, inv) => {
    const val = inv.gst_details?.cgst_amt ? parseFloat(inv.gst_details.cgst_amt) : 0;
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  const sgstTotal = invoiceData.reduce((sum, inv) => {
    const val = inv.gst_details?.sgst_amt ? parseFloat(inv.gst_details.sgst_amt) : 0;
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  const igstTotal = invoiceData.reduce((sum, inv) => {
    const val = inv.gst_details?.igst_amt ? parseFloat(inv.gst_details.igst_amt) : 0;
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  const totalAmount = invoiceData.reduce((sum, inv) => {
    const val = inv.gst_details?.gr_total ? parseFloat(inv.gst_details.gr_total) : 0;
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  const formatCurrency = (val) => {
    return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const handleExportExcel = (e) => {
    e.preventDefault();
    if (invoiceData.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = invoiceData.map((inv, index) => {
      const firstItem = inv.items && inv.items.length > 0 ? inv.items[0] : null;
      const itemDesc = firstItem 
        ? `${firstItem.item_code} | ${firstItem.description} | Rate : ${firstItem.jobwork_rate} | Qty : ${firstItem.invoice_qty_nos} ${firstItem.rate_type || 'NOS'}` 
        : '';

      return {
        "Sr.": index + 1,
        "Year": "25-26",
        "Plant": inv.plant || "",
        "Inv No": inv.invoice_no || "",
        "Inv Date": inv.invoice_date || "",
        "Order No": firstItem?.po_no || "",
        "Order Date": firstItem?.line_podt || "",
        "Cust Code": inv.addr_code || "",
        "Cust Name": inv.bill_to_cust || "",
        "Item NO | Desc | Qty": itemDesc,
        "Qty": firstItem?.invoice_qty_nos || 0,
        "Ass Amt": inv.gst_details?.assessable_value || '0.00',
        "Total Amt": inv.gst_details?.gr_total || '0.00',
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
    setDropdownOpen(false);
  };

  return (
    <div className="erp-page">
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="container-fluid py-3 overflow-hidden">
                  
                  <div className="erp-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-4 text-start">
                        <h5 className="header-title mb-0" style={{ fontSize: "22px", fontWeight: "700", color: "blue" }}> Jobwork Invoice List </h5>
                      </div>
                      <div className="col-md-8 text-end d-flex justify-content-md-end gap-2 mt-3 mt-md-0 flex-wrap">
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          <button style={{ height: '34px' }} className="BOMRouting vndrbtn border-0 d-flex align-items-center gap-1" onClick={toggleDropdown}>
                            Job-Work Invoice : Report ▼
                          </button>
                          {dropdownOpen && (
                            <ul className="dropdown-menu show" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000, display: 'block', minWidth: '10rem', padding: '0.5rem 0', margin: '0.125rem 0 0', fontSize: '12px', color: '#212529', textAlign: 'left', listStyle: 'none', backgroundColor: '#fff', backgroundClip: 'padding-box' }}>
                              <li><a className="dropdown-item" href="#" onClick={handleExportExcel}>Export-Excel</a></li>
                              <li><Link className="dropdown-item" to={"/JobWorkSalesRegister"}>Job-Work Sales Register</Link></li>
                            </ul>
                          )}
                        </div>
                        <button type="button" className="vndrbtn border-0 d-flex align-items-center" style={{ height: '34px' }}>Jobwork Inv Query</button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-light border mb-3 rounded shadow-sm">
                    <div className="d-flex flex-wrap align-items-end gap-3 text-start">
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>From Date :</label>
                        <input type="date" className="form-control form-control-sm" />
                      </div>
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>To Date :</label>
                        <input type="date" className="form-control form-control-sm" />
                      </div>
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Plant :</label>
                        <select className="form-control form-control-sm">
                          <option value="">Produlink</option>
                        </select>
                      </div>
                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <input type="checkbox" className="me-1" id="chkCustomerName" style={{width: '16px', height: '16px', cursor: 'pointer'}} />
                          <label htmlFor="chkCustomerName" className="fw-bold mb-0" style={{fontSize: '13px', cursor: 'pointer'}}>Customer Name :</label>
                        </div>
                        <input type="text" placeholder="Cust Name..." className="form-control form-control-sm" />
                      </div>
                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <input type="checkbox" className="me-1" id="chkInvNo" style={{width: '16px', height: '16px', cursor: 'pointer'}} />
                          <label htmlFor="chkInvNo" className="fw-bold mb-0" style={{fontSize: '13px', cursor: 'pointer'}}>Invoice No :</label>
                        </div>
                        <input type="text" placeholder="Inv No..." className="form-control form-control-sm" />
                      </div>
                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <input type="checkbox" className="me-1" id="chkItemGrp" style={{width: '16px', height: '16px', cursor: 'pointer'}} />
                          <label htmlFor="chkItemGrp" className="fw-bold mb-0" style={{fontSize: '13px', cursor: 'pointer'}}>Item Group :</label>
                        </div>
                        <select className="form-control form-control-sm">
                          <option value="">Select</option>
                        </select>
                      </div>
                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <input type="checkbox" className="me-1" id="chkItemDesc" style={{width: '16px', height: '16px', cursor: 'pointer'}} />
                          <label htmlFor="chkItemDesc" className="fw-bold mb-0" style={{fontSize: '13px', cursor: 'pointer'}}>Item No / Desc :</label>
                        </div>
                        <input type="text" placeholder="" className="form-control form-control-sm" />
                      </div>
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Cancel :</label>
                        <select className="form-control form-control-sm">
                          <option value="">ALL</option>
                          <option value="">Yes</option>
                          <option value="">No</option>
                        </select>
                      </div>
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Ackn. :</label>
                        <select className="form-control form-control-sm">
                          <option value="">ALL</option>
                          <option value="">Yes</option>
                          <option value="">No</option>
                        </select>
                      </div>
                      <div className="d-flex gap-2">
                        <button type="button" className="vndrbtn px-4 border-0 d-flex align-items-center gap-1 justify-content-center" style={{ height: '34px' }}>
                          <i className="fas fa-search" style={{ fontSize: '10px' }}></i> Search
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive search-results-table mt-2" style={{ width: '100%' }}>
                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '12px', border: '1px solid #e2e8f0', width: '100%', mb: 2 }}>
                      <Table size="small" stickyHeader sx={{ width: '100%', tableLayout: 'auto' }}>
                        <TableHead>
                          <TableRow>
                            {['Sr.', 'Year', 'Plant', 'Inv No', 'Inv Date', 'Order No', 'Order Date', 'Cust Code', 'Cust Name', 'Item NO | Desc | Qty', 'Qty', 'Ass Amt', 'Total Amt', 'User', 'IRN', 'Ack', 'EWB', 'Email', 'Cancel', 'Edit', 'View'].map(h => (
                              <TableCell key={h} sx={{ backgroundColor: '#f8fafc', color: '#334155', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', borderBottom: '2px solid #cbd5e1', padding: '6px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center', lineHeight: 1.2 }}>
                                {h}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loading ? (
                            <TableRow>
                              <TableCell colSpan={21} sx={{ textAlign: 'center', py: 4, color: '#475569' }}>Loading data...</TableCell>
                            </TableRow>
                          ) : invoiceData.length > 0 ? (
                            invoiceData.map((inv, index) => {
                              const firstItem = inv.items && inv.items.length > 0 ? inv.items[0] : null;
                              const itemDesc = firstItem 
                                ? `${firstItem.item_code} | ${firstItem.description} | Rate : ${firstItem.jobwork_rate} | Qty : ${firstItem.invoice_qty_nos} ${firstItem.rate_type || 'NOS'}` 
                                : '';
                                
                              return (
                                <TableRow hover key={inv.id || index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{index + 1}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>25-26</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{inv.plant}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center', fontWeight: 600 }}>{inv.invoice_no}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{inv.invoice_date}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{firstItem?.po_no || ''}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{firstItem?.line_podt || ''}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>{inv.addr_code || ''}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left' }}>{inv.bill_to_cust}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 4px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'left' }}>{itemDesc}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center', fontWeight: 600 }}>{firstItem?.invoice_qty_nos || 0}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'right' }}>{inv.gst_details?.assessable_value || '0.00'}</TableCell>
                                  <TableCell sx={{ color: '#0f172a', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'right', fontWeight: 700 }}>{inv.gst_details?.gr_total || '0.00'}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>prakash</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>True</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }} className="text-danger"><i className="fas fa-times-circle"></i></TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}><span className="text-primary fw-bold" style={{ fontSize: '10px' }}>www</span></TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}><i className="fas fa-envelope text-secondary"></i> 0</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}><span className="badge bg-primary rounded-1">N</span></TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}><i className="fas fa-edit text-dark" style={{ cursor: 'pointer' }}></i></TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '10px', padding: '5px 3px', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}><FaEye size={18} color="#0d6efd" style={{ cursor: 'pointer' }} onClick={() => handleViewPdf(inv)} title="View PDF" /></TableCell>
                                </TableRow>
                              );
                            })
                          ) : (
                            <TableRow>
                              <TableCell colSpan={21} sx={{ textAlign: 'center', py: 4, color: '#475569' }}>No records found</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>

                  <div className="JobworkInvList-footer d-flex flex-wrap justify-content-between align-items-center gap-2" style={{ backgroundColor: '#f4f4f4', padding: '10px 15px', borderTop: '2px solid #ddd', fontSize: '12px', fontWeight: 'bold', marginTop: '10px' }}>
                    <div>
                      Total Record's : {totalRecords}
                    </div>
                    <div className="d-flex flex-wrap align-items-center gap-3">
                      <span>Total Qty : {totalQty}</span>
                      <span>Assessable Value : {formatCurrency(assessableValue)}</span>
                      <span>CGST : {formatCurrency(cgstTotal)}</span>
                      <span>SGST : {formatCurrency(sgstTotal)}</span>
                      <span>IGST : {formatCurrency(igstTotal)}</span>
                      <span>Total Amount : {formatCurrency(totalAmount)}</span>
                      <div className="d-flex align-items-center gap-2 text-primary" style={{ fontSize: '12px' }}>
                        <div className="form-check form-check-inline mb-0 me-2">
                          <input className="form-check-input" type="radio" name="footerOptions" id="reportOption" defaultChecked style={{ marginTop: '2px' }} />
                          <label className="form-check-label text-primary" htmlFor="reportOption" style={{ fontWeight: 'bold', fontSize: '12px' }}>Report</label>
                        </div>
                        <div className="form-check form-check-inline mb-0">
                          <input className="form-check-input" type="radio" name="footerOptions" id="tagOption" style={{ marginTop: '2px' }} />
                          <label className="form-check-label text-primary" htmlFor="tagOption" style={{ fontWeight: 'bold', fontSize: '12px' }}>Tag</label>
                        </div>
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

export default JobworkInvList;