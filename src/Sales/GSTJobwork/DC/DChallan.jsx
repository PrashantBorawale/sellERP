import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import "./DChallan.css";

const DChallan = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();  

  const handleButtonClick = () => {
    navigate('/DCList'); 
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
    <div className="DChallanMaster">
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
                <div className="DChallan mt-5">
                  <div className="DChallan-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Delivery Challan</h5>
                      </div>

                      <div className="col-md-8 text-end">
                        <button type="button" className="btn" onClick={handleButtonClick}>
                          DC List
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="DChallan-main mt-5">
                    <div className="DChallan-tabs">

                      <div className="tab-content mt-4" >
                        <div className="tab-pane fade show active" role="tabpanel" >
                          <div className="row text-start">
                                <div className="col-4">
                                    <div className="row">
                                            <div className="col-md-4">
                                            <label>InvoiceNo:</label>
                                            </div>
                                            <div className="col-md-8 d-flex">
                                                <input type="text"  className="form-control" placeholder="0"/>
                                                <button style={{marginBottom:"15px"}} className="btn w-50">Search</button>
                                            </div>
                                     </div>
                                </div>
                                <div className="col-4">
                                      <div className="row">
                                            <div className="col-md-4">
                                            <label>Challan No:</label>
                                            </div>
                                            <div className="col-md-8 d-flex">
                                                <input type="text"  className="form-control" placeholder="0"/>
                                            </div>
                                     </div>
                                </div>
                                <div className="col-4">
                                <div className="row">
                                     <div className="col-md-4">
                                            <label>Challan Date:</label>
                                            </div>
                                            <div className="col-md-8 d-flex">
                                                <input type="date"  className="form-control" placeholder="0"/>
                                            </div>
                                     </div>
                                </div>
                          </div>

                          <div className="row text-start">
                                <div className="col-4">
                                    <div className="row">
                                            <div className="col-md-4">
                                            <label>Vech No:</label>
                                            </div>
                                            <div className="col-md-6 d-flex">
                                                <input type="text"  className="form-control" placeholder=""/>
                                            </div>
                                     </div>
                                </div>
                                <div className="col-4">
                                      <div className="row">
                                            <div className="col-md-4">
                                            <label>TransportName:</label>
                                            </div>
                                            <div className="col-md-8 d-flex">
                                                <input type="text"  className="form-control" placeholder=""/>
                                            </div>
                                     </div>
                                </div>
                                <div className="col-4">
                                <div className="row">
                                     <div className="col-md-4">
                                            <label>Transport Mode:</label>
                                            </div>
                                            <div className="col-md-8 d-flex">
                                                <input type="text"  className="form-control" placeholder=""/>
                                            </div>
                                     </div>
                                </div>
                          </div>
                        </div>

                        <div className="table-responsive">
                                <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th>Type :</th>
                                    <th>Description</th>
                                    <th>Qty</th>
                                    <th>KG Qty</th>
                                    <th>Rate</th>
                                    <th>W.O.No</th>
                                    <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                           <div className="row">
                                            <div className="col-md-4">
                                              <select name="" id="">
                                                <option value=""></option>
                                              </select>
                                            </div>
                                            <div className="col-md-8 d-flex">
                                                <input type="text"  className="form-control" placeholder="enter Name"/>
                                                <button className="btn mb-20">Search</button>
                                            </div>
                                           </div>
                                     </td>
                                        <td><textarea name="" id=""></textarea></td>
                                        <td><input type="text" className="form-control" /></td>
                                        <td><input type="text" className="form-control" /></td>
                                        <td><input type="text" className="form-control" /></td>
                                        <td><input type="text" className="form-control" /></td>
                                        <td><button className="btn">Add</button></td>
                                    </tr>
                                </tbody>
                                </table>
                        </div>

                        <div className="table-responsive">
                                <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th>Sr</th>
                                    <th>Item Type</th>
                                    <th>Item No</th>
                                    <th>Desc</th>
                                    <th>Qty</th>
                                    <th>KG wt</th>
                                    <th>Rate</th>
                                    <th>W.O.No</th>
                                    <th> Delete </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><button className="btn">X</button></td>
                                    </tr>
                                </tbody>
                                </table>
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


export default DChallan