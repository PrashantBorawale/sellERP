import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./TestReportList.css";

const TestReportNew = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const handleTestReportList = () => {
    navigate("/TestReportList"); 
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="TestReportListMaster">
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
                <div className="TestReportList mt-5">
                  <div className="TestReportList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <h5 className="header-title">Test Report New : </h5>
                      </div>
                      <div className="col-md-1">
                        <input type="text" placeholder="Test No 1" />
                      </div>
                      
                     
                      <div className="col-md-8  text-end">
                        <button type="button" className="btn" onClick={handleTestReportList} >
                          Test List
                        </button>
                       

                      </div>
                    </div>
                  </div>

                  <div className="TestReportList-main mt-5">
                     
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
                            <label htmlFor="shift">Test Master :</label>
                          </div>
                          <div className="col-8">
                            <select className="form-control">
                              <option>Select</option>
                            </select>
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="date">Date :</label>
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
                            <label htmlFor="testno">Capacity KVA :</label>
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
                            <label htmlFor="tap">Tap :</label>
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
                            <label htmlFor="customer">Customer :</label>
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
                            <label htmlFor="ref">Ref. :</label>
                          </div>
                          <div className="col-8">
                         <textarea name="" id="" className="form-control"></textarea>
                          </div>
                        </div>      
                      </div>
                  </div>

                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-4">
                            <label htmlFor="testno">Insulation Resistance :</label>
                          </div>
                          <div className="col-8">
                            <label htmlFor="">H.V. To Earth</label>
                          <input type="text" placeholder="2000" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6">
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6">
                          <label htmlFor="">L.V. To Earth</label>
                          <input type="text" placeholder="2000" className="form-control"/>
                          </div>
                          <div className="col-6">
                          <label htmlFor="">H.V. To L.V.</label>
                          <input type="text" placeholder="2000" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>

                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-4">
                            <label htmlFor="testno">Reted Current in amp :</label>
                          </div>
                          <div className="col-8">
                            <label htmlFor="">H.V.</label>
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6">
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6">
                          <label htmlFor="">L.V.</label>
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>
                    

                  <div className="TestReportList-table mt-4">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th>RY/rn.</th>
                            <th> YB/yn</th>
                            <th>RB/bn</th>
                            <th> </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Example Row */}
                          <tr>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="ADD" /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="TestReportList-Main">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                        <th>Sr No.</th>
                            <th>RY/rn</th>
                            <th>YN/yn</th>
                            <th>RB/bn</th>
                            <th>Delete</th>
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
                        </tr>
                        {/* Additional rows can be added dynamically here */}
                      </tbody>
                    </table>
                    </div>
                  </div>

<br></br>
<br></br>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-4">
                            <label htmlFor="testno">Resistence Test :</label>
                          </div>
                          <div className="col-6">
                            <label htmlFor="">H.V.</label>
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6">
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6">
                          <label htmlFor="">L.V.</label>
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>

                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="testno">No Load Losses :</label>
                          </div>
                          <div className="col-6">
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6">
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                         <div className="col-4 mt-2">
                            <label htmlFor="testno">At 50% Load :</label>
                          </div>
                          <div className="col-6">
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>

                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="testno">At 100% Load  :</label>
                          </div>
                          <div className="col-6">
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-6">
                          </div>
                        </div>      
                      </div>
                      <div className="col-md-4">
                        <div className="row mb-2">
                         <div className="col-4 mt-2">
                            <label htmlFor="testno"> % Impendence :</label>
                          </div>
                          <div className="col-6">
                          <input type="text" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>

                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="">Vector Group :</label>
                          </div>
                          <div className="col-8">
                          <input type="text" placeholder="Dyn-11 Satisfied" className="form-control"/>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="ref">Seprate Secure Volt. :</label>
                          </div>
                          <div className="col-8">
                         <textarea name="" id="" placeholder="Voltage applied to H.V. Side 28kv withstand for 1 min" className="form-control"></textarea>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="ref">With Stand Test :</label>
                          </div>
                          <div className="col-8">
                         <textarea name="" id="" placeholder="Voltage applied to L.V. Side 03kv withstand for 1 min" className="form-control"></textarea>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="ref">Induced over Volt. Test :</label>
                          </div>
                          <div className="col-8">
                         <textarea name="" id="" placeholder="Voltage applied to L.V. Side 866v withstand for 1 min" className="form-control"></textarea>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="ref">Dielectric Strenght of oil Magnetic balance test :</label>
                          </div>
                          <div className="col-8">
                         <textarea name="" id="" className="form-control"></textarea>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="ref">Note :</label>
                          </div>
                          <div className="col-8">
                         <textarea name="" id="" className="form-control"></textarea>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="ref">Tested by :</label>
                          </div>
                          <div className="col-8">
                         <textarea name="" id="" className="form-control"></textarea>
                          </div>
                        </div>      
                      </div>
                  </div>
                  <div className="row text-start">
                      <div className="col-md-4">
                        <div className="row mb-2">
                          <div className="col-4 mt-2">
                            <label htmlFor="ref">Witness by :</label>
                          </div>
                          <div className="col-8">
                         <textarea name="" id="" className="form-control"></textarea>
                          </div>
                        </div>      
                      </div>
                  </div>

                    <div className="row text-start">
                    <div className="col-md-8  text-end">
                        <button type="button" className="btn" >
                         Save
                        </button>
                        <button type="button" className="btn" >
                         Clear
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

export default TestReportNew