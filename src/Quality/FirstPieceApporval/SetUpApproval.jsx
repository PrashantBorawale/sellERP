import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
// import './PDIList.css';
// import { TbMapNorth } from "react-icons/tb";
// import { WiDirectionRight } from "react-icons/wi";

const SetUpApproval = () => {
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
    <div className="ProductionReportMaster">
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
                <div className="ProductionReport mt-5">
                  <div className="ProductionReport-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title"> Set Up Approval Parameter </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button type="button" className="btn">
                          Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="ProductionReport-filter mb-4">
                    <div className="row text-start">
                      
                      <div className="col-md-2">
                        <label>Operation :</label> 
                        <select className="form-select" >
                          <option value="">Select</option>
                          <option value="">Assembly</option>
                          <option value="">Bending</option>
                          <option value="">Black Plating</option>
                          <option value="">Blockdising</option>
                          <option value="">Ced Coating</option>
                          <option value="">Chaking</option>
                          <option value="">Chamfer 1X45</option>
                          <option value="">Chamfer 2</option>
                          <option value="">Chamfer 3</option>
                          <option value="">Chamfer 2</option>
                          <option value="">Chamfring </option>
                          <option value="">Checking </option>
                          
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label>Group :</label>
                        <select className="form-select" >
                          <option value="">Select</option>
                          <option value="">Machine</option>
                          <option value="">Machine (Mass Belt Furness)</option>
                          <option value="">Nozel Used</option>
                          <option value="">Tool</option>
                          <option value="">Operator</option>
                          <option value="">Other Activity</option>
                         
                        </select>
                      </div>

                      <div className="col-md-2 margin-5">
                        <label>Parameter :</label>
                        <input type="text"  placeholder=" " className="form-control"/>
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                      <label htmlFor="">Specifications</label>
                      <textarea name="message" id=""> </textarea>
                      </div>        

                      <div className="col-md-1 mt-4">               
                         <button className="btn btn-primary">Add</button>          
                      </div>
                      <div className="col-md-2 mt-4">               
                         <button className="btn btn-primary">Copy Parameter</button>          
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

export default SetUpApproval