import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './OrderLiast.css';
import { useNavigate } from "react-router-dom";


const OrderLiast = () => {
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

    const navigate = useNavigate();
      const handleClose = () => {
          navigate("/NewSalesOrder");
      };

  return (
    <div className="OrderLiastMaster">
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
                <div className="OrderLiast">
                  <div className="OrderLiast-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> Order List </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className=" vndrbtn">
                          Export To Excel
                        </button>
                         <button
                                className="vndrbtn  me-2"
                                aria-label="Close"
                                onClick={handleClose} >
                                X </button>
                      </div>
                    </div>
                  </div>


                  {/* Filter Section */}
                  <div className="OrderLiast-filter">
                    <div className="row text-start">
                      
                      <div className="col-md-1">
                        <label>FromDate</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="col-md-1">
                        <label>ToDate</label>
                        <input type="date" className="form-control" />
                      </div>

                      <div className="col-md-2 margin-5">
                        <label>OrderStatus</label>
                        <select className="form-control">
                          <option value="">All</option>
                          <option value="">Pending</option>
                          <option value="">Accept</option>
                          <option value="">Reject</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>

                      <div className="col-md-2 margin-5">
                        <label>DeliveryStatus</label>
                        <select className="form-control">
                          <option value="">All</option>
                          <option value="">Pending</option>
                          <option value="">Inprocess</option>
                          <option value="">Completed</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>

                      <div className="col-md-2">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label"> Cust Name: </label>
                        </div>
                        <input type="text"  placeholder="Cust Name" className="form-control"/>
                      </div>

                      <div className="col-sm-6 col-md-2 col-lg-2">
                      <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Item Desc: </label>
                        </div>
                        <input type="text" placeholder="Item" className="form-control" />
                      </div> 

                      <div className="col-md-1 mt-4">               
                         <button className=" vndrbtn">Search</button>          
                      </div>

                    </div>        
                  </div>

                  {/* Table Section */}
                  <div className="OrderLiast-Main">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Plant</th>
                          <th>Cust PoNo</th>
                          <th>PO Date</th>
                          <th>Cust Code</th>
                          <th>Cust Name</th>
                          <th>Amount</th>
                          <th>Edit</th>
                          <th>Email</th>
                          <th>Order Status</th>
                          <th>Doc</th>
                          <th>Status Date</th>
                          <th>Order Entry</th>
                          <th>Order Deli. </th>
                          <th>DOC</th>
                          <th>GRN Date</th>
                          <th>View</th>
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
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        
                          <td>
                            <button className=" vndrbtn">
                              <i className="fas fa-eye"></i>
                            </button>
                          </td>
                        </tr>
                        {/* Additional rows can be added dynamically here */}
                      </tbody>
                    </table>
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


export default OrderLiast