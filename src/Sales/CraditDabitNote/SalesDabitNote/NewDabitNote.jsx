import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import "./NewDabitNote.css";

const NewDabitNote = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  // Filter states
  const [plant, setPlant] = useState("VISHWA S.I.");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [addCode, setAddCode] = useState("");
  const [isItemChecked, setIsItemChecked] = useState(false);
  const [itemCode, setItemCode] = useState("");
  const [noteType, setNoteType] = useState("All Inv");

  // Data states
  const [debitNoteItems, setDebitNoteItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Header State for Manual Entry
  const [debitNoteNo, setDebitNoteNo] = useState("");
  const [debitNoteDate, setDebitNoteDate] = useState("");
  const [headerType, setHeaderType] = useState("Single");

  // Summary State for Manual Entry
  const [summary, setSummary] = useState({
    subTotal: "",
    discAmt: "",
    assAmt: "",
    cgstPct: "",
    cgstAmt: "",
    sgstPct: "",
    sgstAmt: "",
    igstPct: "",
    igstAmt: "",
    utgstPct: "",
    utgstAmt: "",
    tcsPct: "",
    tcsAmt: "",
    grandTotal: "",
    billToAddCode: "",
    otherRef: "",
    footerRemark: "",
    forEInvoice: "B2B",
    isServiceInvoice: false
  });

  const handleSummaryChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSummary(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const fetchDebitNoteNo = async () => {
    try {
      // Add a timestamp to prevent the browser from caching the old number
      const response = await fetch(`https://sellerp-backend.onrender.com/Sales/sales-diff/no/?t=${new Date().getTime()}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.debit_note_no) {
          setDebitNoteNo(data.debit_note_no);
        }
      }
    } catch (err) {
      console.error("Error fetching Debit Note Number:", err);
    }
  };


  const handleSave = async () => {
    if (!debitNoteDate) {
      alert("Please select a Debit Note Date.");
      return;
    }

    if (debitNoteItems.length === 0) {
      alert("Please add at least one item.");
      return;
    }

    const payload = {
      debit_note_no: debitNoteNo,
      debit_note_date: debitNoteDate,
      header_type: headerType,
      plant: plant,
      from_date: fromDate,
      to_date: toDate,
      customer: customer,
      type: noteType,
      item: debitNoteItems.map(itm => ({
        ...itm,
        item: itm.item_code || itm.item_no || itm.description || itm.item_description || itm.item || ""
      })),
      // Fixed mapping based on backend JSON snippet
      subtotal: summary.subTotal,
      dis_amount: summary.discAmt,
      ass_amount: summary.assAmt,
      cgst: summary.cgstPct,
      cgst_amt: summary.cgstAmt,
      sgst: summary.sgstPct,
      sgst_amt: summary.sgstAmt,
      igst: summary.igstPct,
      igst_amt: summary.igstAmt,
      utgst: summary.utgstPct,
      utgst_amt: summary.utgstAmt,
      tcs: summary.tcsPct,
      tcs_amt: summary.tcsAmt,
      grand_total: summary.grandTotal,
      bill_to_add_code: summary.billToAddCode,
      other_reference: summary.otherRef,
      remark: summary.footerRemark,
      for_e_invoice: summary.forEInvoice,
      is_service_invoice: summary.isServiceInvoice
    };

    console.log("Saving Debit Note Payload:", payload);

    try {
      setLoading(true);
      const response = await fetch("https://sellerp-backend.onrender.com/Sales/sales-rate-diff/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Debit Note saved successfully!");
        // Wait 500ms to allow the server to update the sequence before fetching
        setTimeout(() => {
          fetchDebitNoteNo();
        }, 500);
        setDebitNoteItems([]);
        setDebitNoteDate("");
        setSummary({
          subTotal: "",
          discAmt: "",
          assAmt: "",
          cgstPct: "",
          cgstAmt: "",
          sgstPct: "",
          sgstAmt: "",
          igstPct: "",
          igstAmt: "",
          utgstPct: "",
          utgstAmt: "",
          tcsPct: "",
          tcsAmt: "",
          grandTotal: "",
          billToAddCode: "",
          otherRef: "",
          footerRemark: "",
          forEInvoice: "B2B",
          isServiceInvoice: false
        });
      } else {
        const errorText = await response.text();
        try {
          const errorJson = JSON.parse(errorText);
          alert("Failed to save: " + JSON.stringify(errorJson));
        } catch (e) {
          alert(`Server Error (${response.status}):\n` + errorText.substring(0, 300));
        }
      }
    } catch (err) {
      console.error("Error saving debit note:", err);
      alert("Network or system error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      setSearchResults([]);
      
      const params = new URLSearchParams({
        plant: plant,
        from_date: fromDate,
        to_date: toDate,
        customer: customer,
        add_code: addCode,
        note_type: noteType
      });

      if (isItemChecked && itemCode) {
        params.append('item_code', itemCode);
      }

      const response = await fetch(`https://sellerp-backend.onrender.com/Sales/sales-diff/invoice/?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Sales Rate Diff API Response:", data);

      let invoices = [];
      if (Array.isArray(data)) {
        invoices = data;
      } else if (data.data && Array.isArray(data.data)) {
        invoices = data.data;
      } else if (data.results && Array.isArray(data.results)) {
        invoices = data.results;
      }

      // Flatten items from all invoices and extract tax rates
      const flattened = invoices.flatMap(inv => 
        (inv.items || []).map(item => {
          // Look for tax details in the parent invoice (GSTdetails or taxes array)
          const gst = (inv.GSTdetails && inv.GSTdetails[0]) || (inv.taxes && inv.taxes[0]) || {};
          
          return {
            ...item,
            invoice_no: inv.invoice_no,
            invoice_Date: inv.invoice_Date,
            shift_add_code: inv.addr_code || "",
            bill_to: inv.bill_to || "",
            // Inject tax percentages from invoice level if not on item level
            cgst: item.cgst !== undefined ? item.cgst : (gst.cgst !== undefined ? gst.cgst : 0),
            sgst: item.sgst !== undefined ? item.sgst : (gst.sgst !== undefined ? gst.sgst : 0),
            igst: item.igst !== undefined ? item.igst : (gst.igst !== undefined ? gst.igst : 0),
            utgst: item.utgst !== undefined ? item.utgst : (gst.utgst !== undefined ? gst.utgst : 0),
            tcs: item.tcs !== undefined ? item.tcs : (gst.tcs !== undefined ? gst.tcs : 0)
          };
        })
      );

      setSearchResults(flattened);
      
    } catch (err) {
      console.error("Error searching sales rate diff:", err);
      setError(err.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToDebitNote = (item) => {
    if (headerType === "Single" && debitNoteItems.length > 0) {
      alert("Only one entry allowed for Single type Debit Note.");
      return;
    }

    // Check if already added using unique item ID
    const isAlreadyAdded = debitNoteItems.some(existingItem => 
      (existingItem.id && item.id && existingItem.id === item.id) ||
      (existingItem.invoice_no === item.invoice_no && 
       (existingItem.description || existingItem.item_description) === (item.description || item.item_description))
    );

    if (isAlreadyAdded) {
      alert("This item is already added to the Debit Note.");
      return;
    }

    setDebitNoteItems(prev => [...prev, {
      ...item,
      qty: item.inv_qty || item.po_qty || item.qty || 0,
      item_description: item.description || item.item_description || "",
      old_rate: item.rate || item.old_rate || 0,
      new_rate: "", // Set blank as per user request
      po_no: item.po_no || item.po_number || "",
      date: item.date || item.po_date || "",
      dis: item.dis || item.disc_per || 0,
      diff: 0,
      diff_amt: 0,
      remark: item.remark || item.item_remark || ""
    }]);

    // Update summary percentages from the added item
    setSummary(prev => ({
      ...prev,
      cgstPct: (item.cgst !== undefined ? item.cgst : (item.cgst_pct !== undefined ? item.cgst_pct : (item.cgst_rate !== undefined ? item.cgst_rate : "0"))),
      sgstPct: (item.sgst !== undefined ? item.sgst : (item.sgst_pct !== undefined ? item.sgst_pct : (item.sgst_rate !== undefined ? item.sgst_rate : "0"))),
      igstPct: (item.igst !== undefined ? item.igst : (item.igst_pct !== undefined ? item.igst_pct : (item.igst_rate !== undefined ? item.igst_rate : "0"))),
      utgstPct: (item.utgst !== undefined ? item.utgst : (item.utgst_pct !== undefined ? item.utgst_pct : (item.utgst_rate !== undefined ? item.utgst_rate : "0"))),
      tcsPct: (item.tcs !== undefined ? item.tcs : (item.tcs_pct !== undefined ? item.tcs_pct : (item.tcs_rate !== undefined ? item.tcs_rate : "0")))
    }));
    
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...debitNoteItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Auto calculate diff if rate or qty is changed
    if (['new_rate', 'old_rate', 'qty'].includes(field)) {
      const oldRate = parseFloat(updatedItems[index].old_rate) || 0;
      const newRate = parseFloat(updatedItems[index].new_rate) || 0;
      const qty = parseFloat(updatedItems[index].qty) || 0;
      
      const diff = newRate - oldRate;
      updatedItems[index].diff = diff.toFixed(2);
      updatedItems[index].diff_amt = (diff * qty).toFixed(2);
    }
    
    setDebitNoteItems(updatedItems);
  };

  // Safe parsing helper
  const getNum = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? 0 : n;
  };

  // Real-time Summary Calculations
  useEffect(() => {
    if (debitNoteItems.length === 0) {
      setSummary(prev => ({
        ...prev,
        subTotal: "0.00",
        discAmt: "0.00",
        assAmt: "0.00",
        cgstAmt: "0.00",
        sgstAmt: "0.00",
        igstAmt: "0.00",
        utgstAmt: "0.00",
        tcsAmt: "0.00",
        grandTotal: "0.00"
      }));
      return;
    }

    let subTotalSum = 0;
    let totalDiscAmt = 0;

    debitNoteItems.forEach(item => {
      const diffAmt = getNum(item.diff_amt);
      const discPct = getNum(item.dis || item.disc_percent || item.discount);
      subTotalSum += diffAmt;
      totalDiscAmt += (diffAmt * discPct / 100);
    });

    const assAmt = subTotalSum - totalDiscAmt;

    // Calculate taxes based on summary percentages
    const cgstAmt = (assAmt * getNum(summary.cgstPct) / 100);
    const sgstAmt = (assAmt * getNum(summary.sgstPct) / 100);
    const igstAmt = (assAmt * getNum(summary.igstPct) / 100);
    const utgstAmt = (assAmt * getNum(summary.utgstPct) / 100);

    // Grand total based on user rule: ass amount to tcs
    // First calculate sum of all GSTs
    const sumGst = cgstAmt + sgstAmt + igstAmt + utgstAmt;
    const amountBeforeTcs = assAmt + sumGst;
    
    // Calculate TCS on (Ass Amount + GST)
    const tcsAmt = (amountBeforeTcs * getNum(summary.tcsPct) / 100);
    const grandTotal = amountBeforeTcs + tcsAmt;

    setSummary(prev => ({
      ...prev,
      subTotal: isNaN(subTotalSum) ? "0.00" : subTotalSum.toFixed(2),
      discAmt: isNaN(totalDiscAmt) ? "0.00" : totalDiscAmt.toFixed(2),
      assAmt: isNaN(assAmt) ? "0.00" : assAmt.toFixed(2),
      cgstAmt: isNaN(cgstAmt) ? "0.00" : cgstAmt.toFixed(2),
      sgstAmt: isNaN(sgstAmt) ? "0.00" : sgstAmt.toFixed(2),
      igstAmt: isNaN(igstAmt) ? "0.00" : igstAmt.toFixed(2),
      utgstAmt: isNaN(utgstAmt) ? "0.00" : utgstAmt.toFixed(2),
      tcsAmt: isNaN(tcsAmt) ? "0.00" : tcsAmt.toFixed(2),
      grandTotal: isNaN(grandTotal) ? "0.00" : grandTotal.toFixed(2)
    }));
  }, [
    debitNoteItems, 
    summary.cgstPct, 
    summary.sgstPct, 
    summary.igstPct, 
    summary.utgstPct, 
    summary.tcsPct
  ]);

  const handleDeleteItem = (index) => {
    const updatedItems = debitNoteItems.filter((_, i) => i !== index);
    setDebitNoteItems(updatedItems);
  };
    
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

  useEffect(() => {
    fetchDebitNoteNo();
  }, []);


  return (
    <div className="erp-page">
      <div className="container-fluid">
        <div className="row">
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
                      <div className="col-md-4">
                        <h5 className="header-title mb-0" style={{ fontSize: "22px", fontWeight: "700", color: "blue" }}>New Debit Note (Sales Rate Diff.) </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="vndrbtn" onClick={handleButtonClick}>
                          Debit Note List
                        </button>
                        </div>
                    </div>
                  </div>

                  <div className="NewDabitNote-main mt-3">
                     <div className="row text-start">

                     <div className="col-md-2">
                            <label htmlFor="">Debit Note No :</label>
                            <input type="text" className="form-control form-control-sm" name="debitNoteNo" value={debitNoteNo} readOnly placeholder="Enter Number..."/>                            
                      </div> 
                     <div className="col-md-2">
                            <label htmlFor="">Debit Note Date :</label>
                            <input type="date" className="form-control form-control-sm" name="debitNoteDate" value={debitNoteDate} onChange={(e) => setDebitNoteDate(e.target.value)}/>
                      </div>
                      <div className="col-md-2">
                            <label htmlFor="">Type :</label>
                            <select className="form-select form-select-sm" name="headerType" value={headerType} onChange={(e) => setHeaderType(e.target.value)}>
                               <option value="Single">Single</option>
                               <option value="Group">Group</option>
                            </select>
                      </div> 
                      <div className="col-md-6 d-flex align-items-center mt-3">
                            <label className="mb-0">Group : 1 Debit Note , Single : Per Itemwise Debit Note <span className="text-primary">ON Without-Invoice</span></label>
                      </div>

                     </div>
                  </div>

                  <div className="NewDabitNote-main mt-3">
                    <div className="NewDabitNote-second">
                      <ul className="nav nav-tabs" id="NewDabitNoteTabs" role="tablist" >
                        <li className="nav-item" role="presentation">
                          <button  className="nav-link active"  id="invoicedetails-tab"  data-bs-toggle="tab"  data-bs-target="#invoicedetails"  type="button"  role="tab"  >
                            Invoice Details
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" id="dabitnotedetails-tab" data-bs-toggle="tab" data-bs-target="#dabitnotedetails" type="button" role="tab" >
                            Debit Note Details
                          </button>
                        </li>
                      </ul>

                      <div className="tab-content mt-4"  id="NewDabitNoteTabsContent">

                        <div className="tab-pane fade show active" id="invoicedetails" role="tabpanel">
                            <div className="p-3 bg-light border mt-3 rounded shadow-sm">
                                <div className="d-flex flex-wrap align-items-end gap-3 text-start">
                                    <div style={{minWidth: '120px'}}>
                                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Plant :</label>
                                        <select 
                                            className="form-control form-control-sm"
                                            value={plant}
                                            onChange={(e) => setPlant(e.target.value)}
                                        >
                                            <option value="VISHWA S.I.">VISHWA S.I.</option>
                                        </select>
                                    </div> 
                                    <div style={{minWidth: '120px'}}>
                                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>From Date :</label>
                                        <input 
                                            type="date" 
                                            className="form-control form-control-sm"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                        />
                                    </div>
                                    <div style={{minWidth: '120px'}}>
                                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>To Date :</label>
                                        <input 
                                            type="date" 
                                            className="form-control form-control-sm"
                                            value={toDate}
                                            onChange={(e) => setToDate(e.target.value)}
                                        />
                                    </div>
                                    <div style={{minWidth: '150px'}} className="flex-grow-1">
                                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Customer :</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm" 
                                            placeholder="Enter Name ..."
                                            value={customer}
                                            onChange={(e) => setCustomer(e.target.value)}
                                        />                            
                                    </div> 
                                  
                                    <div style={{minWidth: '100px'}}>
                                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Add Code :</label>
                                        <select 
                                            className="form-control form-control-sm"
                                            value={addCode}
                                            onChange={(e) => setAddCode(e.target.value)}
                                        >
                                            <option value="">Select</option>
                                        </select>
                                    </div> 
                                    <div style={{minWidth: '180px'}}>
                                        <div className="d-flex align-items-center mb-1">
                                            <input 
                                                type="checkbox" 
                                                id="Item-checkbox" 
                                                className="mt-0 me-1" 
                                                style={{width: '13px', height: '13px', cursor: 'pointer'}} 
                                                checked={isItemChecked}
                                                onChange={(e) => setIsItemChecked(e.target.checked)}
                                            />
                                            <label htmlFor="Item-checkbox" className="fw-bold mb-0" style={{fontSize: '12px', cursor: 'pointer'}}>Item :</label>
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="Enter Code | Name" 
                                            className="form-control form-control-sm"
                                            value={itemCode}
                                            onChange={(e) => setItemCode(e.target.value)}
                                            disabled={!isItemChecked}
                                        />
                                    </div> 

                                    <div style={{minWidth: '120px'}}>
                                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Note Type :</label>
                                        <select 
                                            className="form-control form-control-sm"
                                            value={noteType}
                                            onChange={(e) => setNoteType(e.target.value)}
                                        >
                                            <option value="All Inv">All Inv</option>
                                        </select>
                                    </div> 
                                    <div>
                                        <button 
                                            type="button" 
                                            className="vndrbtn px-4"
                                            onClick={handleSearch}
                                            disabled={loading}
                                        >
                                            {loading ? "Searching..." : "Search"}
                                        </button> 
                                    </div>
                                </div>
                            </div>

                            {searchResults.length > 0 && (
                                <div className="mt-4">
                                    <div className="table-responsive search-results-container">
                                        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 2 }}>
            <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                                            <TableHead>
                                                <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>No.</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Invoice No</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Invoice Date</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>PO Number</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Shift Add Code</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Bill Add Code</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>HSN Code</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Item No</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Item Code</TableCell>
                                                    <TableCell style={{ minWidth: '200px' }} sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Item Desc</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Qty</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>R.Qty</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Old Rate</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Disc Per</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Disc Amt</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Dr Note No</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Rate Diff</TableCell>
                                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Select</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {searchResults.map((item, index) => {
                                                    const isAdded = debitNoteItems.some(existingItem => 
                                                        (existingItem.id && item.id && existingItem.id === item.id) ||
                                                        (existingItem.invoice_no === item.invoice_no && 
                                                         (existingItem.description || existingItem.item_description) === (item.description || item.item_description))
                                                    );
                                                    return (
                                                        <TableRow key={index} className={isAdded ? "row-added" : ""} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{index + 1}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.invoice_no || ""}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.invoice_Date || ""}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.po_no || ""}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.shift_add_code || ""}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.bill_add_code || ""}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.hsn_code || ""}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.item_no || ""}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.item_code || ""}</TableCell>
                                                            <TableCell className="text-start" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.description || item.item_description || ""}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.inv_qty || item.po_qty || item.qty || 0}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.r_qty || 0}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.rate || item.old_rate || 0}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.dis || item.disc_per || 0}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.disc_amt || 0}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.dr_note_no || ""}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.rate_diff || 0}</TableCell>
                                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                                {isAdded ? (
                                                                    <span className="text-primary fw-bold">Added</span>
                                                                ) : (
                                                                    <span 
                                                                        className="text-primary cursor-pointer fw-bold" 
                                                                        style={{ cursor: 'pointer' }}
                                                                        onClick={() => handleAddToDebitNote(item)}
                                                                    >
                                                                        Add
                                                                    </span>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
          </TableContainer>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mt-3 search-table-footer">
                                        <div className="d-flex gap-2">
                                            <span className="badge bg-info text-dark px-3 py-2">Selected Invoice For Debit Note</span>
                                            <span className="badge bg-warning text-dark px-3 py-2">Sales Return Invoices</span>
                                        </div>
                                        <div className="d-flex gap-4 align-items-center me-2">
                                            <div className="form-check d-flex align-items-center gap-1 mb-0">
                                                <input className="form-check-input mt-0" type="checkbox" id="selectAll" />
                                                <label className="form-check-label mb-0" htmlFor="selectAll" style={{ fontSize: '13px' }}>Select ALL</label>
                                            </div>
                                            <div className="form-check d-flex align-items-center gap-1 mb-0">
                                                <input className="form-check-input mt-0" type="checkbox" id="selectNew" />
                                                <label className="form-check-label mb-0" htmlFor="selectNew" style={{ fontSize: '13px' }}>Select New</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                         <div className="tab-pane fade" id="dabitnotedetails" role="tabpanel" >
                              <div className="erp-header mb-4">

                                 <div className="table-responsive">
                                  <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 2 }}>
            <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                                        <TableHead>
                                            <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>No.</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Inv.No</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Item</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>HSNCode</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Qty</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Edit</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Old Rate</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>New Rate</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Disc(%)</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Diff</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Diff.Amt</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>GRIR No.</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>GRIR Date</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>GRIR Qty</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Line No</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Po No | Date</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Amd No | Date</TableCell>
                                              <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Remark</TableCell>
                                              <TableCell style={{ width: '40px' }} sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Del</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {debitNoteItems.length > 0 ? (
                                                debitNoteItems.map((item, index) => (
                                                    <TableRow key={item.id || index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{index + 1}</TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.invoice_no || item.inv_no || ""}</TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.item_description || (typeof item.item === 'string' ? item.item : "") || item.item_name || ""}</TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.hsn_code || ""}</TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.qty || 0}</TableCell>
                                                        <TableCell style={{ cursor: 'pointer', color: 'blue' }} sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>Edit</TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.old_rate || 0}</TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                            <input 
                                                                type="text" 
                                                                className="form-control form-control-sm" 
                                                                value={item.new_rate || ""}
                                                                onChange={(e) => handleInputChange(index, 'new_rate', e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.dis || item.disc_percent || item.discount || 0}</TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                            <input 
                                                                type="text" 
                                                                className="form-control form-control-sm" 
                                                                value={item.diff || ""}
                                                                onChange={(e) => handleInputChange(index, 'diff', e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                            <input 
                                                                type="text" 
                                                                className="form-control form-control-sm" 
                                                                value={item.diff_amt || ""}
                                                                onChange={(e) => handleInputChange(index, 'diff_amt', e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                            <input 
                                                                type="text" 
                                                                className="form-control form-control-sm" 
                                                                value={item.grir_no || ""}
                                                                onChange={(e) => handleInputChange(index, 'grir_no', e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                            <input 
                                                                type="date" 
                                                                className="form-control form-control-sm" 
                                                                value={item.grir_date || ""}
                                                                onChange={(e) => handleInputChange(index, 'grir_date', e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                            <input 
                                                                type="text" 
                                                                className="form-control form-control-sm" 
                                                                value={item.grir_qty || ""}
                                                                onChange={(e) => handleInputChange(index, 'grir_qty', e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                            <input 
                                                                type="text" 
                                                                className="form-control form-control-sm" 
                                                                value={item.line_no || ""}
                                                                onChange={(e) => handleInputChange(index, 'line_no', e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                            <div className="d-flex flex-column gap-1">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control form-control-sm text-center" 
                                                                    value={item.po_no || ""}
                                                                    readOnly
                                                                />
                                                                <input 
                                                                    type="date" 
                                                                    className="form-control form-control-sm text-center" 
                                                                    value={item.po_date || item.date || ""}
                                                                    onChange={(e) => handleInputChange(index, 'po_date', e.target.value)}
                                                                />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                            <div className="d-flex flex-column gap-1">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control form-control-sm text-center" 
                                                                    value={item.amd_no || ""}
                                                                    onChange={(e) => handleInputChange(index, 'amd_no', e.target.value)}
                                                                />
                                                                <input 
                                                                    type="date" 
                                                                    className="form-control form-control-sm text-center" 
                                                                    value={item.amd_date || ""}
                                                                    onChange={(e) => handleInputChange(index, 'amd_date', e.target.value)}
                                                                />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                            <input 
                                                                type="text" 
                                                                className="form-control form-control-sm" 
                                                                value={item.remark || item.item_remark || ""}
                                                                onChange={(e) => handleInputChange(index, 'remark', e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                            <button 
                                                                className="vndrbtn btn-sm d-flex align-items-center justify-content-center mx-auto" 
                                                                style={{ width: '25px', height: '25px', padding: 0 }}
                                                                onClick={() => handleDeleteItem(index)}
                                                            >
                                                                X
                                                            </button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell colSpan="19" className="text-center" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                        {loading ? "Fetching data..." : error ? <span className="text-danger">{error}</span> : "No data found"}
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                 </Table>
          </TableContainer>
                                 </div>

                                 <div className="d-flex justify-content-between align-items-center bg-light p-2 border mt-3 fw-bold" style={{fontSize: '0.9rem'}}>
                                    <span>Debit Note / Tax Details</span>
                                    <span>Total Qty : {debitNoteItems.reduce((sum, item) => sum + parseFloat(item.qty || 0), 0).toFixed(2)}</span>
                                 </div>

                                 <div className="table-responsive mt-0">
                                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 2 }}>
            <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                                      <TableHead>
                                        <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>SubTotal</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Disc Amt</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Ass Amt</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>CGST</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>SGST</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>IGST</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>UTGST</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>TCS</TableCell>
                                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Grand Total</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                          <TableCell className="border-bottom-0" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}></TableCell>
                                          <TableCell className="border-bottom-0" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}></TableCell>
                                          <TableCell className="border-bottom-0" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}></TableCell>
                                          <TableCell className="border-bottom-0" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                            <div className="d-flex justify-content-center align-items-center">
                                              <input type="text" placeholder="00.00" className="form-control form-control-sm text-end" style={{width: "70px"}} name="cgstPct" value={summary.cgstPct} readOnly /> <span className="ms-1">%</span>
                                            </div>
                                          </TableCell>
                                          <TableCell className="border-bottom-0" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                            <div className="d-flex justify-content-center align-items-center">
                                              <input type="text" placeholder="00.00" className="form-control form-control-sm text-end" style={{width: "70px"}} name="sgstPct" value={summary.sgstPct} readOnly /> <span className="ms-1">%</span>
                                            </div>
                                          </TableCell>
                                          <TableCell className="border-bottom-0" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                            <div className="d-flex justify-content-center align-items-center">
                                              <input type="text" placeholder="00.00" className="form-control form-control-sm text-end" style={{width: "70px"}} name="igstPct" value={summary.igstPct} readOnly /> <span className="ms-1">%</span>
                                            </div>
                                          </TableCell>
                                          <TableCell className="border-bottom-0" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                            <div className="d-flex justify-content-center align-items-center">
                                              <input type="text" placeholder="00.00" className="form-control form-control-sm text-end" style={{width: "70px"}} name="utgstPct" value={summary.utgstPct} readOnly /> <span className="ms-1">%</span>
                                            </div>
                                          </TableCell>
                                          <TableCell className="border-bottom-0" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                            <div className="d-flex justify-content-center align-items-center">
                                              <input type="text" placeholder="00.00" className="form-control form-control-sm text-end" style={{width: "70px"}} name="tcsPct" value={summary.tcsPct} readOnly /> <span className="ms-1">%</span>
                                            </div>
                                          </TableCell>
                                          <TableCell className="border-bottom-0" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}></TableCell>
                                        </TableRow>
                                        <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                          <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm text-end" name="subTotal" value={summary.subTotal} readOnly /></TableCell>
                                          <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm text-end" name="discAmt" value={summary.discAmt} readOnly /></TableCell>
                                          <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm text-end" name="assAmt" value={summary.assAmt} readOnly /></TableCell>
                                          <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" placeholder="00.00" className="form-control form-control-sm text-center" name="cgstAmt" value={summary.cgstAmt} readOnly /></TableCell>
                                          <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" placeholder="00.00" className="form-control form-control-sm text-center" name="sgstAmt" value={summary.sgstAmt} readOnly /></TableCell>
                                          <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" placeholder="00.00" className="form-control form-control-sm text-center" name="igstAmt" value={summary.igstAmt} readOnly /></TableCell>
                                          <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" placeholder="00.00" className="form-control form-control-sm text-center" name="utgstAmt" value={summary.utgstAmt} readOnly /></TableCell>
                                          <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" placeholder="00.00" className="form-control form-control-sm text-center" name="tcsAmt" value={summary.tcsAmt} readOnly /></TableCell>
                                          <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" placeholder="00.00" className="form-control form-control-sm text-center" name="grandTotal" value={summary.grandTotal} readOnly /></TableCell> 
                                        </TableRow>
                                      </TableBody>
                                    </Table>
          </TableContainer>
                                 </div>

                                 <div className="d-flex align-items-center flex-nowrap mt-4 pb-2 text-start" style={{overflowX: 'auto', gap: '15px'}}>
                                    <div className="d-flex align-items-center text-nowrap">
                                      <label className="me-2 fw-bold">Bill To Add Code :</label>
                                      <select className="form-control form-control-sm me-2" style={{width: "80px"}} name="billToAddCode" value={summary.billToAddCode} onChange={handleSummaryChange}>
                                          <option value="">Select</option>
                                      </select>
                                      <input type="text" className="form-control form-control-sm" style={{width: "120px"}} readOnly value={summary.billToAddCode} />
                                    </div>
                                    
                                    <div className="d-flex align-items-center text-nowrap">
                                      <label className="me-2 fw-bold">Other Reference(s) :</label>
                                      <input type="text" className="form-control form-control-sm" style={{width: "120px"}} name="otherRef" value={summary.otherRef} onChange={handleSummaryChange} />
                                    </div>

                                    <div className="d-flex align-items-center text-nowrap">
                                      <label className="me-2 fw-bold">Remark :</label>
                                      <input type="text" className="form-control form-control-sm" style={{width: "120px"}} name="footerRemark" value={summary.footerRemark} onChange={handleSummaryChange} />
                                    </div>

                                    <div className="d-flex align-items-center text-nowrap">
                                      <label className="me-2 fw-bold">For E-Invoice :</label>
                                      <select className="form-control form-control-sm" style={{width: "120px"}} name="forEInvoice" value={summary.forEInvoice} onChange={handleSummaryChange}>
                                          <option value="B2B">Business-to-B</option>
                                          <option value="B2C">Business-to-C</option>
                                      </select>
                                    </div>

                                    <div className="d-flex align-items-center text-nowrap mx-2 flex-shrink-0">
                                      <input type="checkbox" id="isServiceInvoice" style={{width: '13px', height: '13px', cursor: 'pointer'}} name="isServiceInvoice" checked={summary.isServiceInvoice} onChange={handleSummaryChange} />
                                      <label className="mb-0 fw-bold ms-1 cursor-pointer" htmlFor="isServiceInvoice" style={{fontSize: '12px', cursor: 'pointer'}}>Is Service Invoice</label>
                                    </div>
                                    
                                    <div className="d-flex align-items-center text-nowrap">
                                      <button className="vndrbtn d-flex justify-content-center align-items-center text-nowrap me-2" style={{width: 'auto', padding: '5px 15px'}} onClick={handleSave} disabled={loading}>
                                          <span className="me-1">{loading ? "⌛" : "✔"}</span> {loading ? "Saving..." : "Save Debit Note"}
                                      </button>
                                      <button className="vndrbtn d-flex justify-content-center align-items-center text-nowrap" style={{width: 'auto', padding: '5px 15px'}} onClick={() => navigate('/DabitNoteList')}>
                                          <span className="me-1">❌</span> Cancel
                                      </button>
                                    </div>
                                 </div>

                             </div>
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


export default NewDabitNote