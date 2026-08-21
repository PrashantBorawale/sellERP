
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const QueryWorkOrder = () => {

    const [activeTab, setActiveTab] = useState("query");

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/WorkOrderList");
    };

    const outerWrapperStyle = {
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px"
    };

    const contentContainerStyle = {
        width: "100%",
        maxWidth: "100%",
        padding: "30px",
        borderRadius: "12px",
    };

    return (
        <div style={outerWrapperStyle}>
            <div style={contentContainerStyle}>
                <div className="top-but3-header mb-4 text-start">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <h5 className="header-title">Work Order Summary - Report</h5>
                        </div>
                        <div className="col-md-8 text-end">
                            <div className="d-flex align-items-center justify-content-end">
                                <Link type="button" className="vndrbtn me-2" to={"/QueryMasterWO"}>
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
                            User Query
                        </button>
                         <button
                            className={activeTab === "erpreport" ? "active" : "vndrbtn"}
                            onClick={() => setActiveTab("erpreport")}
                        >
                            ERP Report
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
                                            <label htmlFor="from" className="form-label">Plant:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> Produlink </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">WO Type:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> All </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Item Group:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> All </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">From:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="date" className="form-control" />
                                        </div>

                                         <div className="col-md-2">
                                            <label htmlFor="todate" className="form-label">To :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="todate" className="form-label">WO No:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>

                                         <div className="col-md-2">
                                            <label htmlFor="todate" className="form-label">To :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">PO No:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="name" className="form-label"> Customer Name :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" placeholder="Enter Name" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="name" className="form-label"> Item Name :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" placeholder="Item Name..." className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="name" className="form-label"> WO Bal Qty :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" placeholder="Item Name..." className="form-control" />
                                        </div>
                                    </div>

                                     <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="status" className="form-label"> Wo Status:</label>
                                        </div>
                                        <div className="col-md-10 d-flex align-items-center gap-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="newStatus" />
                                                <label className="form-check-label" htmlFor="newStatus">New</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="inProcessStatus" />
                                                <label className="form-check-label" htmlFor="inProcessStatus">In Process</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="completedStatus" />
                                                <label className="form-check-label" htmlFor="completedStatus">Completed</label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <div className="row mt-3">
                                        <div className="col-md-5">
                                            <button className="vndrbtn btn-primary">Execute-Report</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {activeTab === "erpreport" && (
                            <div className="tab-panel">
                                 <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label"> Sch Month:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> Select </option>
                                            </select>
                                        </div>
                                    </div>
                                     <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Item Group:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> All </option>
                                            </select>
                                        </div>
                                    </div>
                                     <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Report:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> Select </option>
                                            </select>
                                        </div>
                                    </div>
                                     {/* Button */}
                                    <div className="row mt-3">
                                        <div className="col-md-5">
                                            <button className="vndrbtn btn-primary">Execute</button>
                                        </div>
                                        <div className="col-md-5">
                                            <button className="vndrbtn btn-primary">Execute-To-Excel</button>
                                        </div>
                                    </div>
                           </div> 
                        )}

                        {activeTab === "result" && (
                            <div className="tab-panel">
                                <div className=" PRoWorkorderListtable table-responsive mt-2">
                                    <h3>Result</h3>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default QueryWorkOrder