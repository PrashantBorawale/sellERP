import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


const ColumnSetup = () => {

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

    const [allColumns, setAllColumns] = useState([
        "Name", "Email", "Phone", "Address", "Company"
    ]);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [selectedAll, setSelectedAll] = useState("");
    const [selectedSelected, setSelectedSelected] = useState("");

    const moveToSelected = () => {
        if (selectedAll) {
            setSelectedColumns([...selectedColumns, selectedAll]);
            setAllColumns(allColumns.filter(item => item !== selectedAll));
            setSelectedAll("");
        }
    };

    const moveToAll = () => {
        if (selectedSelected) {
            setAllColumns([...allColumns, selectedSelected]);
            setSelectedColumns(selectedColumns.filter(item => item !== selectedSelected));
            setSelectedSelected("");
        }
    };

    return (
        <div style={outerWrapperStyle}>
            <div style={contentContainerStyle}>
                <div className="top-but3-header mb-4 text-start">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <h5 className="header-title">Custmoer Query Master </h5>
                        </div>
                        <div className="col-md-8 text-end">
                            <button
                                className="vndrbtn  me-2"
                                aria-label="Close"
                                onClick={handleClose} >
                                X </button>
                        </div>
                    </div>
                </div>

                <div className="custom-tabs-container">

                    <div className="row">

                        <div className="col-6 tab-panel">
                            <div className="row">
                                <div className="col-5">

                                    <div className="row">
                                        <div className="col-md-4">
                                            <label htmlFor="customerType" className="form-label">Select :</label>
                                        </div>
                                        <div className="col-md-6">
                                            <select name="" className="form-select" id="">
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-10">
                                            <div className="flex p-2">
                                                <label htmlFor="">
                                                    <span className="mb-2">All Data - Column List</span>
                                                </label>
                                                <select
                                                    multiple
                                                    size="10"
                                                    value={[selectedAll]}
                                                    onChange={(e) => setSelectedAll(e.target.value)}
                                                    className="mt-2 h-48 border rounded"
                                                >
                                                    {allColumns.map((col) => (
                                                        <option key={col}>{col}</option>
                                                    ))}
                                                </select>

                                            </div>
                                            {/* Controls */}
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <button onClick={moveToSelected} className="vndrbtn"> &gt; </button>
                                                <button onClick={moveToAll} className="vndrbtn">  &gt; &gt; </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-7 text-start">
                                    <div className="row mt-2">
                                        <div className="col-md-5">
                                            <label htmlFor="customerType" className="form-label">Query Column Name :</label>
                                        </div>
                                        <div className="col-md-7">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-5">
                                            <label htmlFor="customerType" className="form-label">Alias Column Name :</label>
                                        </div>
                                        <div className="col-md-7">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-5">
                                            <label htmlFor="customerType" className="form-label">Text Align :</label>
                                        </div>
                                        <div className="col-md-7">
                                            <select name="" className="form-select" id="">
                                                <option value="">Left</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-5">
                                            <label htmlFor="customerType" className="form-label">Decimal :</label>
                                        </div>
                                        <div className="col-md-7">
                                            <select name="" className="form-select" id="">
                                                <option value="">  </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-2 text-end">
                                            <button className="vndrbtn">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 tab-panel">
                            <div className="mb-3">
                                {/* Table  */}
                                <div className="table-responsive mt-2">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Sr</th>
                                                <th>Query Column Name</th>
                                                <th>Also Column Name</th>
                                                <th>Text Align</th>
                                                <th>Decimal</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
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

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColumnSetup