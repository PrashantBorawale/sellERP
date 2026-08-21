import React, { useState, useEffect } from "react";

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import "./GSTSalesReturn.css";
import Cached from "@mui/icons-material/Cached.js";
import Search from "@mui/icons-material/Search.js";



const GSTSalesReturn = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [plant, setPlant] = useState("");
  const [series, setSeries] = useState("");
  const [type, setType] = useState("");
  const [salesReturnNo, setSalesReturnNo] = useState("");
  const [salesReturnDate, setSalesReturnDate] = useState("");
  const [custName, setCustName] = useState("");
  const [returnNumbers, setReturnNumbers] = useState([]);
  const [loadingReturnNo, setLoadingReturnNo] = useState(false);
  const [errorReturnNo, setErrorReturnNo] = useState(null);
  const [gateEntryNo, setGateEntryNo] = useState("");
  const [invoiceChallanNo, setInvoiceChallanNo] = useState("");
  const [invoiceChallanDate, setInvoiceChallanDate] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const [transportName, setTransportName] = useState("");
  const [lrNo, setLrNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [remark, setRemark] = useState("");
  const [eInvoice, setEInvoice] = useState("");
  const [isService, setIsService] = useState(false);
  const [savingData, setSavingData] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Gate Entry Data States
  const [gateEntryList, setGateEntryList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [loadingGateEntry, setLoadingGateEntry] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [filteredInvoiceList, setFilteredInvoiceList] = useState([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [selectedInvoiceData, setSelectedInvoiceData] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [selectedSalesInvNo, setSelectedSalesInvNo] = useState("");
  const [returnQuantities, setReturnQuantities] = useState({});
  const [basicAmount, setBasicAmount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmt, setDiscountAmt] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0); // kept for API payload but unused
  const [toc, setToc] = useState(0);
  const [tsc, setTsc] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  // GST percentages and calculated amounts
  const [cgstPercent, setCgstPercent] = useState(0);
  const [cgstAmt, setCgstAmt] = useState(0);
  const [sgstPercent, setSgstPercent] = useState(0);
  const [sgstAmt, setSgstAmt] = useState(0);
  const [igstPercent, setIgstPercent] = useState(0);
  const [igstAmt, setIgstAmt] = useState(0);
  const [utgstPercent, setUtgstPercent] = useState(0);
  const [utgstAmt, setUtgstAmt] = useState(0);
  
  const navigate = useNavigate();  
  
  const handleButtonClick = () => {
    navigate('/GSTSalesReturnList'); 
  };

  // Fetch return numbers from API
  const fetchReturnNumbers = async () => {
    try {
      setLoadingReturnNo(true);
      setErrorReturnNo(null);
      const response = await fetch("https://sellerp-backend.onrender.com/Sales/sales/return-no/");
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data);
      
      // Handle different response formats
      let returnNoList = [];
      if (Array.isArray(data)) {
        returnNoList = data;
      } else if (data.data && Array.isArray(data.data)) {
        returnNoList = data.data;
      } else if (data.returnNumbers && Array.isArray(data.returnNumbers)) {
        returnNoList = data.returnNumbers;
      } else if (typeof data === 'object') {
        returnNoList = Object.values(data).filter(val => typeof val === 'string' || typeof val === 'object');
      }
      
      setReturnNumbers(returnNoList);
      console.log("Processed Return Numbers:", returnNoList);
      
      // Auto-prefill with first return number if available
      if (returnNoList && returnNoList.length > 0) {
        const firstReturnNo = typeof returnNoList[0] === 'string' 
          ? returnNoList[0] 
          : returnNoList[0].returnNo || returnNoList[0].id || returnNoList[0];
        setSalesReturnNo(firstReturnNo);
      }
    } catch (err) {
      setErrorReturnNo(err.message);
      console.error("Error fetching return numbers:", err);
    } finally {
      setLoadingReturnNo(false);
    }
  };

  // Fetch return numbers on component mount
  useEffect(() => {
    fetchReturnNumbers();
  }, []);

  // Fetch Gate Entry Data from API
  useEffect(() => {
    const fetchGateEntryData = async () => {
      try {
        setLoadingGateEntry(true);
        const response = await fetch("https://sellerp-backend.onrender.com/Sales/salesreturn/gate-entry");
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        console.log("Gate Entry API Response:", data);

        // Extract gate entry numbers, series, and types
        let geList = [];
        let serList = [];
        let typeList = [];

        if (Array.isArray(data)) {
          geList = data;
          // Extract unique series and types
          serList = [...new Set(data.map(item => item.series || item.Series).filter(Boolean))];
          typeList = [...new Set(data.map(item => item.type || item.Type || item.doc_type).filter(Boolean))];
        } else if (data.data && Array.isArray(data.data)) {
          geList = data.data;
          serList = [...new Set(data.data.map(item => item.series || item.Series).filter(Boolean))];
          typeList = [...new Set(data.data.map(item => item.type || item.Type || item.doc_type).filter(Boolean))];
        }

        setGateEntryList(geList);
        setSeriesList(serList);
        setTypeList(typeList);
        console.log("Processed Gate Entry List:", geList);
        console.log("Processed Series List:", serList);
        console.log("Processed Type List:", typeList);
      } catch (err) {
        console.error("Error fetching gate entry data:", err);
      } finally {
        setLoadingGateEntry(false);
      }
    };

    fetchGateEntryData();
  }, []);

  // Fetch Invoice Data from API
  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        setLoadingInvoices(true);
        const response = await fetch("https://sellerp-backend.onrender.com/Sales/invoice/");
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        console.log("Invoice API Response:", data);

        let invList = [];
        let custList = [];
        if (Array.isArray(data)) {
          invList = data;
          custList = [
            ...new Set(
              data
                .map(item => {
                  if (item.items && Array.isArray(item.items) && item.items.length > 0) {
                    return item.items[0].customer;
                  }
                  return item.bill_to || item.customer || item.custName || item.customer_name || item.name || item.cust_name;
                })
                .filter(Boolean)
            )
          ];
        }

        setInvoiceList(invList);
        setCustomerList(custList);
        console.log("Processed Invoice List:", invList);
        console.log("Processed Customer List:", custList);
      } catch (err) {
        console.error("Error fetching invoice data:", err);
      } finally {
        setLoadingInvoices(false);
      }
    };

    fetchInvoiceData();
  }, []);

  // Filter invoices by selected customer
  useEffect(() => {
    if (custName && invoiceList.length > 0) {
      const filtered = invoiceList.filter(invoice => {
        // Check if customer matches in items array
        if (invoice.items && Array.isArray(invoice.items) && invoice.items.length > 0) {
          return invoice.items[0].customer === custName;
        }
        // Check if customer matches in bill_to field
        return invoice.bill_to === custName || invoice.customer === custName;
      });
      setFilteredInvoiceList(filtered);
      console.log("Filtered invoices for customer:", custName, filtered);
    } else {
      setFilteredInvoiceList([]);
    }
  }, [custName, invoiceList]);

  // Handle invoice selection
  const handleInvoiceSelect = (invoiceNo) => {
    setSelectedSalesInvNo(invoiceNo);
    
    // Find the selected invoice in the list
    const selected = invoiceList.find(item => item.invoice_no === invoiceNo);
    if (selected) {
      console.log("Selected Invoice:", selected);
      setSelectedInvoiceData(selected);
      
      // Extract customer name
      let customer = "";
      if (selected.items && Array.isArray(selected.items) && selected.items.length > 0) {
        customer = selected.items[0].customer;
      } else {
        customer = selected.bill_to || selected.customer || "";
      }
      setCustName(customer);
      
      // Set invoice items from the items array
      if (selected.items && Array.isArray(selected.items)) {
        setInvoiceItems(selected.items);
        // derive discount percent from first item
        if (selected.items.length > 0) {
          const firstPercent = getDiscountPercent(selected.items[0]);
          const numeric = parseFloat(firstPercent) || 0;
          setDiscountPercent(numeric);
          calculateSubtotal(basicAmount);
        }
      }
      // read GST percentages if available
      if (selected.GSTdetails && selected.GSTdetails.length > 0) {
        const gst = selected.GSTdetails[0];
        setCgstPercent(parseFloat(gst.cgst) || 0);
        setSgstPercent(parseFloat(gst.sgst) || 0);
        setIgstPercent(parseFloat(gst.igst) || 0);
        setUtgstPercent(parseFloat(gst.utgst) || 0);
      }
      
      // Set other fields
      if (selected.invoice_Date) {
        setSalesReturnDate(selected.invoice_Date);
      }
    }
  };

  // Handle save/submit
  const handleSaveGSTSalesReturn = async () => {
    try {
      setSavingData(true);
      setSaveError(null);
      setSaveSuccess(false);

      // Prepare items with return qty and basic amount
      // Calculate discount amount from percentage: (basic * discountPercent) / 100
      const discountPercentVal = parseFloat(discountPercent) || 0;
      const calculatedDiscountAmount = (basicAmount * discountPercentVal) / 100;
      
      const itemsData = invoiceItems.map((item, index) => ({
        inv_no: selectedInvoiceData?.invoice_no || "",
        inv_date: selectedInvoiceData?.invoice_Date || "",
        item_code: item.id || "",
        hsn_code: item.hsn_code || "",
        rate: parseFloat(item.rate) || 0,
        discount: parseFloat(item.discount_percent) || 0,
        total_amt: parseFloat(item.rate) * parseFloat(item.inv_qty) || 0,
        inv_qty: parseFloat(item.inv_qty) || 0,
        return_qty: parseFloat(returnQuantities[index]) || 0,
        lot: "",
        reason: "",
        grir_no: "",
        grir_date: null,
        basic: (parseFloat(returnQuantities[index]) || 0) * (parseFloat(item.rate) || 0),
        disc: ((parseFloat(returnQuantities[index]) || 0) * (parseFloat(item.rate) || 0) * discountPercentVal) / 100,
        subtotal: parseFloat(subTotal) || 0,
        total_amount: parseFloat(totalAmount) || 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        utgst: 0,
        cgst_amt: 0,
        sgst_amt: 0,
        igst_amt: 0,
        utgst_amt: 0,
        toc: 0,
        tsc: 0,
        grand_total: parseFloat(totalAmount) || 0
      }));

      const payload = {
        plant: plant || "",
        gate_entry_no: gateEntryNo || "",
        series: series || "",
        type: type || "",
        sales_return_no: salesReturnNo || "",
        sales_return_date: salesReturnDate || "",
        cust_name: custName || "",
        invoice_challan_no: invoiceChallanNo || "",
        invoice_challan_date: invoiceChallanDate || "",
        transport_name: transportName || "",
        Lr_no: lrNo || "",
        vehical_no: vehicleNo || "",
        remark: remark || "",
        for_e_invoice: eInvoice || "",
        is_service: isService || false,
        cgst_percent: cgstPercent,
        sgst_percent: sgstPercent,
        igst_percent: igstPercent,
        utgst_percent: utgstPercent,
        cgst_amt: cgstAmt,
        sgst_amt: sgstAmt,
        igst_amt: igstAmt,
        utgst_amt: utgstAmt,
        toc: toc,
        tsc: tsc,
        grand_total: grandTotal,
        total_amount: totalAmount,
        items: itemsData
      };

      console.log("Sending payload:", payload);

      const response = await fetch("https://sellerp-backend.onrender.com/Sales/Gstsalesretun/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Save successful:", result);
      setSaveSuccess(true);
      
      // Show success message for 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);

    } catch (err) {
      setSaveError(err.message);
      console.error("Error saving GST Sales Return:", err);
    } finally {
      setSavingData(false);
    }
  };

  // Handle clear form
  // Handle return quantity change
  const handleReturnQtyChange = (index, value) => {
    const newReturnQties = { ...returnQuantities };
    newReturnQties[index] = value;
    setReturnQuantities(newReturnQties);
    
    // Calculate basic amount
    calculateBasicAmount(newReturnQties);
  };

  // Calculate basic amount and subtotal
  const calculateBasicAmount = (returnQties) => {
    let total = 0;
    invoiceItems.forEach((item, index) => {
      const returnQty = parseFloat(returnQties[index]) || 0;
      const rate = parseFloat(item.rate) || 0;
      total += returnQty * rate;
    });
    setBasicAmount(total);
    // Recalculate subtotal when basic changes
    calculateSubtotal(total);
  };

  // calculate tax amounts from subtotal & percents
  const calculateTaxAmounts = () => {
    const base = parseFloat(subTotal) || 0;
    setCgstAmt((base * parseFloat(cgstPercent || 0)) / 100);
    setSgstAmt((base * parseFloat(sgstPercent || 0)) / 100);
    setIgstAmt((base * parseFloat(igstPercent || 0)) / 100);
    setUtgstAmt((base * parseFloat(utgstPercent || 0)) / 100);
  };

  // Calculate subtotal (basic - discount amount) and set discount amount
  const calculateSubtotal = (basic) => {
    const percent = parseFloat(discountPercent) || 0;
    const discValue = (basic * percent) / 100;
    setDiscountAmt(discValue);
    const subtotalValue = basic - discValue;
    setSubTotal(subtotalValue);
  };

  // Handle discount percent change (if manual override is allowed)
  const handleDiscountPercentChange = (value) => {
    setDiscountPercent(value);
    calculateSubtotal(basicAmount);
  };

  // recalc taxes when subtotal or percents change
  useEffect(() => {
    calculateTaxAmounts();
  }, [subTotal, cgstPercent, sgstPercent, igstPercent, utgstPercent]);

  /*
  // compute total amount removed; staying zero
  */

  // compute grand total (subtotal + all taxes + toc + tsc)
  useEffect(() => {
    const base = parseFloat(subTotal) || 0;
    const total = base + (cgstAmt || 0) + (sgstAmt || 0) + (igstAmt || 0) + (utgstAmt || 0) + (parseFloat(toc) || 0) + (parseFloat(tsc) || 0);
    setGrandTotal(total);
  }, [subTotal, cgstAmt, sgstAmt, igstAmt, utgstAmt, toc, tsc]);
  // Handle delete invoice item
  const handleDeleteInvoiceItem = (indexToDelete) => {
    setInvoiceItems(invoiceItems.filter((_, index) => index !== indexToDelete));
    // Also remove the return quantity for this item
    const newReturnQties = { ...returnQuantities };
    delete newReturnQties[indexToDelete];
    setReturnQuantities(newReturnQties);
    calculateBasicAmount(newReturnQties);
  };

  const handleClearForm = () => {
    setPlant("");
    setGateEntryNo("");
    setSeries("");
    setType("");
    setSalesReturnNo("");
    setSalesReturnDate("");
    setCustName("");
    setInvoiceChallanNo("");
    setInvoiceChallanDate("");
    setTransportMode("");
    setTransportName("");
    setLrNo("");
    setVehicleNo("");
    setRemark("");
    setEInvoice("");
    setIsService(false);
    setSaveError(null);
    setSaveSuccess(false);
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

  // Helper to determine discount percent for an invoice item
  const getDiscountPercent = (item) => {
    if (!item || typeof item !== 'object') return '0%';

    const parseNumber = (v) => {
      if (v === null || v === undefined) return null;
      if (typeof v === 'number') return v;
      if (typeof v === 'string') {
        const cleaned = v.replace(/%/g, '').replace(/[^0-9.-]/g, '');
        const n = parseFloat(cleaned);
        return isNaN(n) ? null : n;
      }
      return null;
    };

    // Common field names that may contain discount percent or value
    const percentKeys = ['disc_percent','discPer','discountPercent','discount_percent','discount_rate','disc%','disc_pct','discountp'];
    const amountKeys = ['discount_amount','disc_amt','discountAmount','discount_value','disc_value','discount'];

    // Check percent-like fields first
    for (const k of percentKeys) {
      const val = parseNumber(item[k]);
      if (val !== null) return `${val}%`;
    }

    // Some APIs use short names like 'dis' or 'disc'
    const shortPercent = parseNumber(item.dis) ?? parseNumber(item.disc);
    if (shortPercent !== null) return `${shortPercent}%`;

    // If we have a discount amount and item rate/qty, compute percent
    for (const k of amountKeys) {
      const amt = parseNumber(item[k]);
      if (amt !== null) {
        const qty = parseNumber(item.inv_qty) ?? parseNumber(item.qty) ?? parseNumber(item.po_qty) ?? 1;
        const rate = parseNumber(item.rate) ?? parseNumber(item.price) ?? 0;
        const base = (qty && rate) ? qty * rate : 0;
        if (base > 0) {
          const pct = (amt / base) * 100;
          return `${+pct.toFixed(2)}%`;
        }
      }
    }

    return '0%';
  };

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
                <div className="GSTSalesReturnMaster">
                <div className="erp-page">
                  <div className="erp-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6 text-start">
                        <h5 className="header-title mb-0" style={{ fontSize: "22px", fontWeight: "700", color: "blue" }}>New GST Sales Return</h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button className="vndrbtn" onClick={handleButtonClick}>GST Sales Return List</button>
                      </div>
                    </div>
                  </div>
                  <div className="erp-page-body">
                    <div className="p-3 bg-light border mb-3 rounded shadow-sm">
                      <div className="d-flex flex-wrap align-items-end gap-3 text-start">
                        <div>
                           <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Plant:</label>
                           <select name="plant" className="form-select form-select-sm"
                             value={plant}
                             onChange={(e) => setPlant(e.target.value)}
                           >
                                <option value="">ProduLink</option>
                            </select>
                        </div>
                        <div style={{position: 'relative'}}>
                           <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Gate Entry No:</label>
                           <select 
                             name="gateEntry"
                             className="form-select form-select-sm" style={{paddingRight: '35px', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', backgroundImage: 'none'}}
                             value={gateEntryNo}
                             onChange={(e) => setGateEntryNo(e.target.value)}
                           >
                               <option value="">Select</option>
                               {gateEntryList.map((ge, index) => (
                                 <option key={index} value={ge.ge_no || ge.GE_No || ge.id || ge}>
                                   {ge.ge_no || ge.GE_No || ge.id}
                                 </option>
                               ))}
                           </select>
                           <span style={{position: 'absolute', right: '10px', top: '28px', cursor: 'pointer', color: '#6c757d'}}>
                               <Cached style={{fontSize: '16px'}} />
                           </span>
                        </div>
                        <div>
                          <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Series:</label>
                          <select name="series" className="form-select form-select-sm"
                            value={series}
                            onChange={(e) => setSeries(e.target.value)}
                          >
                                <option value="">Select</option>
                                {typeList.map((typ, index) => (
                                  <option key={index} value={typ}>
                                    {typ}
                                  </option>
                                ))}
                            </select>
                        </div>
                        <div style={{position: 'relative'}}>
                          <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Type:</label>
                          <select name="type" className="form-select form-select-sm" style={{ paddingRight: '35px', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', backgroundImage: 'none' }}
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                          >
                              <option value="">Select</option>
                              <option value="Direct">Direct</option>
                               <option value="Invoice">Invoice</option>
                          </select>
                          <span style={{position: 'absolute', right: '10px', top: '28px', cursor: 'pointer', color: '#6c757d'}}>
                              <Cached style={{fontSize: '16px'}} />
                          </span>
                        </div>
                        <div>
                          <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Sales Return No:</label>
                          <input 
                            type="text" 
                            className="form-control form-control-sm"
                            value={salesReturnNo}
                            onChange={(e) => setSalesReturnNo(e.target.value)}
                            placeholder="Auto-filled"
                          />
                          {loadingReturnNo && <small className="text-muted d-block mt-1">Loading...</small>}
                          {errorReturnNo && <small className="text-danger d-block mt-1">Error: {errorReturnNo}</small>}
                        </div>
                        <div>
                           <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Sales Return Date:</label>
                           <input 
                             type="date" 
                             className="form-control form-control-sm"
                             value={salesReturnDate}
                             onChange={(e) => setSalesReturnDate(e.target.value)}
                           />
                        </div>
                        <div className="flex-grow-1" style={{minWidth: '200px', position: 'relative'}}>
                          <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Cust Name:</label>
                          <select 
                            className="form-select form-select-sm" style={{paddingRight: '35px', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', backgroundImage: 'none'}}
                            value={custName}
                            onChange={(e) => setCustName(e.target.value)}
                          >
                            <option value="">Select Customer</option>
                            {customerList.map((cust, index) => (
                              <option key={index} value={cust}>
                                {cust}
                              </option>
                            ))}
                          </select>
                          <span style={{position: 'absolute', right: '10px', top: '28px', cursor: 'pointer', color: '#6c757d'}}>
                            <Search style={{fontSize: '16px'}} />
                          </span>
                        </div>
                      </div>
                    </div>
                    </div>


                  <div className="GSTSalesReturn-main mt-5">
                    <div className="GSTSalesReturn-tabs">
                   
                      <div className="tab-content mt-4" id="" >

                          {type === "Invoice" && (                            <div className="table-responsive mb-4">
                              {/* <h6 className="mb-3">Select Invoice</h6> */}
                              <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 2 }}>
                                <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                                <TableHead>
                                  <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Invoice No</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Invoice Date</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Item Code</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Item Desc</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>HSN Code</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Qty</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Sales Return No</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Return Qty</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Select</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {filteredInvoiceList.length > 0 ? (
                                    filteredInvoiceList.map((invoice, invIndex) => 
                                      invoice.items && Array.isArray(invoice.items) ? (
                                        invoice.items.map((item, itemIndex) => (
                                          <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{invoice.invoice_no}</TableCell>
                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{invoice.invoice_Date || "N/A"}</TableCell>
                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.id || "N/A"}</TableCell>
                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.description || "N/A"}</TableCell>
                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.hsn_code || "N/A"}</TableCell>
                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.inv_qty || item.po_qty || "N/A"}</TableCell>
                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{salesReturnNo}</TableCell>
                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm" placeholder="Qty" /></TableCell>
                                            <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                              <button 
                                                className="btn btn-sm btn-primary"
                                                onClick={() => handleInvoiceSelect(invoice.invoice_no)}
                                              >
                                                Select
                                              </button>
                                            </TableCell>
                                          </TableRow>
                                        ))
                                      ) : null
                                    )
                                  ) : (
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                      <TableCell colSpan="9" className="text-center text-muted" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                        {custName ? "No invoices found for selected customer" : "Please select a customer first"}
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
          </TableContainer>
                            </div>
                          )}

                          {type === "Direct" && (                          <div className="table-responsive">
                                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 2 }}>
            <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                                    <TableHead>
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Sales Inv.No</TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Sales Inv.Date </TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Item Code</TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Item Desc</TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Remark</TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>HSN Code</TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Rate</TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Disc%</TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Inv.Qty</TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Return.Qty</TableCell>
                                        <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}> </TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                          <select 
                                            className="form-control form-control-sm" 
                                            value={selectedSalesInvNo}
                                            onChange={(e) => handleInvoiceSelect(e.target.value)}
                                          >
                                            <option value="">Select Invoice</option>
                                            {filteredInvoiceList.map((inv, index) => (
                                              <option key={index} value={inv.invoice_no}>
                                                {inv.invoice_no}
                                              </option>
                                            ))}
                                          </select>
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> 
                                          <input 
                                            type="date" 
                                            placeholder="" 
                                            className="form-control form-control-sm"
                                            value={selectedInvoiceData?.invoice_Date || ""}
                                            readOnly
                                          />
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                            <div style={{position: 'relative', display: 'inline-block', width: '100%'}}>
                                              <input type="text" placeholder="Enter Code" className="form-control form-control-sm" style={{paddingRight: '35px'}}
                                              />
                                              <span style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                                                <Search />
                                              </span>
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><textarea className="form-control form-control-sm"></textarea></TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><textarea className="form-control form-control-sm"></textarea></TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                        <input type="text" className="form-control form-control-sm" />
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                            <input type="text" className="form-control form-control-sm" />
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                            <input type="text" className="form-control form-control-sm" />
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                            <input type="text" className="form-control form-control-sm" />
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                            <input type="text" className="form-control form-control-sm" />
                                            <select name="" id="">
                                                <option value="">Select</option>
                                            </select>
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><button className="vndrbtn btn-sm" style={{fontSize: '11px', padding: '2px 8px'}}>Add</button></TableCell>
                                    </TableRow>
                                    </TableBody>
                                </Table>
          </TableContainer>
                          </div>
                          )}

                            <div className="table-responsive">
                                        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 2 }}>
            <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                                        <TableHead>
                                            <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>No.</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Inv No </TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Inv Date</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Item Code</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Item Desc</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>HSNCode</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Rate.</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Disc%.</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>TotalAmt</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Inv.Qty</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Edit</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Return Qty</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Lot/HC</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Reason</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>GRIR No.</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>GRIR Date.</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Del.</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {selectedInvoiceData && invoiceItems.length > 0 ? (
                                            invoiceItems.map((item, index) => (
                                              <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{index + 1}</TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{selectedInvoiceData.invoice_no}</TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{selectedInvoiceData.invoice_Date || "N/A"}</TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.id || "N/A"}</TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.description || "N/A"}</TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.hsn_code || "N/A"}</TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.rate || "N/A"}</TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{getDiscountPercent(item)}</TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{(item.rate * item.inv_qty) || "N/A"}</TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.inv_qty || item.po_qty || "N/A"}</TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>Edit</TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                  <input 
                                                    type="text" 
                                                    className="form-control form-control-sm" 
                                                    value={returnQuantities[index] || ""}
                                                    onChange={(e) => handleReturnQtyChange(index, e.target.value)}
                                                    placeholder="Return Qty"
                                                  />
                                                </TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm" /></TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><textarea name="" id=""></textarea></TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="text" className="form-control form-control-sm" /></TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><input type="date" className="form-control form-control-sm" /></TableCell>
                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                  <span 
                                                    style={{border: '1px solid #ccc', padding: '0 5px', cursor: 'pointer', borderRadius: '3px', color: 'red'}}
                                                    onClick={() => handleDeleteInvoiceItem(index)}
                                                  >
                                                    &times;
                                                  </span>
                                                </TableCell>
                                              </TableRow>
                                            ))
                                          ) : (
                                            <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                              <TableCell colSpan="17" className="text-center text-muted" sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                Select an invoice to display items
                                              </TableCell>
                                            </TableRow>
                                          )}
                                        </TableBody>
                                        </Table>
          </TableContainer>
                            </div>

                      </div>

                       <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 2 }}>
            <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                                        <TableHead>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Basic</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Disc</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>SubTotal</TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>TotalAmt</TableCell>
                                            <TableCell colSpan="2" sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>CGST</TableCell>
                                            <TableCell colSpan="2" sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>SGST</TableCell>
                                            <TableCell colSpan="2" sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>IGST</TableCell>
                                            <TableCell colSpan="2" sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>UTGST</TableCell>
                                            <TableCell  sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>TOC(Other)</TableCell>
                                            <TableCell colSpan="2" sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>TSC </TableCell>
                                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Grand Total</TableCell>
                                        </TableHead>

                                        <TableBody>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" placeholder="" value={basicAmount} readOnly /> </TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" placeholder="" value={discountAmt} readOnly /> </TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" value={subTotal} readOnly /></TableCell>
                                        {/* TotalAmt field hidden as totalAmount is kept zero */}
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" value={0} readOnly /></TableCell>

                                        {/* CGST % */}
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" value={cgstPercent + "%"} readOnly /></TableCell>
                                        {/* CGST amt */}
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" value={cgstAmt} readOnly /></TableCell>

                                        {/* SGST % */}
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" value={sgstPercent + "%"} readOnly /></TableCell>
                                        {/* SGST amt */}
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" value={sgstAmt} readOnly /></TableCell>

                                        {/* IGST % */}
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" value={igstPercent + "%"} readOnly /></TableCell>
                                        {/* IGST amt */}
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" value={igstAmt} readOnly /></TableCell>

                                        {/* UTGST % */}
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" value={utgstPercent + "%"} readOnly /></TableCell>
                                        {/* UTGST amt */}
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" value={utgstAmt} readOnly /></TableCell>

                                        {/* TOC */}
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" value={toc} onChange={(e)=>setToc(e.target.value)} /></TableCell>
                                        {/* TSC */}
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" value={tsc} onChange={(e)=>setTsc(e.target.value)} /></TableCell>
                                                                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" value={tsc} onChange={(e)=>setTsc(e.target.value)} /></TableCell>
                                        {/* Grand Total */}
                                        <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}> <input type="text" className="form-control form-control-sm" value={grandTotal} readOnly /></TableCell>
                                        </TableBody>
                                    </Table>
          </TableContainer>
                                </div>
                            </div>
                       </div>


                      <div className="d-flex flex-wrap align-items-end gap-3 text-start mt-4 p-3 bg-light rounded shadow-sm border">
                        <div>
                             <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Invoice Challan No</label>
                             <input 
                               type="text" 
                               className="form-control form-control-sm" 
                               placeholder="" 
                               value={invoiceChallanNo}
                               onChange={(e) => setInvoiceChallanNo(e.target.value)}
                             />
                        </div>
                        <div>
                             <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Invoice Challan Date:</label>
                             <input 
                               type="date" 
                               className="form-control form-control-sm" 
                               placeholder="" 
                               value={invoiceChallanDate}
                               onChange={(e) => setInvoiceChallanDate(e.target.value)}
                             />
                        </div>
                        <div>
                             <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Transport Mode:</label>
                             <input 
                               type="text" 
                               className="form-control form-control-sm" 
                               placeholder="" 
                               value={transportMode}
                               onChange={(e) => setTransportMode(e.target.value)}
                             />
                        </div>
                        <div>
                             <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Transport Name:</label>
                             <input 
                               type="text" 
                               className="form-control form-control-sm" 
                               placeholder="" 
                               value={transportName}
                               onChange={(e) => setTransportName(e.target.value)}
                             />
                        </div>
                        <div>
                             <label className="fw-bold mb-1" style={{fontSize: '12px'}}>LR No:</label>
                             <input 
                               type="text" 
                               className="form-control form-control-sm" 
                               placeholder="" 
                               value={lrNo}
                               onChange={(e) => setLrNo(e.target.value)}
                             />
                        </div>
                        <div>
                             <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Vehicle No:</label>
                             <input 
                               type="text" 
                               className="form-control form-control-sm" 
                               placeholder="" 
                               value={vehicleNo}
                               onChange={(e) => setVehicleNo(e.target.value)}
                             />
                        </div>
                        <div className="w-100"></div> {/* Line break */}
                        <div className="flex-grow-1">
                             <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Remark</label>
                             <textarea 
                               className="form-control form-control-sm" rows="1"
                               value={remark}
                               onChange={(e) => setRemark(e.target.value)}
                             ></textarea>
                        </div>
                        <div>
                            <label className="fw-bold mb-1" style={{fontSize: '12px'}}>For E-Invoice :</label>
                             <select 
                               className="form-control form-control-sm" 
                               value={eInvoice}
                               onChange={(e) => setEInvoice(e.target.value)}
                             >
                                <option value="">Bussiness To Bussiness</option>
                             </select>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                            <input 
                              type="checkbox" 
                              id="isServiceInvoice"
                              className="me-2"
                              style={{width: '16px', height: '16px', cursor: 'pointer'}}
                              checked={isService}
                              onChange={(e) => setIsService(e.target.checked)}
                            />
                            <label htmlFor="isServiceInvoice" className="mb-0 fw-bold" style={{fontSize: '13px', cursor: 'pointer'}}>IS Service Invoice</label>
                        </div>
                        <div>
                            <label className="fw-bold mb-1 d-block" style={{fontSize: '12px', visibility: 'hidden'}}>Upload</label>
                            <input type="file" id="file-upload" style={{ display: 'none' }} />
                            <label htmlFor="file-upload" className="vndrbtn mb-0 py-1" style={{ cursor: 'pointer', backgroundColor: '#64748b' }}>
                                Upload 
                            </label>
                        </div>
                        <div className="ms-auto d-flex align-items-center gap-2">
                            <button 
                              type="button"
                              className="vndrbtn px-4"
                              onClick={handleSaveGSTSalesReturn}
                              disabled={savingData}
                            >
                              {savingData ? "Saving..." : "Save Return"}
                            </button>
                            <button 
                              type="button"
                              className="vndrbtn px-4"
                              style={{backgroundColor: '#64748b'}}
                              onClick={handleClearForm}
                            >
                              Clear
                            </button>
                        </div>
                        <div className="w-100">
                          {saveSuccess && <div className="alert alert-success mt-2 py-1 mb-0" style={{fontSize: '12px'}}>Data saved successfully!</div>}
                          {saveError && <div className="alert alert-danger mt-2 py-1 mb-0" style={{fontSize: '12px'}}>Error: {saveError}</div>}
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


export default GSTSalesReturn
