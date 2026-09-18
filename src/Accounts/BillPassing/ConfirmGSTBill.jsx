import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./ConfirmGSTBill.css";
import { FaPlus, FaTrash, FaCheck, FaFileAlt, FaSyncAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

const ConfirmGSTBill = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [billPNo, setBillPNo] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("Select");
  const [loading, setLoading] = useState(false);

  const [footerData, setFooterData] = useState({
    invChallanNo: "",
    invChallanDate: "",
    paymentTermDays: "60",
    paymentDate: "",
    postingDate: new Date().toISOString().split('T')[0],
    remark: "",
    otherAmount: 0,
    roundOffAmt: 0,
    roundOffType: "+",
    roundOffApplied: false,
    tdsRate: 0,
    tcsRate: 0,
    tdsAmt: 0,
    tcsAmt: 0,
    tdsApplied: false,
    tdsSection: "Select",
    tcsSection: "Select",
    packApplied: false, packAmt: 0,
    transApplied: false, transAmt: 0,
    insApplied: false, insAmt: 0,
    instApplied: false, instAmt: 0,
    othApplied: false, othAmt: 0,
    subTotal: "0.00",
    basicTot: "0.00",
    finalAmt: "0.00",
    supplier: ""
  });

  const fetchNextBillNo = async () => {
    try {
      const response = await axios.get("https://sellerp-backend.onrender.com/Account/genrate-jobwork-bill-no/");
      const nextNo = response.data.next_bill_no || response.data.bill_no || response.data.no;
      if (nextNo) {
        setBillPNo(nextNo);
      }
    } catch (error) {
      console.error("Error fetching bill no:", error);
    }
  };

  useEffect(() => {
    fetchNextBillNo();
  }, []);

  useEffect(() => {
    if (location.state && location.state.selectedInvoices) {
      const invoices = location.state.selectedInvoices;
      const mappedRows = invoices.map((inv, idx) => {
        const qty = parseFloat(inv.qty || 0);
        const rate = parseFloat(inv.rate || 0);
        const total = qty * rate;
        const igst = parseFloat(inv.igst || 0);
        const cgst = parseFloat(inv.cgst || 0);
        const sgst = parseFloat(inv.sgst || 0);
        
        return {
          id: idx + 1,
          grnNo: inv.grnNo,
          grnDate: inv.grnDate,
          chalNo: inv.vendChNo,
          chalDate: inv.chDate,
          poNo: inv.poNo,
          poDate: inv.poDate,
          itemNo: inv.itemNo,
          itemCode: inv.itemCode,
          itemDesc: inv.itemDesc,
          hsnCode: inv.hsnCode,
          rate: rate,
          grnQty: qty,
          challanQty: qty,
          disc: 0,
          discAmt: 0,
          total: total,
          cgst: cgst,
          cgstAmt: (total * cgst) / 100,
          sgst: sgst,
          sgstAmt: (total * sgst) / 100,
          igst: igst,
          igstAmt: (total * igst) / 100,
          glId: "Services Purcha",
          tds: false
        };
      });
      setRows(mappedRows);

      if (invoices.length > 0) {
        const first = invoices[0];
        setFooterData(prev => ({
          ...prev,
          supplier: first.vendor,
          invChallanNo: first.vendChNo,
          invChallanDate: formatDateToISO(first.chDate),
          paymentDate: formatDateToISO(first.chDate),
          postingDate: new Date().toISOString().split('T')[0]
        }));
      }
    }
  }, [location.state]);

  const formatDateToISO = (dateStr) => {
    if (!dateStr) return "";
    // If already YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    // If DD/MM/YYYY or DD-MM-YYYY
    const parts = dateStr.split(/[/-]/);
    if (parts.length === 3) {
      // Handle YYYY-MM-DD or DD-MM-YYYY
      if (parts[0].length === 4) return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return dateStr;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const totals = calculateTotals();
      
      const payload = {
        plant: "SHARP",
        bill_type: "JOBWORK-BILL",
        series_no: selectedSeries === "Select" ? "" : selectedSeries,
        bill_no: billPNo,
        supplier: footerData.supplier,
        inv_challan_no: footerData.invChallanNo,
        inv_challan_date: formatDateToISO(footerData.invChallanDate),
        payment_terms_days: Number(footerData.paymentTermDays) || 0,
        payment_date: formatDateToISO(footerData.paymentDate) || formatDateToISO(footerData.invChallanDate),
        posting_date: formatDateToISO(footerData.postingDate),
        remark: footerData.remark,
        
        // Totals
        total_qty: Number(totals.totalQty) || 0,
        sub_total: Number(totals.subTotal) || 0,
        assable_value: Number(totals.basicTot) || 0,
        basic_total: Number(totals.basicTot) || 0,
        cgst_total: rows.reduce((acc, r) => acc + (parseFloat(r.cgstAmt) || 0), 0),
        sgst_total: rows.reduce((acc, r) => acc + (parseFloat(r.sgstAmt) || 0), 0),
        igst_total: Number(totals.igstTotal) || 0,
        total_tax: Number(totals.taxTotal) || 0,
        bill_amount: Number(totals.billAmt) || 0,
        final_amount: Number(totals.finalAmt) || 0,
        grand_total: Number(totals.finalAmt) || 0,
        
        // Charges
        round_of_amt: Number(footerData.roundOffAmt) || 0,
        round_off_type: footerData.roundOffType,
        tds_amt: Number(footerData.tdsAmt) || 0,
        tcs_amt: Number(footerData.tcsAmt) || 0,
        pack_forward_charge: footerData.packApplied ? Number(footerData.packAmt) : 0,
        transport_charge: footerData.transApplied ? Number(footerData.transAmt) : 0,
        insurance: footerData.insApplied ? Number(footerData.insAmt) : 0,
        installation_charge: footerData.instApplied ? Number(footerData.instAmt) : 0,
        ohter_amount: footerData.othApplied ? Number(footerData.othAmt) : 0,

        items: rows.map(row => ({
          grn_no: row.grnNo,
          chal_no: row.chalNo,
          po_no: row.poNo,
          item_no: row.itemNo,
          item_code: row.itemCode,
          item_description: row.itemDesc,
          hsn_code: row.hsnCode,
          rate: Number(row.rate) || 0,
          grn_qty: Number(row.grnQty) || 0,
          challan_qty: Number(row.challanQty) || 0,
          dis: Number(row.disc) || 0,
          dis_amt: Number(row.discAmt) || 0,
          total: Number(row.total) || 0,
          cgst: Number(row.cgst) || 0,
          cgst_amt: Number(row.cgstAmt) || 0,
          sgst: Number(row.sgst) || 0,
          sgst_amt: Number(row.sgstAmt) || 0,
          igst: Number(row.igst) || 0,
          igst_amt: Number(row.igstAmt) || 0,
          glid: row.glId,
          tds: row.tds
        }))
      };

      console.log("Saving Jobwork Bill Payload:", JSON.stringify(payload, null, 2));

      const response = await axios.post("https://sellerp-backend.onrender.com/Account/jobwork-bill-register/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.status === 200 || response.status === 201 || response.data.stat) {
        alert("Jobwork Bill Saved Successfully!");
        navigate("/jobwork-bill");
      }
    } catch (error) {
      console.error("Error saving jobwork bill:", error);
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        alert(`Failed to save: ${JSON.stringify(error.response.data)}`);
      } else {
        alert("Failed to save bill. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    
    // Recalculate totals for this row
    if (['rate', 'grnQty', 'disc', 'cgst', 'sgst', 'igst'].includes(field)) {
      const r = updatedRows[index];
      const sub = parseFloat(r.grnQty || 0) * parseFloat(r.rate || 0);
      r.total = sub - parseFloat(r.discAmt || 0);
      r.cgstAmt = (r.total * parseFloat(r.cgst || 0)) / 100;
      r.sgstAmt = (r.total * parseFloat(r.sgst || 0)) / 100;
      r.igstAmt = (r.total * parseFloat(r.igst || 0)) / 100;
    }
    
    setRows(updatedRows);
  };

  const handleFooterChange = (field, value) => {
    setFooterData({ ...footerData, [field]: value });
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

  const calculateTotals = () => {
    const totalQty = rows.reduce((acc, row) => acc + row.grnQty, 0);
    const subTotalCalc = rows.reduce((acc, row) => acc + row.total, 0);
    const igstTotal = rows.reduce((acc, row) => acc + row.igstAmt, 0);
    const taxTotal = igstTotal; 

    const tocTotal = (footerData.packApplied ? parseFloat(footerData.packAmt || 0) : 0) +
                     (footerData.transApplied ? parseFloat(footerData.transAmt || 0) : 0) +
                     (footerData.insApplied ? parseFloat(footerData.insAmt || 0) : 0) +
                     (footerData.instApplied ? parseFloat(footerData.instAmt || 0) : 0) +
                     (footerData.othApplied ? parseFloat(footerData.othAmt || 0) : 0);

    const billAmt = subTotalCalc + taxTotal + tocTotal + parseFloat(footerData.otherAmount || 0);
    const roundOff = footerData.roundOffApplied ? (footerData.roundOffType === "+" ? parseFloat(footerData.roundOffAmt || 0) : -parseFloat(footerData.roundOffAmt || 0)) : 0;
    const finalAmtCalc = billAmt + roundOff - (footerData.tdsApplied ? parseFloat(footerData.tdsAmt || 0) : 0);

    return {
      totalQty,
      subTotal: subTotalCalc.toFixed(2),
      basicTot: (subTotalCalc + tocTotal).toFixed(2),
      igstTotal: igstTotal.toFixed(2),
      taxTotal: taxTotal.toFixed(2),
      billAmt: billAmt.toFixed(2),
      finalAmt: finalAmtCalc.toFixed(2)
    };
  };

  const totals = calculateTotals();

  // Sync calculated totals to footerData when rows/charges change, but allow user override
  useEffect(() => {
    setFooterData(prev => ({
      ...prev,
      subTotal: totals.subTotal,
      basicTot: totals.basicTot,
      finalAmt: totals.finalAmt
    }));
  }, [rows, footerData.packApplied, footerData.packAmt, footerData.transApplied, footerData.transAmt, footerData.insApplied, footerData.insAmt, footerData.instApplied, footerData.instAmt, footerData.othApplied, footerData.othAmt, footerData.otherAmount, footerData.roundOffApplied, footerData.roundOffAmt, footerData.roundOffType, footerData.tdsApplied, footerData.tdsAmt]);

  return (
    <div className="confirm-gst-bill">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="bill-register-container">
                  {/* Consolidated Header */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="d-flex align-items-center gap-3 py-1 flex-wrap">
                      <h5 className="header-title mb-0 text-nowrap me-3">
                        Bill Register
                      </h5>

                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label mb-0 text-nowrap small fw-bold">Series No :</label>
                        <select className="form-select form-select-sm" style={{ width: '100px', height: '28px' }} value={selectedSeries} onChange={(e) => setSelectedSeries(e.target.value)}>
                          <option value="Select">Select</option>
                          <option value="JW">JW</option>
                        </select>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <label className="form-label mb-0 text-nowrap small fw-bold">Bill (P) No:</label>
                        <input type="text" className="form-control form-control-sm" style={{ width: '100px', height: '28px' }} value={billPNo} readOnly />
                      </div>

                      <button title="Refresh" className="btn btn-secondary btn-sm" style={{ width: '32px', height: '32px', padding: 0 }}>
                        <FaSyncAlt size={14} />
                      </button>

                      <div className="ms-2">
                        <span className="text-black fw-bold" style={{ fontSize: '13px' }}>Supplier : {footerData.supplier || "Select Supplier"}</span>
                      </div>

                      <div className="info-badge ms-2">
                        Reg : Y | GST No : NO | Tax Code : 2
                      </div>

                      <div className="ms-auto">
                        <button
                          className="btn btn-secondary btn-sm px-3"
                          onClick={() => navigate("/accounts/bill-passing/jobwork-bill", { state: { selectedGrns: location.state?.selectedInvoices || [] } })}
                        >
                          Pending Labour Bill List
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive border rounded bg-white mb-0" style={{ maxHeight: '450px' }}>
                    <table className="table table-bordered table-sm custom-bill-table mb-0">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>GRNNo</th>
                          <th>ChalNo</th>
                          <th>PO No</th>
                          <th style={{ minWidth: '220px' }}>Item Code/Desc</th>
                          <th style={{ width: '80px' }}>HSN Code</th>
                          <th style={{ width: '60px' }}>Rate</th>
                          <th style={{ width: '60px' }}>GRN Qty</th>
                          <th style={{ width: '70px' }}>Challan Qty</th>
                          <th style={{ width: '60px' }}>Disc</th>
                          <th style={{ width: '80px' }}>Total</th>
                          <th style={{ width: '70px' }}>CGST</th>
                          <th style={{ width: '70px' }}>SGST</th>
                          <th style={{ width: '70px' }}>IGST</th>
                          <th style={{ minWidth: '120px' }}>GLId</th>
                          <th style={{ width: '50px' }} className="text-center">TDS</th>
                          <th style={{ width: '50px' }}>Doc</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr key={row.id}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">
                              <div className="text-primary fw-bold" style={{ fontSize: '11px' }}>{row.grnNo}</div>
                              <div className="text-muted" style={{ fontSize: '10px' }}>{row.grnDate}</div>
                            </td>
                            <td className="text-center">
                              <div className="text-dark fw-bold" style={{ fontSize: '11px' }}>{row.chalNo}</div>
                              <div className="text-muted" style={{ fontSize: '10px' }}>{row.chalDate}</div>
                            </td>
                            <td className="text-center">
                              <div className="text-primary fw-bold" style={{ fontSize: '11px' }}>{row.poNo}</div>
                              <div className="text-muted" style={{ fontSize: '10px' }}>{row.poDate}</div>
                            </td>
                            <td>
                              <div className="fw-bold" style={{ fontSize: '11.5px', color: '#1e293b' }}>{row.itemCode}</div>
                              <div className="text-muted" style={{ fontSize: '10.5px', lineHeight: '1.1' }}>{row.itemDesc}</div>
                            </td>
                            <td><input type="text" className="form-control form-control-sm text-center" value={row.hsnCode} onChange={(e) => handleRowChange(index, 'hsnCode', e.target.value)} /></td>
                            <td><input type="text" className="form-control form-control-sm text-center" value={row.rate} onChange={(e) => handleRowChange(index, 'rate', e.target.value)} /></td>
                            <td><input type="text" className="form-control form-control-sm text-center" value={row.grnQty} onChange={(e) => handleRowChange(index, 'grnQty', e.target.value)} /></td>
                            <td><input type="text" className="form-control form-control-sm text-center" value={row.challanQty} onChange={(e) => handleRowChange(index, 'challanQty', e.target.value)} /></td>
                            <td>
                              <div className="d-flex flex-column gap-1">
                                <div className="d-flex align-items-center">
                                  <input type="text" className="form-control form-control-sm text-center p-0" value={row.disc} style={{ width: '40px' }} onChange={(e) => handleRowChange(index, 'disc', e.target.value)} />
                                  <span className="ms-1" style={{ fontSize: '10px' }}>%</span>
                                </div>
                                <input type="text" className="form-control form-control-sm text-end" value={row.discAmt} onChange={(e) => handleRowChange(index, 'discAmt', e.target.value)} />
                              </div>
                            </td>
                            <td><input type="text" className="form-control form-control-sm text-end fw-bold" value={row.total} onChange={(e) => handleRowChange(index, 'total', e.target.value)} /></td>
                            <td>
                              <div className="d-flex flex-column gap-1">
                                <div className="d-flex align-items-center">
                                  <input type="text" className="form-control form-control-sm text-center p-0" value={row.cgst} style={{ width: '40px' }} onChange={(e) => handleRowChange(index, 'cgst', e.target.value)} />
                                  <span className="ms-1" style={{ fontSize: '10px' }}>%</span>
                                </div>
                                <input type="text" className="form-control form-control-sm text-end" value={row.cgstAmt} onChange={(e) => handleRowChange(index, 'cgstAmt', e.target.value)} />
                              </div>
                            </td>
                            <td>
                              <div className="d-flex flex-column gap-1">
                                <div className="d-flex align-items-center">
                                  <input type="text" className="form-control form-control-sm text-center p-0" value={row.sgst} style={{ width: '40px' }} onChange={(e) => handleRowChange(index, 'sgst', e.target.value)} />
                                  <span className="ms-1" style={{ fontSize: '10px' }}>%</span>
                                </div>
                                <input type="text" className="form-control form-control-sm text-end" value={row.sgstAmt} onChange={(e) => handleRowChange(index, 'sgstAmt', e.target.value)} />
                              </div>
                            </td>
                            <td>
                              <div className="d-flex flex-column gap-1">
                                <div className="d-flex align-items-center">
                                  <input type="text" className="form-control form-control-sm text-center p-0" value={row.igst} style={{ width: '40px' }} onChange={(e) => handleRowChange(index, 'igst', e.target.value)} />
                                  <span className="ms-1" style={{ fontSize: '10px' }}>%</span>
                                </div>
                                <input type="text" className="form-control form-control-sm text-end" value={row.igstAmt} onChange={(e) => handleRowChange(index, 'igstAmt', e.target.value)} />
                              </div>
                            </td>
                            <td>
                              <select className="form-select form-select-sm" value={row.glId} onChange={(e) => handleRowChange(index, 'glId', e.target.value)}>
                                <option value={row.glId}>{row.glId}</option>
                                <option value="GL001">GL001</option>
                                <option value="GL002">GL002</option>
                              </select>
                            </td>
                            <td className="text-center">
                              <div className="d-flex align-items-center justify-content-center">
                                <input type="checkbox" className="form-check-input mt-0" checked={row.tds} onChange={(e) => handleRowChange(index, 'tds', e.target.checked)} />
                              </div>
                            </td>
                            <td className="text-center">
                              <button className="btn btn-primary btn-sm d-flex align-items-center justify-content-center mx-auto" style={{ width: '28px', height: '28px', padding: 0 }}>
                                <FaFileAlt size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Orange Totals Bar */}
                  <div className="totals-bar d-flex justify-content-between px-3 py-2 mb-3 mt-1 shadow-sm">
                    <div className="d-flex flex-column align-items-center border-end pe-3 flex-grow-1">
                      <span className="label">Total Qty :</span>
                      <span className="value">{totals.totalQty}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center border-end px-3 flex-grow-1">
                      <span className="label">Sub Total :</span>
                      <span className="value">{totals.subTotal}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center border-end px-3 flex-grow-1">
                      <span className="label">Dis Tot :</span>
                      <span className="value">0</span>
                    </div>
                    <div className="d-flex flex-column align-items-center border-end px-3 flex-grow-1">
                      <span className="label">Basic Tot :</span>
                      <span className="value">{totals.basicTot}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center border-end px-3 flex-grow-1">
                      <span className="label">CGST Total :</span>
                      <span className="value">0</span>
                    </div>
                    <div className="d-flex flex-column align-items-center border-end px-3 flex-grow-1">
                      <span className="label">SGST Total :</span>
                      <span className="value">0</span>
                    </div>
                    <div className="d-flex flex-column align-items-center border-end px-3 flex-grow-1">
                      <span className="label">IGST Total :</span>
                      <span className="value">{totals.igstTotal}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center border-end px-3 flex-grow-1">
                      <span className="label">Total Tax :</span>
                      <span className="value">{totals.taxTotal}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center border-end px-3 flex-grow-1">
                      <span className="label">Other Charges :</span>
                      <span className="value">0</span>
                    </div>
                    <div className="d-flex flex-column align-items-center border-end px-3 flex-grow-1">
                      <span className="label">Bill Amt :</span>
                      <span className="value">{totals.billAmt}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center border-end px-3 flex-grow-1">
                      <span className="label">TDS Amt :</span>
                      <span className="value">0</span>
                    </div>
                    <div className="d-flex flex-column align-items-center border-end px-3 flex-grow-1">
                      <span className="label">TCS Amt :</span>
                      <span className="value">0</span>
                    </div>
                    <div className="d-flex flex-column align-items-center ps-3 flex-grow-1">
                      <span className="label">Final Amount :</span>
                      <span className="value">{totals.finalAmt}</span>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="footer-section p-3 border rounded shadow-sm">
                    <div className="row g-3">
                      {/* TOC Charges */}
                      <div className="col-md-3 border-end">
                        {[
                          { label: "(TOC) Pack. & Fwrd Charges :", key: "pack" },
                          { label: "(TOC) Transport Charges :", key: "trans" },
                          { label: "(TOC) Insurance :", key: "ins" },
                          { label: "(TOC) Installation Charges :", key: "inst" },
                          { label: "(TOC) Other Charges :", key: "oth" }
                        ].map((item, idx) => (
                          <div className="d-flex align-items-center mb-2" key={idx}>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label className="mb-0 flex-grow-1">{item.label}</label>
                            <input type="text" className="form-control form-control-sm text-end" style={{ width: '80px' }} defaultValue="0" />
                          </div>
                        ))}
                        <div className="d-flex align-items-center mt-3">
                          <label className="mb-0 me-2 text-nowrap">Other Amount :</label>
                          <select className="form-select form-select-sm me-2" style={{ width: '80px' }}>
                            <option>Select</option>
                          </select>
                          <input type="text" className="form-control form-control-sm text-end" style={{ width: '80px' }} defaultValue="0" />
                        </div>
                      </div>

                      {/* Middle Calculations */}
                      <div className="col-md-3 border-end">
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 flex-grow-1">Sub Total (Rate * Qty) :</label>
                          <input 
                            type="text" 
                            className="form-control form-control-sm text-end" 
                            style={{ width: '100px' }} 
                            value={footerData.subTotal} 
                            onChange={(e) => handleFooterChange('subTotal', e.target.value)}
                          />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 flex-grow-1">Assable Value :</label>
                          <input 
                            type="text" 
                            className="form-control form-control-sm text-end" 
                            style={{ width: '100px' }} 
                            value={footerData.basicTot} 
                            onChange={(e) => handleFooterChange('basicTot', e.target.value)}
                          />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div className="d-flex align-items-center flex-grow-1">
                            <input 
                              type="checkbox" 
                              className="form-check-input me-2" 
                              checked={footerData.tdsApplied}
                              onChange={(e) => handleFooterChange('tdsApplied', e.target.checked)}
                            />
                            <label className="mb-0">TDS :</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm mx-1" 
                              style={{ width: '40px' }} 
                              value={footerData.tdsRate}
                              onChange={(e) => handleFooterChange('tdsRate', e.target.value)}
                            />
                            <select 
                              className="form-select form-select-sm" 
                              style={{ width: '80px' }}
                              value={footerData.tdsSection}
                              onChange={(e) => handleFooterChange('tdsSection', e.target.value)}
                            >
                              <option value="Select">Select</option>
                              <option value="194C">194C</option>
                            </select>
                          </div>
                          <input 
                            type="text" 
                            className="form-control form-control-sm text-end" 
                            style={{ width: '100px' }} 
                            value={footerData.tdsAmt}
                            onChange={(e) => handleFooterChange('tdsAmt', e.target.value)}
                          />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div className="d-flex align-items-center flex-grow-1">
                            <label className="mb-0 me-2">TCS :</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm mx-1" 
                              style={{ width: '40px' }} 
                              value={footerData.tcsRate}
                              onChange={(e) => handleFooterChange('tcsRate', e.target.value)}
                            />
                            <select 
                              className="form-select form-select-sm" 
                              style={{ width: '80px' }}
                              value={footerData.tcsSection}
                              onChange={(e) => handleFooterChange('tcsSection', e.target.value)}
                            >
                              <option value="Select">Select</option>
                              <option value="206C">206C</option>
                            </select>
                          </div>
                          <input 
                            type="text" 
                            className="form-control form-control-sm text-end" 
                            style={{ width: '100px' }} 
                            value={footerData.tcsAmt}
                            onChange={(e) => handleFooterChange('tcsAmt', e.target.value)}
                          />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 flex-grow-1">Round Off Amt :</label>
                          <div className="d-flex align-items-center gap-1">
                            <input 
                              type="checkbox" 
                              className="form-check-input" 
                              checked={footerData.roundOffApplied}
                              onChange={(e) => handleFooterChange('roundOffApplied', e.target.checked)}
                            />
                            <select 
                              className="form-select form-select-sm p-0 border-0 bg-transparent" 
                              style={{ width: '40px' }}
                              value={footerData.roundOffType}
                              onChange={(e) => handleFooterChange('roundOffType', e.target.value)}
                            >
                              <option value="+">+</option>
                              <option value="-">-</option>
                            </select>
                            <input 
                              type="text" 
                              className="form-control form-control-sm text-end" 
                              style={{ width: '70px' }} 
                              value={footerData.roundOffAmt}
                              onChange={(e) => handleFooterChange('roundOffAmt', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="d-flex align-items-center border-top pt-2">
                          <label className="fw-bold flex-grow-1">Grand Total :</label>
                          <input 
                            type="text" 
                            className="form-control form-control-sm text-end fw-bold" 
                            style={{ width: '100px' }} 
                            value={footerData.finalAmt} 
                            onChange={(e) => handleFooterChange('finalAmt', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Dates & Terms */}
                      <div className="col-md-3 border-end">
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 flex-grow-1">Payment TermDays :</label>
                          <input type="text" className="form-control form-control-sm text-center" style={{ width: '120px' }} value={footerData.paymentTermDays} onChange={(e) => handleFooterChange('paymentTermDays', e.target.value)} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 flex-grow-1">Inv./Challan No :</label>
                          <input type="text" className="form-control form-control-sm text-center" style={{ width: '120px' }} value={footerData.invChallanNo} onChange={(e) => handleFooterChange('invChallanNo', e.target.value)} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 flex-grow-1">Inv./Challan Date :</label>
                          <input type="date" className="form-control form-control-sm text-center" style={{ width: '120px' }} value={footerData.invChallanDate} onChange={(e) => handleFooterChange('invChallanDate', e.target.value)} />
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <label className="mb-0 flex-grow-1">Payment Date :</label>
                          <input type="date" className="form-control form-control-sm text-center" style={{ width: '120px' }} value={footerData.paymentDate} onChange={(e) => handleFooterChange('paymentDate', e.target.value)} />
                        </div>
                        <div className="d-flex align-items-center">
                          <label className="mb-0 flex-grow-1">Posting Date :</label>
                          <input type="date" className="form-control form-control-sm text-center" style={{ width: '120px' }} value={footerData.postingDate} onChange={(e) => handleFooterChange('postingDate', e.target.value)} />
                        </div>
                      </div>

                      {/* Remark & Action */}
                      <div className="col-md-3">
                        <div className="d-flex align-items-center mb-2 gap-2">
                          <label className="mb-0">Add Item :</label>
                          <input type="text" className="form-control form-control-sm flex-grow-1" />
                          <button className="btn btn-sm btn-secondary px-3">Add</button>
                        </div>
                        <div className="mb-3">
                          <label className="mb-1 d-block">Remark :</label>
                          <textarea className="form-control form-control-sm" rows="3" placeholder="Enter remarks here..."></textarea>
                        </div>
                        <div className="d-flex justify-content-end">
                          <button className="btn btn-secondary px-5 py-2" onClick={handleSave}>
                            Confirm To Save
                          </button>
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

export default ConfirmGSTBill;
