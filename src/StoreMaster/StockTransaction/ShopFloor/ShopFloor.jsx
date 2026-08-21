import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import Cached from "@mui/icons-material/Cached.js";
import "./ShopFloor.css";

const ShopFloor = () => {
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
    <div className="NewStoreShopFloor">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="ShopFloor-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title text-start">
                        Material Return Shop-Floor --To Store
                      </h5>
                    </div>
                    <div className="col-md-8 text-start">
                      <div className="row">
                        <div className="col-md-4 col-6 d-flex flex-wrap">
                          <select className="form-select">
                            <option>Produlink</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ShopFloor-main">
                  <div className="container-fluid text-start">
                    <div className="row">
                      <div className="col-md-4 col-12">
                        <div className="row mt-4">
                          <div className="col-md-4 col-6">
                            <label>Trn No:</label>
                          </div>
                          <div className="col-md-4 col-6">
                            <input className="form-control" />
                          </div>
                          <div className="col-md-4 col-12 text-start">
                            <Cached />
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-md-4 col-6">
                            <label>Tran. Date:</label>
                          </div>
                          <div className="col-md-4 col-6">
                            <input type="date" className="form-control" />
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-md-4 col-6">
                            <label>ShopFloor (From):</label>
                          </div>
                          <div className="col-md-8 col-6">
                            <select className="form-select">
                              <option value="ShopFloor">ShopFloor</option>
                            </select>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-md-4 col-6">
                            <label>Item Code:</label>
                          </div>
                          <div className="col-md-4 col-6">
                            <input className="form-control" />
                          </div>
                          <div className="col-md-4 col-12 text-start">
                            <button className="pobtn" type="button">
                              Select
                            </button>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-md-4 col-6">
                            <label>ShopFloor Stock:</label>
                          </div>
                          <div className="col-md-8 col-6">
                            <input className="form-control" />
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-md-4 col-6">
                            <label>Ok Qty:</label>
                          </div>
                          <div className="col-md-8 col-6">
                            <input className="form-control" />
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-md-4 col-6">
                            <label>Main Store (To):</label>
                          </div>
                          <div className="col-md-8 col-6">
                            <select className="form-select">
                              <option value="All">All</option>
                              <option value="MainStore">MainStore</option>
                            </select>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-md-4 col-6">
                            <label>Ref./Note:</label>
                          </div>
                          <div className="col-md-8 col-6">
                            <input className="form-control" />
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-md-4 col-6">
                            <label>Remark:</label>
                          </div>
                          <div className="col-md-8 col-6">
                            <textarea className="form-control"></textarea>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-md-4 col-6">
                            <label>Prod. Giver:</label>
                          </div>
                          <div className="col-md-8 col-6">
                            <select className="form-select">
                              <option value="admin | ADMIN">admin | ADMIN</option>
                              <option value="MainStore">MainStore</option>
                            </select>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-md-4 col-6">
                            <label>Employee:</label>
                          </div>
                          <div className="col-md-8 col-6">
                            <input className="form-control" />
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-md-4 col-6">
                            <label>Store Receiver:</label>
                          </div>
                          <div className="col-md-8 col-6">
                            <select className="form-select">
                              <option value="admin | ADMIN">admin | ADMIN</option>
                              <option value="MainStore">MainStore</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row text-end mt-4">
                      <div className="col-md-6">
                        <button type="submit" className="pobtn">
                          Save
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
    </div>
  );
};

export default ShopFloor;
