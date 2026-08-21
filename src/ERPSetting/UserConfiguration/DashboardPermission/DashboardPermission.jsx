import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './DashboardPermision.css'

const DashboardPermission = () => {
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
    <div className="DashboardPermission">
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
                        <div className="dashboardp mt-5">
                            <div className="dash-header mb-4 text-start">
                                <h5 className="header-title">Dashboard Permission</h5>
                            </div>

                            <div className="dash-main text-start">
                                <div className="row mb-3">
                                    <div className="col-md-1 col-sm-3">
                                        <label>Select Dept:</label>
                                    </div>
                                    <div className="col-md-3 col-sm-9">
                                        <select className="form-select">
                                            <option value='Admin'>Admin</option>
                                            <option value='Purchase'>Purchase</option>
                                            <option value='Store'>Store</option>
                                            <option value='Quality'>Quality</option>
                                            <option value='Planning'>Planning</option>
                                            <option value='Sales'>Sales</option>
                                            <option value='Account'>Account</option>
                                            <option value='CRM'>CRM</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 col-sm-6 d-flex align-items-center">
                                        <input type="checkbox" className="form-check-input me-2" />
                                        <label>Enable All Permissions</label>
                                    </div>
                                    <div className="col-md-5 col-sm-12 text-end">
                                        <button className="btn btn-success me-2">Save</button>
                                        <button className="btn btn-danger">Cancel</button>
                                    </div>
                                </div>
                            </div>

                            <div className="dash-main text-start">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Sr</th>
                                                <th>Permission Name</th>
                                                <th>Module Name</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Dashboard View</td>
                                                <td>Admin</td>
                                                <td><input type="checkbox" /></td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Purchase Order</td>
                                                <td>Purchase</td>
                                                <td><input type="checkbox" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default DashboardPermission
