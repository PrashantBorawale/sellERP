import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './Userwisepermission.css'
import { FaSearch } from "react-icons/fa";

const permissionData = [
    { id: 145, name: 'Consumption Report', users: 'PRASHANT, admin, more, mahadev, sangram', count: 5 },
    { id: 146, name: 'Contra Voucher', users: '', count: 0 },
    { id: 147, name: 'Contra Voucher List', users: '', count: 0 },
    { id: 148, name: 'Contractor Master', users: 'admin, md, mahadev, more, ayush, prash, Vinod', count: 15 },
    { id: 149, name: 'Contractor Master DELETE', users: 'admin, mahadev, md, more, ayush, prash, Vinod', count: 11 },
    { id: 150, name: 'Contractor Master EDIT', users: 'md, mahadev, more, ayush, admin, prash, Vinod', count: 9 },
  ]

const Userwisepermission = () => {
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

    const [searchTerm, setSearchTerm] = useState("");
    const filteredPermissions = permissionData.filter(permission =>
        permission.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

      
  return (
    <div className="User-wise-permission">
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
              <div className="User-permission mt-5">
                <div className="prod-header mb-4 text-start">
                  <div className="row ">
                    <div className="col-md-12">
                      <h5 className="header-title">User Wise Permission</h5>
                    </div>
                  </div>
                </div>

           
                    <div className="User-permission-main">
                      <div className="row text-start">
                        <div className="col-md-2">
                          <div className="select-department">
                            <label htmlFor="select-department">
                              Select Permission:
                            </label>
                          </div>
                        </div>
                        <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search permissions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="col-md-1">
                        
                        <button className="btn btn-outline-secondary" type="button">
                            <FaSearch size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive mt-3">
                      <table className="table table-bordered">
                        <thead className="table-dark">
                          <tr>
                            <th>Sr.</th>
                            <th>Permission Name</th>
                            <th>User Name</th>
                            <th>Count</th>
                          </tr>
                        </thead>
                        <tbody>
                        {filteredPermissions.map((permission) => (
                          <tr key={permission.id}>
                            <td>{permission.id}</td>
                            <td>{permission.name}</td>
                            <td>{permission.users}</td>
                            <td>{permission.count}</td>
                          </tr>
                        ))}
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
  )
}

export default Userwisepermission
