
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const OperationRejectionSummary = () => {

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/ProReport");
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
                            <h5 className="header-title">Operation Rejection Summary</h5>
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

                <div className="ProReport-Main custom-tabs-container">
                    <div className="mb-3 text-start">

                        <div className="row mt-2">
                            <div className="col-md-2">
                                <label htmlFor="from" className="form-label">Month:</label>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select" name="" id="">
                                    <option value=""> Select </option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-2">
                                <label htmlFor="from" className="form-label">OP Name 1:</label>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select" name="" id="">
                                    <option value=""> Select </option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-2">
                                <label htmlFor="from" className="form-label">OP Name 2:</label>
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
                                <button className="vndrbtn btn-primary">Search</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OperationRejectionSummary