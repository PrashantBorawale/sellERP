import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./CustomerComplaintList.css";

const CustomerComplaintList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
    <div className="CustomerComplaintListMaster">
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
                <div className="CustomerComplaintList mt-5">
                  <div className="CustomerComplaintList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Customer Complaint List : </h5>
                      </div>
                      
                     
                      <div className="col-md-6  text-end">
                          <div className="dropdown">
                            <button type="button" className="btn" onClick={toggleDropdown}>
                                CAPA Report
                            </button>

                              {isOpen && (
                                <ul className="dropdown-menu">
                                <li><a href="#/"> Customer Complaint Register 1</a></li>
                                <li><a href="#/"> Customer Complaint Register 2</a></li>
                                <li><a href="#/"> Internal Failure Register</a></li>
                                <li><a href="#/"> Subcon Failure Register </a></li>
                                <li><a href="#/"> Excel Report </a></li>
                                </ul>
                              )}
                            </div>
                      </div>
                      <div className="col-md-2">
                      <button type="button" className="btn" onClick={handleCoustoterComplaintEntry} >
                        Customer Complaint New
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="CustomerComplaintList-main mt-5">
                     
                  <div className="row text-start">
                     
                      <div className="col-md-1">
                            <label htmlFor="">Plant :</label>
                            <select name="" id="" className="form-control">
                                <option value="">Sharp</option>
                            </select>
                      </div>
                      <div className="col-md-1">
                            <label htmlFor="">From :</label>
                            <input type="date" className="form-control"/>
                      </div>
                      <div className="col-md-1">
                            <label htmlFor="">To :</label>
                            <input type="date" className="form-control"/>
                      </div>
                      <div className="col-md-1">
                            <label htmlFor="">Series :</label>
                            <select name="" id="" className="form-control">
                                <option value="">All</option>
                                <option value="">Customer</option>
                                <option value="">Internal</option>
                                <option value="">Subcon</option>
                            </select>
                      </div>
                      <div className="col-md-1">
                            <label htmlFor="">Type :</label>
                            <select name="" id="" className="form-control">
                                <option value="">All</option>
                                <option value="">Internal</option>
                                <option value="">External</option>
                            </select>
                      </div>
                      <div className="col-md-1">
                            <label htmlFor="">Status :</label>
                            <select name="" id="" className="form-control">
                                <option value="">All</option>
                                <option value="">Panding</option>
                                <option value="">Inprocess</option>
                                <option value="">Completed</option>
                            </select>
                      </div>
                      <div className="col-md-1">
                            <label htmlFor="">CustName :</label>
                            <input type="text" placeholder="Enter Name" className="form-control"/>
                      </div>
                      <div className="col-md-1">
                            <label htmlFor="">Item :</label>
                            <input type="text" placeholder="Select Item" className="form-control"/>
                      </div>
                      <div className="col-md-1 mt-4">
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

export default CustomerComplaintList