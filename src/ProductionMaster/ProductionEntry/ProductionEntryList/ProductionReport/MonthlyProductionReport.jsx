
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const MonthlyProductionReport = () => {

    const [activeTab, setActiveTab] = useState("query");

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/ProductionEntryList");
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
                            <h5 className="header-title">Monthly Production - Report</h5>
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
                                      
                                   <h5 className="header-title text-start">Item / Machine Wise View : </h5>

                                    <div className="row text-start mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Plant:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> Produlink </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row text-start mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Year :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> 2025 - 2026 </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row text-start mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">From Machine Code:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">To:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row text-start mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Item Code:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">To:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row text-start mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Query :</label>
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
                                            <button className="vndrbtn btn-primary">Execute-Report</button>
                                        </div>
                                    </div>

                                </div>
<hr />
                                <div className="mb-3">
                                   <h5 className="header-title text-start">Day Wise (Monthly) Production Report : </h5>
                               
                                    <div className="row text-start mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Plant:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> Produlink </option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="row text-start mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Select Month:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> Select </option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="row text-start mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Type:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> Item Wise </option>
                                            </select>
                                        </div>
                                    </div>
                                  {/* Button */}
                                    <div className="row mt-3">
                                        <div className="col-md-5">
                                            <button className="vndrbtn btn-primary"> Execute </button>
                                        </div>
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

export default MonthlyProductionReport