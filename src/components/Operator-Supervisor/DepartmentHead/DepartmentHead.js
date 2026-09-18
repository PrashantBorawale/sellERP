import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import "./DepartmentHead.css";

const DepartmentHead = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="Department">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Department1">
                 
                  <div className="Departmentupper-header mb-4 text-start mt-5">
                     <div className="row align-items-center">
                        <div className="col-md-6">
                        <h5 className="header-title">Department Master</h5>
                        </div>
                        <div className="col-md-6  text-end">
                          <button className="btn">
                            Export To Excel
                          </button>
                        </div>
                      </div>
                   
                  </div>
                  <div className="DepartmentMain">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th scope="col">Sr</th>
                                  <th scope="col">Department Name</th>
                                  <th scope="col">Dept Head 1</th>
                                  <th scope="col">Dept Head 2</th>
                                  <th scope="col">Dept Head 3</th>
                                  <th scope="col">MRN Approval Limit</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[1, 2, 3, 4, 5, 6].map((num, index) => (
                                  <tr key={index}>
                                    <td>{num}</td>
                                    <td>Store</td>
                                    <td>
                                      <select className="form-select">
                                        <option>Select</option>
                                        <option>Head 1</option>
                                        <option>Head 2</option>
                                      </select>
                                    </td>
                                    <td>
                                      <select className="form-select">
                                        <option>Select</option>
                                        <option>Head 1</option>
                                        <option>Head 2</option>
                                      </select>
                                    </td>
                                    <td>
                                      <select className="form-select">
                                        <option>Select</option>
                                        <option>Head 1</option>
                                        <option>Head 2</option>
                                      </select>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 text-start">
                          <p>Total Record:6</p>
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

export default DepartmentHead;
