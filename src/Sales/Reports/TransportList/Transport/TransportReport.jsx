import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const TransportReport = () => {

    const [activeTab, setActiveTab] = useState("query");

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/TransportList");
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
                            <h5 className="header-title"> Transport Report </h5>
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


                <div className="">
                    <div className="custom-tabs-container">
                        <div className="row g-3 text-start">
                            <div className="col-sm-6 col-md-2 col-lg-2">
                                <label>From:</label>
                                <input type="date" className="form-control" />
                            </div>

                            <div className="col-sm-6 col-md-2 col-lg-2">
                                <label>To:</label>
                                <input type="date" className="form-control" />
                            </div>

                            <div className="col-sm-6 col-md-2 col-lg-2">
                                <label>Party :</label>
                                <input type="text" className="form-control" />
                            </div>

                            <div className="col-6 col-md-2 align-items-center">
                                <button type="button" className="vndrbtn btn-primary" style={{ marginTop: "21px" }}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="custom-tabs-container mt-2">
                    <div className="tab-buttons">
                        <button
                            className={activeTab === "summary" ? "active" : "vndrbtn"}
                            onClick={() => setActiveTab("summary")}
                        >
                            Summary
                        </button>

                        <button
                            className={activeTab === "inward" ? "active" : "vndrbtn"}
                            onClick={() => setActiveTab("inward")}
                        >
                            Inward
                        </button>
                        <button
                            className={activeTab === "outward" ? "active" : "vndrbtn"}
                            onClick={() => setActiveTab("outward")}
                        >
                            Outward
                        </button>
                        <button
                            className={activeTab === "partyWise" ? "active" : "vndrbtn"}
                            onClick={() => setActiveTab("partyWise")}
                        >
                            Party Wise
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === "summary" && (
                            <div className="tab-panel">
                                <div className="mb-3">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col"> Sr.</th>
                                                    <th scope="col"> Transport Name</th>
                                                    <th scope="col" colSpan={2}> No For Trips</th>
                                                    <th scope="col" colSpan={3}> Customer</th>
                                                    <th scope="col" colSpan={3}> Subcontractor and Supplier </th>
                                                    <th scope="col" colSpan={3}> Supplier </th>
                                                    <th scope="col"> Total Amt</th>
                                                    <th scope="col"> Total Kg</th>
                                                    <th scope="col"> View </th>
                                                </tr>

                                                <tr>
                                                    <th scope="col"> </th>
                                                    <th scope="col"> </th>
                                                    <th scope="col"> In </th>
                                                    <th scope="col"> Out </th>
                                                    <th scope="col"> Amount </th>
                                                    <th scope="col"> Kgs </th>
                                                    <th scope="col"> Rs/Kg </th>

                                                    <th scope="col"> Amount </th>
                                                    <th scope="col"> Kgs </th>
                                                    <th scope="col"> Rs/Kg </th>

                                                    <th scope="col"> Amount </th>
                                                    <th scope="col"> Kgs </th>
                                                    <th scope="col"> Rs/Kg </th>

                                                    <th scope="col">  </th>
                                                    <th scope="col">  </th>
                                                    <th scope="col">  </th>
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
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === "inward" && (
                            <div className="tab-panel">

                           </div>
                        )}
                                
                        {activeTab === "outward" && (
                            <div className="tab-panel">
                            
                            </div>
                        )}

                        {activeTab === "partyWise" && (
                            <div className="tab-panel">

                                <div className="row">
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <label>Report :</label>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <input type="text" className="form-control" />                                    
                                    </div>
                                </div>
                                
                                <div className="table-responsive mt-2">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col"> Sr.</th>
                                                    <th scope="col"> Name Of Party </th>
                                                    <th scope="col" colSpan={2}> Trips</th>
                                                    <th scope="col" colSpan={3}> Inward</th>
                                                    <th scope="col" colSpan={3}> Outward </th>
                                                    <th scope="col"> Total Amt</th>
                                                    <th scope="col"> Total Kg</th>
                                                </tr>

                                                <tr>
                                                    <th scope="col"> </th>
                                                    <th scope="col"> </th>
                                                    <th scope="col"> In </th>
                                                    <th scope="col"> Out </th>
                                                    <th scope="col"> Amount </th>
                                                    <th scope="col"> Kgs </th>
                                                    <th scope="col"> Rs/Kg </th>

                                                    <th scope="col"> Amount </th>
                                                    <th scope="col"> Kgs </th>
                                                    <th scope="col"> Rs/Kg </th>

                                                    <th scope="col">  </th>
                                                    <th scope="col">  </th>
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
                                                    <td></td>
                                                    <td></td>
                                                </tr>
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

export default TransportReport