import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import "./SalesOrderItemAdd.css";


const SalesOrderItemAddTwo = () => {
  const navigate = useNavigate();
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const handleNavigate = () => {
    navigate('/SalesOrderAmendList');
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="SalesOrderItemAddMaster">
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
                <div className="SalesOrderItemAdd">
                  <div className="SalesOrderItemAdd-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> Sales Order Item Add </h5>
                      </div>
                      <div className="col-md-1">
                        <label htmlFor=""> Series </label>
                      </div>
                      <div className="col-md-1">
                        <select className="form-select" name="" id="">
                          <option value="">Select</option>
                          <option value="">SO Amendment</option>
                          <option value=""></option>
                        </select>
                      </div>

                      <div className="col-md-6 text-end">
                        <button type="button" className="vndrbtn" to="#/" onClick={handleNavigate}>
                          SO Amendment List
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="SalesOrderItemAdd-Main">
                    <div className="container-fluid">

                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Amd No. :</th>
                            <th scope="col">Amd Date :</th>
                            <th scope="col">Cust Name :</th>
                            <th scope="col">PO No :</th>
                            <th scope="col">New Revision No :</th>
                            <th scope="col">Ref :</th>
                            <th scope="col">Ref Date : </th>
                            <th scope="col">Narration : </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td><input type="text" className="form-control" /> <input type="text" className="form-control" /> </td>
                            <td><input type="date" className="form-control" /></td>
                            <td><input type="text" className="form-control" placeholder="Name" /></td>
                            <td>
                              <select className="form-select" name="" id="">
                                <option value="">Select an Option</option>
                                <option value=""></option>
                                <option value=""></option>
                              </select>
                            </td>
                            <td>
                              {/* <input type="radio" id="" name="fav_language" value="" />
                          <label for="">Rate</label>
                          <input type="radio" id="" name="fav_language" value="" />
                           <label for="">Qty</label>
                           <input type="radio" id="" name="fav_language" value="" />
                          <label for="">Close</label>
                          <input type="radio" id="" name="fav_language" value="" />
                           <label for="">PO Date</label>

                           <button >Add</button> */}
                            </td>
                            <td> <input type="text" className="form-control" /> </td>
                            <td><input type="date" className="form-control" /></td>
                            <td><textarea name="" className="form-control" id=""></textarea></td>
                          </tr>
                        </tbody>
                      </table>

                    </div>
                  </div>

                  <div className="SalesOrderItemAdd-Main mt-2">
                    <div className="row text-start">

                      <div className="col-md-2">
                        <label>Select Item :</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-1" style={{ marginTop: "20px" }}>
                        <button className=" vndrbtn">Search</button>
                      </div>


                      <div className="col-md-2">
                        <label>Item Code :</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="col-md-2">
                        <label>Item Desc : </label>
                        <textarea name="" className="form-control" id=""></textarea>
                      </div>

                      <div className="col-md-2">
                        <label>Remark :</label>
                        <textarea name="" className="form-control" id=""></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="SalesOrderItemAddtable mt-2">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th scope="col">PO No</th>
                            <th scope="col">PO Date</th>
                            <th scope="col">Amd No</th>
                            <th scope="col">Amd Date</th>
                            <th scope="col">Line No</th>
                            <th scope="col">Rate (HC)</th>
                            <th scope="col">FC Rate</th>
                            <th scope="col"> Disc % </th>
                            <th scope="col"> IGST % </th>
                            <th scope="col"> CESS % </th>
                            <th scope="col"> PO Qty </th>
                            <th scope="col"> Unit </th>
                            <th scope="col"> Plan Date </th>
                            <th scope="col"> Delivery Date </th>
                            <th scope="col"> Type </th>
                            <th scope="col"> Action </th>

                          </tr>
                        </thead>

                        <tbody>
                          {/* Example data row */}
                          <tr>
                            <td> <input type="text" className="form-control" /> </td>
                            <td> <input type="date" className="form-control" /> </td>
                            <td> <input type="text" className="form-control" /> </td>
                            <td> <input type="date" className="form-control" /> </td>
                            <td> <input type="text" className="form-control" /> </td>
                            <td> <input type="text" className="form-control" /> </td>
                            <td> <input type="text" className="form-control" /> </td>
                            <td> <input type="text" className="form-control" /> </td>
                            <td> <input type="text" className="form-control" /> </td>
                            <td> <input type="text" className="form-control" /> </td>
                            <td> <input type="text" className="form-control" /> </td>
                            <td>
                              <select name="" className="form-select" id="">
                                <option value="">ALL </option>
                              </select>
                            </td>
                            <td> <input type="date" className="form-control" /> </td>
                            <td> <input type="date" className="form-control" /> </td>
                            <td>
                              <select name="" className="form-select" id="">
                                <option value="">ALL </option>
                              </select>
                            </td>
                            <td> <button className="vndrbtn">ADD</button> </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="SalesOrderItemAddtable mt-2">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Sr</th>
                            <th scope="col">Item Code</th>
                            <th scope="col">Description</th>
                            <th scope="col">PO No | Date</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Cur</th>
                            <th scope="col">Rate</th>
                            <th scope="col"> Disc % </th>
                            <th scope="col"> Sub Total </th>
                            <th scope="col"> SGST  </th>
                            <th scope="col"> CGST </th>
                            <th scope="col"> IGST </th>
                            <th scope="col"> CESS </th>
                            <th scope="col">  Type </th>
                            <th scope="col"> Remark </th>
                            <th scope="col"> Del </th>
                          </tr>
                        </thead>

                        <tbody>
                          {/* Example data row */}
                          <tr>
                            <td> 1 </td>
                            <td> <input type="text" placeholder="Enter Code" className="form-control" /> </td>
                            <td> <textarea name="" className="form-control" id=""></textarea> </td>
                            <td>
                              PO No:    | Date : <br />
                              Amd No:    | Date : <br />
                              Line No :
                            </td>
                            <td>
                              <input type="text" className="form-control" /> <br />
                              <select name="" className="form-select" id="">
                                <option value="">  </option>
                                <option value="">  </option>
                              </select>
                            </td>
                            <td>
                              <input type="text" className="form-control " /> % <br />
                              <button className="vndrbtn">HC</button> <br />
                              <button className="vndrbtn">FC</button>
                            </td>
                            <td>
                              <input type="text" className="form-control" /> <br />
                              <input type="text" className="form-control" />
                            </td>
                            <td>
                              <input type="text" className="form-control w-50" /> % <br />
                              <input type="text" className="form-control" /> <br />
                              <input type="text" className="form-control" />
                            </td>
                            <td>
                              <input type="text" className="form-control" /> <br />
                              <input type="text" className="form-control" />
                            </td>
                            <td>
                              <input type="text" className="form-control w-50" /> % <br />
                              <input type="text" className="form-control" /> <br />
                              <input type="text" className="form-control" />
                            </td>
                            <td>
                              <input type="text" className="form-control w-50" /> % <br />
                              <input type="text" className="form-control" /> <br />
                              <input type="text" className="form-control" />
                            </td>
                            <td>
                              <input type="text" className="form-control w-50" /> % <br />
                              <input type="text" className="form-control" /> <br />
                              <input type="text" className="form-control" />
                            </td>
                            <td>
                              <input type="text" className="form-control w-50" /> % <br />
                              <input type="text" className="form-control" /> <br />
                              <input type="text" className="form-control" />
                            </td>
                            <td> </td>
                            <td> </td>
                            <td> <button className="vndrbtn">X</button> </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <di className="row mt-5">
                    <div className="col-md-12 text-end">
                      <button className="vndrbtn"> Create PO Amendment </button>
                    </div>
                  </di>

                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesOrderItemAddTwo