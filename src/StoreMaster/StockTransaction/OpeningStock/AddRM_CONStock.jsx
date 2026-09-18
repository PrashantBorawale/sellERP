import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import "./AddRM_CONStock.css";

const AddRM_CONStock = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addedStocks, setAddedStocks] = useState([]);
  const [rmItems, setRmItems] = useState([]);
  const [heatData, setHeatData] = useState([]);

  const [formData, setFormData] = useState({
    plant: "SHARP",
    item_category: "",
    no: "",
    date: new Date().toISOString().split('T')[0],
    item_code: "",
    heat_no: "",
    newHeatCode: false,
    new_heat_no: "",
    supp_heat_no: "",
    qty: "",
    rate: "",
    remark: ""
  });

  useEffect(() => {
    fetchTrnNo();
    fetchRmItems();
    fetchHeatData();
  }, []);

  const fetchHeatData = async () => {
    try {
      const response = await axios.get("https://sellerp-backend.onrender.com/Store/jobworkinward/rm/");
      if (response.data && response.data.status && Array.isArray(response.data.data)) {
        setHeatData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching heat data:", error);
    }
  };

  const fetchRmItems = async () => {
    try {
      const response = await axios.get("https://sellerp-backend.onrender.com/All_Masters/api/rm-items/");
      if (Array.isArray(response.data)) {
        setRmItems(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        setRmItems(response.data.data);
      } else {
        setRmItems([]);
      }
    } catch (error) {
      console.error("Error fetching RM items:", error);
    }
  };

  const fetchTrnNo = async () => {
    try {
      const response = await axios.get("https://sellerp-backend.onrender.com/Store/generate-opening-stock-rm-number/");
      if (response.data) {
        // Handle various response structures
        const generatedNo = response.data.no || response.data.data?.no || response.data.rm_no || response.data.data?.rm_no || response.data.data || "";
        if (generatedNo) {
          setFormData(prev => ({ ...prev, no: generatedNo }));
        }
      }
    } catch (error) {
      console.error("Error fetching RM Trn No:", error);
    }
  };

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.item_code || !formData.qty) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Item Code and Qty are required.",
        confirmButtonColor: "#3085d6"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        plant: formData.plant,
        item_category: formData.item_category,
        no: formData.no,
        date: formData.date,
        item_code: formData.item_code,
        heat_no: formData.heat_no,
        new_heat_code: formData.new_heat_no, // text input for new heat code
        supp_heat_no: formData.supp_heat_no,
        qty: formData.qty,
        rate: formData.rate,
        remark: formData.remark
      };

      const response = await axios.post("https://sellerp-backend.onrender.com/Store/opening-stock-rm/", payload);
      
      if (response.data && response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "Stock added successfully!",
          confirmButtonColor: "#3085d6"
        });
        
        // Add to local table (could also use data from response)
        setAddedStocks(prev => [...prev, formData]);

        // Reset form (keeping default values)
        setFormData(prev => ({
          ...prev,
          item_code: "",
          heat_no: "",
          newHeatCode: false,
          new_heat_no: "",
          supp_heat_no: "",
          qty: "",
          rate: "",
          remark: ""
        }));
        
        // Fetch new number for next entry
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

  const selectedItemHeatData = heatData.find(item => item.item_code === formData.item_code);
  const heatNoOptions = selectedItemHeatData && Array.isArray(selectedItemHeatData.variants) ? selectedItemHeatData.variants : [];

  return (
    <div className="AddRM_CONStock">
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
                      Add RM/CON Stock
                    </h5>
                    <Link to="#" className="btn btn-outline-primary btn-sm d-flex align-items-center fw-medium px-3 py-2 shadow-sm text-decoration-none" style={{ borderRadius: "8px" }}>
                      <FaUpload className="me-2" /> Add Stock / Opening (Excel Upload)
                    </Link>
                  </div>
                </div>

                {/* Form Section */}
                <div className="container-fluid px-4 mb-4">
                  <div className="card shadow-sm border" style={{ borderRadius: "4px", backgroundColor: "#ffffff" }}>
                    <div className="card-body p-4">
                      <div className="row g-4">
                        <div className="col-12 col-lg-8">
                          
                          {/* Plant */}
                          <div className="row mb-2 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "13px" }}>Plant :</label>
                            </div>
                            <div className="col-12 col-sm-9">
                              <select className="form-select form-select-sm shadow-none" style={{ maxWidth: '150px' }} name="plant" value={formData.plant} onChange={handleChange}>
                                <option value="SHARP">SHARP</option>
                              </select>
                            </div>
                          </div>

                          {/* Item Category */}
                          <div className="row mb-2 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "13px" }}>Item Category :</label>
                            </div>
                            <div className="col-12 col-sm-9">
                              <select className="form-select form-select-sm shadow-none" style={{ maxWidth: '150px' }} name="item_category" value={formData.item_category} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="RM">RM</option>
                                <option value="CON">CON</option>
                              </select>
                            </div>
                          </div>
                          
                          {/* No */}
                          <div className="row mb-2 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "13px" }}>No :</label>
                            </div>
                            <div className="col-12 col-sm-9">
                              <input type="text" className="form-control form-control-sm shadow-none bg-light" style={{ maxWidth: '150px' }} name="no" value={formData.no} readOnly />
                            </div>
                          </div>

                          {/* Date */}
                          <div className="row mb-2 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "13px" }}>Date :</label>
                            </div>
                            <div className="col-12 col-sm-9 d-flex align-items-center gap-1">
                              <input type="date" className="form-control form-control-sm shadow-none" style={{ maxWidth: '150px' }} name="date" value={formData.date} onChange={handleChange} />
                              <span className="border p-1 bg-light rounded text-secondary" style={{cursor: 'pointer'}}><i className="bi bi-calendar"></i></span>
                            </div>
                          </div>

                          {/* Item Code */}
                          <div className="row mb-2 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "13px" }}>Item Code:</label>
                            </div>
                            <div className="col-12 col-sm-9 d-flex gap-2">
                               <select className="form-select form-select-sm shadow-none" style={{ maxWidth: '350px' }} name="item_code" value={formData.item_code} onChange={handleChange}>
                                 <option value="">Select Item Code</option>
                                 {rmItems.map((item, index) => (
                                   <option key={index} value={item.part_no}>
                                     {item.part_no} | {item.Part_Code} | {item.Name_Description}
                                   </option>
                                 ))}
                               </select>
                            </div>
                          </div>

                          {/* Heat No */}
                          <div className="row mb-2 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "13px" }}>Heat No :</label>
                            </div>
                            <div className="col-12 col-sm-9 d-flex flex-wrap align-items-center gap-3">
                              <select className="form-select form-select-sm shadow-none" style={{ maxWidth: '250px' }} name="heat_no" value={formData.heat_no} onChange={handleChange} disabled={formData.newHeatCode}>
                                <option value="">Select Heat No</option>
                                {heatNoOptions.map((opt, index) => (
                                  <option key={index} value={opt.HeatNo}>
                                    {opt.HeatNo} | {opt.GRNQty}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* New Heat Code & Supp Heat No */}
                          <div className="row mb-2 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <div className="form-check m-0">
                                <input className="form-check-input shadow-none" type="checkbox" id="newHeatCode" name="newHeatCode" checked={formData.newHeatCode} onChange={handleChange} />
                                <label className="form-check-label fw-medium text-secondary ms-1" style={{ fontSize: "13px" }} htmlFor="newHeatCode">
                                  New Heat Code :
                                </label>
                              </div>
                            </div>
                            <div className="col-12 col-sm-9 d-flex flex-wrap align-items-center gap-2">
                              <input type="text" className="form-control form-control-sm shadow-none" style={{ maxWidth: '120px' }} name="new_heat_no" value={formData.new_heat_no} onChange={handleChange} disabled={!formData.newHeatCode} />
                              <span className="fw-medium text-secondary mx-1" style={{ fontSize: "13px" }}>Supp Heat No :</span>
                              <input type="text" className="form-control form-control-sm shadow-none" style={{ maxWidth: '120px' }} name="supp_heat_no" value={formData.supp_heat_no} onChange={handleChange} />
                            </div>
                          </div>

                          {/* Qty */}
                          <div className="row mb-2 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "13px" }}>Qty :</label>
                            </div>
                            <div className="col-12 col-sm-9 d-flex flex-wrap align-items-center gap-2">
                              <input type="number" className="form-control form-control-sm shadow-none" style={{ maxWidth: '120px' }} name="qty" value={formData.qty} onChange={handleChange} />
                            </div>
                          </div>

                          {/* Rate */}
                          <div className="row mb-2 align-items-center">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0">
                              <label className="fw-medium text-secondary" style={{ fontSize: "13px" }}>Rate :</label>
                            </div>
                            <div className="col-12 col-sm-9">
                              <input type="number" step="0.01" className="form-control form-control-sm shadow-none" style={{ maxWidth: '120px' }} name="rate" value={formData.rate} onChange={handleChange} />
                            </div>
                          </div>

                          {/* Remark */}
                          <div className="row mb-4 align-items-start">
                            <div className="col-12 col-sm-3 text-start mb-1 mb-sm-0 pt-sm-1">
                              <label className="fw-medium text-secondary" style={{ fontSize: "13px" }}>Remark :</label>
                            </div>
                            <div className="col-12 col-sm-9">
                              <textarea className="form-control form-control-sm shadow-none" rows="3" style={{ maxWidth: '350px', resize: 'none' }} name="remark" value={formData.remark} onChange={handleChange}></textarea>
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
                                <th className="text-secondary fw-bold align-middle py-3">Item Code</th>
                                <th className="text-secondary fw-bold text-center align-middle py-3">Qty</th>
                                <th className="text-secondary fw-bold text-center align-middle py-3">Rate</th>
                                <th className="text-secondary fw-bold align-middle py-3">Remark</th>
                              </tr>
                            </thead>
                            <tbody>
                              {addedStocks.map((stock, index) => (
                                <tr key={index} style={{ verticalAlign: 'middle' }}>
                                  <td className="text-center text-muted fw-medium">{index + 1}</td>
                                  <td>{stock.plant}</td>
                                  <td>{stock.item_code}</td>
                                  <td className="text-center fw-medium text-primary">{stock.qty}</td>
                                  <td className="text-center">{stock.rate}</td>
                                  <td className="text-muted">{stock.remark || "-"}</td>
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

export default AddRM_CONStock;
