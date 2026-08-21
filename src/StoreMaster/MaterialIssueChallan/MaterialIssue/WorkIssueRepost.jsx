import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const WorkIssueRepost = () => {

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
    <div className="NewStoreWorkOrderMaterial">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="Main-NavBar">
            <NavBar toggleSideNav={toggleSideNav} />
            <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
            <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
              <div className="WorkOrderMaterial-header mb-4 text-start mt-5">
                    <div className="row align-items-center">
                  <div className="col-md-4">
                    <h5 className="header-title text-start">
                      Work Order Material Issue Report 
                    </h5>
                  </div>

                  <div className="col-md-8 text-end">
                   
                        <Link className="btn">Export To Excel</Link>
                      </div>
                   
                </div>
              </div>
              <div className="WorkOrderMaterial-main">
                <div className="container-fluid">
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <form className="row g-3 text-start">
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

                        {/* Plant */}
                        <div className="col-md-1 col-sm-6">
                          <label className="form-label">Plant</label>
                          <select className="form-select">
                            <option value="">Produlink</option>
                          </select>
                        </div>

                        {/* Series */}
                        <div className="col-md-1 col-sm-6">
                          <label className="form-label">Series</label>
                          <select className="form-select">
                            <option value="">Select</option>
                            <option value="WorkOrder">WorkOrder</option>
                          </select>
                        </div>

                        {/* Report Type */}
                        <div className="col-md-1 col-sm-6">
                          <label className="form-label">Report Type</label>
                          <select className="form-select">
                            <option value="Details">Details</option>
                            <option value="Cumulative">Cumulative</option>
                          </select>
                        </div>

                        {/* Is Pending */}
                        <div className="col-md-1 col-sm-6">
                          <label className="form-label">Is Pending</label>
                          <select className="form-select">
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>

                          </select>
                        </div>

                        {/* Item */}
                        <div className="col-md-2 col-sm-6">
                          <label className="form-label">Item</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Item Name"
                          />
                        </div>

                        {/* Main Group */}
                        <div className="col-md-1 col-sm-6">
                          <label className="form-label">Main Group</label>
                          <select className="form-select">
                            <option value="">ALL</option>
                            <option value="FG">FG</option>
                            <option value="RM">RM</option>
                            <option value="Tools">Tool</option>
                            <option value="Instrument">Instrument</option>
                            <option value="Machine">Machine</option>
                            <option value="Consumable">Consumable</option>
                            <option value="Safety Equ">Safety Equ</option>
                            <option value="Service">Service</option>
                            <option value="Asset">Asset</option>
                            <option value="F4">F4</option>
                            <option value="Scrap">Scrap</option>
                            <option value="SF">SF</option>
                            <option value="BO">BO</option>
                            <option value="DI">DI</option>
                          </select>
                        </div>

                        {/* Work Order Number */}
                        <div className="col-md-2 col-sm-6">
                          <label className="form-label">WorderNo:</label>
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

                <div className="StoreWorkOrderMaterial">
                  <div className="container-fluid mt-4 text-start">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>No Data Found!!</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Table rows will go here */}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="container-fluid mt-4 text-start">
                    <div className="row">
                      <div className="col-md-3">
                        <p>Total Records: 0</p>
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

export default WorkIssueRepost
