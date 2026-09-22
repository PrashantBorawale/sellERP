
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./CreditListNote.css";
import { useNavigate } from 'react-router-dom';


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>


const CreditListNote  = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
      const navigate = useNavigate();  
      
        const handleButtonClick = () => {
          navigate('/'); 
        };
  const [creditNotes, setCreditNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCreditNotes = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://sellerp-backend.onrender.com/Sales/credit-note/");
        let data = await response.json();
        
        let fetchedList = [];
        if (Array.isArray(data)) {
          fetchedList = data;
        } else if (data.data && Array.isArray(data.data)) {
          fetchedList = data.data;
        }
        
        // Sort highest ID at the top
        fetchedList.sort((a, b) => {
          const idA = parseInt(a.id, 10) || 0;
          const idB = parseInt(b.id, 10) || 0;
          return idB - idA;
        });
        
        setCreditNotes(fetchedList);
      } catch (error) {
        console.error("Error fetching credit notes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCreditNotes();
  }, []);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(creditNotes.length / itemsPerPage);
  const currentCreditNotes = creditNotes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalAmount = currentCreditNotes.reduce((sum, note) => sum + (parseFloat(note.grand_total) || 0), 0).toFixed(2);

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
    <div className="CreditListNoteMaster">
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
              <div className="CreditListNote">
                <div className="CreditListNote-header mb-2 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title"> Credit Note List </h5>
                    </div>

                    <div className="col-md-8 text-end">
                        
                        <button type="button" className=" vndrbtn" to="#/" onClick={handleButtonClick}>
                            Credit Note - Query
                        </button> 
                    </div>

                  </div>
                </div>
               
                <div className="CreditListNote-Main">
                    <div className="container-fluid">
                      
                        <div className="row g-3 text-start">  

                       <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>To:</label>
                          <input type="date" className="form-control" />
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-1">
                        <label htmlFor="">Plant:</label>
                        <select name="" className="form-control" style={{marginTop:"-0px"}} id="">
                            <option value="">VISHWA S.I.</option>
                        </select>
                      </div>
                  
                      <div className="col-sm-6 col-md-2 col-lg-2">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Party Name: </label>
                        </div>
                        <input type="text"  placeholder="Name" className="form-control"/>
                      </div>
                        
                       <div className="col-6 col-md-2 align-items-center mt-3">
                          <button type="button" className=" vndrbtn">
                            Search
                          </button>
                        </div>

                        </div>

                    </div>
                  </div>

                  <div className="table-responsive mt-5">
                                  <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th>Sr.</th>
                                            <th>Year </th>
                                            <th>Plant</th>
                                            <th>Note No</th>
                                            <th>Note Date </th>
                                            <th>Code </th>
                                            <th>Cust/Supp. Name</th>
                                            <th>Amount</th>
                                            <th>User</th>
                                            <th>IRN</th>
                                            <th>Cancel</th>
                                            <th>View</th>
                                            <th>Edit</th>
                                            <th>Del</th>
                                            <th>All</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr>
                                                    <td colSpan="15" className="text-center py-3">Loading...</td>
                                                </tr>
                                            ) : currentCreditNotes.length === 0 ? (
                                                <tr>
                                                    <td colSpan="15" className="text-center py-3">No Data Found</td>
                                                </tr>
                                            ) : (
                                                currentCreditNotes.map((note, idx) => (
                                                    <tr key={note.id || idx} style={{ textAlign: "center" }}>
                                                        <td style={{ padding: "6px" }}>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                                        <td style={{ padding: "6px" }}>{note.series || '-'}</td>
                                                        <td style={{ padding: "6px" }}>{note.plant || '-'}</td>
                                                        <td style={{ padding: "6px" }}>{note.credit_note_no}</td>
                                                        <td style={{ padding: "6px" }}>{note.credit_note_date}</td>
                                                        <td style={{ padding: "6px" }}>{note.supp_Crdr_no || '-'}</td>
                                                        <td style={{ padding: "6px" }}>{note.party_name}</td>
                                                        <td style={{ padding: "6px" }}>{note.grand_total}</td>
                                                        <td style={{ padding: "6px" }}>{note.user || note.created_by || localStorage.getItem("username") || "User"}</td>
                                                        <td style={{ padding: "6px" }}>{note.for_e_invoice ? 'Yes' : ''}</td>
                                                        <td style={{ padding: "6px" }}><span className="badge bg-primary px-1">N</span></td>
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
                    {totalPages > 1 && (
                      <div className="d-flex justify-content-end align-items-center mt-3 mb-2 px-2" style={{ backgroundColor: '#fff' }}>
                        <span className="me-3" style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>
                          Page {currentPage} of {totalPages}
                        </span>
                        <div className="btn-group shadow-sm">
                          <button
                            className="btn btn-light border"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            style={{ padding: "4px 12px", fontSize: "0.85rem", fontWeight: 600 }}
                          >
                            Prev
                          </button>
                          <button
                            className="btn btn-light border"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            style={{ padding: "4px 12px", fontSize: "0.85rem", fontWeight: 600 }}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                                            
                                  <div className="row mt-3">
                                        <div className="col-4 text-start fw-bold">Total Record : {creditNotes.length}</div>
                                        <div className="col-2"></div>
                                        <div className="col-6 text-end fw-bold">Total Amount : {totalAmount} 
                                            <button className=" vndrbtn ms-3">Bulk Print</button>
                                            <button className=" vndrbtn ms-2">Delete Selected</button>
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
  )
}


export default CreditListNote