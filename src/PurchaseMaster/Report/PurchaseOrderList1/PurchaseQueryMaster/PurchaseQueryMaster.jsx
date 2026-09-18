import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar";
import SideNav from "../../../../SideNav/SideNav";

import { Tabs, Tab } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";


const PurchaseQueryMaster = () => {
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
    
 
    const [activeTab, setActiveTab] = useState("queryMaster");
  return (

    <div className="NewPurchseOrder">
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-md-12">
          <div className="Main-NavBar">
            <NavBar toggleSideNav={toggleSideNav} />
            <SideNav
              sideNavOpen={sideNavOpen}
              toggleSideNav={toggleSideNav}
            />
            <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
              <div className="PurchseOrderList-header  text-start mt-5">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">
                      Purchase Order Query Master
                    </h5>
                      </div>
                      
                    </div>
              </div>
              <div className="PurchaseorderList mt-5 text-start">
                <div className="container-fluid mt-4">
                <Tabs
        id="query-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="queryMaster" title="Query Master">
         <div className="row mb-3">
            <div className="col-md-1">
              <label className="form-label">Report Name</label>
            </div>
            <div className="col-md-2">
              <input className="form-control"/>
            </div>
            <div className="col-md-1">
              <button className="btn" type="button">Save</button>
            </div>
          </div>

          <div className="row mb-3">
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Query Name</th>
                        <th>Query Type</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
<tbody>
<tr>
    <td></td>
    <td></td>
    <td></td>
    <td><FaEdit/></td>
    <td><FaTrash/></td>
</tr>
</tbody>
            </table>
          </div>

         
        </Tab>

        <Tab eventKey="queryDesigner" title="Query Designer">
        <div className="row mb-3">
            <div className="col-md-2">
              <label className="form-label">Select Report</label>
            </div>
            <div className="col-md-4">
              <select className="form-select">
                <option>Select</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-2">
              <label className="form-label">Type</label>
            </div>
            <div className="col-md-4">
              <select className="form-select">
                <option>Select</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <label className="form-label">All Data - Column List</label>
              <select multiple className="form-control" style={{ height: "150px" }}>
                {/* Sample options */}
                <option>Column 1</option>
                <option>Column 2</option>
              </select>
            </div>

            <div className="col-md-2 d-flex flex-column align-items-center justify-content-center">
              <button className="btn btn-outline-primary my-1">{">"}</button>
              <button className="btn btn-outline-primary my-1">{">>"}</button>
              <button className="btn my-1">Remove</button>
              <button className="btn">Update</button>
            </div>

            <div className="col-md-4">
              <label className="form-label">Selected Data - Column List</label>
              <select multiple className="form-control" style={{ height: "150px" }}>
                {/* Selected columns here */}
              </select>
              </div>
              <div className="col-md-2 mt-5">
                <button className="btn btn-secondary me-2">Up</button>
                <button className="btn btn-secondary">Down</button>
              </div>
            
          </div>
        </Tab>
      </Tabs>
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

export default PurchaseQueryMaster
