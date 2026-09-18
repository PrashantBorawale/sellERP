import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "../NewSetupApproval.css";

const SetupList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/NewSetupApproval");
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="ProductionEntryMaster">
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
                <div className="ProductionEntry mt-5">
                  <div className="ProductionEntry-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">Set Up Approval List</h5>
                      </div>
                     
                      <div className="col-md-6 text-end">
                        <button type="button" className="btn" onClick={handleNavigate}>
                         New Approval 
                        </button>
                        <button type="button" className="btn">
                          Export Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="ProductionEntry-main mt-5">
        
                    <div className="row g-3 text-start">
                      <div className="col-sm-6 col-md-2 col-lg-2">
                        <label>Date From :</label>
                        <input type="date" className="form-control" />
                      </div>

                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label>Date To:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label>Shift:</label>
                          <select name="" className="form-control"  >
                              <option>Select</option>
                              <option></option>
                              <option></option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-2">
                        <label>Machine :</label>
                        <select name="" className="form-control"  >
                        <option>Select </option>
                                  <option>AY-CGR1 | CENTERLESS GRIDING 1 </option>
                                  <option>AY-CGR1 | CENTERLESS GRIDING 2</option>
                                  <option>AY-D7 | DRILLING 7</option>
                                  <option>AY-D7 | DRILLING 8 </option>
                                  <option>AY-M3 | MILLING 3 </option>
                                  <option>AY-SO1 | SECOND OPERATION AY 1 </option>
                                  <option>AY-SO2 | SECOND OPERATION AY 2 </option>
                                  <option>AY-SO3 | SECOND OPERATION AY 3 </option>
                                  <option>AY-T-1 | TROUB 25 1 </option>
                                  <option>AY-T-10 | TROUB 25 10 </option>
                                  <option>AY-T-11 | TROUB 25 11 </option>
                                  <option>AY-T-12 | TROUB 25 12 </option>
                                  <option>AY-T-13 | TROUB 25 13 </option>
                                  <option>AY-T-2 | TROUB 25 2 </option>
                                  <option>AY-T-3 | TROUB 25 3 </option>
                                  <option>AY-T-4 | TROUB 25 4 </option>
                                  <option>AY-T-5 | TROUB 25 5 </option>
                                  <option>AY-T-6 | TROUB 25 6 </option>
                          </select>
                      </div>
                       
                        <div className="col-sm-6 col-md-2 col-lg-2">
                        <label  type="checkbox">Item Desc:</label>
                       <input type="text"  placeholder=" Item Code" className="form-control"/>
                      </div>

                    <div className="col-6 col-md-1 mt-5">
                    <button type="button" className="btn btn-primary w-100" >
                        Search
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

export default SetupList