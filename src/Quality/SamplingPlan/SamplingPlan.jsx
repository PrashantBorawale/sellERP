import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./SamplingPlan.css";

const SamplingPlan = () => {
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
    <div className="SamplingPlanMaster">
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
                <div className="SamplingPlan mt-5">
                  <div className="SamplingPlan-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">Sampling Plan</h5>
                      </div>
                     
                      <div className="col-md-6 text-end">
                       

                      </div>
                    </div>
                  </div>

                  <div className="SamplingPlan-main mt-5">
        
                    <div className="row g-3 text-start">

                       <div className="col-sm-6 col-md-2 col-lg-2">
                          <label> <b>Heat No</b> OPName</label>
                            <select name="" id="" className="form-control">
                                <option value="">All</option>
                                <option value="">Assmably</option>
                                <option value="">Bending</option>
                                <option value="">Black Planting</option>
                                <option value="">Blockdising</option>
                                <option value="">CED Coating</option>
                                <option value="">Chaking</option>
                                <option value="">Chamfer 1X45</option>
                                <option value="">Chamfer 2</option>
                                <option value="">Chamfer 3</option>
                                <option value="">Chamfring</option>
                                <option value="">Chacking</option>
                                <option value="">CNC-1</option>
                                <option value="">CNC-2</option>
                                <option value="">CNC-3</option>
                                <option value="">CNC-4</option>
                                <option value="">Cold Forging</option>
                                <option value="">Cross Hole</option>
                                <option value="">Cute Blank</option>
                                <option value="">CYL Grinding</option>
                            </select>
                        </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                        <label>Date From :</label>
                        <input type="date" className="form-control" />
                      </div>

                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label>Date To:</label>
                          <input type="date" className="form-control" />
                        </div>
                       
                        <div className="col-sm-6 col-md-2 col-lg-2">
                        <label  type="checkbox">Sample Size:</label>
                       <input type="text"  placeholder=" " className="form-control"/>
                      </div>

                    <div className="col-6 col-md-1 mt-5">
                    <button type="button" className="btn btn-primary w-100" >
                        Save
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

export default SamplingPlan