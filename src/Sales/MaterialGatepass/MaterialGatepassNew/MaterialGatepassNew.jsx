import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { useNavigate } from 'react-router-dom';
import "./MaterialGatepassNew.css";


const MaterialGatepassNew = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
   const navigate = useNavigate();  
  
    const handleButtonClick = () => {
      navigate('/PendingMaterialGatepassList'); 
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
    <div className="MaterialGatepassNewMaster">
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
                <div className="MaterialGatepassNew mt-5">
                  <div className="MaterialGatepassNew-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">New Material Gatepass </h5>
                      </div>
                
                        <div className="col-md-8 text-end">
                        <button type="button" className="btn" onClick={handleButtonClick}>
                        Pending Material Gatepass List
                        </button>
                        </div>
                    </div>
                  </div>


                    <div className="MaterialGatepassNew-main">

                        <div className="row text-start">
                            <div className="col-12">
                                <label htmlFor="">General Information</label>
                            </div>
                        </div>
                        <div className="row text-start mt-3">
                        <div className="col-2">
                           <div className="row">
                               <div className="col-md-7 mt-2">
                                  <label htmlFor="">GatePass No:</label>
                               </div>
                               <div className="col-md-5">
                                  <input type="text" className="form-control" placeholder="1"/>
                               </div>
                           </div>
                        </div>
                        <div className="col-3">
                           <div className="row">
                               <div className="col-md-6 mt-2">
                                  <label htmlFor="">GatePass Date:</label>
                               </div>
                               <div className="col-md-6">
                                  <input type="date" className="form-control" placeholder=""/>
                               </div>
                          </div>
                        </div>
                        <div className="col-2">  
                        <div className="row">
                           <div className="col-md-6 mt-2">
                                  <label htmlFor="">Time:</label>
                               </div>
                               <div className="col-md-6">
                                  <input type="time" className="form-control" placeholder=""/>
                               </div>
                           </div>
                        </div>
                        <div className="col-3">  
                        <div className="row">
                           <div className="col-md-6 mt-2">
                                  <label htmlFor="">PersonName:</label>
                               </div>
                               <div className="col-md-6">
                                  <input type="text" className="form-control" placeholder="Name"/>
                               </div>
                           </div>
                        </div>
                        <div className="col-2">  
                        <div className="row">
                           <div className="col-md-6 mt-2">
                                  <label htmlFor="">VehicleNo:</label>
                               </div>
                               <div className="col-md-6">
                                  <input type="text" className="form-control" placeholder=""/>
                               </div>
                           </div>
                        </div>
                          
                        </div>

                    </div>


                  <div className="MaterialGatepassNew-main mt-5">
                    <div className="MaterialGatepassNew-tabs">

                        <div className="row text-start">
                            <div className="col-12">
                                <span>Select Challan</span>
                            </div>
                        </div>
 
                        <div className="row g-3 text-start mt-3">  

                                <div className="col-sm-6 col-md-2 col-lg-1">
                                <label>From:</label>
                                <input type="date" className="form-control" />
                                </div>

                                <div className="col-sm-6 col-md-2 col-lg-1">
                                <label>To:</label>
                                <input type="date" className="form-control" />
                                </div>

                                <div className="col-sm-6 col-md-2 col-lg-2">
                                    <label htmlFor="">Party Name: </label>
                                    <input type="text"  placeholder="Name" className="form-control"/>
                                </div>

                                <div className="col-6 col-md-1 mt-5">
                                <button type="button" className="btn btn-primary">
                                    Search
                                </button>
                                </div>
                                <div className="col-6 col-md-1 mt-5">
                                <button type="button" className="btn btn-primary">
                                    Clear
                                </button>
                                </div>

                                <div className="col-sm-6 col-md-2 col-lg-2">
                                    <label htmlFor="">Particulars: </label>
                                    <textarea name="" id=""></textarea>
                                </div>

                                <div className="col-sm-6 col-md-2 col-lg-1">
                                    <label htmlFor=""> Qty: </label>
                                    <input type="text" placeholder="" className="form-control" />
                                </div>
                             
                                <div className="col-6 col-md-1 mt-5">
                                <button type="button" className="btn btn-primary">
                                    Add
                                </button>
                                </div>

                        </div>

                     <div className="row text-start">
                            <div className="col-5">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th> Sr. </th>
                                            <th>Challan No </th>
                                            <th>Date</th>
                                            <th>Customer</th>
                                            <th> </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td> o </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th> No. </th>
                                            <th>Party Name </th>
                                            <th>Tray Bin Details</th>
                                            <th>Qty</th>
                                            <th> Del </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td> o </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                      </div>
                       
                       <div className="row">
                            <div className="col-6 col-md-1 mt-5">
                                <button type="button" className="btn btn-primary">
                                    Add
                                </button>
                          </div>
                       </div>

                       <div className="row lastgray align-items-center mt-5"> 
                            <div className="col-md-12 text-end">
                                <button type="button" className="btn">
                                  Search
                                </button>
                                <button type="button" className="btn">
                                 Cancel
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
  );
};


export default MaterialGatepassNew