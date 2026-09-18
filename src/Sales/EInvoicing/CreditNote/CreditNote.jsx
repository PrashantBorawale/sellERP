import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./CreditNote.css";

const CreditNote = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

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
    <div className="CreditNoteMaster">
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
                <div className="CreditNote mt-5">
                  <div className="CreditNote-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title mb-0">Pending Credit Note List For E-Invoice</h5>
                      </div>
                      <div className="col-md-2 generateirn d-flex align-items-center">
                        <input type="radio" id="GenerateIRN" name="brand" value="GenerateIRN"/>
                        <label htmlFor="GenerateIRN">GenerateIRN</label>
                      </div>
                      <div className="col-md-1 cancelirn d-flex align-items-center">       
                      <input type="radio" id="CancelIRN" name="brand" value="CancelIRN"/>
                        <label htmlFor="CancelIRN">CancelIRN</label>
                      </div>
                    </div>
                  </div>

                  <div className="CreditNote-main mt-5">
                     <div className="row text-start">

                     <div className="col-md-1">
                            <label htmlFor="">Type:</label>
                            <select name="" id="" className="form-control">
                               <option value="">Credit Note</option>
                               <option value="">GST Sales Return</option>
                           </select>
                      </div> 
                     <div className="col-md-1">
                            <label htmlFor="">From :</label>
                            <input type="date" className="form-control"/>
                      </div>
                      <div className="col-md-1">
                            <label htmlFor="">Plant:</label>
                            <select name="" id="" className="form-control">
                               <option value="">Sharp</option>
                           </select>
                      </div> 
                      <div className="col-md-1">
                         <div className="d-flex  justify-content-center align-items-center">
                            <input type="checkbox" id="customer-checkbox" />
                             <label htmlFor="customer-checkbox" className="ms-2">Customer:</label>
                        </div>
                        <input type="text" placeholder="Name" className="form-control" />
                     </div>

                      <div className="col-md-1">
                      <div className="d-flex justify-content-center align-items-center">
                            <input type="checkbox" id="Item-checkbox" />
                             <label htmlFor="Item-checkbox" className="ms-1">Item:</label>
                        </div>
                            <input type="text" placeholder="Enter Code | Name" className="form-control"/>
                      </div> 
                      <div className="col-md-1">
                               <div className="d-flex justify-content-center align-items-center">
                                  <input type="checkbox" id="Invoice-checkbox" />
                                  <label htmlFor="Invoice-checkbox" className="ms-2">Invoice:</label>
                              </div>  
                            <input type="text" placeholder="No" className="form-control"/>
                      </div> 
                      <div className="col-md-1 mt-4">
                           <button type="button" className="vndrbtn w-100" >
                              Search
                           </button> 
                        </div>
                     </div>
                  </div>
                  <div className="CreditNote-main mt-5">
                    <div className="CreditNote-second">
                      <ul className="nav nav-tabs" id="CreditNoteTabs" role="tablist" >
                        <li className="nav-item" role="presentation">
                          <button  className="nav-link active"  id="shift-tab"  data-bs-toggle="tab"  data-bs-target="#shift"  type="button"  role="tab"  >
                            Invoice Details
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" id="machine-idle-tab" data-bs-toggle="tab" data-bs-target="#machineIdle" type="button" role="tab" >
                            Generate IRN
                          </button>
                        </li>
                      </ul>

                      <div className="tab-content mt-4"  id="CreditNoteTabsContent">

                        <div  className="tab-pane fade show active" id="shift" role="tabpanel" >
                        <div className="HeatCodeRegister-Main">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Year </th>
                          <th>##</th>
                          <th>Document No</th>
                          <th>Document Date</th>
                          <th>Cust Code </th>
                          <th>Cust Name</th>
                          <th>Item Qty | Desc</th>
                          <th>AssAmt</th>
                          <th>Total</th>
                          <th>USers</th>
                          <th>JSON</th>
                          <th>Act</th>
                        </tr>
                      </thead>
                      <tbody>
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
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>  
                        </div>

                         <div className="tab-pane fade" id="machineIdle" role="tabpanel" >
                              <div className="CreditNote-header mb-4 text-start">
                                    <div className="row align-items-center">
                                        <div className="col-md-3">
                                        <h5 className="header-title cllllr">Invoice No. Customer : Doc Type</h5>
                                        </div>     
                                    </div>

                                    <div className="row align-items-center mt-4">  
                                       <div className="col-md-2">
                                        <button type="button" className="vndrbtn w-100" >
                                            Generate IRN
                                        </button> 
                                        </div>
                                   </div>

                                   <div className="row align-items-center mt-4">  
                                       <div className="col-md-12">
                                         <label htmlFor="">Result</label>
                                         <textarea name="result" id="result"></textarea>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditNote