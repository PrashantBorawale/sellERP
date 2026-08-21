import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./Dcgrnlist.css";

const Dcgrnlist = () => {
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
    <div className="NewStoreRMStock">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="Main-NavBar">
            <NavBar toggleSideNav={toggleSideNav} />
            <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
            <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
              <div className="RMStock-header">
                <div className="row flex-nowrap align-items-center">
                  <div className="col-md-4">
                    <h5 className="header-title text-start">
                      DC GRN List
                    </h5>
                  </div>

                  <div className="col-md-9 text-end">
                    <div className="row justify-content-end">
                      <div className="col-md-8 d-flex align-items-end">
                      
                      <Link className="pobtn">Export To Excel</Link>
                        <Link className="pobtn">DCGRN-Query</Link>
                      
                      


                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="RMStock-main">
                <div className="container-fluid">
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <form className="row g-3 text-start">

                         {/* Plant */}
                         <div className="col-md-1 col-sm-6">
                          <label className="form-label">Plant</label>
                          <select className="form-select">
                            <option value="Produlink">Produlink</option>
                            {/* Add more options here */}
                          </select>
                        </div>


                        {/* From Date */}
                        <div className="col-md-1 col-sm-6">
                          <label className="form-label">From Date</label>
                          <input type="date" className="form-control" />
                        </div>

                        {/* To Date */}
                        <div className="col-md-1 col-sm-6">
                          <label className="form-label">To Date</label>
                          <input type="date" className="form-control" />
                        </div>

                    

                        {/* Item Name */}
                        <div className="col-md-2 col-sm-6">
                          <label className="form-label">Supplier Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Item Name"
                          />
                        </div>


                        {/* Item Name */}
                        <div className="col-md-2 col-sm-6">
                          <label className="form-label">Item Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Item Name"
                          />
                        </div>

                       

                        {/* Search Button */}
                        <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                          <button type="submit" className="pobtn w-100">
                            Search
                          </button>
                         
                        </div>
                        
                      </form>
                    </div>
                  </div>
                </div>

                <div className="StoreRMStock">
                  <div className="container-fluid mt-4 text-start">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Sr</th>
                            <th>Year</th>
                            <th>##</th>
                            <th>GRN Type</th>
                            <th>GRN No.</th>
                            <th>GRN Date</th>
                           
                            <th>Challan No</th>
                            <th>Challan Date</th>
                            <th>Code</th>
                           
                            <th>Supplier Name</th>
                            <th>User</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
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

export default Dcgrnlist
