import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import { Link } from "react-router-dom";
import "./Importfile.css";

const Importfile = () => {
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

    const [showTransaction, setShowTransaction] = useState(false);
    const [showReports, setShowReports] = useState(false);
  
        const toggleTransaction = () => {
            setShowTransaction(!showTransaction);
        };
        const toggleReports = () => {
            setShowReports(!showReports);
        };  

    return (

      <div className={`delete-management ${sideNavOpen ? "side-nav-active" : ""}`}>
        <NavBar toggleSideNav={toggleSideNav}  />

        <div className="delete-container">
          <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />

          <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>

            <div className="content-area">
              <div className="row text-start">

                <div className="col-lg-2 col-md-3 col-12 submenu">
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
                  {/* Your main content goes here */}
                </div>

              </div>
            </div>

          </main>

        </div>

      </div>

    );
};

export default Importfile