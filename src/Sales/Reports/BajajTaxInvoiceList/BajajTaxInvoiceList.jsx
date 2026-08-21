
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./BajajTaxInvoiceList.css";
import { useNavigate } from 'react-router-dom';


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>


const BajajTaxInvoiceList    = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
      const navigate = useNavigate();  
      
        const handleButtonClick = () => {
          navigate('/VendorFileBajaj'); 
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
    <div className="BajajTaxInvoiceListMaster">
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
              <div className="BajajTaxInvoiceList">
                <div className="BajajTaxInvoiceList-header mb-2 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title"> Tax Invoice List </h5>
                    </div>

                    <div className="col-md-8 text-end">
                        <button type="button" className=" vndrbtn" to="#/" onClick={handleButtonClick}>
                            Vender File
                        </button> 
                    </div>

                  </div>
                </div>
               
                <div className="BajajTaxInvoiceList-Main">
                    <div className="container-fluid">
                      
                        <div className="row g-3 text-start">  

                       <div className="col-sm-6 col-md-3 col-lg-3">
                          <label>From:</label>
                          <input type="date" className="form-control mt-2" />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-3">
                          <label>To:</label>
                          <input type="date" className="form-control mt-2" />
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-3">
                        <label htmlFor="">Plant:</label>
                        <select name="" className="form-control mt-2"  id="">
                            <option value="">Produlink</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-3">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Customer Name: </label>
                        </div>
                        <input type="text"  placeholder="Name" className="form-control"/>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-3">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Inv No: </label>
                        </div>
                        <input type="text"  placeholder="No" className="form-control"/>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-3">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">To: </label>
                        </div>
                        <input type="text"  placeholder="No" className="form-control"/>
                      </div>
                        
                       <div className="col-sm-6 col-md-3 col-lg-4 align-items-center" style={{marginTop:"45px"}}>
                          <button type="button" className=" vndrbtn">
                            Search
                          </button>
                          <button type="button" className=" vndrbtn">
                            Search Option
                          </button>
                          <button type="button" className=" vndrbtn">
                            Print Inv
                          </button>
                        </div>
                      
                       
                        </div>

                    </div>
                  </div>

             <div className="BajajTaxInvoiceList-Main mt-2 table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Year</th>
                          <th scope="col">#</th>
                          <th scope="col">Inv No</th>
                          <th scope="col"> Inv Date</th>
                          <th scope="col">Cust PO No </th>
                          <th scope="col">Type</th>
                          <th scope="col">Cust Code</th>
                          <th scope="col">Cust Name</th>
                          <th scope="col">Total </th>
                          <th scope="col">User </th>
                          <th scope="col">ASN </th>
                          <th scope="col">Bajaj </th>
                          <th scope="col"> YAshShree </th>
                          <th scope="col">PDI </th>
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


export default BajajTaxInvoiceList