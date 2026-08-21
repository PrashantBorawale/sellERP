
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./DebitNoteList.css";
import { useNavigate } from 'react-router-dom';


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>


const DebitNoteList  = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
      const navigate = useNavigate();  
      
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

  return (
    <div className="DebitNoteListMaster">
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
              <div className="DebitNoteList">
                <div className="DebitNoteList-header mb-2 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title"> Debit Note List </h5>
                    </div>

                    <div className="col-md-8 text-end">
                        
                        <button type="button" className=" vndrbtn" to="#/" onClick={handleButtonClick}>
                            Debit Note - Query
                        </button> 
                    </div>

                  </div>
                </div>
               
                <div className="DebitNoteList-Main">
                    <div className="container-fluid">
                      
                        <div className="row g-3 text-start">  

                       <div className="col-sm-6 col-md-3 col-lg-3">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-3">
                          <label>To:</label>
                          <input type="date" className="form-control" />
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-3">
                        <label htmlFor="">Plant:</label>
                        <select name="" className="form-control" style={{marginTop:"-0px"}} id="">
                            <option value="">Produlink</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-3">
                        <label htmlFor="">Type :</label>
                        <select name="" className="form-control" style={{marginTop:"-0px"}} id="">
                            <option value="">All : Debit Note</option>
                            <option value="">Purchase : Debit Note</option>
                            <option value="">Sales Rate Diff : Debit Note</option>
                            <option value="">JobWork Rate Diff : Debit Note</option>
                        </select>
                      </div>
                  
                      <div className="col-sm-6 col-md-3 col-lg-3">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Party Name: </label>
                        </div>
                        <input type="text"  placeholder="Name" className="form-control"/>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-3">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label"> Item : </label>
                        </div>
                        <input type="text"  placeholder="Item Code" className="form-control"/>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-3">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">DN No : </label>
                        </div>
                        <input type="text"  placeholder=" " className="form-control"/>
                      </div>
                        
                       <div className="col-6 col-md-2 align-items-center" style={{marginTop:"38px"}}>
                          <button type="button" className=" vndrbtn">
                            Search
                          </button>
                          <button type="button" className=" vndrbtn">
                            Blue Print
                          </button>
                        </div>

                        </div>

                    </div>
                  </div>

             <div className="DebitNoteList-Main mt-2 table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col"> Sr.</th>
                          <th scope="col"> Year</th>
                          <th scope="col"> Plant</th>
                          <th scope="col"> Note No</th>
                          <th scope="col"> Note Date </th>
                          <th scope="col"> Type </th>
                          <th scope="col"> Code No</th>
                          <th scope="col"> Cust / Supp Name</th>
                          <th scope="col"> Total Amt</th>
                          <th scope="col"> User </th>
                          <th scope="col"> IRN </th>
                          <th scope="col"> Cancel </th>
                          <th scope="col"> View </th>
                          <th scope="col"> Email </th>
                          <th scope="col"> Edit </th>
                          <th scope="col"> Del </th>
                          <th scope="col"> All </th>
                        </tr>
                      </thead>

                      <tbody>
                        {/* Example data row */}
                        <tr>
                          <td>1</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
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

export default DebitNoteList