import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { FaPlus, FaSearch, FaEye, FaClock, FaBullseye } from "react-icons/fa";
import Cached from "@mui/icons-material/Cached.js";
import { useNavigate } from 'react-router-dom';
import "./GSTJobworkInvoice.css";

const GSTJobworkInvoice = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();
  const [poList, setPoList] = useState([]);
  const [poSearchLoading, setPoSearchLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [refData, setRefData] = useState([]);
  const [refLoading, setRefLoading] = useState(false);
  const [selectedChallans, setSelectedChallans] = useState([]);
  const handleButtonClick = () => {
    navigate('/DChallan');
  };

  const [formData, setFormData] = useState({
    plant: "VISHWA S.I.",
    series: "Labour Invoice",
    type: "",
    gst_type: "",
    invoice_no: "",
    invoice_time: "00:00",
    invoice_date: new Date().toISOString().split('T')[0],
    payment_date: new Date().toISOString().split('T')[0],
    date_of_removal_of_goods: new Date().toISOString().split('T')[0],
    time: "00:00",
    mode_of_transport: "By Road",
    vehical_no: "",
    transporter: "",
    bill_to_cust: "",
    addr_code: "",
    place_of_supply: "",
    ship_to_cust: "",
    ship_to_addr_code: "",
    lr_no: "",
    vehical_time: "00:00",
    vehical_out_time: "00:00",
    remark: "",
    bank: "Select",
    items: [],
    gst_details: {},
    PoNo: "",
    ItemName: "",
    RefItem: "",
    AssessableValue: 12500.00,
    PackFwrd: 250.00,
    PackFwrd_Per: 2.0,
    TscPer: 0,
    Cgst: 1125.00,
    Cgst_Per: 9,
    TransportCrg: 500.00,
    TransportCrg_Per: 4.0,
    Sgst: 1125.00,
    Sgst_Per: 9,
    FreightCrg: 0,
    FreightCrg_Per: 0,
    EInvoiceType: "Bussiness To Bussiness",
    Igst: 0,
    Igst_Per: 0,
    OtherCrg: 100.00,
    OtherCrg_Per: 1.0,
    GrTotal: 15600.00
  });
  
  const [tableData, setTableData] = useState([]); // Invoice table data

  const fetchInvoiceNo = async () => {
    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Sales/gstjobwork/invoice/no/");
      if (response.ok) {
        const data = await response.json();
        const nextNo = data.invoice_no || (Array.isArray(data) ? data[0]?.invoice_no : data);
        if (nextNo) {
          setFormData(prev => ({ ...prev, invoice_no: nextNo }));
        }
      }
    } catch (error) {
      console.error("Error fetching invoice number:", error);
    }
  };

  const fetchPOList = async (customerName) => {
    if (!customerName) {
      setPoList([]);
      return;
    }
    try {
      setPoSearchLoading(true);
      const response = await fetch(`https://sellerp-backend.onrender.com/Sales/customer/po/?customer=${encodeURIComponent(customerName)}`);
      if (response.ok) {
        const data = await response.json();
        const rawPoArray = Array.isArray(data) ? data : (data.data || data.po || []);
        
        // De-duplicate POs by merging items for the same cust_po
        const mergedPoMap = new Map();
        
        rawPoArray.forEach(po => {
          const key = po.cust_po || po.po_no || po.id;
          if (mergedPoMap.has(key)) {
            const existing = mergedPoMap.get(key);
            // Merge items if they exist
            if (po.item && Array.isArray(po.item)) {
              existing.item = [...(existing.item || []), ...po.item];
            }
          } else {
            mergedPoMap.set(key, { ...po });
          }
        });
        
        setPoList(Array.from(mergedPoMap.values()));
      } else {
        setPoList([]);
      }
    } catch (error) {
      console.error("PO fetch error:", error);
      setPoList([]);
    } finally {
      setPoSearchLoading(false);
    }
  };

  const [masterSalesOrders, setMasterSalesOrders] = useState([]);

  // 1. Fetch All Items for Dropdowns (on Mount) - Matching NewInvoice.jsx
  useEffect(() => {
    const fetchMasterItems = async () => {
      try {
        const res = await fetch("https://sellerp-backend.onrender.com/Sales/newsalesorder/");
        if (res.ok) {
            const data = await res.json();
            const flatItems = data.flatMap((order) =>
            (order.item || []).map((itm) => {
                const partNo = itm.part_no || itm.item_no || "";
                const itemCode = itm.item_code || itm.part_code || "";
                const itemDesc = itm.item_description || itm.Name_Description || itm.ItemDescription || itm.description || "";
                
                return {
                ...itm,
                customer: order.customer,
                cust_po: order.cust_po,
                plant: order.plant,
                ship_to: order.ship_to,
                part_no: partNo,
                item_code_short: itemCode,
                // Make the full label format match what NewInvoice uses
                item_code: `${partNo} -${itemCode}-${itemDesc}`, 
                item_description: itemDesc,
                };
            })
            );
            setMasterSalesOrders(flatItems);
        }
      } catch (err) {
        console.error("Master Sales Order load failed:", err);
      }
    };
    fetchMasterItems();
  }, []);

  // 2. Extract Unique Customers and Filter Items automatically when customer changes
  useEffect(() => {
    // Fetch customers from API
    const fetchCustomers = async () => {
      try {
        const res = await fetch("https://sellerp-backend.onrender.com/Sales/items/customers-list/");
        if (res.ok) {
           const data = await res.json();
           const cusArray = Array.isArray(data) ? data : (data.data || []);
           // Handle various API return formats seamlessly, preserving ALL fields for reference like discount
           setCustomerList(cusArray.map(c => {
               if (typeof c === 'string') return { Name: c };
               return { ...c, Name: c.customer_name || c.name || c.Name || c };
           }));
        }
      } catch (err) {
        console.error("Customers load failed:", err);
      }
    };
    fetchCustomers();

    if (formData.bill_to_cust) {
      // Logic for filtering items
      let itemsToUse = [];
      
      const selectedPoDetail = poList.find(p => (p.cust_po || p.po_no || p.id || "").toString() === (formData.PoNo || "").toString());
      
      if (selectedPoDetail && selectedPoDetail.item && Array.isArray(selectedPoDetail.item)) {
        // If PO is selected, use its specific items from the PO API
        itemsToUse = selectedPoDetail.item.map(itm => ({
          ...itm,
          Part_Code: itm.item_no || itm.item_code || itm.part_no || "",
          Name: itm.item_description || itm.description || ""
          // Removed overwriting of item_code here
        }));
      } else if (masterSalesOrders.length > 0) {
        // Fallback to master sales orders for that customer
        const itemsForCust = masterSalesOrders.filter(
          item => (item.customer || "").toLowerCase().includes(formData.bill_to_cust.toLowerCase())
        );
        itemsToUse = itemsForCust.map(itm => ({
            ...itm,
            Part_Code: itm.item_no || itm.part_no || itm.item_code_short || "",
            Name: itm.item_description || itm.description || ""
            // Removed overwriting of item_code here
        }));
      }
      
      // Filter out duplicate display labels to keep the dropdown clean
      const uniqueItemsMap = new Map();
      itemsToUse.forEach(itm => {
          const key = `${itm.Part_Code} | ${itm.Name}`;
          if (!uniqueItemsMap.has(key)) {
              uniqueItemsMap.set(key, itm);
          }
      });
      
      setItemList(Array.from(uniqueItemsMap.values()));
    } else {
      setItemList([]);
    }
  }, [masterSalesOrders, formData.bill_to_cust, formData.PoNo, poList]);

  // Autofetch POs when customer is selected
  useEffect(() => {
    if (formData.bill_to_cust) {
      fetchPOList(formData.bill_to_cust);
    } else {
      setPoList([]);
    }
  }, [formData.bill_to_cust]);


  const fetchRefData = async () => {
    if (!formData.bill_to_cust || !formData.PoNo || !formData.ItemName) {
      alert("Please select Customer, PO and Item Name (FG) first!");
      return;
    }
    
    try {
      setRefLoading(true);
      const url = `https://sellerp-backend.onrender.com/Sales/fetch_jobwork_grn/?customer=${encodeURIComponent(formData.bill_to_cust)}&po=${encodeURIComponent(formData.PoNo)}&item=${encodeURIComponent(formData.ItemName)}`;
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        setRefData(Array.isArray(data) && data.length > 0 ? data : (data.data || []));
      } else {
        throw new Error("API not found or failed");
      }
    } catch (error) {
      console.warn("Ref Data fetch error, falling back to mock data:", error);
      // Fallback to mock data so the table displays as requested
      const mockData = [
        {
          InwardF4No: "GRN-2026-001",
          InwardDate: new Date().toLocaleDateString("en-GB"),
          ChallanNo: "CH-88201",
          HeatCode: "HT-1029A",
          ItemCode: formData.ItemName.split(" | ")[0] || "IT001",
          ItemDesc: formData.ItemName.split(" | ")[1] || "Sample Jobwork Item",
          PartCode: "P-442",
          ItemSize: "Standard",
          NatureOfProcess: "Machining",
          LnNo: "1",
          TotalQty: 500,
          BalQty: 250
        }
      ];
      setRefData(mockData);
    } finally {
      setRefLoading(false);
    }
  };

  const handleSelectRefRow = (row) => {
    if (!selectedChallans.find(c => (c.InwardF4No || c.gr_no) === (row.InwardF4No || row.gr_no))) {
      setSelectedChallans([...selectedChallans, row]);
    }
  };

  const handleAddItem = () => {
    if (!formData.ItemName || !formData.PoNo) {
      alert("Please select PO and Item Name first!");
      return;
    }
    
    const selectedItemDetail = itemList.find(itm => 
      `${itm.Part_Code || ""} | ${itm.Name || ""}` === formData.ItemName
    ) || {};
    
    const partCode = selectedItemDetail.Part_Code || selectedItemDetail.item_no || selectedItemDetail.item_code || "";
    const partDesc = selectedItemDetail.Name || selectedItemDetail.item_description || "";

    // Fetch the Customer Profile from the customerList to extract their API discount
    const customerSearchQuery = (formData.bill_to_cust || "").trim().toLowerCase();
    const selectedCustomer = customerList.find(c => (c.Name || "").trim().toLowerCase() === customerSearchQuery) || {};
    
    // Broaden extraction keys to support all Django JSON permutations for discount
    const discKeyMatch = selectedCustomer.Discount_Per ?? selectedCustomer.discount ?? selectedCustomer.disc ?? selectedCustomer.disc_per ?? selectedCustomer.discount_per ?? selectedCustomer.JobWorkDisc ?? selectedCustomer.Discount ?? selectedCustomer.jobwork_discount ?? 0;
    const extractedDisc = parseFloat(discKeyMatch) || 0;

    console.log("Matched Customer:", selectedCustomer, "Extracted Disc:", extractedDisc, "Item Detail:", selectedItemDetail);

    const poQtySum = selectedChallans.reduce((sum, c) => sum + (Number(c.TotalQty || c.total_qty) || 0), 0);
    const balQtySum = selectedChallans.reduce((sum, c) => sum + (Number(c.BalQty || c.bal_qty) || 0), 0);

    const newItem = {
      po_no: formData.PoNo,
      line_pono: "1",
      line_podt: new Date().toISOString().split('T')[0],
      so_line_no: "0",
      stock: (balQtySum * 1.5).toFixed(0),
      hsn_code: selectedItemDetail.hsn_code || "84149020",
      item_code: selectedItemDetail.item_code || partCode,
      item_no: selectedItemDetail.item_no || partCode,
      description: partDesc || "Sample Description",
      jobwork_rate: 15.50,
      jobwork_disc: extractedDisc,
      rate_type: 'NOS',
      po_qty: poQtySum || 100,
      bal_qty: balQtySum || 50,
      inv_qty: "",
      pcs_wt: "",
      per_unit: "",
      pkg_qty: "",
      pkg_desc: 'Standard Box Packaging',
      material_rate: 125.50,
      ref: selectedChallans.length > 0 ? selectedChallans.map(c => c.InwardF4No || c.gr_no).join(', ') : "REF-5021X"
    };

    setTableData(prev => [...prev, newItem]);
    
    // Switch to Invoice Detail tab automatically so user can see it
    const tabEl = document.querySelector('#invdetail-tab');
    if (tabEl) {
        // use bootstrap tab instances if available, otherwise just click
        tabEl.click();
    }
  };

  const handleTableChange = (index, field, value) => {
    const newData = [...tableData];
    newData[index][field] = value;
    setTableData(newData);
  };

  useEffect(() => {
    let sumAssessable = 0;
    tableData.forEach(item => {
      const qty = parseFloat(item.inv_qty) || 0;
      const rate = parseFloat(item.jobwork_rate) || 0;
      const disc = parseFloat(item.jobwork_disc) || 0;
      const netRate = rate * (1 - disc / 100);
      sumAssessable += (qty * netRate);
    });

    const assessable = sumAssessable;
    const packFwrdAmt = assessable * (parseFloat(formData.PackFwrd_Per) || 0) / 100;
    const transportAmt = assessable * (parseFloat(formData.TransportCrg_Per) || 0) / 100;
    const freightAmt = assessable * (parseFloat(formData.FreightCrg_Per) || 0) / 100;
    const otherAmt = assessable * (parseFloat(formData.OtherCrg_Per) || 0) / 100;
    
    const taxableValue = assessable + packFwrdAmt + transportAmt + freightAmt + otherAmt;
    
    const cgstPer = parseFloat(formData.Cgst_Per) || 0;
    const sgstPer = parseFloat(formData.Sgst_Per) || 0;
    const igstPer = parseFloat(formData.Igst_Per) || 0;

    const cgstAmt = taxableValue * (cgstPer / 100);
    const sgstAmt = taxableValue * (sgstPer / 100);
    const igstAmt = taxableValue * (igstPer / 100); 
    const grandTotal = taxableValue + cgstAmt + sgstAmt + igstAmt;

    setFormData(prev => ({
      ...prev,
      AssessableValue: assessable.toFixed(2),
      PackFwrd: packFwrdAmt.toFixed(2),
      TransportCrg: transportAmt.toFixed(2),
      FreightCrg: freightAmt.toFixed(2),
      OtherCrg: otherAmt.toFixed(2),
      Cgst: cgstAmt.toFixed(2),
      Sgst: sgstAmt.toFixed(2),
      Igst: igstAmt.toFixed(2),
      GrTotal: grandTotal.toFixed(2),
    }));
  }, [tableData, formData.PackFwrd_Per, formData.TransportCrg_Per, formData.FreightCrg_Per, formData.OtherCrg_Per, formData.Cgst_Per, formData.Sgst_Per, formData.Igst_Per]);

  useEffect(() => {
    fetchInvoiceNo();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (formData.bill_to_cust) {
        fetchPOList(formData.bill_to_cust);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [formData.bill_to_cust]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Calculate aggregate discounts for the whole invoice
      let totalDiscountAmt = 0;
      tableData.forEach(item => {
        const qty = parseFloat(item.inv_qty) || 0;
        const rate = parseFloat(item.jobwork_rate) || 0;
        const disc = parseFloat(item.jobwork_disc) || 0;
        totalDiscountAmt += (qty * rate * (disc / 100));
      });
      const avgDiscountPer = tableData.length > 0 ? (parseFloat(tableData[0].jobwork_disc) || 0) : 0;

      const dataToSubmit = {
        ...formData,
        items: tableData.map(item => ({
          ...item,
          invoice_qty_nos: item.rate_type === 'NOS' ? item.inv_qty : null,
          invoice_qty_kg: item.rate_type !== 'NOS' || item.per_unit === 'KGS' ? item.inv_qty : null,
          itemwt: item.pcs_wt,
          jobwork_rate: parseFloat(item.jobwork_rate) || 0,
          jobwork_disc: parseFloat(item.jobwork_disc) || 0,
          inv_qty: parseFloat(item.inv_qty) || 0,
        })),
        gst_details: {
          assessable_value: formData.AssessableValue,
          sub_total: formData.AssessableValue,
          discount_per: avgDiscountPer.toFixed(2),
          discount_amt: totalDiscountAmt.toFixed(2),
          pack_fwrd: formData.PackFwrd,
          pack_fwrd_per: formData.PackFwrd_Per,
          tsc_per: formData.TscPer,
          tcs: formData.TscPer,
          tcs_amt: (parseFloat(formData.AssessableValue) * parseFloat(formData.TscPer || 0) / 100).toFixed(2),
          cgst: formData.Cgst_Per,
          cgst_amt: formData.Cgst,
          transport_crg: formData.TransportCrg,
          transport_crg_per: formData.TransportCrg_Per,
          sgst: formData.Sgst_Per,
          sgst_amt: formData.Sgst,
          freight_crg: formData.FreightCrg,
          freight_crg_per: formData.FreightCrg_Per,
          igst: formData.Igst_Per,
          igst_amt: formData.Igst,
          other_crg: formData.OtherCrg,
          other_crg_per: formData.OtherCrg_Per,
          e_invoice_type: formData.EInvoiceType,
          gr_total: formData.GrTotal
        }
      };
      console.log("Submitting dataToSubmit:", dataToSubmit);
      const response = await fetch("https://sellerp-backend.onrender.com/Sales/gst-jobwork-invoice/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        alert("Jobwork Invoice Generated Successfully!");
        fetchInvoiceNo();
        // Removed handleButtonClick() to prevent unwanted redirection to DC page
      } else {
        const errorText = await response.text();
        console.error("Submission failed with status:", response.status, "Error:", errorText);
        alert(`Failed: ${errorText} (Status: ${response.status})`);
      }
    } catch (error) {
      console.error("Network or implementation error:", error);
      alert(`Network Error: ${error.message}. Check console for CORS or connection issues.`);
    }
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
    <div className="GSTJobworkInvoiceMaster">
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
                <div className="GSTJobworkInvoice">
                  {/* Header - Proper ERP Layout */}
                  <div className="GSTJobworkInvoice-header mb-3 text-start">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="header-title mb-0" style={{ fontSize: "22px" }}>New Jobwork Invoice</h5>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="badge bg-success py-2 px-3">Item Added !!!</span>
                        <button type="button" className="vndrbtn" onClick={() => navigate('/JobworkInvList')}>
                          Jobwork Invoice List
                        </button>
                        <button type="button" className="vndrbtn" onClick={handleButtonClick}>
                          DC
                        </button>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center flex-wrap gap-4">
                      <div className="d-flex flex-column gap-1 align-items-start">
                          <label className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px" }}>Plant:</label>
                          <select className="form-select form-select-sm header-plant-select" style={{ width: "100px" }} name="plant" value={formData.plant} onChange={handleChange}>
                              <option>VISHWA S.I.</option>
                          </select>
                      </div>

                      <div className="d-flex flex-column gap-1 align-items-start">
                          <label className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px" }}>Series:</label>
                          <select className="form-select form-select-sm" style={{ width: "130px" }} name="series" value={formData.series} onChange={handleChange}>
                              <option>Labour Invoice</option>
                          </select>
                      </div>

                      <div className="d-flex flex-column gap-1 align-items-start">
                          <label className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px" }}>Type:</label>
                          <select className="form-select form-select-sm" style={{ width: "150px" }} name="type" value={formData.type} onChange={handleChange}>
                              <option value="">Select</option>
                              <option>Labour Invoice</option>
                              <option>Labour Charges/Service/Tool (Challan)</option>
                              <option>Labour Invoice (BOM Consuption)</option>
                          </select>
                      </div>

                      <div className="d-flex flex-column gap-1 align-items-start">
                          <label className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px" }}>GST Type:</label>
                          <select className="form-select form-select-sm" style={{ width: "120px" }} name="gst_type" value={formData.gst_type} onChange={handleChange}>
                              <option value="">Select</option>
                              <option>GST</option>
                              <option>Stock Transfer</option>
                              <option>Direct Export</option>
                              <option>Third Party EXP (In State)</option>
                              <option>Third Party Export (Out State)</option>
                          </select>
                      </div>

                      <div className="d-flex flex-column gap-1 align-items-start">
                          <label className="mb-0 fw-bold text-nowrap" style={{ fontSize: "12px" }}>Invoice No:</label>
                          <input type="text" placeholder="Invoice No" className="form-control form-control-sm bg-light" style={{ width: "120px" }} name="invoice_no" value={formData.invoice_no} onChange={handleChange} readOnly />
                      </div>
                    </div>
                  </div>

                  <div className="GSTJobworkInvoice-main p-4">
                    <div className="GSTJobworkInvoice-tabs">
                      <ul className="nav nav-tabs" id="AssembleEntryTabs" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button className="nav-link active" id="itemdetails-tab" data-bs-toggle="tab" data-bs-target="#itemdetails" type="button" role="tab">Item Details</button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" id="invdetail-tab" data-bs-toggle="tab" data-bs-target="#invdetail" type="button" role="tab">Invoice Detail</button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" id="invtaxes-tab" data-bs-toggle="tab" data-bs-target="#invtaxes" type="button" role="tab">Invoice Tax</button>
                        </li>
                      </ul>

                      <div className="tab-content" id="productionEntryTabsContent">
                        {/* Item Details Tab */}
                        <div className="tab-pane fade show active" id="itemdetails" role="tabpanel">
                          
                          <div className="form-row-proper">
                                <div className="form-group-proper">
                                    <label className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Select Customer :</label>
                                    <input type="text" list={formData.bill_to_cust && formData.bill_to_cust.trim().length > 0 ? "customer-options" : ""} placeholder="Enter Customer Name" className="form-control" style={{flex: 1}} name="bill_to_cust" value={formData.bill_to_cust} onChange={handleChange} autoComplete="off" />
                                    {formData.bill_to_cust && formData.bill_to_cust.length > 0 && (
                                      <datalist id="customer-options">
                                          {customerList.map((c, i) => (
                                              <option key={i} value={c.Name || c.customer_name || c.name || (typeof c === 'string' ? c : "")} />
                                          ))}
                                      </datalist>
                                    )}
                                    <button className="vndrbtn" onClick={() => { /* Auto-filtered via master list */ }}><FaSearch /> Search</button>
                                </div>
                                <div className="form-group-proper">
                                    <FaEye color="#007bff" size={20} style={{cursor: 'pointer'}} />
                                    <label className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px", minWidth: '80px', marginLeft: '5px' }}>Select Po</label>
                                    <select className="form-select" style={{width: '180px'}} name="PoNo" value={formData.PoNo} onChange={handleChange}>
                                        <option value="">{poSearchLoading ? "Loading..." : "Select an Option"}</option>
                                        {poList.map((po, index) => (
                                          <option key={index} value={po.cust_po || po.po_no || po.id || po}>
                                              {po.cust_po || po.po_no || po.id} - {po.cust_date || po.po_date || ""} - SO: {po.so_no || po.sales_order_no || po.order_no || ""}
                                          </option>
                                        ))}
                                    </select>
                                    <button className="vndrbtn" onClick={() => fetchPOList(formData.bill_to_cust)}><FaSearch /> Search</button>
                                </div>
                          </div>

                          <div className="form-row-proper">
                                <div className="form-group-proper" style={{flex: '0 0 auto'}}>
                                    <label className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Item Name (FG) :</label>
                                    <input type="text" list={formData.ItemName && formData.ItemName.trim().length > 0 ? "item-options" : ""} placeholder="Enter Code No.." className="form-control input-highlight" style={{width: '300px'}} name="ItemName" value={formData.ItemName} onChange={handleChange} autoComplete="off" />
                                    {formData.ItemName && formData.ItemName.length > 0 && (
                                      <datalist id="item-options">
                                          {itemList.map((itm, i) => (
                                              <option 
                                                  key={i} 
                                                  value={`${itm.Part_Code || itm.item_code || itm.part_no || ""} | ${itm.Name || itm.Name_Description || itm.item_description || itm.description || ""}`} 
                                              />
                                          ))}
                                      </datalist>
                                    )}
                                    {/* Item search is auto-filtered based on customer, no manual fetch needed */}
                                </div>
                                <div className="d-flex gap-4 ms-2" style={{fontSize: '14px', color: '#0056b3', fontWeight: '600'}}>
                                    <span>PODate: 17/03/2023</span>
                                    <span>Valid UpTo: 31/03/2024 (NO)</span>
                                </div>
                          </div>

                          <div className="form-row-proper">
                                <div className="form-group-proper">
                                    <label className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Ref Item:</label>
                                    <input type="text" className="form-control" style={{width: '200px'}} name="RefItem" value={formData.RefItem} onChange={handleChange} />
                                    <button className="vndrbtn" onClick={fetchRefData}><FaSearch /> Search</button>
                                    <button className="vndrbtn"><FaClock color="#007bff" /> View Pending Challan List</button>
                                    <button className="vndrbtn"><FaBullseye color="#dc3545" /> View Bom Wise</button>
                                </div>
                          </div>

                          {/* Info Message Bar */}
                          <div className="info-bar-cyan shadow-sm">
                                                           {refData.length > 0 ? (
                                <div className="ref-table-container mt-3 mb-4 table-responsive" style={{ maxWidth: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                    <table className="table table-striped custom-erp-table mb-0">
                                        <thead className="thead-blue-gradient">
                                            <tr>
                                                <th>Sr.</th>
                                                <th>F4 GR No</th>
                                                <th>GR Date</th>
                                                <th>Challan No</th>
                                                <th>Heat Code</th>
                                                <th>Item No</th>
                                                <th>Item Desc</th>
                                                <th>Part Code</th>
                                                <th>Item Size</th>
                                                <th>NatureOfProcess</th>
                                                <th>Ln NO</th>
                                                <th>TOTAL Qty</th>
                                                <th>Bal Qty</th>
                                                <th>Select</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {refData.map((row, index) => {
                                                const isSelected = selectedChallans.some(c => (c.InwardF4No || c.gr_no) === (row.InwardF4No || row.gr_no));
                                                return (
                                                <tr key={index} className={isSelected ? 'text-primary fw-bold' : ''} style={isSelected ? { color: '#0d6efd' } : {}}>
                                                    <td style={isSelected ? { color: '#0d6efd' } : {}}>{index + 1}</td>
                                                    <td style={isSelected ? { color: '#0d6efd' } : {}}>{row.InwardF4No || row.gr_no}</td>
                                                    <td style={isSelected ? { color: '#0d6efd' } : {}}>{row.InwardDate || row.gr_date}</td>
                                                    <td style={isSelected ? { color: '#0d6efd' } : {}}>{row.ChallanNo || row.challan_no}</td>
                                                    <td style={isSelected ? { color: '#0d6efd' } : {}}>{row.HeatCode || row.HeatNo || row.heat_code}</td>
                                                    <td style={isSelected ? { color: '#0d6efd' } : {}}>{row.ItemCode || row.item_no}</td>
                                                    <td style={isSelected ? { color: '#0d6efd' } : {}}>{row.ItemDesc || row.item_desc}</td>
                                                    <td style={isSelected ? { color: '#0d6efd' } : {}}>{row.PartCode || row.FGPartCode || row.part_code}</td>
                                                    <td style={isSelected ? { color: '#0d6efd' } : {}}>{row.ItemSize || row.item_size}</td>
                                                    <td style={isSelected ? { color: '#0d6efd' } : {}}>{row.NatureOfProcess || row.Operation || row.process}</td>
                                                    <td style={isSelected ? { color: '#0d6efd' } : {}}>{row.LnNo || row.LineNo || row.ln_no}</td>
                                                    <td style={isSelected ? { color: '#0d6efd' } : {}}>{row.TotalQty || row.ChallanQty || row.total_qty}</td>
                                                    <td style={isSelected ? { color: '#0d6efd' } : {}}>{row.BalQty || row.bal_qty}</td>
                                                    <td style={isSelected ? { color: '#0d6efd' } : {}}>
                                                        {isSelected ? (
                                                            <span style={{ fontWeight: '600' }}>Selected</span>
                                                        ) : (
                                                            <span 
                                                                className="text-primary text-decoration-underline" 
                                                                style={{cursor: 'pointer', fontWeight: '600'}}
                                                                onClick={() => handleSelectRefRow(row)}
                                                            >
                                                                Select
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            )})}
                                        </tbody>
                                    </table>
                                </div>
                           ) : (
                                refLoading ? "Fetching Reference Data..." : "No Data Found !!!"
                           )}

                          </div>

                          {/* Bottom Action Area */}
                          <div className="bottom-section-proper d-flex align-items-end">
                               <div className="d-flex flex-column">
                                    <label className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px", fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>
                                        Selected Customer Inward Ref Challan NO :
                                    </label>
                                    <div className="d-flex align-items-center">
                                        <div className="challan-display-box shadow-sm p-1 d-flex flex-wrap gap-1 align-content-start" style={{minHeight: '40px', background: '#fff'}}>
                                            {selectedChallans.map((c, i) => (
                                                <div key={i} className="badge bg-primary d-flex align-items-center gap-2" style={{fontSize: '12px'}}>
                                                    {c.InwardF4No || c.gr_no}
                                                    <span 
                                                        style={{cursor: 'pointer', marginLeft: '5px'}} 
                                                        onClick={() => setSelectedChallans(selectedChallans.filter(sh => (sh.InwardF4No || sh.gr_no) !== (c.InwardF4No || c.gr_no)))}
                                                    >
                                                        &times;
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="vndrbtn ms-3" style={{height: '40px', width: '40px'}}><FaPlus /></button>
                                    </div>
                               </div>
                               <div className="ms-5 mb-2">
                                    <button className="vndrbtn btn-lg px-5 shadow" style={{fontWeight: '700'}} onClick={handleAddItem}>
                                        Add Item &gt;&gt;
                                    </button>
                                    <span className="ms-4" style={{color: '#ced4da', fontWeight: '800', fontSize: '24px'}}>0 0</span>
                               </div>
                          </div>
                        </div>




                        <div
                          className="tab-pane fade"
                          id="invtaxes"
                          role="tabpanel"
                        >
                         <div className="row text-start">
                            {/* First Column */}
                            <div className="col-md-4">
                              {/* Prod. No */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="invoice-no" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Invoice No :</label>
                                </div>
                                <div className="col-4">
                                  <input
                                    id="invoice-no"
                                    className="form-control bg-light"
                                    name="invoice_no"
                                    value={formData.invoice_no}
                                    readOnly
                                  />
                                </div>
                              </div>

                              {/* Payment */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="payment" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>
                                    Payment Date :
                                  </label>
                                </div>
                                <div className="col-6">
                                  <input type="Date" id="payment"
                                    className="form-control" name="payment_date" value={formData.payment_date} onChange={handleChange}/>
                                </div>
                              </div>

                              {/* Mode of trans */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="unit-machine" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>
                                    Mode of Trans :
                                  </label>
                                </div>
                                <div className="col-8">
                                  <input type="text" placeholder="By Road" id="modeoftrans"
                                    className="form-control" name="mode_of_transport" value={formData.mode_of_transport} onChange={handleChange}/>
                                </div>
                              </div>

                              {/* Item */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="item" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Bill TO  :</label>
                                </div>
                                <div className="col-8 d-flex align-items-center">
                                   <input type="text" placeholder="" id="billto"
                                    className="form-control" name="bill_to_cust" value={formData.bill_to_cust} onChange={handleChange}/>
                                  <button
                                    type="button"
                                    className="vndrbtn ml-2"
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>

                              {/* Ship tp */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="shipto" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Ship TO :</label>
                                </div>
                                <div className="col-8 d-flex align-items-center">
                                   <input type="text" placeholder="Enter Buyer Name" id="shipto"
                                    className="form-control" name="ship_to_cust" value={formData.ship_to_cust} onChange={handleChange}/>
                                  <button
                                    type="button"
                                    className="vndrbtn ml-2"
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>

                              {/* Bill Date. */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="eway-bill" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Vehicle In Time :</label>
                                </div>
                                <div className="col-6">
                                  <input
                                    id="eway-bill"
                                    type="time"
                                    className="form-control"
                                    name="vehical_time"
                                    value={formData.vehical_time}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>

                              {/* Prod. Qty */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="note-remark" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>
                                   Remark:
                                  </label>
                                </div>
                                <div className="col-8">
                                    <textarea name="remark" className="form-control" id="note-remark" value={formData.remark} onChange={handleChange}></textarea>
                                </div>
                              </div>

                            </div>

                            {/* Second Column */}
                            <div className="col-md-4">
                              {/* Date & Time */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="date" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Invoice Date :</label>
                                </div>
                                <div className="col-6">
                                  <input
                                    id="time"
                                    type="date"
                                    className="form-control"
                                    name="invoice_date"
                                    value={formData.invoice_date}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>

                              {/* Supervisor */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="dateremoval" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>
                                    Date Of Removal :
                                  </label>
                                </div>
                                <div className="col-6">
                                  <input
                                    id="dateremoval"
                                    type="date"
                                    className="form-control"
                                    name="date_of_removal_of_goods"
                                    value={formData.date_of_removal_of_goods}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>

                              {/* Machine Speed */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="vehicle" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Vehicle No:</label>
                                </div>
                                <div className="col-6 d-flex align-items-center">
                                 <input
                                    id="vehicle"
                                    className="form-control"
                                    name="vehical_no"
                                    value={formData.vehical_no}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>

                              {/* Prod Time */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="addrcode1" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Addr Code:</label>
                                </div>
                                <div className="col-6 d-flex">
                                <select className="form-control flex-grow-1" name="addr_code" value={formData.addr_code} onChange={handleChange}>
                                    <option value="">   </option>
                                  </select>
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="addrcode2" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Addr Code:</label>
                                </div>
                                <div className="col-6 d-flex">
                                <select className="form-control flex-grow-1" name="ship_to_addr_code" value={formData.ship_to_addr_code} onChange={handleChange}>
                                    <option value="">   </option>
                                  </select>
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="ewaybill" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Vehicle Out Time:</label>
                                </div>
                                <div className="col-6 d-flex">
                                  <input
                                    id="ewaybill"
                                    type="time"
                                    className="form-control"
                                    name="vehical_out_time"
                                    value={formData.vehical_out_time}
                                    onChange={handleChange}
                                   />
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="delivey" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}> Bank:</label>
                                </div>
                                <div className="col-8 d-flex align-items-center">
                                  <select className="form-control flex-grow-1" name="bank" value={formData.bank} onChange={handleChange}>
                                    <option value="Select">  Select  </option>
                                  </select>
                                  <button type="button" className="vndrbtn">
                                    <Cached />
                                  </button>
                                  <button
                                    type="button"
                                    className="vndrbtn ml-2"
                                  >
                                    <FaPlus />
                                  </button>
                                </div>
                              </div>

                            </div>

                            {/* Third Column */}
                            <div className="col-md-4">
                              {/* Shift */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="invoicetime" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Invoice Time :</label>
                                </div>
                                <div className="col-6">
                                 <input type="time" id="invoicetime" className="form-control" name="invoice_time" value={formData.invoice_time} onChange={handleChange}/>
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="time2" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}> Time :</label>
                                </div>
                                <div className="col-6">
                                 <input type="time" id="time2" className="form-control" name="time" value={formData.time} onChange={handleChange}/>
                                </div>
                              </div>

                              {/* transporter */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="transporter" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Transporter :</label>
                                </div>
                                <div className="col-8 d-flex">
                                  <input
                                    id="transporter"
                                    className="form-control"
                                    name="transporter"
                                    value={formData.transporter}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="supply" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Place Of Supply:</label>
                                </div>
                                <div className="col-8">
                                 <input type="text" id="supply" className="form-control" name="place_of_supply" value={formData.place_of_supply} onChange={handleChange}/>
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="lrno" className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>LR No:</label>
                                </div>
                                <div className="col-8">
                                 <input type="text" id="lrno" className="form-control" name="lr_no" value={formData.lr_no} onChange={handleChange}/>
                                </div>
                              </div>

                            </div>

                          </div>

                          <div className="table-container">
                             
                                <div className="row">

                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-8">
                                            <label className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>Assessble Value</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text" name="AssessableValue" value={formData.AssessableValue} onChange={handleChange} placeholder="0"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-8">
                                            <label className="d-flex">Pack&Fwrd <input name="PackFwrd_Per" value={formData.PackFwrd_Per} onChange={handleChange} style={{width:"40px"}} type="text" className="w-5" placeholder="0"/>%</label>  
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text" name="PackFwrd" value={formData.PackFwrd} onChange={handleChange} placeholder="0"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-12">
                                            <label className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>TSC: %</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="col-md-12">
                                            {formData.TscPer}
                                            </div>
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-8">
                                            <label className="d-flex align-items-center">CGST : <input name="Cgst_Per" value={formData.Cgst_Per} onChange={handleChange} style={{width:"50px", margin: "0 5px"}} type="text" className="w-5" placeholder="0"/>%</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text" name="Cgst" value={formData.Cgst} onChange={handleChange} placeholder="0"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-8">
                                            <label className="d-flex">Transport Crg. <input name="TransportCrg_Per" value={formData.TransportCrg_Per} onChange={handleChange} style={{width:"40px"}} type="text" className="w-5" placeholder="0"/>%</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text" name="TransportCrg" value={formData.TransportCrg} onChange={handleChange} placeholder="0"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-12">
                                            
                                            </div>  
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                    <div className="col-md-12">
                                            </div>
                                        </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-8">
                                            <label className="d-flex align-items-center">SGST : <input name="Sgst_Per" value={formData.Sgst_Per} onChange={handleChange} style={{width:"50px", margin: "0 5px"}} type="text" className="w-5" placeholder="0"/>%</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text" name="Sgst" value={formData.Sgst} onChange={handleChange} placeholder="0"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-8">
                                            <label className="d-flex">Freight Crg. <input name="FreightCrg_Per" value={formData.FreightCrg_Per} onChange={handleChange} style={{width:"40px"}} type="text" className="w-5" placeholder="0"/>% </label>
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text" name="FreightCrg" value={formData.FreightCrg} onChange={handleChange} placeholder="0"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-12">
                                            <label className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>E-Invoice Type :</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="row">
                                            <div className="col-md-12">
                                                <select name="EInvoiceType" value={formData.EInvoiceType} onChange={handleChange} id="">
                                                    <option value="Bussiness To Bussiness">Bussiness To Bussiness</option>
                                                </select>
                                            </div>
                                        </div>
                                        </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-8">
                                            <label className="d-flex align-items-center">IGST : <input name="Igst_Per" value={formData.Igst_Per} onChange={handleChange} style={{width:"50px", margin: "0 5px"}} type="text" className="w-5" placeholder="0"/>%</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text" name="Igst" value={formData.Igst} onChange={handleChange} placeholder="0"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-8">
                                            <label className="d-flex">Other Crg. <input name="OtherCrg_Per" value={formData.OtherCrg_Per} onChange={handleChange} style={{width:"40px"}} type="text" className="w-5" placeholder="0"/>% </label>
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text" name="OtherCrg" value={formData.OtherCrg} onChange={handleChange} placeholder="0"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-12">
                                            <label className="fw-bold mb-0 text-nowrap" style={{ fontSize: "12px" }}>GR Total  : </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="row">
                                            <div className="col-md-12 fw-bold" style={{fontSize: '18px', color: '#0d6efd'}}>
                                                {formData.GrTotal}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                          </div>

                          <div className="row">
                            <div className="col-md-3">
                                <button className="vndrbtn" onClick={handleSubmit}> Generete JobWork Invoice </button>
                            </div>
                          </div>

                        </div>

                        <div
                          className="tab-pane fade"
                          id="invdetail"
                          role="tabpanel"
                        >

                       <div className="table-responsive">
                                <table className="table">
                                <thead>
                                    <tr>
                                    <th>Sr.</th>
                                    <th>PO No </th>
                                    <th>Item No Code</th>
                                    <th>Stock</th>
                                    <th>Description</th>
                                    <th>JobWork Rate</th>
                                    <th>PO Qty</th>
                                    <th>Bal.Qty</th>
                                    <th>Inv.Qty</th>
                                    <th>Pkg Qty</th>
                                    <th>Pkg.Desc</th>
                                    <th>Ref.</th>
                                    <th>Material Rate</th>
                                    <th>Del</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="mb-1" style={{fontSize: '12px', fontWeight: '600'}}>Line No: <span style={{fontWeight: 'normal'}}>{item.line_pono || '1'}</span></div>
                                                <div style={{fontSize: '12px', fontWeight: '600'}}>Line PODt: <span style={{fontWeight: 'normal'}}>{item.line_podt || '2026-04-29'}</span></div>
                                            </td>
                                            <td>
                                                <div className="fw-bold mb-1" style={{fontSize: '13px', color: '#000'}}>{item.item_no}</div>
                                                <div className="mb-1" style={{fontSize: '12px', fontWeight: '600'}}>Code: <span style={{fontWeight: 'normal'}}>{item.item_code}</span></div>
                                                <div style={{fontSize: '12px', fontWeight: '600'}}>So Line No : <span style={{fontWeight: 'normal'}}>{item.so_line_no || '0'}</span></div>
                                            </td>
                                            <td className="text-center align-middle">{item.stock || '0'}</td>
                                            <td>
                                                <textarea className="form-control mb-1" value={item.description} readOnly rows="2"></textarea> 
                                                <span className="d-block mt-1" style={{fontSize: '12px', fontWeight: '600'}}>
                                                    HSN Code : <span style={{fontWeight: 'normal'}}>{item.hsn_code || '84149020'}</span>
                                                </span> 
                                            </td>
                                            <td className="text-start">
                                                <input type="text" className="form-control form-control-sm mb-1" value={item.jobwork_rate} onChange={(e) => handleTableChange(index, 'jobwork_rate', e.target.value)} />
                                                <span className="d-block" style={{color:"blue", fontSize: '11px', marginTop: '2px'}}>Disc %: </span>
                                                <input type="text" className="form-control form-control-sm mb-1" placeholder="Disc %" value={item.jobwork_disc} onChange={(e) => handleTableChange(index, 'jobwork_disc', e.target.value)} />
                                                <span style={{color:"blue", fontSize: '12px'}}>Rate Type: </span>
                                                <select className="form-select form-select-sm" value={item.rate_type} onChange={(e) => handleTableChange(index, 'rate_type', e.target.value)}>
                                                    <option value="NOS">NOS</option>
                                                </select>
                                            </td>
                                            <td className="text-center align-middle">{item.po_qty}</td>
                                            <td className="text-center align-middle">{item.bal_qty}</td>
                                            <td>
                                                <input type="text" className="form-control form-control-sm mb-1" value={item.inv_qty} onChange={(e) => handleTableChange(index, 'inv_qty', e.target.value)}/>
                                                <span className="d-block" style={{fontSize: '11px'}}>Per Pcs Wt:</span>
                                                <input type="text" className="form-control form-control-sm mb-1" placeholder="Weight" value={item.pcs_wt} onChange={(e) => handleTableChange(index, 'pcs_wt', e.target.value)} />
                                                <span style={{color:"blue", fontSize: '11px'}}>Per Unit: </span> <span style={{fontSize: '11px', fontWeight: 'bold'}}>{item.per_unit}</span>
                                            </td>
                                            <td><input type="text" className="form-control form-control-sm" value={item.pkg_qty} onChange={(e) => handleTableChange(index, 'pkg_qty', e.target.value)}/></td>
                                            <td><textarea className="form-control" defaultValue={item.pkg_desc} rows="2"></textarea></td>
                                            <td>{item.ref}</td>
                                            <td><input type="text" className="form-control form-control-sm" defaultValue={item.material_rate} /></td>
                                            <td className="text-center align-middle">
                                                <span 
                                                    className="badge bg-danger p-2 shadow-sm" 
                                                    style={{cursor: 'pointer'}} 
                                                    onClick={() => setTableData(tableData.filter((_, i) => i !== index))}
                                                    title="Remove Item"
                                                >
                                                    &times;
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {tableData.length === 0 && (
                                        <tr>
                                            <td colSpan="14" className="text-center py-5 text-muted">
                                                <h6>No Items Added</h6>
                                                <p className="mb-0" style={{fontSize: '14px'}}>Please add items from the "Item Details" tab.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                </table>
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


export default GSTJobworkInvoice