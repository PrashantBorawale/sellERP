import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./TestMasterNew.css";

const TestMasterNew = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const handleTestMasterList = () => {
    navigate("/TestMasterList"); 
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="TestMasterNewMaster">
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
                <div className="TestMasterNew mt-5">
                  <div className="TestMasterNew-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Test Master  : </h5>
                      </div>
                 
                      <div className="col-md-8  text-end">
                        <button type="button" className="btn" onClick={handleTestMasterList} >
                          Test Master List
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="TestMasterNew-main mt-5">
                     
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="testno">Test No :</label>
                          </div>
                          <div className="col-8">
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="date"> Test Date :</label>
                          </div>
                          <div className="col-8">
                             <input type="date" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>

                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor=""> KVA :</label>
                          </div>
                          <div className="col-8">
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="tap">Ambient Temp :</label>
                          </div>
                          <div className="col-8">
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                    <label htmlFor=""> No Load Loss Measu (O.C) (In Walt)</label>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6 mt-2">
                            <label htmlFor="customer">Voltage :</label>
                          <input type="text" className="form-control"/>
                          </div>
                          <div className="col-6 mt-2">
                          <label htmlFor="customer">Loss :</label>
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6 mt-2">
                            <label htmlFor="customer">Current :</label>
                          <input type="text" className="form-control"/>
                          </div>
                          <div className="col-6 mt-2">
                          <label htmlFor="customer">Freq. :</label>
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                    <label htmlFor=""> 50 % Load Loss Measu (S.C) (In Walt) </label>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6 mt-2">
                            <label htmlFor="customer">Voltage :</label>
                          <input type="text" className="form-control"/>
                          </div>
                          <div className="col-6 mt-2">
                          <label htmlFor="customer">Loss :</label>
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6 mt-2">
                            <label htmlFor="customer">Current :</label>
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                    <label htmlFor=""> 100 % Load Loss Measu (S.C) (In Walt) </label>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6 mt-2">
                            <label htmlFor="customer">Voltage :</label>
                          <input type="text" className="form-control"/>
                          </div>
                          <div className="col-6 mt-2">
                          <label htmlFor="customer">Loss :</label>
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6 mt-2">
                            <label htmlFor="customer">Current :</label>
                          <input type="text" className="form-control"/>
                          </div>
                          <div className="col-6 mt-2">
                          <label htmlFor="customer">In. :</label>
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6 mt-2">
                            <label htmlFor="customer">At 75 Deg. :</label>
                          </div>
                          <div className="col-6 mt-2">
                          <label htmlFor="customer">Item Type :</label>
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6 mt-2">
                           <select name="" id="" className="form-control">
                            <option value="">Copper </option>
                            <option value="">Copper </option>
                            <option value="">Copper </option>
                           </select>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6 mt-2">
                            <label htmlFor="customer">No Load Loss :</label>
                          <input type="text" className="form-control"/>
                          </div>
                          <div className="col-6 mt-2">
                          <label htmlFor="customer">50% Load Loss  :</label>
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6 mt-2">
                            <label htmlFor="customer">100% Load Loss :</label>
                          <input type="text" className="form-control"/>
                          </div>
                          <div className="col-6 mt-2">
                          <label htmlFor="customer">% Impedence :</label>
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6 mt-3">
                            <label htmlFor="customer">High Voltage Test :</label>
                          </div>
                          <div className="col-6 mt-2">
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6 mt-3">
                            <label htmlFor="customer">DVDF :</label>
                          </div>
                          <div className="col-6 mt-2">
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>

                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="ref">Tested By. :</label>
                          </div>
                          <div className="col-8">
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="ref">Checked By. :</label>
                          </div>
                          <div className="col-8">
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="ref">Mfg. By. :</label>
                          </div>
                          <div className="col-8">
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="ref">Remark :</label>
                          </div>
                          <div className="col-8">
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>

                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                          <button type="button" className="btn" >
                             Save
                          </button>   
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
  );
};

export default TestMasterNew