import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./StockTransaction.css";
const StockTransaction = () => {
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
    <div className="NewStoreStockTranscation">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="Main-NavBar">
            <NavBar toggleSideNav={toggleSideNav} />
            <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
            <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
              <div className="StockTranscation-header">
                <div className="row flex-nowrap align-items-center">
                  <div className="col-md-2">
                    <h5 className="header-title text-start">Stock Transfer</h5>
                  </div>
  
                  <div className="col-md-10 text-end">
                    <div className="row justify-content-end">
                      <div className="col-md-9 d-flex align-items-end">
                        <Link className="pobtn">[Pending Auth]:</Link>
                        <Link className="pobtn" to="/ShopFloor">ShopFloor -to-Store</Link>
                        <Link className="pobtn" to="/ShopFloorStock">All Shop Floor Stock</Link>
                        <Link className="pobtn">Export To Excel</Link>
                        <Link className="pobtn">Stock Transfer Query</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="StockTranscation-main">
                <div className="container-fluid">
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <form className="row g-3 text-start">
                        {/* From Date */}
                        <div className="col-md-1 col-sm-6">
                          <label className="form-label">From Date</label>
                          <input type="date" className="form-control" />
                        </div>
  
                        {/* To Date */}
                        <div className="col-md-1 col-sm-6">
                          <label className="form-label">To Date</label>
                          <input type="date" className="form-control" />
                        </div>
  
                        {/* Plant */}
                        <div className="col-md-1 col-sm-6">
                          <label className="form-label">Plant</label>
                          <select className="form-select">
                            <option value="">Produlink</option>
                          </select>
                        </div>
  
                        {/* Operation */}
                        <div className="col-md-1 col-sm-6">
                          <label className="form-label">Operation</label>
                          <select className="form-select">
                            <option value="">ALL</option>
                            <option value="ASSEMBLY">ASSEMBLY</option>
                            <option value="BENDING">BENDING</option>
                            <option value="bLOCK PLATING">BLOCK PLATING</option>
                            <option value="BLOCKDISING">BLOCKDISING</option>
                            <option value="CED COATING">CED COATING</option>
                            <option value="CHAKING">CHAKING</option>
                            <option value="CHAMFER-2">CHAMFER-2</option>
                            <option value="CHAMFER-3">CHAMFER-3</option>
                            <option value="CHAMFRING">CHAMFRING</option>
                            <option value="CHECKING">CHECKING</option>
                            <option value="CNC-1">CNC-1</option>
                            <option value="CNC-2">CNC-2</option>
                            <option value="CNC-3">CNC-3</option>
                          </select>
                        </div>
  
                        {/* Main Group */}
                        <div className="col-md-1 col-sm-6">
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
  
                        {/* Sub Group */}
                        <div className="col-md-2 col-sm-6">
                          <label className="form-label">Sub Group</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                          >
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
  
                        {/* Item Code */}
                        <div className="col-md-2 col-sm-6">
                          <label className="form-label">Item Code</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Item Code"
                          />
                        </div>
  
                        {/* Auth */}
                        <div className="col-md-2 col-sm-6">
                          <label className="form-label">Auth</label>
                          <select className="form-select">
                            <option value="">ALL</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
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
  
                <div className="StoreStockTranscation">
                  <div className="container-fluid mt-4 text-start">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Plant</th>
                            <th>Trn No</th>
                            <th>Return Date</th>
                            <th>Store</th>
                            <th>Item Desc</th>
                            <th>Quantity</th>
                            <th>WonderNo</th>
                            <th>Remark</th>
                            <th>Auth</th>
                            <th>User</th>
                            <th>Del</th>
                            <th>Edit</th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>{/* Table rows will go here */}</tbody>
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

export default StockTransaction;
