import React, { useState, useEffect } from "react";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import "./InprocessInspectionDetails.css";
import VisualInspection from "./VisualInspection";
import ReworkRejectQty from "./ReworkRejectQty";
import QCInfo from "./QCInfo";
import { saveQCInfo, fetchInwardTestQcNumber } from "../../../Service/Api";
import { useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Swal from "sweetalert2";


const InprocessInspectionDetails = () => {
  const location = useLocation();
  const selectedItem = location.state?.selectedItem || {};

  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dimensional");

  // Initial State for QC Info
  const initialQcInfo = {
    qc_no: "",
    sample_qty: "",
    prod_qty: "",
    qc_qty: "",
    ok_qty: "",
    a_u_d_qty: "",
    accepted_rejected: "",
    accepted_under_deviation: "",
    suggestions: "",
    inspected_by: "",
    date: "",
    qc_time: "",
    drawing_rev_no: "",
    format_no: "",
    rev_no: "",
    rev_date: "",
    remark: "",
    non_conformance: "",
    approved_by: "",
    prod_no: "",
    heat_no: "",
    item_desc: ""
  };

  const [isSaving, setIsSaving] = useState(false);

  const [qcInfo, setQcInfo] = useState({ ...initialQcInfo });

  // States for other tabs
  const [dimensionalTests, setDimensionalTests] = useState([]);
  const [newDimTest, setNewDimTest] = useState({
    test_no: "",
    test_description: "",
    specification: "",
    dimensions: "",
    tol_minus: "",
    tol_plus: "",
    method_of_check: "",
    m1: "", m2: "", m3: "", m4: "", m5: "",
    remark: "",
    actual_observations: ""
  });
  const [visualTests, setVisualTests] = useState([]);
  const [reworkEntries, setReworkEntries] = useState([]);
  const [rejectEntries, setRejectEntries] = useState([]);

  useEffect(() => {
    fetchQcNo();
  }, []);

  useEffect(() => {
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      setQcInfo(prev => ({
        ...prev,
        prod_no: selectedItem.Prod_no || "",
        item_desc: selectedItem.ItemDescription || "",
        heat_no: selectedItem.lot_no ? selectedItem.lot_no.split('|')[0] : "",
        prod_qty: selectedItem.prod_qty || "",
      }));
    }
  }, [selectedItem]);

  const fetchQcNo = async () => {
    try {
      const data = await fetchInwardTestQcNumber();
      // Robust key handling: check multiple possible response formats
      const newQcNo = data.InwardTestQCNo || data.qc_no || data.next_qc_no || (typeof data === 'string' ? data : "");

      if (newQcNo) {
        setQcInfo(prev => ({ ...prev, qc_no: newQcNo }));
        return newQcNo;
      }
    } catch (error) {
      console.error("Error fetching QC number:", error);
    }
    return "";
  };


  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const handleAddDimensional = () => {
    setDimensionalTests(prev => [...prev, { ...newDimTest, id: Date.now() }]);
    setNewDimTest({
      test_no: "",
      test_description: "",
      specification: "",
      dimensions: "",
      tol_minus: "",
      tol_plus: "",
      method_of_check: "",
      m1: "", m2: "", m3: "", m4: "", m5: "",
      remark: "",
      actual_observations: ""
    });
  };

  const handleDeleteDimensional = (id) => {
    setDimensionalTests(prev => prev.filter(t => t.id !== id));
  };

  const handleSaveReport = async () => {
    if (isSaving) return;
    setIsSaving(true);

    const validateAndClean = () => {
      const cleaned = { ...qcInfo };
      const dateFields = ["date", "rev_date"];
      const timeFields = ["qc_time"];

      // Check mandatory fields
      if (!cleaned.qc_no || !cleaned.prod_no || !cleaned.date || !cleaned.qc_time) {
        Swal.fire({
          icon: "warning",
          title: "Missing Information",
          text: "Please fill mandatory fields: QC No, Product No, Date, and QC Time.",
          confirmButtonColor: "#3085d6",
        });
        return null;
      }

      dateFields.forEach(f => {
        if (!cleaned[f]) delete cleaned[f];
      });
      timeFields.forEach(f => {
        if (!cleaned[f]) delete cleaned[f];
      });

      return cleaned;
    };

    const cleanedQcInfo = validateAndClean();
    if (!cleanedQcInfo) {
      setIsSaving(false);
      return;
    }

    try {
      const payload = {
        ...selectedItem,
        ...cleanedQcInfo,
        dimension_tests: dimensionalTests.map(({ id, ...rest }) => rest),
        visual_tests: visualTests.map(({ id, ...rest }) => rest),
        rework_qty: reworkEntries.map(({ id, ...rest }) => rest),
        reject_qty: rejectEntries.map(({ id, ...rest }) => rest),
        item: selectedItem?.item || "",
        item_des: cleanedQcInfo.item_desc || selectedItem?.ItemDescription || "",
        heat_no: cleanedQcInfo.heat_no || (selectedItem?.lot_no ? selectedItem.lot_no.split('|')[0] : ""),
        opno: selectedItem?.operation || "",
        prod_no: cleanedQcInfo.prod_no || selectedItem?.Prod_no || "",
        prod_qty: Number(cleanedQcInfo.prod_qty) || Number(selectedItem?.prod_qty) || 0,
        ok_qty: Number(cleanedQcInfo.ok_qty) || 0,
        qc_qty: Number(cleanedQcInfo.qc_qty) || 0,
        sample_qty: Number(cleanedQcInfo.sample_qty) || 0,
        a_u_d_qty: Number(cleanedQcInfo.a_u_d_qty) || 0,
        accepted_or_rejected: cleanedQcInfo.accepted_rejected || "",
        suggestion: cleanedQcInfo.suggestions || "",
        non_conformece: cleanedQcInfo.non_conformance || "",
      };

      await saveQCInfo(payload);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Report saved successfully!",
        confirmButtonColor: "#3085d6",
      });

      // Fetch next QC No first to ensure it's ready for the reset
      const nextQcNo = await fetchQcNo();

      // Reset Form with atomic update to QC No
      setQcInfo({
        ...initialQcInfo,
        qc_no: nextQcNo || ""
      });
      setDimensionalTests([]);
      setVisualTests([]);
      setReworkEntries([]);
      setRejectEntries([]);
      setActiveTab("dimensional");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Save",
        text: error.message,
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <NavBar toggleSideNav={toggleSideNav} />
      <div className="InprocessInspectionMaster">
        <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />

        <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
          <div className="container-fluid p-3">

            <div className="InprocessInspection-card">

              {/* TITLE BAR */}
              <div className="inspection-header p-2 bg-light border-bottom d-flex flex-wrap justify-content-between align-items-center mb-3 rounded-top">
                <div className="text-start ps-2">
                  <h5 className="m-0 fw-bold" style={{ color: '#007bff', fontSize: '18px' }}>Inprocess Inspection</h5>
                </div>
                <div className="d-flex gap-2 pe-2">
                  <button className="btn btn-primary btn-sm text-nowrap shadow-sm px-3" style={{ fontSize: '12px', fontWeight: '500' }}>Pending List</button>
                  <button className="btn btn-primary btn-sm text-nowrap shadow-sm px-3" style={{ fontSize: '12px', fontWeight: '500' }}>Insp. List</button>
                </div>
              </div>

              <div className="tab-buttons mb-3">

                <button
                  type="button"
                  className={`btn btn-sm px-3 ${activeTab === "dimensional"
                    ? "btn-primary"
                    : "btn-outline-primary"
                    }`}
                  onClick={() => setActiveTab("dimensional")}
                >
                  A. Dimensional
                </button>

                <button
                  type="button"
                  className={`btn btn-sm px-3 ${activeTab === "visual"
                    ? "btn-primary"
                    : "btn-outline-primary"
                    }`}
                  onClick={() => setActiveTab("visual")}
                >
                  B. Visual Inspection
                </button>

                <button
                  type="button"
                  className={`btn btn-sm px-3 ${activeTab === "rework"
                    ? "btn-primary"
                    : "btn-outline-primary"
                    }`}
                  onClick={() => setActiveTab("rework")}
                >
                  C. Rework & Rej Qty
                </button>

                <button
                  type="button"
                  className={`btn btn-sm px-3 ${activeTab === "qcinfo"
                    ? "btn-primary"
                    : "btn-outline-primary"
                    }`}
                  onClick={() => setActiveTab("qcinfo")}
                >
                  D. QC Info
                </button>

              </div>
              {activeTab === "dimensional" && (
                <>
                  <div className="InprocessInspection-Main mb-3">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Test No</th>
                            <th>Test Description</th>
                            <th>Specification</th>
                            <th>Dimensions</th>
                            <th>Tol (-)</th>
                            <th>Tol (+)</th>
                            <th>Method of Check</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>Remark</th>
                            <th>Actual Observations</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><input className="form-control" placeholder="Enter.." value={newDimTest.test_no} onChange={(e) => setNewDimTest({ ...newDimTest, test_no: e.target.value })} /></td>
                            <td><input className="form-control" placeholder="Enter.." value={newDimTest.test_description} onChange={(e) => setNewDimTest({ ...newDimTest, test_description: e.target.value })} /></td>
                            <td><input className="form-control" placeholder="Enter.." value={newDimTest.specification} onChange={(e) => setNewDimTest({ ...newDimTest, specification: e.target.value })} /></td>
                            <td><input className="form-control" placeholder="Enter.." value={newDimTest.dimensions} onChange={(e) => setNewDimTest({ ...newDimTest, dimensions: e.target.value })} /></td>
                            <td><input className="form-control" value={newDimTest.tol_minus} onChange={(e) => setNewDimTest({ ...newDimTest, tol_minus: e.target.value })} /></td>
                            <td><input className="form-control" value={newDimTest.tol_plus} onChange={(e) => setNewDimTest({ ...newDimTest, tol_plus: e.target.value })} /></td>
                            <td><input className="form-control" value={newDimTest.method_of_check} onChange={(e) => setNewDimTest({ ...newDimTest, method_of_check: e.target.value })} /></td>
                            <td><input className="form-control" value={newDimTest.m1} onChange={(e) => setNewDimTest({ ...newDimTest, m1: e.target.value })} /></td>
                            <td><input className="form-control" value={newDimTest.m2} onChange={(e) => setNewDimTest({ ...newDimTest, m2: e.target.value })} /></td>
                            <td><input className="form-control" value={newDimTest.m3} onChange={(e) => setNewDimTest({ ...newDimTest, m3: e.target.value })} /></td>
                            <td><input className="form-control" value={newDimTest.m4} onChange={(e) => setNewDimTest({ ...newDimTest, m4: e.target.value })} /></td>
                            <td><input className="form-control" value={newDimTest.m5} onChange={(e) => setNewDimTest({ ...newDimTest, m5: e.target.value })} /></td>
                            <td><input className="form-control" value={newDimTest.remark} onChange={(e) => setNewDimTest({ ...newDimTest, remark: e.target.value })} /></td>
                            <td><input className="form-control" value={newDimTest.actual_observations} onChange={(e) => setNewDimTest({ ...newDimTest, actual_observations: e.target.value })} /></td>
                            <td><button className="btn btn-primary btn-sm" onClick={handleAddDimensional}>Add</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Test No</th>
                          <th>Test Description</th>
                          <th>Specification</th>
                          <th>Dimensions</th>
                          <th>Tol (-)</th>
                          <th>Tol (+)</th>
                          <th>Method of Check</th>
                          <th>M1</th>
                          <th>M2</th>
                          <th>M3</th>
                          <th>M4</th>
                          <th>M5</th>
                          <th>Remark</th>
                          <th>Actual Observations</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dimensionalTests.map((t, idx) => (
                          <tr key={t.id}>
                            <td>{idx + 1}</td>
                            <td>{t.test_no}</td>
                            <td>{t.test_description}</td>
                            <td>{t.specification}</td>
                            <td>{t.dimensions}</td>
                            <td>{t.tol_minus}</td>
                            <td>{t.tol_plus}</td>
                            <td>{t.method_of_check}</td>
                            <td>{t.m1}</td>
                            <td>{t.m2}</td>
                            <td>{t.m3}</td>
                            <td>{t.m4}</td>
                            <td>{t.m5}</td>
                            <td>{t.remark}</td>
                            <td>{t.actual_observations}</td>
                            <td>
                              <button className="btn-link text-danger border-0 bg-transparent fs-5" onClick={() => handleDeleteDimensional(t.id)}>🗑</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="enable-field-wrapper text-start">
                    <div className="form-check m-0">
                      <input className="form-check-input" type="checkbox" id="enableFields" />
                      <label className="form-check-label" htmlFor="enableFields">
                        Enable Fields
                      </label>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "visual" && <VisualInspection visualTests={visualTests} setVisualTests={setVisualTests} />}
              {activeTab === "rework" && (
                <ReworkRejectQty
                  reworkEntries={reworkEntries}
                  setReworkEntries={setReworkEntries}
                  rejectEntries={rejectEntries}
                  setRejectEntries={setRejectEntries}
                  qcInfo={qcInfo}
                />
              )}
              {activeTab === "qcinfo" && (
                <QCInfo
                  qcInfo={qcInfo}
                  setQcInfo={setQcInfo}
                  onSave={handleSaveReport}
                  isSaving={isSaving}
                />
              )}

              <div className="p-3 d-flex justify-content-start border-top">

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
    </>
  );
};

export default InprocessInspectionDetails;