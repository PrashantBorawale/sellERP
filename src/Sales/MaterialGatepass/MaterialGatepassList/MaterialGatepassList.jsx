import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import "./MaterialGatepassList.css";


const MaterialGatepassList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
    const navigate = useNavigate();  
    
      const handleButtonClick = () => {
        navigate('/MaterialGatepassNew'); 
      };
   
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
    <div className="MaterialGatepassListMaster">
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
                <div className="MaterialGatepassList mt-5">
                  <div className="MaterialGatepassList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Material Gatepass List </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn" onClick={handleButtonClick}>
                          New Material Gatepass 
                        </button>
                        </div>
                
                    </div>
                  </div>


                    <div className="MaterialGatepassList-main">

                        <div className="row text-start mt-3">
                        <div className="col-3">
                           <div className="row">
                               <div className="col-md-4 mt-2">
                                  <label htmlFor="">From Date :</label>
                               </div>
                               <div className="col-md-8">
                                  <input type="date" className="form-control" placeholder="1"/>
                               </div>
                           </div>
                        </div>
                        <div className="col-3">
                           <div className="row">
                               <div className="col-md-4 mt-2">
                                  <label htmlFor="">To Date:</label>
                               </div>
                               <div className="col-md-8">
                                  <input type="date" className="form-control" placeholder=""/>
                               </div>
                          </div>
                        </div>
                     
                        <div className="col-1 mt-2">  
                            <button type="button" className="btn btn-primary">
                                    Search
                            </button>
                        </div>
                          
                        </div>

                    </div>


                  <div className="MaterialGatepassList-main mt-5">
                    <div className="MaterialGatepassList-tabs">
                        <div className="row text-start">
                            <div className="col-12">
                                <span>No Data Found !</span>
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


export default MaterialGatepassList