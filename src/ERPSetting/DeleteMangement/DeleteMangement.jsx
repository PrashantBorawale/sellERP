import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./DeleteMangement.css";

const DeleteMangement = () => {
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
    <div className={`delete-management ${sideNavOpen ? "side-nav-active" : ""}`}>
      <NavBar toggleSideNav={toggleSideNav} />
      <div className="delete-container">
        <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
        <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
          <div className="content-area">
            <div className="row text-start">
              <div className="col-lg-2 col-md-3 col-12 submenu">
                <h4>Sub Menu</h4>
                <h6 className="portal-login">Portal Login!</h6>
                <ul className="submenu-links">
                  <li><Link to="/order-list">Order List</Link></li>
                  <li><Link to="/view-stack">View Stock</Link></li>
                  <li><Link to="/user-List">User List</Link></li>
                </ul>
              </div>
              <div className="col-lg-10 col-md-8 col-12 content">
                {/* Your main content goes here */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DeleteMangement;
