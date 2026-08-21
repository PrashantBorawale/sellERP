import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import "./CustPOAmend.css";
import { 
  PlusCircle, 
  RefreshCcw, 
  RotateCcw, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  MoreVertical
} from "lucide-react";

const CustPOAmend = () => {
  const navigate = useNavigate();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [amdNo, setAmdNo] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [poList, setPoList] = useState([]);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [formData, setFormData] = useState({
    series: "SO Amendment",
    amd_date: "",
    customer: "",
    po_no: "",
    amd_type: "Rate",
    ref_no: "",
    ref_date: "",
    narration: ""
  });

  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleAddItems = () => {
    if (!formData.po_no) {
      alert("Please select a PO No first.");
      return;
    }

    const selectedPO = poList.find(po => po.cust_po === formData.po_no);
    if (selectedPO && selectedPO.item) {
      const newItems = selectedPO.item.map(it => ({
        id: it.id,
        cust_po_no: selectedPO.cust_po,
        po_line_no: it.line_no || "",
        po_date: selectedPO.cust_date || "",
        item_no: it.item_no || "",
        item_code: it.item_code || "",
        description: it.item_description || "",
        old_rate: it.rate || "0",
        old_qty: it.qty || "0",
        new_rate: "",
        new_qty: "",
        eff_date: "",
        remark: ""
      }));
      setItems(newItems);
    } else {
      alert("No items found for this PO.");
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (items.length === 0) {
      alert("No items to submit.");
      return;
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return null;
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    };

    // Map to the flat structure shown in your example
    const payload = {
      series: formData.series,
      amd_no: amdNo,
      amd_date: formatDate(formData.amd_date),
      amd_type: formData.amd_type,
      ref_no: formData.ref_no,
      ref_date: formatDate(formData.ref_date),
      customer: formData.customer,
      po_no: formData.po_no,
      narration: formData.narration,
      item_no: items[0].item_no || "",
      item_code: items[0].item_code || "",
      item_description: items[0].description || "",
      old_rate: items[0].old_rate || "0",
      old_qty: items[0].old_qty || "0",
      new_rate: items[0].new_rate || "0",
      new_qty: items[0].new_qty || "0",
      eff_date: formatDate(items[0].eff_date) || formatDate(formData.amd_date),
      remark: items[0].remark || ""
    };

    console.log("Submitting Payload:", payload);

    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Sales/customer-po-amendment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Customer PO Amendment created successfully!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error Response:", errorData);
        alert(`Failed to create amendment: ${errorData.message || response.statusText || "Server Error"}`);
      }
    } catch (error) {
      console.error("Error submitting amendment:", error);
      alert("An error occurred during submission.");
    }
  };

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const fetchAmdNo = async () => {
    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Sales/customer-po-amd-no/");
      if (response.ok) {
        const data = await response.json();
        setAmdNo(data.amd_no);
      }
    } catch (error) {
      console.error("Error fetching Amd No:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Sales/items/customers-list/");
      if (response.ok) {
        const data = await response.json();
        setCustomerList(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching Customers:", error);
    }
  };

  const fetchPOList = async () => {
    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Sales/newsalesorder/");
      if (response.ok) {
        const data = await response.json();
        setPoList(data || []);
      }
    } catch (error) {
      console.error("Error fetching Sales Orders:", error);
    }
  };

  useEffect(() => {
    fetchAmdNo();
    fetchCustomers();
    fetchPOList();
  }, []);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="CustPOAmendMaster">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`} style={{ paddingTop: '60px' }}>
                
                {/* Header Section */}
                <div className="CustPOAmend-header d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <h5 className="header-title">Customer Po Amendment</h5>
                    <div className="header-series-section">
                      <label>Series :</label>
                      <select name="series" value={formData.series} onChange={handleChange}>
                        <option value="SO Amendment">SO Amendment</option>
                      </select>
                    </div>
                  </div>

                  <Link to="/SalesOrderAmendList" className="vndrbtn mx-1 d-flex align-items-center gap-2">
                    <ArrowLeft size={14} />
                    SO Amendment List
                  </Link>
                </div>

                <div className="CustPOAmend-Main">
                  {/* Compact Form Container */}
                  <div className="compact-form-container">
                    <div className="form-row-header">
                      <div className="form-group-compact w-amd-no">
                        <label>Amd No :</label>
                        <div className="d-flex gap-1 align-items-center">
                          <div className="soa-box">SOA</div>
                          <input 
                            type="text" 
                            className="form-control amd-no-input" 
                            value={amdNo}
                            readOnly
                          />
                          <button className="vndrbtn p-0 border-0" onClick={fetchAmdNo}>
                            <RefreshCcw size={14} color="#64748b" />
                          </button>
                        </div>
                      </div>

                      <div className="form-group-compact w-date">
                        <label>Amd Date :</label>
                        <input type="date" name="amd_date" className="form-control" value={formData.amd_date} onChange={handleChange} />
                      </div>

                      <div className="form-group-compact w-customer">
                        <label>Customer :</label>
                        <div style={{ position: 'relative' }}>
                          <input 
                            type="text" 
                            name="customer" 
                            className="form-control" 
                            placeholder="Enter Name.." 
                            value={formData.customer} 
                            onChange={(e) => {
                              handleChange(e);
                              setShowCustomerDropdown(true);
                            }}
                            autoComplete="off"
                          />
                          {showCustomerDropdown && formData.customer.length > 0 && (
                            <div className="custom-dropdown-list">
                              {customerList
                                .filter(cust => cust.Name.toLowerCase().includes(formData.customer.toLowerCase()))
                                .map(cust => (
                                  <div 
                                    key={cust.id} 
                                    className="dropdown-item-custom"
                                    onClick={() => {
                                      setFormData(prev => ({ ...prev, customer: cust.Name }));
                                      setShowCustomerDropdown(false);
                                    }}
                                  >
                                    {cust.Name}
                                  </div>
                                ))
                              }
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-group-compact w-po-no">
                        <label>PO No :</label>
                        <select name="po_no" className="form-control" value={formData.po_no} onChange={handleChange}>
                          <option value="">Select an Option</option>
                          {poList
                            .filter(po => !formData.customer || (po.customer && po.customer.includes(formData.customer)))
                            .map(po => (
                              <option key={po.id} value={po.cust_po}>{po.cust_po}</option>
                            ))
                          }
                        </select>
                      </div>

                      <div className="amend-type-container">
                        <label className="form-label mb-0" style={{ fontSize: '11px', fontWeight: '600', color: '#475569' }}>Amend Type :</label>
                        <div className="radio-group">
                          <div><input type="radio" name="amd_type" value="Rate" id="rate" checked={formData.amd_type === "Rate"} onChange={handleChange} /><label htmlFor="rate">Rate</label></div>
                          <div><input type="radio" name="amd_type" value="Qty" id="qty" checked={formData.amd_type === "Qty"} onChange={handleChange} /><label htmlFor="qty">Qty</label></div>
                          <div><input type="radio" name="amd_type" value="Close" id="close" checked={formData.amd_type === "Close"} onChange={handleChange} /><label htmlFor="close">Close</label></div>
                          <div><input type="radio" name="amd_type" value="PO Date" id="poDate" checked={formData.amd_type === "PO Date"} onChange={handleChange} /><label htmlFor="poDate">PO Date</label></div>
                          <button className="vndrbtn" type="button" onClick={handleAddItems}>
                            <PlusCircle size={14} /> Add {">>"}
                          </button>
                        </div>
                      </div>

                      <div className="form-group-compact w-rev-no">
                        <label>Rev No :</label>
                        <div className="d-flex align-items-center">
                          <span className="rev-indicator"></span>
                        </div>
                      </div>

                      <div className="form-group-compact w-ref">
                        <label>Ref :</label>
                        <input type="text" name="ref_no" className="form-control" value={formData.ref_no} onChange={handleChange} />
                      </div>

                      <div className="form-group-compact w-date">
                        <label>Ref Date :</label>
                        <input type="date" name="ref_date" className="form-control" value={formData.ref_date} onChange={handleChange} />
                      </div>

                      <div className="form-group-compact w-narration">
                        <label>Narration :</label>
                        <textarea name="narration" className="form-control remark-input" style={{ height: '24px' }} value={formData.narration} onChange={handleChange}></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-container">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className="blue-gradient-header">
                          <tr>
                            <th>Sr.</th>
                            <th>Cust Po No</th>
                            <th>PO Date</th>
                            <th>Item No</th>
                            <th>Item Code</th>
                            <th style={{ width: '30%' }}>Item Description</th>
                            {formData.amd_type === "Rate" ? (
                              <>
                                <th>Old Rate</th>
                                <th>New Rate</th>
                              </>
                            ) : (
                              <>
                                <th>Old Qty</th>
                                <th>New Qty</th>
                              </>
                            )}
                            <th>Eff Date</th>
                            <th>Remark / Note</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, idx) => (
                            <tr key={item.id}>
                              <td className="text-center">{idx + 1}</td>
                              <td>
                                <div style={{ fontWeight: '500' }}>{item.cust_po_no}</div>
                                <div className="line-no-cell">PO Line No : {item.po_line_no}</div>
                              </td>
                              <td className="text-center">{item.po_date}</td>
                              <td className="text-center">{item.item_no}</td>
                              <td className="text-center">{item.item_code}</td>
                              <td>{item.description}</td>
                              {formData.amd_type === "Rate" ? (
                                <>
                                  <td className="old-rate-cell">{item.old_rate}</td>
                                  <td><input type="text" className="new-rate-input" value={item.new_rate} onChange={(e) => handleItemChange(item.id, 'new_rate', e.target.value)} /></td>
                                </>
                              ) : (
                                <>
                                  <td className="old-rate-cell">{item.old_qty}</td>
                                  <td><input type="text" className="new-rate-input" value={item.new_qty} onChange={(e) => handleItemChange(item.id, 'new_qty', e.target.value)} /></td>
                                </>
                              )}
                              <td>
                                <div className="d-flex align-items-center gap-1">
                                  <input 
                                    type="date" 
                                    className="eff-date-input" 
                                    value={item.eff_date} 
                                    onChange={(e) => handleItemChange(item.id, 'eff_date', e.target.value)} 
                                  />
                                </div>
                              </td>
                              <td><textarea className="remark-input" value={item.remark} onChange={(e) => handleItemChange(item.id, 'remark', e.target.value)}></textarea></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Fixed Footer Buttons */}
                <div className="CustPOAmend-footer">
                  <button className="vndrbtn mx-1">
                    <RotateCcw size={16} />
                    Clear
                  </button>
                  <button className="vndrbtn mx-1" onClick={handleSubmit}>
                    <CheckCircle2 size={16} color="#10b981" />
                    Create Po Amendment
                  </button>
                </div>

              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustPOAmend;