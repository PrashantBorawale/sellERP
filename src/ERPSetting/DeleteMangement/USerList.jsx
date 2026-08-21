import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
// import "./USerList.css";

const UserList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    plant: "All",
  });

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className={`user-list ${sideNavOpen ? "side-nav-active" : ""}`}>
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
                  <li><Link to="/order-list">Order List</Link></li>
                  <li><Link to="/view-stack">View Stock</Link></li>
                  <li><Link to="/user-list">User List</Link></li>
                </ul>
              </div>
              <div className="col-lg-10 col-md-9 col-12 content">
                <div className="order-header mb-4 d-flex justify-content-between align-items-center">
                  <h5 className="header-title">User List</h5>
                </div>

                <div className="row mb-3">
                  <div className="col-md-2 mb-2">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-2 mb-2">
                    <label>User Name:</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-2 mb-2">
                    <label>Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-2 mb-2">
                    <label>Plant:</label>
                    <select
                      name="plant"
                      value={formData.plant}
                      onChange={handleInputChange}
                      className="form-control"
                      style={{marginTop:"1px"}}
                    >
                      <option value="All">ALL</option>
                      <option value="Plant 1">Plant 1</option>
                      <option value="Plant 2">Plant 2</option>
                    </select>
                  </div>
                  <div className="col-md-2 d-flex align-items-end" style={{marginBottom:"17px"}}>
                    <button className="btn btn-primary me-2">Save</button>
                    <button className="btn btn-primary">Cancel</button>
                  </div>
                </div>

                <table className="table table-bordered table-responsive-sm mt-3">
                  <thead>
                    <tr>
                      <th>Sr.</th>
                      <th>Plant</th>
                      <th>Name</th>
                      <th>User Name</th>
                      <th>Password</th>
                      <th>Credit Limit</th>
                      <th>Status</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Populate table rows here */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserList;

