import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
// import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./FirstPieceApporval.css";
import { FaPlus } from "react-icons/fa";
import Cached from "@mui/icons-material/Cached.js";

const FirstPieceApporval = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/SetUpApproval");
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="FirstPieceApporvalMaster">
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
                <div className="FirstPieceApporval mt-5">
                  <div className="FirstPieceApporval-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <h5 className="header-title">First 5 Piece Inspection</h5>
                      </div>
                      <div className="col-md-1">Series :- </div>
                      <div className="col-md-1">
                        <select>
                          <option>Select</option>
                        </select>
                      </div>
                      <div className="col-md-1">
                         <input type="text" className="fpahead" placeholder="2425000001" />
                      </div>


                      <div className="col-md-6 text-end">
                        <button type="button" className="btn" onClick={handleNavigate}>
                          Setup Apporval Parameter
                        </button>
                        <button type="button" className="btn">
                          Report List
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="FirstPieceApporval-main mt-5">
                    <div className="row text-start">
                      {/* First Column */}
                      <div className="col-md-4">
                        {/* Prod. No */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="prod-no">Type  :</label>
                          </div>
                          <div className="col-8 d-flex align-items-center">
                            <select className="form-control">
                              <option>Select</option>
                              <option>Secondary Operations</option>
                              <option>Threading Operations</option>
                              <option>Start Up</option>
                              <option>Restart Up</option>
                              <option>4M Change</option>
                              <option>ECN/NOD</option>
                              <option>IPC</option>
                            </select>
                          </div>
                        </div>

                        {/* Contractor */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                          <label htmlFor="Checkbox" className="form-check-label">Work Order : </label>
                          </div>
                          <div className="col-8">
                             <input type="text" placeholder="Select Work Order"  className="form-control"/>
                          </div>
                        </div>
                      </div>

                      {/* Second Column */}
                      <div className="col-md-4">
                        {/* Date & Time */}
                        <div className="row mb-2">
                          <div className="col-3 mt-2">
                            <label htmlFor="">Machine:</label>
                          </div>
                          <div className="col-6">
                          <select className="form-control">
                              <option>Select</option>
                              <option>AY-CGR1 | CenterLess Grinding 1</option>
                              <option>AY-CGR2 | CenterLess Grinding 2 </option>
                              <option>AY-07 | Drilling 7</option>
                              <option>AY-08 | Drilling 8</option>
                              <option>AY-03 | Milling 3</option>
                              <option>AY-S01 | Second Operation AY 1</option>
                              <option>AY-01 | Second </option>
                            </select>
                          </div>
                        </div>

                        {/* Supervisor */}
                        <div className="row mb-2">
                          <div className="col-3 mt-2">
                            <label htmlFor="supervisor">Item Desc :</label>
                          </div>
                          <div className="col-6">
                            <input id="itemdedsc" className="form-control" />
                          </div>
                          <div className="col-md-3 mt-1">               
                         <button className="btn btn-outline-secondary btn-primary">Search</button>          
                       </div>
                        </div>
                      </div>

                      {/* Third Column */}
                      <div className="col-md-4">
                        {/* Shift */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="shift">Shift :</label>
                          </div>
                          <div className="col-8">
                            <select className="form-control">
                              <option>Select</option>
                            </select>
                          </div>
                        </div>

                        {/* Operator */}
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="operator">Operator :</label>
                          </div>
                          <div className="col-8 d-flex">
                            <input type="text"  className="form-control" /> 
                           <select className="operabttn"> 
                             <option> </option>
                             <option> </option>
                           </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="FirstPieceApporval-second">
                      <ul
                        className="nav nav-tabs"
                        id="productionEntryTabs"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="shift-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#shift"
                            type="button"
                            role="tab"
                          >
                            A. Dimensional
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="machine-idle-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#machineIdle"
                            type="button"
                            role="tab"
                          >
                            B. Visual Inspection
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="rework-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#rework"
                            type="button"
                            role="tab"
                          >
                            C. Product Parameter
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="tool-die-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#toolDie"
                            type="button"
                            role="tab"
                          >
                            D. QC Info
                          </button>
                        </li>
                      </ul>


                       {/* Table Section */}

                      <div  className="tab-content mt-4" id="productionEntryTabsContent">
                        <div className="tab-pane fade show active" id="shift" role="tabpanel" >
                          <div className="table table-bordered table-responsive">
                          <table className="">
                           <thead className="table-light">
                                <tr className="bg-gray-100">
                                  <th className="border border-gray-300 p-2">
                                    Dimensions
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Measurements Technique
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Specification
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Standard
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Telerence
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    1
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    2
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    3
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    4
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    5
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    6
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    7
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    8
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    9
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    10
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Remark
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border border-gray-300 p-2">
                                    <div className="flex">
                                      <input type="text" placeholder="Enter..."  className="form-control" />
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <div className="flex">
                                      <input type="text"  className="form-control" />
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                    <br />
                                    <input type="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <button className="btn btn-primary">
                                        ADD
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="row">
                            <div className="table table-responsive">
                              <table>
                                <thead>
                                  <tr className="bg-gray-100">
                                    <th className="border border-gray-300 p-2">
                                      Sr. No
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      Dimensions
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      Measurement Technique
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      Specification
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      Standard
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      Tolerence
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      Min / Max
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      Least Count
                                    </th>
                                    <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> ALL</th>
                                    <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> M1</th>
                                    <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> M2</th>
                                    <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> M3</th>
                                    <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> M4</th>
                                    <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> M5</th>
                                    <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> M6</th>
                                    <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> M7</th>
                                    <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> M8</th>
                                    <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> M9</th>
                                    <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> M10</th>
                                    <th className="border border-gray-300 p-2">
                                      Remark
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                    Spl Char
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      Critical
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      LPO
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                      Del
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="border border-gray-300 p-2">
                                      <label>1</label>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                    <textarea className="form-control" rows="1" placeholder="Enter..."></textarea>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                    <textarea className="form-control" rows="1" placeholder="Enter..."></textarea>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                    <textarea className="form-control" rows="1" placeholder="Enter..."></textarea>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder="+"/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder="+"/> <br />
                                      <input type ="text" className="form-control" placeholder="-"/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder="-"/> <br />
                                      <input type ="text" className="form-control" placeholder="+"/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                     <input type="checkbox" className="form-check-input" id="Checkbox" />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                      <input type ="text" className="form-control" placeholder=""/>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="machineIdle"
                          role="tabpanel"
                        >
                          <div className="table table-bordered table-responsive">
                            <table>
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="border border-gray-300 p-2">
                                    Idle Reason:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    From:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    To:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Total Time:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Supervisor /Operators:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Setting Part:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Remark:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Add:
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border border-gray-300 p-2">
                                    <div className="flex">
                                      <input type="text"  className="form-control" />
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <div className="flex">
                                      <input type="time" className="form-control"  />
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type="time" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type="time" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <button type="button" className="btn">
                                      Add
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="table table-bordered table-responsive">
                            <table>
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="border border-gray-300 p-2">
                                    S no.:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Reason:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    From Time:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    To Time:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Idle Time:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Operator Name:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Setting Part:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Remark:
                                  </th>
                                  <th className="border border-gray-300 p-2">
                                    Delete:
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border border-gray-300 p-2">
                                    <div className="flex">
                                      <input type="text"  className="form-control" />
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <div className="flex">
                                      <input type="time" className="form-control"/>
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type="time" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type="time" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <input type ="text" className="form-control" />
                                  </td>
                                  <td className="border border-gray-300 p-2">
                                    <button type="button" className="btn">
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="rework"
                          role="tabpanel"
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-1">
                                  <label>Rework</label>
                                </div>
                                <div className="col-md-2">
                                  <select>
                                    <option>Select</option>
                                  </select>
                                </div>
                                <div className="col-md-1">
                                  <input type="text"  className="form-control" />
                                </div>
                                <div className="col-md-1">
                                  <button type="button" className="btn">
                                    Add
                                  </button>
                                </div>
                                <div className="col-md-1">
                                  <button type="button" className="btn">
                                    <FaPlus />
                                  </button>
                                </div>
                                <div className="col-md-1">
                                  <button type="button" className="btn">
                                    <Cached />
                                  </button>
                                </div>
                              </div>
                              <div className="row">
                                <div className="table table-bordered table-responsive">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>Sr no.</th>
                                        <th>Description</th>
                                        <th>Qty</th>
                                        <th>Delete</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>Sr no.</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-1">
                                  <label>Reject</label>
                                </div>
                                <div className="col-md-2">
                                  <select>
                                    <option>Select</option>
                                  </select>
                                </div>
                                <div className="col-md-1">
                                  <input type="text"  className="form-control" />
                                </div>
                                <div className="col-md-1">
                                  <button type="button" className="btn">
                                    Add
                                  </button>
                                </div>
                                <div className="col-md-1">
                                  <button type="button" className="btn">
                                    <FaPlus />
                                  </button>
                                </div>
                                <div className="col-md-1">
                                  <button type="button" className="btn">
                                    <Cached />
                                  </button>
                                </div>
                              </div>
                              <div className="row">
                                <div className="table table-bordered table-responsive">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>Sr no.</th>
                                        <th>Description</th>
                                        <th>Qty</th>
                                        <th>Delete</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>Sr no.</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="toolDie"
                          role="tabpanel"
                        >
                          <div className="Container-fluid">
                            <div className="row">
                              <div className="col-md-1">
                                <label>Die Name</label>
                              </div>
                              <div className="col-md-2">
                                <input type="text"  className="form-control" />
                              </div>
                              <div className="col-md-1">
                                <button type="button" className="btn">
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="table table-bordered table-responsive">
                              <table>
                                <thead>
                                  <tr>
                                    <th>Sr no.</th>
                                    <th>Item Code</th>
                                    <th>Item Description</th>
                                    <th>Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Sr no.</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
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

export default FirstPieceApporval