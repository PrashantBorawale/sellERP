
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const QuerySales = () => {

    const [activeTab, setActiveTab] = useState("query");

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/CustSalesOrderList");
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
                            <h5 className="header-title"> Sales Order Query </h5>
                        </div>
                        <div className="col-md-8 text-end">
                            <div className="d-flex align-items-center justify-content-end">
                                <Link type="button" className="vndrbtn me-2" to={"/QueryMasterSales"}>
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

                <div className="custom-tabs-container ">
                    <div className="tab-buttons">
                        <button
                            className={activeTab === "query" ? "active" : "vndrbtn"}
                            onClick={() => setActiveTab("query")}
                        >
                            User Query
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
                                <div className="mb-3 text-start">

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Plant :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> Production </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">PO Date:</label>
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
                                            <label htmlFor="todate" className="form-label">Sales Order Type :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select name="" className="form-select" id="">
                                                <option value=""> All </option>
                                            </select>
                                        </div>
                                        <div className="col-md-1">
                                            <select name="" className="form-select" id="">
                                                <option value=""> All </option>
                                            </select>
                                        </div>
                                        <div className="col-md-1">
                                            <select name="" className="form-select" id="">
                                                <option value=""> All </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row align-items-center mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="todate" className="form-label">Sales Order Status:</label>
                                        </div>
                                        <div className="col d-flex gap-3 flex-wrap">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" defaultChecked id="statusNew" />
                                                <label className="form-check-label" htmlFor="statusNew">New</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" defaultChecked id="statusPartal" />
                                                <label className="form-check-label" htmlFor="statusPartal">Partal</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" defaultChecked id="statusCompleted" />
                                                <label className="form-check-label" htmlFor="statusCompleted">Completed</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" defaultChecked id="statusHoldSales" />
                                                <label className="form-check-label" htmlFor="statusHoldSales">HoldForSales</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" defaultChecked id="statusHoldProd" />
                                                <label className="form-check-label" htmlFor="statusHoldProd">HoldForProd</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Cust PO No :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">To :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label"> SO No :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">To :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label"> Customer Name :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>

                                    </div>

                                    <div className="row mt-2">

                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Item Name :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Customer Group :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> Select </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Item Group :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> Select </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label"> PO Bal Qty :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">To :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label"> Issue Due Date :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="date" className="form-control" />
                                        </div>

                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">To :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row align-items-center mt-2">
                                        <div className="col-md-5 d-flex align-items-center gap-4">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="queryType" id="userQuery" />
                                                <label className="form-check-label" htmlFor="userQuery">User Query</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="queryType" id="erpQuery" />
                                                <label className="form-check-label" htmlFor="erpQuery">ERP Query</label>
                                            </div>
                                            <label className="form-label mb-0">:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select">
                                                <option value="">Select</option>
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

export default QuerySales