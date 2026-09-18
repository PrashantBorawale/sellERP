import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./ShopFloorStock.css";
import { Link } from "react-router-dom";
const ShopFloorStock = () => {
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
    <div className="NewStoreShopFloorStock">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="Main-NavBar">
            <NavBar toggleSideNav={toggleSideNav} />
            <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
            <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
              <div className="ShopFloorStock-header">
                <div className="row flex-nowrap align-items-center">
                  <div className="col-md-4">
                    <h5 className="header-title text-start">
                      Shop Floor Stock Report
                    </h5>
                  </div>
                  <div className="col-md-10 text-end">
                    <div className="row justify-content-end">
                      <div className="col-md-9 d-flex align-items-end">
                        
                        <Link className="pobtn">Export To Excel</Link>
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ShopFloorStock-main">
                <div className="container-fluid text-start">
                <div className="row mt-4">
                    <div className="col-md-12">
                      <form className="row g-3 text-start">
                        
                        
  
                        {/* Main Group */}
                        <div className="col-md-3 col-sm-6">
                          <label className="form-label">Main Group</label>
                          <select className="form-select">
                              <option value="">ALL</option>
                              <option value="FG">FG</option>
                              <option value="RM">RM</option>
                              <option value="Tools">Tool</option>
                              <option value="Instrument">Instrument</option>
                              <option value="Machine">Machine</option>
                              <option value="Consumable">Consumable</option>
                              <option value="Safety Equ">Safety Equ</option>
                              <option value="Service">Service</option>
                              <option value="Asset">Asset</option>
                              <option value="F4">F4</option>
                              <option value="Scrap">Scrap</option>
                              <option value="SF">SF</option>
                              <option value="BO">BO</option>
                              <option value="DI">DI</option>
                            </select>
                        </div>
  
                    
  
                        {/* Item Code */}
                        <div className="col-md-2 col-sm-6">
                          <label className="form-label">Item Code</label>
                          <select className="form-select">
                          <option selected>ALl</option>
                            <option value="1">BEARING</option>
                            <option value="2">BELTS</option>
                            <option value="3">CAMS</option>
                            <option value="1">COLLETS & HOLDERS</option>
                            <option value="2">COMPUTER</option>
                            <option value="3">CUTTING TOOL</option>
                            <option value="1">ELECTRICS PARTS</option>
                            <option value="2">END PIECE</option>
                            <option value="3">FIXCTURE</option>
                          </select>
                        </div>
  
                       
                        {/* Search Button */}
                        <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                          <button type="submit" className="pobtn w-100">
                            Search
                          </button>
                        </div>
                      </form>
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
  )
}

export default ShopFloorStock
