import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
// import "./OrderList.css"; // Add a CSS file for styling

const OrderList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    orderStatus: "",
    deliveryStatus: "",
    customerName: "",
    itemDesc: "",
  });

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className={`order-list ${sideNavOpen ? "side-nav-active" : ""}`}>
      <NavBar toggleSideNav={toggleSideNav} />
      <div className="main-container">
        <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
        <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
          <div className="content-area">
            <div className="row text-start mt-3">
              <div className="col-lg-2 col-md-3 col-12 submenu">
                <h4>Sub Menu</h4>
                <h6 className="portal-login">Portal Login!</h6>
                <ul className="submenu-links">
                  <li>
                    <Link to="/order-list">Order List</Link>
                  </li>
                  <li>
                    <Link to="/view-stack">View Stock</Link>
                  </li>
                  <li>
                    <Link to="/user-List">User List</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-10 col-md-9 col-12 content">
                <div className="order mt-5">
                  <div className="order-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-10">
                        <h5 className="header-title">Order List</h5>
                      </div>
                      <div className="col-md-2 text-end">
                        <button type="button" className="btn">
                          Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-1 mb-2">
                    <label>From Date:</label>
                    <input
                      type="date"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-1 mb-2">
                    <label>To Date:</label>
                    <input
                      type="date"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-2 mb-2">
                    <label>Order Status:</label>
                    <select
                      name="orderStatus"
                      value={formData.orderStatus}
                      onChange={handleInputChange}
                      className="form-control"
                      style={{marginTop:'-1px'}}
                    >
                      <option value="">Select</option>
                      <option value="All">All</option>
                      <option value="Pending">Pending</option>
                      <option value="Inprocess">Inprocess</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="col-md-2 mb-2">
                    <label>Delivery Status:</label>
                    <select
                      name="deliveryStatus"
                      value={formData.deliveryStatus}
                      onChange={handleInputChange}
                      className="form-control"
                      style={{marginTop:'-1px'}}
                    >
                      <option value="">Select</option>
                      <option value="All">All</option>
                      <option value="Pending">Pending</option>
                      <option value="Inprocess">Inprocess</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="col-md-2 mb-2">
                    <label>Customer Name:</label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-2 mb-2">
                    <label>Item No/Desc:</label>
                    <input
                      type="text"
                      name="itemDesc"
                      value={formData.itemDesc}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div
                    className="col-md-1 d-flex align-items-end "
                    style={{ marginBottom: "17px" }}
                  >
                    <button className="btn btn-primary">Search</button>
                  </div>
                </div>

                <table className="table table-bordered table-responsive-sm mt-3">
                  <thead>
                    <tr>
                      <th>Sr.</th>
                      <th>Plant</th>
                      <th>CodePoNo</th>
                      <th>PoDate</th>
                      <th>CustCode</th>
                      <th>CustName</th>
                      <th>Amount</th>
                      <th>Edit</th>
                      <th>Email</th>
                      <th>Order Status</th>
                      <th>Doc</th>
                      <th>Status Date</th>
                      <th>Order Entry</th>
                      <th>Order Delivery</th>
                      <th>GRN Date</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>{/* Populate table rows here */}</tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderList;
