import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./NewProformaInvoice.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const NewProformaInvoice = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().split(" ")[0];

  const [formData, setFormData] = useState({
    invoice_no: "",
    series: "",
    type: "With SO",
    tax_type: "GST",
    invoice_date: today,
    invoice_time: currentTime,
    project_no: "",
    bank_details: "",
    bank_note: "",
    initiator: "",
    freight: "",
    buyer: "",
    buyers_order_no: "",
    order_date: today,
    delivery_date: today,
    vehicle_no: "",
    transporter_name: "",
    destination: "",
    payment_terms: "",
    delivery_note: "",
  });

  const [tableData, setTableData] = useState([]);

  const [taxData, setTaxData] = useState({
    rate_qty: "00.00",
    discount_amount: "00.00",
    assessable_value: "0",
    cgst: "00.00",
    cgst_pct: "0",
    sgst: "00.00",
    sgst_pct: "0",
    igst: "00.00",
    igst_pct: "0",
    utgst: "00.00",
    utgst_pct: "0",
    tcs: "0",
    tds_on: "Assess",
    pkg_fwd_pct: "",
    pkg_fwd_amt: "",
    other_insurance: "",
    other_insurance_pct: "",
    loading_freight: "",
    loading_freight_pct: "",
    less_advance_pct: "",
    demand_advance_pct: "",
    retention_pct: "",
    retention_amount: "",
    gr_total: "0",
  });

  const [customers, setCustomers] = useState([]);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItemNo, setSelectedItemNo] = useState("");
  const [soList, setSoList] = useState([]);
  const [selectedSO, setSelectedSO] = useState("");
  const [newRow, setNewRow] = useState({
    po_no: "",
    po_date: "",
    item_no: "",
    item_code: "",
    description: "",
    other_desc: "",
    rate_per_qty: "1Nos",
    rate: "",
    rate_type: "NOS",
    desc_pct: "",
    disc_amt: "",
    rate_with_disc: "",
    hc: "",
    fc: "",
    po_qty: "",
    bal_qty: "",
    invoice_qty: "",
    unit_code: "",
    per: "",
    per_unit: "",
    fc_rate: "",
    item_per_pc: "",
    wt: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaxChange = (e) => {
    const { name, value } = e.target;
    setTaxData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewRowChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleTableChange = (index, field, val) => {
    setTableData((prev) => {
      const newData = [...prev];
      const updatedRow = { ...newData[index], [field]: val };

      // Universally recalculate dependent fields on any change
      const rateVal = parseFloat(updatedRow.rate) || 0;
      const descPctVal = parseFloat(updatedRow.desc_pct) || 0;
      const discAmt = (rateVal * (descPctVal / 100)).toFixed(2);
      updatedRow.disc_amt = discAmt;
      updatedRow.rate_with_disc = (rateVal - parseFloat(discAmt)).toFixed(2);

      const poQty = parseFloat(updatedRow.po_qty) || 0;
      const invQty = parseFloat(updatedRow.invoice_qty) || 0;
      updatedRow.bal_qty = (poQty - invQty).toString();

      newData[index] = updatedRow;
      return newData;
    });
  };

  const handleAddRow = () => {
    // 1. Find the selected order
    const selectedOrder = soList.find(so => {
      if (!so || typeof so !== "object") return so === selectedSO;
      const soVal = so.cust_po || so.so_no || so.po_no || so.po || "";
      return soVal === selectedSO;
    });

    // 2. Find the selected item within that order
    let fetchedItem = null;
    if (selectedOrder && Array.isArray(selectedOrder.item)) {
      fetchedItem = selectedOrder.item.find(i => {
        const itemVal = i.item_no || i.item_code || i.item_description || "";
        return itemVal === selectedItemNo;
      });
    }

    const initialRateStr = fetchedItem?.rate || newRow.rate || "0";
    const initRate = parseFloat(initialRateStr) || 0;
    const initDescPct = parseFloat(newRow.desc_pct) || 0;
    const initDiscAmt = (initRate * (initDescPct / 100)).toFixed(2);
    const initRateWithDisc = (initRate - parseFloat(initDiscAmt)).toFixed(2);
    
    const initialPoQtyStr = fetchedItem?.qty || newRow.po_qty || "0";
    const initPoQty = parseFloat(initialPoQtyStr) || 0;
    const initInvoiceQtyStr = newRow.invoice_qty;
    // Default invoice_qty to po_qty if empty, so taxes calculate properly immediately
    const initInvoiceQty = initInvoiceQtyStr !== "" ? parseFloat(initInvoiceQtyStr) || 0 : initPoQty; 
    const initBalQty = (initPoQty - initInvoiceQty).toString();

    const emptyRow = {
      sr: tableData.length + 1,
      po_no: fetchedItem?.pr_no || selectedOrder?.cust_po || newRow.po_no || "",
      po_date: selectedOrder?.po_rec_date || selectedOrder?.so_date || newRow.po_date || "",
      item_no: fetchedItem?.item_no || newRow.item_no || selectedItemNo || "",
      item_code: fetchedItem?.item_code || newRow.item_code || "",
      description: fetchedItem?.item_description || newRow.description || "",
      other_desc: fetchedItem?.desc || newRow.other_desc || "",
      rate_per_qty: newRow.rate_per_qty || "1Nos",
      rate: initialRateStr,
      rate_type: fetchedItem?.uom || newRow.rate_type || "NOS",
      desc_pct: newRow.desc_pct || "",
      disc_amt: initDiscAmt,
      rate_with_disc: initRateWithDisc,
      hc: newRow.hc || "",
      fc: newRow.fc || "",
      po_qty: initialPoQtyStr,
      bal_qty: initBalQty,
      invoice_qty: initInvoiceQty.toString(),
      unit_code: fetchedItem?.uom || newRow.unit_code || "",
      per: newRow.per || "",
      per_unit: newRow.per_unit || "",
      fc_rate: newRow.fc_rate || "",
      item_per_pc: newRow.item_per_pc || "",
      wt: fetchedItem?.item_wt || newRow.wt || "",
      weight: newRow.weight || "",
      // Hidden fields for tax subtraction on deletion
      _tax_assessable_value: fetchedItem?.assessable_value || 0,
      _tax_cgst: fetchedItem?.cgst_amt || 0,
      _tax_sgst: fetchedItem?.sgst_amt || 0,
      _tax_igst: fetchedItem?.igst_amt || 0,
      _tax_utgst: fetchedItem?.utgst_amt || 0,
      _tax_gr_total: fetchedItem?.gr_total || 0,
    };
    setTableData((prev) => [...prev, emptyRow]);
    
    // Also populate taxes if we found the item
    if (fetchedItem) {
      setTaxData((prev) => ({
        ...prev,
        assessable_value: (parseFloat(prev.assessable_value || 0) + parseFloat(fetchedItem.assessable_value || 0)).toFixed(2),
        cgst_pct: fetchedItem.cgst || prev.cgst_pct,
        cgst: (parseFloat(prev.cgst || 0) + parseFloat(fetchedItem.cgst_amt || 0)).toFixed(2),
        sgst_pct: fetchedItem.sgst || prev.sgst_pct,
        sgst: (parseFloat(prev.sgst || 0) + parseFloat(fetchedItem.sgst_amt || 0)).toFixed(2),
        igst_pct: fetchedItem.igst || prev.igst_pct,
        igst: (parseFloat(prev.igst || 0) + parseFloat(fetchedItem.igst_amt || 0)).toFixed(2),
        utgst_pct: fetchedItem.utgst || prev.utgst_pct,
        utgst: (parseFloat(prev.utgst || 0) + parseFloat(fetchedItem.utgst_amt || 0)).toFixed(2),
        gr_total: (parseFloat(prev.gr_total || 0) + parseFloat(fetchedItem.gr_total || 0)).toFixed(2),
      }));
    }

    toast.success("Row added!");
  };

  const handleDeleteRow = (index) => {
    const rowToDelete = tableData[index];
    if (rowToDelete) {
      setTaxData((prev) => ({
        ...prev,
        assessable_value: Math.max(0, parseFloat(prev.assessable_value || 0) - parseFloat(rowToDelete._tax_assessable_value || 0)).toFixed(2),
        cgst: Math.max(0, parseFloat(prev.cgst || 0) - parseFloat(rowToDelete._tax_cgst || 0)).toFixed(2),
        sgst: Math.max(0, parseFloat(prev.sgst || 0) - parseFloat(rowToDelete._tax_sgst || 0)).toFixed(2),
        igst: Math.max(0, parseFloat(prev.igst || 0) - parseFloat(rowToDelete._tax_igst || 0)).toFixed(2),
        utgst: Math.max(0, parseFloat(prev.utgst || 0) - parseFloat(rowToDelete._tax_utgst || 0)).toFixed(2),
        gr_total: Math.max(0, parseFloat(prev.gr_total || 0) - parseFloat(rowToDelete._tax_gr_total || 0)).toFixed(2),
      }));
    }
    setTableData((prev) => prev.filter((_, i) => i !== index));
    toast.info("Row deleted.");
  };

  const handleClearItems = () => {
    setTableData([]);
    setTaxData((prev) => ({
      ...prev,
      assessable_value: "0.00",
      cgst: "0.00",
      sgst: "0.00",
      igst: "0.00",
      utgst: "0.00",
      gr_total: "0.00"
    }));
    toast.info("Items cleared.");
  };

  const handleSave = async () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer first.");
      return;
    }
    try {
      const safeItems = tableData.map(item => ({
        po_no: item.po_no || "",
        po_date: item.po_date ? item.po_date : null,
        item_no: item.item_no || "",
        item_code: item.item_code || "",
        item_description: item.description || null,
        hsn_code: item.hc || null,
        other_description: item.other_desc || null,
        rate: item.rate || "",
        perqty: item.rate_per_qty || null,
        rate_type: item.rate_type || "NOS",
        unit: item.unit_code || null,
        discount: item.desc_pct || null,
        dis_amt: item.disc_amt || null,
        rate_with_dis: item.rate_with_disc || null,
        po_qty: item.po_qty || "",
        bal_qty: item.bal_qty || "",
        invoice_qty: item.invoice_qty || "",
      }));

      // Force strict 24-hour time format, bypassing any cached state
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      const strictTime = `${hh}:${mm}:${ss}`;

      const formatDecimal = (val) => {
        if (val === null || val === undefined || val === "") return null;
        const num = parseFloat(val);
        if (isNaN(num)) return null;
        return num.toFixed(2);
      };

      const payload = {
        plant: formData.plant || null,
        series: formData.series || "",
        type: formData.type || "With SO",
        customer: selectedCustomer || "",
        select_so: selectedSO || null,
        tax_type: formData.tax_type || "GST",
        invoice_no: formData.invoice_no || "",
        invoice_time: strictTime,
        project_no: formData.project_no || "",
        bank_details: formData.bank_details || "",
        select_initiator: formData.initiator || null,
        freight: formData.freight || "",
        select_buyer: formData.buyer || null,
        buyer_oder_no: formData.buyers_order_no || null,
        order_date: formData.order_date || null,
        delivery_date: formData.delivery_date || null,
        vehical_no: formData.vehicle_no || null,
        transporter_name: formData.transporter_name || "",
        destination: formData.destination || "",
        payment_terms: formData.payment_terms || "",
        delivery_note: formData.delivery_note || "",
        
        // Map flattened taxes from taxData with 2 decimal places
        rate_qty: formatDecimal(taxData.rate_qty),
        dis_amount: formatDecimal(taxData.discount_amount),
        basic_value: formatDecimal(taxData.assessable_value),
        assessable_value: formatDecimal(taxData.assessable_value),
        cgst: formatDecimal(taxData.cgst_pct),
        sgst: formatDecimal(taxData.sgst_pct),
        igst: formatDecimal(taxData.igst_pct),
        utgst: formatDecimal(taxData.utgst_pct),
        tcs: formatDecimal(taxData.tcs),
        tds: null, // the frontend has 'tds_on': 'Assess', which is string, not numeric
        cgst_amt: formatDecimal(taxData.cgst),
        sgst_amt: formatDecimal(taxData.sgst),
        igst_amt: formatDecimal(taxData.igst),
        utgst_amt: formatDecimal(taxData.utgst),
        pkg_fwd_amt: formatDecimal(taxData.pkg_fwd_amt),
        other_insurance_charge_amt: formatDecimal(taxData.other_insurance),
        loading_freight_charge_amt: formatDecimal(taxData.loading_freight),
        grand_total: formatDecimal(taxData.gr_total),

        items: safeItems,
      };
      await axios.post("https://sellerp-backend.onrender.com/Sales/profoma-invoice/", payload);
      toast.success("Proforma Invoice saved successfully!");

      // Clear the form
      setTableData([]);
      setTaxData({
        rate_qty: "0.00",
        discount_amount: "0.00",
        assessable_value: "0.00",
        cgst_pct: "0",
        cgst: "0.00",
        sgst_pct: "0",
        sgst: "0.00",
        igst_pct: "0",
        igst: "0.00",
        utgst_pct: "0",
        utgst: "0.00",
        tcs_pct: "0",
        tcs: "0.00",
        tds_on: "Assess",
        pkg_fwd_pct: "0",
        pkg_fwd_amt: "0.00",
        other_insurance_pct: "0",
        other_insurance: "0.00",
        loading_freight_pct: "0",
        loading_freight: "0.00",
        less_advance_pct: "0",
        less_advance: "0.00",
        demand_advance_pct: "0",
        demand_advance: "0.00",
        retention_pct: "0",
        retention_amount: "0.00",
        gr_total: "0.00",
      });
      setSelectedCustomer("");
      setSelectedSO("");
      setSelectedItemNo("");
      
      const resetToday = new Date().toISOString().split("T")[0];
      const resetTime = new Date().toTimeString().split(" ")[0];
      setFormData({
        invoice_no: "",
        series: "",
        type: "With SO",
        tax_type: "GST",
        invoice_date: resetToday,
        invoice_time: resetTime,
        project_no: "",
        bank_details: "",
        bank_note: "",
        initiator: "",
        freight: "",
        buyer: "",
        buyers_order_no: "",
        order_date: resetToday,
        delivery_date: resetToday,
        vehicle_no: "",
        transporter_name: "",
        destination: "",
        payment_terms: "",
        delivery_note: "",
      });

      // Refetch the new incremented invoice number
      try {
        const invRes = await axios.get("https://sellerp-backend.onrender.com/Sales/generate-invoice-no/");
        const fetchedNo = invRes.data?.invoice_no || invRes.data?.Invoice_no || "";
        if (fetchedNo) {
          setFormData(prev => ({ ...prev, invoice_no: fetchedNo }));
        }
      } catch (err) {
        console.error("Error refetching invoice no:", err);
      }
    } catch (error) {
      console.error("❌ Full Error Object:", error);
      console.error("❌ Error Response Status:", error.response?.status);
      console.error("❌ Error Response Data:", error.response?.data);
      
      let errorMsg = error.message;
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMsg = error.response.data;
        } else if (error.response.data.detail) {
          errorMsg = error.response.data.detail;
        } else if (error.response.data.message) {
          errorMsg = error.response.data.message;
        } else {
          errorMsg = Object.entries(error.response.data)
            .map(([key, val]) => `${key}: ${JSON.stringify(val)}`)
            .join("\\n");
        }
      }
      toast.error(`Failed to save Proforma Invoice:\\n${errorMsg}`);
    }
  };

  // Dynamic Tax Recalculation Effect
  useEffect(() => {
    let totalRateQty = 0;
    let totalDiscAmt = 0;

    tableData.forEach(row => {
      const rate = parseFloat(row.rate) || 0;
      const qty = parseFloat(row.invoice_qty) || 0;
      const rowDiscAmt = parseFloat(row.disc_amt) || 0;
      
      totalRateQty += (rate * qty);
      totalDiscAmt += (rowDiscAmt * qty); // disc_amt is per unit
    });

    const basicValue = totalRateQty - totalDiscAmt;
    const assessableValue = basicValue; 

    setTaxData(prev => {
      const cgstPct = parseFloat(prev.cgst_pct) || 0;
      const sgstPct = parseFloat(prev.sgst_pct) || 0;
      const igstPct = parseFloat(prev.igst_pct) || 0;
      const utgstPct = parseFloat(prev.utgst_pct) || 0;

      const cgstAmt = (assessableValue * (cgstPct / 100)).toFixed(2);
      const sgstAmt = (assessableValue * (sgstPct / 100)).toFixed(2);
      const igstAmt = (assessableValue * (igstPct / 100)).toFixed(2);
      const utgstAmt = (assessableValue * (utgstPct / 100)).toFixed(2);

      const pkgAmt = parseFloat(prev.pkg_fwd_amt) || 0;
      const insAmt = parseFloat(prev.other_insurance) || 0;
      const freightAmt = parseFloat(prev.loading_freight) || 0;

      const grandTotal = (
        assessableValue +
        parseFloat(cgstAmt) +
        parseFloat(sgstAmt) +
        parseFloat(igstAmt) +
        parseFloat(utgstAmt) +
        pkgAmt +
        insAmt +
        freightAmt
      ).toFixed(2);

      if (
        prev.rate_qty !== totalRateQty.toFixed(2) ||
        prev.discount_amount !== totalDiscAmt.toFixed(2) ||
        prev.basic_value !== basicValue.toFixed(2) ||
        prev.assessable_value !== assessableValue.toFixed(2) ||
        prev.cgst !== cgstAmt ||
        prev.sgst !== sgstAmt ||
        prev.igst !== igstAmt ||
        prev.utgst !== utgstAmt ||
        prev.gr_total !== grandTotal
      ) {
        return {
          ...prev,
          rate_qty: totalRateQty.toFixed(2),
          discount_amount: totalDiscAmt.toFixed(2),
          basic_value: basicValue.toFixed(2),
          assessable_value: assessableValue.toFixed(2),
          cgst: cgstAmt,
          sgst: sgstAmt,
          igst: igstAmt,
          utgst: utgstAmt,
          gr_total: grandTotal,
        };
      }
      return prev;
    });
  }, [
    tableData,
    taxData.cgst_pct,
    taxData.sgst_pct,
    taxData.igst_pct,
    taxData.utgst_pct,
    taxData.pkg_fwd_amt,
    taxData.other_insurance,
    taxData.loading_freight
  ]);

  const handleCancel = () => {
    navigate(-1);
  };

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };  useEffect(() => {
    if (!selectedCustomer || selectedCustomer.trim() === "") {
      setCustomers([]);
      return;
    }
    
    const fetchCustomers = async () => {
      try {
        const query = `?q=${encodeURIComponent(selectedCustomer)}`;
        const response = await axios.get(`https://sellerp-backend.onrender.com/Sales/items/customers-list/${query}`);
        if (response.data) {
          const list = Array.isArray(response.data) ? response.data : (response.data.data || []);
          setCustomers(list);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    
    const timeoutId = setTimeout(() => {
      fetchCustomers();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [selectedCustomer]);

  useEffect(() => {
    const fetchInvoiceNo = async () => {
      try {
        const response = await axios.get("https://sellerp-backend.onrender.com/Sales/generate-invoice-no/");
        const fetchedNo = response.data?.invoice_no || response.data?.Invoice_no || "";
        if (fetchedNo) {
          setFormData(prev => ({ ...prev, invoice_no: fetchedNo }));
        }
      } catch (error) {
        console.error("Error fetching invoice number:", error);
      }
    };
    fetchInvoiceNo();
  }, []);

  useEffect(() => {
    const fetchCustomerPOs = async () => {
      if (!selectedCustomer) {
        setSoList([]);
        return;
      }
      try {
        const response = await axios.get(`https://sellerp-backend.onrender.com/Sales/customer/po/?customer=${encodeURIComponent(selectedCustomer)}`);
        if (response.data) {
          const list = Array.isArray(response.data) ? response.data : (response.data.value || response.data.data || []);
          setSoList(list);
        }
      } catch (error) {
        console.error("Error fetching Customer POs:", error);
      }
    };
    fetchCustomerPOs();
  }, [selectedCustomer]);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="NewProformaInvoice">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                <div className="NewProformaInvoice">
                  {/* ===== HEADER ===== */}
                  <div className="NewProformaInvoice-header mb-2 text-start">
                    <h5 className="header-title mb-2" style={{ fontSize: "22px", fontWeight: "700", color: "blue" }}>New Proforma Invoice</h5>
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                      <div className="d-flex align-items-center flex-wrap gap-3">
                        <div className="d-flex flex-column gap-1 align-items-start">
                          <label className="mb-0 text-nowrap" style={{ fontSize: "12px", fontWeight: "600" }}>Plant:</label>
                          <select
                            className="form-select form-select-sm"
                            name="plant"
                            style={{ width: "95px" }}
                          >
                            <option value="SHARP">SHARP</option>
                          </select>
                        </div>

                        <div className="d-flex flex-column gap-1 align-items-start">
                          <label className="mb-0 text-nowrap" style={{ fontSize: "12px", fontWeight: "600" }}>Series:</label>
                          <select
                            className="form-select form-select-sm"
                            name="series"
                            style={{ width: "90px" }}
                            value={formData.series}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                          </select>
                        </div>

                        <div className="d-flex flex-column gap-1 align-items-start">
                          <label className="mb-0 text-nowrap" style={{ fontSize: "12px", fontWeight: "600" }}>Type:</label>
                          <select
                            className="form-select form-select-sm"
                            name="type"
                            style={{ width: "100px" }}
                            value={formData.type}
                            onChange={handleChange}
                          >
                            <option value="With SO">With SO</option>
                            <option value="Without SO">Without SO</option>
                          </select>
                        </div>



                        <div className="d-flex flex-column gap-1 align-items-start">
                          <label className="mb-0 text-nowrap" style={{ fontSize: "12px", fontWeight: "600" }}>Tax Type:</label>
                          <select
                            className="form-select form-select-sm"
                            name="tax_type"
                            style={{ width: "90px" }}
                            value={formData.tax_type}
                            onChange={handleChange}
                          >
                            <option value="GST">GST</option>
                            <option value="Non GST">Non GST</option>
                          </select>
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="vndrbtn"
                          onClick={() => navigate("/SupplierProformaInvoice")}
                        >
                          Supplier Proforma Invoice
                        </button>
                        <button
                          type="button"
                          className="vndrbtn"
                          onClick={() => navigate("/ProformaInvoiceList")}
                        >
                          Proforma Invoice List
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ===== TABS ===== */}
                  <div className="NewProformaInvoice-Main mt-2">
                    <div className="NewProformaInvoice-tabs">
                      <ul
                        className="nav nav-tabs"
                        id="ProformaInvoiceTabs"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="itemdetails-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#itemdetails"
                            type="button"
                            role="tab"
                          >
                            Item Details
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="taxes-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#taxes"
                            type="button"
                            role="tab"
                          >
                            Taxes
                          </button>
                        </li>
                      </ul>

                      <div
                        className="tab-content mt-2"
                        id="ProformaInvoiceTabsContent"
                      >
                        {/* ===== ITEM DETAILS TAB ===== */}
                        <div
                          className="tab-pane fade show active"
                          id="itemdetails"
                          role="tabpanel"
                        >
                          {/* Customer & SO Selection Row */}
                          <div className="row align-items-center mb-2 text-start gy-2">
                            <div className="col-lg-3 col-md-6 d-flex align-items-center gap-2">
                              <label className="mb-0 text-nowrap" style={{ fontSize: "12px", fontWeight: "600", minWidth: "100px" }}>Select Customer</label>
                              <div className="position-relative w-100">
                                <input
                                  type="text"
                                  className="form-control form-control-sm w-100"
                                  placeholder="Enter Name..."
                                  value={selectedCustomer}
                                  onChange={(e) => {
                                    setSelectedCustomer(e.target.value);
                                    setCustomerDropdownOpen(true);
                                  }}
                                  onFocus={() => setCustomerDropdownOpen(true)}
                                  onBlur={() => setTimeout(() => setCustomerDropdownOpen(false), 200)}
                                />
                                {customerDropdownOpen && (
                                  <ul className="dropdown-menu show w-100 p-0 m-0 shadow" style={{ position: "absolute", top: "100%", left: 0, maxHeight: "200px", overflowY: "auto", zIndex: 1050 }}>
                                    {customers
                                      .map((cust) => cust.Name ? `${cust.Name} | ${cust.number || ''}` : (cust.customer_name || cust.customer || cust.name || cust))
                                      .filter(val => val.toLowerCase().includes(selectedCustomer.toLowerCase()))
                                      .map((val, i) => (
                                        <li key={i}>
                                          <button 
                                            type="button" 
                                            className="dropdown-item py-1" 
                                            style={{ fontSize: "12px" }}
                                            onClick={() => {
                                              setSelectedCustomer(val);
                                              setCustomerDropdownOpen(false);
                                            }}
                                          >
                                            {val}
                                          </button>
                                        </li>
                                      ))}
                                    {customers.filter(cust => {
                                      const val = cust.Name ? `${cust.Name} | ${cust.number || ''}` : (cust.customer_name || cust.customer || cust.name || cust);
                                      return val.toLowerCase().includes(selectedCustomer.toLowerCase());
                                    }).length === 0 && (
                                      <li className="dropdown-item text-muted text-center py-1" style={{ fontSize: "12px" }}>No match found</li>
                                    )}
                                  </ul>
                                )}
                              </div>
                              <button
                                type="button"
                                className="vndrbtn btn-sm"
                              >
                                Search
                              </button>
                            </div>

                            <div className="col-lg-4 col-md-6 d-flex align-items-center gap-2">
                              <label className="mb-0 text-nowrap" style={{ fontSize: "12px", fontWeight: "600", minWidth: "70px" }}>Select S.O.</label>
                              <select
                                className="form-select form-select-sm"
                                value={selectedSO}
                                onChange={(e) => setSelectedSO(e.target.value)}
                              >
                                <option value=""></option>
                                {soList.map((so, i) => {
                                  // Safely extract the string/number value, prioritize cust_po as requested
                                  let val = "";
                                  let displayLabel = "";
                                  if (so && typeof so === "object") {
                                    val = so.cust_po || so.so_no || so.po_no || so.po || "";
                                    displayLabel = [so.cust_po, so.so_date, so.so_no].filter(Boolean).join(" | ");
                                  } else {
                                    val = so; // In case the API returns an array of strings
                                    displayLabel = so;
                                  }
                                  
                                  return (
                                    <option key={i} value={val}>
                                      {displayLabel || val}
                                    </option>
                                  );
                                })}
                              </select>
                              <button
                                type="button"
                                className="vndrbtn btn-sm"
                                title="View"
                              >
                                👁
                              </button>
                              <button
                                type="button"
                                className="vndrbtn btn-sm  text-nowrap"
                              >
                                Add All
                              </button>
                            </div>

                            <div className="col-lg-2 col-md-6 d-flex align-items-center gap-2">
                              <label className="mb-0 text-nowrap" style={{ fontSize: "12px", fontWeight: "600" }}>Currency:</label>
                              <span style={{ fontSize: "12px", fontWeight: "600" }}>INR</span>
                            </div>

                            <div className="col-lg-3 col-md-6 d-flex align-items-center gap-2">
                              <label className="mb-0 text-nowrap" style={{ fontSize: "12px", fontWeight: "600" }}>Conversion Rate</label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                style={{ width: "60px" }}
                                defaultValue="1"
                              />
                            </div>
                          </div>

                          {/* Item Selection Row */}
                          <div className="row align-items-center mb-3 text-start gy-2">
                            <div className="col-md-5 d-flex align-items-center gap-2">
                              <label className="mb-0 text-nowrap" style={{ fontSize: "12px", fontWeight: "600", minWidth: "100px" }}>Select Item Name</label>
                              {(() => {
                                // Find the full order object that matches the selected SO/PO string
                                const selectedOrder = soList.find(so => {
                                  if (!so || typeof so !== "object") return so === selectedSO;
                                  const soVal = so.cust_po || so.so_no || so.po_no || so.po || "";
                                  return soVal === selectedSO;
                                });
                                // Extract the nested items array from that order
                                const availableItems = selectedOrder && Array.isArray(selectedOrder.item) ? selectedOrder.item : [];

                                return (
                                  <select
                                    className="form-select form-select-sm"
                                    value={selectedItemNo}
                                    onChange={(e) => setSelectedItemNo(e.target.value)}
                                  >
                                    <option value="">-- Select Item --</option>
                                    {availableItems.map((item, idx) => {
                                      const itemVal = item.item_no || item.item_code || item.item_description || "";
                                      // Join the available fields together so all data is shown as requested
                                      const displayLabel = [item.item_no, item.item_code, item.item_description].filter(Boolean).join(" | ");
                                      return (
                                        <option key={idx} value={itemVal}>
                                          {displayLabel}
                                        </option>
                                      );
                                    })}
                                  </select>
                                );
                              })()}
                              <button
                                type="button"
                                className="vndrbtn"
                                onClick={handleAddRow}
                              >
                                Add &gt;&gt;
                              </button>
                            </div>
                            <div className="col-md-7 d-flex gap-2 justify-content-start">
                              <button
                                type="button"
                                className="vndrbtn"
                                style={{ fontWeight: "600" }}
                                onClick={handleClearItems}
                              >
                                Clear Items
                              </button>
                              <button
                                type="button"
                                className="vndrbtn"
                                style={{ fontWeight: "600" }}
                                onClick={() => {
                                  if (tableData.length > 0)
                                    handleDeleteRow(tableData.length - 1);
                                }}
                              >
                                Delete Selected
                              </button>
                            </div>
                          </div>

                          {/* Item Table */}
                          <div className="table-responsive mt-1">
                            <table
                              className="table table-bordered table-sm"
                              style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                            >
                              <thead
                                style={{
                                  backgroundColor: "#d6e4f0",
                                  position: "sticky",
                                  top: 0,
                                }}
                              >
                                <tr>
                                  <th>
                                    <input type="checkbox" />
                                  </th>
                                  <th>Sr.</th>
                                  <th>PO No</th>
                                  <th>PO Date</th>
                                  <th>Item No</th>
                                  <th>Item Code</th>
                                  <th>Description</th>
                                  <th>Other Desc</th>
                                  <th>Rate |PerQty</th>
                                  <th>Rate</th>
                                  <th>Rate Type</th>
                                  <th>Disc %</th>
                                  <th>Disc Amt</th>
                                  <th>Rate/WithDisc</th>
                                  <th>PO Qty</th>
                                  <th>Bal.Qty</th>
                                  <th>Invoice Qty</th>
                                  <th>Unit Code</th>
                                  <th>Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                {tableData.length > 0 ? (
                                  tableData.map((row, index) => (
                                    <tr key={index}>
                                      <td>
                                        <input type="checkbox" />
                                      </td>
                                      <td>{index + 1}</td>
                                      <td>
                                        <div style={{ fontSize: "10px" }}>
                                          {row.po_no}
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "9px",
                                            color: "blue",
                                          }}
                                        >
                                          Get PO Line No &gt;
                                        </div>
                                      </td>
                                      <td>{row.po_date}</td>
                                      <td>{row.item_no}</td>
                                      <td>{row.item_code}</td>
                                      <td>
                                        <textarea
                                          className="form-control form-control-sm"
                                          style={{
                                            width: "120px",
                                            height: "50px",
                                          }}
                                          defaultValue={row.description}
                                        />
                                        <div
                                          style={{
                                            backgroundColor: "#f96854",
                                            color: "white",
                                            fontSize: "9px",
                                            padding: "1px 3px",
                                            borderRadius: "3px",
                                            display: "inline-block",
                                            marginTop: "2px",
                                          }}
                                        >
                                          HSN Code :
                                        </div>
                                      </td>
                                      <td>
                                        <textarea
                                          className="form-control form-control-sm"
                                          style={{
                                            width: "100px",
                                            height: "50px",
                                          }}
                                          defaultValue={row.other_desc}
                                        />
                                      </td>
                                      <td>
                                        <select
                                          className="form-select form-select-sm"
                                          style={{ width: "70px" }}
                                          defaultValue={
                                            row.rate_per_qty || "1Nos"
                                          }
                                        >
                                          <option>1Nos</option>
                                          <option>1Kg</option>
                                          <option>100Nos</option>
                                        </select>
                                        <div style={{ fontSize: "9px" }}>
                                          Per :
                                        </div>
                                        <div style={{ fontSize: "9px" }}>
                                          Per Limit :
                                        </div>
                                        <div style={{ fontSize: "9px" }}>
                                          FC Rate :
                                        </div>
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control form-control-sm"
                                          style={{ width: "60px" }}
                                          value={row.rate || ""}
                                          onChange={(e) => handleTableChange(index, "rate", e.target.value)}
                                        />
                                      </td>
                                      <td>
                                        <select
                                          className="form-select form-select-sm"
                                          style={{ width: "65px" }}
                                          defaultValue={row.rate_type || "NOS"}
                                        >
                                          <option>NOS</option>
                                          <option>KG</option>
                                          <option>MT</option>
                                        </select>
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control form-control-sm"
                                          style={{ width: "60px" }}
                                          value={row.desc_pct || ""}
                                          onChange={(e) => handleTableChange(index, "desc_pct", e.target.value)}
                                          placeholder="%"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control form-control-sm bg-light"
                                          style={{ width: "60px" }}
                                          value={row.disc_amt || ""}
                                          readOnly
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control form-control-sm bg-light"
                                          style={{ width: "70px" }}
                                          value={row.rate_with_disc || ""}
                                          readOnly
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control form-control-sm"
                                          style={{ width: "60px" }}
                                          value={row.po_qty || ""}
                                          onChange={(e) => handleTableChange(index, "po_qty", e.target.value)}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control form-control-sm bg-light"
                                          style={{ width: "60px" }}
                                          value={row.bal_qty || ""}
                                          readOnly
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control form-control-sm"
                                          style={{ width: "60px" }}
                                          value={row.invoice_qty || ""}
                                          onChange={(e) => handleTableChange(index, "invoice_qty", e.target.value)}
                                        />
                                        <div style={{ fontSize: "9px" }}>
                                          Item Per Pc
                                        </div>
                                        <div style={{ fontSize: "9px" }}>
                                          Wt :
                                        </div>
                                        <input
                                          type="text"
                                          className="form-control form-control-sm mt-1"
                                          style={{ width: "60px" }}
                                          placeholder="Weight"
                                          defaultValue={row.weight}
                                        />
                                      </td>
                                      <td>{row.unit_code}</td>
                                      <td>
                                        <button
                                          className="vndrbtn"
                                          onClick={() => handleDeleteRow(index)}
                                        >
                                          X
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="19" className="text-center">
                                      <span style={{ color: "#888" }}>
                                        Total Record: 00
                                      </span>
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>

                          {tableData.length === 0 && (
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#555",
                                paddingLeft: "10px",
                              }}
                            >
                              Total Record: 00
                            </div>
                          )}
                        </div>

                        {/* ===== TAXES TAB ===== */}
                        <div
                          className="tab-pane fade"
                          id="taxes"
                          role="tabpanel"
                        >
                          <div className="NewProformaInvoice-main">
                            {/* Metadata Fields Section styled as horizontal rows matching reference */}
                            <div className="row mb-2 align-items-center text-start">
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap fw-bold" style={{ fontSize: "11px", minWidth: "80px" }}>Invoice No. :</label>
                                <input
                                  type="text"
                                  name="invoice_no"
                                  value={formData.invoice_no}
                                  onChange={handleChange}
                                  className="form-control form-control-sm"
                                  readOnly
                                />
                              </div>
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "80px" }}>Invoice Date :</label>
                                <input
                                  type="date"
                                  name="invoice_date"
                                  value={formData.invoice_date}
                                  onChange={handleChange}
                                  className="form-control form-control-sm"
                                />
                              </div>
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "80px" }}>Invoice Time :</label>
                                <input
                                  type="text"
                                  name="invoice_time"
                                  value={formData.invoice_time}
                                  onChange={handleChange}
                                  className="form-control form-control-sm"
                                  readOnly
                                />
                              </div>
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "80px" }}>Project No :</label>
                                <input
                                  type="text"
                                  name="project_no"
                                  value={formData.project_no}
                                  onChange={handleChange}
                                  className="form-control form-control-sm"
                                />
                              </div>
                            </div>

                            <div className="row mb-2 align-items-center text-start">
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "80px" }}>Bank Details :</label>
                                <select
                                  name="bank_details"
                                  value={formData.bank_details}
                                  onChange={handleChange}
                                  className="form-select form-select-sm"
                                >
                                  <option value="">Select</option>
                                </select>
                                <button
                                  type="button"
                                  className="vndrbtn btn-sm"
                                >
                                  <FaPlus />
                                </button>
                                <button
                                  type="button"
                                  className="vndrbtn btn-sm"
                                >
                                  ↺
                                </button>
                              </div>
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <input
                                  type="text"
                                  name="bank_note"
                                  value={formData.bank_note}
                                  onChange={handleChange}
                                  className="form-control form-control-sm"
                                  placeholder="Bank Note..."
                                />
                              </div>
                            </div>

                            <div className="row mb-2 align-items-center text-start">
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "80px" }}>Select Initiator :</label>
                                <select
                                  name="initiator"
                                  value={formData.initiator}
                                  onChange={handleChange}
                                  className="form-select form-select-sm"
                                >
                                  <option value=""></option>
                                </select>
                              </div>
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "80px" }}>Freight :</label>
                                <select
                                  name="freight"
                                  value={formData.freight}
                                  onChange={handleChange}
                                  className="form-select form-select-sm"
                                >
                                  <option value="">Select</option>
                                  <option value="By Road">By Road</option>
                                  <option value="By Air">By Air</option>
                                  <option value="By Sea">By Sea</option>
                                </select>
                                <button
                                  type="button"
                                  className="vndrbtn btn-sm"
                                >
                                  <FaPlus />
                                </button>
                                <button
                                  type="button"
                                  className="vndrbtn btn-sm"
                                >
                                  ↺
                                </button>
                              </div>
                            </div>

                            <div className="row mb-2 align-items-center text-start">
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "80px" }}>Select Buyer :</label>
                                <input
                                  type="text"
                                  name="buyer"
                                  value={formData.buyer}
                                  onChange={handleChange}
                                  className="form-control form-control-sm"
                                  placeholder="Enter Name..."
                                />
                              </div>
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "110px" }}>Buyer's Order No :</label>
                                <input
                                  type="text"
                                  name="buyers_order_no"
                                  value={formData.buyers_order_no}
                                  onChange={handleChange}
                                  className="form-control form-control-sm"
                                />
                              </div>
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "80px" }}>Order Date :</label>
                                <input
                                  type="date"
                                  name="order_date"
                                  value={formData.order_date}
                                  onChange={handleChange}
                                  className="form-control form-control-sm"
                                />
                              </div>
                            </div>

                            <div className="row mb-2 align-items-center text-start">
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "80px" }}>Delivery Date :</label>
                                <input
                                  type="date"
                                  name="delivery_date"
                                  value={formData.delivery_date}
                                  onChange={handleChange}
                                  className="form-control form-control-sm"
                                />
                              </div>
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "80px" }}>Vehicle No :</label>
                                <input
                                  type="text"
                                  name="vehicle_no"
                                  value={formData.vehicle_no}
                                  onChange={handleChange}
                                  className="form-control form-control-sm"
                                />
                              </div>
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "110px" }}>Transporter Name :</label>
                                <input
                                  type="text"
                                  name="transporter_name"
                                  value={formData.transporter_name}
                                  onChange={handleChange}
                                  className="form-control form-control-sm"
                                />
                              </div>
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "80px" }}>Destination :</label>
                                <input
                                  type="text"
                                  name="destination"
                                  value={formData.destination}
                                  onChange={handleChange}
                                  className="form-control form-control-sm"
                                />
                              </div>
                            </div>

                            <div className="row mb-3 align-items-center text-start">
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "80px" }}>Payment Terms :</label>
                                <select
                                  name="payment_terms"
                                  value={formData.payment_terms}
                                  onChange={handleChange}
                                  className="form-select form-select-sm"
                                >
                                  <option value="">Select</option>
                                  <option value="Net 30">Net 30</option>
                                  <option value="Net 60">Net 60</option>
                                  <option value="Immediate">Immediate</option>
                                </select>
                                <button
                                  type="button"
                                  className="vndrbtn btn-sm"
                                >
                                  <FaPlus />
                                </button>
                                <button
                                  type="button"
                                  className="vndrbtn btn-sm"
                                >
                                  ↺
                                </button>
                              </div>
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <label className="mb-0 text-nowrap" style={{ fontSize: "11px", fontWeight: "600", minWidth: "80px" }}>Delivery Note :</label>
                                <input
                                  type="text"
                                  name="delivery_note"
                                  value={formData.delivery_note}
                                  onChange={handleChange}
                                  className="form-control form-control-sm"
                                />
                              </div>
                            </div>

                            {/* SpreadSheet Grid Table */}
                            <div className="table-responsive border rounded bg-white shadow-sm p-2 w-100" style={{ overflowX: "auto" }}>
                              <style>
                                {`
                                  .tax-table-container {
                                    width: 100%;
                                  }
                                  .tax-table-container table {
                                    table-layout: auto;
                                    width: 100%;
                                    min-width: 1600px; /* Forces horizontal scrollbar so data is clearly visible */
                                  }
                                  .tax-table-container td {
                                    white-space: nowrap;
                                    padding: 4px 8px !important;
                                  }
                                  .tax-table-container input.form-control {
                                    min-width: 50px;
                                  }
                                `}
                              </style>
                              <table className="table table-bordered table-sm mb-0 text-start align-middle tax-table-container">
                                <tbody>
                                  {/* Row 1 */}
                                  <tr style={{ height: "35px" }}>
                                    <td className="fw-bold bg-light align-middle">(Rate * Qty)</td>
                                    <td>
                                      <input
                                        type="text"
                                        name="rate_qty"
                                        value={taxData.rate_qty}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-end"
                                        readOnly
                                      />
                                    </td>
                                    <td className="fw-bold bg-light align-middle">Discount Amount :</td>
                                    <td>
                                      <input
                                        type="text"
                                        name="discount_amount"
                                        value={taxData.discount_amount}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-end"
                                        readOnly
                                      />
                                    </td>
                                    <td colSpan="18" className="bg-light"></td>
                                  </tr>

                                  {/* Row 2 */}
                                  <tr style={{ height: "35px" }}>
                                    <td className="fw-bold bg-light align-middle">Basic Value :</td>
                                    <td>
                                      <input
                                        type="text"
                                        name="basic_value"
                                        value={taxData.basic_value}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-end"
                                        readOnly
                                      />
                                    </td>
                                    <td className="fw-bold bg-light align-middle">Assessable Value:</td>
                                    <td>
                                      <input
                                        type="text"
                                        name="assessable_value"
                                        value={taxData.assessable_value}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-end"
                                      />
                                    </td>

                                    {/* CGST */}
                                    <td className="fw-bold bg-light align-middle">CGST :</td>
                                    <td>
                                      <input
                                        type="text"
                                        name="cgst_pct"
                                        value={taxData.cgst_pct}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-center"
                                        placeholder="%"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="cgst"
                                        value={taxData.cgst}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-end"
                                      />
                                    </td>

                                    {/* SGST */}
                                    <td className="fw-bold bg-light align-middle">SGST :</td>
                                    <td>
                                      <input
                                        type="text"
                                        name="sgst_pct"
                                        value={taxData.sgst_pct}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-center"
                                        placeholder="%"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="sgst"
                                        value={taxData.sgst}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-end"
                                      />
                                    </td>

                                    {/* IGST */}
                                    <td className="fw-bold bg-light align-middle">IGST :</td>
                                    <td>
                                      <input
                                        type="text"
                                        name="igst_pct"
                                        value={taxData.igst_pct}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-center"
                                        placeholder="%"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="igst"
                                        value={taxData.igst}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-end"
                                      />
                                    </td>

                                    {/* UTGST */}
                                    <td className="fw-bold bg-light align-middle">UTGST :</td>
                                    <td>
                                      <input
                                        type="text"
                                        name="utgst_pct"
                                        value={taxData.utgst_pct}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-center"
                                        placeholder="%"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="utgst"
                                        value={taxData.utgst}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-end"
                                      />
                                    </td>

                                    {/* TCS */}
                                    <td className="fw-bold bg-light align-middle">TCS :</td>
                                    <td>
                                      <input
                                        type="text"
                                        name="tcs_pct"
                                        value={taxData.tcs_pct}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-center"
                                        placeholder="%"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="tcs"
                                        value={taxData.tcs}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-end"
                                        readOnly
                                      />
                                    </td>

                                    {/* TDS On */}
                                    <td className="fw-bold bg-light align-middle">
                                      <div className="d-flex align-items-center gap-1 flex-wrap">
                                        <span style={{ fontSize: "10px" }}>TDS On:</span>
                                        <div className="form-check form-check-inline mb-0 p-0 ms-1" style={{ minWidth: "fit-content" }}>
                                          <input
                                            className="form-check-input ms-0"
                                            type="radio"
                                            name="tds_on"
                                            id="tds_assess"
                                            value="Assess"
                                            checked={taxData.tds_on === "Assess"}
                                            onChange={handleTaxChange}
                                            style={{ width: "12px", height: "12px" }}
                                          />
                                          <label className="form-check-label mb-0 text-nowrap ms-1" htmlFor="tds_assess" style={{ fontSize: "10px" }}>Assess.</label>
                                        </div>
                                        <div className="form-check form-check-inline mb-0 p-0 ms-1" style={{ minWidth: "fit-content" }}>
                                          <input
                                            className="form-check-input ms-0"
                                            type="radio"
                                            name="tds_on"
                                            id="tds_basic"
                                            value="Basic"
                                            checked={taxData.tds_on === "Basic"}
                                            onChange={handleTaxChange}
                                            style={{ width: "12px", height: "12px" }}
                                          />
                                          <label className="form-check-label mb-0 text-nowrap ms-1" htmlFor="tds_basic" style={{ fontSize: "10px" }}>Basic</label>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm text-center"
                                        placeholder="%"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm text-end"
                                        defaultValue="0"
                                      />
                                    </td>
                                  </tr>

                                  {/* Row 3 */}
                                  <tr style={{ height: "35px" }}>
                                    <td className="fw-bold bg-light align-middle">
                                      <div className="d-flex align-items-center gap-1">
                                        <input type="checkbox" className="form-check-input mb-0" id="pkg_fwd_chk" defaultChecked style={{ width: "13px", height: "13px" }} />
                                        <label className="mb-0 text-nowrap" htmlFor="pkg_fwd_chk">(TOC) Pkg & Fwd</label>
                                      </div>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="pkg_fwd_pct"
                                        value={taxData.pkg_fwd_pct}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-center"
                                        placeholder="%"
                                      />
                                    </td>
                                    <td colSpan="2">
                                      <input
                                        type="text"
                                        name="pkg_fwd_amt"
                                        value={taxData.pkg_fwd_amt}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-end"
                                      />
                                    </td>

                                    <td className="fw-bold bg-light align-middle" colSpan="3">
                                      <div className="d-flex align-items-center gap-1">
                                        <input type="checkbox" className="form-check-input mb-0" id="other_insurance_chk" defaultChecked style={{ width: "13px", height: "13px" }} />
                                        <label className="mb-0 text-nowrap" htmlFor="other_insurance_chk">(TOC) Other / Insurance Charges</label>
                                      </div>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="other_insurance_pct"
                                        value={taxData.other_insurance_pct}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-center"
                                        placeholder="%"
                                      />
                                    </td>
                                    <td colSpan="2">
                                      <input
                                        type="text"
                                        name="other_insurance"
                                        value={taxData.other_insurance}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-end"
                                      />
                                    </td>

                                    <td className="fw-bold bg-light align-middle" colSpan="3">
                                      <div className="d-flex align-items-center gap-1">
                                        <input type="checkbox" className="form-check-input mb-0" id="load_freight_chk" defaultChecked style={{ width: "13px", height: "13px" }} />
                                        <label className="mb-0 text-nowrap" htmlFor="load_freight_chk">(TOC) Loading / Freight Charges</label>
                                      </div>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="loading_freight_pct"
                                        value={taxData.loading_freight_pct}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-center"
                                        placeholder="%"
                                      />
                                    </td>
                                    <td colSpan="2">
                                      <input
                                        type="text"
                                        name="loading_freight"
                                        value={taxData.loading_freight}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-end"
                                      />
                                    </td>
                                    <td colSpan="6" className="bg-light"></td>
                                  </tr>

                                  {/* Row 4 */}
                                  <tr style={{ height: "35px" }}>
                                    <td className="fw-bold bg-light align-middle">Less Advance :</td>
                                    <td>
                                      <input
                                        type="text"
                                        name="less_advance_pct"
                                        value={taxData.less_advance_pct}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-center"
                                        placeholder="%"
                                      />
                                    </td>
                                    <td colSpan="2">
                                      <input
                                        type="text"
                                        className="form-control form-control-sm text-end"
                                        defaultValue=""
                                        placeholder="0.00"
                                      />
                                    </td>

                                    <td className="fw-bold bg-light align-middle" colSpan="3">Demand Advance :</td>
                                    <td>
                                      <input
                                        type="text"
                                        name="demand_advance_pct"
                                        value={taxData.demand_advance_pct}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-center"
                                        placeholder="%"
                                      />
                                    </td>
                                    <td colSpan="2">
                                      <input
                                        type="text"
                                        className="form-control form-control-sm text-end"
                                        defaultValue=""
                                        placeholder="0.00"
                                      />
                                    </td>

                                    {/* Retention % */}
                                    <td className="fw-bold bg-light align-middle" colSpan="2">
                                      <div className="form-check mb-0 p-0 d-flex align-items-center">
                                        <input
                                          className="form-check-input ms-0"
                                          type="radio"
                                          name="retention_type"
                                          id="retention_pct_radio"
                                          defaultChecked
                                          style={{ width: "12px", height: "12px" }}
                                        />
                                        <label className="form-check-label mb-0 text-nowrap ms-1" htmlFor="retention_pct_radio">Retention % :</label>
                                      </div>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="retention_pct"
                                        value={taxData.retention_pct}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-center"
                                      />
                                    </td>

                                    {/* Retention Amount */}
                                    <td className="fw-bold bg-light align-middle" colSpan="2">
                                      <div className="form-check mb-0 p-0 d-flex align-items-center">
                                        <input
                                          className="form-check-input ms-0"
                                          type="radio"
                                          name="retention_type"
                                          id="retention_amt_radio"
                                          style={{ width: "12px", height: "12px" }}
                                        />
                                        <label className="form-check-label mb-0 text-nowrap ms-1" htmlFor="retention_amt_radio">Retention Amount :</label>
                                      </div>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="retention_amount"
                                        value={taxData.retention_amount}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-end"
                                      />
                                    </td>

                                    {/* GR. TOTAL */}
                                    <td className="fw-bold bg-light align-middle" colSpan="2">GR. TOTAL</td>
                                    <td colSpan="4">
                                      <input
                                        type="text"
                                        name="gr_total"
                                        value={taxData.gr_total}
                                        onChange={handleTaxChange}
                                        className="form-control form-control-sm text-end fw-bold text-primary"
                                        readOnly
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            {/* Save / Cancel Buttons */}
                            <div className="row mt-3">
                              <div className="col-12 d-flex gap-2">
                                <button
                                  type="button"
                                  className="vndrbtn"
                                  onClick={handleSave}
                                >
                                  💾 Save Invoice
                                </button>
                                <button
                                  type="button"
                                  className="vndrbtn"
                                  onClick={handleCancel}
                                >
                                  ✖ Cancel
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

export default NewProformaInvoice;
