import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './OrderLiast.css';
import { useNavigate } from "react-router-dom";


const UserSubList = () => {
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

    const navigate = useNavigate();
      const handleClose = () => {
          navigate("/NewSalesOrder");
      };

  return (
    <div className="OrderLiastMaster">
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
                <div className="OrderLiast">
                  <div className="OrderLiast-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> Usser List </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className=" vndrbtn">
                          Export To Excel
                        </button>
                         <button
                                className="vndrbtn  me-2"
                                aria-label="Close"
                                onClick={handleClose} >
                                X </button>
                      </div>
                    </div>
                  </div>


                  {/* Filter Section */}
                  <div className="OrderLiast-filter">
                    <div className="row text-start">
                      
                      <div className="col-md-2">
                        <label>Name :</label>
                        <input type="text" placeholder="Name..." className="form-control" />
                      </div>

                      <div className="col-md-2">
                        <label>UserName :</label>
                        <input type="text" placeholder="User Name..." className="form-control" />
                      </div>

                       <div className="col-md-2">
                        <label>PassWord :</label>
                        <input type="text" placeholder="PassWord..." className="form-control" />
                      </div>

                      <div className="col-md-2 margin-5">
                        <label>Plant :</label>
                        <select className="form-control">
                          <option value="">Produlink</option>
                          <option value=""></option>
                          {/* Add more options as needed */}
                        </select>
                      </div>

                      <div className="col-md-2" style={{marginTop:"27px"}}>               
                         <button className=" vndrbtn">Save</button>   

                         <button className=" vndrbtn">Cancel</button>          
                      </div>

                    </div>        
                  </div>

                  {/* Table Section */}
                  <div className="OrderLiast-Main">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Plant</th>
                          <th>Name</th>
                          <th>User Name</th>
                          <th>Password</th>
                          <th>Credit Limit</th>
                          <th>Status </th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example Row */}
                        <tr>
                          <td>1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {/* Additional rows can be added dynamically here */}
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
  );
};


export default UserSubList