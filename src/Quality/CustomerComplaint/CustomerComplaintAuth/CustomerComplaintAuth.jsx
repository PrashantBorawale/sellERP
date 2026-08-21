import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./CustomerComplaintAuth.css";

const CustomerComplaintAuth = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const handleCoustoterComplaintEntry = () => {
    navigate("/CustomerComplaintEntry"); 
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="CustomerComplaintAuthMaster">
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
                <div className="CustomerComplaintAuth mt-5">
                  <div className="CustomerComplaintAuth-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Customer Complaint Authorization : </h5>
                      </div>
                      
                     
                      <div className="col-md-8  text-end">
                        <button type="button" className="btn" onClick={handleCoustoterComplaintEntry} >
                        Customer Complaint New
                        </button>
                        <button type="button" className="btn" >
                         Export Excel
                        </button>

                      </div>
                    </div>
                  </div>

                  <div className="CustomerComplaintAuth-main mt-5">
                     
                  <div className="row text-start">
                     
                      <div className="col-md-2">
                            <label htmlFor="">Plant :</label>
                            <select name="" id="" className="form-control">
                                <option value="">Sharp</option>
                            </select>
                      </div>
                      <div className="col-md-2">
                            <label htmlFor="">From :</label>
                            <input type="date" className="form-control"/>
                      </div>
                      <div className="col-md-2">
                            <label htmlFor="">To :</label>
                            <input type="date" className="form-control"/>
                      </div>
                     
                      <div className="col-md-2">
                            <label htmlFor="">CustName :</label>
                            <input type="text" placeholder="Enter Name" className="form-control"/>
                      </div>
                      <div className="col-md-2">
                            <label htmlFor="">Item :</label>
                            <input type="text" placeholder="Select Item" className="form-control"/>
                      </div>
                      <div className="col-md-2 mt-4">
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


export default CustomerComplaintAuth