import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "../HotInspectionList.css";


const NewHotInspection = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/HotInspectionList");
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="HotInspectionListMaster">
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
                <div className="HotInspectionList mt-5">
                  <div className="HotInspectionList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-2 mt-3">
                        <h5 className="header-title"> Hot Inspection </h5>
                      </div>

                      <div className="col-md-1">
                            <div class="checkbox-style">
                                <input type="radio" id="option3" name="options" value="option3" />
                                <label htmlFor="">  &nbsp; &nbsp;Item</label>
                            </div>
                     </div>

                     <div className="col-md-1">
                            <div class="checkbox-style">
                               <input type="radio" id="option3" name="options" value="option3" />
                               <label htmlFor=""> &nbsp;WorkOrder</label>
                            </div>
                     </div>
                        
                        <div className="col-md-1">
                                <input type="text" placeholder="" className="form-control" />
                        </div>

                        <div className="col-md-1">
                            <button type="button" className="btn">
                               Search
                            </button>
                        </div>

                        <div className="col-md-1">
                            <label htmlFor=""> Part Code</label>
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
                        <button type="button" className="btn" onClick={handleNavigate}>
                          Hot Inspection List
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}

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
                            id="pdi-info"
                            data-bs-toggle="tab"
                            data-bs-target="#pdiinfo"
                            type="button"
                            role="tab"
                          >
                            C. Master Info
                          </button>
                        </li>
                        
                      </ul>
    
    
                  <div className="WorkOrderEntry-table mt-4">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th>Test No.</th>
                            <th>Perameter</th>
                            <th>Specification</th>
                            <th>Dimensions</th>
                            <th>Tolerence</th>
                            <th>Method</th>
                            <th>Critical</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                            <th>Remark</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Example Row */}
                          <tr>
                            
                            <td><input type="text" className="form-control" placeholder="Enter." /></td>
                            <td><input type="text" className="form-control" placeholder="Enter .." /></td>
                            <td><textarea className="form-control" rows="1" placeholder="Enter..."></textarea></td>
                            <td><input type="text" className="form-control" placeholder="Enter..." /></td>
                            <td><input type="text" className="form-control" placeholder="" /><br /> <input type="text" className="form-control" placeholder=" " /> </td>
                            <td><input type="text" className="form-control" placeholder=" Enter" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><textarea className="form-control" rows="1" placeholder="Enter..."></textarea></td>
                            <td><button>Add</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>


                       {/* Table Section */}
                  <div className="HotInspectionList-Main">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                        <th>Sr No.</th>
                        <th>Test No.</th>
                            <th>Perameter</th>
                            <th>Specification</th>
                            <th>Dimensions</th>
                            <th>Tolerence</th>
                            <th>Method</th>
                            <th>Critical</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                            <th>Remark</th>
                            <th></th>
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


export default NewHotInspection