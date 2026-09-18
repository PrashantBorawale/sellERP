import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import { FaUpload, FaCheckCircle, FaSearch } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const AddWipStock = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewHeatNo, setIsNewHeatNo] = useState(false);
  const [addedStocks, setAddedStocks] = useState([]);
  const [bomData, setBomData] = useState({});
  const [heatSummaryData, setHeatSummaryData] = useState({});

  const [formData, setFormData] = useState({
    plant: "SHARP",
    tm_no: "",
    tm_date: new Date().toISOString().split('T')[0],
    item_code: "",
    part_code: "",
    heat_no: "",
    new_heat_no: "",
    ok_qty: "",
    rework_qty: "0",
    reject_qty: "0",
    rate: "0",
    remark_note: ""
  });

  useEffect(() => {
    fetchTrnNo();
    fetchBomData();
  }, []);

  // Fetch heat summary when item_code changes
  useEffect(() => {
    if (formData.item_code) {
      fetchHeatSummary(formData.item_code);
    } else {
      setHeatSummaryData({});
    }
  }, [formData.item_code]);

  const fetchBomData = async () => {
    try {
      const response = await axios.get("https://sellerp-backend.onrender.com/All_Masters/api/bom-items/");
      setBomData(response.data || {});
    } catch (error) {
      console.error("Error fetching BOM items:", error);
    }
  };

  const fetchTrnNo = async () => {
    try {
      const response = await axios.get("https://sellerp-backend.onrender.com/Store/generate-opening-stock-fg-tm/");
      if (response.data) {
        // Handle various response structures
        const generatedNo = response.data.tm_no || response.data.data?.tm_no || response.data.data || "";
        if (generatedNo) {
          setFormData(prev => ({ ...prev, tm_no: generatedNo }));
        }
      }
    } catch (error) {
      console.error("Error fetching Trn No:", error);
    }
  };

  const fetchHeatSummary = async (partNo) => {
    try {
      const response = await axios.get(`https://sellerp-backend.onrender.com/Store/heat-summary/?part_no=${partNo}`);
      setHeatSummaryData(response.data || {});
    } catch (error) {
      console.error("Error fetching heat summary:", error);
      setHeatSummaryData({});
    }
  };

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "item_code") {
        updated.part_code = ""; // reset part code when item code changes
        updated.heat_no = ""; // reset heat no as well
      }
      if (name === "part_code") {
        updated.heat_no = ""; // reset heat no when part code changes
      }
      return updated;
    });
  };

  const handleCheckboxChange = (e) => {
    setIsNewHeatNo(e.target.checked);
    if (!e.target.checked) {
      setFormData(prev => ({ ...prev, new_heat_no: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.item_code || !formData.ok_qty) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Item Code and OK Qty are required.",
        confirmButtonColor: "#3085d6"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("https://sellerp-backend.onrender.com/Store/opening-stock-fg/", formData);
      if (response.data && response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Stock added successfully!",
          confirmButtonColor: "#3085d6"
        });
        
        // Add to local table
        setAddedStocks(prev => [...prev, formData]);

        // Reset form (keeping default values)
        setFormData({
          plant: "SHARP",
          tm_no: formData.tm_no,
          tm_date: new Date().toISOString().split('T')[0],
          item_code: "",
          part_code: "",
          heat_no: "",
          new_heat_no: "",
          ok_qty: "",
          rework_qty: "0",
          reject_qty: "0",
          rate: "0",
          remark_note: ""
        });
        setIsNewHeatNo(false);
        
        // Fetch new TRN no for the next entry
        fetchTrnNo();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Failed to add stock.",
          confirmButtonColor: "#d33"
        });
      }
    } catch (error) {
      console.error("Error adding stock:", error);
      Swal.fire({
        icon: "error",
        title: "API Error",
        text: "Something went wrong while connecting to the server.",
        confirmButtonColor: "#d33"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Derive dynamic part codes and heat nos based on selected item code
  const selectedBomItem = Object.values(bomData).find(item => item.part_no === formData.item_code);
  const partCodeOptions = selectedBomItem ? selectedBomItem.bom_items || [] : [];
  
  const activeBom = partCodeOptions.find(bom => bom.PartCode === formData.part_code);
  const activeOpNo = activeBom ? activeBom.OPNo : null;

  // Extract unique heat numbers based on activeOpNo using the response object keys
  const heatNoEntries = activeOpNo && heatSummaryData[activeOpNo] 
    ? Object.entries(heatSummaryData[activeOpNo]) 
    : [];

  return (
    <div className="AddWipStock">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                
                {/* Header Section */}
                <div className="container-fluid mt-4 px-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0" style={{ fontWeight: 800, fontSize: '1.8rem', background: 'linear-gradient(90deg, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Add WIP Stock
                    </h5>
                    <Link to="/OpeningWIPReport" className="btn btn-outline-primary btn-sm d-flex align-items-center fw-medium px-3 py-2 shadow-sm text-decoration-none" style={{ borderRadius: "8px" }}>
                      <FaUpload className="me-2" /> WIP Opening (Excel Upload)
                    </Link>
                  </div>
                </div>

                {/* Form Section */}
                <div className="container-fluid px-4 mb-4">
                  <div className="card shadow-sm border-0" style={{ borderRadius: "10px", backgroundColor: "#ffffff" }}>
                    <div className="card-body p-4 p-md-5">
                      <div className="row g-4">
                        <div className="col-12 col-lg-8">
                          
                          {/* Plant */}
                          <div className="row mb-3 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Plant :</label>
                            </div>
                            <div className="col-12 col-sm-9">
                              <select className="form-select form-select-sm shadow-none" style={{ maxWidth: '250px' }} name="plant" value={formData.plant} onChange={handleChange}>
                                <option value="SHARP">SHARP</option>
                              </select>
                            </div>
                          </div>
                          
                          {/* Trn No */}
                          <div className="row mb-3 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Trn No :</label>
                            </div>
                            <div className="col-12 col-sm-9">
                              <input type="text" className="form-control form-control-sm shadow-none bg-light" style={{ maxWidth: '250px' }} name="tm_no" value={formData.tm_no} readOnly />
                            </div>
                          </div>

                          {/* Trn Date */}
                          <div className="row mb-3 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Trn Date :</label>
                            </div>
                            <div className="col-12 col-sm-9">
                              <input type="date" className="form-control form-control-sm shadow-none" style={{ maxWidth: '250px' }} name="tm_date" value={formData.tm_date} onChange={handleChange} />
                            </div>
                          </div>

                          {/* Item Code */}
                          <div className="row mb-3 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Item Code(FG/SF) :</label>
                            </div>
                            <div className="col-12 col-sm-9 d-flex gap-2">
                              <select className="form-select form-select-sm shadow-none" style={{ maxWidth: '300px' }} name="item_code" value={formData.item_code} onChange={handleChange}>
                                <option value="">Select Item Code</option>
                                {Object.values(bomData).map((item) => (
                                  <option key={item.item_id} value={item.part_no}>
                                    {item.part_no} - {item.Name_Description} - {item.Part_Code}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Part Code & Heat No */}
                          <div className="row mb-3 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Part Code :</label>
                            </div>
                            <div className="col-12 col-sm-9 d-flex flex-wrap align-items-center gap-3">
                              <select className="form-select form-select-sm shadow-none" style={{ maxWidth: '200px' }} name="part_code" value={formData.part_code} onChange={handleChange}>
                                <option value="">Select Part Code</option>
                                {partCodeOptions.map((bom) => (
                                  <option key={bom.id} value={bom.PartCode}>
                                    {bom.PartCode}/{bom.OPNo}
                                  </option>
                                ))}
                              </select>
                              <span className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Heat No :</span>
                              <select className="form-select form-select-sm shadow-none" style={{ maxWidth: '200px' }} name="heat_no" value={formData.heat_no} onChange={handleChange} disabled={isNewHeatNo}>
                                <option value="">Select Heat No</option>
                                {heatNoEntries.map(([heatNo, qty], idx) => (
                                  <option key={idx} value={heatNo}>{heatNo} : {qty}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* New Heat No */}
                          <div className="row mb-3 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <div className="form-check m-0">
                                <input className="form-check-input shadow-none" type="checkbox" id="newHeatNo" checked={isNewHeatNo} onChange={handleCheckboxChange} />
                                <label className="form-check-label fw-medium text-secondary ms-1" style={{ fontSize: "14px" }} htmlFor="newHeatNo">
                                  New Heat No :
                                </label>
                              </div>
                            </div>
                            <div className="col-12 col-sm-9">
                              <input type="text" className="form-control form-control-sm shadow-none" style={{ maxWidth: '300px' }} name="new_heat_no" value={formData.new_heat_no} onChange={handleChange} disabled={!isNewHeatNo} />
                            </div>
                          </div>

                          {/* Ok Qty */}
                          <div className="row mb-3 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Ok Qty :</label>
                            </div>
                            <div className="col-12 col-sm-9 d-flex flex-wrap align-items-center gap-2">
                              <input type="number" className="form-control form-control-sm shadow-none" style={{ maxWidth: '150px' }} name="ok_qty" value={formData.ok_qty} onChange={handleChange} />
                              <span className="text-danger fw-medium" style={{ fontSize: '0.85rem' }}>USE '-' MINUS Before Stock To Reduce Stock.</span>
                            </div>
                          </div>

                          {/* Rework Qty */}
                          <div className="row mb-3 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Rework Qty (PD) :</label>
                            </div>
                            <div className="col-12 col-sm-9">
                              <input type="number" className="form-control form-control-sm shadow-none" style={{ maxWidth: '150px' }} name="rework_qty" value={formData.rework_qty} onChange={handleChange} />
                            </div>
                          </div>

                          {/* Reject Qty */}
                          <div className="row mb-3 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Reject Qty (MD) :</label>
                            </div>
                            <div className="col-12 col-sm-9">
                              <input type="number" className="form-control form-control-sm shadow-none" style={{ maxWidth: '150px' }} name="reject_qty" value={formData.reject_qty} onChange={handleChange} />
                            </div>
                          </div>

                          {/* Rate */}
                          <div className="row mb-3 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Rate :</label>
                            </div>
                            <div className="col-12 col-sm-9">
                              <input type="number" step="0.01" className="form-control form-control-sm shadow-none" style={{ maxWidth: '150px' }} name="rate" value={formData.rate} onChange={handleChange} />
                            </div>
                          </div>

                          {/* Remark */}
                          <div className="row mb-4 align-items-start">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0 pt-sm-1">
                              <label className="fw-medium text-secondary" style={{ fontSize: "14px" }}>Remark /Note :</label>
                            </div>
                            <div className="col-12 col-sm-9">
                              <textarea className="form-control form-control-sm shadow-none" rows="3" style={{ maxWidth: '500px', resize: 'none' }} name="remark_note" value={formData.remark_note} onChange={handleChange}></textarea>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="row mt-4">
                            <div className="col-12 col-sm-12 text-end">
                              <button 
                                className="btn btn-success btn-sm px-4 shadow-sm" 
                                style={{ borderRadius: "6px" }}
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                ) : (
                                  <FaCheckCircle className="me-2" />
                                )}
                                Add Stock
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recently Added Stocks Table */}
                {addedStocks.length > 0 && (
                  <div className="container-fluid px-4 mb-5">
                    <div className="card shadow-sm border-0" style={{ borderRadius: "10px", backgroundColor: "#ffffff" }}>
                      <div className="card-header bg-white" style={{ borderBottom: "1px solid #f1f5f9", borderRadius: "10px 10px 0 0" }}>
                        <h6 className="mb-0 fw-bold text-secondary py-1">Recently Added Stocks</h6>
                      </div>
                      <div className="card-body p-0">
                        <div className="table-responsive">
                          <table className="table table-hover mb-0" style={{ fontSize: '13px' }}>
                            <thead className="table-light">
                              <tr>
                                <th className="text-secondary fw-bold text-center align-middle py-3">Sr. No.</th>
                                <th className="text-secondary fw-bold align-middle py-3">Plant</th>
                                <th className="text-secondary fw-bold align-middle py-3">Trn No</th>
                                <th className="text-secondary fw-bold align-middle py-3">Item Code</th>
                                <th className="text-secondary fw-bold align-middle py-3">Part Code</th>
                                <th className="text-secondary fw-bold text-center align-middle py-3">Ok Qty</th>
                                <th className="text-secondary fw-bold text-center align-middle py-3">Rate</th>
                                <th className="text-secondary fw-bold align-middle py-3">Remark</th>
                              </tr>
                            </thead>
                            <tbody>
                              {addedStocks.map((stock, index) => (
                                <tr key={index} style={{ verticalAlign: 'middle' }}>
                                  <td className="text-center text-muted fw-medium">{index + 1}</td>
                                  <td>{stock.plant}</td>
                                  <td className="fw-medium text-dark">{stock.tm_no}</td>
                                  <td>{stock.item_code}</td>
                                  <td className="text-muted">{stock.part_code || "-"}</td>
                                  <td className="text-center fw-medium text-primary">{stock.ok_qty}</td>
                                  <td className="text-center">{stock.rate}</td>
                                  <td className="text-muted">{stock.remark_note || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWipStock;
