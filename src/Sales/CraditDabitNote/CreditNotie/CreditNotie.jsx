import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import "../../../styles/erp-global.css";
import "./CreditNotie.css";


const CreditNotie = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
   const navigate = useNavigate();  
  
    const handleButtonClick = () => {
      navigate('/CreditNoteList'); 
    };
    const handleBttnClick = () => {
      navigate('/Creditnoteto'); 
    };

    const [creditNoteNo, setCreditNoteNo] = useState("");
    const [parties, setParties] = useState([]);
    const [partySearchTerm, setPartySearchTerm] = useState("");
    const [showPartySuggestions, setShowPartySuggestions] = useState(false);
    const [itemsList, setItemsList] = useState([]);
    const [addedItems, setAddedItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({
      item_code: "",
      item_desc: "",
      remark: "",
      hsn_code: "",
      rate: "",
      qty: "",
      grn_no: "",
      grn_date: "",
      unit: "",
      gst: "",
      amount: ""
    });

    const filteredParties = partySearchTerm.trim().length > 0
  ? parties.filter(p => {
      const term = partySearchTerm.trim().toLowerCase();
      return Object.values(p).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(term)
      );
    })
  : [];

    useEffect(() => {
      const fetchParties = async () => {
        try {
          const response = await fetch("https://sellerp-backend.onrender.com/All_Masters/SupplierCustomerVendorList/");
          const data = await response.json();
          // API returns raw array of party objects, not wrapped in a 'value' field
          setParties(Array.isArray(data) ? data : data.value || []);
        } catch (error) {
          console.error("Error fetching parties:", error);
        }
      };
      const fetchItems = async () => {
        try {
          const response = await fetch("https://sellerp-backend.onrender.com/Sales/items-list/");
          const data = await response.json();
          setItemsList(data.data || []);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };
      fetchParties();
      fetchItems();
    }, []);

    const [formData, setFormData] = useState({
      plant: "ProduLink",
      series: "Credit Note",
      type: "Direct",
      sub_type: "Select",
      credit_note_date: "",
      party_name: "",
      supp_Crdr_no: "",
      supp_Crdr_date: "",
      inv_no: "",
      inv_date: "",
      select_gl: "",
      other_ref: "",
      for_e_invoice: "Bussiness-to-Bussiness",
      remark: "",
      is_service_invoice: false,
      sub_total: "",
      cgst: "",
      sgst: "",
      igst: "",
      utgst: "",
      tcs: "",
      cgst_amt: "",
      sgst_amt: "",
      igst_amt: "",
      urgst_amt: "",
      tcs_amt: "",
      grand_total: ""
    });

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    };

    const fetchCreditNoteNo = async () => {
      try {
        const response = await fetch("https://sellerp-backend.onrender.com/Sales/generate-credit-note-no/");
        const data = await response.json();
        setCreditNoteNo(data.credit_note_no || data);
      } catch (error) {
        console.error("Error fetching credit note no:", error);
      }
    };

    useEffect(() => {
      fetchCreditNoteNo();
    }, []);

    const handleAdd = () => {
      if (!currentItem.item_code) return;
      const rate = parseFloat(currentItem.rate) || 0;
      const qty = parseFloat(currentItem.qty) || 0;
      const amount = (rate * qty).toFixed(2);
      setAddedItems(prev => [...prev, { ...currentItem, amount }]);
      setCurrentItem({
        item_code: "",
        item_desc: "",
        remark: "",
        hsn_code: "",
        rate: "",
        qty: "",
        grn_no: "",
        grn_date: "",
        unit: "",
        gst: "",
        amount: ""
      });
    };

    const handleSave = async () => {
      try {
        const sanitizedFormData = { ...formData };
        if (!sanitizedFormData.supp_Crdr_date) sanitizedFormData.supp_Crdr_date = null;
        if (!sanitizedFormData.inv_date) sanitizedFormData.inv_date = null;
        if (!sanitizedFormData.credit_note_date) sanitizedFormData.credit_note_date = null;

        const payload = {
          credit_note_no: creditNoteNo,
          ...sanitizedFormData,
          items: addedItems.map(item => ({
            ...item,
            item_description: item.item_desc,
            quntity: item.qty,
            ammount: item.amount,
            reason: item.remark,
            grn_date: item.grn_date || null
          })),
        };
        const response = await fetch("https://sellerp-backend.onrender.com/Sales/credit-note/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errText = await response.text();
          console.error("Save failed", response.status, errText);
          alert("Failed to save Credit Note! Status: " + response.status + "\n" + errText);
          return;
        }
        const result = await response.json();
        console.log("Save successful", result);
        alert("Credit Note saved successfully!");

        // Clear the form
        setFormData({
          plant: "ProduLink",
          series: "Credit Note",
          type: "Direct",
          sub_type: "Select",
          credit_note_date: "",
          party_name: "",
          supp_Crdr_no: "",
          supp_Crdr_date: "",
          inv_no: "",
          inv_date: "",
          select_gl: "",
          other_ref: "",
          for_e_invoice: "Bussiness-to-Bussiness",
          remark: "",
          is_service_invoice: false,
          sub_total: "",
          cgst: "",
          sgst: "",
          igst: "",
          utgst: "",
          tcs: "",
          cgst_amt: "",
          sgst_amt: "",
          igst_amt: "",
          urgst_amt: "",
          tcs_amt: "",
          grand_total: ""
        });
        setAddedItems([]);
        setPartySearchTerm("");
        setCurrentItem({
          item_code: "",
          item_desc: "",
          remark: "",
          hsn_code: "",
          rate: "",
          qty: "",
          grn_no: "",
          grn_date: "",
          unit: "",
          gst: "",
          amount: ""
        });
        
        // Fetch new number for the next entry
        fetchCreditNoteNo();
        
      } catch (err) {
        console.error("Error saving credit note:", err);
        alert("Error saving credit note: " + err.message);
      }
    };

    // Auto-calculate SubTotal, tax amounts, and Grand Total
    useEffect(() => {
      const subTotal = addedItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
      const cgstPct = parseFloat(formData.cgst) || 0;
      const sgstPct = parseFloat(formData.sgst) || 0;
      const igstPct = parseFloat(formData.igst) || 0;
      const utgstPct = parseFloat(formData.utgst) || 0;
      const tcsPct = parseFloat(formData.tcs) || 0;

      const cgstAmt = (subTotal * cgstPct / 100).toFixed(2);
      const sgstAmt = (subTotal * sgstPct / 100).toFixed(2);
      const igstAmt = (subTotal * igstPct / 100).toFixed(2);
      const utgstAmt = (subTotal * utgstPct / 100).toFixed(2);
      const tcsAmt = (subTotal * tcsPct / 100).toFixed(2);

      const grandTotal = (
        subTotal +
        parseFloat(cgstAmt) +
        parseFloat(sgstAmt) +
        parseFloat(igstAmt) +
        parseFloat(utgstAmt) +
        parseFloat(tcsAmt)
      ).toFixed(2);

      setFormData(prev => ({
        ...prev,
        sub_total: subTotal.toFixed(2),
        cgst_amt: cgstAmt,
        sgst_amt: sgstAmt,
        igst_amt: igstAmt,
        urgst_amt: utgstAmt,
        tcs_amt: tcsAmt,
        grand_total: grandTotal
      }));
    }, [addedItems, formData.cgst, formData.sgst, formData.igst, formData.utgst, formData.tcs]);

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
    <div className="erp-page CreditNotieMaster">
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
                <div className="CreditNotie mt-3">
                  <div className="CreditNotie-header mb-4 text-start">
                    <div className="d-flex align-items-center justify-content-between flex-nowrap overflow-auto">
                      <div className="flex-shrink-0 me-3">
                        <h5 className="header-title mb-0 text-nowrap">New Credit Note</h5>
                      </div>
                      <div className="d-flex align-items-center me-3 flex-shrink-0">
                         <label htmlFor="" className="mb-0 me-2 text-nowrap">Plant:</label>
                         <select name="plant" value={formData.plant} onChange={handleChange} className="form-control" id="" style={{ width: "auto" }}>
                            <option value="ProduLink">ProduLink</option>
                         </select>
                      </div>
                      <div className="d-flex align-items-center me-3 flex-shrink-0">
                         <label htmlFor="" className="mb-0 me-2 text-nowrap">Series:</label>
                         <select name="series" value={formData.series} onChange={handleChange} className="form-control" id="" style={{ width: "auto" }}>
                            <option value="Credit Note">Credit Note</option>
                         </select>
                      </div>
                      <div className="d-flex align-items-center me-3 flex-shrink-0">
                         <label htmlFor="" className="mb-0 me-2 text-nowrap">Type:</label>
                         <select name="type" value={formData.type} onChange={handleChange} className="form-control" id="" style={{ width: "auto" }}>
                            <option value="Direct">Direct</option>
                            <option value="GRN">GRN</option>
                         </select>
                      </div>
                      <div className="d-flex align-items-center me-3 flex-shrink-0">
                         <label htmlFor="" className="mb-0 me-2 text-nowrap">SubType:</label>
                         <select name="sub_type" value={formData.sub_type} onChange={handleChange} className="form-control" id="" style={{ width: "auto" }}>
                            <option value="Select">Select</option>
                            <option value="Rejection">Rejection</option>
                            <option value="RateDiff">RateDiff</option>
                            <option value="Quantity">Quantity</option>
                            <option value="Other">Other</option>
                         </select>
                      </div>
                      <div className="d-flex text-nowrap flex-shrink-0">
                        <button type="button" className="vndrbtn me-2" style={{fontSize: '12px'}} onClick={handleBttnClick}>
                          CN-Against Inv.
                        </button>
                        <button type="button" className="vndrbtn" style={{fontSize: '12px'}} onClick={handleButtonClick}>
                          Credit Note List
                        </button>
                      </div>
                    </div>
                  </div>


                    <div className="CreditNotie-main">
                      <div className="d-flex align-items-center flex-wrap py-2" style={{ overflow: "visible" }}>
                         <div className="d-flex align-items-center me-2 flex-shrink-0">
                            <label htmlFor="" className="mb-0 me-2 text-nowrap">CreditNote NO:</label>
                            <input type="text" className="form-control" placeholder="24250001" value={creditNoteNo} readOnly style={{ width: "100px" }} />
                         </div>
                         <div className="d-flex align-items-center me-2 flex-shrink-0">
                            <label htmlFor="" className="mb-0 me-2 text-nowrap">CreditNote Date:</label>
                            <input type="date" name="credit_note_date" value={formData.credit_note_date} onChange={handleChange} className="form-control" placeholder="" style={{ width: "auto" }} />
                         </div>
                         <div className="d-flex align-items-center me-2 flex-shrink-0" style={{ position: "relative", overflow: "visible" }}>
                            <label htmlFor="party_name_input" className="mb-0 me-2 text-nowrap">Party Name:</label>
                            <div style={{ position: "relative" }}>
                              <input
                                id="party_name_input"
                                type="text"
                                className="form-control"
                                placeholder="Type to search..."
                                value={partySearchTerm}
                                style={{ width: "180px" }}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setPartySearchTerm(val);
                                  setFormData(prev => ({ ...prev, party_name: val }));
                                  setShowPartySuggestions(true);
                                }}
                                onFocus={() => setShowPartySuggestions(true)}
                                onBlur={() => setTimeout(() => setShowPartySuggestions(false), 200)}
                                autoComplete="off"
                              />
                              {showPartySuggestions && filteredParties.length > 0 && (() => {
                                const inputEl = document.getElementById('party_name_input');
                                const rect = inputEl ? inputEl.getBoundingClientRect() : { left: 0, bottom: 0 };
                                return (
                                <ul style={{
                                  position: "fixed",
                                  top: rect.bottom + 2,
                                  left: rect.left,
                                  zIndex: 99999,
                                  background: "#fff",
                                  border: "1px solid #ccc",
                                  borderRadius: "4px",
                                  listStyle: "none",
                                  margin: 0,
                                  padding: 0,
                                  width: "350px",
                                  maxHeight: "250px",
                                  overflowY: "auto",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                  whiteSpace: "normal",
                                  wordBreak: "break-word"
                                }}>
                                  {filteredParties.map((p) => (
                                    <li
                                      key={p.id}
                                      onMouseDown={() => {
                                        setFormData(prev => ({ ...prev, party_name: p.Name }));
                                        setPartySearchTerm(p.Name);
                                        setShowPartySuggestions(false);
                                      }}
                                      style={{
                                        padding: "8px 12px",
                                        cursor: "pointer",
                                        fontSize: "13px",
                                        borderBottom: "1px solid #f0f0f0"
                                      }}
                                      onMouseEnter={e => e.currentTarget.style.background = "#f0f4ff"}
                                      onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                                    >
                                      {p.Name}
                                    </li>
                                  ))}
                                </ul>
                                );
                              })()}
                            </div>
                         </div>
                         <div className="flex-shrink-0">
                            <button type="button" className="vndrbtn">Search</button>
                         </div>
                      </div>
                    </div>


                  <div className="CreditNotie-main mt-5">
                    <div className="CreditNotie-tabs">
                   
                      <div className="tab-content mt-4" id="" >
                            <div className="table-responsive">
                                        <table className="table table-bordered">
                                        <thead className="table-header">
                                            <tr>
                                            <th>Item Code.</th>
                                            <th>Item Desc </th>
                                            <th>Remark</th>
                                            <th>HSN Code</th>
                                            <th>Rate</th>
                                            <th>Qty</th>
                                            <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <select
                                                        className="form-control"
                                                        value={currentItem.item_code}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            const selected = itemsList.find(i => i.part_no === val);
                                                            
                                                            let cgst = "", sgst = "", igst = "", utgst = "", gstCombo = "";
                                                            if (selected && selected.tax_details) {
                                                                cgst = selected.tax_details.CGST || "";
                                                                sgst = selected.tax_details.SGST || "";
                                                                igst = selected.tax_details.IGST || "";
                                                                utgst = selected.tax_details.UTGST || "";
                                                                gstCombo = [cgst, sgst, igst].filter(Boolean).join("+");
                                                            }

                                                            setCurrentItem(prev => ({
                                                                ...prev,
                                                                item_code: val,
                                                                item_desc: selected ? selected.Name_Description : "",
                                                                hsn_code: selected ? selected.HSN_SAC_Code : "",
                                                                rate: selected ? selected.Rate : "",
                                                                gst: gstCombo
                                                            }));

                                                            if (selected && selected.tax_details) {
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    cgst: cgst,
                                                                    sgst: sgst,
                                                                    igst: igst,
                                                                    utgst: utgst
                                                                }));
                                                            }
                                                        }}
                                                    >
                                                        <option value="">Select Item Code</option>
                                                        {itemsList.map((item) => (
                                                            <option key={item.id} value={item.part_no}>
                                                                {item.part_no}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <textarea
                                                        value={currentItem.item_desc}
                                                        onChange={(e) => setCurrentItem(prev => ({ ...prev, item_desc: e.target.value }))}
                                                    ></textarea>
                                                </td>
                                                <td>
                                                    <textarea
                                                        value={currentItem.remark}
                                                        onChange={(e) => setCurrentItem(prev => ({ ...prev, remark: e.target.value }))}
                                                    ></textarea>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={currentItem.hsn_code}
                                                        onChange={(e) => setCurrentItem(prev => ({ ...prev, hsn_code: e.target.value }))}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={currentItem.rate}
                                                        onChange={(e) => setCurrentItem(prev => ({ ...prev, rate: e.target.value }))}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={currentItem.qty}
                                                        onChange={(e) => setCurrentItem(prev => ({ ...prev, qty: e.target.value }))}
                                                    />
                                                </td>
                                                <td><button type="button" className="vndrbtn" onClick={handleAdd}> Add </button></td>
                                                
                                            </tr>

                                        </tbody>
                                        </table>

                                        <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                              <th>Sr</th>
                                              <th>GRN No</th>
                                              <th>GRN Date</th>
                                            <th>Item Code.</th>
                                            <th>Item Desc </th>
                                            <th>HSN Code</th>
                                            <th>Reason</th>
                                            <th>Rate</th>
                                            <th>Quantity</th>
                                            <th>Unit</th>
                                            <th>GST C+S+I</th>
                                            <th>Ammount</th>
                                            <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {addedItems.map((item, idx) => (
                                                <tr key={idx}>
                                                  <td>{idx + 1}</td>
                                                  <td>{item.grn_no}</td>
                                                  <td>{item.grn_date}</td>
                                                  <td>{item.item_code}</td>
                                                  <td>{item.item_desc}</td>
                                                  <td>{item.hsn_code}</td>
                                                  <td>{item.remark}</td>
                                                  <td>{item.rate}</td>
                                                  <td>{item.qty}</td>
                                                  <td>{item.unit}</td>
                                                  <td>{item.gst}</td>
                                                  <td>{item.amount}</td>
                                                  <td>
                                                    <button
                                                      type="button"
                                                      className="erp-btn-danger btn-sm"
                                                      onClick={() => setAddedItems(prev => prev.filter((_, i) => i !== idx))}
                                                    >
                                                      Delete
                                                    </button>
                                                  </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        </table>
                            </div>
                      </div>

                    </div>
                  </div>

                     <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <tr>
                                            <th>SubTotal</th>
                                            <th colSpan="2">CGST</th>
                                            <th colSpan="2">SGST</th>
                                            <th colSpan="2">IGST</th>
                                            <th colSpan="2">UTGST</th>
                                            <th>TCS</th>
                                            <th>Grand Total</th>
                                        </tr>

                                        <tr>
                                        <td> <input type="text" name="sub_total" value={formData.sub_total} onChange={handleChange} className="form-control" /> </td>
                                    <td> <input type="text" name="cgst" value={formData.cgst} onChange={handleChange} className="form-control" placeholder="00.00" /> %</td>
                                    <td> <input type="text" name="cgst_amt" value={formData.cgst_amt} onChange={handleChange} className="form-control" placeholder="00.00" /> </td>

                                    <td> <input type="text" name="sgst" value={formData.sgst} onChange={handleChange} className="form-control" placeholder="00.00" /> %</td>
                                    <td> <input type="text" name="sgst_amt" value={formData.sgst_amt} onChange={handleChange} className="form-control" placeholder="00.00" /> </td>

                                    <td> <input type="text" name="igst" value={formData.igst} onChange={handleChange} className="form-control" placeholder="00.00" /> %</td>
                                    <td> <input type="text" name="igst_amt" value={formData.igst_amt} onChange={handleChange} className="form-control" placeholder="00.00" /> </td>

                                  <td> <input type="text" name="utgst" value={formData.utgst} onChange={handleChange} className="form-control" placeholder="00.00" /> %</td>   
                                    <td> <input type="text" name="urgst_amt" value={formData.urgst_amt} onChange={handleChange} className="form-control" placeholder="00.00" /> </td>

                                   <td>  <input type="text" name="tcs" value={formData.tcs} onChange={handleChange} className="form-control" placeholder="00.00"/> <br />
                                   <input type="text" name="tcs_amt" value={formData.tcs_amt} onChange={handleChange} className="form-control" placeholder="00.00"/> </td>
                                   <td> <input type="text" name="grand_total" value={formData.grand_total} onChange={handleChange} className="form-control" placeholder="00.00" /></td>
                                        
                                    </tr>
                                    </table>
                                </div>
                                
                            </div>
                      </div>

                       <div className="d-flex flex-wrap align-items-end gap-3 mt-4 text-start">
                           <div>
                              <label htmlFor="" className="form-label mb-1">Supp CrDr No:</label>
                              <input type="text" name="supp_Crdr_no" value={formData.supp_Crdr_no} onChange={handleChange} className="form-control" placeholder="" style={{width: '120px'}} />
                           </div>
                           <div>
                              <label htmlFor="" className="form-label mb-1">Supp CrDr Date:</label>
                              <input type="date" name="supp_Crdr_date" value={formData.supp_Crdr_date} onChange={handleChange} className="form-control" placeholder="" style={{width: '130px'}} />
                           </div>
                           <div>
                              <label htmlFor="" className="form-label mb-1">Inv NO:</label>
                              <input type="text" name="inv_no" value={formData.inv_no} onChange={handleChange} className="form-control" placeholder="" style={{width: '120px'}} />
                           </div>
                           <div>
                              <label htmlFor="" className="form-label mb-1">Inv Date:</label>
                              <input type="date" name="inv_date" value={formData.inv_date} onChange={handleChange} className="form-control" placeholder="" style={{width: '130px'}} />
                           </div>
                           <div>
                              <label htmlFor="" className="form-label mb-1">Select GL:</label>
                              <select name="select_gl" value={formData.select_gl} onChange={handleChange} className="form-control" id="" style={{width: '120px'}}>
                                <option value="">Select GL</option>
                              </select>
                           </div>
                           <div>
                              <label htmlFor="" className="form-label mb-1">Remark</label>
                              <textarea name="remark" value={formData.remark} onChange={handleChange} className="form-control" id="" style={{width: '150px', height: '38px'}}></textarea>
                           </div>
                           <div>
                              <label htmlFor="" className="form-label mb-1">Other Ref.</label>
                              <textarea name="other_ref" value={formData.other_ref} onChange={handleChange} className="form-control" id="" style={{width: '150px', height: '38px'}}></textarea>
                           </div>
                           <div>
                              <label htmlFor="" className="form-label mb-1">For E-Invoice :</label>
                              <select name="for_e_invoice" value={formData.for_e_invoice} onChange={handleChange} className="form-control" id="" style={{width: '160px'}}>
                                <option value="Bussiness-to-Bussiness">Bussiness-to-Bussiness</option>
                              </select>
                           </div>
                           <div className="d-flex align-items-center mb-1">
                              <input type="checkbox" name="is_service_invoice" checked={formData.is_service_invoice} onChange={handleChange} className="me-2" placeholder="" />
                              <label htmlFor="" className="mb-0 text-nowrap">IS Service Invoice</label>
                           </div>
                           <div className="d-flex gap-2 mb-1">
                             <button type="button" className="vndrbtn" onClick={handleSave}>Save Debit Note</button>
                             <button type="button" className="vndrbtn">Clear</button>
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


export default CreditNotie