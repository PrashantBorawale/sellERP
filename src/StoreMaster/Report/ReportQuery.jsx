import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const ReportQuery = () => {

  const [activeTab, setActiveTab] = useState("query");
   const navigate = useNavigate();
    
      const handleClose = () => {
        navigate("/Report-Store");
      };

  return (
    <div className="container mt-4">
        <div className="top-but3-header mb-4 text-start">
               <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title">Purchase GRN Query</h5>
                    </div>
                    <div className="col-md-8 text-end">
                       <div className="d-flex align-items-center justify-content-end">                          
                          <Link className="vndrbtn me-2" to={"/QueryRep"}>
                              Query Master
                          </Link>

                          <Link type="button" className="vndrbtn me-2">
                               Export Report
                          </Link>

                          <button
                            className="vndrbtn  me-2"
                            aria-label="Close"
                            onClick={handleClose} >
                           X </button>
                    
                        </div>
                    </div>
               </div>
         </div>

         <div className="custom-tabs-container">
            <div className="tab-buttons">
              <button
                className={activeTab === "query" ? "active" : "vndrbtn"}
                onClick={() => setActiveTab("query")}
              >
               Query
              </button>
              <button
                className={activeTab === "result" ? "active" : "vndrbtn"}
                onClick={() => setActiveTab("result")}
              >
               Result
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "query" && (
                <div className="tab-panel">
                   <div className="mb-3">
                       
                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="custName" className="form-label"> Plant :</label>
                        </div>
                        <div className="col-md-3">
                        <select className="form-select" id="status">
                            <option value="">Produlink</option>
                            <option value="active"></option>
                          </select>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="cityName" className="form-label">  GRN Type :</label>
                        </div>
                        <div className="col-md-3">
                         <select className="form-select" id="status">
                            <option value="">All</option>
                            <option value="active"></option>
                          </select>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="cityName" className="form-label">  GRN Series :</label>
                        </div>
                        <div className="col-md-3">
                         <select className="form-select" id="status">
                            <option value="">All</option>
                            <option value="active"></option>
                          </select>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="status" className="form-label">From:</label>
                        </div>
                        <div className="col-md-3">
                            <input type="date" className="form-control"  />
                        </div>

                        <div className="col-md-2">
                          <label htmlFor="status" className="form-label">To :</label>
                        </div>
                        <div className="col-md-3">
                            <input type="date" className="form-control"  />
                        </div>
                      </div>
  
                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="status" className="form-label"> GRN No:</label>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control"  />
                        </div>

                        <div className="col-md-2">
                          <label htmlFor="status" className="form-label">To :</label>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control"  />
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="cityName" className="form-label"> Supplier Name :</label>
                        </div>
                        <div className="col-md-3">
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                       <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="cityName" className="form-label"> Item Name :</label>
                        </div>
                        <div className="col-md-3">
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                       <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="cityName" className="form-label">  Project  :</label>
                        </div>
                        <div className="col-md-3">
                         <select className="form-select" id="status">
                            <option value="">Select</option>
                            <option value="active"></option>
                          </select>
                        </div>

                      </div>

                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label htmlFor="cityName" className="form-label">  Main Group  :</label>
                        </div>
                        <div className="col-md-3">
                         <select className="form-select" id="status">
                            <option value="">ALL</option>
                            <option value="active"></option>
                          </select>
                        </div>

                          <div className="col-md-2">
                          <label htmlFor="cityName" className="form-label">  Sub Group  :</label>
                        </div>
                        <div className="col-md-3">
                         <select className="form-select" id="status">
                            <option value="">All</option>
                            <option value="active"></option>
                          </select>
                        </div>
                      </div>

                      {/* Execute Button */}
                      <div className="row mt-3">
                        <div className="col-md-5">
                          <button className="vndrbtn btn-primary"> Execute Report </button>
                        </div>
                      </div>

                   </div>
                </div>
              )}

              {activeTab === "result" && (
                <div className="tab-panel">
                  <h4 className="text-success">Result</h4>
                  <p>The result of the query will be displayed here...</p>
                </div>
              )}
            </div>
         </div>
  </div>
  )
}

export default ReportQuery