
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


const InvoiceEmailSend = () => {

    const [activeTab, setActiveTab] = useState("query");

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/TaxInvoiceList");
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
                            <h5 className="header-title"> Invoice Email Sending </h5>
                        </div>
                        <div className="col-md-8 text-end">
                            <div className="d-flex align-items-center justify-content-end">
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
                    <div className="row mt-2">
                    <div className="col text-start">

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
                                <label htmlFor="from" className="form-label">Invoice No:</label>
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
                                <label htmlFor="todate" className="form-label">Cust Supplier Name:</label>
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
                                <label htmlFor="from" className="form-label">City Name :</label>
                            </div>
                            <div className="col-md-3">
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        {/* Button */}
                        <div className="row mt-3">
                            <div className="col-md-5">
                                <button className="vndrbtn btn-primary"> Search </button>
                            </div>
                        </div>

                    </div>
                    </div>
                </div>

                <div className="custom-tabs-container mt-2">
                    <div className="tab-buttons">
                        <button
                            className={activeTab === "query" ? "active" : "vndrbtn"}
                            onClick={() => setActiveTab("query")}
                        >
                            Invoice List
                        </button>

                        <button
                            className={activeTab === "result" ? "active" : "vndrbtn"}
                            onClick={() => setActiveTab("result")}
                        >
                            Select Email ID
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === "query" && (
                            <div className="tab-panel">
                                <div className="mb-3">


                                </div>
                            </div>
                        )}

                        {activeTab === "result" && (
                            <div className="tab-panel">
                                <div className=" PRoWorkorderListtable table-responsive mt-2">

                                </div>
                            </div>
                        )}

                    </div>
                </div>

                <div className="custom-tabs-container mt-2">

                <div className="row">
                    <div className="col-md-4">
                        <div className="row mt-2">
                            <div className="col-md-2">
                                <label htmlFor="from" className="form-label">From :</label>
                            </div>
                            <div className="col-md-7">
                                <input type="email" placeholder="pdlk@gmail.com" className="form-control" />
                            </div>
                             <div className="col-md-3">
                        <button className="vndrbtn btn-primary"> SendEmail </button>
                    </div>
                        </div>
                    </div>
                   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceEmailSend