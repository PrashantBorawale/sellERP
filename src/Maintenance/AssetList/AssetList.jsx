import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./AssetList.css";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const AssetList = () => {
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
    <div className="assetlist">
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
                    <div className="row">
                      <div className="col-md-3">
                        <h5 className="header-title text-start">
                          Asset List
                        </h5>
                      </div>
                      <div className="col-md-9 text-end">
                        <Link to="/item-asset-master" className="btn ">
                          <FaPlus className="me-1" /> Add new Asset
                        </Link>
                        <button className="btn ">Export to Excel</button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="header-section mb-4">
                    <div className="row align-items-start mt-2 mb-3">
                      <div className="col-auto">
                        <label className="form-check-label mt-2">
                          <input type="checkbox" className="form-check-input me-2" />
                          Machine Name:
                        </label>
                      </div>
                      <div className="col-md-2">
                        <input type="text" className="form-control" />
                      </div>

                      <div className="col-auto">
                        <label className="form-label mt-2">Department:</label>
                      </div>
                      <div className="col-md-2">
                        <select className="form-select">
                          <option value="All">All</option>
                        </select>
                      </div>

                      <div className="col-auto">
                        <label className="form-label mt-2">Fixed Asset Category:</label>
                      </div>
                      <div className="col-md-2">
                        <select className="form-select">
                          <option value="All">All</option>
                        </select>
                      </div>

                      <div className="col-auto mt-2">
                        <button className="btn">Search</button>
                      </div>
                    </div>
                  </div>

                  {/* Table Placeholder */}
                  <div className="table-responsive">
                    <table className="table table-bordered user-list-table">
                      <tbody>
                        <tr>
                          <td className="text-center">
                            No Data Found...!!!
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default AssetList;
