import { Box, Tooltip, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./DirectBill.css";
import { FaPlus, FaTrash, FaSearch, FaCheck, FaFileExcel } from "react-icons/fa";

const DirectBill = () => {
  const location = useLocation();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      id: 1,
      grNo: '',
      chalNo: '',
      poNo: '',
      itemCode: '',
      hsnCode: '',
      rate: 0,
      grnQty: 0,
      dis: 0,
      total: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      glId: '',
      remark: ''
    }
  ]);
  const [newRow, setNewRow] = useState({
    supplierName: "",
    itemName: "",
    rate: "",
    qty: "",
  });

  const [footerData, setFooterData] = useState({
    invChallanDate: "2026-05-09",
    invChallanNo: "",
    paymentTermDays: "",
    paymentDate: "2026-05-09",
    postingDate: "2026-05-09",
    otherAmount: 0,
    remark: "",
    roundOffAmt: 0,
    roundOffType: "+",
    billNo: "",
    packCharges: 0,
    transCharges: 0,
    insCharges: 0,
    instCharges: 0,
    otherCharges: 0,
    tdsPer: 0,
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  const fetchNextBillNo = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("https://sellerp-backend.onrender.com/Account/generate-bill-no/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Bill No Response:", response.data);
      const nextNo = response.data.next_bill_no || response.data.bill_no || response.data.no;
      if (nextNo) {
        setFooterData(prev => ({ ...prev, billNo: nextNo }));
      }
    } catch (error) {
      console.error("Error fetching bill no:", error);
    }
  };

  useEffect(() => {
    fetchNextBillNo();
  }, []);

  const fetchMasterDetailsForRows = async (rowsData) => {
    try {
      const updated = await Promise.all(rowsData.map(async (row) => {
        let updatedRow = { ...row };
        
        // 1. Fetch HSN Code if missing
        if (!updatedRow.hsnCode) {
          const itemCodeOnly = updatedRow.itemCode?.split(' - ')[0]?.trim();
          if (itemCodeOnly) {
            try {
              const response = await axios.get(`https://sellerp-backend.onrender.com/All_Masters/Fetch_Item_fields/?q=${encodeURIComponent(itemCodeOnly)}`);
              const data = Array.isArray(response.data) ? response.data[0] : response.data;
              if (data && data.HSN_SAC_Code) {
                updatedRow.hsnCode = data.HSN_SAC_Code;
              }
            } catch (e) {
              console.error("Error fetching HSN for item:", itemCodeOnly, e);
            }
          }
        }

        // 2. Set default CGST and SGST to 9% if both are 0 and IGST is 0
        if (parseFloat(updatedRow.cgst || 0) === 0 && parseFloat(updatedRow.sgst || 0) === 0 && parseFloat(updatedRow.igst || 0) === 0) {
          updatedRow.cgst = 9;
          updatedRow.sgst = 9;
        }

        return updatedRow;
      }));
      setRows(updated);
    } catch (err) {
      console.error("Error in fetchMasterDetailsForRows:", err);
    }
  };

  useEffect(() => {
    if (location.state && location.state.selectedInvoices) {
      const incomingInvoices = location.state.selectedInvoices;
      const mappedRows = incomingInvoices.map((inv, idx) => ({
        id: inv.id || idx + 1,
        grNo: inv.grnNo || "",
        chalNo: inv.challanNo || "",
        poNo: inv.poNo || "",
        itemCode: inv.description || "",
        hsnCode: inv.hsnCode || "",
        rate: inv.qty > 0 ? parseFloat(inv.taxableValue || 0) / parseFloat(inv.qty) : 0,
        grnQty: parseFloat(inv.qty || 0),
        dis: parseFloat(inv.dis || 0),
        total: parseFloat(inv.total || 0),
        cgst: parseFloat(inv.cgst || 0),
        sgst: parseFloat(inv.sgst || 0),
        igst: parseFloat(inv.igst || 0),
        glId: "",
        remark: "",
      }));
      
      // Load initial mapped rows first
      setRows(mappedRows);
      
      // Dynamically fetch missing HSN and apply fallback GST rates
      fetchMasterDetailsForRows(mappedRows);

      if (incomingInvoices.length > 0) {
        const first = incomingInvoices[0];
        setNewRow((prev) => ({
          ...prev,
          supplierName: first.supplier || "",
          supplierCode: first.supplierCode || "",
        }));

        setFooterData((prev) => ({
          ...prev,
          invChallanDate: first.challanDate || prev.invChallanDate,
          invChallanNo: first.challanNo || prev.invChallanNo,
          paymentTermDays: first.paymentTerms || prev.paymentTermDays,
          paymentDate: first.poDate || prev.paymentDate,
          // Mapping TOC charges if available
          otherAmount: first.otherCharges || prev.otherAmount,
          packCharges: first.packCharges || 0,
          transCharges: first.transCharges || 0,
          insCharges: first.insCharges || 0,
          instCharges: first.instCharges || 0,
          otherCharges: first.otherCharges || 0,
          tdsPer: first.tdsPer || 0,
        }));
      }
    }
  }, [location.state]);

  const handleSaveBill = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const payload = {
        plant: "SHARP",
        bill_type: "PO-GRN-BILL",
        series_no: "", // Can be filled if series state is added later
        no: footerData.invChallanNo,
        supplier_name: newRow.supplierName,
        item_name: rows[0]?.itemCode?.split(' - ')[0] || "",
        rate: Number(rows[0]?.rate) || 0,
        qty: Number(rows[0]?.grnQty) || 0,
        fwd_charges: 0,
        transport_charged: 0,
        insurence: 0,
        installation_charges: 0,
        other_charges: Number(footerData.otherAmount) || 0,
        challan_date: footerData.invChallanDate,
        payment_days_terms: Number(footerData.paymentTermDays) || 0,
        tds: 0,
        sub_total: Number(totals.basicTotal),
        challan_no: footerData.invChallanNo,
        payment_date: footerData.paymentDate,
        other_amt: Number(footerData.otherAmount) || 0,
        assable_value: Number(totals.basicTotal),
        posting_date: footerData.postingDate,
        round_of_amt: Number(footerData.roundOffAmt) || 0,
        net_total: Number(totals.finalAmount),
        remark: footerData.remark,
        no: footerData.billNo,
        
        // Master TOC Fields
        TOC_PackCharges: Number(footerData.packCharges) || 0,
        TOC_TransportCost: Number(footerData.transCharges) || 0,
        TOC_Insurance: Number(footerData.insCharges) || 0,
        TOC_InstallationCharges: Number(footerData.instCharges) || 0,
        TOC_TDS: Number(footerData.tdsPer) || 0,
        
        items: rows.map(row => ({
          grn_no: row.grNo,
          chall_no: row.chalNo,
          po_no: row.poNo,
          item_code: row.itemCode?.split(' - ')[0] || "",
          item_no: "", // Internal ID if needed
          item_description: row.itemCode?.split(' - ')[1] || row.itemCode || "",
          hsn_code: row.hsnCode,
          rate: Number(row.rate),
          grn_qty: Number(row.grnQty),
          discount: Number(row.dis) || 0,
          cgst: Number(row.cgst) || 0,
          sgst: Number(row.sgst) || 0,
          igst: Number(row.igst) || 0,
          cgst_amt: Number((row.total * (row.cgst / 100)).toFixed(2)),
          sgst_amt: Number((row.total * (row.sgst / 100)).toFixed(2)),
          igst_amt: Number((row.total * (row.igst / 100)).toFixed(2)),
          total: Number(row.total.toFixed(2)),
          glid: row.glId,
          remark: row.remark
        }))
      };

      const response = await axios.post("https://sellerp-backend.onrender.com/Account/bill-register/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.data.stat || response.status === 200 || response.status === 201) {
        alert("Bill Registered Successfully!");
        setShowConfirmModal(false);
        fetchNextBillNo();
        
        // Reset Page State (Clear all data)
        setRows([
          {
            id: 1,
            grNo: '',
            chalNo: '',
            poNo: '',
            itemCode: '',
            hsnCode: '',
            rate: 0,
            grnQty: 0,
            dis: 0,
            total: 0,
            cgst: 0,
            sgst: 0,
            igst: 0,
            glId: '',
            remark: ''
          }
        ]);
        setNewRow({
          supplierName: "",
          itemName: "",
          rate: "",
          qty: "",
          supplierCode: ""
        });
        setFooterData({
          invChallanDate: new Date().toISOString().split('T')[0],
          invChallanNo: "",
          paymentTermDays: "",
          paymentDate: new Date().toISOString().split('T')[0],
          postingDate: new Date().toISOString().split('T')[0],
          otherAmount: 0,
          remark: "",
          roundOffAmt: 0,
          roundOffType: "+",
          billNo: "", // Temporarily clear, will be refilled by next call
        });
        fetchNextBillNo(); // Fetch AFTER reset to avoid overwrite
      } else {
        const errorMsg = response.data.message || response.data.error || "Failed to register bill";
        alert("Error: " + errorMsg);
      }
    } catch (error) {
      console.error("Save Bill Error:", error);
      const errorMsg = error.response?.data?.message || error.response?.data?.error || JSON.stringify(error.response?.data) || error.message || "Failed to register bill. Please try again.";
      alert("Save Failed: " + errorMsg);
    }
  };

  const handleAddRow = () => {
    if (!newRow.itemName) return;
    const itemTotal = parseFloat(newRow.rate) * parseFloat(newRow.qty);
    const id = Date.now();
    setRows([...rows, {
      id,
      grNo: '',
      chalNo: '',
      poNo: '',
      itemCode: newRow.itemName,
      hsnCode: '',
      rate: parseFloat(newRow.rate),
      grnQty: parseFloat(newRow.qty),
      dis: 0,
      total: itemTotal,
      cgst: 0,
      sgst: 0,
      igst: 0,
      glId: '',
      remark: ''
    }]);
    setNewRow({ supplierName: '', itemName: '', rate: 0, qty: 0 });
  };

  const handleRowChange = (id, field, value) => {
    setRows(prevRows => prevRows.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        // Recalculate total if rate, qty, or dis changes
        if (field === 'rate' || field === 'grnQty' || field === 'dis') {
          const rate = parseFloat(updatedRow.rate || 0);
          const qty = parseFloat(updatedRow.grnQty || 0);
          const dis = parseFloat(updatedRow.dis || 0);
          updatedRow.total = (rate * qty) - ((rate * qty) * (dis / 100));
        }
        return updatedRow;
      }
      return row;
    }));
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const calculateTotals = () => {
    let basicTotal = rows.reduce((acc, row) => acc + row.total, 0);
    let cgstTotal = rows.reduce((acc, row) => acc + (row.total * (row.cgst / 100)), 0);
    let sgstTotal = rows.reduce((acc, row) => acc + (row.total * (row.sgst / 100)), 0);
    let igstTotal = rows.reduce((acc, row) => acc + (row.total * (row.igst / 100)), 0);
    let taxTotal = cgstTotal + sgstTotal + igstTotal;
    
    // Sum of all TOC charges
    let totalOtherCharges = parseFloat(footerData.packCharges || 0) + 
                            parseFloat(footerData.transCharges || 0) + 
                            parseFloat(footerData.insCharges || 0) + 
                            parseFloat(footerData.instCharges || 0) + 
                            parseFloat(footerData.otherCharges || 0);

    let finalAmount = basicTotal + taxTotal + totalOtherCharges;

    if (footerData.roundOffType === "+") finalAmount += parseFloat(footerData.roundOffAmt || 0);
    else finalAmount -= parseFloat(footerData.roundOffAmt || 0);

    return {
      basicTotal: basicTotal.toFixed(2),
      cgstTotal: cgstTotal.toFixed(2),
      sgstTotal: sgstTotal.toFixed(2),
      igstTotal: igstTotal.toFixed(2),
      taxTotal: taxTotal.toFixed(2),
      finalAmount: finalAmount.toFixed(2),
    };
  };

  const totals = calculateTotals();

  return (
    <div className="erp-page direct-bill">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="bill-register-container">
                  {/* Header */}
                  <div className="erp-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-3 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          Bill Register
                        </Typography>
                      </div>
                      <div className="col-md-9 text-end d-flex justify-content-end gap-3 align-items-center flex-wrap">
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap small fw-bold">Plant :</label>
                          <select className="form-select form-select-sm" style={{ width: '110px', height: '38px', borderRadius: '8px' }}>
                            <option>SHARP</option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap small fw-bold">Bill Type :</label>
                          <select className="form-select form-select-sm" style={{ width: '110px', height: '38px', borderRadius: '8px' }}>
                            <option>Select</option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap small fw-bold">Series No :</label>
                          <select className="form-select form-select-sm" style={{ width: '110px', height: '38px', borderRadius: '8px' }}>
                            <option></option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap small fw-bold">No :</label>
                          <input type="text" className="form-control form-control-sm" value={footerData.billNo} readOnly style={{ width: '90px', height: '38px', borderRadius: '8px' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input Search Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
    <div className="card-body">
      
                    <div className="row g-3 align-items-end justify-content-start">
                      <div className="col-md-3">
                        <label className="form-label small fw-bold mb-1 text-start d-block">Supplier Name :</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="ENTER SUPPLIER NAME.."
                          value={newRow.supplierName}
                          onChange={(e) => setNewRow({ ...newRow, supplierName: e.target.value })}
                          
                        />
                      </div>
                      <div className="col-auto d-flex align-items-end">
                        <button className="vndrbtn bg-success border-success">
    <FaSearch className="me-2" /> Search
  </button>
                      </div>
                      <div className="col-md-3 ms-md-4">
                        <label className="form-label small fw-bold mb-1 text-start d-block">Item Name :</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Enter Item Code.."
                          value={newRow.itemName}
                          onChange={(e) => setNewRow({ ...newRow, itemName: e.target.value })}
                          
                        />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label small fw-bold mb-1 text-start d-block">Rate :</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={newRow.rate}
                          onChange={(e) => setNewRow({ ...newRow, rate: e.target.value })}
                          
                        />
                      </div>
                      <div className="col-md-1">
                        <label className="form-label small fw-bold mb-1 text-start d-block">Qty :</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={newRow.qty}
                          onChange={(e) => setNewRow({ ...newRow, qty: e.target.value })}
                          
                        />
                      </div>
                      <div className="col-auto d-flex align-items-end ms-auto">
                        <button className="vndrbtn bg-primary" onClick={handleAddRow}>
    <FaPlus className="me-2" /> Add
  </button>
                      </div>
                    </div>
                  
    </div>
  </div>

                  {/* Table Section */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
    <div className="card-body p-0">
      <div className="table-responsive">
        <table className="table table-bordered align-middle mb-0">
          
                      <thead className="table-light">
                        <tr>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Sr.</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>GrNo</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>ChalNo</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>PO No</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Item Code/Desc</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>HSN Code</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Rate</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>GRN Qty</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Dis (%)</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Total</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>CGST (%)</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>SGST (%)</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>IGST (%)</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>GLId</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Remark</th>
                          <th style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", backgroundColor: "#f8fafc", color: "#475569" }}>Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr key={row.id}>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>{index + 1}</td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" value={row.grNo} onChange={(e) => handleRowChange(row.id, 'grNo', e.target.value)} /></td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" value={row.chalNo} onChange={(e) => handleRowChange(row.id, 'chalNo', e.target.value)} /></td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" value={row.poNo} onChange={(e) => handleRowChange(row.id, 'poNo', e.target.value)} /></td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}><input type="text" className="form-control form-control-sm border-0 bg-transparent" value={row.itemCode} onChange={(e) => handleRowChange(row.id, 'itemCode', e.target.value)} /></td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}><input type="text" className="form-control form-control-sm text-center" value={row.hsnCode} onChange={(e) => handleRowChange(row.id, 'hsnCode', e.target.value)} /></td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}><input type="number" className="form-control form-control-sm text-center" value={row.rate} onChange={(e) => handleRowChange(row.id, 'rate', e.target.value)} /></td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}><input type="number" className="form-control form-control-sm text-center" value={row.grnQty} onChange={(e) => handleRowChange(row.id, 'grnQty', e.target.value)} /></td>
                             <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>
                               <div className="d-flex flex-column align-items-center">
                                 <div className="d-flex align-items-center justify-content-center mb-1">
                                   <input 
                                     type="number" 
                                     className="form-control form-control-sm text-center" 
                                     style={{ width: '55px', height: '22px', fontSize: '10px' }} 
                                     value={row.dis} 
                                     onChange={(e) => handleRowChange(row.id, 'dis', e.target.value)} 
                                   />
                                   <span className="ms-1 small">%</span>
                                 </div>
                                 <input 
                                   type="text" 
                                   className="form-control form-control-sm text-center border-0 bg-light py-0" 
                                   style={{ width: '70px', height: '18px', fontSize: '10px' }} 
                                   value={((row.rate * row.grnQty) * (row.dis / 100)).toFixed(2)} 
                                   readOnly 
                                 />
                               </div>
                             </td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}><input type="number" className="form-control form-control-sm text-end border-0 bg-transparent fw-bold" readOnly value={row.total.toFixed(2)} /></td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>
                               <div className="d-flex flex-column align-items-center">
                                 <div className="d-flex align-items-center justify-content-center mb-1">
                                   <input 
                                     type="number" 
                                     className="form-control form-control-sm text-center" 
                                     style={{ width: '55px', height: '22px', fontSize: '10px' }} 
                                     value={row.cgst} 
                                     onChange={(e) => handleRowChange(row.id, 'cgst', e.target.value)} 
                                   />
                                   <span className="ms-1 small">%</span>
                                 </div>
                                 <input 
                                   type="text" 
                                   className="form-control form-control-sm text-center border-0 bg-light py-0" 
                                   style={{ width: '70px', height: '18px', fontSize: '10px' }} 
                                   value={(row.total * (row.cgst / 100)).toFixed(2)} 
                                   readOnly 
                                 />
                               </div>
                             </td>
                             <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>
                               <div className="d-flex flex-column align-items-center">
                                 <div className="d-flex align-items-center justify-content-center mb-1">
                                   <input 
                                     type="number" 
                                     className="form-control form-control-sm text-center" 
                                     style={{ width: '55px', height: '22px', fontSize: '10px' }} 
                                     value={row.sgst} 
                                     onChange={(e) => handleRowChange(row.id, 'sgst', e.target.value)} 
                                   />
                                   <span className="ms-1 small">%</span>
                                 </div>
                                 <input 
                                   type="text" 
                                   className="form-control form-control-sm text-center border-0 bg-light py-0" 
                                   style={{ width: '70px', height: '18px', fontSize: '10px' }} 
                                   value={(row.total * (row.sgst / 100)).toFixed(2)} 
                                   readOnly 
                                 />
                               </div>
                             </td>
                             <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>
                               <div className="d-flex flex-column align-items-center">
                                 <div className="d-flex align-items-center justify-content-center mb-1">
                                   <input 
                                     type="number" 
                                     className="form-control form-control-sm text-center" 
                                     style={{ width: '55px', height: '22px', fontSize: '10px' }} 
                                     value={row.igst} 
                                     onChange={(e) => handleRowChange(row.id, 'igst', e.target.value)} 
                                   />
                                   <span className="ms-1 small">%</span>
                                 </div>
                                 <input 
                                   type="text" 
                                   className="form-control form-control-sm text-center border-0 bg-light py-0" 
                                   style={{ width: '70px', height: '18px', fontSize: '10px' }} 
                                   value={(row.total * (row.igst / 100)).toFixed(2)} 
                                   readOnly 
                                 />
                               </div>
                             </td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>
                              <select className="form-select form-select-sm" value={row.glId} onChange={(e) => handleRowChange(row.id, 'glId', e.target.value)}>

                                <option value="">Select an ...</option>
                                <option value="GL001">GL Master 1</option>
                              </select>
                            </td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}><textarea className="form-control form-control-sm" rows="1" value={row.remark} onChange={(e) => handleRowChange(row.id, 'remark', e.target.value)}></textarea></td>
                            <td style={{ fontSize: "0.75rem", padding: "12px 16px", textAlign: "center", color: "#475569" }}>
                              <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDeleteRow(row.id)} />
                            </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    
        </table>
      </div>
    </div>
  </div>

                  {/* Orange Totals Bar */}
                  <div className="totals-bar d-flex justify-content-around text-white p-2 mb-3 rounded shadow-sm" style={{ backgroundColor: '#ff9800', fontSize: '11px' }}>
                    <div className="text-center">
                      <div className="fw-bold">Total :</div>
                      <div style={{ height: '14px' }}>{totals.basicTotal}</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">Dis Tot :</div>
                      <div style={{ height: '14px' }}>0.00</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">Basic Tot :</div>
                      <div style={{ height: '14px' }}>{totals.basicTotal}</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">CGST Total :</div>
                      <div style={{ height: '14px' }}>{totals.cgstTotal}</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">SGST Total :</div>
                      <div style={{ height: '14px' }}>{totals.sgstTotal}</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">IGST Total :</div>
                      <div style={{ height: '14px' }}>{totals.igstTotal}</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">Total Tax :</div>
                      <div style={{ height: '14px' }}>{totals.taxTotal}</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">Other Charges :</div>
                      <div style={{ height: '14px' }}>
                        {(parseFloat(footerData.packCharges || 0) + 
                          parseFloat(footerData.transCharges || 0) + 
                          parseFloat(footerData.insCharges || 0) + 
                          parseFloat(footerData.instCharges || 0) + 
                          parseFloat(footerData.otherCharges || 0)).toFixed(2)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">Final Amount :</div>
                      <div className="fw-bold" style={{ height: '14px' }}>{totals.finalAmount}</div>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                    <div className="row g-4">
                      {/* TOC Column */}
                      <div className="col-md-3 border-end pe-3">
                        {[
                          { label: 'Pack. & Fwrd Charges :', key: 'packCharges' },
                          { label: 'Transport Charges :', key: 'transCharges' },
                          { label: 'Insurance :', key: 'insCharges' },
                          { label: 'Installation Charges :', key: 'instCharges' },
                          { label: 'Other Charges :', key: 'otherCharges' }
                        ].map((item, idx) => (
                          <div className="d-flex align-items-center mb-2" key={idx}>
                            <input type="checkbox" className="form-check-input me-2 mt-0" style={{ cursor: 'pointer' }} />
                            <label className="mb-0 flex-grow-1 text-secondary" style={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.label}</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm text-end" 
                              style={{ width: '90px', height: '28px', borderRadius: '6px' }} 
                              value={footerData[item.key] || ''}
                              onChange={(e) => setFooterData({ ...footerData, [item.key]: e.target.value })}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Dates & Terms Column */}
                      <div className="col-md-3 border-end px-3">
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 text-secondary" style={{ width: '120px', fontSize: '0.75rem', fontWeight: 600 }}>Inv./Challan Date :</label>
                          <input type="date" className="form-control form-control-sm flex-grow-1" value={footerData.invChallanDate} onChange={(e) => setFooterData({ ...footerData, invChallanDate: e.target.value })} style={{ height: '28px', borderRadius: '6px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 text-secondary" style={{ width: '120px', fontSize: '0.75rem', fontWeight: 600 }}>Payment Term Days :</label>
                          <input type="text" className="form-control form-control-sm flex-grow-1 text-end" value={footerData.paymentTermDays} onChange={(e) => setFooterData({ ...footerData, paymentTermDays: e.target.value })} style={{ height: '28px', borderRadius: '6px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div className="d-flex align-items-center gap-2" style={{ width: '120px' }}>
                            <input type="checkbox" className="form-check-input mt-0" style={{ cursor: 'pointer' }} />
                            <label className="mb-0 text-secondary" style={{ fontSize: '0.75rem', fontWeight: 600 }}>TDS % :</label>
                          </div>
                          <div className="d-flex gap-1 flex-grow-1">
                            <input 
                              type="text" 
                              className="form-control form-control-sm text-end" 
                              style={{ width: '40px', height: '28px', borderRadius: '6px' }} 
                              value={footerData.tdsPer || ''}
                              onChange={(e) => setFooterData({ ...footerData, tdsPer: e.target.value })}
                            />
                            <select className="form-select form-select-sm flex-grow-1" style={{ height: '28px', borderRadius: '6px', fontSize: '0.75rem' }}>
                              <option>Select</option>
                            </select>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-2 mt-3">
                          <label className="mb-0 text-dark" style={{ width: '120px', fontSize: '0.8rem', fontWeight: 700 }}>Sub Total :</label>
                          <input type="text" className="form-control form-control-sm flex-grow-1 text-end fw-bold" style={{ height: '28px', borderRadius: '6px', backgroundColor: '#e2e8f0', border: 'none' }} value={totals.basicTotal} readOnly />
                        </div>
                      </div>

                      {/* Invoice & Other Column */}
                      <div className="col-md-3 border-end px-3">
                          <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 text-secondary" style={{ width: '110px', fontSize: '0.75rem', fontWeight: 600 }}>Inv./Challan No :</label>
                          <input type="text" className="form-control form-control-sm flex-grow-1" value={footerData.invChallanNo || ''} onChange={(e) => setFooterData({ ...footerData, invChallanNo: e.target.value })} style={{ height: '28px', borderRadius: '6px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 text-secondary" style={{ width: '110px', fontSize: '0.75rem', fontWeight: 600 }}>Payment Date :</label>
                          <input type="date" className="form-control form-control-sm flex-grow-1" value={footerData.paymentDate || ''} onChange={(e) => setFooterData({ ...footerData, paymentDate: e.target.value })} style={{ height: '28px', borderRadius: '6px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 text-secondary" style={{ width: '110px', fontSize: '0.75rem', fontWeight: 600 }}>Other Amount :</label>
                          <input type="text" className="form-control form-control-sm flex-grow-1 text-end" defaultValue="0" style={{ height: '28px', borderRadius: '6px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 text-secondary" style={{ width: '110px', fontSize: '0.75rem', fontWeight: 600 }}>Assessable Val :</label>
                          <input type="text" className="form-control form-control-sm flex-grow-1 text-end" style={{ height: '28px', borderRadius: '6px' }} />
                        </div>
                      </div>

                      {/* Posting & Total Column */}
                      <div className="col-md-3 ps-3">
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 text-secondary" style={{ width: '110px', fontSize: '0.75rem', fontWeight: 600 }}>Posting Date :</label>
                          <input type="date" className="form-control form-control-sm flex-grow-1" defaultValue="2026-05-09" style={{ height: '28px', borderRadius: '6px' }} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div className="d-flex align-items-center gap-2" style={{ width: '110px' }}>
                            <input type="checkbox" className="form-check-input mt-0" style={{ cursor: 'pointer' }} />
                            <label className="mb-0 text-secondary" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Round Off :</label>
                          </div>
                          <div className="d-flex gap-2 flex-grow-1 align-items-center">
                            <span className="fw-bold text-secondary" style={{ fontSize: '0.75rem' }}>+/-</span>
                            <input type="text" className="form-control form-control-sm flex-grow-1 text-end" style={{ height: '28px', borderRadius: '6px' }} defaultValue="0" />
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{ width: '110px' }}></div>
                          <select className="form-select form-select-sm flex-grow-1" style={{ height: '28px', borderRadius: '6px', fontSize: '0.75rem' }}>
                            <option>Select</option>
                          </select>
                        </div>
                        <div className="d-flex align-items-center mb-3 mt-3 p-2 rounded" style={{ backgroundColor: '#e2e8f0' }}>
                          <label className="mb-0 text-dark" style={{ width: '100px', fontSize: '0.85rem', fontWeight: 800 }}>Net TOTAL :</label>
                          <input type="text" className="form-control form-control-sm flex-grow-1 text-end fw-bold text-primary bg-transparent border-0 fs-6" value={totals.finalAmount} readOnly />
                        </div>
                         <div className="d-flex justify-content-end mt-2">
                          <Button variant="contained" onClick={() => setShowConfirmModal(true)} size="small" sx={{ textTransform: 'none', fontSize: '0.75rem', fontWeight: 600, background: 'linear-gradient(to right, #10b981, #059669)', color: 'white', px: 2, py: 0.5, borderRadius: '6px', boxShadow: '0 4px 10px 0 rgba(16, 185, 129, 0.3)', transition: 'all 0.2s ease', '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)', boxShadow: '0 6px 15px rgba(16, 185, 129, 0.4)' } }} startIcon={<span style={{ fontWeight: 'bold' }}>✔</span>}>Confirm To Save</Button>
                        </div>
                      </div>
                    </div>
                  </Paper>
                    {/* Confirmation Modal */}
                    {showConfirmModal && (
                      <div className="custom-modal-overlay">
                        <div className="custom-modal-content">
                          <div className="custom-modal-header d-flex justify-content-between align-items-center">
                            <span>Message</span>
                            <IconButton onClick={() => setShowConfirmModal(false)} size="small" sx={{ color: '#94a3b8', '&:hover': { background: '#f1f5f9', color: '#475569' } }}><CancelIcon fontSize="small" /></IconButton>
                          </div>
                          <div className="custom-modal-body p-3">
                            <div className="row mb-3 border-bottom pb-2">
                              <div className="col-md-5">
                                <div className="d-flex mb-1">
                                  <span className="fw-bold me-2" style={{ width: '100px' }}>Supp Name :</span>
                                  <span>{newRow.supplierName}</span>
                                </div>
                                <div className="d-flex">
                                  <span className="fw-bold me-2" style={{ width: '100px' }}>Bill No :</span>
                                  <span>{footerData.invChallanNo || "262700105"}</span>
                                </div>
                              </div>
                              <div className="col-md-7 text-end">
                                <div className="d-flex justify-content-end">
                                  <span className="fw-bold me-2">Bill Date :</span>
                                  <span>{new Date().toLocaleDateString('en-GB')}</span>
                                </div>
                              </div>
                            </div>

                            <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>
  <TableContainer sx={{ maxHeight: 500, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>
    <Table stickyHeader size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>No.</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>ItemCode</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>ItemDesc</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>HSN Code</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Total</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>CGSTAmt</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>SGSTAmt</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>IGSTAmt</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>GLName</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {rows.map((row, idx) => (
                                    <TableRow key={idx}>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{idx + 1}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{row.itemCode}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{row.itemCode}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{row.hsnCode}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{row.total.toFixed(2)}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{(row.total * (row.cgst / 100)).toFixed(2)}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{(row.total * (row.sgst / 100)).toFixed(2)}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{(row.total * (row.igst / 100)).toFixed(2)}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{row.glId || "Purchase Rm"}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
  </TableContainer>
</Paper>

                            <div className="modal-summary-footer p-2 border rounded">
                              <div className="row g-2 text-center" style={{ fontSize: '11px' }}>
                                <div className="col"><div className="fw-bold border-bottom mb-1">Basic Tot :</div>{totals.basicTotal}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">CGST Amt :</div>{totals.cgstTotal}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">SGST Amt :</div>{totals.sgstTotal}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">IGST Amt :</div>{totals.igstTotal}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">Bill Amt :</div>{totals.finalAmount}</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">TDS :</div>0</div>
                                <div className="col"><div className="fw-bold border-bottom mb-1">Other :</div>0</div>
                                <div className="col bg-primary text-white py-1 rounded">
                                  <div className="fw-bold mb-1">Final Total :</div>
                                  <div className="h6 mb-0">{totals.finalAmount}</div>
                                </div>
                                <div className="col-auto d-flex align-items-center gap-2">
                                  <Button variant="contained" onClick={handleSaveBill} sx={{ height: '32px', borderRadius: '8px', textTransform: 'none', fontSize: '0.8rem', fontWeight: 600, background: 'linear-gradient(to right, #10b981, #059669)', color: 'white', boxShadow: 'none', transition: 'all 0.2s ease', '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)' } }}>Save BILL</Button>
                                  <Button variant="outlined" onClick={() => setShowConfirmModal(false)} sx={{ height: '32px', borderRadius: '8px', textTransform: 'none', fontSize: '0.8rem', fontWeight: 600, borderColor: '#cbd5e1', color: '#475569', '&:hover': { background: '#f1f5f9', borderColor: '#94a3b8' } }}>Cancel</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Remark Row */}
                    <div className="row g-0 align-items-center mt-1 pt-2 border-top">
                      <div className="col-auto me-2">
                        <label className="fw-bold" style={{ fontSize: '11px' }}>Remark :</label>
                      </div>
                       <div className="col-md-6">
                        <textarea className="form-control form-control-sm" rows="2" style={{ resize: 'none', height: '40px', fontSize: '11px' }} placeholder="Enter any additional remarks..." value={footerData.remark} onChange={(e) => setFooterData({ ...footerData, remark: e.target.value })}></textarea>
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

export default DirectBill;
