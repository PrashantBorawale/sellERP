import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import "./CreditNoteList.css";
import * as XLSX from "xlsx";
import { FaFileExcel } from "react-icons/fa";

const CreditNoteList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [creditNotes, setCreditNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreditNotes = async () => {
      try {
        const response = await fetch("https://sellerp-backend.onrender.com/Sales/credit-note/");
        const data = await response.json();
        setCreditNotes(data);
      } catch (error) {
        console.error("Error fetching credit notes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCreditNotes();
  }, []);

  const totalAmount = creditNotes.reduce((sum, note) => sum + (parseFloat(note.grand_total) || 0), 0).toFixed(2);

  const navigate = useNavigate();  
  
  const handleButtonClick = () => {
    navigate('/CreditNotie'); 
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getTaxAmount = (row) => {
    return (Number(row.cgst_amt) || 0) + (Number(row.sgst_amt) || 0) + (Number(row.igst_amt) || 0) + (Number(row.utgst_amt) || 0);
  };

  const getGrandTotal = (row) => {
    return Number(row.grand_total) || 0;
  };

  const handleExportExcel = () => {
    if (creditNotes.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = creditNotes.map((row, index) => {
      const taxAmount = getTaxAmount(row);
      const grandTotal = getGrandTotal(row);
      return {
        "Sr. No.": index + 1,
        "Type": row.notetype || "Sales CN",
        "Cert. No": row.credit_note_no || "",
        "Date": formatDate(row.credit_note_date),
        "Name of Party": row.party_name || "",
        "Tax Amount": taxAmount,
        "Amount": grandTotal,
        "User": "admin"
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Credit Notes");

    // Adjust column widths
    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Credit_Note_List.xlsx");
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
    <div className="CreditNoteListMaster">
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
                <div className="CreditNoteList mt-2">
                  <div className="CreditNoteList-header mb-3 text-start">
                    <div className="d-flex align-items-center justify-content-between flex-nowrap overflow-auto">
                      <div className="flex-shrink-0 me-3">
                        <h5 className="header-title mb-0 text-nowrap" style={{ color: '#0d6efd' }}>Credit Note List</h5>
                      </div>
                      <div className="d-flex text-nowrap flex-shrink-0 gap-2">
                        {/* Export Excel Button Added Here */}
                        <button type="button" className="btn btn-outline-success d-flex align-items-center gap-1" style={{fontSize: '12px'}} onClick={handleExportExcel}>
                          <FaFileExcel /> EXCEL
                        </button>
                        <button type="button" className="btn btn-outline-secondary" style={{fontSize: '12px'}} onClick={handleButtonClick}>
                          Credit Note - Query
                        </button>
                      </div>
                    </div>
                  </div>

                    <div className="CreditNoteList-main">
                    
                      <div className="d-flex align-items-center flex-wrap py-2" style={{ overflow: "visible" }}>
                          <div className="d-flex align-items-center me-3 mb-2 flex-shrink-0">
                             <input type="checkbox" id="fromDateCheck" defaultChecked style={{ width: "16px", height: "16px", cursor: "pointer", margin: "0", marginRight: "8px" }} />
                             <label htmlFor="fromDateCheck" className="mb-0 me-2 text-nowrap">From Date:</label>
                             <input type="date" className="form-control" style={{ width: "auto" }} />
                          </div>
                          <div className="d-flex align-items-center me-3 mb-2 flex-shrink-0">
                             <label htmlFor="" className="mb-0 me-2 text-nowrap">To Date:</label> 
                             <input type="date" className="form-control" style={{ width: "auto" }} />
                          </div>
                          <div className="d-flex align-items-center me-3 mb-2 flex-shrink-0">
                             <label htmlFor="" className="mb-0 me-2 text-nowrap">Plant:</label>
                             <select className="form-control" style={{ width: "auto" }}>
                                <option value="">SHARP</option>
                             </select>         
                          </div>
                          <div className="d-flex align-items-center me-3 mb-2 flex-shrink-0">
                             <input type="checkbox" id="partyNameCheck" style={{ width: "16px", height: "16px", cursor: "pointer", margin: "0", marginRight: "8px" }} />
                             <label htmlFor="partyNameCheck" className="mb-0 me-2 text-nowrap">Party Name:</label>
                             <input type="text" className="form-control" placeholder="Party Name..." style={{ width: "auto" }} />
                          </div>
                          <div className="d-flex align-items-center me-3 mb-2 flex-shrink-0">
                             <input type="checkbox" id="creditNoteNoCheck" style={{ width: "16px", height: "16px", cursor: "pointer", margin: "0", marginRight: "8px" }} />
                             <label htmlFor="creditNoteNoCheck" className="mb-0 me-2 text-nowrap">Credit Note No:</label>
                             <input type="text" className="form-control" placeholder="" style={{ width: "130px" }} />
                          </div>
                          <div className="d-flex align-items-center mb-2 flex-shrink-0">
                             <button className="btn">Search</button>
                          </div>
                      </div>

                     <div className="table-responsive mt-3">
                                  <table className="table table-bordered table-hover mb-0" style={{ fontSize: "12px", whiteSpace: "nowrap" }}>
                                        <thead style={{ backgroundColor: '#0dcaf0', color: 'white' }}>
                                            <tr style={{ textAlign: "center" }}>
                                            <th style={{ padding: "6px" }}>Sr.</th>
                                            <th style={{ padding: "6px" }}>Year </th>
                                            <th style={{ padding: "6px" }}>Plant</th>
                                            <th style={{ padding: "6px" }}>Note No</th>
                                            <th style={{ padding: "6px" }}>Note Date </th>
                                            <th style={{ padding: "6px" }}>Code </th>
                                            <th style={{ padding: "6px" }}>Customer/Supplier Name</th>
                                            <th style={{ padding: "6px" }}>Amount</th>
                                            <th style={{ padding: "6px" }}>User</th>
                                            <th style={{ padding: "6px" }}>IRN</th>
                                            <th style={{ padding: "6px" }}>Cancel</th>
                                            <th style={{ padding: "6px" }}>Info</th>
                                            <th style={{ padding: "6px" }}>View</th>
                                            <th style={{ padding: "6px" }}>Edit</th>
                                            <th style={{ padding: "6px" }}>Del</th>
                                            <th style={{ padding: "6px" }}>All <input type="checkbox" className="ms-1" style={{ width: '12px', height: '12px', margin: 0 }} /></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr>
                                                    <td colSpan="16" className="text-center py-3">Loading...</td>
                                                </tr>
                                            ) : creditNotes.length === 0 ? (
                                                <tr>
                                                    <td colSpan="16" className="text-center py-3">No Data Found</td>
                                                </tr>
                                            ) : (
                                                creditNotes.map((note, idx) => (
                                                    <tr key={note.id} style={{ textAlign: "center" }}>
                                                        <td style={{ padding: "6px" }}>{idx + 1}</td>
                                                        <td style={{ padding: "6px" }}>{note.series || '-'}</td>
                                                        <td style={{ padding: "6px" }}>{note.plant || '-'}</td>
                                                        <td style={{ padding: "6px" }}>{note.credit_note_no}</td>
                                                        <td style={{ padding: "6px" }}>{note.credit_note_date}</td>
                                                        <td style={{ padding: "6px" }}>{note.supp_Crdr_no || '-'}</td>
                                                        <td style={{ padding: "6px" }}>{note.party_name}</td>
                                                        <td style={{ padding: "6px" }}>{note.grand_total}</td>
                                                        <td style={{ padding: "6px" }}>admin</td>
                                                        <td style={{ padding: "6px" }}>{note.for_e_invoice ? 'Yes' : ''}</td>
                                                        <td style={{ padding: "6px" }}><span className="badge bg-primary px-1">N</span></td>
                                                        <td style={{ padding: "6px" }}><i className="fa fa-info-circle text-info" style={{ cursor: "pointer" }}></i></td>
                                                        <td style={{ padding: "6px" }}>
                                                            <i 
                                                              className="fa fa-eye text-primary" 
                                                              style={{ cursor: "pointer" }}
                                                              onClick={() => window.open(`https://sellerp-backend.onrender.com/Sales/credit-note-pdf/${note.id}/`, "_blank")}
                                                            ></i>
                                                        </td>
                                                        <td style={{ padding: "6px" }}><i className="fa fa-edit text-success" style={{ cursor: 'pointer' }}></i></td>
                                                        <td style={{ padding: "6px" }}><i className="fa fa-trash text-danger" style={{ cursor: 'pointer' }}></i></td>
                                                        <td style={{ padding: "6px" }}><input type="checkbox" style={{ width: '12px', height: '12px', margin: 0 }} /></td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                 </table>
                     </div>
                                  <div className="d-flex justify-content-between align-items-center mt-3 p-2 bg-light border rounded">
                                        <div className="fw-bold">Total Record : {creditNotes.length < 10 ? `0${creditNotes.length}` : creditNotes.length}</div>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="fw-bold">Total Amount : {totalAmount}</div>
                                            <button className="btn btn-secondary btn-sm">Bulk Print</button>
                                            <button className="btn btn-danger btn-sm">Delete Selected</button>
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

export default CreditNoteList;