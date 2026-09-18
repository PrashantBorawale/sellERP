import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./MachinePreventiveSetUp.css";
import { FaPlus, FaSync, FaTrash, FaCheckCircle, FaClone, FaTimes } from "react-icons/fa";

const MachinePreventiveSetUp = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const [showCopyModal, setShowCopyModal] = useState(false);

  const handleOpenCopyModal = () => setShowCopyModal(true);
  const handleCloseCopyModal = () => setShowCopyModal(false);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="machinepreventivesetup">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header */}
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title text-start mb-0">
                          Preventive & Predictive Maintenance Plan
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button className="btn me-2 d-inline-flex align-items-center gap-2" onClick={handleOpenCopyModal}>
                          Copy Plan <FaClone />
                        </button>
                        <button className="btn">Preventive Maintenance plan List</button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-4">
                    <div className="row align-items-center mt-2 mb-3">
                      <div className="col-auto">
                        <label className="form-label mb-0">Name :</label>
                      </div>
                      <div className="col-md-3">
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    {/* Entry Table */}
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Maintenance Type</th>
                            <th>Check Point Type</th>
                            <th>Machine Part</th>
                            <th>Parameter</th>
                            <th>Method of Check</th>
                            <th>Specification</th>
                            <th>Frequency</th>
                            <th>Reaction Plan</th>
                            <th>Evidence Applicable</th>
                            <th className="action-column">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <select className="form-select">
                                <option>Preventive</option>
                                <option>Predictive</option>
                              </select>
                            </td>
                            <td>
                              <select className="form-select">
                                <option>Type</option>
                              </select>
                            </td>
                            <td>
                              <div className="d-flex gap-1 align-items-center">
                                <select className="form-select flex-grow-1">
                                  <option>Select</option>
                                </select>
                                <button className="btn btn-sm btn-outline-secondary p-1">
                                  <FaPlus size={10} />
                                </button>
                                <button className="btn btn-sm btn-outline-secondary p-1">
                                  <FaSync size={10} />
                                </button>
                              </div>
                            </td>
                            <td>
                              <input type="text" className="form-control w-100" />
                            </td>
                            <td>
                              <div className="d-flex gap-1 align-items-center">
                                <select className="form-select flex-grow-1">
                                  <option>Select</option>
                                </select>
                                <button className="btn btn-sm btn-outline-secondary p-1">
                                  <FaPlus size={10} />
                                </button>
                                <button className="btn btn-sm btn-outline-secondary p-1">
                                  <FaSync size={10} />
                                </button>
                              </div>
                            </td>
                            <td>
                              <input type="text" className="form-control w-100" />
                            </td>
                            <td>
                              <select className="form-select">
                                <option>Select</option>
                              </select>
                            </td>
                            <td>
                              <input type="text" className="form-control w-100" />
                            </td>
                            <td>
                              <select className="form-select">
                                <option>Yes</option>
                                <option>No</option>
                              </select>
                            </td>
                            <td className="action-column">
                              <button className="btn btn-sm d-flex align-items-center gap-1 mx-auto">
                                <FaPlus size={10} /> Add
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Main Table Section */}
                  <div className="table-responsive">
                    <h6 className="mb-2">Plan Details</h6>
                    <table className="table table-bordered table-hover user-list-table">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Type</th>
                          <th>Check Point Type</th>
                          <th>Machine Part</th>
                          <th>Parameter</th>
                          <th>Method of Check</th>
                          <th>Specification</th>
                          <th>Frequency</th>
                          <th>Reaction Plan</th>
                          <th>Evidence Applicable</th>
                          <th className="action-column">Edit</th>
                          <th className="action-column">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Preventive</td>
                          <td>Mechanical</td>
                          <td>Gearbox</td>
                          <td>Oil Level</td>
                          <td>Visual</td>
                          <td>Full</td>
                          <td>Monthly</td>
                          <td>Refill</td>
                          <td>Yes</td>
                          <td className="action-column">
                            <button className="btn btn-sm">Edit</button>
                          </td>
                          <td className="action-column">
                            <button className="btn btn-sm">
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Bottom Form Section */}
                  <div className="header-section compact-form mt-4 mb-4">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="d-flex align-items-start gap-2">
                          <label className="form-label mb-0 mt-1 text-nowrap" style={{ width: "100px" }}>Note :</label>
                          <textarea className="form-control" rows="2"></textarea>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex align-items-start gap-2">
                          <label className="form-label mb-0 mt-1 text-nowrap" style={{ width: "100px" }}>Remark :</label>
                          <textarea className="form-control" rows="2"></textarea>
                        </div>
                      </div>
                      <div className="col-md-4"></div>

                      <div className="col-md-4">
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap" style={{ width: "100px" }}>Format No :</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-8"></div>

                      <div className="col-md-4">
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap" style={{ width: "100px" }}>Rev. No :</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap" style={{ width: "100px" }}>Rev. Date :</label>
                          <input type="date" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4"></div>

                      <div className="col-md-4">
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap" style={{ width: "100px" }}>Prepared By :</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-8 d-flex align-items-center gap-3">
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label mb-0 text-nowrap" style={{ width: "100px" }}>Approved By :</label>
                          <input type="text" className="form-control" style={{ width: "300px" }} />
                        </div>
                        <button className="btn d-flex align-items-center gap-2 px-3">
                          <FaCheckCircle /> SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Plan Modal */}
      {showCopyModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Search</h5>
                <button type="button" className="btn-close" onClick={handleCloseCopyModal}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                <div className="row align-items-center mb-2">
                  <div className="col-auto">
                    <label className="form-label mb-0 fw-bold">Machine :</label>
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="text-center mt-1">
                  <button className="btn d-inline-flex align-items-center gap-2">
                    Copy Plan <FaClone />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MachinePreventiveSetUp;
