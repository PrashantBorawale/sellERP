import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Tab, Tabs } from "react-bootstrap"; // Importing Tabs and Tab from react-bootstrap
import "./Customersupplier.css";

const Customersupplier = ({ form, onSubmit }) => {
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
    <div className="Customersupplier">
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
                <div className="Customersupplier mt-5">
                  <div className="Customersupplier-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">
                          Customer / Supplier - Master Setting
                        </h5>
                      </div>
                    </div>
                  </div>

                  {/* Tabs Section */}
                  <Tabs defaultActiveKey="settings" className="mb-3 mt-5">
                    <Tab eventKey="settings" title="Settings">
                      <form>
                        <div className="Customersupplier-main">
                          <div className="row text-start">
                            <div className="col-md-8 text-start">

                            
                          <div className="form-group row">
                            <label className="col-md-3 form-label">
                              Select Party Name:
                            </label>
                            <div className="col-md-6">
                              <input type="text" className="form-control" />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-md-3 form-label">
                              1. Invoice Block Days
                            </label>
                            <div className="col-md-1">
                              <input type="number" className="form-control" />
                            </div>
                            <label className="col-md-1 form-label mt-2">
                              Action
                            </label>
                            <div className="col-md-2">
                              <select className="form-control">
                                <option value="ignore">Ignore</option>
                                <option value="block">Block</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <label className="form-info">
                                Check Packing Note And Invoice Days Diff
                              </label>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-md-3 form-label">
                              2. Jobwork Bill Pass
                            </label>
                            <div className="col-md-3">
                              <select className="form-control">
                                <option value="yes">YES</option>
                                <option value="no">NO</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <label className="form-info">
                                57F4 Inward Challan: Jobwork Bill Passing
                                Optional
                              </label>
                            </div>
                          </div>

                       
                          <div className="form-group row">
                            <label className="col-md-3 form-label">
                              3. Purchase GRN Bill Pass
                            </label>
                            <div className="col-md-3">
                              <select className="form-control">
                                <option value="yes">YES</option>
                                <option value="no">NO</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <label className="form-info">
                                Purchase GRN - Purchase GRN Bill Passing
                                Optional
                              </label>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-md-3 form-label">
                              4. Subcon BOM Inward Type
                            </label>
                            <div className="col-md-3">
                              <select className="form-control">
                                <option value="yes">YES</option>
                                <option value="no">NO</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <label className="form-info">
                                Subcon GRN - BOM Inward Type Allowed
                              </label>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-md-3 form-label">
                              5. Sales Invoice Bill Pass
                            </label>
                            <div className="col-md-3">
                              <select className="form-control">
                                <option value="yes">YES</option>
                                <option value="no">NO</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <label className="form-info">
                                Sales Invoice Bill Passing Optional
                              </label>
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="col-md-2">
                              <button
                                type="submit"
                                className="btn btn-primary w-100"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                          </div>
                          </div>
                        </div>
                      </form>
                    </Tab>

                    <Tab eventKey="setting-list" title="Setting List">
                      {/* Content for Setting List */}
                      <div className="setting-list-content">
                        
                        <div className="setting-list">
                          <div className="row text-start mb-5">
                            <div className="col-md-2">
                              <button type="button" className="btn">View All</button>
                            </div>
                          </div>
                        </div>
                        <div className="setting-list">
                          <table>
                            <thead>
                              <tr>
                                <th>No Data Found !!!</th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customersupplier;
