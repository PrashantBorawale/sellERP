import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


const QueryStock = () => {

  const [activeTab, setActiveTab] = useState("query");

  
    const navigate = useNavigate();
  
    const handleClose = () => {
      navigate("/Stock-Transaction");
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

  const moveUp = () => {
    const index = selectedColumns.indexOf(selectedSelected);
    if (index > 0) {
      const newCols = [...selectedColumns];
      [newCols[index - 1], newCols[index]] = [newCols[index], newCols[index - 1]];
      setSelectedColumns(newCols);
    }
  };

  const moveDown = () => {
    const index = selectedColumns.indexOf(selectedSelected);
    if (index < selectedColumns.length - 1) {
      const newCols = [...selectedColumns];
      [newCols[index + 1], newCols[index]] = [newCols[index], newCols[index + 1]];
      setSelectedColumns(newCols);
    }
  };

  const removeItem = () => {
    if (selectedSelected) {
      setSelectedColumns(selectedColumns.filter(item => item !== selectedSelected));
      setSelectedSelected("");
    }
  };

  return (
    <div className="container mt-4">
        <div className="top-but3-header mb-4 text-start">
               <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title">Stock Query Master</h5>
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
            <div className="tab-buttons">
              <button
                className={activeTab === "querymaster" ? "active" : "vndrbtn"}
                onClick={() => setActiveTab("querymaster")}
              >
               Query Master
              </button>
              <button
                className={activeTab === "querydesigner" ? "active" : "vndrbtn"}
                onClick={() => setActiveTab("querydesigner")}
              >
               Query Designer
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "querymaster" && (
                <div className="tab-panel">
                   <div className="mb-3">
                    {/* Customer Type */}
                      <div className="row">
                        <div className="col-md-2">
                          <label htmlFor="customerType" className="form-label">Report Name:</label>
                        </div>
                        <div className="col-md-3">
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-1">
                            <button className="vndrbtn">Save</button>
                        </div>
                      </div>

                      {/* Table  */}
                      <div className="table-responsive mt-2">
                         <table className="table">
                            <thead> 
                                <tr>
                                    <th>No</th>
                                    <th>Report Name</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><i class='far fa-edit'></i></td>
                                    <td><i class='far fa-trash-alt'></i></td>
                                </tr>
                            </tbody>
                         </table>
                      </div>  

                   </div>
                </div>
              )}

              {activeTab === "querydesigner" && (
                <div className="tab-panel">
                
                  <div className="mb-3">

                        <div className="row">
                        <div className="col-md-2">
                          <label htmlFor="customerType" className="form-label">Select Report :</label>
                        </div>
                        <div className="col-md-3">
                          <select name="" className="form-select" id="">
                             <option value="">Select</option>
                          </select>
                        </div>
                        </div>

                        <div className="mt-3 p-6 max-w-4xl mx-auto bg-white flex items-center">
                            <div className="flex justify-between w-full space-x-4">

                                <div className="row">
                                    <div className="col-3">
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
                                            
                                    <div className="col-3">
                                            <div className="flex p-2">
                                                <label htmlFor="">
                                                    <span className="mb-2">Selected Data - Column List</span>
                                                </label>
                                                <select
                                                    multiple
                                                    size="10"
                                                    value={[selectedSelected]}
                                                    onChange={(e) => setSelectedSelected(e.target.value)}
                                                    className="mt-2 h-48 border rounded"
                                                >
                                                    {selectedColumns.map((col) => (
                                                    <option key={col}>{col}</option>
                                                    ))}
                                                </select>

                                                <div className="flex justify-between mt-2">
                                                    <button onClick={moveUp} className="vndrbtn">Up</button>
                                                    <button onClick={moveDown} className="vndrbtn">Down</button>
                                                    <button onClick={removeItem} className="vndrbtn">Remove</button>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                        
                            </div>

                            <div className="row mt-3 mb-3">
                                    <div className="col-6">
                                        <button className="vndrbtn">Update</button>
                                    </div>
                            </div> 
                        </div>

                   </div>
                </div>
              )}
            </div>
         </div>
  </div>
  )
}

export default QueryStock