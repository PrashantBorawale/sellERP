import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./CustomerComplaintEntry.css";

const CustomerComplaintEntry = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const handleCoustoterComplaintList = () => {
    navigate("/CustomerComplaintList"); 
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="CustomerComplaintEntryMaster">
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
                <div className="CustomerComplaintEntry mt-5">
                  <div className="CustomerComplaintEntry-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <h5 className="header-title">New. Complaint Entry  &nbsp;&nbsp;&nbsp; Plant : </h5>
                      </div>
                      <div className="col-md-1">
                            <select name="" id="">
                                <option value="">SHARP</option>
                            </select>
                      </div>
                     
                      <div className="col-md-8   text-end">
                        <button type="button" className="btn" onClick={handleCoustoterComplaintList}>
                        Customer Complaint List
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="CustomerComplaintEntry-main mt-5">
                     
                  <div className="row text-start">
                      <div className="col-md-3">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="prod-no">Series  :</label>
                          </div>
                          <div className="col-8 d-flex align-items-center">
                          <select name="" id="" className="form-control">
                                <option value="">Select</option>
                                <option value="">Customer</option>
                                <option value="">Internal</option>
                                <option value=""> SubCon </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Customer No:</label>
                          </div>
                          <div className="col-6">
                          <input type="text" placeholder=" No "  className="form-control"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="row text-start">
                      <div className="col-md-3">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="prod-no">Complaint Date  :</label>
                          </div>
                          <div className="col-8 d-flex align-items-center">
                          <input type="date" placeholder=" No "  className="form-control"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Type :</label>
                          </div>
                          <div className="col-6">
                           <select name="" id="" className="form-control">
                                <option value="">Select</option>
                                <option value="">Internal</option>
                                <option value=""> External </option>
                            </select>
                          </div>
                        </div>
                      </div>
                        <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Deparment :</label>
                          </div>
                          <div className="col-6">
                           <select name="" id="" className="form-control">
                                <option value="">Select</option>
                                <option value="">Ayush</option>
                                <option value=""> IT </option>
                                <option value=""> Production </option>
                                <option value=""> Purchase </option>
                                <option value=""> Quality </option>
                                <option value=""> Quality Control </option>
                                <option value=""> Shakambari </option>
                                <option value=""> Store </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row text-start">
                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Customer Name :</label>
                          </div>
                          <div className="col-8">
                          <input type="text" placeholder=" Enter Customer Name "  className="form-control"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row text-start">
                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Item No | Desc :</label>
                          </div>
                          <div className="col-8">
                          <input type="text" placeholder=" Select Item "  className="form-control"/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row text-start">
                      <div className="col-md-3">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Dispatch :</label>
                          </div>
                          <div className="col-6">
                          <input type="text" placeholder="  "  className="form-control"/>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Reject Qty :</label>
                          </div>
                          <div className="col-6">
                          <input type="text" placeholder=" "  className="form-control"/>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                      <div className="row mb-2">
                        <div className="col-3">
                          <input type="text" placeholder=" Prefix"  className="form-control"/>
                          </div>
                          <div className="col-3">
                          <input type="text" placeholder=" Document No "  className="form-control"/>
                          </div>
                          <div className="col-3">
                          <input type="text" placeholder=" Suffix"  className="form-control"/>
                          </div>
                      </div>
                      </div>
                    </div>

                    <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="prod-no">Section  :</label>
                          </div>
                          <div className="col-8 d-flex align-items-center">
                              <textarea name="" id="" placeholder="Enter Complaint Details" className="form-control"></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Complaint Details :</label>
                          </div>
                          <div className="col-8">
                          <textarea name="" id="" placeholder="Enter Complaint Details" className="form-control"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="prod-no">Action Taken  : <br /> (cause side) </label>
                          </div>
                          <div className="col-8 d-flex align-items-center">
                              <textarea name="" id="" placeholder="Enter Action Taken" className="form-control"></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Action Taken  : <br /> (Inspection side) </label>
                          </div>
                          <div className="col-8">
                          <textarea name="" id="" placeholder="Enter Action Taken" className="form-control"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="prod-no">Validation  :</label>
                          </div>
                          <div className="col-8 d-flex align-items-center">
                              <textarea name="" id="" placeholder=" " className="form-control"></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Action Done :</label>
                          </div>
                          <div className="col-8">
                          <textarea name="" id="" placeholder=" " className="form-control"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="prod-no">Root Cause  :</label>
                          </div>
                          <div className="col-8 d-flex align-items-center">
                              <textarea name="" id="" placeholder=" " className="form-control"></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Remark :</label>
                          </div>
                          <div className="col-8">
                          <textarea name="" id="" placeholder=" " className="form-control"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="prod-no">8D Submit Date  :</label>
                          </div>
                          <div className="col-4 d-flex align-items-center">
                          <input type="date" placeholder=" No "  className="form-control"/>  
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">8D Close Date :</label>
                          </div>
                          <div className="col-4">
                          <input type="date" placeholder=" No "  className="form-control"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="prod-no">Complaint Closed :</label>
                          </div>
                          <div className="col-4 d-flex align-items-center">
                             <select name="" id="" className="form-control">
                                <option value="">Yes</option>
                                <option value="">No</option>
                             </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Closed Date :</label>
                          </div>
                          <div className="col-4">
                          <input type="date" placeholder=" No "  className="form-control"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="prod-no">Target Date :</label>
                          </div>
                          <div className="col-4 d-flex align-items-center">
                          <input type="date" placeholder="  "  className="form-control"/>  
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Complaint For :</label>
                          </div>
                          <div className="col-4">
                          <select name="" id="" className="form-control">
                                <option value="">Select</option>
                                <option value="">Fitment</option>
                                <option value="">Function</option>
                                <option value="">Aesthetic</option>
                                <option value="">Safety</option>
                                <option value="">Less  Qty</option>
                             </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="prod-no">Prepared By :</label>
                          </div>
                          <div className="col-8 d-flex align-items-center">
                          <input type="text" placeholder=" "  className="form-control"/>  
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Approved By :</label>
                          </div>
                          <div className="col-8">
                          <input type="text" placeholder=" "  className="form-control"/>
                          </div>
                        </div>
                      </div>
                    </div>
                     
                    <div className="row text-start">
                        <div className="col-md-3">
                           <button type="button" className="btn btn-primary w-100" >
                              Save Complaint
                           </button> 
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


export default CustomerComplaintEntry