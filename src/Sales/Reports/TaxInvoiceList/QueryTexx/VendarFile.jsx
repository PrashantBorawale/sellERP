
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


const VendarFile = () => {

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
                            <h5 className="header-title"> Vendor File - Invoice Export In Excel </h5>
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

                <div className="custom-tabs-container mt-2">
                <div className="row mt-2 text-start">
                    <div className="col mb-3">

                        <div className="row mt-2">
                            <div className="col-md-2">
                                <label htmlFor="todate" className="form-label"> Customer :</label>
                            </div>
                            <div className="col-md-3">
                                <input type="text" placeholder="Name" className="form-control" />
                            </div>
                        </div>

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
                                <label htmlFor="from" className="form-label">From Invoice No:</label>
                            </div>
                            <div className="col-md-3">
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-2">
                                <label htmlFor="from" className="form-label">TO Invoice No:</label>
                            </div>
                            <div className="col-md-3">
                                <input type="text" className="form-control" />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-2">
                                <label htmlFor="from" className="form-label">Vendor Format:</label>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select" name="" id="">
                                    <option value=""> Mahindra </option>
                                </select>
                            </div>
                        </div>

                        <div className="row align-items-center mt-2">
                            <div className="col-md-2">
                                <label htmlFor="from" className="form-label">File Format:</label>
                            </div>
                            <div className="col-md-6 d-flex align-items-center gap-3 flex-wrap">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="fileFormat" id="excel" />
                                    <label className="form-check-label" htmlFor="excel">Excel</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="fileFormat" id="csv" />
                                    <label className="form-check-label" htmlFor="csv">CSV</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="fileFormat" id="text" />
                                    <label className="form-check-label" htmlFor="text">Text</label>
                                </div>
                                <button className="vndrbtn">Export TO File</button>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-2">
                                <label htmlFor="from" className="form-label">Invoice Copy :</label>
                            </div>
                            <div className="col-md-3">
                                <button className="vndrbtn btn-primary"> Create Invoice Copy </button>
                                <button className="vndrbtn btn-primary"> View Invoice </button>
                            </div>
                        </div>

                    </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default VendarFile