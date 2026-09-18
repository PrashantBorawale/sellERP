import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./NewSetupApproval.css";

const NewSetupApproval = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/SetupList");
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="NewSetupApprovalMaster">
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
                <div className="NewSetupApproval mt-5">
                  <div className="NewSetupApproval-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">New Set Up Approval</h5>
                      </div>
                     
                      <div className="col-md-6 text-end">
                        <button type="button" className="btn" onClick={handleNavigate}>
                          Approval List
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="NewSetupApproval-main mt-5">
                    <div className="row text-start">
                      {/* First Column */}
                      <div className="col-md-3">
                        {/* Prod. No */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="prod-no">Report No  :</label>
                          </div>
                          <div className="col-8 d-flex align-items-center">
                            <input type="text" placeholder="24250001"  className="form-control"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Report Date:</label>
                          </div>
                          <div className="col-6">
                          <input type="date" placeholder=" 02/12/24"  className="form-control"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {/* Shift */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="shift">Time :</label>
                          </div>
                          <div className="col-8">
                          <input type="time" placeholder="24250001"  className="form-control"/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row text-start">
                      {/* First Column */}
                      <div className="col-md-3">
                        {/* Prod. No */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="prod-no">Shift  :</label>
                          </div>
                          <div className="col-8 d-flex align-items-center">
                          <select className="form-control">
                              <option>Select</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Machine :</label>
                          </div>
                          <div className="col-8">
                           <select  className="form-control">
                           <option>Select </option>
                                  <option>AY-CGR1 | CENTERLESS GRIDING 1 </option>
                                  <option>AY-CGR1 | CENTERLESS GRIDING 2</option>
                                  <option>AY-D7 | DRILLING 7</option>
                                  <option>AY-D7 | DRILLING 8 </option>
                                  <option>AY-M3 | MILLING 3 </option>
                                  <option>AY-SO1 | SECOND OPERATION AY 1 </option>
                                  <option>AY-SO2 | SECOND OPERATION AY 2 </option>
                                  <option>AY-SO3 | SECOND OPERATION AY 3 </option>
                                  <option>AY-T-1 | TROUB 25 1 </option>
                                  <option>AY-T-10 | TROUB 25 10 </option>
                                  <option>AY-T-11 | TROUB 25 11 </option>
                                  <option>AY-T-12 | TROUB 25 12 </option>
                                  <option>AY-T-13 | TROUB 25 13 </option>
                                  <option>AY-T-2 | TROUB 25 2 </option>
                                  <option>AY-T-3 | TROUB 25 3 </option>
                                  <option>AY-T-4 | TROUB 25 4 </option>
                                  <option>AY-T-5 | TROUB 25 5 </option>
                                  <option>AY-T-6 | TROUB 25 6 </option>
                           </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {/* Shift */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="shift">Item Desc :</label>
                          </div>
                          <div className="col-4">
                          <input type="text" placeholder=" "  className="form-control"/>
                          </div>
                          <div className="col-md-4 mt-1">               
                         <button className="btn btn-outline-secondary btn-primary">Search</button>          
                       </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        {/* Shift */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="shift">Operation :</label>
                          </div>
                          <div className="col-8">
                          <select className="form-control">
                              <option>Select</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row g-3 text-start">
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Check Point :</label>
                        <input type="text" className="form-control" />
                      </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Specification:</label>
                          <input type="text" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Observation:</label>
                          <input type="text" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Reason :</label>
                        <input type="text" className="form-control" />
                      </div>
                       
                        <div className="col-sm-6 col-md-2 col-lg-1">
                        <label  type="checkbox">Action:</label>
                       <input type="text"  placeholder=" " className="form-control"/>
                      </div>

                         {/* Supplier Name */}
                       <div className="col-sm-6 col-md-2 col-lg-1">
                        <label type="checkbox">Responsibility:</label>
                        <input type="text" placeholder=" " className="form-control" />
                      </div>
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label type="checkbox">Target Date:</label>
                        <input type="text" placeholder=" " className="form-control" />
                      </div>

                   <div className="col-sm-6 col-md-2 col-lg-2">                     
                      <label htmlFor="">Remark</label>                    
                     <input type="text" placeholder=" " className="form-control"/>
                    </div>

                    <div className="col-6 col-md-1 mt-5">
                    <button type="button" className="btn btn-primary w-100" >
                        Search
                    </button> 
                    </div>
                    </div>

                  </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Check Point</th>
                          <th scope="col">Specification</th>
                          <th scope="col">Observation</th>
                          <th scope="col">Reason</th>
                          <th scope="col">Corrective Action</th>
                          <th scope="col">Responsibility</th>
                          <th scope="col">Target Date</th>
                          <th scope="col">Remark</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example data row */}
                        <tr>
                          <td>1</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td><span>!</span></td>
                        </tr>
                      </tbody>
                    </table>
              </div>
            </main>
         </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSetupApproval