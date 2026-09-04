import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./InvoiceList.css";
import { Link, useNavigate } from "react-router-dom";

const InvoiceList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

  // Filter states
  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [plant, setPlant] = useState("");
  const [series, setSeries] = useState("");
  const [customerNameEnabled, setCustomerNameEnabled] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [invNoEnabled, setInvNoEnabled] = useState(false);
  const [invNo, setInvNo] = useState("");
  const [cancelFilter, setCancelFilter] = useState("ALL");
  const [userFilter, setUserFilter] = useState("ALL User");

  // Data states
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  // Summary states
  const [totalQty, setTotalQty] = useState(0);
  const [totalAssessableValue, setTotalAssessableValue] = useState(0);
  const [totalCGST, setTotalCGST] = useState(0);
  const [totalSGST, setTotalSGST] = useState(0);
  const [totalIGST, setTotalIGST] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  // Fetch invoices from API
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://sellerp-backend.onrender.com/Sales/invoice/");
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      console.log("Invoice API Response:", data);

      let invList = [];
      if (Array.isArray(data)) {
        invList = data;
      } else if (data.data && Array.isArray(data.data)) {
        invList = data.data;
      } else if (data.results && Array.isArray(data.results)) {
        invList = data.results;
      }

      setInvoices(invList);
      setFilteredInvoices(invList);
      calculateSummary(invList);
    } catch (err) {
      console.error("Error fetching invoices:", err);
      setInvoices([]);
      setFilteredInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate summary totals
  const calculateSummary = (invList) => {
    let qty = 0;
    let assessable = 0;
    let cgst = 0;
    let sgst = 0;
    let igst = 0;
    let total = 0;

    invList.forEach((inv) => {
      // Sum qty from items
      if (inv.items && Array.isArray(inv.items)) {
        inv.items.forEach((item) => {
          qty += parseFloat(item.inv_qty || item.po_qty || item.qty || 0);
        });
      }

      // Sum GST details
      if (inv.GSTdetails && Array.isArray(inv.GSTdetails)) {
        inv.GSTdetails.forEach((gst) => {
          assessable += parseFloat(gst.assessble_value || gst.assessable_value || 0);
          cgst += parseFloat(gst.cgst_amt || 0);
          sgst += parseFloat(gst.sgst_amt || 0);
          igst += parseFloat(gst.igst_amt || 0);
        });
      }

      // Calculate total per invoice
      const invAssessable = inv.GSTdetails?.[0]
        ? parseFloat(inv.GSTdetails[0].assessble_value || inv.GSTdetails[0].assessable_value || 0)
        : 0;
      const invCGST = inv.GSTdetails?.[0] ? parseFloat(inv.GSTdetails[0].cgst_amt || 0) : 0;
      const invSGST = inv.GSTdetails?.[0] ? parseFloat(inv.GSTdetails[0].sgst_amt || 0) : 0;
      const invIGST = inv.GSTdetails?.[0] ? parseFloat(inv.GSTdetails[0].igst_amt || 0) : 0;
      total += invAssessable + invCGST + invSGST + invIGST;
    });

    setTotalRecords(invList.length);
    setTotalQty(qty);
    setTotalAssessableValue(assessable);
    setTotalCGST(cgst);
    setTotalSGST(sgst);
    setTotalIGST(igst);
    setTotalAmount(total);
  };

  // Load invoices on mount
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Handle Search
  const handleSearch = () => {
    let filtered = [...invoices];

    // Filter by date range (use date_of_removal or invoice_Date)
    if (fromDate && toDate) {
      filtered = filtered.filter((inv) => {
        const invDate = inv.invoice_Date || inv.date_of_removal || "";
        if (!invDate) return true;
        return invDate >= fromDate && invDate <= toDate;
      });
    }

    // Filter by customer name
    if (customerNameEnabled && customerName.trim()) {
      const searchTerm = customerName.toLowerCase();
      filtered = filtered.filter((inv) => {
        const customer = inv.bill_to || inv.customer || (inv.items?.[0]?.customer) || "";
        return customer.toLowerCase().includes(searchTerm);
      });
    }

    // Filter by invoice number
    if (invNoEnabled && invNo.trim()) {
      filtered = filtered.filter((inv) => {
        const invoiceNo = String(inv.invoice_no || "");
        return invoiceNo.includes(invNo.trim());
      });
    }

    // Filter by series
    if (series && series !== "ALL") {
      filtered = filtered.filter((inv) => {
        return (inv.series_type || inv.series || "") === series;
      });
    }

    setFilteredInvoices(filtered);
    setCurrentPage(1);
    calculateSummary(filtered);
  };

  // Get customer name from invoice
  const getCustomerName = (inv) => {
    if (inv.bill_to) return inv.bill_to;
    if (inv.customer) return inv.customer;
    if (inv.items && inv.items.length > 0) return inv.items[0].customer || "";
    return "";
  };

  // Get customer code from invoice
  const getCustomerCode = (inv) => {
    return inv.cust_code || inv.customer_code || inv.destenation_code || "";
  };

  // Get item description from invoice
  const getItemDesc = (inv) => {
    if (!inv.items || inv.items.length === 0) return "-";
    const item = inv.items[0];
    const qty = item.inv_qty || item.po_qty || item.qty || "";
    const rate = item.rate || "";
    const desc = item.description || item.item_description || "";
    const itemCode = item.id || item.item_code || "";

    if (inv.items.length === 1) {
      return `Qty: ${qty} Rate: ${rate} | ${itemCode} | ${desc}`;
    }
    return `Total Item : ${inv.items.length}`;
  };

  // Get total qty from invoice
  const getInvoiceQty = (inv) => {
    if (!inv.items || inv.items.length === 0) return 0;
    return inv.items.reduce((sum, item) => {
      return sum + parseFloat(item.inv_qty || item.po_qty || item.qty || 0);
    }, 0);
  };

  // Get assessable value
  const getAssessableValue = (inv) => {
    if (inv.GSTdetails && inv.GSTdetails.length > 0) {
      return parseFloat(inv.GSTdetails[0].assessble_value || inv.GSTdetails[0].assessable_value || 0);
    }
    return 0;
  };

  // Get total with GST
  const getTotal = (inv) => {
    const assessable = getAssessableValue(inv);
    const cgstAmt = inv.GSTdetails?.[0] ? parseFloat(inv.GSTdetails[0].cgst_amt || 0) : 0;
    const sgstAmt = inv.GSTdetails?.[0] ? parseFloat(inv.GSTdetails[0].sgst_amt || 0) : 0;
    const igstAmt = inv.GSTdetails?.[0] ? parseFloat(inv.GSTdetails[0].igst_amt || 0) : 0;
    return assessable + cgstAmt + sgstAmt + igstAmt;
  };

  // Get invoice date for display
  const getInvoiceDate = (inv) => {
    return inv.invoice_Date || inv.date_of_removal || "";
  };

  // Derive financial year from invoice_no
  const getFinancialYear = (inv) => {
    if (inv.financial_year) return inv.financial_year;
    // invoice_no like "262700001" => "26-27"
    const no = String(inv.invoice_no || "");
    if (no.length >= 4) {
      return no.substring(0, 2) + "-" + no.substring(2, 4);
    }
    return "";
  };

  return (
    <div className="InvoiceListMaster">
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
                <div className="InvoiceList">
                  {/* Header */}
                  <div className="InvoiceList-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Tax Invoice List</h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button
                          type="button"
                          className="vndrbtn"
                          onClick={() => navigate("/NewInvoice")}
                        >
                          + New Invoice
                        </button>
                        <button
                          type="button"
                          className="vndrbtn"
                          onClick={() => navigate("/TaxInvoiceList")}
                        >
                          Invoice - Report
                        </button>
                        <button
                          type="button"
                          className="vndrbtn"
                          onClick={() => navigate("/QuerySalesTax")}
                        >
                          Sales Invoice - Query
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="InvoiceList-Main">
                    <div className="container-fluid">
                      <div className="row g-2 text-start align-items-end">
                        <div className="col-sm-6 col-md-3 col-lg-1">
                          <label>From Date:</label>
                          <input
                            type="date"
                            className="form-control"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-1">
                          <label>To Date:</label>
                          <input
                            type="date"
                            className="form-control"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-1">
                          <label>Plant:</label>
                          <select
                            className="form-control"
                            value={plant}
                            onChange={(e) => setPlant(e.target.value)}
                          >
                            <option value="">SHARP</option>
                            <option value="VISHWA S.I.">VISHWA S.I.</option>
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-1">
                          <label>Series:</label>
                          <select
                            className="form-control"
                            value={series}
                            onChange={(e) => setSeries(e.target.value)}
                          >
                            <option value="ALL">ALL</option>
                            <option value="GST Invoice">GST Invoice</option>
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customerCheckbox"
                              checked={customerNameEnabled}
                              onChange={(e) => setCustomerNameEnabled(e.target.checked)}
                            />
                            <label htmlFor="customerCheckbox" className="form-check-label">
                              Customer Name:
                            </label>
                          </div>
                          <input
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            disabled={!customerNameEnabled}
                          />
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-1">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="invNoCheckbox"
                              checked={invNoEnabled}
                              onChange={(e) => setInvNoEnabled(e.target.checked)}
                            />
                            <label htmlFor="invNoCheckbox" className="form-check-label">
                              Invoice No:
                            </label>
                          </div>
                          <input
                            type="text"
                            placeholder="No"
                            className="form-control"
                            value={invNo}
                            onChange={(e) => setInvNo(e.target.value)}
                            disabled={!invNoEnabled}
                          />
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-1">
                          <label>Cancel:</label>
                          <select
                            className="form-control"
                            value={cancelFilter}
                            onChange={(e) => setCancelFilter(e.target.value)}
                          >
                            <option value="ALL">ALL</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-1">
                          <label>User:</label>
                          <select
                            className="form-control"
                            value={userFilter}
                            onChange={(e) => setUserFilter(e.target.value)}
                          >
                            <option value="ALL User">ALL User</option>
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-1" style={{ marginTop: "18px" }}>
                          <button
                            type="button"
                            className="vndrbtn"
                            onClick={handleSearch}
                          >
                            Search
                          </button>
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-1" style={{ marginTop: "18px" }}>
                          <button
                            type="button"
                            className="vndrbtn"
                            onClick={() => {
                              setFilteredInvoices(invoices);
                              calculateSummary(invoices);
                            }}
                          >
                            Search Option
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="InvoiceList-Main mt-2 table-responsive">
                    {loading ? (
                      <div className="loading-spinner">Loading invoices...</div>
                    ) : (
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col">Year</th>
                            <th scope="col">Plant</th>
                            <th scope="col">Invoice No</th>
                            <th scope="col">Date</th>
                            <th scope="col">Cust Po No</th>
                            <th scope="col">Type</th>
                            <th scope="col">Cust Code</th>
                            <th scope="col">Cust Name</th>
                            <th scope="col">Item Qty | Desc</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Ass Amt</th>
                            <th scope="col">Total</th>
                            <th scope="col">User</th>
                            <th scope="col">View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentInvoices.length > 0 ? (
                            currentInvoices.map((inv, index) => (
                              <tr key={inv.id || index}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{getFinancialYear(inv)}</td>
                                <td>{inv.plant || inv.items?.[0]?.plant || "SHARP"}</td>
                                <td style={{ fontWeight: "600" }}>
                                  {inv.invoice_no || ""}
                                </td>
                                <td>{getInvoiceDate(inv)}</td>
                                <td>{inv.items?.[0]?.po_no || inv.cust_po || inv.d_c_no || ""}</td>
                                <td>{inv.series_type || inv.invoice_type || "GST"}</td>
                                <td>{getCustomerCode(inv)}</td>
                                <td>{getCustomerName(inv)}</td>
                                <td style={{ maxWidth: "250px", fontSize: "11px" }}>
                                  {getItemDesc(inv)}
                                </td>
                                <td>{getInvoiceQty(inv)}</td>
                                <td>{getAssessableValue(inv).toFixed(2)}</td>
                                <td style={{ fontWeight: "600" }}>
                                  {getTotal(inv).toFixed(2)}
                                </td>
                                <td>{inv.user || inv.created_by || "sandeep"}</td>
                                <td>
                                  <a 
                                    href={`https://sellerp-backend.onrender.com/Sales/invoice-pdf/${inv.id}/`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    style={{ cursor: "pointer", color: "#0d6efd", textDecoration: "underline" }}
                                  >
                                    View
                                  </a>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="15" className="text-center">
                                {loading ? "Loading..." : "No invoices found"}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                    {totalPages > 1 && (
                      <div className="d-flex justify-content-center mt-3">
                        <ul className="pagination">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                          </li>
                          {[...Array(totalPages)].map((_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                              <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Footer Summary */}
                  <div className="InvoiceList-footer">
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                      <span>Total Record: <strong>{totalRecords}</strong></span>
                      <span>Qty: <strong>{totalQty.toFixed(2)}</strong></span>
                      <span>Assessable Value: <strong>{totalAssessableValue.toFixed(2)}</strong></span>
                      <span>CGST: <strong>{totalCGST.toFixed(2)}</strong></span>
                      <span>SGST: <strong>{totalSGST.toFixed(2)}</strong></span>
                      <span>IGST: <strong>{totalIGST.toFixed(2)}</strong></span>
                      <span>Total Amount: <strong>{totalAmount.toFixed(2)}</strong></span>
                      <span>
                        View Format: 
                        <select
                          className="form-control d-inline-block ms-1"
                          style={{ width: "80px", height: "25px", fontSize: "11px" }}
                        >
                          <option>Default</option>
                        </select>
                      </span>
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

export default InvoiceList;
