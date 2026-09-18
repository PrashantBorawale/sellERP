import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./SalesOrderStatus.css";

const SalesOrderStatus = () => {
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
    <div className="SalesOrderStatusMaster">
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
                <div className="SalesOrderStatus mt-5">
                  <div className="SalesOrderStatus-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">Sales Order Status</h5>
                      </div>
                     
                      <div className="col-md-6 text-end">
                        <button type="button" className="btn">
                          Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="SalesOrderStatus-main mt-5">
                    <div className="SalesOrderStatus-tabs">
                      <ul
                        className="nav nav-tabs"
                        id="AssembleEntryTabs"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="query-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#query"
                            type="button"
                            role="tab"
                          >
                            A. Query
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="result-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#result"
                            type="button"
                            role="tab"
                          >
                            B. Result(CustomerPO-Wise)
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="itemwise-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#itemwise"
                            type="button"
                            role="tab"
                          >
                            C. Result (Item Wise)
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="customerwise-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#customerwise"
                            type="button"
                            role="tab"
                          >
                            D. Result (Customer Wise)
                          </button>
                        </li>
                      </ul>


                      <div className="tab-content mt-4" id="SalesOrderStatusTabsContent" >
                         <div
                          className="tab-pane fade show active"
                          id="query"
                          role="tabpanel"
                        >
                            <div className="row text-start">
                                 <div className="col-md-3">
                                    <div className="row mb-2">
                                        <div className="col-4">
                                        <label htmlFor="contractor">
                                            From Date :
                                        </label>
                                        </div>
                                        <div className="col-8">
                                          <input type="date" className="form-control"/>
                                        </div>
                                    </div>
                                 </div>
                                 <div className="col-md-3">
                                 <div className="row mb-2">
                                        <div className="col-4">
                                        <label htmlFor="contractor">
                                            To :
                                        </label>
                                        </div>
                                        <div className="col-8">
                                          <input type="date" className="form-control"/>
                                        </div>
                                    </div>
                                 </div>
                            </div>

                            <div className="row text-start">
                                 <div className="col-md-3">
                                    <div className="row mb-2">
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                        <input type="checkbox" id="Item-checkbox" />
                                        <label htmlFor="customer-checkbox" className="ms-2">FromCust:</label>
                                        </div>
                                        <div className="col-8">
                                          <input type="name" placeholder="Name" className="form-control"/>
                                        </div>
                                    </div>
                                 </div>
                                 <div className="col-md-3">
                                 <div className="row mb-2">
                                        <div className="col-4">
                                        <label htmlFor="contractor">
                                            To :
                                        </label>
                                        </div>
                                        <div className="col-8">
                                          <input type="name" placeholder="Name..." className="form-control"/>
                                        </div>
                                    </div>
                                 </div>
                            </div>

                            <div className="row text-start">
                                 <div className="col-md-3">
                                    <div className="row mb-2">
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                        <input type="checkbox" id="Item-checkbox" />
                                        <label htmlFor="customer-checkbox" className="ms-2">ItemCode:</label>
                                        </div>
                                        <div className="col-8">
                                          <input type="name" placeholder="ItemCode" className="form-control"/>
                                        </div>
                                    </div>
                                 </div>
                                 <div className="col-md-3">
                                 <div className="row mb-2">
                                        <div className="col-4">
                                        <label htmlFor="contractor">
                                            To :
                                        </label>
                                        </div>
                                        <div className="col-8">
                                          <input type="name" placeholder="ItemCode..." className="form-control"/>
                                        </div>
                                    </div>
                                 </div>
                            </div>

                            <div className="row text-start">
                                 <div className="col-md-3">
                                    <div className="row mb-2">
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                        <input type="checkbox" id="Item-checkbox" />
                                        <label htmlFor="customer-checkbox" className="ms-2">CustPO:</label>
                                        </div>
                                        <div className="col-8">
                                          <input type="name" placeholder="CustPO No" className="form-control"/>
                                        </div>
                                    </div>
                                 </div>

                                 <div className="col-md-3">
                                 <div className="row mb-2">
                                        <div className="col-4">
                                        <label htmlFor="contractor">
                                            To :
                                        </label>
                                        </div>
                                        <div className="col-8">
                                          <input type="name" placeholder="CustPO No..." className="form-control"/>
                                        </div>
                                    </div>
                                 </div>
                            </div>

                            <div className="row text-start">
                                 <div className="col-md-3">
                                    <div className="row mb-2">
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                        <input type="checkbox" id="Item-checkbox" />
                                        <label htmlFor="customer-checkbox" className="ms-2">City:</label>
                                        </div>
                                        <div className="col-8">
                                          <input type="name" placeholder="City.." className="form-control"/>
                                        </div>
                                    </div>
                                 </div>               
                            </div>

                            <div className="row text-start">
                            <div className="col-md-3">
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="contractor">
                                    Schedule%:
                                  </label>
                                </div>
                                <div className="col-8">
                                  <select className="form-control">
                                    <option>All</option>
                                    <option>Pendding</option>
                                    <option>Completed</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            </div>

                            <div className="row text-start">
                            <div className="col-md-3">
                              <div className="row mb-2">
                                <div className="col-4">
                                  <label htmlFor="contractor">
                                    Report Type:
                                  </label>
                                </div>
                                <div className="col-8">
                                  <select className="form-control">
                                    <option>CustPo-Wise</option>
                                    <option>Item-Wise</option>
                                    <option>Costomer-Wise</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            </div>

                            <div className="row text-start">
                          <div className="col-md-3">
                            </div>
                            <div className="col-md-3">
                                <button className="btn  btn-primary w-50"> Execute </button>
                            </div>
                            </div>

                        </div>

                        <div
                          className="tab-pane fade"
                          id="result"
                          role="tabpanel"
                        >
                          <div>
                             <div className="table-responsive">
                                <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th>Sr.</th>
                                    <th> Code </th>
                                    <th>Cust Name</th>
                                    <th>So No</th>
                                    <th>SO Date</th>
                                    <th>Cust PO No</th>
                                    <th>Add COde</th>
                                    <th>City</th>
                                    <th>Item No</th>
                                    <th>Item Code</th>
                                    <th>Item Desc</th>
                                    <th>L No</th>
                                    <th> SO Qty</th>
                                    <th>Inv.Qty</th>
                                    <th>Bal.Qty</th>
                                    <th>Comp%</th>
                                    <th>Bal%</th>
                                    <th>#</th>
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
                                    </tr>
                                </tbody>
                                </table>
                             </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="itemwise"
                          role="tabpanel"
                        >
                           <div className="table-responsive">
                                <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th>Item No</th>
                                    <th>Item Code</th>
                                    <th>Item Desc</th>
                                    <th>SO Status No</th>
                                    <th>SO Qty</th>
                                    <th>Inv.Qty</th>
                                    <th>Bal.Qty</th>
                                    <th>Comp%</th>
                                    <th>Bal%</th>
                                    <th>#</th>
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
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="customerwise"
                          role="tabpanel"
                        >
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th>Cust Code</th>
                                    <th>Cust Name</th>
                                    <th>SO Status </th>
                                    <th>SO Qty</th>
                                    <th>Inv.Qty</th>
                                    <th>Bal.Qty</th>
                                    <th>Comp%</th>
                                    <th>Bal%</th>
                                    <th>#</th>
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
                                        <td></td>
                                    </tr>
                                </tbody>
                                </table>
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

export default SalesOrderStatus