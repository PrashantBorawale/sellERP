import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import "./SubconJobworkInwardQC.css";
import Swal from "sweetalert2";
import { CheckCircle } from "react-feather";
import { forceSaveSubconQC } from "../../../../Service/Api.jsx";

const getEmptyQcInfo = () => ({
  qc: "",
  qc_date: new Date().toISOString().split("T")[0],
  format_no: "",
  vendor_heat_code: "",
  vendor_tc_no: "",
  rev_no: "",
  lot_accepted_rejected: "Accepted",
  sample_qty: "",
  rev_date: new Date().toISOString().split("T")[0],
  control_plan_no: "",
  wire_size: "",
  total_coil: "",
  coil_from_no: "",
  coil_to_no: "",
  heat_no: "",
  grn_qty: "",
  qc_pending_qty: "",
  qc_qty: "",
  ok_qty: "",
  rework_qty: "",
  reject_qty: "",
  store_qty: "",
  a_u_d_qty: "",
  raw_material: "",
  drawing_rev_no: "",
  lab_mill_tc_no: "",
  lab_mill_tc_name: "",
  lab_mill_tc_date: new Date().toISOString().split("T")[0],
  remark: "",
  grn_57F4_no: "",
  grn_57F4_date: "",
  vendor: "",
  item: ""
});

const SubconJobworkInwardQC = () => {
  const location = useLocation();
  const grnDataFromState = location.state?.grnData;
  const [sideNavOpen, setSideNavOpen] = useState(false);

  // State for dropdowns
  const [selectedSeries, setSelectedSeries] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const itemOptions = useMemo(() => {
    if (!grnDataFromState?.InwardChallanTable) return [];
    return grnDataFromState.InwardChallanTable.map(item => {
      const desc = item.ItemDescription || "";
      // Format: "Part: FGFG1001 - 1 - CAP OIL LOCK DF | Op: OP:10 | ..."
      const partMatch = desc.match(/Part:\s*([^|]+)/);
      const opMatch = desc.match(/Op:\s*([^|]+)/);
      const part = partMatch ? partMatch[1].trim() : "";
      const op = opMatch ? opMatch[1].trim() : "";
      return `${part} | ${op}`;
    });
  }, [grnDataFromState]);



  // React-controlled tabs
  const [activeTab, setActiveTab] = useState("dimensional");



  const [qcInfo, setQcInfo] = useState(getEmptyQcInfo());

  useEffect(() => {
    if (grnDataFromState) {
      setQcInfo(prev => ({
        ...prev,
        grn_57F4_no: grnDataFromState.InwardF4No || "",
        grn_57F4_date: grnDataFromState.InwardDate || "",
        vendor: grnDataFromState.SupplierName || ""
      }));
    }
  }, [grnDataFromState]);

  const handleItemSelect = (e) => {
    const value = e.target.value;
    const selectedIdx = e.target.selectedIndex - 1; // -1 for the "Select" option
    setSelectedItem(value);

    let matchedItem = null;
    if (selectedIdx >= 0 && grnDataFromState?.InwardChallanTable) {
      matchedItem = grnDataFromState.InwardChallanTable[selectedIdx];
    }

    if (!matchedItem && value && grnDataFromState?.InwardChallanTable) {
      // Fallback: search by checking if ItemDescription contains the part code
      const partCode = value.split('|')[0].trim();
      matchedItem = grnDataFromState.InwardChallanTable.find(item => 
        item.ItemDescription?.includes(partCode)
      );
    }

    if (matchedItem) {
      setQcInfo(prev => ({
        ...prev,
        item: value,
        heat_no: matchedItem.heat_no || matchedItem.HeatNo || matchedItem.store || ""
      }));
    } else {
      setQcInfo(prev => ({ ...prev, item: value, heat_no: "" }));
    }
  };

  const [dimensionTests, setDimensionTests] = useState([]);

  const [visualTests, setVisualTests] = useState([]);

  const [reworkItems, setReworkItems] = useState([]);

  const [rejectItems, setRejectItems] = useState([]);

  // Handlers for inputs
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setQcInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveReport = async () => {
    const payload = {
      ...qcInfo,
      dimension_tests: dimensionTests,
      visual_tests: visualTests,
      rework_items: reworkItems,
      reject_items: rejectItems
    };
    console.log("Subcon Payload Sending:", payload);

    console.log("!!! COMPONENT CALLING forceSaveSubconQC !!!");
    try {
      const response = await forceSaveSubconQC(payload);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Report saved successfully!",
        confirmButtonColor: "#3085d6",
      });
      // Clear form on success
      setQcInfo(getEmptyQcInfo());
      setDimensionTests([]);
      setVisualTests([]);
      setReworkItems([]);
      setRejectItems([]);
      fetchQcNumber();
      console.log("Response:", response);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error saving report: ${error.message}`,
        confirmButtonColor: "#d33",
      });
    }
  };

  const [newDimensional, setNewDimensional] = useState({
    test_no: "",
    test_description: "",
    specification: "",
    dimensions: "",
    tol_sub: "",
    tol_add: "",
    methods_of_check: "",
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    remark: ""
  });

  const handleAddDimensional = () => {
    setDimensionTests([...dimensionTests, { ...newDimensional, id: Date.now(), qc: 2 }]);
    setNewDimensional({
      test_no: "",
      test_description: "",
      specification: "",
      dimensions: "",
      tol_sub: "",
      tol_add: "",
      methods_of_check: "",
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
      remark: ""
    });
  };

  const handleDeleteDimensional = (id) => {
    setDimensionTests(dimensionTests.filter(item => item.id !== id));
  };

  const [newVisual, setNewVisual] = useState({
    test_no: "",
    test_description: "",
    specification: "",
    methods_of_check: "",
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    merge: false,
    remark: ""
  });

  const handleAddVisual = () => {
    setVisualTests([...visualTests, { ...newVisual, id: Date.now(), qc: 2 }]);
    setNewVisual({
      test_no: "",
      test_description: "",
      specification: "",
      methods_of_check: "",
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
      merge: false,
      remark: ""
    });
  };

  const handleDeleteVisual = (id) => {
    setVisualTests(visualTests.filter(item => item.id !== id));
  };

  const [newRework, setNewRework] = useState({
    description: "",
    qty: "",
    supplier: ""
  });

  const handleAddRework = () => {
    setReworkItems([...reworkItems, { ...newRework, id: Date.now(), qc: 2 }]);
    setNewRework({ description: "", qty: "", supplier: "" });
  };

  const handleDeleteRework = (id) => {
    setReworkItems(reworkItems.filter(item => item.id !== id));
  };

  const [newReject, setNewReject] = useState({
    description: "",
    qty: "",
    supplier: ""
  });

  const handleAddReject = () => {
    setRejectItems([...rejectItems, { ...newReject, id: Date.now(), qc: 2 }]);
    setNewReject({ description: "", qty: "", supplier: "" });
  };

  const handleDeleteReject = (id) => {
    setRejectItems(rejectItems.filter(item => item.id !== id));
  };

  useEffect(() => {
    const totalRework = reworkItems.reduce((acc, item) => acc + (parseFloat(item.qty) || 0), 0);
    setQcInfo(prev => ({ ...prev, rework_qty: totalRework.toString() }));
  }, [reworkItems]);

  useEffect(() => {
    const totalReject = rejectItems.reduce((acc, item) => acc + (parseFloat(item.qty) || 0), 0);
    setQcInfo(prev => ({ ...prev, reject_qty: totalReject.toString() }));
  }, [rejectItems]);

  useEffect(() => {
    const ok = parseFloat(qcInfo.ok_qty) || 0;
    const rew = parseFloat(qcInfo.rework_qty) || 0;
    const rej = parseFloat(qcInfo.reject_qty) || 0;
    setQcInfo(prev => ({ ...prev, qc_qty: (ok + rew + rej).toString() }));
  }, [qcInfo.ok_qty, qcInfo.rework_qty, qcInfo.reject_qty]);

  const fetchQcNumber = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Quality/subcon-qc-number/");
      const data = await response.json();
      if (data && data.qc) {
        setQcInfo(prev => ({ ...prev, qc: data.qc }));
      }
    } catch (error) {
      console.error("Error fetching QC number:", error);
    }
  };

  useEffect(() => {
    fetchQcNumber();
  }, []);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const isItemSelected = selectedSeries === "Subcon GRN" && selectedItem === "FG1019|B3SD001260|SPR";
  const displayData = isItemSelected ? dimensionTests : [];

  return (
    <div className="SubconJobworkInwardQCMaster" style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0 position-relative">
            <div className="Main-NavBar">

              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} />

              <main
                className={`main-content ${sideNavOpen ? "shifted" : ""}`}
                style={{ padding: "10px", transition: "margin-left 0.3s ease", marginLeft: sideNavOpen ? "250px" : "0" }}
              >
                <div className="SubconJobworkInwardQC bg-white border shadow-sm" style={{ fontSize: "12px", padding: "10px" }}>

                  {/* ================= HEADER ================= */}
                  <div className="SubconJobworkInwardQC-header border-bottom pb-2 mb-2">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                      <h5 className="header-title text-primary mb-0 fw-bold" style={{ fontSize: "18px" }}>
                        Subcon / Jobwork Inward QC
                      </h5>
                      <div className="d-flex flex-wrap gap-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 shadow-none" style={{ fontSize: "11px" }}>
                          <span style={{ fontSize: "12px" }}>≡</span> Pending List
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 shadow-none" style={{ fontSize: "11px" }}>
                          <span style={{ fontSize: "12px" }}>≡</span> Inward Insp. List
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ================= FILTER ROW ================= */}
                  <div className="row g-2 p-2 border mb-2 rounded m-0 align-items-center" style={{ backgroundColor: "#f8f9fa" }}>
                    <div className="col-12 col-md-auto d-flex align-items-center gap-2">
                      <label className="fw-medium text-nowrap mb-0">Series :</label>
                      <select
                        className="form-select form-select-sm shadow-none"
                        style={{ width: "100%", maxWidth: "150px", fontSize: "11px" }}
                        value={selectedSeries}
                        onChange={(e) => setSelectedSeries(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Subcon GRN">Subcon GRN</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-auto d-flex align-items-center gap-2 border-md-start ps-md-3">
                      <label className="fw-medium text-nowrap mb-0">Select Item :</label>
                      <select
                        className="form-select form-select-sm shadow-none"
                        style={{ width: "100%", maxWidth: "250px", fontSize: "11px" }}
                        value={selectedItem}
                        onChange={handleItemSelect}
                      >
                        <option value="">Select</option>
                        {itemOptions.map((opt, idx) => (
                          <option key={idx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* ================= TABS & CONTENT ================= */}
                  <div className="AssemblyEntry-bottom mt-3">

                    <div className="d-flex flex-wrap gap-2 mb-2 pb-2 border-bottom" style={{ fontSize: "12px" }}>
                      {[
                        { id: "dimensional", label: "A. Dimensional" },
                        { id: "visualinspection", label: "B. Visual Inspection" },
                        { id: "reworkRej", label: "C. Rework & Rej Qty" },
                        { id: "qcInfo", label: "D. Qc Info" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          className={`btn btn-sm fw-bold px-4 py-2 ${activeTab === tab.id ? "text-white shadow-sm" : "text-secondary bg-light"}`}
                          style={{
                            backgroundColor: activeTab === tab.id ? "#007bff" : "#f8f9fa",
                            border: activeTab === tab.id ? "1px solid #007bff" : "1px solid #dee2e6",
                            borderRadius: "4px", // Full button, small round edges, rectangular
                            transition: "all 0.2s ease"
                          }}
                          onClick={() => setActiveTab(tab.id)}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content Area */}
                    <div className="tab-content border p-2 rounded" style={{ minHeight: "450px" }}>

                      {/* ================= A. DIMENSIONAL TAB ================= */}
                      {activeTab === "dimensional" && (
                        <div className="tab-pane fade show active">
                          {/* Input Form Table */}
                          <div className="table-responsive mb-2">
                            <table className="table table-bordered table-sm align-middle text-center mb-0" style={{ fontSize: "11px", whiteSpace: "nowrap" }}>
                              <thead style={{ backgroundColor: "#f2f2f2", color: "#666" }}>
                                <tr>
                                  <th>Test No</th>
                                  <th>Test Description</th>
                                  <th>Specification</th>
                                  <th>Dimensions</th>
                                  <th>Tol (-)</th>
                                  <th>Tol (+)</th>
                                  <th>Method Of Check</th>
                                  <th style={{ width: "40px" }}>1</th>
                                  <th style={{ width: "40px" }}>2</th>
                                  <th style={{ width: "40px" }}>3</th>
                                  <th style={{ width: "40px" }}>4</th>
                                  <th style={{ width: "40px" }}>5</th>
                                  <th>Remark</th>
                                  <th style={{ width: "60px" }}></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" placeholder="Enter.." style={{ width: "50px", fontSize: "11px" }} value={newDimensional.test_no} onChange={(e) => setNewDimensional({ ...newDimensional, test_no: e.target.value })} /></td>
                                  <td><textarea className="form-control form-control-sm border shadow-none" placeholder="Enter .." rows="1" style={{ width: "120px", fontSize: "11px", resize: "none" }} value={newDimensional.test_description} onChange={(e) => setNewDimensional({ ...newDimensional, test_description: e.target.value })}></textarea></td>
                                  <td><textarea className="form-control form-control-sm border shadow-none" placeholder="Enter .." rows="1" style={{ width: "120px", fontSize: "11px", resize: "none" }} value={newDimensional.specification} onChange={(e) => setNewDimensional({ ...newDimensional, specification: e.target.value })}></textarea></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" placeholder="Enter.." style={{ width: "70px", fontSize: "11px" }} value={newDimensional.dimensions} onChange={(e) => setNewDimensional({ ...newDimensional, dimensions: e.target.value })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} value={newDimensional.tol_sub} onChange={(e) => setNewDimensional({ ...newDimensional, tol_sub: e.target.value })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} value={newDimensional.tol_add} onChange={(e) => setNewDimensional({ ...newDimensional, tol_add: e.target.value })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "100px" }} value={newDimensional.methods_of_check} onChange={(e) => setNewDimensional({ ...newDimensional, methods_of_check: e.target.value })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} value={newDimensional.one} onChange={(e) => setNewDimensional({ ...newDimensional, one: e.target.value })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} value={newDimensional.two} onChange={(e) => setNewDimensional({ ...newDimensional, two: e.target.value })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} value={newDimensional.three} onChange={(e) => setNewDimensional({ ...newDimensional, three: e.target.value })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} value={newDimensional.four} onChange={(e) => setNewDimensional({ ...newDimensional, four: e.target.value })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} value={newDimensional.five} onChange={(e) => setNewDimensional({ ...newDimensional, five: e.target.value })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "100px" }} value={newDimensional.remark} onChange={(e) => setNewDimensional({ ...newDimensional, remark: e.target.value })} /></td>
                                  <td className="text-end pe-0">
                                    <button className="btn btn-sm btn-light border fw-medium d-flex align-items-center justify-content-center w-100 shadow-none ms-auto" style={{ fontSize: "11px", maxWidth: "60px" }} onClick={handleAddDimensional}>
                                      Add
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Data Table */}
                          <div className="table-responsive border" style={{ maxHeight: "300px", overflowY: "auto" }}>
                            <table className="table table-bordered table-sm table-hover align-middle text-start mb-0" style={{ fontSize: "11px", whiteSpace: "nowrap" }}>
                              <thead className="sticky-top" style={{ backgroundColor: "#007bff", color: "white", zIndex: 1 }}>
                                <tr className="text-center">
                                  <th className="fw-normal border-end border-bottom-0">Sr.</th>
                                  <th className="fw-normal border-end border-bottom-0">Test No</th>
                                  <th className="fw-normal border-end border-bottom-0">Test Description</th>
                                  <th className="fw-normal border-end border-bottom-0">Specification</th>
                                  <th className="fw-normal border-end border-bottom-0">Dimensions</th>
                                  <th className="fw-normal border-end border-bottom-0">Tol (-)</th>
                                  <th className="fw-normal border-end border-bottom-0">Tol (+)</th>
                                  <th className="fw-normal border-end border-bottom-0">Method Of Check</th>
                                  <th className="fw-normal border-end border-bottom-0">S1</th>
                                  <th className="fw-normal border-end border-bottom-0">S2</th>
                                  <th className="fw-normal border-end border-bottom-0">S3</th>
                                  <th className="fw-normal border-end border-bottom-0">S4</th>
                                  <th className="fw-normal border-end border-bottom-0">S5</th>
                                  <th className="fw-normal border-end border-bottom-0">Remark</th>
                                  <th className="fw-normal border-bottom-0">Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                {dimensionTests.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="text-center text-muted">{index + 1}</td>
                                    <td className="text-center">{row.test_no}</td>
                                    <td>{row.test_description}</td>
                                    <td>{row.specification}</td>
                                    <td>{row.dimensions}</td>
                                    <td>{row.tol_sub}</td>
                                    <td>{row.tol_add}</td>
                                    <td>{row.methods_of_check}</td>
                                    <td>{row.one}</td>
                                    <td>{row.two}</td>
                                    <td>{row.three}</td>
                                    <td>{row.four}</td>
                                    <td>{row.five}</td>
                                    <td>{row.remark}</td>
                                    <td className="text-center">
                                      <button className="btn btn-link text-secondary p-0 shadow-none border-0 text-decoration-none" title="Delete" onClick={() => handleDeleteDimensional(row.id)}>🗑️</button>
                                    </td>
                                  </tr>
                                ))}
                                {dimensionTests.length === 0 && (
                                  <tr>
                                    <td colSpan="15" className="text-center text-muted p-3">No records found.</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* ================= B. VISUAL INSPECTION TAB ================= */}
                      {activeTab === "visualinspection" && (
                        <div className="tab-pane fade show active">
                          {/* Input Form Table */}
                          <div className="table-responsive mb-2">
                            <table className="table table-bordered table-sm align-middle text-center mb-0" style={{ fontSize: "11px", whiteSpace: "nowrap" }}>
                              <thead style={{ backgroundColor: "#f2f2f2", color: "#666" }}>
                                <tr>
                                  <th>Test No</th>
                                  <th>Test Description</th>
                                  <th>Specification</th>
                                  <th>Method Of Check</th>
                                  <th style={{ width: "40px" }}>1</th>
                                  <th style={{ width: "40px" }}>2</th>
                                  <th style={{ width: "40px" }}>3</th>
                                  <th style={{ width: "40px" }}>4</th>
                                  <th style={{ width: "40px" }}>5</th>
                                  <th>Merge</th>
                                  <th>Remarks</th>
                                  <th style={{ width: "60px" }}></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" placeholder="Enter.." style={{ width: "60px", fontSize: "11px" }} value={newVisual.test_no} onChange={(e) => setNewVisual({ ...newVisual, test_no: e.target.value })} /></td>
                                  <td><textarea className="form-control form-control-sm border shadow-none" placeholder="Enter .." rows="1" style={{ width: "160px", fontSize: "11px", resize: "none" }} value={newVisual.test_description} onChange={(e) => setNewVisual({ ...newVisual, test_description: e.target.value })}></textarea></td>
                                  <td><textarea className="form-control form-control-sm border shadow-none" placeholder="Enter Specification.." rows="1" style={{ width: "160px", fontSize: "11px", resize: "none" }} value={newVisual.specification} onChange={(e) => setNewVisual({ ...newVisual, specification: e.target.value })}></textarea></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "120px" }} value={newVisual.methods_of_check} onChange={(e) => setNewVisual({ ...newVisual, methods_of_check: e.target.value })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} value={newVisual.one} onChange={(e) => setNewVisual({ ...newVisual, one: e.target.value })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} value={newVisual.two} onChange={(e) => setNewVisual({ ...newVisual, two: e.target.value })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} value={newVisual.three} onChange={(e) => setNewVisual({ ...newVisual, three: e.target.value })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} value={newVisual.four} onChange={(e) => setNewVisual({ ...newVisual, four: e.target.value })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "40px" }} value={newVisual.five} onChange={(e) => setNewVisual({ ...newVisual, five: e.target.value })} /></td>
                                  <td><input type="checkbox" className="form-check-input" checked={newVisual.merge} onChange={(e) => setNewVisual({ ...newVisual, merge: e.target.checked })} /></td>
                                  <td><input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "120px" }} value={newVisual.remark} onChange={(e) => setNewVisual({ ...newVisual, remark: e.target.value })} /></td>
                                  <td className="text-end pe-0">
                                    <button className="btn btn-sm btn-light border fw-medium d-flex align-items-center justify-content-center w-100 shadow-none ms-auto" style={{ fontSize: "11px", maxWidth: "60px" }} onClick={handleAddVisual}>
                                      Add
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Data Table */}
                          <div className="table-responsive border" style={{ maxHeight: "300px", overflowY: "auto" }}>
                            <table className="table table-bordered table-sm table-hover align-middle text-start mb-0" style={{ fontSize: "11px", whiteSpace: "nowrap" }}>
                              <thead className="sticky-top" style={{ backgroundColor: "#007bff", color: "white", zIndex: 1 }}>
                                <tr className="text-center">
                                  <th className="fw-normal border-end border-bottom-0">Sr.</th>
                                  <th className="fw-normal border-end border-bottom-0">Test No</th>
                                  <th className="fw-normal border-end border-bottom-0">Test Description</th>
                                  <th className="fw-normal border-end border-bottom-0">Specification</th>
                                  <th className="fw-normal border-end border-bottom-0">Method Of Check</th>
                                  <th className="fw-normal border-end border-bottom-0">M1</th>
                                  <th className="fw-normal border-end border-bottom-0">M2</th>
                                  <th className="fw-normal border-end border-bottom-0">M3</th>
                                  <th className="fw-normal border-end border-bottom-0">M4</th>
                                  <th className="fw-normal border-end border-bottom-0">M5</th>
                                  <th className="fw-normal border-end border-bottom-0">Merge</th>
                                  <th className="fw-normal border-end border-bottom-0">Remark</th>
                                  <th className="fw-normal border-bottom-0">Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                {visualTests.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="text-center text-muted">{index + 1}</td>
                                    <td>{row.test_no}</td>
                                    <td>{row.test_description}</td>
                                    <td>{row.specification}</td>
                                    <td>{row.methods_of_check}</td>
                                    <td>{row.one}</td>
                                    <td>{row.two}</td>
                                    <td>{row.three}</td>
                                    <td>{row.four}</td>
                                    <td>{row.five}</td>
                                    <td className="text-center"><input type="checkbox" className="form-check-input" checked={row.merge} readOnly /></td>
                                    <td>{row.remark}</td>
                                    <td className="text-center">
                                      <button className="btn btn-link text-secondary p-0 shadow-none border-0 text-decoration-none" title="Delete" onClick={() => handleDeleteVisual(row.id)}>🗑️</button>
                                    </td>
                                  </tr>
                                ))}
                                {visualTests.length === 0 && (
                                  <tr>
                                    <td colSpan="13" className="text-center text-muted p-3">No records found.</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* ================= C. REWORK & REJ QTY TAB ================= */}
                      {activeTab === "reworkRej" && (
                        <div className="tab-pane fade show active">

                          {/* Top Action Bar */}
                          <div className="d-flex align-items-center gap-3 p-2 border border-bottom-0 bg-light rounded-top">
                            <span className="text-primary fw-medium">Rework | Reject :</span>
                            <button className="btn btn-sm btn-light border shadow-none py-0" style={{ fontSize: "11px" }}>Rework Master</button>
                            <button className="btn btn-sm btn-light border shadow-none py-0" style={{ fontSize: "11px" }}>Reject Master</button>
                            <div className="d-flex align-items-center gap-1 ms-2">
                              <input type="checkbox" className="form-check-input mt-0" />
                              <span className="text-muted">Supplier:</span>
                              <span className="text-secondary ms-1">JV0067 Ayush Enterprises</span>
                            </div>
                          </div>

                          {/* Two Column Layout */}
                          <div className="row g-0 border border-bottom-0">

                            {/* Rework Column */}
                            <div className="col-12 col-lg-6 border-end p-2 pb-md-5">
                              <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                                <label className="fw-medium mb-0">Rework :</label>
                                <select className="form-select form-select-sm shadow-none" style={{ width: "100%", maxWidth: "120px", fontSize: "11px" }} value={newRework.description} onChange={(e) => setNewRework({ ...newRework, description: e.target.value })}>
                                  <option value="">Select</option>
                                  <option value="Minor scratch">Minor scratch</option>
                                  <option value="Dented">Dented</option>
                                </select>
                                <input type="text" className="form-control form-control-sm shadow-none" style={{ width: "100%", maxWidth: "60px" }} value={newRework.qty} onChange={(e) => setNewRework({ ...newRework, qty: e.target.value })} />
                                <button className="btn btn-sm btn-light border shadow-none py-0 px-3" style={{ fontSize: "11px" }} onClick={handleAddRework}>Add</button>
                                <button className="btn btn-sm btn-light border shadow-none py-0 px-2" style={{ fontSize: "11px" }} onClick={() => setNewRework({ description: "", qty: "", supplier: "" })}>⟳</button>
                              </div>
                              <div className="table-responsive">
                                <table className="table table-bordered table-sm align-middle text-center mb-0" style={{ fontSize: "11px" }}>
                                  <thead style={{ backgroundColor: "#007bff", color: "white" }}>
                                    <tr>
                                      <th className="fw-normal">Sr</th>
                                      <th className="fw-normal">Description</th>
                                      <th className="fw-normal">Qty</th>
                                      <th className="fw-normal">Supplier</th>
                                      <th className="fw-normal">Del</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {reworkItems.map((item, index) => (
                                      <tr key={item.id}>
                                        <td className="text-muted">{index + 1}</td>
                                        <td>{item.description}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.supplier}</td>
                                        <td><button className="btn btn-sm btn-light border text-secondary py-0 px-1 shadow-none" style={{ fontSize: "10px" }} onClick={() => handleDeleteRework(item.id)}>X</button></td>
                                      </tr>
                                    ))}
                                    {reworkItems.length === 0 && (
                                      <tr><td colSpan="5" className="text-muted">No data</td></tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* Reject Column */}
                            <div className="col-12 col-lg-6 p-2 pb-md-5">
                              <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                                <label className="fw-medium mb-0">Reject :</label>
                                <select className="form-select form-select-sm shadow-none" style={{ width: "100%", maxWidth: "120px", fontSize: "11px" }} value={newReject.description} onChange={(e) => setNewReject({ ...newReject, description: e.target.value })}>
                                  <option value="">Select</option>
                                  <option value="Crack found">Crack found</option>
                                  <option value="Broken">Broken</option>
                                </select>
                                <input type="text" className="form-control form-control-sm shadow-none" style={{ width: "100%", maxWidth: "60px" }} value={newReject.qty} onChange={(e) => setNewReject({ ...newReject, qty: e.target.value })} />
                                <button className="btn btn-sm btn-light border shadow-none py-0 px-3" style={{ fontSize: "11px" }} onClick={handleAddReject}>Add</button>
                                <button className="btn btn-sm btn-light border shadow-none py-0 px-2" style={{ fontSize: "11px" }} onClick={() => setNewReject({ description: "", qty: "", supplier: "" })}>⟳</button>
                              </div>
                              <div className="table-responsive">
                                <table className="table table-bordered table-sm align-middle text-center mb-0" style={{ fontSize: "11px" }}>
                                  <thead style={{ backgroundColor: "#007bff", color: "white" }}>
                                    <tr>
                                      <th className="fw-normal">Sr</th>
                                      <th className="fw-normal">Description</th>
                                      <th className="fw-normal">Qty</th>
                                      <th className="fw-normal">Supplier</th>
                                      <th className="fw-normal">Del</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {rejectItems.map((item, index) => (
                                      <tr key={item.id}>
                                        <td className="text-muted">{index + 1}</td>
                                        <td>{item.description}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.supplier}</td>
                                        <td><button className="btn btn-sm btn-light border text-secondary py-0 px-1 shadow-none" style={{ fontSize: "10px" }} onClick={() => handleDeleteReject(item.id)}>X</button></td>
                                      </tr>
                                    ))}
                                    {rejectItems.length === 0 && (
                                      <tr><td colSpan="5" className="text-muted">No data</td></tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>

                          {/* Summary Footer */}
                          <div className="d-flex flex-wrap justify-content-around align-items-center p-2 border bg-white rounded-bottom gap-3" style={{ fontSize: "12px", fontWeight: "600" }}>
                            <div>OK Qty : <span className="badge bg-success rounded-pill px-3 py-1 ms-1">{qcInfo.ok_qty}</span></div>
                            <span className="text-primary d-none d-md-block">|</span>
                            <div>Rework : <span className="badge bg-warning text-dark rounded-pill px-3 py-1 ms-1">{qcInfo.rework_qty}</span></div>
                            <span className="text-primary d-none d-md-block">|</span>
                            <div>Reject : <span className="badge bg-danger rounded-pill px-3 py-1 ms-1">{qcInfo.reject_qty}</span></div>
                            <span className="text-primary d-none d-md-block">|</span>
                            <div>Total Qty : <span className="badge bg-primary rounded-pill px-3 py-1 ms-1">{qcInfo.qc_qty}</span></div>
                          </div>

                        </div>
                      )}

                      {/* ================= D. QC INFO TAB ================= */}
                      {activeTab === "qcInfo" && (
                        <div className="tab-pane fade show active">

                          {/* Top Header Bar */}
                          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center bg-light p-2 border-bottom fw-bold rounded-top gap-2" style={{ fontSize: "11px", color: "#333" }}>
                            <div className="d-flex flex-wrap align-items-center">
                              <span className="text-dark">57F4 GRN No : </span> <span className="text-dark ms-1">{grnDataFromState?.InwardF4No || "---"}</span>
                              <span className="mx-2 text-muted">|</span>
                              <span className="text-dark">57F4 GRN Date : </span> <span className="text-dark ms-1">{grnDataFromState?.InwardDate || "---"}</span>
                              <span className="mx-2 text-muted">|</span>
                              <span className="text-dark">{grnDataFromState?.SupplierName || "---"}</span>
                            </div>
                            <div className="text-dark text-nowrap" style={{ cursor: "pointer" }}>
                              View 57F4 Outward Details 👁️
                            </div>
                          </div>

                          <div className="p-3">
                            <div className="row g-2 mb-3">
                              {/* Col 1 */}
                              <div className="col-12 col-md-6 col-lg-4">
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 col-sm-4 col-md-5 text-end"><label className="mb-0 text-muted">QC (IIR) No :</label></div>
                                  <div className="col-7 col-sm-8 col-md-7 d-flex gap-1">
                                    <input type="text" className="form-control form-control-sm border shadow-none" name="qc" value={qcInfo.qc} readOnly />
                                    <button type="button" className="btn btn-sm btn-light border py-0 px-2" onClick={fetchQcNumber} title="Fetch QC Number">⟳</button>
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 col-sm-4 col-md-5 text-end"><label className="mb-0 text-muted">Vendor Heat Code :</label></div>
                                  <div className="col-7 col-sm-8 col-md-7"><input type="text" className="form-control form-control-sm border shadow-none" name="vendor_heat_code" value={qcInfo.vendor_heat_code} onChange={handleInfoChange} /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 col-sm-4 col-md-5 text-end"><label className="mb-0 text-muted">Lot Accepted / Rejected :</label></div>
                                  <div className="col-7 col-sm-8 col-md-7">
                                    <select className="form-select form-select-sm border shadow-none" name="lot_accepted_rejected" value={qcInfo.lot_accepted_rejected} onChange={handleInfoChange}>
                                      <option value="Accepted">Accepted</option>
                                      <option value="Rejected">Rejected</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 col-sm-4 col-md-5 text-end"><label className="mb-0 text-muted">Control Plan No :</label></div>
                                  <div className="col-7 col-sm-8 col-md-7"><input type="text" className="form-control form-control-sm border shadow-none" name="control_plan_no" value={qcInfo.control_plan_no} onChange={handleInfoChange} /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 col-sm-4 col-md-5 text-end"><label className="mb-0 text-muted">Total Coil(s) :</label></div>
                                  <div className="col-7 col-sm-8 col-md-7"><input type="text" className="form-control form-control-sm border shadow-none" name="total_coil" value={qcInfo.total_coil} onChange={handleInfoChange} /></div>
                                </div>
                              </div>

                              {/* Col 2 */}
                              <div className="col-12 col-md-6 col-lg-4">
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">QC (IIR) Date :</label></div>
                                  <div className="col-8 d-flex flex-wrap gap-1 align-items-center">
                                    <input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "90px" }} name="qc_date" value={new Date(qcInfo.qc_date).toLocaleDateString()} readOnly /> 📅
                                    <span className="ms-1 text-muted">Time:</span>
                                    <input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "80px" }} value={new Date(qcInfo.qc_date).toLocaleTimeString()} readOnly />
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">Vendor TC No :</label></div>
                                  <div className="col-8 d-flex flex-wrap gap-1 align-items-center">
                                    <input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "90px" }} name="vendor_tc_no" value={qcInfo.vendor_tc_no} onChange={handleInfoChange} />
                                    <input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "90px" }} value={new Date().toLocaleDateString()} readOnly /> 📅
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">Sample Qty :</label></div>
                                  <div className="col-8"><input type="text" className="form-control form-control-sm border shadow-none w-50" style={{ minWidth: "80px" }} name="sample_qty" value={qcInfo.sample_qty} onChange={handleInfoChange} /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">Wire Size :</label></div>
                                  <div className="col-8 d-flex gap-1">
                                    <input type="text" className="form-control form-control-sm border shadow-none w-50" style={{ minWidth: "60px" }} name="wire_size" value={qcInfo.wire_size} onChange={handleInfoChange} />
                                    <input type="text" className="form-control form-control-sm border shadow-none w-50" style={{ minWidth: "60px" }} />
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">Coil From No :</label></div>
                                  <div className="col-8"><input type="text" className="form-control form-control-sm border shadow-none" name="coil_from_no" value={qcInfo.coil_from_no} onChange={handleInfoChange} /></div>
                                </div>
                              </div>

                              {/* Col 3 */}
                              <div className="col-12 col-md-6 col-lg-4">
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 col-sm-4 col-md-5 text-end"><label className="mb-0 text-muted">(ISO) Format No :</label></div>
                                  <div className="col-7 col-sm-8 col-md-7"><input type="text" className="form-control form-control-sm border shadow-none" name="format_no" value={qcInfo.format_no} onChange={handleInfoChange} /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 col-sm-4 col-md-5 text-end"><label className="mb-0 text-muted">(ISO) Rev. No :</label></div>
                                  <div className="col-7 col-sm-8 col-md-7"><input type="text" className="form-control form-control-sm border shadow-none" name="rev_no" value={qcInfo.rev_no} onChange={handleInfoChange} /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 col-sm-4 col-md-5 text-end"><label className="mb-0 text-muted">(ISO) Rev. Date :</label></div>
                                  <div className="col-7 col-sm-8 col-md-7"><input type="date" className="form-control form-control-sm border shadow-none" name="rev_date" value={qcInfo.rev_date} onChange={handleInfoChange} /></div>
                                </div>
                                <div className="row align-items-center d-none d-lg-block" style={{ height: "28px" }}></div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 col-sm-4 col-md-5 text-end"><label className="mb-0 text-muted">Coil To No :</label></div>
                                  <div className="col-7 col-sm-8 col-md-7"><input type="text" className="form-control form-control-sm border shadow-none" name="coil_to_no" value={qcInfo.coil_to_no} onChange={handleInfoChange} /></div>
                                </div>
                              </div>
                            </div>

                            {/* Quantities Box Area */}
                            <div className="p-2 mb-3 border rounded bg-light d-flex flex-wrap gap-3 align-items-center">
                              <div className="d-flex gap-2 mb-1">
                                <div className="d-flex align-items-center"><span className="text-muted me-1">Heat No</span> <input className="form-control form-control-sm border shadow-none" name="heat_no" value={qcInfo.heat_no} readOnly style={{ width: "80px" }} /></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">GRN Qty:</span> <input className="form-control form-control-sm border shadow-none" name="grn_qty" value={qcInfo.grn_qty} onChange={handleInfoChange} style={{ width: "60px" }} /></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">QC Qty:</span> <input className="form-control form-control-sm border shadow-none" name="qc_qty_initial" value={qcInfo.qc_qty} readOnly style={{ width: "50px" }} /></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">Qc Pending Qty:</span> <span className="ms-1 fw-bold text-dark">{qcInfo.qc_pending_qty}</span></div>
                              </div>
                              <div className="w-100 m-0"></div>
                              <div className="d-flex gap-2 mb-1">
                                <div className="d-flex align-items-center"><span className="text-muted me-1">QC Qty:</span> <input className="form-control form-control-sm border shadow-none" name="qc_qty" value={qcInfo.qc_qty} onChange={handleInfoChange} style={{ width: "60px" }} /></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">OK Qty:</span> <input className="form-control form-control-sm border shadow-none" name="ok_qty" value={qcInfo.ok_qty} onChange={handleInfoChange} style={{ width: "60px" }} /></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">Rework Qty:</span> <input className="form-control form-control-sm border shadow-none" value={qcInfo.rework_qty} readOnly style={{ width: "50px" }} /></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">Reject Qty:</span> <input className="form-control form-control-sm border shadow-none" value={qcInfo.reject_qty} readOnly style={{ width: "50px" }} /></div>
                              </div>
                              <div className="w-100 m-0"></div>
                              <div className="d-flex gap-2">
                                <div className="d-flex align-items-center"><input className="form-control form-control-sm border shadow-none" value="0" readOnly style={{ width: "50px" }} /></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">Store Qty:</span> <input className="form-control form-control-sm border shadow-none" name="store_qty" value={qcInfo.store_qty} onChange={handleInfoChange} style={{ width: "60px" }} /> <span className="ms-1 text-muted" style={{ fontSize: "10px" }}>(Pass Qty. Into Stock)</span></div>
                                <div className="d-flex align-items-center"><span className="text-muted mx-2">A.U.D. Qty:</span> <input className="form-control form-control-sm border shadow-none" name="a_u_d_qty" value={qcInfo.a_u_d_qty} onChange={handleInfoChange} style={{ width: "50px" }} /></div>
                              </div>
                            </div>

                            {/* Bottom Fields */}
                            <div className="row g-2">
                              {/* Col 1 */}
                              <div className="col-12 col-md-6 col-lg-4">
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 col-sm-4 col-md-5 text-end"><label className="mb-0 text-muted">Raw Material :</label></div>
                                  <div className="col-7 col-sm-8 col-md-7"><input type="text" className="form-control form-control-sm border shadow-none" name="raw_material" value={qcInfo.raw_material} onChange={handleInfoChange} /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-5 col-sm-4 col-md-5 text-end"><label className="mb-0 text-muted">LAB / MILL TC No :</label></div>
                                  <div className="col-7 col-sm-8 col-md-7"><input type="text" className="form-control form-control-sm border shadow-none" name="lab_mill_tc_no" value={qcInfo.lab_mill_tc_no} onChange={handleInfoChange} /></div>
                                </div>
                                <div className="row align-items-start mb-1">
                                  <div className="col-5 col-sm-4 col-md-5 text-end mt-1"><label className="mb-0 text-muted">Remark :</label></div>
                                  <div className="col-7 col-sm-8 col-md-7"><textarea className="form-control form-control-sm border shadow-none" rows="2" name="remark" value={qcInfo.remark} onChange={handleInfoChange}></textarea></div>
                                </div>
                                <div className="row align-items-center mb-1 mt-2">
                                  <div className="col-5 col-sm-4 col-md-5 text-end"><label className="mb-0 text-muted">Inspected By :</label></div>
                                  <div className="col-7 col-sm-8 col-md-7"><input type="text" className="form-control form-control-sm border shadow-none" /></div>
                                </div>
                              </div>

                              {/* Col 2 */}
                              <div className="col-12 col-md-6 col-lg-4">
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">Drawing Rev No :</label></div>
                                  <div className="col-8"><input type="text" className="form-control form-control-sm border shadow-none w-50" style={{ minWidth: "80px" }} name="drawing_rev_no" value={qcInfo.drawing_rev_no} onChange={handleInfoChange} /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">LAB / MILL TC Name :</label></div>
                                  <div className="col-8"><input type="text" className="form-control form-control-sm border shadow-none" name="lab_mill_tc_name" value={qcInfo.lab_mill_tc_name} onChange={handleInfoChange} /></div>
                                </div>
                                <div className="row align-items-center mb-1 mt-md-4 mt-lg-5">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">Approved By :</label></div>
                                  <div className="col-8"><input type="text" className="form-control form-control-sm border shadow-none" value="more" readOnly /></div>
                                </div>
                              </div>

                              {/* Col 3 */}
                              <div className="col-12 col-md-6 col-lg-4">
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">Grade :</label></div>
                                  <div className="col-8"><input type="text" className="form-control form-control-sm border shadow-none" /></div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4 text-end"><label className="mb-0 text-muted">LAB / MILL TC Date :</label></div>
                                  <div className="col-8">
                                    <input type="date" className="form-control form-control-sm border shadow-none" name="lab_mill_tc_date" value={qcInfo.lab_mill_tc_date} onChange={handleInfoChange} />
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}


                      {/* ================= SAVE BUTTON - FIXED BOTTOM LEFT ================= */}
                      <div className="d-flex justify-content-start mt-4">
                        <button className="btn btn-light border d-flex align-items-center gap-2" onClick={handleSaveReport}>
                          <CheckCircle size={16} /> Save Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubconJobworkInwardQC;