import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
// import "./ViewStock.css";

const ViewStock = () => {
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
    <div className={`view-stock ${sideNavOpen ? "side-nav-active" : ""}`}>
      <NavBar toggleSideNav={toggleSideNav} />
      <div className="main-container">
        <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
        <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
          <div className="content-area">
            <div className="row text-start mt-3">
              <div className="col-lg-2 col-md-3 col-12 submenu">
                <h4>Sub Menu</h4>
                <h6 className="portal-login">Portal Login!</h6>
                <ul className="submenu-links">
                  <li><Link to="/order-list">Order List</Link></li>
                  <li><Link to="/view-stack">View Stock</Link></li>
                  <li><Link to="/user-list">User List</Link></li>
                </ul>
              </div>
              <div className="col-lg-10 col-md-9 col-12 content mt-5">
                <div className="order-header mb-4 d-flex justify-content-between align-items-center">
                  <h5 className="header-title">Stock</h5>
                  <button type="button" className="btn export-btn">
                    Export To Excel
                  </button>
                </div>
                <div className="row mb-3">
                  <div className="col-md-2">
                    <input type="checkbox" />
                    <label>All Dealer</label>
                  </div>
                  <div className="col-md-2">
                    <input type="checkbox" />
                    <label>Select Dealer</label>
                  </div>
                  <div className="col-md-2">
                    <input type="checkbox" />
                    <label>Item Code</label>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-2">
                    <input className="form-control" />
                  </div>
                  <div className="col-md-2 mt-1">
                    <button type="button" className="btn btn-primary">Search</button>
                  </div>
                  <div className="col-md-2">
                    <input className="form-control" />
                  </div>
                  <div className="col-md-2 mt-1">
                    <button type="button" className="btn btn-primary">Search</button>
                  </div>
                </div>
                <table className="table table-bordered table-responsive-sm mt-3">
                  <thead>
                    <tr>
                      <th>Sr.</th>
                      <th>Customer Name</th>
                      <th>Item No</th>
                      <th>Item Description | Size</th>
                      <th>STOCK (NOS)</th>
                    </tr>
                  </thead>
                  <tbody>{/* Populate table rows here */}</tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewStock;
