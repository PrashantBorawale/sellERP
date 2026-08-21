import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./NewSalesOrder.css";
// import Cached from "@mui/icons-material/Cached.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewSalesOrder = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [, setSoNoLoading] = useState(false);
  const [soNoError, setSoNoError] = useState(null);

  // New States for Items Integration
  const [itemsList, setItemsList] = useState([]); // API items
  const [orderItems, setOrderItems] = useState([]); // Table added items
  const [currentItem, setCurrentItem] = useState({
    selectedSearch: "",
    part_no: "",
    item_no: "",
    part_code: "",
    description: "",
    rate: "",
    qty: "",
    uom: "NOS",
    hsn: "",
    cgst: "",
    igst: "",
    sgst: "",
    utgst: "",
    item_wt: "",
    hsn_code: null,
    assessable_value: "0.0000",
    subtotal: "0.00",
    gr_total: "0.00",
  });

  // API  state
  const [formData, setFormData] = useState({
    cust_date: "",
    plant: "ProduLink",
    order_type: "",
    order_status: "",
    customer: "",
    cust_po: "",
    pay_day: "",
    pay_note: "",
    valid_up: "",
    so_date: "",
    so_no: "",
    po_rec_date: "",
    incoterms: "",
    ship_to: "",
    ship_to_add_code: "",
    ccn_no: "",
    delivery_date: "",
    buyer_name: "",
    packing: "",
    shift: "",
    plan_date: "",
    lc_no: "",
    sales_person: "",
    site_name: "",
    project_name: "",
    delivery_al: " ",
    terms: "",
  });

  // 1. Fetch Customers and Items on Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const custRes = await fetch(
          "https://sellerp-backend.onrender.com/Sales/items/customers-list/"
        );
        const custData = await custRes.json();
        setCustomers(Array.isArray(custData) ? custData : custData.data || []);

        const itemRes = await fetch("https://sellerp-backend.onrender.com/Sales/items-list/");
        const itemData = await itemRes.json();
        setItemsList(Array.isArray(itemData) ? itemData : itemData.data || []);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    fetchData();
  }, []);

  // 2. Fetch SO No on component mount
  useEffect(() => {
    const fetchSoNo = async () => {
      try {
        setSoNoLoading(true);
        setSoNoError(null);
        const response = await fetch(
          "https://sellerp-backend.onrender.com/Sales/generate-so-no/"
        );
        if (response.ok) {
          const data = await response.json();
          console.log("SO No Response:", data);
          // Handle different response formats
          const soNo = data.so_no || data.SO_No || data.soNo || data.data?.so_no || "";
          setFormData((prev) => ({
            ...prev,
            so_no: soNo,
          }));
          if (soNo) {
            toast.success(`SO No: ${soNo} generated`);
          }
        } else {
          setSoNoError("Failed to fetch SO No");
        }
      } catch (error) {
        console.error("SO No fetch error:", error);
        setSoNoError(error.message);
        toast.error("Error fetching SO No");
      } finally {
        setSoNoLoading(false);
      }
    };
    fetchSoNo();
  }, []);

  // Handle Customer Selection & Auto-fill Ship To
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "customer") {
      const selectedCust = customers.find(
        (c) => `${c.Name} | ${c.number}` === value || c.Name === value
      );

      if (selectedCust) {
        setFormData((prev) => ({
          ...prev,
          customer: `${selectedCust.Name} | ${selectedCust.number}`,
          ship_to: selectedCust.Name,
          pay_day: selectedCust.Payment_Term || "",
          incoterms: selectedCust.Incoterms || "",
        }));
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // Handle Item Search Selection
  const handleItemSearchChange = (e) => {
    const val = e.target.value;
    setCurrentItem((prev) => ({ ...prev, selectedSearch: val }));

    const item = itemsList.find(
      (i) => `${i.part_no} | ${i.Part_Code} | ${i.Name_Description}` === val
    );

    if (item) {
      setCurrentItem({
        selectedSearch: val,
        part_no: item.part_no,
        item_no: item.part_no,
        part_code: item.Part_Code,
        description: item.Name_Description,
        rate: item.Rate || "",
        qty: "",
        uom: item.Unit_Code || "NOS",
        hsn: item.HSN_SAC_Code || "",
        hsn_code: item.HSN_SAC_Code || null,
        cgst: item.tax_details?.CGST || "",
        sgst: item.tax_details?.SGST || "",
        igst: item.tax_details?.IGST || "",
        utgst: item.tax_details?.UTGST || "",
        item_wt: item.Gross_Weight || "",
      });
    }
  };


  // UPDATE addItemToTable function - REPLACE THE ENTIRE FUNCTION
  const addItemToTable = () => {
    if (!currentItem.part_no || !currentItem.qty) {
      toast.warning("⚠️ Please select an item and enter quantity!");
      return;
    }

    const rate = parseFloat(currentItem.rate) || 0;
    const qty = parseFloat(currentItem.qty) || 0;
    const subtotal = rate * qty;
    
    // Percentages
    const cgstPer = parseFloat(currentItem.cgst) || 0;
    const sgstPer = parseFloat(currentItem.sgst) || 0;
    const igstPer = parseFloat(currentItem.igst) || 0;
    const utgstPer = parseFloat(currentItem.utgst) || 0;

    // Amounts
    const cgstAmt = (subtotal * cgstPer) / 100;
    const sgstAmt = (subtotal * sgstPer) / 100;
    const igstAmt = (subtotal * igstPer) / 100;
    const utgstAmt = (subtotal * utgstPer) / 100;
    
    const totalTax = cgstAmt + sgstAmt + igstAmt + utgstAmt;
    const grandTotal = subtotal + totalTax;

    const newItem = {
      id: Date.now(),

      // Display + API 
      part_no: currentItem.part_no,
      item_no: currentItem.item_no,
      part_code: currentItem.part_code,
      description: currentItem.description,
      hsn: currentItem.hsn,
      
      // Percentages
      cgst: cgstPer.toFixed(2),
      sgst: sgstPer.toFixed(2),
      igst: igstPer.toFixed(2),
      utgst: utgstPer.toFixed(2),

      // Calculated Amounts
      cgst_amt: cgstAmt.toFixed(2),
      sgst_amt: sgstAmt.toFixed(2),
      igst_amt: igstAmt.toFixed(2),
      utgst_amt: utgstAmt.toFixed(2),

      // API required
      rev_no: "0",
      item_code: currentItem.part_code,
      item_description: currentItem.description,

      rate: rate,
      qty: qty,
      uom: currentItem.uom,
      item_wt: currentItem.item_wt || "",

      line_no: "",
      pr_no: "",
      rm_type: "",
      pkg_trans: "",
      due_date: null,
      type: "",
      item_category: "",
      remark: "",
      hsn_code: currentItem.hsn_code || null,
      assessable_value: subtotal.toFixed(2),
      subtotal: subtotal.toFixed(2),
      gr_total: grandTotal.toFixed(2),
    };

    setOrderItems([...orderItems, newItem]);
    toast.success("✅ Item added to order!");

    setCurrentItem({
      selectedSearch: "",
      part_no: "",
      item_no: "",
      part_code: "",
      description: "",
      rate: "",
      qty: "",
      uom: "NOS",
      hsn: "",
      cgst: "",
      sgst: "",
      igst: "",
      utgst: "",
      item_wt: "",
      hsn_code: null,
      assessable_value: "0.0000",
      subtotal: "0.00",
      gr_total: "0.00",
    });
  };


  // UPDATE handleSaveOrder function - REPLACE THE ENTIRE FUNCTION

  const handleSaveOrder = async () => {
    try {
      // Validate required fields
      if (!formData.customer) {
        toast.error("Please select a customer!");
        return;
      }

      if (orderItems.length === 0) {
        toast.error("Please add at least one item!");
        return;
      }

      // Calculate Top Level Totals
      const totalSubtotal = orderItems.reduce((acc, item) => acc + parseFloat(item.subtotal || 0), 0);
      const totalCgstAmt = orderItems.reduce((acc, item) => acc + parseFloat(item.cgst_amt || 0), 0);
      const totalSgstAmt = orderItems.reduce((acc, item) => acc + parseFloat(item.sgst_amt || 0), 0);
      const totalIgstAmt = orderItems.reduce((acc, item) => acc + parseFloat(item.igst_amt || 0), 0);
      const totalUtgstAmt = orderItems.reduce((acc, item) => acc + parseFloat(item.utgst_amt || 0), 0);
      const totalGrTotal = orderItems.reduce((acc, item) => acc + parseFloat(item.gr_total || 0), 0);

      const payload = {
        ...formData,
        // Top-level tax summaries
        subtotal: totalSubtotal.toFixed(2),
        cgst: orderItems[0]?.cgst || "0.00",
        sgst: orderItems[0]?.sgst || "0.00",
        igst: orderItems[0]?.igst || "0.00",
        utgst: orderItems[0]?.utgst || "0.00",
        cgst_amt: totalCgstAmt.toFixed(2),
        sgst_amt: totalSgstAmt.toFixed(2),
        igst_amt: totalIgstAmt.toFixed(2),
        utgst_amt: totalUtgstAmt.toFixed(2),
        gr_total: totalGrTotal.toFixed(2),

        item: orderItems.map(item => ({
          rev_no: item.rev_no || "0",
          item_no: item.item_no,
          item_code: item.item_code,
          item_description: item.item_description,
          rate: parseFloat(item.rate) || 0,
          qty: parseFloat(item.qty) || 0,
          uom: item.uom,
          item_wt: item.item_wt || "",
          line_no: item.line_no || "",
          pr_no: item.pr_no || "",
          rm_type: item.rm_type || "",
          pkg_trans: item.pkg_trans || "",
          due_date: item.due_date || null,
          type: item.type || "",
          item_category: item.item_category || "",
          remark: item.remark || "",
          hsn_code: item.hsn_code || null,
          assessable_value: item.assessable_value || "0.00",
          subtotal: item.subtotal || "0.00",
          cgst: item.cgst || "0.00",
          sgst: item.sgst || "0.00",
          igst: item.igst || "0.00",
          utgst: item.utgst || "0.00",
          cgst_amt: item.cgst_amt || "0.00",
          sgst_amt: item.sgst_amt || "0.00",
          igst_amt: item.igst_amt || "0.00",
          utgst_amt: item.utgst_amt || "0.00",
          gr_total: item.gr_total || "0.00",
        }))
      };

      console.log("Sending Payload:", JSON.stringify(payload, null, 2));

      const res = await fetch(
        "https://sellerp-backend.onrender.com/Sales/newsalesorder/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await res.json();

      if (!res.ok) {
        console.error("Server Error Response:", responseData);
        toast.error(responseData.message || "Failed to save order. Please check all fields.");
        return;
      }

      toast.success("✅ Order saved successfully!");

      // Reset form after successful save
      setTimeout(() => {
        setFormData({
          cust_date: "",
          plant: "ProduLink",
          order_type: "",
          order_status: "",
          customer: "",
          cust_po: "",
          pay_day: "",
          pay_note: "",
          valid_up: "",
          so_date: "",
          so_no: "",
          po_rec_date: "",
          incoterms: "",
          ship_to: "",
          ship_to_add_code: "",
          ccn_no: "",
          delivery_date: "",
          buyer_name: "",
          packing: "",
          shift: "",
          plan_date: "",
          lc_no: "",
          sales_person: "",
          site_name: "",
          project_name: "",
          delivery_al: " ",
          terms: "",
        });
        setOrderItems([]);
      }, 1500);

    } catch (err) {
      console.error("Catch Error:", err);
      toast.error("Network error. Please check your connection.");
    }
  };






  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  // GST Calculations
  const totalSubtotal = orderItems.reduce((acc, item) => acc + parseFloat(item.subtotal || 0), 0);
  const totalCgstAmt = orderItems.reduce((acc, item) => acc + parseFloat(item.cgst_amt || 0), 0);
  const totalSgstAmt = orderItems.reduce((acc, item) => acc + parseFloat(item.sgst_amt || 0), 0);
  const totalIgstAmt = orderItems.reduce((acc, item) => acc + parseFloat(item.igst_amt || 0), 0);
  const totalUtgstAmt = orderItems.reduce((acc, item) => acc + parseFloat(item.utgst_amt || 0), 0);
  const totalGrTotal = orderItems.reduce((acc, item) => acc + parseFloat(item.gr_total || 0), 0);
  const gstAmount = totalCgstAmt + totalSgstAmt + totalIgstAmt + totalUtgstAmt;

  const navigate = useNavigate();

  const toggleSideNav = () => {
    setSideNavOpen((prev) => !prev);
  };

  const togglePackMast = () => {
    setShowModal((prev) => !prev);
  };

  const handleNavigate = () => {
    navigate("/OrderLiast");
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };


  return (
    <div className="NewSalesOrderMaster">
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
                <div className="NewSalesOrder">
                  <div className="NewSalesOrder-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title mb-0">New Sales Order</h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button
                          type="button"
                          className="vndrbtn mx-1"
                          onClick={togglePackMast}
                        >
                          Packing Master
                        </button>
                        <button
                          type="button"
                          className="vndrbtn mx-1"
                          onClick={handleNavigate}
                        >
                          Order List
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Model */}
                  <div
                    className={`modal fade ${showModal ? "show d-block" : ""}`}
                    style={{ display: showModal ? "block" : "none", backgroundColor: showModal ? "rgba(0,0,0,0.5)" : "transparent" }}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden={!showModal}
                  >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Add New Packing Type :
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={togglePackMast}
                          >
                            {" "}
                            <i class="fa fa-times" aria-hidden="true"></i>{" "}
                          </button>
                        </div>

                        <div className="modal-body">
                          <div className="NewSalesOrder-header mb-4 text-start">
                            <div className="row align-items-center">
                              <div className="col-md-4">
                                <h5 className="header-title mb-0">
                                  Packing Master :{" "}
                                </h5>
                              </div>
                            </div>
                          </div>
                          <form>
                            <div className="row">
                              {/* Plant */}
                              <div className="col-md-2 mt-2">
                                <label htmlFor="" className="">
                                  Packing Name:{" "}
                                </label>
                              </div>
                              <div className="col-md-2">
                                <input
                                  type="text"
                                  placeholder=" "
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-2 mt-2">
                                <button
                                  type="button"
                                  className="vndrbtn w-100"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </form>
                          <hr />
                          <div>No Data Found !!</div>
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="NewSalesOrder-main">
                    <div className="row text-start">
                      <div className="col-md-2">
                        <label className="form-label">Plant:</label>
                        <select
                          name="plant"
                          value={formData.plant}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="ProduLink">ProduLink</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label">Series:</label>
                        <select
                          name="series"
                          value={formData.series}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="">Select</option>
                          <option value="">SOD</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label>Order Type:</label>
                        <div className="d-flex gap-2">
                          <select
                            name="order_type"
                            value={formData.order_type}
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="">Select</option>
                            <option value="GST">GST</option>
                            <option value="JobWork">JobWork</option>
                          </select>

                          <select
                            name="order_status"
                            value={formData.order_status}
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="">Select</option>
                            <option value="Open">Open</option>
                            <option value="Close">Close</option>
                          </select>
                        </div>
                      </div>
                      {/* Customer Select (Fetched from API) */}
                      {/* Customer Select (Fetched from API) */}
                      <div className="col-md-2">
                        <label>Customer:</label>
                        <input
                          list="customer-options"
                          name="customer"
                          value={formData.customer}
                          onChange={handleChange}
                          placeholder="Search Customer..."
                          className="form-control"
                          autoComplete="off"
                        />

                        <datalist id="customer-options">
                          {customers.map((cust) => (
                            <option
                              key={cust.id}
                              value={`${cust.Name} | ${cust.number}`}
                            >
                              {`${cust.Name} | Code: ${cust.number}`}
                            </option>
                          ))}
                        </datalist>
                      </div>


                      <div className="col-md-2 mt-4 d-flex gap-2">
                        <button type="button" className="vndrbtn flex-grow-1">
                          Search
                        </button>
                        <button type="button" className="vndrbtn flex-grow-1">
                          Clear
                        </button>
                      </div>
                    </div>

                    {/* Fields that auto-fill from API */}
                    <div className="row text-start mt-2">
                      <div className="col-md-2">
                        <label>Cust Po:</label>
                        <input
                          type="text"
                          name="cust_po"
                          value={formData.cust_po}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-2">
                        <label>Cust Date:</label>
                        <input
                          type="date"
                          name="cust_date"
                          className="form-control"
                          value={formData.cust_date}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-2">
                        <label>Pay Day:</label>
                        <input
                          type="text"
                          name="pay_day"
                          value={formData.pay_day}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-2">
                        <label>Pay Note:</label>
                        <input
                          type="text"
                          name="pay_note"
                          value={formData.pay_note}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-2">
                        <label>Valid Up:</label>
                        <input type="date" className="form-control" name="valid_up" value={formData.valid_up} onChange={handleChange} />
                      </div>
                      <div className="col-md-2 mt-2">
                        <input type="file" name="file" onChange={handleFileChange} />
                      </div>
                    </div>
                  </div>

                  <div className="NewSalesOrder-main mt-5">
                    <div className="NewSalesOrder-second">
                      <ul
                        className="nav nav-tabs"
                        id="NewSalesOrderTabs"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="item-details-tab"
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
                            id="terms-conditions-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#termsconditions"
                            type="button"
                            role="tab"
                          >
                            Terms & Conditions
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
                        className="tab-content mt-4"
                        id="NewSalesOrderTabsContent"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="itemdetails"
                          role="tabpanel"
                        >
                          <div className="NewSalesOrder-Main">
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Select Item.</th>
                                    <th>Cust Item Code</th>
                                    <th>Item Desc</th>
                                    <th>Rate | Desc</th>
                                    <th> Qty | UOM</th>
                                    <th>RM Type| Item Wt.</th>
                                    <th>Pkg. Trans </th>
                                    <th>Plan | Due Date</th>
                                    <th>Type</th>
                                    <th>Remark</th>
                                    <th> </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <input
                                        list="item-search-list"
                                        className="w-55 form-control"
                                        value={currentItem.selectedSearch}
                                        onChange={handleItemSearchChange}
                                        placeholder="Search Item..."
                                      />
                                      <datalist id="item-search-list">
                                        {itemsList.map((item, idx) => (
                                          <option
                                            key={idx}
                                            value={`${item.part_no} | ${item.Part_Code} | ${item.Name_Description}`}
                                          />
                                        ))}
                                      </datalist>
                                      Rev No: {currentItem.part_no ? "0" : ""}
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="w-55 form-control"
                                        value={currentItem.part_code}
                                        readOnly
                                      />
                                      <br />
                                      Line No :{" "}
                                      <input
                                        type="text"
                                        className="w-50 mt-2 form-control"
                                        placeholder=" "
                                      />{" "}
                                      <br /> PR No. :{" "}
                                      <input
                                        type="text"
                                        className="w-50 mt-2 form-control"
                                        placeholder=" "
                                      />
                                    </td>
                                    <td>
                                      <textarea
                                        className="form-control"
                                        value={currentItem.description}
                                        readOnly
                                      ></textarea>
                                    </td>

                                    <td>
                                      <input
                                        type="number"
                                        className="form-control"
                                        value={currentItem.rate}
                                        onChange={(e) =>
                                          setCurrentItem({
                                            ...currentItem,
                                            rate: e.target.value,
                                          })
                                        }
                                      />
                                      <br />{" "}
                                      <input
                                        type="text"
                                        className="w-50 mt-2 form-control"
                                        placeholder=" "
                                      />{" "}
                                      %
                                    </td>

                                    <td>
                                      <input
                                        type="number"
                                        className="form-control"
                                        value={currentItem.qty}
                                        onChange={(e) =>
                                          setCurrentItem({
                                            ...currentItem,
                                            qty: e.target.value,
                                          })
                                        }
                                        placeholder="Qty"
                                      />
                                      <br />{" "}
                                      <input
                                        type="text"
                                        className="w-50 mt-2 form-control"
                                        placeholder=" "
                                      />
                                    </td>
                                    <td>
                                      {" "}
                                      <select name="" id="">
                                        <option value="">NOS</option>
                                      </select>{" "}
                                      <br />{" "}
                                      <input
                                        type="text"
                                        className="w-60 mt-2 form-control"
                                        placeholder="Item Wt. "
                                      />{" "}
                                      <br />{" "}
                                      <input
                                        type="text"
                                        className="w-50 mt-2 form-control"
                                        placeholder="Per Unit "
                                      />
                                    </td>
                                    <td>
                                      {" "}
                                      <input
                                        type="text"
                                        className="w-60 mt-2 form-control"
                                        placeholder=" 0 "
                                      />{" "}
                                      <br />{" "}
                                      <input
                                        type="text"
                                        className="w-60 mt-2 form-control"
                                        placeholder=" 0 "
                                      />
                                    </td>
                                    <td>
                                      {" "}
                                      <input
                                        type="date"
                                        className="w-60 mt-2 form-control"
                                        placeholder=" "
                                      />{" "}
                                      <br />{" "}
                                      <input
                                        type="date"
                                        className="w-60 mt-2 form-control"
                                        placeholder=" "
                                      />
                                    </td>
                                    <td>
                                      <select name="" id="">
                                        <option value="">Select</option>
                                      </select>{" "}
                                      <br />
                                      <label htmlFor="">Item Category</label>
                                      <select name="" id="">
                                        <option value="">RUGEL</option>
                                      </select>
                                    </td>
                                    <td>
                                      {" "}
                                      <textarea name="" id=""></textarea>
                                      <br />
                                      <select name="" id="">
                                        <option value="">Select</option>
                                      </select>
                                    </td>
                                    <td>
                                      <button
                                        className="vndrbtn w-100 mt-2"
                                        onClick={addItemToTable}
                                      >
                                        Add
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="NewSalesOrder-Main">
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Sr.</th>
                                    <th>Item No </th>
                                    <th>Item Code</th>
                                    <th>Description</th>
                                    <th>Rate | Desc</th>
                                    <th>Amort Cost </th>
                                    <th>PO Qty | UOM</th>
                                    <th>Rate Type| Item Wt.</th>
                                    <th>Sub Total</th>
                                    <th>Pkg. Trans Changes</th>
                                    <th>Plan | Due Date</th>
                                    <th>Type</th>
                                    <th>GST</th>
                                    <th>Remark</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orderItems.map((item, index) => (
                                    <tr key={item.id}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {item.part_no}
                                        <br /> Line No :
                                        <br /> PR No.
                                      </td>

                                      <td>{item.part_code}</td>

                                      <td>
                                        {item.description}
                                        <br /> Rev. No :
                                        <br /> HSN/SAC : {item.hsn}
                                      </td>
                                      <td>{item.rate}</td>
                                      <td></td>
                                      <td>{item.qty} | {item.uom}</td>

                                      <td>
                                        Rate Type: <br />
                                        Item Wt. : <br />
                                        Per Unit:{" "}
                                      </td>

                                      <td>{(item.rate * item.qty).toFixed(2)}</td>

                                      <td></td>
                                      <td></td>
                                      <td></td>

                                      <td>
                                        CGST ({item.cgst}%): {item.cgst_amt}<br />
                                        SGST ({item.sgst}%): {item.sgst_amt}<br />
                                        IGST ({item.igst}%): {item.igst_amt}<br />
                                        UTGST ({item.utgst}%): {item.utgst_amt}<br />
                                        <strong>Total: {item.gr_total}</strong>
                                      </td>
                                      <td>{item.CGST}</td>
                                      <td>Edit</td>
                                      <td><button className="btn btn-danger btn-sm" onClick={() => setOrderItems(orderItems.filter(i => i.id !== item.id))}>Delete</button></td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="termsconditions"
                          role="tabpanel"
                        >
                          <div className="NewSalesOrder-header mb-4 text-start">
                            <div className="row align-items-center">
                              <div className="col-md-2">
                                <h5 className="header-title">Add New Terms</h5>
                              </div>
                              <div className="col-md-2">
                                <h5 className="header-title">Refresh List</h5>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="taxes"
                          role="tabpanel"
                        >
                          <div className="NewSalesOrder-main">
                            <div className="row text-start">
                              <div className="col-md-4">
                                <label>So Date:</label>
                                <input type="date" className="form-control" name="so_date" value={formData.so_date} onChange={handleChange} />
                              </div>
                              <div className="col-md-4">
                                <label>SO No:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={formData.so_no}
                                  readOnly
                                  disabled
                                  placeholder="Auto-generated"
                                />
                                {soNoError && <small className="text-danger">{soNoError}</small>}
                              </div>
                              <div className="col-md-4">
                                <label>CCN No:</label>
                                <input
                                  type="text"
                                  name="ccn_no"
                                  value={formData.ccn_no}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div className="row text-start mt-2">
                              <div className="col-md-4">
                                <label>Po Rec Date:</label>
                                <input type="date" className="form-control" name="po_rec_date" value={formData.po_rec_date} onChange={handleChange} />
                              </div>
                              <div className="col-md-4">
                                <label>Delivery Date:</label>
                                <input type="date" className="form-control" name="delivery_date" value={formData.delivery_date} onChange={handleChange} />
                              </div>
                              <div className="col-md-4">
                                <label>Plan Date:</label>
                                <input type="date" className="form-control" name="plan_date" value={formData.plan_date} onChange={handleChange} />
                              </div>
                            </div>

                            <div className="row text-start mt-2">
                              <div className="col-md-4">
                                <label>Incoterms:</label>
                                <select
                                  name="incoterms"
                                  value={formData.incoterms}
                                  onChange={handleChange}
                                  className="form-control"
                                >
                                  <option value="">Select</option>
                                  <option value="FOB">FOB</option>
                                  <option value="EXW">EXW</option>
                                </select>
                              </div>
                              <div className="col-md-4">
                                <label>L.C.No:</label>
                                <input
                                  type="text"
                                  name="lc_no"
                                  value={formData.lc_no}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-4">
                                <label>Sales Person:</label>
                                <select
                                  name="sales_person"
                                  value={formData.sales_person}
                                  onChange={handleChange}
                                  className="form-control"
                                >
                                  <option value="">Select</option>
                                  <option value="Person A">Person A</option>
                                </select>
                              </div>
                            </div>

                            <div className="row text-start mt-2">
                              <div className="col-md-4">
                                <label>Ship To:</label>
                                <input type="text" name="ship_to" value={formData.ship_to} className="form-control" readOnly />
                              </div>
                              <div className="col-md-4">
                                <label>Buyer Name:</label>
                                <input
                                  type="text"
                                  name="buyer_name"
                                  value={formData.buyer_name}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-4">
                                <label>Site Name:</label>
                                <input
                                  type="text"
                                  name="site_name"
                                  value={formData.site_name}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div className="row text-start mt-2">
                              <div className="col-md-4">
                                <label>Ship To Add Code:</label>
                                <input
                                  type="text"
                                  name="ship_to_add_code"
                                  value={formData.ship_to_add_code}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-4">
                                <label>Packing:</label>
                                <input
                                  type="text"
                                  name="packing"
                                  value={formData.packing}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-4">
                                <label>Project Name:</label>
                                <input
                                  type="text"
                                  name="project_name"
                                  value={formData.project_name}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div className="row text-start mt-3">
                              <div className="col-md-6">
                                <label>Delivery AL :</label>
                                <textarea
                                  name="delivery_al"
                                  value={formData.delivery_al}
                                  onChange={handleChange}
                                  className="form-control"
                                ></textarea>
                              </div>
                              <div className="col-md-6">
                                <label>Terms & Conditions:</label>
                                <textarea
                                  name="terms"
                                  value={formData.terms}
                                  onChange={handleChange}
                                  className="form-control"
                                ></textarea>
                              </div>
                            </div>

                            <div className="table-responsive">
                              <table className="table table-bordered table-striped">
                                <tbody>
                                  <tr>
                                    <td
                                      className=""
                                      style={{
                                        width: "100px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        id=""
                                        name=""
                                        style={{
                                          width: "50px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                      (TOC)
                                      <input
                                        type="text"
                                        placeholder="Pack & Frwd Charges"
                                        style={{
                                          width: "150px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                      <input
                                        type="text"
                                        placeholder="0"
                                        style={{
                                          width: "50px",
                                          marginLeft: "5px",
                                        }}
                                      />{" "}
                                      %
                                    </td>

                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <input
                                        type="text"
                                        placeholder="0"
                                        style={{
                                          width: "100px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {" "}
                                      Assessable Value{" "}
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {" "}
                                      {totalSubtotal.toFixed(2)}
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    ></td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    ></td>
                                  </tr>
                                </tbody>

                                <tbody>
                                  <tr>
                                    <td
                                      className=""
                                      style={{
                                        width: "100px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        id=""
                                        name=""
                                        style={{
                                          width: "50px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                      (TOC)
                                      <input
                                        type="text"
                                        placeholder="Pack & Frwd Charges"
                                        style={{
                                          width: "150px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                      <input
                                        type="text"
                                        placeholder="0"
                                        style={{
                                          width: "50px",
                                          marginLeft: "5px",
                                        }}
                                      />{" "}
                                      %
                                    </td>

                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <input
                                        type="text"
                                        placeholder="0"
                                        style={{
                                          width: "100px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {" "}
                                      CGST : {orderItems[0]?.cgst || 0} %{" "}
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {" "}
                                      {totalCgstAmt.toFixed(2)}
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    ></td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    ></td>
                                  </tr>
                                </tbody>

                                <tbody>
                                  <tr>
                                    <td
                                      className=""
                                      style={{
                                        width: "100px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        id=""
                                        name=""
                                        style={{
                                          width: "50px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                      (TOC)
                                      <input
                                        type="text"
                                        placeholder="Pack & Frwd Charges"
                                        style={{
                                          width: "150px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                      <input
                                        type="text"
                                        placeholder="0"
                                        style={{
                                          width: "50px",
                                          marginLeft: "5px",
                                        }}
                                      />{" "}
                                      %
                                    </td>

                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <input
                                        type="text"
                                        placeholder="0"
                                        style={{
                                          width: "100px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {" "}
                                      SGST :{orderItems[0]?.sgst || 0} %{" "}
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {" "}
                                      {totalSgstAmt.toFixed(2)}
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {" "}
                                      Third-Party Inspection (TPI){" "}
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <select
                                        style={{
                                          width: "100px",
                                          marginLeft: "5px",
                                        }}
                                        name=""
                                        id=""
                                      >
                                        <option value="">No</option>
                                      </select>
                                    </td>
                                  </tr>
                                </tbody>

                                <tbody>
                                  <tr>
                                    <td
                                      className=""
                                      style={{
                                        width: "100px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        id=""
                                        name=""
                                        style={{
                                          width: "50px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                      (TOC)
                                      <input
                                        type="text"
                                        placeholder="Other Charges"
                                        style={{
                                          width: "150px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                      <input
                                        type="text"
                                        placeholder="0"
                                        style={{
                                          width: "50px",
                                          marginLeft: "5px",
                                        }}
                                      />{" "}
                                      %
                                    </td>

                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <input
                                        type="text"
                                        placeholder="0"
                                        style={{
                                          width: "100px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                    </td>

                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {" "}
                                      IGST : {orderItems[0]?.igst || 0} %{" "}
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {" "}
                                      {totalIgstAmt.toFixed(2)}
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        id=""
                                        name=""
                                        style={{
                                          width: "50px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                      Ref. Cust :
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <input
                                        type="text"
                                        placeholder="Enter Name"
                                        style={{
                                          width: "150px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                    </td>
                                  </tr>
                                </tbody>

                                <tbody>
                                  <tr>
                                    <td
                                      className=""
                                      style={{
                                        width: "100px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      CR Name :
                                    </td>

                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <select
                                        style={{
                                          width: "100px",
                                          marginLeft: "5px",
                                        }}
                                        name=""
                                        id=""
                                      >
                                        <option value="">Select</option>
                                      </select>
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {" "}
                                      UTGST : {orderItems[0]?.utgst || 0} %{" "}
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {" "}
                                      {totalUtgstAmt.toFixed(2)}
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {" "}
                                      GR. Total :{" "}
                                    </td>
                                    <td
                                      style={{
                                        width: "200px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      {" "}
                                      {totalGrTotal.toFixed(2)}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div className="row text-start">
                              <div className="col-md-3">
                                <button
                                  type="button"
                                  onClick={handleSaveOrder}
                                  className="vndrbtn mx-1"
                                >
                                  Save Order
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
              theme="light"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSalesOrder;
