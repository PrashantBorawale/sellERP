import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './Emailsetup.css'
import DefaultSettingsModal from "./DefaultSettingModel/DefaultSettingsModal.jsx";
const Emailsetup = () => {
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

  const [formData, setFormData] = useState({
    emailFor: "default",
    serverHostname: "",
    serverPort: "",
    displayName: "",
    username: "",
    password: "",
    enableSsl: false,
    useDefaultCredentials: false
  });

  const [emailConfigs,] = useState([
    {
      id: 1,
      emailFor: "Purchase",
      emailServer: "smtp.gmail.com",
      port: "587",
      name: "Purchase",
      emailType: "Sender",
      emailId: "ppc@sharp-engineers.com"
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleClear = () => {
    setFormData({
      emailFor: "default",
      serverHostname: "",
      serverPort: "",
      displayName: "",
      username: "",
      password: "",
      enableSsl: false,
      useDefaultCredentials: false
    });
  };
  const [isDefaultSettingsOpen, setIsDefaultSettingsOpen] = useState(false);

  return (
    <div className="EmailsetUp">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="Main-NavBar">
            <NavBar toggleSideNav={toggleSideNav} />
            <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
            <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
              <div className="EmailsetUp mt-5">
                <div className="EmailsetUp-header mb-4 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h5 className="header-title">MIS Report Email Setting</h5>
                    </div>
                   
                      <div className="col-md-6 text-end">
                      
                        <button type="button" className="btn"  onClick={() => setIsDefaultSettingsOpen(true)}>
                          Default Setting
                        </button>

                        <DefaultSettingsModal   isOpen={isDefaultSettingsOpen} 
  onClose={() => setIsDefaultSettingsOpen(false)} />
                       
                      </div>
                  </div>
                </div>

                <div className="EmailSetup-main">
                  <div className="row text-start">
                    <div className="col-md-4">
                    <form onSubmit={handleSubmit} className="email-form">
                          <div className="form-group">
                            <label>Email For:</label>
                            <select 
                              name="emailFor" 
                              value={formData.emailFor}
                              onChange={handleInputChange}
                              className="form-control"
                            >
                              <option value="default">Default</option>
                              <option value="purchase">Purchase</option>
                              <option value="sales">Sales</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Server Hostname:</label>
                            <input
                              type="text"
                              name="serverHostname"
                              value={formData.serverHostname}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </div>

                          <div className="form-group">
                            <label>Server Port:</label>
                            <input
                              type="text"
                              name="serverPort"
                              value={formData.serverPort}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </div>

                          <div className="form-group">
                            <label>Display Name (Sender Name):</label>
                            <input
                              type="text"
                              name="displayName"
                              value={formData.displayName}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </div>

                          <div className="form-group">
                            <label>User name:</label>
                            <input
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </div>

                          <div className="form-group">
                            <label>Password:</label>
                            <input
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </div>

                          <div className="form-check">
                            <input
                              type="checkbox"
                              name="enableSsl"
                              checked={formData.enableSsl}
                              onChange={handleInputChange}
                              className="form-check-input"
                              id="enableSsl"
                            />
                            <label className="form-check-label" htmlFor="enableSsl">
                              EnableSsl
                            </label>
                          </div>

                          <div className="form-check">
                            <input
                              type="checkbox"
                              name="useDefaultCredentials"
                              checked={formData.useDefaultCredentials}
                              onChange={handleInputChange}
                              className="form-check-input"
                              id="useDefaultCredentials"
                            />
                            <label className="form-check-label" htmlFor="useDefaultCredentials">
                              UseDefaultCredentials
                            </label>
                          </div>

                          <div className="button-group">
                            <button type="submit" className="btn btn-primary">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear</button>
                          </div>
</form>
                    </div>
                    <div className="col-md-8">
                       <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Sr.No</th>
                                <th>Email For</th>
                                <th>Email Server</th>
                                <th>Port</th>
                                <th>Name</th>
                                <th>Email Type</th>
                                <th>EmailId</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {emailConfigs.map((config, index) => (
                                <tr key={config.id}>
                                  <td>{index + 1}</td>
                                  <td>{config.emailFor}</td>
                                  <td>{config.emailServer}</td>
                                  <td>{config.port}</td>
                                  <td>{config.name}</td>
                                  <td>{config.emailType}</td>
                                  <td>{config.emailId}</td>
                                  <td>
                                    <button className="btn btn-link">Edit</button>
                                    <button className="btn btn-link text-danger">Delete</button>
                                  </td>
                                </tr>
                              ))}
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
  
  )
}

export default Emailsetup
