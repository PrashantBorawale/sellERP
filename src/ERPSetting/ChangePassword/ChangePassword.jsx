import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./ChangePassword.css";

const ChangePassword = () => {
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
    <div className="ChangePassword">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Password">
                  <div className="password-header mb-4">
                    <div className="row">
                      <div className="col-md-12">
                        <h5 className="header-title text-start">Change Password</h5>
                      </div>
                    </div>
                  </div>
                  <div className="row text-start">
                    <div className="col-lg-8 col-md-10 col-sm-12">
                      <div className="form-group row mb-3">
                        <label className="col-sm-3 col-form-label">User Name:</label>
                        <div className="col-sm-5">
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <label className="col-sm-3 col-form-label">User Type:</label>
                        <div className="col-sm-5">
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <label className="col-sm-3 col-form-label">Enter Old Password:</label>
                        <div className="col-sm-5">
                          <input type="password" className="form-control" />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <label className="col-sm-3 col-form-label">Enter New Password:</label>
                        <div className="col-sm-5">
                          <input type="password" className="form-control" />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <label className="col-sm-3 col-form-label">Re-Enter Password:</label>
                        <div className="col-sm-5">
                          <input type="password" className="form-control" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-sm-5 offset-sm-3">
                          <button type="button" className="btn passbtn">Update Password</button>
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

export default ChangePassword;
