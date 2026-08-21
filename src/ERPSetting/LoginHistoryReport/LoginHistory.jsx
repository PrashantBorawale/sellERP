import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./LoginHistory.css";

const LoginHistory = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("lastLogin");
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    userType: "",
  });

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="LoginHistory">
      <NavBar toggleSideNav={toggleSideNav} />
      <div className="main-wrapper">
        <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
        <div className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
          <div className="History container-fluid">
            <div className="password-header mb-4">
              <h5 className="header-title">Login History Report</h5>
            </div>
            <div className="tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "lastLogin" ? "active" : ""}`}
                    onClick={() => setActiveTab("lastLogin")}
                  >
                    Last Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "loginHistory" ? "active" : ""}`}
                    onClick={() => setActiveTab("loginHistory")}
                  >
                    Login History
                  </button>
                </li>
              </ul>
              <div className="tab-content" style={{border:"none"}}>
                {activeTab === "lastLogin" && (
                  <div className="tab-pane fade show active">
                              <div className="table-responsive">
                    <table className="table table-bordered mt-3">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>User Name</th>
                          <th>Last Login</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>John Doe</td>
                          <td>2024-10-09 10:30 AM</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Jane Smith</td>
                          <td>2024-10-08 09:15 AM</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                )}
                {activeTab === "loginHistory" && (
                  <div className="tab-pane fade show active">
                    <div className="row mb-3 text-start">
                      <div className="col-md-2">
                        <label>From Date:</label>
                        <input
                          type="date"
                          name="fromDate"
                          value={formData.fromDate}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-2">
                        <label>To Date:</label>
                        <input
                          type="date"
                          name="toDate"
                          value={formData.toDate}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-2">
                        <label>User Type:</label>
                        <select
                          name="userType"
                          value={formData.userType}
                          onChange={handleInputChange}
                          className="form-control"
                          style={{marginTop:"-1px"}}
                        >
                          <option value="">Select</option>
                          <option value="All">All</option>
                          <option value="Director">Director</option>
                          <option value="Admin">Admin</option>
                          <option value="Ac">Ac</option>
                          <option value="Sales">Sales</option>
                          <option value="Store">Store</option>
                          <option value="Planning">Planning</option>
                          <option value="Purchase">Purchase</option>
                          <option value="CRM">CRM</option>
                          <option value="Account">Account</option>
                        </select>
                      </div>
                      <div className="col-md-4 d-flex align-items-end mb-1">
                        <button style={{padding:"6px"}} className="btn  me-2">Search</button>
                        <button style={{padding:"6px"}} className="btn  ">Export To Excel</button>
                      </div>
                    </div>
                    <div className="table-responsive">
                    <table className="table table-bordered mt-3">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>User Name</th>
                          <th>Login Time</th>         
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>John Doe</td>
                          <td>2024-10-09 10:30 AM</td>     
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Jane Smith</td>
                          <td>2024-10-08 09:15 AM</td>
                        
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHistory;
