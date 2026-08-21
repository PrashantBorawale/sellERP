
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./JobworkDCList.css";
import { useNavigate } from 'react-router-dom';


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>


const JobworkDCList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/DChallan');
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
    <div className="JobworkDCListMaster">
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
                <div className="JobworkDCList">
                  <div className="JobworkDCList-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> Jobwork DC List </h5>
                      </div>

                      <div className="col-md-8 text-end">
                        <button type="button" className=" vndrbtn" to="#/" onClick={handleButtonClick}>
                          New Jobwork DC
                        </button>
                      </div>

                    </div>
                  </div>

                  <div className="JobworkDCList-Main">
                    <div className="container-fluid">

                      <div className="row g-3 text-start">

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>From:</label>
                          <input type="date" className="form-control mt-2" />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>To:</label>
                          <input type="date" className="form-control mt-2" />
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-2">
                          <div className="form-check">
                            <input type="radio" className="form-check-input" id="radio" />
                            <label htmlFor="radio" className="form-check-label">All : </label>
                            <input type="radio" className="form-check-input" id="radio" />
                            <label htmlFor="radio" className="form-check-label">Challan No: </label>
                          </div>
                          <input type="text" placeholder="Name" className="form-control" />
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <div className="form-check">
                            <input type="radio" className="form-check-input" id="radio" />
                            <label htmlFor="radio" className="form-check-label">Customer : </label>
                          </div>
                          <input type="text" placeholder="No" className="form-control" />
                        </div>

                        <div className="col-6 col-md-2 align-items-center" style={{ marginTop: "44px" }}>
                          <button type="button" className=" vndrbtn">
                            Search
                          </button>
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
  )
}


export default JobworkDCList