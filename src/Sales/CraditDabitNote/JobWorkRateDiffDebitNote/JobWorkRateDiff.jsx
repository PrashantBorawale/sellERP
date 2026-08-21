import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";
import "./JobWorkRateDiff.css";

const JobWorkRateDiff = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();


  // --- Form State (for API submission) ---
  const [debitNoteNo, setDebitNoteNo] = useState("");
  const [debitNoteDate, setDebitNoteDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [remark, setRemark] = useState("");
  const [isServiceInvoice, setIsServiceInvoice] = useState(false);
  const [saving, setSaving] = useState(false);

  // Search and selected rows management
  const [searchResults, setSearchResults] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [newRate, setNewRate] = useState(""); // Missing state restored

  // Tax summary fields
  const [cgst, setCgst] = useState("0");
  const [sgst, setSgst] = useState("0");
  const [igst, setIgst] = useState("0");
  const [utgst, setUtgst] = useState("0");
  const [subTotal, setSubTotal] = useState("0.00");
  const [cgstAmt, setCgstAmt] = useState("0.00");
  const [sgstAmt, setSgstAmt] = useState("0.00");
  const [igstAmt, setIgstAmt] = useState("0.00");
  const [utgstAmt, setUtgstAmt] = useState("0.00");
  const [grandTotal, setGrandTotal] = useState("0.00");

  const fetchDebitNoteNo = async () => {
    try {
      // Using the user-specified remote production URL
      const res = await axios.get(`https://sellerp-backend.onrender.com/Sales/Gst-jobwork-diff/no/?t=${Date.now()}`);
      console.log("Fetched Debit Note No Response:", res.data);
      
      const no = res.data.debit_note_no || res.data.invoice_no || res.data.no || (Array.isArray(res.data) ? res.data[0]?.debit_note_no : "");
      if (no) {
        setDebitNoteNo(String(no));
      }
    } catch (err) {
      console.error("Debit Note No fetch error:", err);
    }
  };

  const handleSearch = async () => {
    try {
      const url = `https://sellerp-backend.onrender.com/Sales/gst-jobwork-invoice/`;
      const response = await axios.get(url);
      const allInvoices = Array.isArray(response.data) ? response.data : [];

      // Client-side filtering
      const filtered = allInvoices.filter(inv => {
        if (customer) {
          const custName = (inv.bill_to_cust || "").toLowerCase();
          if (!custName.includes(customer.toLowerCase())) return false;
        }
        if (invoiceNo && inv.invoice_no !== invoiceNo) return false;
        if (!inv.items || inv.items.length === 0) return false;
        return true;
      });

      // Flatten: one row per item
      const flattened = [];
      filtered.forEach(inv => {
        inv.items.forEach(itm => {
          flattened.push({
            invoice_no: inv.invoice_no,
            invoice_date: inv.invoice_date || "",
            bill_to: inv.bill_to_cust,
            display_item: {
              hsn_code: itm.hsn_code || "",
              description: itm.description || "",
              inv_qty: itm.invoice_qty_nos || itm.inv_qty || itm.invoice_qty_kg || 0,
              qty: itm.invoice_qty_nos || itm.inv_qty || itm.invoice_qty_kg || 0,
              jobwork_rate: parseFloat(itm.jobwork_rate) || 0,
              item_code: itm.item_code || ""
            },
            gst_details: inv.gst_details || null
          });
        });
      });

      setSearchResults(flattened);
      if (flattened.length === 0) alert("No matching invoices with items found.");
    } catch (err) {
      console.error("Search error:", err);
      alert(`Search error: ${err.message}`);
    }
  };

  const handleAddInvoice = (row) => {
    const itm = row.display_item || {};
    // Check if this specific item from this specific invoice is already added
    if (selectedInvoices.some(si => si.inv_no === row.invoice_no && si.item_desc === itm.description)) {
      alert("This item from the invoice is already added.");
      return;
    }
    
    // API might return qty in different fields, we check all common ones
    const quantity = itm.inv_qty || itm.qty || itm.invoice_qty_nos || itm.invoice_qty_kg || 0;

    const newEntry = {
      inv_no: row.invoice_no || "",
      inv_date: row.invoice_date || "",
      hsn_code: itm.hsn_code || "",
      item_code: itm.item_code || "",
      qty: quantity,
      old_rate: itm.jobwork_rate || 0,
      new_rate: "",
      diff: "0.00",
      diff_amt: "0.00",
      grir_no: "",
      grir_date: "",
      item_desc: itm.description || ""
    };

    // Auto-set customer if not set, or warn if different
    if (!customer) {
      setCustomer(row.bill_to || "");
    } else if (customer && row.bill_to && customer.toLowerCase() !== row.bill_to.toLowerCase()) {
       if (!window.confirm(`This invoice belongs to ${row.bill_to}, but you already have ${customer} selected. Do you want to continue?`)) {
         return;
       }
    }

    setSelectedInvoices([...selectedInvoices, newEntry]);

    // Pull GST percentages from invoice gst_details
    const gstData = row.gst_details || null;
    
    if (gstData) {
      // API sometimes stores amount in cgst field instead of percentage
      // If value > 50, it's likely an amount — use 9% as default percentage
      const cVal = parseFloat(gstData.cgst) || 0;
      const sVal = parseFloat(gstData.sgst) || 0;
      const iVal = parseFloat(gstData.igst) || 0;
      const uVal = parseFloat(gstData.utgst) || 0;
      
      setCgst(cVal > 0 && cVal <= 50 ? String(cVal) : "9");
      setSgst(sVal > 0 && sVal <= 50 ? String(sVal) : "9");
      setIgst(iVal > 0 && iVal <= 50 ? String(iVal) : "0");
      setUtgst(uVal > 0 && uVal <= 50 ? String(uVal) : "0");
    } else {
      setCgst("9");
      setSgst("9");
      setIgst("0");
      setUtgst("0");
    }
  };

  const handleTableChange = (index, field, value) => {
    const updated = [...selectedInvoices];
    updated[index][field] = value;
    
    // Auto calculate diff if rates are changed
    if (field === 'new_rate' || field === 'old_rate' || field === 'qty') {
      const nr = parseFloat(updated[index].new_rate) || 0;
      const or = parseFloat(updated[index].old_rate) || 0;
      const qtyVal = parseFloat(updated[index].qty) || 0;
      const diffVal = (nr - or).toFixed(2);
      updated[index].diff = diffVal;
      updated[index].diff_amt = (parseFloat(diffVal) * qtyVal).toFixed(2);
    }
    
    setSelectedInvoices(updated);
  };

  // Real-time calculations for Summary Section
  useEffect(() => {
    const totalDiffAmt = selectedInvoices.reduce((sum, itm) => sum + (parseFloat(itm.diff_amt) || 0), 0);
    setSubTotal(totalDiffAmt.toFixed(2));

    const cRate = parseFloat(cgst) || 0;
    const sRate = parseFloat(sgst) || 0;
    const iRate = parseFloat(igst) || 0;
    const uRate = parseFloat(utgst) || 0;

    const cAmt = totalDiffAmt * (cRate / 100);
    const sAmt = totalDiffAmt * (sRate / 100);
    const iAmt = totalDiffAmt * (iRate / 100);
    const uAmt = totalDiffAmt * (uRate / 100);

    setCgstAmt(cAmt.toFixed(2));
    setSgstAmt(sAmt.toFixed(2));
    setIgstAmt(iAmt.toFixed(2));
    setUtgstAmt(uAmt.toFixed(2));

    const gt = totalDiffAmt + cAmt + sAmt + iAmt + uAmt;
    setGrandTotal(gt.toFixed(2));
  }, [selectedInvoices, cgst, sgst, igst, utgst]);

  const handleSetAllNewRate = () => {
    if (!newRate) return;
    const updated = selectedInvoices.map(itm => {
      const nr = parseFloat(newRate) || 0;
      const or = parseFloat(itm.old_rate) || 0;
      const qtyVal = parseFloat(itm.qty) || 0;
      const diffVal = (nr - or).toFixed(2);
      return {
        ...itm,
        new_rate: newRate,
        diff: diffVal,
        diff_amt: (parseFloat(diffVal) * qtyVal).toFixed(2)
      };
    });
    setSelectedInvoices(updated);
  };

  // POST API handler
  const handleSave = async () => {
    if (!customer) {
      alert("Please enter or select a customer.");
      return;
    }
    if (selectedInvoices.length === 0) {
      alert("Please add at least one invoice item.");
      return;
    }
    setSaving(true);

    const parseNum = (val) => (val === "" ? 0 : parseFloat(val));
    const parseDate = (val) => (val === "" ? null : val);

    const payload = {
      debit_note_no: debitNoteNo,
      debit_note_date: parseDate(debitNoteDate),
      from_date: parseDate(fromDate),
      to_date: parseDate(toDate),
      customer,
      party_name: customer, // Added party_name for backend compatibility
      item_code: itemCode,
      invoice_no: invoiceNo,
      remark,
      is_service_invoice: isServiceInvoice,
      
      // Totals and Tax (at root level as expected by backend)
      sub_total: parseNum(subTotal),
      cgst: parseNum(cgst),
      sgst: parseNum(sgst),
      igst: parseNum(igst),
      utgst: parseNum(utgst),
      cgst_amt: parseNum(cgstAmt),
      sgst_amt: parseNum(sgstAmt),
      igst_amt: parseNum(igstAmt),
      utgst_amt: parseNum(utgstAmt),
      grand_total: parseNum(grandTotal),

      items: selectedInvoices.map(itm => ({
        inv_no: itm.inv_no,
        inv_date: parseDate(itm.inv_date),
        hsn_code: itm.hsn_code,
        item_code: itm.item_code || "",
        description: itm.item_desc || "",
        qty: parseNum(itm.qty),
        old_rate: parseNum(itm.old_rate),
        new_rate: parseNum(itm.new_rate),
        diff: parseNum(itm.diff),
        diff_amt: parseNum(itm.diff_amt),
        grir_no: itm.grir_no,
        grir_date: parseDate(itm.grir_date),
      })),
    };

    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Sales/gst-jobwork-rate-diff/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      console.log("API Response Status:", response.status);
      console.log("API Response Body:", responseText);

      if (response.ok) {
        alert("Debit Note saved successfully!");
        
        // Auto-update debit note number after save (with small delay for local DB consistency)
        setTimeout(() => {
          fetchDebitNoteNo();
        }, 500);
        
        // Reset form fields
        setCustomer("");
        setItemCode("");
        setInvoiceNo("");
        setRemark("");
        setIsServiceInvoice(false);
        setFromDate("");
        setToDate("");
        setNewRate("");
        
        // Reset table rows
        setSelectedInvoices([]);
        setSearchResults([]);
        
        // Reset tax summary fields (back to defaults)
        setCgst("0");
        setSgst("0");
        setIgst("0");
        setUtgst("0");
        setSubTotal("0.00");
        setCgstAmt("0.00");
        setSgstAmt("0.00");
        setIgstAmt("0.00");
        setUtgstAmt("0.00");
        setGrandTotal("0.00");
        
      } else {
        alert("Save failed (Status " + response.status + "): " + responseText);
      }
    } catch (error) {
      console.error("Save Debit Note error:", error);
      alert("Network error: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Fetch Debit Note No on mount
  useEffect(() => {
    fetchDebitNoteNo();
  }, []);

  const handleButtonClick = () => {
    navigate('/DabitNoteList');
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

                  {/* Header Row */}
                  <div className="erp-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6 text-start">
                        <h5 className="header-title mb-0" style={{ fontSize: "22px", fontWeight: "700", color: "blue" }}>New Debit Note (Jobwork Rate Diff.)</h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button type="button" className="vndrbtn" onClick={handleButtonClick}>
                          Debit Note List
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    {/* Top Info Row */}
                    <div className="d-flex align-items-center gap-4 mb-3 p-3 bg-light rounded shadow-sm border text-start">
                        <div className="d-flex align-items-center gap-2">
                            <label className="m-0 fw-bold" style={{fontSize: '12px'}}>Debit Note No :</label>
                            <span className="fw-bold text-primary" style={{fontSize: '14px'}}>{debitNoteNo || 'Loading...'}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 ms-4">
                            <label className="m-0 fw-bold" style={{fontSize: '12px'}}>Debit Note Date :</label>
                            <input type="date" className="form-control form-control-sm" style={{width: '150px'}} value={debitNoteDate} onChange={e => setDebitNoteDate(e.target.value)} />
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="p-3 bg-light border mb-3 rounded shadow-sm">
                      <div className="d-flex flex-wrap align-items-end gap-3 text-start">
                        <div>
                          <label className="fw-bold mb-1" style={{fontSize: '12px'}}>From Date</label>
                          <input type="date" className="form-control form-control-sm" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                        </div>
                        <div>
                          <label className="fw-bold mb-1" style={{fontSize: '12px'}}>To Date</label>
                          <input type="date" className="form-control form-control-sm" value={toDate} onChange={e => setToDate(e.target.value)} />
                        </div>
                        <div className="flex-grow-1" style={{minWidth: '200px'}}>
                          <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Customer</label>
                          <input type="text" className="form-control form-control-sm" placeholder="Enter Name..." value={customer} onChange={e => setCustomer(e.target.value)} />
                        </div>
                        <div>
                          <div className="d-flex align-items-center mb-1">
                             <input type="checkbox" id="chkItemCode" className="me-1" />
                             <label htmlFor="chkItemCode" className="fw-bold mb-0" style={{fontSize: '12px', cursor: 'pointer'}}>Item Code</label>
                          </div>
                          <input type="text" className="form-control form-control-sm" placeholder="Item Code" value={itemCode} onChange={e => setItemCode(e.target.value)} />
                        </div>
                        <div>
                          <div className="d-flex align-items-center mb-1">
                             <input type="checkbox" id="chkInvoiceNo" className="me-1" />
                             <label htmlFor="chkInvoiceNo" className="fw-bold mb-0" style={{fontSize: '12px', cursor: 'pointer'}}>Invoice No</label>
                          </div>
                          <input type="text" className="form-control form-control-sm" placeholder="Invoice No" value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} />
                        </div>
                        <div>
                          <button 
                              className="vndrbtn px-4" 
                              onClick={handleSearch}
                          >
                              <FaSearch size={10} className="me-1" /> Search
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Message Bar / Search Results Table */}
                    {searchResults.length > 0 ? (
                      <div className="table-responsive search-results-table mt-2" style={{maxHeight: '200px', overflowY: 'auto'}}>
                         <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 2 }}>
            <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                           <TableHead>
                             <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                               <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>No.</TableCell>
                               <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Invoice No</TableCell>
                               <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Invoice Date</TableCell>
                               <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Customer</TableCell>
                               <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>HSN Code</TableCell>
                               <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Item Desc</TableCell>
                               <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Qty</TableCell>
                               <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Debit Note No</TableCell>
                               <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Rate Diff</TableCell>
                               <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Select</TableCell>
                             </TableRow>
                           </TableHead>
                           <TableBody>
                             {searchResults.map((row, idx) => (
                               <TableRow key={idx} style={{fontSize: '11px'}} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                 <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{idx + 1}</TableCell>
                                 <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{row.invoice_no}</TableCell>
                                 <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{row.invoice_date}</TableCell>
                                 <TableCell style={{color: '#000'}} sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{row.bill_to}</TableCell>
                                 <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{row.display_item?.hsn_code}</TableCell>
                                 <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{row.display_item?.description}</TableCell>
                                 <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{row.display_item?.inv_qty || row.display_item?.qty || row.display_item?.invoice_qty_nos || '0'}</TableCell>
                                 <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{row.debit_note_no || '-'}</TableCell>
                                 <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{row.rate_diff || '-'}</TableCell>
                                 <TableCell className="text-center" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                   <button className="vndrbtn btn-sm" style={{fontSize: '10px'}} onClick={() => handleAddInvoice(row)}>Add</button>
                                 </TableCell>
                               </TableRow>
                             ))}
                           </TableBody>
                         </Table>
          </TableContainer>
                      </div>
                    ) : (
                      <div style={{fontSize: '11px', color: '#666', borderBottom: '1px solid #ddd', padding: '2px 5px', background: '#fff'}}>
                          {searchResults.length === 0 && customer ? "No Data Found !!" : "Enter filters and click Search to see results."}
                      </div>
                    )}
 
                    {/* Selected Invoice List Label */}
                    <div className="mt-3 mb-1" style={{fontSize: '12px', fontWeight: 'bold', color: '#0d6efd'}}>
                      Selected Invoice List :
                    </div>

                    {/* Table Section */}
                    <div className="table-responsive mt-3">
                        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 2 }}>
            <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                            <TableHead>
                                <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>No.</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Inv No</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Inv Date</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>HSN Code</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Qty</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Edit</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Old Rate</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>#</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                            New Rate <input type="text" className="form-control form-control-sm py-0" style={{width: "60px"}} value={newRate} onChange={e => setNewRate(e.target.value)} />
                                            <button className="vndrbtn btn-sm" style={{fontSize: '9px', height: '18px'}} onClick={handleSetAllNewRate}>Set All</button>
                                        </div>
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Diff</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Diff Amt</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>GRIR No.</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>GRIR Date</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Del</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedInvoices.map((item, index) => (
                                  <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                      <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{index + 1}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.inv_no} readOnly /></TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="date" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.inv_date} readOnly /></TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.hsn_code} readOnly /></TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.qty} onChange={e => handleTableChange(index, 'qty', e.target.value)} /></TableCell>
                                      <TableCell className="text-primary" style={{cursor: 'pointer'}} sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>Edit</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.old_rate} onChange={e => handleTableChange(index, 'old_rate', e.target.value)} /></TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}></TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.new_rate} onChange={e => handleTableChange(index, 'new_rate', e.target.value)} /></TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.diff} readOnly /></TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.diff_amt} readOnly /></TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.grir_no} onChange={e => handleTableChange(index, 'grir_no', e.target.value)} /></TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="date" className="form-control form-control-sm py-0" style={{height: '22px'}} value={item.grir_date} onChange={e => handleTableChange(index, 'grir_date', e.target.value)} /></TableCell>
                                      <TableCell className="text-center" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                        <span 
                                          style={{border: '1px solid #ccc', padding: '0 5px', cursor: 'pointer', borderRadius: '3px', color: 'red'}}
                                          onClick={() => setSelectedInvoices(selectedInvoices.filter((_, i) => i !== index))}
                                        >
                                          &times;
                                        </span>
                                      </TableCell>
                                  </TableRow>
                                ))}
                                {selectedInvoices.length === 0 && (
                                  <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell colSpan="14" className="text-center text-muted" style={{fontSize: '11px', padding: '10px'}} sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>No invoices selected. Use the search table above to add rows.</TableCell>
                                  </TableRow>
                                )}
                            </TableBody>
                        </Table>
          </TableContainer>
                    </div>

                    {/* Summary Section */}
                    <div className="footer-summary mt-4">
                        <div className="footer-summary-header">Debit Note / Tax Details.</div>
                        <div className="table-responsive">
                            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 2 }}>
            <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                                <TableHead>
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell style={{width: '150px'}} sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>SubTotal</TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>CGST</TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>SGST</TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>IGST</TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>UTGST</TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Grand Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}></TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><div className="d-flex align-items-center gap-1"><input type="text" className="form-control form-control-sm" placeholder="00.00" style={{width: '60px'}} value={cgst} onChange={e => setCgst(e.target.value)} /> %</div></TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><div className="d-flex align-items-center gap-1"><input type="text" className="form-control form-control-sm" placeholder="00.00" style={{width: '60px'}} value={sgst} onChange={e => setSgst(e.target.value)} /> %</div></TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><div className="d-flex align-items-center gap-1"><input type="text" className="form-control form-control-sm" placeholder="00.00" style={{width: '60px'}} value={igst} onChange={e => setIgst(e.target.value)} /> %</div></TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><div className="d-flex align-items-center gap-1"><input type="text" className="form-control form-control-sm" placeholder="00.00" style={{width: '60px'}} value={utgst} onChange={e => setUtgst(e.target.value)} /> %</div></TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}></TableCell>
                                    </TableRow>
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm text-center" value={subTotal} onChange={e => setSubTotal(e.target.value)} /></TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm text-center" placeholder="00.00" value={cgstAmt} onChange={e => setCgstAmt(e.target.value)} /></TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm text-center" placeholder="00.00" value={sgstAmt} onChange={e => setSgstAmt(e.target.value)} /></TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm text-center" placeholder="00.00" value={igstAmt} onChange={e => setIgstAmt(e.target.value)} /></TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm text-center" placeholder="00.00" value={utgstAmt} onChange={e => setUtgstAmt(e.target.value)} /></TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm text-center" placeholder="00.00" value={grandTotal} onChange={e => setGrandTotal(e.target.value)} /></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </div>
                    </div>

                    {/* Remarks & Buttons */}
                    <div className="d-flex align-items-center flex-nowrap mt-4 pb-2 text-start gap-4 p-3 bg-light rounded shadow-sm border">
                        <div style={{minWidth: '250px'}}>
                            <label className="fw-bold d-block mb-1" style={{fontSize: '12px'}}>Remark</label>
                            <textarea className="form-control form-control-sm" rows="1" value={remark} onChange={e => setRemark(e.target.value)}></textarea>
                        </div>
                        <div className="d-flex align-items-center">
                            <input type="checkbox" id="isServiceInvoice" checked={isServiceInvoice} onChange={e => setIsServiceInvoice(e.target.checked)} className="me-2" style={{width: '16px', height: '16px', cursor: 'pointer'}} />
                            <label htmlFor="isServiceInvoice" className="mb-0 fw-bold" style={{fontSize: '13px', cursor: 'pointer'}}>IS Service Invoice</label>
                        </div>
                        <div className="ms-auto d-flex gap-2">
                            <button className="vndrbtn px-4" onClick={handleSave} disabled={saving}>
                              {saving ? 'Saving...' : 'Save Debit Note'}
                            </button>
                            <button className="vndrbtn px-4" onClick={() => navigate('/DabitNoteList')}>Cancel</button>
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

export default JobWorkRateDiff;