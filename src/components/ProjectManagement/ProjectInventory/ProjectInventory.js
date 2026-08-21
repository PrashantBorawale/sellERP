import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import "./ProjectInventory.css";
import { useNavigate } from "react-router-dom";

const ProjectInventory = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const navigate = useNavigate();
  const handleInventoryStatusClick = () => {
    navigate("/project-management");
  };

  const [showStatusUpdateCard, setShowStatusUpdateCard] = useState(false);
  const [showPrintStatusCard, setShowPrintStatusCard] = useState(false);
  const handleStatusUpdateClick = () => {
    setShowStatusUpdateCard(!showStatusUpdateCard);
  };

  const handlePrintStatusClick = () => {
    setShowPrintStatusCard(!showPrintStatusCard);
  };

  return (
    <div className="ProjectInventory">
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
                <div className="ProjectInventorymaster">
                  <div className="ProjectInventory1">
                  <div className="ProjectInventory1-header mb-4 text-start mt-5">
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <h5 className="header-title">Project Inventory Status</h5>
                        </div>
                        <div className="col-md-9 text-md-end text-start mt-2 mt-md-0">
                          <button
                            className="btn me-2"
                            onClick={handleStatusUpdateClick}
                          >
                            Project Status Update
                          </button>
                          <button
                            className="btn me-2"
                            onClick={handlePrintStatusClick}
                          >
                            Print Project Status
                          </button>
                          <button
                            className="btn"
                            onClick={handleInventoryStatusClick}
                          >
                            Project List
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {showStatusUpdateCard && (
                    <div className="Prooverlay">
                      <div className="card">
                        <div className="card-header">
                          Project Inventory Status Update
                          <button
                            type="button"
                            className="close"
                            onClick={handleStatusUpdateClick}
                          >
                            &times;
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="Projectcard">
                            <div className="container-fluid">
                              <div className="row text-start Projectcardselect">
                                <div className="col-md-6 col-sm-3 mb-3 mb-sm-0">
                                  <label
                                    htmlFor="selectPlant"
                                    className="col-form-label"
                                  >
                                    Project Name Desc:
                                  </label>
                                </div>
                                <div className="col-md-3 col-sm-9 mb-3 mb-sm-0">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                  />
                                </div>
                                <div className="col-md-3 col-sm-12 text-sm-start text-md-end">
                                  <button className="btnProjectcardkk">
                                    <i className="bi bi-search"></i> Search
                                  </button>
                                </div>
                              </div>
                              <div className="row text-start Projectcardselect">
                                <div className="col-md-6 col-sm-3 mb-3 mb-sm-0">
                                  <label
                                    htmlFor="selectPlant"
                                    className="col-form-label"
                                  >
                                    Equipment:
                                  </label>
                                </div>
                                <div className="col-md-3 col-sm-9 mb-3 mb-sm-0">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showPrintStatusCard && (
                    <div className="Printoverlay">
                      <div className="card">
                        <div className="card-header">
                          Print Project Status
                          <button
                            type="button"
                            className="close"
                            onClick={handlePrintStatusClick}
                          >
                            &times;
                          </button>
                        </div>
                        <div className="card-body"></div>
                      </div>
                    </div>
                  )}
                  <div className="ProjectInventoryMain mt-5">
                    <div className="container-fluid">
                      <div className="row text-start ProjectInventoryselect">
                        <div className="col-md-2 col-sm-3 mb-3 mb-sm-0">
                          <label
                            htmlFor="selectPlant"
                            className="col-form-label"
                          >
                            Project Name Desc:
                          </label>
                        </div>
                        <div className="col-md-3 col-sm-9 mb-3 mb-sm-0">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                          />
                        </div>
                        <div className="col-md-1 col-sm-12 text-sm-start text-md-end mt-1">
                          <button className="btn">
                            Search
                          </button>
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

export default ProjectInventory;
