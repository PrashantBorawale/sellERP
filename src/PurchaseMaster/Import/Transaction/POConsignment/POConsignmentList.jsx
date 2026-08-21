import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../../NavBar/NavBar";
import SideNav from "../../../../SideNav/SideNav";
import { Link } from "react-router-dom";

const POConsignmentList = () => {
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
                                                <h5 className="header-title">PO Consignment List</h5>
                                            </div>
                                          
                                            <div className="col-md-8 text-end">
                                                <Link className="vndrbtn" to={"/"}> Excel TO Export </Link>
                                          </div>
                                      </div>
                                    </div>
                                  </div>

                                   <div className="ReportMain">
                                     
                                      <div className="container-fluid">
                                         
                                                <div className="row mt-4">
                                                    <div className="col-md-12">
                                                        <form className="row g-3 text-start">
                                                            {/* Plant */}
                                                            <div className="col-md-2 col-sm-6">
                                                            <label className="form-label">Plant</label>
                                                            <select className="form-select">
                                                            <option value="Produlink">Produlink</option>
                                                            {/* Add more options here */}
                                                            </select>
                                                        </div>
                                                        
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

                                                        <div className="col-md-2 col-sm-6">
                                                            <label className="form-label"> PO Status :</label>
                                                            <select className="form-select">
                                                            <option value=" ">All</option>
                                                            {/* Add more options here */}
                                                            </select>
                                                        </div>

                                                        {/* Search Button */}
                                                        <div className="col-md-2 col-sm-6 mt-1 align-self-end">
                                                            <button type="submit" className="vndrbtn w-100">
                                                            Search
                                                            </button>
                                                        </div>
                                                        <div className="col-md-2 col-sm-6 mt-1 align-self-end">
                                                            <button type="submit" className="vndrbtn w-100">
                                                            Search Option
                                                            </button>
                                                        </div>

                                                        </form>
                                                    </div>
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


export default POConsignmentList;