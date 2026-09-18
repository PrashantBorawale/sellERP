import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import './BreakdownTimeEntry.css';
const BreakdownTimeEntry = () => {
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
    <div className="BreakdownTimeEntryMaster">
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
              {/* <div className="BreakdownTimeEntry mt-5">
                  <div className="BreakdownTimeEntry-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Breakdown Analysis</h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn" to="#/">
                           Export To Excel
                        </button>
                        
                      </div>
                    </div>
                  </div>
  
                  <div className="BreakdownTimeEntry-Main">
                    <div className="container-fluid">
                      <div className="row g-3 text-start">
                                             <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Plant :</label>
                          <select className="form-select">
                            <option>Sharp</option>
                            <option>Select All</option>
                            <option>Select All</option>
                            <option>Select All</option>
                          </select>
                        </div>

                        
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        
                                               <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>To :</label>
                          <input type="date" className="form-control" />
                        </div>

  
                        
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label> Machine :</label>
                          <select className="form-select">
                            <option>Select All</option>
                            <option>Select All</option>
                            <option>Select All</option>
                          </select>
                        </div>
  
                        <div className="col-sm-2 col-md-2 col-lg-1">
                        <button type="button" className="btn" style={{marginTop:"31px"}}>
                            Search
                        </button>   
                        </div>
                     </div>
                    </div>
                  </div>
          
                </div> */}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreakdownTimeEntry
