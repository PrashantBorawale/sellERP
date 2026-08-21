import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../../NavBar/NavBar";
import SideNav from "../../../../SideNav/SideNav";
import "./ImportPO.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";

const ImportPO = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

 const [showTransaction, setShowTransaction] = useState(false);
    const [showReports, setShowReports] = useState(false);
  
        const toggleTransaction = () => {
            setShowTransaction(!showTransaction);
        };
        const toggleReports = () => {
            setShowReports(!showReports);
        }; 


  const [activeTab, setActiveTab] = useState("poinfo");

  return (
    <div className="Report">
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
                <div className="Reportrmaster">
                    <div className="content-area">
                        <div className="row text-start">

                            <div className="col-lg-2 col-md-4 col-12 submenu">
                                     <h4 className="header-title mb-3">Import</h4>
                                      <div>
                                                    <h6 className="portal-login" onClick={toggleTransaction} style={{ cursor: 'pointer' }}>
                                                      Transaction
                                                    </h6>
                          
                                                    {showTransaction && (
                                                      <ul className="submenu-links">
                                                        <li><Link to="/ImportPO">Import PO</Link></li>
                                                        <li><Link to="/POConsignment">PO Consignment</Link></li>
                                                        <li><Link to="/ImportGRN">Import GRN</Link></li>
                                                      </ul>
                                                    )}
                                      </div>
                          
                                     <div>
                                                    <h6 className="portal-login" onClick={toggleReports} style={{ cursor: 'pointer' }}>
                                                      Reports
                                                    </h6>
                          
                                                    {showReports && (
                                                                                                       <ul className="submenu-links">
                                                                                                          <li><Link to="/ImportPOList"> PO List</Link></li>
                                                                                                          <li><Link to="/POConsignmentList">PO Consignment List</Link></li>
                                                                                                          <li><Link to="/ImportGRNList">GRN List</Link></li>
                                                                                                       </ul>
                                                                                                      )}
                                     </div>
                             </div>

                            <div className="col-lg-10 col-md-8 col-12 content">
                                  <div className="order mt-1">
                                    <div className="order-header mb-2 text-start">
                                      <div className="row align-items-center">
                                        <div className="col-md-4">
                                            <h5 className="header-title">Master Report</h5>
                                        </div>
                                           <div className="col-md-2">
                                              <input type="text" className="form-control" />
                                          </div>
                                            <div className="col-md-6 text-end">
                                                <Link className="vndrbtn" to={"/ImportPOList"}>Import PO List</Link>
                                          </div>
                                      </div>
                                    </div>
                                  </div>

                                   <div className="ReportMain">
                                      <div className="container-fluid">
                                        <ul className="nav nav-tabs">
                                          <li className="nav-item">
                                            <button
                                              className={`nav-link ${
                                                activeTab === "poinfo" ? "active" : ""
                                              }`}
                                              onClick={() => setActiveTab("poinfo")}
                                            >
                                              PO Info
                                            </button>
                                          </li>
                                          <li className="nav-item">
                                            <button
                                              className={`nav-link ${
                                                activeTab === "address"
                                                  ? "active"
                                                  : ""
                                              }`}
                                              onClick={() =>
                                                setActiveTab("address")
                                              }
                                            >
                                              Address
                                            </button>
                                          </li>
                                          <li className="nav-item">
                                            <button
                                              className={`nav-link ${
                                                activeTab === "import"
                                                  ? "active"
                                                  : ""
                                              }`}
                                              onClick={() =>
                                                setActiveTab("import")
                                              }
                                            >
                                              Import
                                            </button>
                                          </li>
                                          <li className="nav-item">
                                            <button
                                              className={`nav-link ${
                                                activeTab === "poannexure"
                                                  ? "active"
                                                  : ""
                                              }`}
                                              onClick={() =>
                                                setActiveTab("poannexure")
                                              }
                                            >
                                              PO Annexure
                                            </button>
                                          </li>
                                          <li className="nav-item">
                                            <button
                                              className={`nav-link ${
                                                activeTab === "termcondition"
                                                  ? "active"
                                                  : ""
                                              }`}
                                              onClick={() =>
                                                setActiveTab("termcondition")
                                              }
                                            >
                                              Term & Condition
                                            </button>
                                          </li>
                                          <li className="nav-item">
                                            <button
                                              className={`nav-link ${
                                                activeTab === "itemdetails"
                                                  ? "active"
                                                  : ""
                                              }`}
                                              onClick={() =>
                                                setActiveTab("itemdetails")
                                              }
                                            >
                                              Item Details
                                            </button>
                                          </li>
                                        </ul>

                                       <div className="tab-content mt-3">
                                          {activeTab === "poinfo" && (
                                            <div className="tab-pane active">
                                              <div className="ReportMain1">
                                                <div className="row text-start Reportselect1">

                                                  <div className="row mb-3">
                                                      <label htmlFor="Distance" className="col-sm-2 col-form-label">
                                                        Distance:
                                                      </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="Distance" name="Distance" />
                                                      </div>

                                                      <label htmlFor="Series" className="col-sm-2 col-form-label">
                                                        Series :
                                                      </label>
                                                      <div className="col-sm-3">
                                                         <select  id=""  className="form-select"  aria-label="Default select example">
                                                            <option selected>Import</option>
                                                         </select>
                                                      </div>
                                                  </div>

                                                   <div className="row mb-3">
                                                      <label htmlFor="PONo" className="col-sm-2 col-form-label">
                                                        PO No.:
                                                      </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="" name="" />
                                                      </div>

                                                      <label htmlFor="Series" className="col-sm-2 col-form-label">
                                                        PO Date :
                                                      </label>
                                                      <div className="col-sm-3">
                                                         <input type="date" className="form-control" id="" name="" />
                                                      </div>
                                                  </div>

                                                  <div className="row mb-3">
                                                    <label htmlFor="Supplier" className="col-sm-2 col-form-label">
                                                      Supplier :
                                                    </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="" name="" />
                                                      </div>

                                                      <div className="col-sm-2"> 
                                                        <button className="vndrbtn">
                                                          Search
                                                       </button>
                                                      </div>
                                                      <div className="col-sm-3"> 
                                                        <button className="vndrbtn">
                                                          Clear
                                                       </button>
                                                      </div>
                                                  </div>
                                                  
                                                   <div className="row mb-3">
                                                      <label htmlFor="Quatation" className="col-sm-2 col-form-label">
                                                        Quatation No.:
                                                      </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="" name="" />
                                                      </div>

                                                      <label htmlFor="QuatationDate" className="col-sm-2 col-form-label">
                                                        Quatation Date :
                                                      </label>
                                                      <div className="col-sm-3">
                                                         <input type="date" className="form-control" id="" name="" />
                                                      </div>
                                                  </div>

                                                </div>
                                              </div>
                                              
                                               <hr />

                                              <div className="ReportMain1">
                                                <div className="row text-start Reportselect1">

                                                  <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Supplier Currency :
                                                      </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="Distance" name="Distance" />
                                                      </div>

                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        PO Type :
                                                      </label>
                                                      <div className="col-sm-3">
                                                         <select  id=""  className="form-select"  aria-label="Default select example">
                                                            <option selected>Select</option>
                                                         </select>
                                                      </div>
                                                  </div>

                                                   <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Conversion Factor.:
                                                      </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="" name="" />
                                                      </div>

                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Curr. Conversion Rate :
                                                      </label>
                                                      <div className="col-sm-3">
                                                         <input type="text" className="form-control" id="" name="" />
                                                      </div>
                                                  </div>

                                                  <div className="row mb-3">
                                                    <label htmlFor="" className="col-sm-2 col-form-label">
                                                      Basic Value HC :
                                                    </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="" name="" />
                                                      </div>

                                                    <label htmlFor="" className="col-sm-2 col-form-label">
                                                      Basic Value FC :
                                                    </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="" name="" />
                                                      </div>                                                     
                                                  </div>
                                                  
                                                   <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Discount Value HC :
                                                      </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="" name="" />
                                                      </div>

                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Discount Value FC :
                                                      </label>
                                                      <div className="col-sm-3">
                                                         <input type="text" className="form-control" id="" name="" />
                                                      </div>
                                                  </div>

                                                   <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Order Value HC :
                                                      </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="" name="" />
                                                      </div>

                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Order Value FC :
                                                      </label>
                                                      <div className="col-sm-3">
                                                         <input type="text" className="form-control" id="" name="" />
                                                      </div>
                                                  </div>

                                                   <div className="row mb-3">

                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Delivery Date :
                                                      </label>
                                                      <div className="col-sm-3">
                                                          <input type="date" className="form-control" id="" name="" />
                                                      </div>

                                                  </div>

                                                </div>
                                              </div>

                                            </div>
                                          )}
                                          {activeTab === "address" && (
                                            <div className="tab-pane active">

                                              <div className="ReportMain2 mt-2">
                                                <div className="row text-start Reportselect2">

                                                  <div className="row mb-3">
                                                      <div className="col-sm-3">
                                                         <button className="vndrbtn"> Supplier Address : </button>
                                                      </div>
                                                  </div>

                                                </div>
                                              </div>

                                              <div className="ReportMain2 mt-2">
                                                <div className="row text-start Reportselect2">

                                                  <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Line 1  :
                                                      </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="Distance" name="Distance" />
                                                      </div>

                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        City :
                                                      </label>
                                                      <div className="col-sm-3">
                                                         <select  id=""  className="form-select"  aria-label="Default select example">
                                                            <option selected>Select</option>
                                                         </select>
                                                      </div>
                                                  </div>

                                                   <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Line 2 :
                                                      </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="" name="" />
                                                      </div>

                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        State :
                                                      </label>
                                                      <div className="col-sm-3">
                                                         <input type="text" className="form-control" id="" name="" />
                                                      </div>
                                                  </div>

                                                  <div className="row mb-3">
                                                    <label htmlFor="" className="col-sm-2 col-form-label">
                                                     Line 3 :
                                                    </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="" name="" />
                                                      </div>

                                                    <label htmlFor="" className="col-sm-2 col-form-label">
                                                     Country :
                                                    </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="" name="" />
                                                      </div>                                                     
                                                  </div>
                                                  
                                                   <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                       Pin Code :
                                                      </label>
                                                      <div className="col-sm-3">
                                                          <input type="text" className="form-control" id="" name="" />
                                                      </div>

                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        GST In No :
                                                      </label>
                                                      <div className="col-sm-3">
                                                         <input type="text" className="form-control" id="" name="" />
                                                      </div>
                                                  </div>

                                                </div>
                                              </div>

                                              <hr />

                                              <div className="ReportMain2">
                                                <div className="row text-start Reportselect2">

                                                  <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        From Country  :
                                                      </label>
                                                      <div className="col-sm-2">
                                                        <select  id=""  className="form-select"  aria-label="Default select example">
                                                            <option selected>Select</option>
                                                         </select>
                                                      </div>
                                                      <div className="col-sm-2">
                                                          <input type="text" className="form-control" id="Distance" name="Distance" />
                                                      </div>


                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        To Country :
                                                      </label>
                                                      <div className="col-sm-2">
                                                         <select  id=""  className="form-select"  aria-label="Default select example">
                                                            <option selected>Select</option>
                                                         </select>
                                                      </div>
                                                      <div className="col-sm-2">
                                                          <input type="text" className="form-control" id="Distance" name="Distance" />
                                                      </div>
                                                  </div>
                                            
                                                  <div className="row">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        From State   :
                                                      </label>
                                                      <div className="col-sm-2">
                                                        <select  id=""  className="form-select"  aria-label="Default select example">
                                                            <option selected>Select</option>
                                                         </select>
                                                      </div>
                                                      <div className="col-sm-2">
                                                          <input type="text" className="form-control" id="Distance" name="Distance" />
                                                      </div>


                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        To State  :
                                                      </label>
                                                      <div className="col-sm-2">
                                                         <select  id=""  className="form-select"  aria-label="Default select example">
                                                            <option selected>Select</option>
                                                         </select>
                                                      </div>
                                                      <div className="col-sm-2">
                                                          <input type="text" className="form-control" id="Distance" name="Distance" />
                                                      </div>
                                                  </div>

                                                </div>
                                              </div>

                                              <hr />

                                              <div className="ReportMain2">
                                                  <div className="row mb-3">
                                                      <div className="form-check col-sm-2">
                                                        <input  className="form-check-input"  type="checkbox"  id=""  name=""/>
                                                        <label  className="form-check-label"  htmlFor="TDS_Rate"  >
                                                           Ship To Add :
                                                        </label>
                                                      </div>
                                                      <div className="col-sm-3">
                                                        <input  type="text" placeholder="ProduLink Engineers" className="form-control"  id=""  name=""/>
                                                      </div>
                                                  </div>
                                              </div>
                                              
                                            </div>
                                          )}
                                           {activeTab === "import" && (
                                            <div className="tab-pane active">

                                              <div className="ReportMain3 mt-2">
                                                <div className="row text-start Reportselect3">

                                                  <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Agent Code  :
                                                      </label>
                                                      <div className="col-sm-4">
                                                          <input type="text" placeholder="Agent Name" className="form-control" id="" name="" />
                                                      </div>
                                                  </div>

                                                  <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Consolidator  :
                                                      </label>
                                                      <div className="col-sm-4">
                                                          <input type="text" placeholder="Consolidator Name" className="form-control" id="" name="" />
                                                      </div>
                                                  </div>

                                                  <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Port Shipment  :
                                                      </label>
                                                      <div className="col-sm-2">
                                                         <select name="" className="form-select" id="">
                                                           <option value="">Select</option>
                                                         </select>
                                                      </div>
                                                  </div>

                                                   <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Destination Part :
                                                      </label>
                                                      <div className="col-sm-2">
                                                           <select name="" className="form-select" id="">
                                                           <option value="">Select</option>
                                                         </select>
                                                      </div>
                                                      <div className="col-sm-2">
                                                         <input type="text" className="form-control" id="" name="" />
                                                      </div>
                                                  </div>

                                                   <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Shipment Port :
                                                      </label>
                                                      <div className="col-sm-2">
                                                           <select name="" className="form-select" id="">
                                                           <option value="">Select</option>
                                                         </select>
                                                      </div>
                                                      <div className="col-sm-1">
                                                        <button className="vndrbtn"> <FaPlus /> </button> 
                                                      </div>
                                                      <div className="col-sm-2">
                                                         <input type="text" className="form-control" id="" name="" />
                                                      </div>
                                                  </div>

                                                  <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Terms Of Delivery :
                                                      </label>
                                                      <div className="col-sm-2">
                                                           <select name="" className="form-select" id="">
                                                           <option value="">Select</option>
                                                         </select>
                                                      </div>
                                                      <div className="col-sm-1">
                                                        <button className="vndrbtn"> <FaPlus /> </button> 
                                                      </div>
                                                      <div className="col-sm-2">
                                                         <input type="text" className="form-control" id="" name="" />
                                                      </div>
                                                       <div className="col-sm-1">
                                                        <button className="vndrbtn"> <GrPowerReset /> </button> 
                                                      </div>
                                                  </div>

                                                  <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Dispatch Mode :
                                                      </label>
                                                      <div className="col-sm-2">
                                                           <select name="" className="form-select" id="">
                                                           <option value="">Select</option>
                                                         </select>
                                                      </div>
                                                      <div className="col-sm-1">
                                                        <button className="vndrbtn"> <FaPlus /> </button> 
                                                      </div>
                                                      <div className="col-sm-2">
                                                         <input type="text" className="form-control" id="" name="" />
                                                      </div>
                                                  </div>

                                                  <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Payment Terms :
                                                      </label>
                                                      <div className="col-sm-2">
                                                           <select name="" className="form-select" id="">
                                                           <option value="">Select</option>
                                                         </select>
                                                      </div>
                                                      <div className="col-sm-1">
                                                        <button className="vndrbtn"> <FaPlus /> </button> 
                                                      </div>
                                                      <div className="col-sm-2">
                                                         <input type="text" className="form-control" id="" name="" />
                                                      </div>
                                                  </div>

                                                  <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Addvance Permitted :
                                                      </label>
                                                      <div className="col-sm-2">
                                                         <select name="" className="form-select" id="">
                                                           <option value="">Select</option>
                                                         </select>
                                                      </div>
                                                  </div>

                                                  <div className="row mb-3">
                                                    <label htmlFor="" className="col-sm-2 col-form-label">
                                                     Note :
                                                    </label>
                                                      <div className="col-sm-3">
                                                         <textarea className="form-control"> </textarea>
                                                      </div>

                                                    <label htmlFor="" className="col-sm-2 col-form-label">
                                                     Specification :
                                                    </label>
                                                      <div className="col-sm-3">
                                                          <textarea className="form-control"> </textarea>
                                                      </div>                                                     
                                                  </div>
                                                  
                                                   <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                         Kind Attendtion :
                                                      </label>
                                                      <div className="col-sm-3">
                                                         <textarea className="form-control"> </textarea>
                                                      </div>
                                                  </div>

                                                </div>
                                              </div>
                                              
                                            </div>
                                          )}
                                           {activeTab === "poAnnexure" && (
                                            <div className="tab-pane active">

                                              <div className="ReportMain3 mt-2">
                                                  <div className="row text-start Reportselect3">

                                                  </div>
                                              </div>
                                              
                                            </div>
                                          )}
                                           {activeTab === "termcondition" && (
                                            <div className="tab-pane active">

                                              <div className="ReportMain3 mt-2">
                                                <div className="row text-start Reportselect3">

                                                  <div className="row mb-3">
                                                      <label htmlFor="" className="col-sm-2 col-form-label">
                                                        Term Name :
                                                      </label>
                                                      <div className="col-sm-4">
                                                          <input type="text" placeholder="Agent Name" className="form-control" id="" name="" />
                                                      </div>
                                                      <div className="col-sm-1">
                                                        <button className="vndrbtn"> Search </button> 
                                                      </div>
                                                  </div>

                                                  <table className="table table-bordered table-responsive-sm mt-3">
                                                        <thead>
                                                          <tr className="text-start">
                                                            <th colSpan={"4"}> Selected PO Term And Condition </th>
                                                          </tr>
                                                          <tr>
                                                            <th>Sr.</th>
                                                            <th>Term Name</th>
                                                            <th>Term Desc</th>
                                                            <th>Del</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr>
                                                            <td>1</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                          </tr>
                                                        </tbody>
                                                  </table>
                                                 
                                                </div>
                                              </div>
                                              
                                            </div>
                                          )}
                                            {activeTab === "itemdetails" && (
                                            <div className="tab-pane active">

                                              <div className="ReportMain3 mt-2">
                                                <div className="row text-start Reportselect3">

                                                  <table className="table table-bordered table-responsive-sm mt-3">
                                                        <thead>
                                                          <tr>
                                                            <th>Item.</th>
                                                            <th>Item Desc</th>
                                                            <th>Rate</th>
                                                            <th>FC Rate</th>
                                                            <th>Disc%</th>
                                                            <th>SGST(%)</th>
                                                            <th>CGST(%)</th>
                                                            <th>IGST(%)</th>
                                                            <th>CESS(%)</th>
                                                            <th>Qty</th>
                                                            <th>Unit</th>
                                                            <th>Particular</th>
                                                            <th>Action</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr>
                                                            <td><input type="text" className="form-control" placeholder="Enter Item Code.." /> <br />
                                                              <button className="vndrbtn"> Search </button>
                                                            </td>
                                                            <td><textarea name="" className="form-control" id=""></textarea></td>
                                                            <td>
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                            <td> 
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                             <td> 
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                             <td> 
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                             <td> 
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                             <td> 
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                             <td> 
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                            <td>
                                                              <select name="" className="form-select" id="">
                                                                  <option value=""> Select </option>
                                                              </select>
                                                            </td>
                                                             <td> 
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                            <td><textarea name="" className="form-control" id=""></textarea></td>
                                                            <td> <button className="vndrbtn" >Add </button> </td>

                                                          </tr>
                                                        </tbody>
                                                  </table>

                                                  <table className="table table-bordered table-responsive-sm mt-3">
                                                        <thead>
                                                          <tr>
                                                            <th>Sr..</th>
                                                            <th>Item Code.</th>
                                                            <th>Description</th>
                                                            <th>Qty</th>
                                                            <th>Rate</th>
                                                            <th>Disc%</th>
                                                            <th>Packing</th>
                                                            <th>Transport</th>
                                                            <th>SubTotal</th>
                                                            <th>SGST</th>
                                                            <th>CGST</th>
                                                            <th>IGST</th>
                                                            <th>CESS</th>
                                                            <th>Particular</th>
                                                            <th>Action</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr>
                                                            <td>1</td>
                                                            <td>  </td>
                                                            <td><textarea name="" className="form-control" id=""></textarea></td>
                                                            <td>
                                                              <input type="text" className="form-control" />
                                                              <br />
                                                               <select name="" className="form-select" id="">
                                                                  <option value=""> Select </option>
                                                              </select>
                                                            </td>
                                                            <td> 
                                                              <button className="vndrbtn" > HC </button>
                                                              <input type="text" className="form-control" />
                                                              <button className="vndrbtn" > FC </button>
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                             <td> 
                                                              <input type="text" className="form-control" /> % 
                                                              <br />
                                                              <input type="text" className="form-control" />
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                            <td> 
                                                              <input type="text" className="form-control" /> % 
                                                              <br />
                                                              <input type="text" className="form-control" />
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                             <td> 
                                                              <input type="text" className="form-control" /> % 
                                                              <br />
                                                              <input type="text" className="form-control" />
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                             <td> 
                                                              <input type="text" className="form-control" />
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                             <td> 
                                                              <input type="text" className="form-control" /> % 
                                                              <br />
                                                              <input type="text" className="form-control" />
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                             <td> 
                                                              <input type="text" className="form-control" /> % 
                                                              <br />
                                                              <input type="text" className="form-control" />
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                             <td> 
                                                              <input type="text" className="form-control" /> % 
                                                              <br />
                                                              <input type="text" className="form-control" />
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                             <td> 
                                                              <input type="text" className="form-control" /> % 
                                                              <br />
                                                              <input type="text" className="form-control" />
                                                              <input type="text" className="form-control" />
                                                            </td>
                                                            <td><textarea name="" className="form-control" id=""></textarea></td>
                                                            <td> <button className="vndrbtn" > X </button> </td>

                                                          </tr>
                                                        </tbody>
                                                  </table>
                                                 
                                                </div>
                                              </div>
                                              
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      <div className="row text-start">
                                            <div className="col-sm-2"> 
                                               <button className="vndrbtn"> Save Purchase Order </button>
                                            </div>
                                            <div className="col-sm-2">
                                               <button className="vndrbtn"> Clear </button>
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


export default ImportPO;