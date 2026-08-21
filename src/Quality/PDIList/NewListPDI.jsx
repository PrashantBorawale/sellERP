import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import './PDIList.css';
// import Cached from "@mui/icons-material/Cached";
// import { FaXTwitter } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";


const NewListPDI = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

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
    <div className="PDIListMaster">
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
                <div className="PDIList mt-5">
                  <div className="PDIList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4 mt-3">
                        <h5 className="header-title">  PDI - Pre Dispatch Inspection </h5>
                      </div>
                      <div className="col-md-1">
                          <label>Series :</label>
                        </div>
                        <div className="col-md-1">
                            <select>
                                <option value="">SELECT</option>
                                <option value="">With Invoice</option>
                                <option value="">Without Invoice</option>
                                <option value="">With Production</option>
                                <option value="">With SO</option>
                                <option value="">With DC </option>
                            </select>
                        </div>

                      <div className="col-md-4 text-end">
                        <button type="button" className="btn">
                          Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="PDIList-filter mb-4">

                    <div className="row text-start">
 
                      <div className="col-md-2 mt-2">
                        <label>Select Coustomar :</label>
                      </div>

                      <div className="col-md-2">
                        <input type="text" placeholder="Enter Name ... " className="form-control"/>
                      </div>

                      <div className="col-md-1 mt-2">               
                         <button className="btn btn-primary">Search</button>          
                      </div>

                    </div>
                    <div className="row text-start">
 
                        <div className="col-md-2 mt-2">
                        <label>Select Item :</label>
                        </div>
                        
                        <div className="col-md-2">
                        <input type="text" placeholder="Enter Code No ... " className="form-control"/>
                        </div>

                        <div className="col-md-1 mt-2">               
                            <button className="btn btn-primary">Search</button>          
                        </div>

                    </div>
                  </div>

                  <div className="AssemblyEntry-bottom mt-5">
                    <div className="AssemblyEntry-tabs">
                      <ul className="nav nav-tabs" id="productionEntryTabs1" role="tablist" >
                       
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="dimensional"
                            data-bs-toggle="tab"
                            data-bs-target="#dimensional"
                            type="button"
                            role="tab"
                          >
                            A. Dimensional
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="visual-inspection"
                            data-bs-toggle="tab"
                            data-bs-target="#visualinspection"
                            type="button"
                            role="tab"
                          >
                            B. Visual Inspection
                          </button>
                        </li>
                       
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="instrument"
                            data-bs-toggle="tab"
                            data-bs-target="#instrument"
                            type="button"
                            role="tab"
                          >
                            C. Instrument
                          </button>
                        </li>

                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="standard-refrence"
                            data-bs-toggle="tab"
                            data-bs-target="#standardrefrence"
                            type="button"
                            role="tab"
                          >
                            D. Standard Refrence
                          </button>
                        </li>

                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="rej-qty"
                            data-bs-toggle="tab"
                            data-bs-target="#rejqty"
                            type="button"
                            role="tab"
                          >
                            E. Rej. Qty
                          </button>
                        </li>

                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="pdi-info"
                            data-bs-toggle="tab"
                            data-bs-target="#pdiinfo"
                            type="button"
                            role="tab"
                          >
                            F. PDI Info
                          </button>
                        </li>
                        
                      </ul>
    
    
                  <div className="WorkOrderEntry-table mt-4">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th>Test No.</th>
                            <th>Test Description</th>
                            <th>Specification</th>
                            <th>Dimensions</th>
                            <th>Tot(-)</th>
                            <th>Tot(+)</th>
                            <th>UOM</th>
                            <th>Measurement Technique</th>
                            <th>Critical</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>QC Symbol</th>
                            <th>Remark</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Example Row */}
                          <tr>
                            
                            <td><input type="text" className="form-control" placeholder="Enter NO." /></td>
                            <td><textarea className="form-control" rows="1" placeholder="Enter..."></textarea></td>
                            <td><input type="text" className="form-control" placeholder="Enter .." /></td>
                            <td><input type="text" className="form-control" placeholder="Enter..." /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder=" " /></td>
                            <td><select> <option>Select</option> </select></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><FaEdit className="text-primary" /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>


                       {/* Table Section */}
                  <div className="PDIList-Main">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                        <th>Test No.</th>
                            <th>Test Description</th>
                            <th>Specification</th>
                            <th>Dimensions</th>
                            <th>Tot(-)</th>
                            <th>Tot(+)</th>
                            <th>UOM</th>
                            <th>LC</th>
                            <th>Measurement Technique</th>
                            <th>Critical</th>
                            <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> ALL</th>
                            <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> S1</th>
                            <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> S2</th>
                            <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> S3</th>
                            <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> S4</th>
                            <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> S5</th>
                            <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> S6</th>
                            <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> S7</th>
                            <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> S8</th>
                            <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> S9</th>
                            <th> <input type="checkbox" className="form-check-input" id="Checkbox" /> S10</th>
                            <th>S11</th>
                            <th>S12</th>
                            <th>S13</th>
                            <th>S14</th>
                            <th>S15</th>
                            <th>S16</th>
                            <th>S17</th>
                            <th>S18</th>
                            <th>S19</th>
                            <th>S20</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example Row */}
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
                            <td></td>
                            <td> <input type="checkbox" className="form-check-input" id="Checkbox" /></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          <td>
                            <button className="btn btn-sm btn-light">
                              <i className="fas fa-eye"></i>
                            </button>
                          </td>
                        </tr>
                        {/* Additional rows can be added dynamically here */}
                      </tbody>
                    </table>
                    </div>
                  </div>

                 {/* <div className="tab-content mt-4" id="productionEntryTabsContent" >
                        
                        <div className="tab-pane fade" id="dimensional" role="tabpanel">
                         <div className="row">
                         <div className="col-md-4">
                            <div className="row">
                            <div className="col-md-3">
                                  <label>QC No :</label>
                            </div>
                            <div className="col-md-4">
                                  <input type="text" placeholder="242523915" className="form-control" />
                            </div>
                            </div>
                              <div className="row">    
                                <div className="col-md-3">
                                  <label>Rework</label>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Select</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-1">
                                  <button type="button" className="btn">
                                    Add
                                  </button>
                                </div>
                                <div className="col-md-1">
                                  <button type="button" className="btn">
                                    <Cached />
                                  </button>
                                </div>
                              </div>
                              
                              <div className="table-responsive">
                              <table className="table table-bordered table-striped">
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

                         <div className="col-md-4">
                             <div className="row">
                            <div className="col-md-3">
                                  <label>QC Date :</label>
                            </div>
                            <div className="col-md-4">
                                  <input type="date" className="form-control" />
                            </div>
                            </div>
                              <div className="row">    
                                <div className="col-md-3">
                                  <label>Rework</label>
                                </div>
                                <div className="col-md-3">
                                  <select>
                                    <option>Select</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-1">
                                  <button type="button" className="btn">
                                    Add
                                  </button>
                                </div>
                                <div className="col-md-1">
                                  <button type="button" className="btn">
                                    <Cached />
                                  </button>
                                </div>
                              </div>
                              
                              <div className="table-responsive">
                              <table className="table table-bordered table-striped">
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
                                        <td><FaXTwitter/></td>
                                      </tr>
                                    </tbody>
                                  </table>
                              </div>
                         </div>

                         <div className="col-md-4">
                                <div className="row mt-4">
                                    <div className="col-md-4 mt-3">
                                          <label>QC Sample Pef. :</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mt-3">
                                          <label>QC Ssmple Qty. :</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-4 mt-3">
                                          <label>QC Ssmple Remark. :</label>
                                    </div>
                                    <div className="col-md-5">
                                       <textarea className="form-control" rows="1" placeholder="Remark..."></textarea>
                                    </div>
                                </div>
                         </div>
                          </div>

                          <div className="row mt-4">
                             <div className="col-md-3">
                               <div className="row mt-4">
                                    <div className="col-md-6 mt-3">
                                          <label>Drawing Rev No. :</label>
                                    </div>
                                    <div className="col-md-6">
                                    <input type="text" className="form-control" />
                                    </div>
                                </div>
                             </div>

                             <div className="col-md-3">
                             <div className="row mt-4">
                                    <div className="col-md-6 mt-3">
                                          <label>(IOS) Format No. :</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                             </div>
                             <div className="col-md-3">
                             <div className="row mt-4">
                                    <div className="col-md-6 mt-3">
                                          <label>(IOS) Rev No. :</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                             </div>
                             <div className="col-md-3">
                                <div className="row mt-4">
                                    <div className="col-md-6 mt-3">
                                          <label>(IOS) Rev Date. :</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="date" className="form-control" />
                                    </div>
                                </div>
                             </div>
                          </div>
                        </div>
                    
                      
                 </div> */}

                </div>

                    <div className="row text-start mt-5">
                      <div className="col-md-2">
                          <label><b>OK Qty : </b></label> <span className="okqty"> 0</span>
                      </div>
                      <div className="col-md-2">
                          <label><b>| Rework : </b></label><span className="okqtyy"> 0</span>
                      </div>
                      <div className="col-md-2">
                          <label><b>| Reject : </b></label> <span className="okqtyyt"> 0</span>
                      </div>
                      <div className="col-md-2">
                          <label><b> Total Qty : </b></label> <span className="okqtyyy"> Label</span>
                      </div>
                       <div className="col-md-4 d-flex">
                        <div className="text-end s-4 d-flex">
                          <button type="button" className="btn">
                            Cancel
                          </button>
                          <button type="button" className="btn">
                            Save
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

export default NewListPDI