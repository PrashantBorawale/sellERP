import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./GSTsales1.css";
import "../../../styles/erp-global.css";

const GSTsales1 = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
      const [showModal, setShowModal] = useState(false);
    
      const toggleSideNav = () => {
        setSideNavOpen((prevState) => !prevState);
      };
    
      const toggleModal = () => {
        setShowModal((prevState) => !prevState); // Toggle modal visibility
      };
    
      useEffect(() => {
        if (sideNavOpen) {
          document.body.classList.add("side-nav-open");
        } else {
          document.body.classList.remove("side-nav-open");
        }
      }, [sideNavOpen]);
    

  return (
      <div className="erp-page GSTsalesMaster">
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
                <div className="GSTsales mt-3">
                      <div className="GSTsales-header mb-4 text-start">
                        <div className="row align-items-center">
                          <div className="col-md-4">
                            <h5 className="header-title mb-0">Pending Invoice List For E-Invoice</h5>
                          </div>
                      <div className="col-md-1 generateirn d-flex align-items-center">
                        <input type="radio" id="GenerateIRN" name="brand" value="GenerateIRN"/>
                        <label htmlFor="GenerateIRN">GenerateIRN</label>
                      </div>
                      <div className="col-md-2 d-flex align-items-center">
                        <label className="checkbox-label mb-0">
                          <input type="checkbox" id="general" className="me-1" />
                          IRN WIth Eway
                        </label>
                      </div>
                      <div className="col-md-1 cancelirn d-flex align-items-center">       
                      <input type="radio" id="CancelIRN" name="brand" value="CancelIRN"/>
                        <label htmlFor="CancelIRN">CancelIRN</label>
                      </div>

                      <div className="col-md-4 text-end">
                        <button type="button" className="vndrbtn me-2" onClick={toggleModal}>
                          E-Invoice Log
                        </button>
                        <button type="button" className="vndrbtn">
                          IRN Lookup Table
                        </button>
                      </div>
                      </div>
                    </div>
                </div>


 <div  className={`modal fade ${showModal ? "show d-block" : ""}`} style={{ display: showModal ? "block" : "none", backgroundColor: showModal ? "rgba(0,0,0,0.5)" : "transparent" }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal} >
  <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
           E Invoice Logs  :
        </h5>
          <button type="button" className="btn-close" onClick={toggleModal} > <i class="fa fa-times" aria-hidden="true"></i> </button>        
      </div>

      <div className="modal-body">
        <form>
        <div className="GSTsales-header mb-4 text-start">
        <div className="row align-items-center">
            {/* Plant */}
             <div className="col-md-2 mb-3">
                       <label htmlFor="" className="">From : </label>    
                       <input type="date"  placeholder=" " className="form-control"/>
             </div>
             <div className="col-md-2 mb-3">
                       <label htmlFor="" className="">To : </label>    
                       <input type="date"  placeholder=" " className="form-control"/>
             </div>
             
             <div className="col-md-2">
                     <button type="button" className="vndrbtn w-100">
                       Search
                    </button>
             </div>
          </div>
          </div>
          </form>
                  <br />
                  <br />
                  <br />
                  <br />
      </div>
    </div>
  </div>
</div>

            <div className="centerMain mt-3 text-start">
                <div className="row g-2 align-items-end">
                     <div className="col-sm-6 col-md-2 col-lg-1">
                            <label className="small fw-bold text-secondary text-nowrap mb-1">Type:</label>
                            <select name="" id="" className="form-select form-select-sm">
                               <option value="">Domestic</option>
                           </select>
                      </div> 
                     <div className="col-sm-6 col-md-2 col-lg-2">
                            <label className="small fw-bold text-secondary text-nowrap mb-1">From:</label>
                            <input type="date" className="form-control form-control-sm"/>
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-2">
                            <label className="small fw-bold text-secondary text-nowrap mb-1">Plant:</label>
                            <select name="" id="" className="form-select form-select-sm">
                               <option value="">Sharp</option>
                           </select>
                      </div> 
                      <div className="col-sm-6 col-md-2 col-lg-2">
                            <label className="small fw-bold text-secondary text-nowrap mb-1">Customer:</label>                        
                            <input type="text" placeholder="Name" className="form-control form-control-sm"/>
                      </div> 
                      <div className="col-sm-6 col-md-2 col-lg-2">
                            <label className="small fw-bold text-secondary text-nowrap mb-1">Item:</label>                        
                            <input type="text" placeholder="Enter Code | Name" className="form-control form-control-sm"/>
                      </div> 
                      <div className="col-sm-6 col-md-2 col-lg-2">
                            <label className="small fw-bold text-secondary text-nowrap mb-1">Invoice:</label>                        
                            <input type="text" placeholder="No" className="form-control form-control-sm"/>
                      </div> 
                      <div className="col-sm-12 col-md-2 col-lg-1 ms-auto">
                            <button type="button" className="vndrbtn bg-primary border-primary w-100" >
                              Search
                           </button> 
                        </div>
                     </div>
                  </div>

                      <div className="GSTsales-tabs mt-3 text-start">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button  className="nav-link active"  id="shift-tab"  data-bs-toggle="pill"  data-bs-target="#shift"  type="button"  role="tab"  >
                            Invoice Details
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" id="machine-idle-tab" data-bs-toggle="pill" data-bs-target="#machineIdle" type="button" role="tab" >
                            Generate IRN
                          </button>
                        </li>
                      </ul>

                      <div className="tab-content mt-4"  id="GSTsalesTabsContent">

                        <div  className="tab-pane fade show active" id="shift" role="tabpanel" >
                           <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                              <thead className="table-dark">
                                <tr>
                                  <th className="">
                                    Sr
                                  </th>
                                  <th className="">
                                    Plant
                                  </th>
                                  <th className="">
                                    Invoice No.
                                  </th>
                                  <th className="">
                                    Invoice Date
                                  </th>
                                  <th className="">
                                    Cust Po No
                                  </th>
                                  <th className="">
                                    Type
                                  </th>
                                  <th className="">
                                    Cust Code
                                  </th>
                                  <th className="">
                                    Cust Name
                                  </th>
                                  <th className=" ">
                                    Item Qty | Desc
                                  </th>
                                  <th className=" ">
                                    Qty
                                  </th>
                                  <th className=" ">
                                   Ass Act
                                </th>
                                  <th className=" ">
                                    Total
                                  </th>
                                  <th className=" ">
                                    User
                                  </th>
                                  <th className=" ">
                                    View 
                                  </th>
                                  <th className=" ">
                                    JSON 
                                  </th>
                                  <th className=" ">
                                    Act
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                               <tr>
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

                        <div className="tab-pane fade" id="machineIdle" role="tabpanel" >
                              <div className="GSTsales-header mb-4 text-start">
                                    <div className="row align-items-center">
                                        <div className="col-md-3">
                                        <h5 className="header-title cllllr">Pending Invoice List For E-Invoice</h5>
                                        </div>     
                                    </div>

                                    <div className="row align-items-center mt-4">  
                                       <div className="col-md-2">
                                        <button type="button" className="vndrbtn w-100" >
                                            Generate IRN
                                        </button> 
                                        </div>
                                        <div className="col-md-2">
                                        <button type="button" className="vndrbtn w-100" >
                                            Cancel IRN
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
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GSTsales1
