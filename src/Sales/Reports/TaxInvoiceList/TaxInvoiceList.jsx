
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./TaxInvoiceList.css";
import { Link, useNavigate } from 'react-router-dom';


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>


const TaxInvoiceList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://sellerp-backend.onrender.com/Sales/invoice/");
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();

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
    } catch (err) {
      console.error("Error fetching invoices:", err);
      setInvoices([]);
      setFilteredInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const getCustomerName = (inv) => {
    if (inv.bill_to) return inv.bill_to;
    if (inv.customer) return inv.customer;
    if (inv.items && inv.items.length > 0) return inv.items[0].customer || "";
    return "";
  };

  const getCustomerCode = (inv) => {
    return inv.cust_code || inv.customer_code || inv.destenation_code || "";
  };

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

  const getInvoiceQty = (inv) => {
    if (!inv.items || inv.items.length === 0) return 0;
    return inv.items.reduce((sum, item) => sum + parseFloat(item.inv_qty || item.po_qty || item.qty || 0), 0);
  };

  const getAssessableValue = (inv) => {
    if (inv.GSTdetails && inv.GSTdetails.length > 0) {
      return parseFloat(inv.GSTdetails[0].assessble_value || inv.GSTdetails[0].assessable_value || 0);
    }
    return 0;
  };

  const getTotal = (inv) => {
    const assessable = getAssessableValue(inv);
    const cgstAmt = inv.GSTdetails?.[0] ? parseFloat(inv.GSTdetails[0].cgst_amt || 0) : 0;
    const sgstAmt = inv.GSTdetails?.[0] ? parseFloat(inv.GSTdetails[0].sgst_amt || 0) : 0;
    const igstAmt = inv.GSTdetails?.[0] ? parseFloat(inv.GSTdetails[0].igst_amt || 0) : 0;
    return assessable + cgstAmt + sgstAmt + igstAmt;
  };

  const getInvoiceDate = (inv) => {
    return inv.invoice_Date || inv.date_of_removal || "";
  };

  const getFinancialYear = (inv) => {
    if (inv.financial_year) return inv.financial_year;
    const no = String(inv.invoice_no || "");
    if (no.length >= 4) {
      return no.substring(0, 2) + "-" + no.substring(2, 4);
    }
    return "";
  };
  const handleButtonClick = () => {
    navigate('/');
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

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="TaxInvoiceListMaster">
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
                <div className="TaxInvoiceList">
                  <div className="TaxInvoiceList-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> Tax Invoice List </h5>
                      </div>

                      <div className="col-md-8 text-end">
                        <Link type="button" className=" vndrbtn" to="/InvoiceEmailSend" onClick={handleButtonClick}>
                          Send Email
                        </Link>
                        <Link type="button" className=" vndrbtn" to="/VendarFile">
                          Vender File
                        </Link>
                        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '3px' }}>
                          <button
                            style={{ padding: '5px' }}
                            className="BOMRouting vndrbtn"
                            onClick={toggleDropdown}
                          >
                            Invoice - Report  ▼
                          </button>

                          {dropdownOpen && (
                            <ul
                              className="dropdown-menu show"
                              style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                zIndex: 1000,
                                display: 'block',
                                minWidth: '10rem',
                                padding: '0.5rem 0',
                                margin: '0.125rem 0 0',
                                fontSize: '12px',
                                color: '#212529',
                                textAlign: 'left',
                                listStyle: 'none',
                                backgroundColor: '#fff',
                                backgroundClip: 'padding-box',
                              }}
                            >
                              <li>
                                <Link className="vndrbtn dropdown-item"  to={"/ItemWiseReport"}>
                                  Item Wise Report
                                </Link>
                              </li>
                              <li>
                                <Link className="vndrbtn dropdown-item" to={"/InvoiceTransporterReport"}>
                                  Invoice Transporter Report
                                </Link>
                              </li>
                              <li>
                                <Link className="vndrbtn dropdown-item" to={"/SalesPurchaseFile"}>
                                  Sales Purchase File
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>
                        <Link type="button" className=" vndrbtn" to="/QuerySalesTax">
                          Sales Invoice - Query
                        </Link>
                      </div>

                    </div>
                  </div>

                  <div className="TaxInvoiceList-Main">
                    <div className="container-fluid">

                      <div className="row g-3 text-start">

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>To:</label>
                          <input type="date" className="form-control" />
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label htmlFor="">Plant:</label>
                          <select name="" className="form-control" style={{ marginTop: "-0px" }} id="">
                            <option value="">VISHWA S.I.</option>
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label htmlFor="">Series:</label>
                          <select name="" className="form-control" style={{ marginTop: "-0px" }} id="">
                            <option value="">All</option>
                            <option value="">GST Invoice</option>
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Customer Name: </label>
                          </div>
                          <input type="text" placeholder="Name" className="form-control" />
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Inv No: </label>
                          </div>
                          <input type="text" placeholder="No" className="form-control" />
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label htmlFor="">Cancel:</label>
                          <select name="" className="form-control" style={{ marginTop: "-0px" }} id="">
                            <option value="">All</option>
                            <option value="">Yes</option>
                            <option value="">No</option>
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label htmlFor="">User:</label>
                          <select name="" className="form-control" style={{ marginTop: "-0px" }} id="">
                            <option value="">All</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-1 align-items-center" style={{ marginTop: "39px" }}>
                          <button type="button" className=" vndrbtn">
                            Search
                          </button>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2 align-items-center" style={{ marginTop: "39px" }}>
                          <button type="button" className=" vndrbtn">
                            Search Option
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>

                  <div className="TaxInvoiceList-Main mt-2 table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Year</th>
                          <th scope="col">Plant</th>
                          <th scope="col">Inv No</th>
                          <th scope="col"> Date</th>
                          <th scope="col">Cust PO No </th>
                          <th scope="col">Type</th>
                          <th scope="col">Cust Code</th>
                          <th scope="col">Cust Name</th>
                          <th scope="col">Item Qty | Desc</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Ass Amt</th>
                          <th scope="col">Total </th>
                          <th scope="col">User </th>
                          <th scope="col">View</th>

                        </tr>
                      </thead>

                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="15" className="text-center">Loading invoices...</td>
                          </tr>
                        ) : filteredInvoices.length > 0 ? (
                          filteredInvoices.map((inv, index) => (
                            <tr key={inv.id || index}>
                              <td>{index + 1}</td>
                              <td>{getFinancialYear(inv)}</td>
                              <td>{inv.plant || inv.items?.[0]?.plant || "SHARP"}</td>
                              <td style={{ fontWeight: "600" }}>{inv.invoice_no || ""}</td>
                              <td>{getInvoiceDate(inv)}</td>
                              <td>{inv.items?.[0]?.po_no || inv.cust_po || inv.d_c_no || ""}</td>
                              <td>{inv.series_type || inv.invoice_type || "GST"}</td>
                              <td>{getCustomerCode(inv)}</td>
                              <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", wordBreak: "break-word" }}>{getCustomerName(inv)}</td>
                              <td style={{ maxWidth: "120px", fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{getItemDesc(inv)}</td>
                              <td>{getInvoiceQty(inv)}</td>
                              <td>{getAssessableValue(inv).toFixed(2)}</td>
                              <td style={{ fontWeight: "600" }}>{getTotal(inv).toFixed(2)}</td>
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
                            <td colSpan="15" className="text-center">No invoices found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default TaxInvoiceList