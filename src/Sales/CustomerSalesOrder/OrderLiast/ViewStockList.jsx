import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './OrderLiast.css';
import { useNavigate } from "react-router-dom";


const ViewStockList = () => {
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

  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/NewSalesOrder");
  };


  return (
    <div className="OrderLiastMaster">
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
                <div className="OrderLiast">
                  <div className="OrderLiast-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> View Stock </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className=" vndrbtn">
                          Export To Excel
                        </button>
                        <button
                          className="vndrbtn  me-2"
                          aria-label="Close"
                          onClick={handleClose} >
                          X </button>
                      </div>
                    </div>
                  </div>


                  {/* Filter Section */}
                  <div className="OrderLiast-filter">
                    <div className="row text-start">

                      <div className="col-md-3 d-flex align-items-center gap-3">
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <label style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: 0 }}>
                            <input type="radio" name="dealer" />
                            All Dealer
                          </label>
                          <label style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: 0 }}>
                            <input type="radio" name="dealer" />
                            Select Dealer
                          </label>
                        </div>

                        <input type="text" placeholder="Enter Name..." className="form-control" />
                      </div>

                      <div className="col-md-1" style={{ marginTop: "30px" }}>
                        <button className=" vndrbtn">Search</button>
                      </div>

                      <div className="col-md-2">
                        <label>Item Code</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="col-md-1" style={{ marginTop: "30px" }}>
                        <button className=" vndrbtn">Search</button>
                      </div>

                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="OrderLiast-Main">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Cust Name</th>
                            <th>Item No</th>
                            <th>Item Desc | Size</th>
                            <th>Stock (NOS)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Example Row */}
                          <tr>
                            <td>1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          {/* Additional rows can be added dynamically here */}
                        </tbody>
                      </table>
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


export default ViewStockList