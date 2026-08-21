
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


const VendorFileBajaj = () => {

    const [activeTab, setActiveTab] = useState("query");

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/BajajTaxInvoiceList");
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
                            <h5 className="header-title"> Vendor File Bajaj (EDI) </h5>
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
                    <div className="tab-buttons">
                        <button
                            className={activeTab === "vendorFileCreate" ? "active" : "vndrbtn"}
                            onClick={() => setActiveTab("vendorFileCreate")}
                        >
                            Vendor File Create
                        </button>

                        <button
                            className={activeTab === "vendorFileUpload" ? "active" : "vndrbtn"}
                            onClick={() => setActiveTab("vendorFileUpload")}
                        >
                            Vendor File Upload
                        </button>

                        <button
                            className={activeTab === "pendingEDIList" ? "active" : "vndrbtn"}
                            onClick={() => setActiveTab("pendingEDIList")}
                        >
                            Pending EDI (Invoice) List
                        </button>

                        <button
                            className={activeTab === "cancelEDINo" ? "active" : "vndrbtn"}
                            onClick={() => setActiveTab("cancelEDINo")}
                        >
                            Cancel EDI No
                        </button>

                    </div>

                    <div className="tab-content">
                        {activeTab === "vendorFileCreate" && (
                            <div className="tab-panel">
                                <div className="mb-3">

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Plant :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> Produlink </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="todate" className="form-label">Customer Name:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Invoice Date :</label>
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
                                            <label htmlFor="from" className="form-label">Invoice No :</label>
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

                                    {/* Button */}
                                    <div className="row mt-3">
                                        <div className="col-md-5">
                                            <button className="vndrbtn btn-primary">Download-File</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {activeTab === "vendorFileUpload" && (
                            <div className="tab-panel">
                                <div className="mb-3">

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Location :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> Produlink </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="todate" className="form-label">Select File :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="file" className="form-control" />
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <div className="row mt-3">
                                        <div className="col-md-5">
                                            <button className="vndrbtn btn-primary">Upload-File</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {activeTab === "pendingEDIList" && (
                            <div className="tab-panel">
                                <div className="mb-3">

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Location :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> Produlink </option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <div className="row mt-3">
                                        <div className="col-md-5">
                                            <button className="vndrbtn btn-primary">Refresh-List</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {activeTab === "cancelEDINo" && (
                            <div className="tab-panel">
                                <div className="mb-3">

                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Plant :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-select" name="" id="">
                                                <option value=""> Produlink </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="todate" className="form-label">Customer Name:</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <label htmlFor="from" className="form-label">Invoice Date :</label>
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
                                            <label htmlFor="from" className="form-label">Invoice No :</label>
                                        </div>
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" />
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorFileBajaj