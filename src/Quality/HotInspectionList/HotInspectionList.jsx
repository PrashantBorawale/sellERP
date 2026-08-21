import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./HotInspectionList.css";

const HotInspectionList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/NewHotInspection");
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="HotInspectionListMaster">
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
                <div className="HotInspectionList mt-5">
                  <div className="HotInspectionList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">Hot Inspection List</h5>
                      </div>
                     
                      <div className="col-md-6 text-end">
                        <button type="button" className="btn" onClick={handleNavigate}>
                         New Hot Inspection 
                        </button>

                      </div>
                    </div>
                  </div>

                  <div className="HotInspectionList-main mt-5">
        
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
                          <label>  Item Code | Name:</label>
                       <input type="text"  placeholder=" Item Code | No | Name " className="form-control"/>
                        </div>
                       
                        <div className="col-sm-6 col-md-2 col-lg-2">
                        <label  type="checkbox">Hot Inspection No:</label>
                       <input type="text"  placeholder=" " className="form-control"/>
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

export default HotInspectionList