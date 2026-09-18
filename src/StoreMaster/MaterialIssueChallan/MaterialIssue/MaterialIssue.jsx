import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./MaterialIssue.css";

const MaterialIssue = () => {
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

  // Models
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);

  const handleModalClose1 = () => setShowModal1(false);
  const handleModalOpen1 = () => setShowModal1(true);

  const handleModalClose2 = () => setShowModal2(false);
  const handleModalOpen2 = () => setShowModal2(true);

  return (
    <div className="NewStoreMaterialIssueee">
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
                <div className="MaterialIssueee-header mb-4 text-start mt-5">
  <h5 className="header-title text-start" style={{ fontWeight: 800, fontSize: '1.8rem', background: 'linear-gradient(90deg, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '16px' }}>
    New Material Issue
  </h5>
  <div className="d-flex flex-wrap align-items-center gap-3 w-100 mt-2">
    <div className="d-flex align-items-center gap-2">
      <label htmlFor="sharpSelect" className="form-label mb-0">Plant:</label>
      <select id="sharpSelect" className="form-select w-auto"><option selected>VISHWA S.I.</option></select>
    </div>
    <div className="d-flex align-items-center gap-2">
      <input type="text" id="inputField" className="form-control" placeholder="Enter value" style={{width: 'auto'}} />
    </div>
    <div className="d-flex align-items-center gap-2 ms-auto">
      <Link className="btn btn-primary" to="/Work-Issue-Report">WorkOrder Material Issue Report</Link>
    </div>
  </div>
</div>

                <div className="MaterialIssueee-main">
  <div className="container-fluid">
    <div className="d-flex flex-wrap align-items-center gap-3 w-100 mt-2 mb-4">
      <div className="d-flex align-items-center gap-2">
        <label htmlFor="seriesSelect" className="form-label mb-0">Series:</label>
        <select id="seriesSelect" className="form-select w-auto">
          <option selected>Select</option>
          <option value="Material Issue">Material Issue</option>
        </select>
      </div>
      <div className="d-flex align-items-center gap-2">
        <label htmlFor="TypeSelect" className="form-label mb-0">Type:</label>
        <select id="TypeSelect" className="form-select w-auto">
          <option selected>Select</option>
          <option value="Material Issue">Material Issue</option>
        </select>
      </div>
      <div className="d-flex align-items-center gap-2">
        <select id="TypeSelect" className="form-select w-auto">
          <option selected>Select</option>
          <option value="Material Issue">Material Issue</option>
        </select>
      </div>
    </div>
  </div>

                  <div className="StoreMaterialIssueee">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Item Desc</th>
                              <th>BOM | WO | Req. Qty</th>
                              <th>Issued | Bal Qty</th>
                              <th>Stock</th>

                              <th>
                                Qty{" "}
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={handleModalOpen}
                                >Add</button>
                              </th>
                              <th>
                                Machine{" "}
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={handleModalOpen1}
                                >Add</button>
                              </th>
                              <th>Nature of Work</th>
                              <th>
                                MRN No:{" "}
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={handleModalOpen1}
                                >Add</button>
                                Cail No:
                              </th>
                              <th>
                                Employee:{" "}
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={handleModalOpen2}
                                >See All</button>
                              </th>

                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><input className="form-control" style={{ minWidth: "100px" }} /></td>
                              <td><input className="form-control" style={{ minWidth: "100px" }} /></td>
                              <td><input className="form-control" style={{ minWidth: "100px" }} /></td>
                              <td><input className="form-control" style={{ minWidth: "100px" }} /></td>
                              <td><input className="form-control" style={{ minWidth: "100px" }} /></td>
                              <td><input className="form-control" style={{ minWidth: "100px" }} /></td>
                              <td><input className="form-control" style={{ minWidth: "100px" }} /></td>
                              <td><input className="form-control" style={{ minWidth: "100px" }} /></td>
                              <td><input className="form-control" style={{ minWidth: "100px" }} /></td>
                              <td><input className="form-control" style={{ minWidth: "100px" }} /></td>

                              <td>
                                <FaEdit className="text-primary" />
                              </td>
                              <td>
                                <FaTrash className="text-danger" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Modal Components */}
                      <div
                        className={`modal fade ${
                          showModal ? "show d-block" : ""
                        }`}
                        tabIndex="-1"
                        role="dialog"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Search</h5>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={handleModalClose}
                              >
                                X
                              </button>
                            </div>
                            <div className="modal-body">
                              <div className="container-fluid">
                                <div className="row mb-3">
                                  <div className="col-md-6">
                                    <label className="form-label">
                                      Select Employee:
                                    </label>
                                  </div>
                                  <div className="col-md-6">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-primary">See ALL</button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleModalClose}
                              >Close</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`modal fade ${
                          showModal1 ? "show d-block" : ""
                        }`}
                        tabIndex="-1"
                        role="dialog"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Add Type</h5>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={handleModalClose1}
                              >
                                X
                              </button>
                            </div>
                            <div className="modal-body">
                              <div className="container-fluid">
                                <div className="row mb-3">
                                  <div className="col-md-6">
                                    <label className="form-label">
                                      Select Type:
                                    </label>
                                  </div>
                                  <div className="col-md-6">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-success">Save</button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleModalClose1}
                              >Close</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`modal fade ${
                          showModal2 ? "show d-block" : ""
                        }`}
                        tabIndex="-1"
                        role="dialog"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Search</h5>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={handleModalClose2}
                              >
                                X
                              </button>
                            </div>
                            <div className="modal-body">
                              <div className="container-fluid">
                                <div className="row mb-3">
                                  <div className="col-md-6">
                                    <label className="form-label">
                                      Select Employee:
                                    </label>
                                  </div>
                                  <div className="col-md-6">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-primary">See ALL</button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleModalClose2}
                              >Close</button>
                            </div>
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

export default MaterialIssue;
