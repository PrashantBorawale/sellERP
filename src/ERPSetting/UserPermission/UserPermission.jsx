import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./UserPermission.css";

const UserPermission = () => {
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
    <div className="UserPermission">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Permission mt-3 px-3">
                  <div className="prod-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title" style={{ fontWeight: 800, fontSize: "1.8rem", background: "linear-gradient(90deg, #2563eb, #4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>
                          Parameter Setting
                        </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button className="btn vndrbtn me-2">
                          Setting History
                        </button>
                        <button className="btn vndrbtn me-2">
                          Company Info
                        </button>
                        <button className="btn vndrbtn">
                          Export Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="row text-start mt-4">
                    <div className="col-md-3">
                      <div className="shadow-card p-3 mb-4 h-100">
                        <h6 className="mb-3" style={{ fontWeight: 700, color: "#1e293b" }}>Select Module</h6>

                        <div className="form-check mb-2">
                          <input type="checkbox" className="form-check-input" />
                          <label className="form-check-label">Dashboard</label>
                        </div>
                        <div className="form-check mb-2">
                          <input type="checkbox" className="form-check-input" />
                          <label className="form-check-label">Master</label>
                        </div>
                        <div className="form-check mb-2">
                          <input type="checkbox" className="form-check-input" />
                          <label className="form-check-label">CRM</label>
                        </div>
                        <div className="form-check mb-2">
                          <input type="checkbox" className="form-check-input" />
                          <label className="form-check-label">Store</label>
                        </div>
                        <div className="form-check mb-2">
                          <input type="checkbox" className="form-check-input" />
                          <label className="form-check-label">Purchase</label>
                        </div>
                        <div className="form-check mb-2">
                          <input type="checkbox" className="form-check-input" />
                          <label className="form-check-label">Production</label>
                        </div>
                        <div className="form-check mb-2">
                          <input type="checkbox" className="form-check-input" />
                          <label className="form-check-label">Subcron</label>
                        </div>
                        <div className="form-check mb-2">
                          <input type="checkbox" className="form-check-input" />
                          <label className="form-check-label">Planning</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="shadow-card p-3 mb-4">
                        <div className="row align-items-center">
                          <div className="col-md-3">
                            <label className="form-check-label mt-2">
                              <input
                                type="checkbox"
                                className="form-check-input me-2"
                              />{" "}
                              Purchase
                            </label>
                          </div>
                          <div className="col-md-4">
                            <label className="form-label mb-1">
                              Setting Name:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="User Name Like"
                            />
                          </div>
                          <div className="col-md-2 mt-4">
                            <button className="btn vndrbtn w-100">Search</button>
                          </div>
                        </div>
                      </div>

                      <div className="table-responsive">
                        <table className="table table-bordered table-hover parameter-table table-striped">
                          <thead className="table-dark">
                            <tr>
                              <th className="text-center">Sr.</th>
                              <th>Setting Name</th>
                              <th className="text-center">Value</th>
                              <th className="text-center">Update</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">1</td>
                              <td>Allow Generate PO From Indent Only</td>
                              <td className="text-center">
                                <select className="form-select form-select-sm mx-auto" style={{ width: 'auto' }}>
                                  <option>NO</option>
                                  <option>YES</option>
                                </select>
                              </td>
                              <td className="text-center">
                                <button className="btn btn-sm btn-success">
                                  Update
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center">2</td>
                              <td>Allow PO Edit After Approval</td>
                              <td className="text-center">
                                <select className="form-select form-select-sm mx-auto" style={{ width: 'auto' }}>
                                  <option>NO</option>
                                  <option>YES</option>
                                </select>
                              </td>
                              <td className="text-center">
                                <button className="btn btn-sm btn-success">
                                  Update
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center">3</td>
                              <td>Allow View PO Without Authorization</td>
                              <td className="text-center">
                                <select className="form-select form-select-sm mx-auto" style={{ width: 'auto' }}>
                                  <option>NO</option>
                                  <option>YES</option>
                                </select>
                              </td>
                              <td className="text-center">
                                <button className="btn btn-sm btn-success">
                                  Update
                                </button>
                              </td>
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

export default UserPermission;
