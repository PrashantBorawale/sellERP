import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./CustomerSalesOrderList.css";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const CustomerSalesOrderList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate("/NewSalesOrder", { state: { id } });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Sales Order?")) {
      try {
        const response = await fetch(`https://sellerp-backend.onrender.com/Sales/newsalesorder/${id}/`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success("Sales Order deleted successfully");
          fetchData(); // refresh the list
        } else {
          toast.error("Failed to delete Sales Order");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while deleting");
      }
    }
  };

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  const today = new Date();
  const todayStr = formatDate(today);
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  const monthAgoStr = formatDate(monthAgo);

  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(monthAgoStr);
  const [toDate, setToDate] = useState(todayStr);
  const [custName, setCustName] = useState("");
  const [isCustNameChecked, setIsCustNameChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const loggedInUser = localStorage.getItem("username") || "Admin";

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = "https://sellerp-backend.onrender.com/Sales/newsalesorder/?";
      const params = new URLSearchParams();
      
      if (fromDate) params.append("from_date", fromDate);
      if (toDate) params.append("to_date", toDate);
      
      if (isCustNameChecked && custName.trim() !== "") {
        params.append("customer", custName.trim());
      }
      
      const response = await fetch(url + params.toString());
      if (response.ok) {
        const result = await response.json();
        const sorted = result.sort((a, b) => b.id - a.id);
        setData(sorted);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fromDate, toDate]); // Fetch on mount and when dates change initially? No, user says "as the user do any and click on search button". We'll just fetch on mount.

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };
  
  // Pagination calculations
  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="CustomerSalesOrderList">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="CustomerSalesOrderList-Main">
                  
                  <div className="CustomerSalesOrderList-header mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title mb-0" style={{textAlign: 'center'}}>Customer Sales Order List</h5>
                    </div>
                  </div>

                  <div className="filter-section mb-3 d-flex flex-wrap align-items-end gap-2 w-100" style={{ paddingBottom: '4px' }}>
                    {/* Filter Type */}
                    <div className="d-flex flex-column align-items-start">
                      <div className="d-flex flex-column" style={{ minHeight: '32px', justifyContent: 'center' }}>
                        <div className="form-check mb-0 d-flex align-items-center gap-1">
                          <input className="form-check-input shadow-none m-0" type="radio" name="dateType" id="dateType1" defaultChecked style={{ cursor: 'pointer', width: '14px', height: '14px' }} />
                          <label className="form-check-label fw-bold text-secondary" htmlFor="dateType1" style={{ fontSize: '0.8rem', cursor: 'pointer', lineHeight: '1.2' }}>SO- Date</label>
                        </div>
                        <div className="form-check mb-0 d-flex align-items-center gap-1 mt-1">
                          <input className="form-check-input shadow-none m-0" type="radio" name="dateType" id="dateType2" style={{ cursor: 'pointer', width: '14px', height: '14px' }} />
                          <label className="form-check-label fw-bold text-secondary" htmlFor="dateType2" style={{ fontSize: '0.8rem', cursor: 'pointer', lineHeight: '1.2' }}>Cust PO</label>
                        </div>
                      </div>
                    </div>

                    {/* From Date */}
                    <div className="d-flex flex-column align-items-start flex-shrink-0 gap-1">
                      <label className="fw-bold text-secondary" style={{fontSize: '0.8rem', whiteSpace: 'nowrap'}}>From Date</label>
                      <input type="date" className="form-control form-control-sm shadow-none" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ fontSize: '0.8rem', padding: '2px 6px', height: '28px' }} />
                    </div>

                    {/* To Date */}
                    <div className="d-flex flex-column align-items-start flex-shrink-0 gap-1">
                      <label className="fw-bold text-secondary" style={{fontSize: '0.8rem', whiteSpace: 'nowrap'}}>To Date</label>
                      <input type="date" className="form-control form-control-sm shadow-none" value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ fontSize: '0.8rem', padding: '2px 6px', height: '28px' }} />
                    </div>
                    
                    <div className="d-flex flex-column align-items-start flex-shrink-0 gap-1">
                      <label className="fw-bold text-secondary" style={{fontSize: '0.8rem', whiteSpace: 'nowrap'}}>Plant:</label>
                      <select className="form-select form-select-sm shadow-none" style={{ fontSize: '0.8rem', padding: '2px 20px 2px 6px', height: '28px', minWidth: '85px' }}><option>VISHWA S.I.</option></select>
                    </div>
                    
                    <div className="d-flex flex-column align-items-start flex-shrink-0 gap-1">
                      <label className="fw-bold text-secondary" style={{fontSize: '0.8rem', whiteSpace: 'nowrap'}}>Series:</label>
                      <select className="form-select form-select-sm shadow-none" style={{ fontSize: '0.8rem', padding: '2px 20px 2px 6px', height: '28px', minWidth: '80px' }}><option>ALL</option></select>
                    </div>
                    
                    <div className="d-flex flex-column align-items-start flex-shrink-0 gap-1">
                      <label className="fw-bold text-secondary" style={{fontSize: '0.8rem', whiteSpace: 'nowrap'}}>Status:</label>
                      <select className="form-select form-select-sm shadow-none" style={{ fontSize: '0.8rem', padding: '2px 20px 2px 6px', height: '28px', minWidth: '80px' }}><option>ALL</option></select>
                    </div>
                    
                    <div className="d-flex flex-column align-items-start flex-shrink-0 gap-1">
                      <label className="fw-bold text-secondary" style={{fontSize: '0.8rem', whiteSpace: 'nowrap'}}>Type:</label>
                      <select className="form-select form-select-sm shadow-none" style={{ fontSize: '0.8rem', padding: '2px 20px 2px 6px', height: '28px', minWidth: '95px' }}><option>Domestic</option></select>
                    </div>
                    
                    <div className="d-flex flex-column align-items-start flex-shrink-0 gap-1">
                      <label className="fw-bold text-secondary" style={{fontSize: '0.8rem', whiteSpace: 'nowrap'}}>Order:</label>
                      <select className="form-select form-select-sm shadow-none" style={{ fontSize: '0.8rem', padding: '2px 20px 2px 6px', height: '28px', minWidth: '80px' }}><option>ALL</option></select>
                    </div>
                    
                    <div className="d-flex flex-column align-items-start flex-shrink-0 gap-1">
                      <label className="fw-bold text-secondary" style={{fontSize: '0.8rem', whiteSpace: 'nowrap'}}>Op/Cl:</label>
                      <select className="form-select form-select-sm shadow-none" style={{ fontSize: '0.8rem', padding: '2px 20px 2px 6px', height: '28px', minWidth: '80px' }}><option>ALL</option></select>
                    </div>

                    <div className="d-flex flex-column align-items-start flex-shrink-0 gap-1">
                      <label className="fw-bold text-secondary d-flex align-items-center gap-1" style={{fontSize: '0.8rem', whiteSpace: 'nowrap'}}>
                        <input type="checkbox" className="form-check-input m-0 shadow-none" checked={isCustNameChecked} onChange={(e) => setIsCustNameChecked(e.target.checked)} style={{ cursor: 'pointer', width: '14px', height: '14px' }} /> Cust Name
                      </label>
                      <input type="text" className="form-control form-control-sm shadow-none" value={custName} onChange={(e) => setCustName(e.target.value)} disabled={!isCustNameChecked} placeholder="Name..." style={{ fontSize: '0.8rem', padding: '2px 6px', height: '28px', width: '110px' }} />
                    </div>

                    <div className="d-flex flex-column align-items-start flex-shrink-0 gap-1">
                      <label className="fw-bold text-secondary" style={{fontSize: '0.8rem', whiteSpace: 'nowrap'}}>User:</label>
                      <select className="form-select form-select-sm shadow-none" style={{ fontSize: '0.8rem', padding: '2px 20px 2px 6px', height: '28px', minWidth: '85px' }}><option>ALL User</option></select>
                    </div>

                    <div className="d-flex flex-column align-items-start flex-shrink-0 gap-1">
                      <label className="fw-bold text-secondary d-flex align-items-center gap-1" style={{fontSize: '0.8rem', whiteSpace: 'nowrap'}}><input type="checkbox" className="form-check-input m-0 shadow-none" style={{ cursor: 'pointer', width: '14px', height: '14px' }} /> SO No</label>
                      <input type="text" className="form-control form-control-sm shadow-none" style={{ fontSize: '0.8rem', padding: '2px 6px', height: '28px', width: '80px' }} />
                    </div>

                    <div className="d-flex align-items-end gap-2 flex-shrink-0 ms-auto">
                      <button onClick={fetchData} disabled={loading} className="vndrbtn px-2" style={{ fontSize: '0.8rem', height: '28px', display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-search me-1"></i> {loading ? "Searching..." : "Search"}
                      </button>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th style={{textAlign: 'center'}}>Sr.</th>
                          <th style={{textAlign: 'center'}}>Year</th>
                          <th style={{textAlign: 'center'}}>Plant</th>
                          <th style={{textAlign: 'center'}}>SO No</th>
                          <th style={{textAlign: 'center'}}>SO Date</th>
                          <th style={{textAlign: 'center'}}>Cust Po No</th>
                          <th style={{textAlign: 'center'}}>Cust Po Dt.</th>
                          <th style={{textAlign: 'center'}}>Type</th>
                          <th style={{textAlign: 'center'}}>Code</th>
                          <th style={{minWidth: '200px', textAlign: 'center'}}>Customer Name</th>
                          <th style={{textAlign: 'center'}}>Amount</th>
                          <th style={{textAlign: 'center'}}>Auth</th>
                          <th style={{textAlign: 'center'}}>User</th>
                          <th style={{textAlign: 'center'}}>PDF</th>
                          <th style={{textAlign: 'center'}}>Edit</th>
                          <th style={{textAlign: 'center'}}>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRows.map((row, index) => {
                          const year = row.so_date ? new Date(row.so_date).getFullYear().toString().slice(-2) : "-";
                          const nextYear = year !== "-" ? parseInt(year) + 1 : "-";
                          const yearStr = year !== "-" ? `${year}-${nextYear}` : "-";
                          
                          const totalAmount = row.item && Array.isArray(row.item) ? row.item.reduce((sum, it) => sum + parseFloat(it.gr_total || 0), 0) : 0;

                          let customerName = row.customer || "-";
                          let customerCode = "-";
                          if (customerName !== "-" && customerName.includes("|")) {
                            const parts = customerName.split("|");
                            customerName = parts[0].trim();
                            customerCode = parts[1].trim();
                          } else {
                            customerCode = row.ship_to_add_code || "-";
                          }

                          return (
                            <tr key={index}>
                              <td style={{textAlign: 'center'}}>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                              <td style={{textAlign: 'center'}}>{yearStr}</td>
                              <td style={{textAlign: 'center'}}>{row.plant || "-"}</td>
                              <td style={{textAlign: 'center'}}>{row.so_no || "-"}</td>
                              <td style={{textAlign: 'center'}}>{row.so_date || "-"}</td>
                              <td style={{textAlign: 'center'}}>{row.cust_po || "-"}</td>
                              <td style={{textAlign: 'center'}}>{row.cust_date || "-"}</td>
                              <td style={{textAlign: 'center'}}>{row.order_type || "-"}</td>
                              <td style={{textAlign: 'center'}}>{customerCode}</td>
                              <td style={{textAlign: 'center'}}>{customerName}</td>
                              <td style={{textAlign: 'center'}}>{totalAmount.toFixed(2)}</td>
                              <td style={{textAlign: 'center'}}>
                                <span style={{backgroundColor: 'green', color: 'white', padding: '1px 4px', borderRadius: '2px'}}>✔</span>
                              </td>
                              <td style={{textAlign: 'center'}}>{loggedInUser}</td>
                              <td style={{textAlign: 'center'}}><FaEye style={{color: 'blue', cursor: 'pointer'}} size={16} onClick={() => window.open(`https://sellerp-backend.onrender.com/Sales/sales-order/pdf/${row.id}/`, "_blank")} /></td>
                              <td style={{textAlign: 'center'}}><FaEdit style={{color: 'black', cursor: 'pointer'}} size={16} onClick={() => handleEdit(row.id)} /></td>
                              <td style={{textAlign: 'center'}}><FaTrashAlt style={{color: 'red', cursor: 'pointer'}} size={16} onClick={() => handleDelete(row.id)} /></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="footer-section">
                    <div>
                      <span className="border p-1 px-2 bg-light text-primary fw-bold me-2">{currentPage}</span>
                      <span className="text-primary" style={{cursor: 'pointer', marginRight: '10px'}} onClick={handlePrev}>Previous</span>
                      <span className="text-primary" style={{cursor: 'pointer'}} onClick={handleNext}>Next</span>
                    </div>
                  </div>
                  
                  <div className="footer-section" style={{backgroundColor: '#e0e7ff', padding: '5px 15px', border: '1px solid #93c5fd'}}>
                    <div style={{textAlign: 'center'}}>Total Records : <strong>{totalRecords}</strong></div>
                    <div className="d-flex gap-4 align-items-center">
                      <div style={{textAlign: 'center'}}>Qty : <strong>19,582.00</strong></div>
                      <div style={{textAlign: 'center'}}>Amount : <strong>505,278.12</strong></div>
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

export default CustomerSalesOrderList;
