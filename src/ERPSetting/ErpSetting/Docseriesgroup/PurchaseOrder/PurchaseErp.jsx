import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./PurchaseErp.css";

const PurchaseErp = () => {
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
    <div className="PurchaseSeriesGroup">
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
                <div className="PurchaseSeries mt-5">
                  {/* Header */}
                  <div className="PurchaseSeries-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">
                          Document Series / Group
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <Link
                          type="button"
                          className="btn btn-primary me-2"
                          to="/Companysetup"
                        >
                          Company Info
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Button Group */}
                  <div className="GRNSeries-Main mb-4 text-start">
                    <div className="row text-start">
                      <div className="col-md-12">
                      <Link to='/Docseriesgroup' className="btn btn-light">Series Master</Link> 
                      <Link to='/MasterData' className="btn btn-light">Master Data</Link>
                      <Link to='/PurchaseErp' className="btn btn-light">Purchase Order</Link>
                      <Link to='/PurchaseERPGRN' className="btn btn-light">Purchase GRN</Link>
                      <Link to='/OutwardInward' className="btn btn-light">57F4 Outward / Inward</Link>
                      <Link to='/GSTsales' className="btn btn-light">GST Sales</Link>
                      <Link to='/GstsalesReturn' className="btn btn-light">GST Sales Return</Link>
                      <Link to='/DebitcreditNote' className="btn btn-light">Debit Credit Note</Link>
                      <Link to='/Docddelivery' className="btn btn-light">Delivery Challan</Link>
                      <Link to='/DocAccount' className="btn btn-light">Account</Link>
                      <Link to='/DocProduction' className="btn btn-light">Production</Link>
                      <Link to='/Quotation' className="btn btn-light">Quotation</Link>
                      </div>
                    </div>
                  </div>

                {/* Form */}
                <div className="PurchaseSeries-form mb-5">
                  <h4 className="text-primary text-start">
                    #Purchase/Jobwork Order
                  </h4>
                  <div className="row text-start">
                    <div className="col-md-2">
                      <label htmlFor="moduleSelect" className="col-form-label">
                        Purchase Group:
                      </label>
                      <select id="moduleSelect" className="form-select" style={{marginTop:"-2px"}}>
                        <option>Select</option>
                        <option>Module 1</option>
                        <option>Module 2</option>
                      </select>
                    </div>
                    <div className="col-md-1">
                      <label htmlFor="seriesNo" className="col-form-label">
                        Series No
                      </label>
                      <input
                        type="text"
                        id="seriesNo"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-2">
                      <label
                        htmlFor="seriesNameDesc"
                        className="col-form-label"
                      >
                        Series Name/Desc
                      </label>
                      <input
                        type="text"
                        id="seriesNameDesc"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-1">
                      <label htmlFor="seriesPrefix" className="col-form-label">
                        Series Prefix
                      </label>
                      <input
                        type="text"
                        id="seriesPrefix"
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-1">
                      <label htmlFor="moduleSelect" className="col-form-label">
                        Item Group:
                      </label>
                      <select id="moduleSelect" className="form-select" style={{marginTop:"-2px"}}>
                        <option>Select</option>
                        <option>Module 1</option>
                        <option>Module 2</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="moduleSelect" className="col-form-label">
                        GST Calculator:
                      </label>
                      <select id="moduleSelect" className="form-select" style={{marginTop:"-2px"}}>
                        <option>Select</option>
                        <option>Module 1</option>
                        <option>Module 2</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="moduleSelect" className="col-form-label">
                        Print Setting:
                      </label>
                      <select id="moduleSelect" className="form-select" style={{marginTop:"-2px"}}>
                        <option>Select</option>
                        <option>Module 1</option>
                        <option>Module 2</option>
                      </select>
                    </div>
                    <div className="col-md-1">
                      <button type="submit" className="btn btn-primary" style={{marginTop:"39px"}}>
                        Save
                      </button>
                    </div>
                  </div>
                </div>

                <div className="PurchaseSeries-table mt-4">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th>PO Group</th>
                          <th>Series_NO</th>
                          <th>Series Name</th>
                          <th>Prefix</th>
                          <th>Item Group</th>
                          <th>Plant</th>

                          <th>Edit</th>
                          <th>GST Calculate</th>
                          <th>UOM Lock</th>
                          <th>Is RCM</th>
                          <th>Printing Setting</th>
                          <th>Active</th>
                        </tr>
                      </thead>
                      <tbody>{/* Dynamic rows will go here */}</tbody>
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

export default PurchaseErp;
