import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const WorkOrderSummaryReport = () => {

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
                                        <label htmlFor="from" className="form-label">From:</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="date" className="form-control" />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-2">
                                        <label htmlFor="todate" className="form-label">To Date:</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="date" className="form-control" />
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-md-2">
                                        <label htmlFor="status" className="form-label">Status:</label>
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

                                <div className="row mt-2">
                                    <div className="col-md-2">
                                        <label htmlFor="name" className="form-label"> FG Item Name :</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="text" placeholder="Enter Item Code" className="form-control" />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-2">
                                        <label htmlFor="name" className="form-label"> WO No :</label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="text" placeholder="WO NO..." className="form-control" />
                                    </div>
                                </div>

                                {/* Button */}
                                <div className="row mt-3">
                                    <div className="col-md-5">
                                        <button className="vndrbtn btn-primary">Search</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {activeTab === "result" && (
                        <div className="tab-panel">
                            <div className=" PRoWorkorderListtable table-responsive mt-2">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sr.</th>
                                            <th scope="col">WO No</th>
                                            <th scope="col">Wo Date</th>
                                            <th scope="col">Item No</th>
                                            <th scope="col">Item Description</th>
                                            <th scope="col">WO Qty</th>
                                            <th scope="col">Math. Issue</th>
                                            <th scope="col">Production</th>
                                            <th scope="col">Rew Qty</th>
                                            <th scope="col">Rej Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Example data row */}
                                        <tr>
                                            <td>1</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        {/* More rows can be added here */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </div>
        </div>
    )
}

export default WorkOrderSummaryReport