import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './UserwiseProduction.css';

const UserwiseProduction = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [users,] = useState(["admin", "prakash", "bharat", "laik", "sangram", "dipak", "vishwas", "amol"]);
  const [selectedUser, setSelectedUser] = useState("");
  const [operations, ] = useState([
    "ASSEMBLY", "BENDING", "BLACK PLATE", "BLOCKING", "CED COAT", 
    "CHAMFER", "CHECKING", "CNC-1", "CNC-2", "CNC-3"
  ]);
  const [selectedOperations, setSelectedOperations] = useState([]);

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

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleOperationChange = (operation) => {
    setSelectedOperations((prev) => {
      if (prev.includes(operation)) {
        return prev.filter((op) => op !== operation);
      }
      return [...prev, operation];
    });
  };

  return (
    <div className="UserWiseProduction">
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
                <div className="Userproduction mt-5">
                  <div className="prod-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">
                          User Permission - Production Operation Wise
                        </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn export-btn">
                          Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="prod-main text-start">
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-2">
                        <label>Select User:</label>
                      </div>
                      <div className="col-md-2">
                        <select
                          className="form-select"
                          value={selectedUser}
                          onChange={handleUserChange}
                        >
                          <option value="">Select User</option>
                          {users.map((user, index) => (
                            <option key={index} value={user}>
                              {user}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <h6>Available Operations</h6>
                        <ul className="list-group">
                          {operations.map((operation, index) => (
                            <li key={index} className="list-group-item">
                              <input
                                type="checkbox"
                                checked={selectedOperations.includes(operation)}
                                onChange={() => handleOperationChange(operation)}
                              />{" "}
                              {operation}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h6>Selected Operations</h6>
                        <ul className="list-group">
                          {selectedOperations.length > 0 ? (
                            selectedOperations.map((op, index) => (
                              <li key={index} className="list-group-item">
                                {op}
                              </li>
                            ))
                          ) : (
                            <li className="list-group-item">No Data Found!</li>
                          )}
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h6>User List</h6>
                        <ul className="list-group">
                          {selectedUser ? (
                            <li className="list-group-item">
                              {selectedUser}
                            </li>
                          ) : (
                            <li className="list-group-item">No Data Found!</li>
                          )}
                        </ul>
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

export default UserwiseProduction;
