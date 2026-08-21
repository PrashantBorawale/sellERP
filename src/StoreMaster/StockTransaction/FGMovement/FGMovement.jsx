import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./FGMovement.css";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

const FGMovement = () => {
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

  const handleExportExcel = () => {
    // Currently no dynamic data array exists in this component.
    // When API fetching is implemented, map that data here instead.
    alert("No data to export");
  };

  return (
    <div className="NewStoreFGMovement">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="FGMovement-header mb-4 mt-4">
  <div className="d-flex flex-wrap align-items-center justify-content-between">
    <h5 className="header-title mb-0" style={{ fontWeight: 800, fontSize: '1.8rem', background: 'linear-gradient(90deg, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
      FG Movement Report
    </h5>
    <div className="d-flex flex-wrap gap-2">
      <Link className="btn btn-success" to="/AddNewFGMovent" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>
        Add New FG Movement
      </Link>
      <Link className="btn btn-primary" to="/FGTOFGMovement" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>
        FG to FG Movement
      </Link>
      <Link className="btn btn-primary" to="/ScrapMovement" style={{ height: '34px', display: 'flex', alignItems: 'center' }}>
        Scrap To FG
      </Link>
      <button className="btn btn-info" onClick={handleExportExcel} style={{ height: '34px', display: 'flex', alignItems: 'center', border: 'none' }}>
        Export To Excel
      </button>
    </div>
  </div>
</div>
<div className="FGMovement-main">
                  <div className="container-fluid text-start">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="row g-3 text-start">
                          {/* From Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">From Date:</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* To Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">To Date:</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* Plant */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Plant:</label>
                            <select className="form-select">
                              <option value="">Produlink</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          {/* Item Name */}
                          <div className="col-md-4 col-sm-6">
                            <label className="form-label">Item Name/Desc:</label>
                            <input type="text" className="form-control" placeholder="Enter Item Name" />
                          </div>

                          {/* Search Button */}
                          <div className="col-md-2 col-sm-6 d-flex align-items-end mt-1">
                            <button type="submit" className="pobtn w-100" style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="FGMovementtable">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Plant</th>
                              <th>Year</th>
                              <th>TM No</th>
                              <th>TM Date</th>
                              <th>Item No</th>
                              <th>Item Desc</th>
                              <th>Part Desc</th>
                              <th>Heatcode Dr</th>
                              <th>Heatcode Cr</th>
                              <th>Qty</th>
                              <th>Remark</th>
                              <th>User</th>
                              <th>Info</th>
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
                              <td><input className="form-control" style={{ minWidth: "100px" }} /></td>
                              <td><input className="form-control" style={{ minWidth: "100px" }} /></td>
                              <td><input className="form-control" style={{ minWidth: "100px" }} /></td>
                              <td><input className="form-control" style={{ minWidth: "100px" }} /></td>
                              <td>
                                <button className="btn btn-primary btn-sm"><FaEdit /></button>
                              </td>
                              <td>
                                <button className="btn btn-danger btn-sm"><FaTrash /></button>
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

export default FGMovement;
