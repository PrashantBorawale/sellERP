
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./RG1Register.css";
// import { useNavigate } from 'react-router-dom';


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>


const RG1Register = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  // const navigate = useNavigate();
  // const handleButtonClick = () => {
  //   navigate('/');
  // };

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
    <div className="RG1RegisterMaster">
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
                <div className="RG1Register">
                  <div className="RG1Register-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">  RG1 Register </h5>
                      </div>

                      <div className="col-md-8 text-end">
                        {/* <button type="button" className=" vndrbtn" to="#/" onClick={handleButtonClick}>
                        </button>  */}
                      </div>

                    </div>
                  </div>

                  <div className="RG1RegisterMain">
                    <div className="container-fluid">

                      <div className="row g-3 text-start">

                        <div className="col-sm-6 col-md-2 col-lg-3">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-3">
                          <label>To:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-3">
                          <label htmlFor="">Commondity:</label>
                          <select name="" className="form-control" style={{ marginTop: "-0px" }} id="">
                            <option value="">Select</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-3">
                          <label htmlFor="">Inv Type :</label>
                          <select name="" className="form-control" style={{ marginTop: "-0px" }} id="">
                            <option value="">All </option>
                            <option value=""> General </option>
                            <option value=""> Export </option>
                          </select>
                        </div>

                      </div>

                      <div className="row mt-2 text-start">
                                                
                        <div className="col-sm-12 col-md-12 col-lg-12 d-flex align-items-center gap-2 flex-wrap">
                          {/* Radio Buttons */}
                          <label className="me-2 mt-3">RG1 Format :</label>

                          <input
                            type="radio"
                            id="gst"
                            name="rg1_format"
                            className="mt-3"
                            value="GST"
                          />
                          <label htmlFor="gst" className="me-2 mt-3">GST</label>

                          <input
                            type="radio"
                            className="mt-3"
                            id="excise"
                            name="rg1_format"
                            value="EXCISE"
                          />
                          <label htmlFor="excise" className="me-3 mt-3">EXCISE</label>

                          {/* Buttons in the same row */}
                          <div className="d-flex gap-2 mt-3 flex-wrap ">
                            <button className=" vndrbtn ">Print Rg1</button>
                            <button className=" vndrbtn ">Print CT-3</button>
                            <button className=" vndrbtn ">Print CT-1</button>
                            <button className=" vndrbtn ">Print UT-1</button>
                          </div>

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


export default RG1Register