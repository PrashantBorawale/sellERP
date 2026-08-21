import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { FaPlus } from "react-icons/fa6";
import { FaRegCircleQuestion } from "react-icons/fa6";
import Cached from "@mui/icons-material/Cached.js";
  import "./NewinvoiceGST.css";

const NewinvoiceGST = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
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
    <div className="NewinvoiceGSTMaster">
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
                <div className="NewinvoiceGST mt-5">
                  <div className="NewinvoiceGST-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <h5 className="header-title">New Invoice</h5>
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
                          <option>GST Invoice</option>
                        </select>
                      </div>
                      <div className="col-md-1">
                        <input type="text" placeholder="InvoiceNo:" className="w-100" />
                      </div>
                      <div className="col-md-1">InvoiceType:</div>
                      <div className="col-md-1">
                        <select>
                          <option>GST</option>
                          <option>SCRAP</option>
                          <option>Stock Transfer</option>
                          <option>Direct Export</option>
                          <option>Third Party EXP (In State)</option>
                          <option>Third Party Export (Out State)</option>
                          <option>Asset</option>
                          <option>Tool</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="NewinvoiceGST-main mt-5">
                   
                    <div className="NewinvoiceGST-tabs">
                      <ul
                        className="nav nav-tabs"
                        id="AssembleEntryTabs"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="itemdetails-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#itemdetails"
                            type="button"
                            role="tab"
                          >
                            A. Item Details
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="taxes-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#taxes"
                            type="button"
                            role="tab"
                          >
                            B. Taxes
                          </button>
                        </li>
                      </ul>

                      <div
                        className="tab-content mt-4"
                        id="productionEntryTabsContent"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="itemdetails"
                          role="tabpanel"
                        >
                          <div className="row text-start">
                                <div className="col-2">
                                  <label htmlFor="prod-no">Select Cust:</label>
                                </div>
                                <div className="col-3">
                                  <input type="text" placeholder="Enter Name.." className="form-control" />
                                </div>
                                <div className="col-2">
                                 <button className="btn w-50">Search</button>
                                </div>
                          </div>
                          <div className="row text-start">
                                <div className="col-2">
                                  <label htmlFor="prod-no">Select PO:</label>
                                </div>
                                <div className="col-3">
                                        <select name="" id="" className="form-control">
                                            <option value="">Select an Option</option>
                                        </select>
                                </div>
                                <div className="col-1">
                                 <button className="btn w-100">Clear</button>
                                </div>
                                <div className="col-2">
                                 <button className="btn w-50"> View SO</button>
                                </div>
                          </div>
                          <div className="row text-start">
                                <div className="col-2">
                                  <label htmlFor="prod-no">Select Item :</label>
                                </div>
                                <div className="col-3">
                                  <input type="text" placeholder="Enter Item Code.." className="form-control" />
                                </div>
                                <div className="col-2">
                                 <button className="btn w-50">Add</button>
                                </div>
                          </div>
                          <div className="row text-start">
                                <div className="col-6">
                                   <div className="row">
                                        <div className="col-4">
                                           <label htmlFor="prod-no">Stock :</label>
                                      </div>
                                      <div className="col-6">
                                           <textarea type="text" placeholder=".." className="form-control" />
                                      </div>
                                   </div>
                                </div>
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-4">
                                              <label htmlFor="prod-no">Invice Qty:</label>
                                          </div>
                                          <div className="col-6 d-flex">
                                              <textarea type="text" placeholder=".." className="form-control" />
                                              <button className="btn w-50" style={{height:"35px", marginTop:"5px"}}>Add</button>
                                          </div>
                                     </div>
                                 </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="taxes"
                          role="tabpanel"
                        >
                         <div className="row text-start">
                            {/* First Column */}
                            <div className="col-md-4">
                              {/* Prod. No */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="invoice-no">Invoice No :</label>
                                </div>
                                <div className="col-3">
                                  <input
                                    id="invoice-no"
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-4 ">
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
                                <div className="col-3">
                                  <input type="Date" id="payment"
                                    className="form-control"/>
                                </div>
                                <div className="col-2">
                                  <label htmlFor="payment_note">
                                    Note :
                                  </label>
                                </div>
                                <div className="col-3">
                                  <input type="text" id="payment_note"
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
                                <div className="col-2">
                                  <input type="text" placeholder="By Road" id="modeoftrans"
                                    className="form-control"/>
                                </div>
                                <div className="col-2">
                                  <label htmlFor="unit-machine">
                                    Freight:
                                  </label>
                                </div>
                                <div className="col-4 d-flex align-items-center">
                                  <select className="form-control flex-grow-1">
                                    <option>  Select  </option>
                                  </select>
                                  <button type="button" className="btn">
                                    <Cached />
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary ml-2"
                                  >
                                    <FaPlus />
                                  </button>
                                </div>
                              </div>

                              {/* Item */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="billto">Bill TO  :</label>
                                </div>
                                <div className="col-8 d-flex align-items-center">
                                   <input type="text" placeholder="" id="billto"
                                    className="form-control"/>
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary ml-2"
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>

                              {/* Ship tp */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="shipto">Ship TO :</label>
                                </div>
                                <div className="col-8 d-flex align-items-center">
                                   <input type="text" placeholder="" id="shipto"
                                    className="form-control"/>
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary ml-2"
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>

                              {/* Bill Date. */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="eway-bill">Eway Bill Date :</label>
                                </div>
                                <div className="col-6">
                                  <input
                                    id="eway-bill"
                                    type="date"
                                    className="form-control"
                                  />
                                </div>
                              </div>

                              {/* Prod. Qty */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="note-remark">
                                    Note/Remark:
                                  </label>
                                </div>
                                <div className="col-6">
                                    <textarea name="" className="form-control" id="note-remark"></textarea>
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="unit-machine">
                                    PDI No :
                                  </label>
                                </div>
                                <div className="col-2">
                                  <input type="text" placeholder="" id="modeoftrans"
                                    className="form-control"/>
                                </div>
                                <div className="col-2">
                                  <label htmlFor="unit-machine">
                                    Bank:
                                  </label>
                                </div>
                                <div className="col-4 d-flex align-items-center">
                                  <select className="form-control flex-grow-1">
                                    <option>  Select  </option>
                                  </select>
                                  <button type="button" className="btn">
                                    <Cached />
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary ml-2"
                                  >
                                    <FaPlus />
                                  </button>
                                </div>
                              </div>

                            </div>

                            {/* Second Column */}
                            <div className="col-md-4">
                              {/* Date & Time */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="invoicedate">Invoice Date :</label>
                                </div>
                                <div className="col-8">
                                  <input
                                    id="invoicedate"
                                    type="datetime-local"
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
                                <div className="col-8">
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
                                   <button type="button" className="btn btn-outline-secondary">
                                   <FaPlus />
                                  </button>
                                </div>
                              </div>

                              {/* Prod Time */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="addrcode">Addr Code:</label>
                                </div>
                                <div className="col-8 d-flex">
                                <select className="form-control flex-grow-1">
                                    <option>   </option>
                                  </select>
                                   <button type="button" className="btn btn-outline-secondary mb-4">
                                   <FaRegCircleQuestion />
                                  </button>
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="addrcode">Addr Code:</label>
                                </div>
                                <div className="col-8 d-flex">
                                <select className="form-control flex-grow-1">
                                    <option>   </option>
                                  </select>
                                   <button type="button" className="btn btn-outline-secondary mb-4">
                                   <FaRegCircleQuestion />
                                  </button>
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="ewaybill">Eway Bill No:</label>
                                </div>
                                <div className="col-8 d-flex">
                                  <input
                                    id="ewaybill"
                                    className="form-control"
                                   />
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="delivey"> Delivey Terms:</label>
                                </div>
                                <div className="col-8 d-flex">
                                    <textarea name="" id="delivey" className="form-control"></textarea>
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="dcno">D.C. NO:</label>
                                </div>
                                <div className="col-8 d-flex">
                                    <input type="text" id="dcno" className="form-control" />
                                </div>
                              </div>

                            </div>

                            {/* Third Column */}
                            <div className="col-md-4">
                              {/* Shift */}
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="invoicetime">Invoice Time :</label>
                                </div>
                                <div className="col-8">
                                 <input type="time" id="invoicetime" className="form-control"/>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="time2"> Time :</label>
                                </div>
                                <div className="col-8">
                                 <input type="time" id="time2" className="form-control"/>
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
                                   <button type="button" className="btn btn-outline-secondary mb-3">
                                   <FaPlus />
                                  </button>
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="shift">L/R GC Note:</label>
                                </div>
                                <div className="col-8">
                                 <input type="text" className="form-control" />
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="shift">Place Of Supply:</label>
                                </div>
                                <div className="col-8">
                                 <input type="text" className="form-control" />
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="ewaybill2">Eway Bill No:</label>
                                </div>
                                <div className="col-8 d-flex">
                                  <input
                                    id="ewaybill2" placeholder="0"
                                    className="form-control"
                                   />
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="destcode"> Destination Code:</label>
                                </div>
                                <div className="col-8 d-flex">
                                   <input type="text" id="destcode" className="form-control"/>
                                </div>
                              </div>

                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="dcdate">D.C. Date:</label>
                                </div>
                                <div className="col-8 d-flex">
                                    <input type="date" id="dcdate" className="form-control" />
                                </div>
                              </div>

                            </div>

                          </div>

                          <div className="table-container">
                    <div className="row">

                         <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                   <label>Base Value</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                   <label>Assessble Value</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                   <label className="d-flex">Pack&Fwrd <input style={{width:"40px"}} type="text" className="w-5" placeholder="0"/>%</label>  
                                </div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-12">
                                   <label>Total Amortisation : 0</label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">

                         <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                   <label>Disc Amt:</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                   <label>CGST : 00.00%</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                   <label className="d-flex">Transport Crg. <input style={{width:"40px"}} type="text" className="w-5" placeholder="0"/>%</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-12">
                                   <label>CGST : 0</label>
                                </div>  
                            </div>
                        </div>

                    </div>
                    <div className="row">

                         <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                   <label>Rev. Base Crg.</label>
                                </div>
                                <div className="col-md-4">
                                   <select name="" id="">
                                     <option value="">NO</option>
                                   </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                   <label>SGST : 00.00%</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                   <label className="d-flex">Freight Crg. <input style={{width:"40px"}} type="text" className="w-5" placeholder="0"/>% </label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-12">
                                   <label>SGST : 0</label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">

                         <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                   <label>Rev Crg Amt</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                   <label>IGST : 00.00%</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                <label className="d-flex">Other Crg. <input style={{width:"40px"}} type="text" className="w-5" placeholder="0"/>% </label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-12">
                                   <label>IGST : 0</label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">

                         <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                   <label>TCS</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                   <label>UTGST : 00.00%</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-8">
                                   <label>Grand Total</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-12">
                                   <label>For E-Inv: Ser.inv.  .  . Inv.Type:</label>
                                </div>
                            </div>
                        </div>

                    </div>
                         </div>

                          <div className="row">
                            <div className="col-md-2">
                                <button className="btn btn-primary"> Generete Invoice </button>
                            </div>
                            <div className="col-md-3 d-flex align-items-center">
      <input
        type="checkbox"
        id="printRate"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="printRate" className="ms-2">
        PrintRate
      </label>
    </div>
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                       <div className="table-responsive">
                                <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th>Sr.</th>
                                    <th>PO No | Date</th>
                                    <th>Stock</th>
                                    <th>Description</th>
                                    <th>Rate</th>
                                    <th>PO Qty</th>
                                    <th>Bal.Qty</th>
                                    <th>Inv.Qty</th>
                                    <th>Pkg Qty</th>
                                    <th>Type Of Packing</th>
                                    <th>Del</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Pr No:</td>
                                        <td>Line No:</td>
                                        <td><textarea name="" id=""></textarea> <br /> <span>HSN Code :</span> </td>
                                        <td className="text-start"><input type="text" className="" /> <br />
                                                Disc:  <br />  Pkg Charges: <br />
                                                Trans Charges: <br /> <span style={{color:"blue"}}>Rate Type: </span>
                                                <br /> Amort Rate :
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td><input type="text" className="w-50"/> <br />
                                            Per Pcs Wt: <br />
                                            <input type="text" className="w-50" placeholder="Weight" /><br />
                                            <span style={{color:"blue"}}>Per Unit: </span>
                                        </td>
                                        <td><input type="text" className="w-50"/></td>
                                        <td><textarea name="" id=""></textarea></td>
                                        <td><span style={{border:"1px solid black"}}>X</span></td>
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
  );
};


export default NewinvoiceGST