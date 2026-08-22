import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import "../../../../styles/erp-global.css";
import "./Creditnoteto.css";


const Creditnoteto = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
   const navigate = useNavigate();  
  
    const handleButtonClick = () => {
      navigate('/CreditNoteList'); 
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
    <div className="erp-page CreditnotetoMaster">
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
                <div className="Creditnoteto mt-5">
                  <div className="Creditnoteto-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">New Credit Note (Sales Rate Diff.)</h5>
                      </div>
                      <div className="col-md-2">
                          <div className="row">
                              <div className="col-md-4 mt-2">
                                <label htmlFor="">Plant:</label>
                              </div>
                              <div className="col-md-8">
                                <select>
                                   <option>VISHWA S.I.</option>
                                </select>
                              </div>
                          </div>
                      </div>
                    
                        <div className="col-md-6 text-end">
                        <button type="button" className="vndrbtn" onClick={handleButtonClick}>
                          Credit Note List
                        </button>
                        </div>
                    </div>
                  </div>


                    <div className="Creditnoteto-main">
                      <div className="row text-start">

                        <div className="col-3">
                           <div className="row">
                               <div className="col-md-6 mt-2">
                                  <label htmlFor="">CreditNote NO:</label>
                               </div>
                               <div className="col-md-6">
                                  <input type="text" className="form-control" placeholder="24250001"/>
                               </div>
                           </div>
                        </div>
                        <div className="col-3">
                           <div className="row">
                               <div className="col-md-6 mt-2">
                                  <label htmlFor="">CreditNote Date:</label>
                               </div>
                               <div className="col-md-6">
                                  <input type="date" className="form-control" placeholder=""/>
                               </div>
                          </div>
                        </div>
                        <div className="col-2">  
                        <div className="row">
                           <div className="col-md-4 mt-2">
                                  <label htmlFor=""> Type:</label>
                               </div>
                               <div className="col-md-6">
                                  <select name="" className="form-control " id="">
                                      <option value="">Select</option>
                                      <option value="">Group</option>
                                      <option value="">Single</option>
                                  </select>
                               </div>
                           </div>
                        </div>
                          <div className="col-4">
                          <div className="row">
                               <div className="col-md-12 mt-2">
                                  <label htmlFor=""> Group : 1 Credit Note, Single : Per itemwise Credit Note </label>
                               </div>
                           </div>
                         </div>
                       </div>
                    </div>

                    <div className="Creditnoteto-main mt-5">
                    <div className="Creditnoteto-tabs">
                      <ul
                        className="nav nav-tabs"
                        id="AssembleEntryTabs"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="invoicedetails-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#invoicedetails"
                            type="button"
                            role="tab"
                          >
                            A. Invoice Details
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="creditnotedetails-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#creditnotedetails"
                            type="button"
                            role="tab"
                          >
                            B. Credit Note Details
                          </button>
                        </li>
                      </ul>


                      <div className="tab-content mt-4" id="CreditnotetoTabsContent" >
                         <div
                          className="tab-pane fade show active"
                          id="invoicedetails"
                          role="tabpanel"
                        >
                             <div className="row text-start">
                                 <div className="col-md-2">
                                        <label htmlFor="contractor">
                                            From Date :
                                        </label>
                                          <input type="date" className="form-control"/>
                                 </div>
                                 <div className="col-md-2">
                                        <label htmlFor="contractor">
                                            To :
                                        </label>
                                          <input type="date" className="form-control"/>
                                 </div>
                                 <div className="col-md-2">
                                        <label htmlFor="contractor">
                                            Customer:
                                        </label>
                                          <input type="taxt" className="form-control"/>
                                 </div>
                                 <div className="col-md-2">
                                        <label htmlFor="contractor">
                                            Shift Add Code :
                                        </label>
                                          <select name="" className="form-control" id="">
                                            <option value="">select</option>
                                          </select>
                                 </div>
                                 <div className="col-md-2">
                                        <label htmlFor="contractor">
                                            Type :
                                        </label>
                                          <select name="" className="form-control" id="">
                                            <option value="">All Invoice</option>
                                            <option value="">New Invoices</option>
                                            <option value="">Credit Note Generated Inv</option>
                                          </select>
                                 </div>
                            </div>

                                 <div className="row text-start">
                                 <div className="col-md-2">
                                        <label htmlFor="customer-checkbox" className="ms-2">ItemCode:</label>
                                          <input type="name" placeholder="Code" className="form-control"/>
                                    </div>

                                  <div className="col-md-3">
                                
                                     <button type="button" className="vndrbtn mt-4">Search</button>
                                 </div>
                                 </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="creditnotedetails"
                          role="tabpanel"
                        >
                          <div>
                             <div className="table-responsive">
                                <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th>Sr.</th>
                                    <th> Inv.NO </th>
                                    <th>Inv.Date</th>
                                    <th>HSN Code</th>
                                    <th>Qty</th>
                                    <th>Edit</th>
                                    <th>Inv.Rate</th>
                                    <th>New Rate</th>
                                    <th>Disc%</th>
                                    <th>Diff</th>
                                    <th> Diff Amt</th>
                                    <th>Line No</th>
                                    <th>Cr/Dr No/Date</th>
                                    <th>Del</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>1</td>
                                        <td></td>
                                        <td></td>
                                        <td><input type="text" className="form-control" /></td>
                                        <td></td>
                                        <td>Edit</td>
                                        <td></td>
                                        <td><input type="text" className="form-control" /></td>
                                        <td></td>
                                        <td><input type="text" className="form-control" /></td>
                                        <td><input type="text" className="form-control" /></td>
                                        <td><input type="text" className="form-control" /></td>
                                        <td><input type="date" className="form-control" /></td>
                                        <td><button type="button" className="erp-btn-danger btn-sm">X</button></td>
                                    </tr>
                                </tbody>
                                </table>
                             </div>

                             <div className="row mt-5">
                                    <div className="col-md-12">
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <tr>
                                                    <td colSpan="9" className="text-start">Debit Note / Tax Details.</td>
                                                </tr>
                                                <tr>
                                                    <th>SubTotal</th>
                                                    <th>Disc Amt</th>
                                                    <th>Ass Amt</th>
                                                    <th>CGST</th>
                                                    <th>SGST</th>
                                                    <th>IGST</th>
                                                    <th>UTGST</th>
                                                    <th>TCS</th>
                                                    <th>Grand Total</th>
                                                </tr>

                                                <tr>
                                                <td>  </td>
                                                <td>  </td>
                                                <td>  </td>
                                                <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                                <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                                <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                            
                                                <td> <input type="text" className="form-control" placeholder="00.00" /> %</td>
                                            
                                                <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                                <td></td>
                                                
                                                </tr>
                                                
                                                <tr>
                                                <td> <input type="text" className="form-control" placeholder="" /> </td>
                                                <td> <input type="text" className="form-control" placeholder="" /> </td>
                                                <td> <input type="text" className="form-control" placeholder="" /> </td>
                                                <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                                <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                                <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                            
                                                <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                            
                                                <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                                <td> <input type="text" className="form-control" placeholder="00.00" /> </td>
                                                
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                             </div>

                             <div className="row text-start">
                                    <div className="col-md-2">
                                        <label htmlFor="">GL :</label>
                                        <select name="" className="form-control" id="">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="">Other Ref.: </label>
                                        <textarea name=""  className="form-control" id=""></textarea>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="">Remark</label>
                                        <textarea name=""  className="form-control" id=""></textarea>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="">For E-Invoice:</label>
                                        <select name="" className="form-control" id="">
                                            <option value="">Bussiness-TO-Bussiness</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2 ">
                                        <input type="checkbox" className="mt-3  " placeholder="" />
                                        <label htmlFor=""> IS Service Invoice</label>
                                    </div>
                                    <div className="col-md-2 mt-4">
                                        <button type="button" className="vndrbtn me-2">Save Dabit Note</button>
                                        <button type="button" className="vndrbtn">Clear</button>
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

export default Creditnoteto