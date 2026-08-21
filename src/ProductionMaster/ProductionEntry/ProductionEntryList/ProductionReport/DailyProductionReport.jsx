
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const DailyProductionReport = () => {

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
                        <div className="col-md-3">
                            <h5 className="header-title">Daily Production Report</h5>
                        </div>
                        <div className="col-md-9 text-end">
                            <div className="d-flex align-items-center justify-content-end">
                             <button className="vndrbtn">
                                    <select name="" className="" id="">
                                        <option value=""> PDF </option>
                                    </select>
                                </button>
                                <Link type="button" className="vndrbtn me-2" to={"/"}>
                                    OP Name Print Report
                                </Link>
                                <Link type="button" className="vndrbtn me-2" to={"/"}>
                                    Dept Wise Report
                                </Link>
                                <Link type="button" className="vndrbtn me-2" to={"/"}>
                                    Production Log
                                </Link>

                                <Link type="button" className="vndrbtn me-2">
                                    Daily Production Cum Rejection Report
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

                    <div className="tab-panel">
                        <div className="mb-3">

                            <div className="row mt-2">
                                <div className="col-md-2">
                                    <label htmlFor="from" className="form-label">Prod. Date From:</label>
                                </div>
                                <div className="col-md-3">
                                    <input type="date" className="form-control" />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-2">
                                    <input type="radio" />
                                    <label htmlFor="from" className="form-label">Prod Department:</label>
                                    
                                    <input type="radio" />
                                    <label htmlFor="from" className="form-label">Work Center Type:</label>
                                </div>
                                <div className="col-md-3">
                                    <select className="form-select" name="" id="">
                                        <option value="">  </option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-2">
                                    <label htmlFor="from" className="form-label">OP Name:</label>
                                </div>
                                <div className="col-md-3">
                                    <select className="form-select" name="" id="">
                                        <option value=""> All </option>
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

                </div>
            </div>
        </div>
    )
}

export default DailyProductionReport