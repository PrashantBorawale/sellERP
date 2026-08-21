import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./TestReportList.css";

const TestReportList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const handleTestReportNew = () => {
    navigate("/TestReportNew"); 
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="TestReportListMaster">
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
                <div className="TestReportList mt-5">
                  <div className="TestReportList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Test Report List : </h5>
                      </div>
                      
                     
                      <div className="col-md-8  text-end">
                        <button type="button" className="btn" onClick={handleTestReportNew} >
                         Add New
                        </button>
                      </div>
                      
                    </div>
                  </div>

                  <div className="TestReportList-main mt-5">
                     
                  <div className="row text-start">
                     
                      <div className="col-md-2">
                            <label htmlFor="">From :</label>
                            <input type="date" className="form-control"/>
                      </div>
                      <div className="col-md-2">
                            <label htmlFor="">To :</label>
                            <input type="date" className="form-control"/>
                      </div> 
                    
                      <div className="col-md-1 mt-4">
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


export default TestReportList