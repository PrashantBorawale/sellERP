import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./CustomerSalesOrderList.css";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const defaultData = [
  { sr: 1, year: "26-27", plant: "VISHWA S.I.", soNo: "SOD262700077", soDate: "16/09/2026", custPoNo: "1100044257", custPoDt: "16/09/2026", type: "D. GST Close", code: "027", customerName: "ENDURANCE TECHNOLOGIES LTD (DISC BREAK DIVISION E-71)", amount: "110,000.00", poStatus: "Partial", auth: true, user: "NPD" },
  { sr: 2, year: "26-27", plant: "VISHWA S.I.", soNo: "SOD262700076", soDate: "16/09/2026", custPoNo: "1100044268", custPoDt: "16/09/2026", type: "D. GST Close", code: "311", customerName: "ENDURANCE TECHNOLOGIES LTD ( R & D )", amount: "1,194.00", poStatus: "Completed", auth: true, user: "NPD" },
  { sr: 3, year: "26-27", plant: "VISHWA S.I.", soNo: "SOD262700075", soDate: "15/09/2026", custPoNo: "1100044252", custPoDt: "14/09/2026", type: "D. GST Close", code: "C0005", customerName: "ENDURANCE TECHNOLOGIES LTD (I)", amount: "25,840.15", poStatus: "Partial", auth: true, user: "NPD" },
  { sr: 4, year: "26-27", plant: "VISHWA S.I.", soNo: "SOD262700074", soDate: "11/09/2026", custPoNo: "1100044231", custPoDt: "11/09/2026", type: "D. GST Close", code: "C0005", customerName: "ENDURANCE TECHNOLOGIES LTD (I)", amount: "125,600.40", poStatus: "New", auth: true, user: "NPD" },
  { sr: 5, year: "26-27", plant: "VISHWA S.I.", soNo: "SOD262700073", soDate: "10/09/2026", custPoNo: "1100044198", custPoDt: "09/09/2026", type: "D. GST Close", code: "17", customerName: "ENDURANCE TECHNOLOGIES LTD (N)", amount: "37,760.25", poStatus: "Partial", auth: true, user: "NPD" },
  { sr: 6, year: "26-27", plant: "VISHWA S.I.", soNo: "SOD262700072", soDate: "09/09/2026", custPoNo: "1100043962", custPoDt: "19/08/2026", type: "D. GST Close", code: "311", customerName: "ENDURANCE TECHNOLOGIES LTD ( R & D )", amount: "8,574.01", poStatus: "Partial", auth: true, user: "NPD" },
  { sr: 7, year: "26-27", plant: "VISHWA S.I.", soNo: "SOD262700071", soDate: "07/09/2026", custPoNo: "1100044091", custPoDt: "01/09/2026", type: "D. GST Close", code: "C0005", customerName: "ENDURANCE TECHNOLOGIES LTD (I)", amount: "60,709.52", poStatus: "Partial", auth: true, user: "NPD" },
  { sr: 8, year: "26-27", plant: "VISHWA S.I.", soNo: "SOD262700070", soDate: "05/09/2026", custPoNo: "1100044101", custPoDt: "02/09/2026", type: "D. GST Close", code: "C0005", customerName: "ENDURANCE TECHNOLOGIES LTD (I)", amount: "13,930.00", poStatus: "Completed", auth: true, user: "NPD" },
  { sr: 9, year: "26-27", plant: "VISHWA S.I.", soNo: "SOD262700069", soDate: "02/09/2026", custPoNo: "1900009890", custPoDt: "20/08/2026", type: "D. GST Open", code: "027", customerName: "ENDURANCE TECHNOLOGIES LTD (DISC BREAK DIVISION E-71)", amount: "828.79", poStatus: "New", auth: true, user: "NPD" },
  { sr: 10, year: "26-27", plant: "VISHWA S.I.", soNo: "SOD262700068", soDate: "02/09/2026", custPoNo: "1100043945", custPoDt: "19/08/2026", type: "D. GST Close", code: "C0005", customerName: "ENDURANCE TECHNOLOGIES LTD (I)", amount: "31,422.10", poStatus: "Partial", auth: true, user: "NPD" },
  { sr: 11, year: "26-27", plant: "VISHWA S.I.", soNo: "SOD262700067", soDate: "02/09/2026", custPoNo: "SEPL 26-27/128", custPoDt: "02/09/2026", type: "D. GST Close", code: "0032", customerName: "SAPTAGIRI ENGINEERING PVT LTD", amount: "44,290.00", poStatus: "Partial", auth: true, user: "NPD" },
  { sr: 12, year: "26-27", plant: "VISHWA S.I.", soNo: "SOD262700066", soDate: "01/09/2026", custPoNo: "PCPL/26-27/112", custPoDt: "03/08/2026", type: "D. GST Close", code: "00039", customerName: "PRANEEL CASTING PVT LTD", amount: "37,760.00", poStatus: "Completed", auth: true, user: "NPD" }
];

const CustomerSalesOrderList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  // Sorting by highest ID (sr) at top
  const sortedData = [...defaultData].sort((a, b) => b.sr - a.sr);
  
  // Pagination calculations
  const totalRecords = sortedData.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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

  return (
    <div className="CustomerSalesOrderList">
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
                      <div className="d-flex gap-2">
                        <button className="vndrbtn" style={{textAlign: 'center'}}>🔍 Validity Date</button>
                        <button className="vndrbtn" style={{textAlign: 'center'}}>📊 CustomerPO: Report</button>
                        <button className="vndrbtn" style={{textAlign: 'center'}}>⚙ Sales Order Query</button>
                      </div>
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
                      <input type="date" className="form-control form-control-sm shadow-none" defaultValue={monthAgoStr} style={{ fontSize: '0.8rem', padding: '2px 6px', height: '28px' }} />
                    </div>

                    {/* To Date */}
                    <div className="d-flex flex-column align-items-start flex-shrink-0 gap-1">
                      <label className="fw-bold text-secondary" style={{fontSize: '0.8rem', whiteSpace: 'nowrap'}}>To Date</label>
                      <input type="date" className="form-control form-control-sm shadow-none" defaultValue={todayStr} style={{ fontSize: '0.8rem', padding: '2px 6px', height: '28px' }} />
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
                      <label className="fw-bold text-secondary d-flex align-items-center gap-1" style={{fontSize: '0.8rem', whiteSpace: 'nowrap'}}><input type="checkbox" className="form-check-input m-0 shadow-none" style={{ cursor: 'pointer', width: '14px', height: '14px' }} /> Cust Name</label>
                      <input type="text" className="form-control form-control-sm shadow-none" placeholder="Name..." style={{ fontSize: '0.8rem', padding: '2px 6px', height: '28px', width: '110px' }} />
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
                      <button className="vndrbtn px-2" style={{ fontSize: '0.8rem', height: '28px', display: 'flex', alignItems: 'center' }}><i className="fas fa-search me-1"></i> Search</button>
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
                          <th style={{textAlign: 'center'}}>Po Status</th>
                          <th style={{textAlign: 'center'}}>Auth</th>
                          <th style={{textAlign: 'center'}}>User</th>
                          <th style={{textAlign: 'center'}}>Edit</th>
                          <th style={{textAlign: 'center'}}>View</th>
                          <th style={{textAlign: 'center'}}>All <input type="checkbox" /></th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRows.map((row, index) => (
                          <tr key={index}>
                            <td style={{textAlign: 'center'}}>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                            <td style={{textAlign: 'center'}}>{row.year}</td>
                            <td style={{textAlign: 'center'}}>{row.plant}</td>
                            <td style={{textAlign: 'center'}}>{row.soNo}</td>
                            <td style={{textAlign: 'center'}}>{row.soDate}</td>
                            <td style={{textAlign: 'center'}}>{row.custPoNo}</td>
                            <td style={{textAlign: 'center'}}>{row.custPoDt}</td>
                            <td style={{textAlign: 'center'}}>{row.type}</td>
                            <td style={{textAlign: 'center'}}>{row.code}</td>
                            <td style={{textAlign: 'center'}}>{row.customerName}</td>
                            <td style={{textAlign: 'center'}}>{row.amount}</td>
                            <td style={{textAlign: 'center'}}>
                              <div className="d-flex align-items-center gap-1 justify-content-center">
                                <span style={{
                                  color: row.poStatus === 'Completed' ? 'green' : (row.poStatus === 'New' ? 'orange' : 'teal'),
                                  border: '1px solid #ccc',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  textAlign: 'center'
                                }}>
                                  {row.poStatus === 'Completed' ? '✔' : (row.poStatus === 'New' ? '...' : '🕒')} {row.poStatus}
                                </span>
                                <button className="btn btn-sm btn-light border p-0 px-1"><FaTrashAlt style={{color: 'red'}} size={12} /></button>
                              </div>
                            </td>
                            <td style={{textAlign: 'center'}}>
                              {row.auth && <span style={{backgroundColor: 'green', color: 'white', padding: '1px 4px', borderRadius: '2px'}}>✔</span>}
                            </td>
                            <td style={{textAlign: 'center'}}>{row.user}</td>
                            <td style={{textAlign: 'center'}}><FaEdit style={{color: 'black', cursor: 'pointer'}} size={16} /></td>
                            <td style={{textAlign: 'center'}}><FaEye style={{color: 'black', cursor: 'pointer'}} size={16} /></td>
                            <td style={{textAlign: 'center'}}><input type="checkbox" /></td>
                          </tr>
                        ))}
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
                      <div className="d-flex align-items-center gap-2">
                        <span style={{textAlign: 'center'}}>PO Status</span>
                        <select style={{height: '24px', fontSize: '12px', textAlign: 'center'}}><option>NEW</option></select>
                        <button className="vndrbtn" style={{padding: '2px 10px', textAlign: 'center'}}>Update</button>
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

export default CustomerSalesOrderList;
