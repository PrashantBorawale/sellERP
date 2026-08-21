import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import { useNavigate } from "react-router-dom";
import "./ProjectManagement.css";
const ProjectManagement = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };
  const navigate = useNavigate();
  const handleInventoryStatusClick = () => {
    navigate("/project-inventory-status");
  };

  const [showAddNewCard, setShowAddNewCard] = useState(false);
  const [showViewAllCard, setShowViewAllCard] = useState(false);
  const [showSystemMasterCard, setShowSystemMasterCard] = useState(false);
  const [showProjectQueryCard, setShowProjectQueryCard] = useState(false);
  const [activeTab, setActiveTab] = useState("query");

  const handleAddNewClick = () => {
    setShowAddNewCard(!showAddNewCard);
  };
  const handleViewAllClick = () => {
    setShowViewAllCard(!showViewAllCard);
  };
  const handleSystemMasterClick = () => {
    setShowSystemMasterCard(!showSystemMasterCard);
  };
  const handleProjectQueryClick = () => {
    setShowProjectQueryCard(!showProjectQueryCard);
  };

  const [showAddNewCard1, setShowAddNewCard1] = useState(false);
  const handleAddNewClick1 = () => {
    setShowAddNewCard1(!showAddNewCard1);
  };

  return (
    <div className="Project">
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
                <div className="Projectrmaster">
                  <div className="Project1-header mb-4 text-start mt-5">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <h5 className="header-title">Project List</h5>
                        </div>
                        <div className="col-md-10 text-md-end text-start mt-2 mt-md-0">
                          <button
                            className="btn me-2"
                            onClick={handleInventoryStatusClick}
                          >
                            Project Inventory Status
                          </button>
                          <button
                            className="btn  me-2"
                            onClick={handleAddNewClick}
                          >
                            Add New
                          </button>
                          <button
                            className="btn"
                            onClick={handleViewAllClick}
                          >
                            View All
                          </button>
                          <button
                            className="btn me-2"
                            onClick={handleSystemMasterClick}
                          >
                            System Master
                          </button>
                          <button
                            className="btn  me-2"
                            onClick={handleProjectQueryClick}
                          >
                            Project - Query
                          </button>
                          <button className="btn">
                            Export To Excel
                          </button>
                        </div>
                      </div>
                    </div>
            
                  {/* <div className="ProjectMain">
                    <div className="container-fluid">
                      <div className="row text-start Projectselect">
                        <div className="col-md-1 col-sm-3 mb-3 mb-sm-0">
                          <label
                            htmlFor="selectPlant"
                            className="col-form-label"
                          >
                            Select Plant
                          </label>
                        </div>
                        <div className="col-md-3 col-sm-9 mb-3 mb-sm-0">
                          <select
                            id="selectPlant"
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Produlink</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                        <div className="col-md-2 col-sm-3 mb-3 mb-sm-0">
                          <label
                            htmlFor="machineType"
                            className="col-form-label"
                          >
                            Machine Type
                          </label>
                        </div>
                        <div className="col-md-3 col-sm-9 mb-3 mb-sm-0">
                          <select
                            id="machineType"
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>ALL</option>
                            <option value="1">CENTERLESS GRINDING</option>
                            <option value="2">CNC</option>
                            <option value="3">DRILLING</option>
                            <option value="1">GRINDER</option>
                            <option value="2">INDUCTION</option>
                            <option value="3">LATHE</option>
                            <option value="1">MANUAL</option>
                            <option value="2">MILLING</option>
                            <option value="3">PRESS</option>
                            <option value="1">SECOND OPERATION</option>
                            <option value="2">SPM</option>
                            <option value="3">TAPPING</option>
                            <option value="1">THREAD ROLLING</option>
                            <option value="2">TROUB</option>
                            <option value="3">VMC</option>
                          </select>
                        </div>
                        <div className="col-md-3 col-sm-12 text-sm-start text-md-end">
                          <button className="btnProjectkk">
                            <i className="bi bi-search"></i> Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {showAddNewCard && (
                    <div className="Addcardoverlay">
                      <div className="card">
                        <div className="card-header">
                          Add New Project
                          <button
                            type="button"
                            className="close"
                            onClick={handleAddNewClick}
                          >
                            &times;
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="container text-start">
                            <div className="row">
                              <div className="col-md-3 mb-3">
                                <label
                                  htmlFor="selectProjectName"
                                  className="form-label"
                                >
                                  Project Name:
                                </label>
                              </div>
                              <div className="col-md-6 mb-3">
                                <select
                                  className="form-select"
                                  id="selectProjectName"
                                >
                                  <option value="1">Project A</option>
                                  <option value="2">Project B</option>
                                  <option value="3">Project C</option>
                                </select>
                              </div>
                              <div className="col-md-1 mb-3">
                                <button
                                  className="btn"
                                  onClick={handleAddNewClick1}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                              <div className="col-md-2 mb-3">
                                <button className="btn">
                                  <i className="fas fa-sync-alt"></i>
                                </button>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3 mb-3">
                                <label
                                  htmlFor="selectProjectName"
                                  className="form-label"
                                >
                                  System:
                                </label>
                              </div>
                              <div className="col-md-6 mb-3">
                                <select
                                  className="form-select"
                                  id="selectProjectName"
                                >
                                  <option value="1">Project A</option>
                                  <option value="2">Project B</option>
                                  <option value="3">Project C</option>
                                </select>
                              </div>
                              <div className="col-md-1 mb-3">
                                <button
                                  className="btn"
                                  onClick={handleAddNewClick1}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                              <div className="col-md-2 mb-3">
                                <button className="btn">
                                  <i className="fas fa-sync-alt"></i>
                                </button>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-2 mb-3">
                                <button className="btn">Save</button>
                              </div>
                              <div className="col-md-2 mb-3">
                                <button className="btn">Clear</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showAddNewCard1 && (
                    <div className="Addcard1overlay1">
                      <div className="card">
                        <div className="card-header">
                          New Project
                          <button
                            type="button"
                            className="close"
                            onClick={handleAddNewClick1}
                          >
                            &times;
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="container text-start">
                            <div className="row">
                              <div className="col-md-3 mb-3">
                                <label
                                  htmlFor="selectProjectName"
                                  className="form-label"
                                >
                                  Project Code:
                                </label>
                              </div>
                              <div className="col-md-6 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                              <div className="col-md-3 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3 mb-3">
                                <label
                                  htmlFor="selectProjectName"
                                  className="form-label"
                                >
                                  Project Name:
                                </label>
                              </div>
                              <div className="col-md-9 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3 mb-3">
                                <label
                                  htmlFor="selectProjectName"
                                  className="form-label"
                                >
                                  Project Date:
                                </label>
                              </div>
                              <div className="col-md-9 mb-3">
                                <input
                                  type="Date"
                                  className="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-2 mb-3">
                                <button className="btn">Save</button>
                              </div>
                              <div className="col-md-2 mb-3">
                                <button className="btn">Clear</button>
                              </div>
                            </div>
                          </div>
                          <div className="addcardtable">
                            <div className="container">
                              <div className="row">
                                <div className="col-md-12">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>No Found Data !!</th>
                                      </tr>
                                    </thead>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showViewAllCard && (
                    <div className="viewalloverlay">
                      <div className="card">
                        <div className="card-header">
                          View All Projects
                          <button
                            type="button"
                            className="close"
                            onClick={handleViewAllClick}
                          >
                            &times;
                          </button>
                        </div>
                        <div className="card-body">
                          <p>List of all projects</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {showSystemMasterCard && (
                    <div className="systemcardoverlay">
                      <div className="card">
                        <div className="card-header">
                          System Master
                          <button
                            type="button"
                            className="close"
                            onClick={handleSystemMasterClick}
                          >
                            &times;
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-2 mb-3">
                                <label
                                  htmlFor="selectProjectName"
                                  className="form-label"
                                >
                                  System Code:
                                </label>
                              </div>
                              <div className="col-md-3 mb-3">
                                <input
                                  type="email"
                                  className="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                              <div className="col-md-2 mb-3">
                                <label
                                  htmlFor="selectProjectName"
                                  className="form-label"
                                >
                                  System Name:
                                </label>
                              </div>
                              <div className="col-md-3 mb-3">
                                <input
                                  type="email"
                                  className="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                              <div className="col-md-1 mb-3">
                                <button className="btn">Save</button>
                              </div>
                            </div>
                          </div>
                          <div className="container">
                            <div className="row text-start">
                              <table>
                                <thead>
                                  <tr>
                                    <th>No Found Data !!</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showProjectQueryCard && (
                    <div className="Projectqueryoverlay">
                      <div className="card">
                        <div className="card-header">
                          <h5>Project Query</h5>
                          <button
                            type="button"
                            className="close"
                            onClick={handleProjectQueryClick}
                          >
                            &times;
                          </button>
                        </div>
                        <div className="card-body d-flex flex-column">
                          <div className="row flex-grow-1">
                            <div className="col-md-12  text-start overflow-auto">
                              <ul className="nav nav-tabs ">
                                <li className="nav-item">
                                  <button
                                    className={`nav-link ${
                                      activeTab === "query" ? "active" : ""
                                    }`}
                                    onClick={() => setActiveTab("query")}
                                  >
                                    Query
                                  </button>
                                </li>
                                <li className="nav-item">
                                  <button
                                    className={`nav-link ${
                                      activeTab === "result" ? "active" : ""
                                    }`}
                                    onClick={() => setActiveTab("result")}
                                  >
                                    Result
                                  </button>
                                </li>
                              </ul>

                              {activeTab === "query" && (
                                <form>
                                  <div className="mb-3">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label
                                          htmlFor="projectName"
                                          className="form-label"
                                        >
                                          Project Name:
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="projectName"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label
                                          htmlFor="systemName"
                                          className="form-label"
                                        >
                                          System Name:
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="systemName"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label
                                          htmlFor="equipmentName"
                                          className="form-label"
                                        >
                                          Equipment Name:
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <select
                                          className="form-select"
                                          id="equipmentName"
                                        >
                                          <option value="">
                                            Select Equipment
                                          </option>
                                          <option value="1">Equipment A</option>
                                          <option value="2">Equipment B</option>
                                          <option value="3">Equipment C</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label
                                          htmlFor="itemName"
                                          className="form-label"
                                        >
                                          Item:
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="itemName"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label
                                          htmlFor="mainGroup"
                                          className="form-label"
                                        >
                                          Main Group:
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <select
                                          className="form-select"
                                          id="mainGroup"
                                        >
                                          <option value="">
                                            Select Main Group
                                          </option>
                                          <option value="1">Group A</option>
                                          <option value="2">Group B</option>
                                          <option value="3">Group C</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label
                                          htmlFor="itemGroup"
                                          className="form-label"
                                        >
                                          Item Group:
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <select
                                          className="form-select"
                                          id="itemGroup"
                                        >
                                          <option value="">
                                            Select Item Group
                                          </option>
                                          <option value="1">Group 1</option>
                                          <option value="2">Group 2</option>
                                          <option value="3">Group 3</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label
                                          htmlFor="itemGrade"
                                          className="form-label"
                                        >
                                          Item Grade:
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <select
                                          className="form-select"
                                          id="itemGrade"
                                        >
                                          <option value="">
                                            Select Item Grade
                                          </option>
                                          <option value="1">Grade 1</option>
                                          <option value="2">Grade 2</option>
                                          <option value="3">Grade 3</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label
                                          htmlFor="queryName"
                                          className="form-label"
                                        >
                                          Query Name:
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <select
                                          className="form-select"
                                          id="queryName"
                                        >
                                          <option value="">
                                            Select Query Name
                                          </option>
                                          <option value="1">Query 1</option>
                                          <option value="2">Query 2</option>
                                          <option value="3">Query 3</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-4">
                                      <button type="submit" className="btn">
                                        Execute
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              )}
                              {activeTab === "result" && (
                                <div>
                                  {/* Placeholder for result content */}
                                  Result Content
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="ProjectTable">
                    <div className="container-fluid">
                      <div className="table-responsive">
                        <table className="table">
                          <thead className="table-primary">
                            <tr>
                              <th className="text-start">No Found Data !!!</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
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

export default ProjectManagement;
