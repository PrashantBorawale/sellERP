import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar";
import SideNav from "../../../../SideNav/SideNav";
import "./PurchaseOrderSummary.css";
import { Link } from "react-router-dom";

const PurchaseOrderSummary = () => {

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

        
        const [activeTab, setActiveTab] = useState("Query");

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
                      Purchase Order Summary
                    </h5>
                      </div>
                      <div className="col-md-8 text-end">
                    
                      
                       
                        <Link  to="/PurchaseQueryMaster" className="btn">Query Master</Link>
                        <button className="btn">Export To Excel</button>
                    
                  
                      </div>
                    </div>
              </div>
              <div className="PurchaseorderList mt-5">
                <div className="container-fluid mt-4">
                 <div className="tabs">
                                            <ul className="nav nav-tabs">
                                              <li className="nav-item">
                                                <button
                                                  className={`nav-link ${
                                                    activeTab === "Query" ? "active" : ""
                                                  }`}
                                                  onClick={() => setActiveTab("Query")}
                                                >
                                                  Query
                                                </button>
                                              </li>
                                              <li className="nav-item">
                                                <button
                                                  className={`nav-link ${
                                                    activeTab === "Result" ? "active" : ""
                                                  }`}
                                                  onClick={() => setActiveTab("Result")}
                                                >
                                                  Result
                                                </button>
                                              </li>
                                            </ul>
                                            <div
                                              className="tab-content"
                                              style={{ border: "none" }}
                                            >
                                              {activeTab === "Query" && (
                                                 <div className="grid grid-cols-3 gap-4 text-start">
                                                 <div className="row mb-3">
                                                    <div className="col-md-1">
                                                    <label className="block text-sm font-medium">Plant</label>
                                                        </div> 
                                                        <div className="col-md-3">
                                                        <select className="w-full border rounded p-1">
                                                     <option>SHARP</option>
                                                   </select>
                                                        </div> 
                                                
                                                  
                                                 </div>
                                   
                                                 <div className="row mb-3">
                                                    <div className="col-md-1">
                                                    <label className="block text-sm font-medium">PO Series</label>
                                                    </div>
                                                    <div className="col-md-3">
                                                  
                                                   <select className="w-full border rounded p-1">
                                                     <option>ALL</option>
                                                       <option value="RM">RM</option>
                                                     <option value="CONSUMABLE">cONSUMABLE</option>
                                                     <option value="SERVICE">SERVICE</option>
                                                     <option value="ASSET">ASSET</option>
                                                     <option value="IMPORT">IMPORT</option>
                                                   </select>
                                                   </div>
                                                 </div>
                                   
                                                 <div className="row mb-3">
                                                    <div className="col-md-1">
                                                    <label className="block text-sm font-medium">PO From - To</label>
                                                    </div>
                                                    <div className="col-md-1">
                                                   
                                                   <input type="date" className="w-full border rounded p-1" />
                                                   </div>
                                                
                                                    
                                                    <div className="col-md-1">
                                                    
                                                    
                                                    
                                                   <input type="date" className="w-full border rounded p-1" />
                                                   </div>
                                                 </div>
                                   
                                                <div className="row mb-3">
                                                    <div className="col-md-1">
                                                    <label className="block text-sm font-medium">PO No</label>
                                                    </div>
                                                    <div className="col-md-3">
                                                  
                                                   <input type="text" className="w-full border rounded p-1" />
                                                 </div>
                                                 </div>
                                   
                                                <div className="row mb-3">
                                                    <div className="col-md-1">
                                                    <label className="block text-sm font-medium">Supplier Name</label>
                                                    </div>
                                                    <div className="col-md-3">
                                                  
                                                   <input type="text" className="w-full border rounded p-1" />
                                                 </div>
                                                 </div>
                                   
                                                <div className="row mb-3">
                                                    <div className="col-md-1">
                                                    <label className="block text-sm font-medium">Item Name</label>
                                                    </div>
                                                    <div className="col-md-3">
                                                  
                                                   <input type="text" className="w-full border rounded p-1" />
                                                   </div>
                                                 </div>
                                   
                                                <div className="row mb-3">
                                                    <div className="col-md-1">
                                                    <label className="block text-sm font-medium">Project</label>
                                                    </div>
                                                    <div className="col-md-3">
                                                   
                                                   <select className="w-full border rounded p-1">
                                                     <option>ALL</option>
                                                       <option value="one">One</option>
                                                   </select>
                                                   </div>
                                                   <div className="col-md-2">
                                                     <label className="text-sm">
                                                       <input type="checkbox" className="mr-1" />
                                                       Show Project PO Only
                                                     </label>
                                                   </div>
                                                 </div>
                                   
                                                <div className="row mb-3">
                                                    <div className="col-md-1">
                                                    <label className="block text-sm font-medium">Item Group</label>
                                                    </div>
                                                    <div className="col-md-3">
                                                    <select className="w-full border rounded p-1">
                                                     <option>ALL</option>
                                                       <option value="one">One</option>
                                                   </select>
                                                    </div>
                                                   
                                                 
                                                 </div>
                                   
                                                <div className="row mb-3">
                                                    <div className="col-md-1">
                                                    <label className="block text-sm font-medium">PO Status</label>
                                                    </div>
                                                    <div className="col-md-3">
                                                    <select className="w-full border rounded p-1">
                                                     <option>ALL</option>
                                                       <option value="one">One</option>
                                                   </select>
                                                    </div>
                                                   
                                                  
                                                 </div>
                                   
                                                <div className="row mb-3">
                                                    <div className="col-md-1">
                                                    <label className="block text-sm font-medium">PO Authorize</label>
                                                    </div>
                                                    <div className="col-md-3">
                                                    <select className="w-full border rounded p-1">
                                                     <option>ALL</option>
                                                       <option value="one">One</option>
                                                   </select>
                                                    </div>
                                                 
                                                   
                                                 </div>
                                   
                                                <div className="row mb-3">
                                                    <div className="col-md-1">
                                                    <label className="block text-sm font-medium">PO Type</label>
                                                    </div>
                                                    <div className="col-md-3">
                                                    <select className="w-full border rounded p-1">
                                                     <option>ALL</option>
                                                       <option value="one">One</option>
                                                   </select>
                                                    </div>
                                                   
                                                  
                                                 </div>
                                   
                                                <div className="row mb-3">
                                                    <div className="col-md-1">
                                                    <label className="block text-sm font-medium">Item Status</label>
                                                    </div>
                                                    <div className="col-md-3">
                                                    <select className="w-full border rounded p-1">
                                                     <option>ALL</option>
                                                       <option value="one">One</option>
                                                   </select>
                                                    </div>
                                                  
                                                  
                                                 </div>
                                   
                                                <div className="row mb-3">
                                                    <div className="col-md-1">
                                                    <label className="block text-sm font-medium">User</label>
                                                    </div>
                                                    <div className="col-md-3">
                                                    <select className="w-full border rounded p-1">
                                                     <option>All User</option>
                                                   </select>
                                                    </div>
                                                  
                                                  
                                                 </div>
                                   
                                                 <div className="col-span-3 flex items-center gap-6 mt-2">
                                                  <div className="row mb-3">
                                                    <div className="col-md-1">
                                                    <input type="radio" name="queryType" />
                                                    <label className="text-sm mr-2">User Query</label> <br></br>
                                                    <input type="radio" name="queryType" />
                                                    <label className="text-sm mr-2">ERP Query</label>
                                                    </div>
                                                    <div className="col-md-3">
                                                    <select className="border rounded p-1 m-2">
                                                       <option>Select</option>
                                                     </select>
                                                    </div>
                                                     
                                                   </div>
                                                  
                                                 
                                                  
                                                 </div>
                                                 <button className="btn mt-3">
                                                     Execute Report
                                                   </button>
                                               </div>
                                               
                                             )}
                                              {activeTab === "BOM History" && (
                                                <div className="tab-pane fade show active">
                                                  <div className="row mb-3 mb-3 text-start">
                                                    <div className="col-md-2 ms-1">
                                                      <label>Select BOM Revision:</label>
                                                    </div>
                                                    <div className="col-md-1">
                                                      <select
                                                        name=""
                                                        className="form-control"
                                                        style={{ marginTop: "-1px" }}
                                                      >
                                                        <option value="">Select</option>
                                                        <option value="All">All</option>
                                                        <option value="Director">
                                                          Director
                                                        </option>
                                                        <option value="Admin">Admin</option>
                                                        <option value="Ac">Ac</option>
                                                        <option value="Sales">Sales</option>
                                                        <option value="Store">Store</option>
                                                        <option value="Planning">
                                                          Planning
                                                        </option>
                                                        <option value="Purchase">
                                                          Purchase
                                                        </option>
                                                        <option value="CRM">CRM</option>
                                                        <option value="Account">Account</option>
                                                      </select>
                                                    </div>
                                                    <div className="col-md-2">
                                                      <button className="btn">
                                                        Export To Excel
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div className="table-responsive">
                                                    <table className="table table-bordered mt-3">
                                                      <thead>
                                                        <tr>
                                                          <th>NO Data Found</th>
                                                        </tr>
                                                      </thead>
                                                      <tbody></tbody>
                                                    </table>
                                                  </div>
                                                </div>
                                              )}
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

export default PurchaseOrderSummary
