import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./GSTJobworkDCreturn.css";

const GSTJobworkDCreturn = () => {
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
    <div className="GSTJobworkInvoiceMaster">
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
                <div className="GSTJobworkInvoice mt-5">
                  <div className="GSTJobworkInvoice-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <h5 className="header-title">New Jobwork DC</h5>
                      </div>
                      <div className="col-md-1">Plant</div>
                      <div className="col-md-1">
                        <select>
                          <option>ProduLink</option>
                        </select>
                      </div>
                      <div className="col-md-1">Series</div>
                      <div className="col-md-1">
                        <select>
                          <option> Select </option>
                          <option> Delivery Challan</option>
                        </select>
                      </div>
                      <div className="col-md-1">
                        <input type="text" placeholder="DCNo  : 24250001" className="w-100" />
                      </div>
                        <div className="col-md-1">
                        <input type="radio" id="css" name="fav_language" value="CSS"/>
                        <label for="css"> DC Return</label>
                        </div>
                        <div className="col-md-2">
                        <input type="radio" id="css" name="fav_language" value="CSS"/>
                        <label for="css"> Delivery Challan</label>
                        </div>
                        <div className="col-md-2">
                        <input type="radio" id="css" name="fav_language" value="CSS"/>
                        <label for="css"> Rejection Stock</label>
                        </div>
                    </div>
                  </div>

                  <div className="GSTJobworkInvoice-main mt-5">
                    <div className="GSTJobworkInvoice-tabs">
                   
                      <ul
                        className="nav nav-tabs"
                        id="AssembleEntryTabs"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="selectitem-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#selectitem"
                            type="button"
                            role="tab"
                          >
                            A. Select Item 
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="dcdetail-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#dcdetail"
                            type="button"
                            role="tab"
                          >
                            B. DC Detail
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="dcmaster-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#dcmaster"
                            type="button"
                            role="tab"
                          >
                            C. DC Master
                          </button>
                        </li>
                      </ul>

                      <div
                        className="tab-content mt-4"
                        id="productionEntryTabsContent"
                      >
                         <div
                          className="tab-pane fade show active"
                          id="selectitem"
                          role="tabpanel"
                        >
                          <div className="row text-start">
                          <div className="col-4">
                                  <div className="row">
                                            <div className="col-md-4">
                                            <label>Select Cust:</label>
                                            </div>
                                            <div className="col-md-8 d-flex">
                                                <input type="text"  className="form-control" placeholder="Enter Name"/>
                                                <button style={{marginBottom:"15px"}} className="btn w-50">Search</button>
                                            </div>
                                     </div>
                                </div>
                          </div>
                          <div className="row text-start">
                          <div className="col-4">
                                  <div className="row">
                                            <div className="col-md-4">
                                            <label>Ref.Item:</label>
                                            </div>
                                            <div className="col-md-8 d-flex">
                                                <input type="text"  className="form-control" placeholder=" "/>
                                                <button style={{marginBottom:"15px"}} className="btn w-50">Search</button>
                                            </div>
                                     </div>
                                </div>
                                   <div className="col-md-4">

                                    </div>
                                    <div className="col-md-4">
                                        <button style={{marginBottom:"15px"}} className="btn">View Pandding Challan List</button>
                                    </div>
                          </div>
                        
                        </div>

                        <div
                          className="tab-pane fade"
                          id="dcmaster"
                          role="tabpanel"
                        >
                         <div className="row text-start">
                            {/* First Column */}
                            <div className="col-md-4">
                              {/* Prod. No */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="invoice-no">DC No :</label>
                                </div>
                                <div className="col-3">
                                  <input
                                    id="invoice-no"
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-3">
                                  <input
                                    id="invoice-no"
                                    placeholder="232400001"
                                    className="form-control"
                                  />
                                </div>
                              </div>

                              {/* Payment */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="payment">
                                    Payment Date :
                                  </label>
                                </div>
                                <div className="col-6">
                                  <input type="Date" id="payment"
                                    className="form-control"/>
                                </div>
                              </div>

                              {/* Mode of trans */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="unit-machine">
                                    Mode of Trans :
                                  </label>
                                </div>
                                <div className="col-8">
                                  <input type="text" placeholder="By Road" id="modeoftrans"
                                    className="form-control"/>
                                </div>
                              </div>

                                {/* Prod. Qty */}
                                <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="note-remark">
                                   Remark:
                                  </label>
                                </div>
                                <div className="col-8">
                                    <textarea name="" className="form-control" id="note-remark"></textarea>
                                </div>
                              </div>

                              {/* Item */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="item">Place Of Supply:</label>
                                </div>
                                <div className="col-6 d-flex align-items-center">
                                   <input type="text" placeholder="" id="billto"
                                    className="form-control"/>
                                </div>
                              </div>

                              {/* Ship tp */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="shipto">Ship TO :</label>
                                </div>
                                <div className="col-6 d-flex align-items-center">
                                   <input type="text" placeholder="Enter Buyer Name" id="billto"
                                    className="form-control"/>
                                </div>
                              </div>
                            </div>

                            {/* Second Column */}
                            <div className="col-md-4">
                              {/* Date & Time */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="time">DC Time :</label>
                                </div>
                                <div className="col-6">
                                  <input
                                    id="time"
                                    type="time"
                                    className="form-control"
                                  />
                                </div>
                              </div>

                              {/* Supervisor */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="dateremoval">
                                    Date Of Removal :
                                  </label>
                                </div>
                                <div className="col-6">
                                  <input
                                    id="dateremoval"
                                    type="date"
                                    className="form-control"
                                  />
                                </div>
                              </div>

                              {/* Machine Speed */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="vehicle">Vehicle No:</label>
                                </div>
                                <div className="col-8 d-flex align-items-center">
                                 <input
                                    id="vehicle"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Third Column */}
                            <div className="col-md-4">
                              {/* Shift */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="invoicetime">DC Date :</label>
                                </div>
                                <div className="col-6">
                                 <input type="date" id="invoicetime" className="form-control"/>
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="invoicetime"> Time :</label>
                                </div>
                                <div className="col-6">
                                 <input type="time" id="invoicetime" className="form-control"/>
                                </div>
                              </div>

                              {/* transporter */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="transporter">Transporter :</label>
                                </div>
                                <div className="col-8 d-flex">
                                  <input
                                    id="transporter"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>

                          </div>

                          <div className="row">
                            <div className="col-md-2">
                                <button className="btn btn-primary"> Generete DC </button>
                            </div>
                          </div>

                        </div>

                        <div
                          className="tab-pane fade"
                          id="dcdetail"
                          role="tabpanel"
                        >

                            <div className="table-responsive">
                                        <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th>In.No</th>
                                            <th>Challan No </th>
                                            <th>Item No</th>
                                            <th>Item Code Desc.</th>
                                            <th>Heat Code</th>
                                            <th>Rate</th>
                                            <th>Challan Qty</th>
                                            <th>Bal.Qty</th>
                                            <th>DC.Qty</th>
                                            <th>Particulers</th>
                                            <th>Ref.</th>
                                            <th>Del</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td></td>
                                                <td></td>
                                                <td><span>HSN Code :</span> </td>
                                                <td className="text-start">
                                                    <select name="" id="">
                                                            <option value="">NOS</option>
                                                        </select>
                                                </td>
                                                <td><input type="text" className="w-50"/></td>
                                                <td></td>
                                                <td></td>
                                                <td><input type="text" className="w-50"/> <br />
                                                    <br />
                                                    <input type="text" className="w-50" placeholder="" /> Kg<br />
                                                
                                                </td>
                                                <td><textarea name="" id=""></textarea></td>
                                                <td>LN No.</td>
                                                <td><span style={{border:"1px solid black"}}>X</span></td>
                                            </tr>
                                        </tbody>
                                        </table>
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


export default GSTJobworkDCreturn