import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./MrnList.css";

const MRNList = () => {

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
    <div className="NewStoreGateInward">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="GateInward-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">
                        MRN List
                      </h5>
                    </div>

                    <div className="col-md-9 text-end">
                      {/* <div className="row justify-content-end">
                        <div className="col-md-4 d-flex align-items-end">  */}
                          <Link className="vndrbtn">Export Excel</Link>
                        
                          <Link className="vndrbtn" to={"/MRNQuery"}>MRN - Query</Link>
                        {/* </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="GateInward-main mt-3">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="row g-3 text-start">
                          {/* From Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">From Date</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* To Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">To Date</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* Plant */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          {/* Series */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Series</label>
                            <select className="form-select">
                              <option value="">Select Series</option>
                              <option value="PurchaseGRN">Purchase GRN</option>
                              <option value="ScheduleGRN">Schedule GRN</option>
                              <option value="ImportGRN">Import GRN</option>
                              <option value="57F4GRN">57F4 GRN</option>
                              <option value="jobworkGRN">jobwork GRN</option>
                              <option value="DC GRN">DC GRN</option>
                              <option value="InterStoreInvoice">Inter Store Invoice</option>
                              <option value="InterStoreChallan">Inter Store Challan</option>
                              <option value="Sales Return">Sales Return</option>
                              <option value="DirectGRN">Direct GRN</option>
                              <option value="General/Document/Courier">General/Document/Courier</option>
                            </select>
                          </div>

                        

                          {/* Supplier Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Item Code</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Supplier Name"
                            />
                          </div>

                          {/* Item Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">MRN No</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Item Name"
                            />
                          </div>

                         {/* Plant */}
                         <div className="col-md-2 col-sm-6">
                            <label className="form-label">Issue Status</label>
                            <select className="form-select">
                              <option value="Produlink">All</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                           <div className="col-md-2 col-sm-6">
                            <label className="form-label">Auth Status</label>
                            <select className="form-select">
                              <option value="Produlink">All</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          {/* Search Button */}
                          <div className="col-md-2 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="vndrbtn w-100">
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreGateInward">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Year</th>
                              <th>Plant</th>
                              <th>MRN No</th>
                              <th>MRN Date</th>                      
                              <th>Item Details</th>
                              <th>Work Order No</th>
                              <th>User</th>
                              <th>Info</th>
                              <th>Auth 1</th>
                              <th>Edit</th>                
                              <th>Delete</th>
                              <th>View</th>
                              <th>Close</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Table rows will go here */}
                          </tbody>
                        </table>
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

export default MRNList
