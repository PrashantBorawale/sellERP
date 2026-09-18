import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, Plus, RefreshCw, Trash2, List, Save, CheckCircle } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Swal from "sweetalert2";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./RejectionMaterialQC.css";

// --- Sub-components for Form Layout ---
const FormRow = ({ label, children }) => (
  <div className="d-flex align-items-center mb-2">
    <div className="form-label text-secondary mb-0 text-end pe-2" style={{ width: '160px', flexShrink: 0 }}>{label}</div>
    <div className="d-flex align-items-center gap-2 flex-grow-1">{children}</div>
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`form-control border border-secondary-subtle rounded px-2 py-1 text-sm ${className}`}
    {...props}
  />
);

const Select = ({ className = "", children, ...props }) => (
  <select
    className={`form-select border border-secondary-subtle rounded px-2 py-1 text-sm bg-white ${className}`}
    {...props}
  >
    {children}
  </select>
);

// --- Tab A: QC Info ---
// --- Tab A: QC Info ---
const TabQcInfo = ({ data, handleChange, clearForm, fetchQcNumber }) => {
  return (
    <div className="PaddingSalesQC-filter">
      <div className="row">
        <div className="col-lg-9">
          <FormRow label="Rejection Series">
            <Select name="rejection_series" value={data.rejection_series || ""} onChange={handleChange} className="bg-light text-secondary" style={{ width: '200px' }}>
              <option value="">Select</option>
              <option value="Sales Return">Sales Return</option>
            </Select>
          </FormRow>

          <FormRow label="QC No">
            <div className="d-flex gap-1 w-100" style={{ maxWidth: '130px' }}>
              <Input
                name="qc_no"
                value={data.qc_no || ""}
                onChange={handleChange}
                readOnly
                style={{ backgroundColor: '#e9ecef' }}
              />
              <button type="button" className="btn btn-sm btn-light border py-0 px-2" onClick={fetchQcNumber} title="Fetch QC Number">⟳</button>
            </div>
            <span className="ms-2 text-secondary fw-medium">QC Date :</span>
            <Input type="date" name="qc_date" value={data.qc_date || ""} onChange={handleChange} style={{ width: '145px' }} />
          </FormRow>

          <FormRow label="Cust / Vendor Name">
            <Input name="cust_vender_name" value={data.cust_vender_name || ""} onChange={handleChange} className="bg-light w-100" style={{ maxWidth: '450px' }} />
          </FormRow>

          <FormRow label="Select Item">
            <Input name="select_item" value={data.select_item || ""} onChange={handleChange} className="bg-light w-100" style={{ maxWidth: '450px' }} />
            <button className="btn btn-light border d-flex align-items-center gap-1 py-1 px-2" style={{ fontSize: '12px' }}>
              <Search size={14} /> Select
            </button>
          </FormRow>

          <FormRow label="Part Code">
            <Input name="part_code" value={data.part_code || ""} onChange={handleChange} style={{ width: '130px' }} />
            <span className="ms-2 text-secondary fw-medium">Heat No</span>
            <Input name="heat_no" value={data.heat_no || ""} onChange={handleChange} style={{ width: '130px' }} />
            <label className="d-flex align-items-center gap-1 ms-3 text-secondary" style={{ cursor: 'pointer' }}>
              <input type="checkbox" className="mt-1" checked={!!data.New_heat_no} readOnly /> New Heat No :
            </label>
            <Input name="New_heat_no" value={data.New_heat_no || ""} onChange={handleChange} style={{ width: '100px' }} />
          </FormRow>

          <div className="d-flex flex-wrap gap-4 mt-3">
            <FormRow label="Return Qty">
              <Input name="return_qty" value={data.return_qty || ""} onChange={handleChange} className="bg-light" style={{ width: '100px' }} />
            </FormRow>
            <FormRow label="Ok Qty">
              <Input name="ok_qty" value={data.ok_qty || ""} onChange={handleChange} style={{ width: '100px' }} />
            </FormRow>
          </div>

          <div className="d-flex flex-wrap gap-4">
            <FormRow label="Rework Qty (PD)">
              <Input name="rework_qty" value={data.rework_qty || ""} onChange={handleChange} style={{ width: '100px' }} />
            </FormRow>
            <FormRow label="Reject Qty (MD)">
              <Input name="reject_qty" value={data.reject_qty || ""} onChange={handleChange} style={{ width: '100px' }} />
            </FormRow>
          </div>

          <FormRow label="Rework Reason">
            <Select name="rework_reason" value={data.rework_reason || ""} onChange={handleChange} style={{ width: '200px' }}>
              <option value="">Select</option>
              <option value="Minor scratch">Minor scratch</option>
              <option value="Dented">Dented</option>
            </Select>
            <button className="btn btn-light border py-1 px-2"><Plus size={14} /></button>
            <button className="btn btn-light border py-1 px-2" onClick={clearForm}><RefreshCw size={14} /></button>
          </FormRow>

          <FormRow label="Reject Reason">
            <Select name="reject_reason" value={data.reject_reason || ""} onChange={handleChange} style={{ width: '200px' }}>
              <option value="">Select</option>
              <option value="Crack found">Crack found</option>
              <option value="Broken">Broken</option>
            </Select>
            <button className="btn btn-light border py-1 px-2"><Plus size={14} /></button>
            <button className="btn btn-light border py-1 px-2" onClick={clearForm}><RefreshCw size={14} /></button>
          </FormRow>

          <FormRow label="Action Plan">
            <Input name="action_plan" className="w-100" style={{ maxWidth: '250px' }} value={data.action_plan || ""} onChange={handleChange} />
            <span className="ms-2 text-secondary fw-medium">Action</span>
            <Select name="action" style={{ width: '150px' }} value={data.action || ""} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Rework initiated">Rework initiated</option>
              <option value="Scrap">Scrap</option>
            </Select>
            <span className="ms-2 text-secondary fw-medium">Action Date</span>
            <Input type="date" name="action_date" value={data.action_date || ""} onChange={handleChange} style={{ width: '140px' }} />
          </FormRow>

          <FormRow label="Remark">
            <Input name="remark" className="w-100" style={{ maxWidth: '450px' }} value={data.remark || ""} onChange={handleChange} />
          </FormRow>

          <div className="d-flex flex-wrap gap-4 mt-2">
            <FormRow label="Inspected By">
              <Input name="inspected_by" style={{ width: '200px' }} value={data.inspected_by || ""} onChange={handleChange} />
            </FormRow>
            <FormRow label="Approved By">
              <Input name="approved_by" style={{ width: '200px' }} value={data.approved_by || ""} onChange={handleChange} />
            </FormRow>
          </div>
        </div>

        <div className="col-lg-3 mt-4 mt-lg-0">
          <div className="text-danger small fw-bold lh-lg p-3 bg-white border border-danger-subtle rounded">
            Sales Return NO : {data.rejection_series} <br />
            Date : {data.qc_date}<br />
            Remark: {data.remark}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Tab B: Dimensional ---
const TabDimensional = ({ tests = [], setTests }) => {
  const [newRow, setNewRow] = useState({
    test_no: "", test_description: "", dimensions: "", tol_sub: "", tol_add: "", methods_of_check: "", one: "", two: "", three: "", four: "", five: "", remark: ""
  });

  const handleAdd = () => {
    if (!newRow.test_no) return;
    setTests([...tests, { ...newRow, id: Date.now() }]);
    setNewRow({ test_no: "", test_description: "", dimensions: "", tol_sub: "", tol_add: "", methods_of_check: "", one: "", two: "", three: "", four: "", five: "", remark: "" });
  };

  const handleDelete = (id) => {
    setTests(tests.filter(row => row.id !== id));
  };

  return (
    <div className="PaddingSalesQC-Main bg-white border">
      <div className="table-responsive">
        <table className="table">
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th>Sr</th>
              <th>Test No</th>
              <th style={{ minWidth: '150px' }}>Test Description</th>
              <th>Dimensions</th>
              <th>Tol (-)</th>
              <th>Tol (+)</th>
              <th style={{ minWidth: '120px' }}>Method & Equipments</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th style={{ minWidth: '120px' }}>Remark</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><Input placeholder="Enter.." value={newRow.test_no} onChange={(e) => setNewRow({ ...newRow, test_no: e.target.value })} /></td>
              <td><textarea placeholder="Enter . ." className="form-control text-sm px-1 py-1" style={{ height: '30px', resize: 'none' }} value={newRow.test_description} onChange={(e) => setNewRow({ ...newRow, test_description: e.target.value })} /></td>
              <td><Input placeholder="Enter.." value={newRow.dimensions} onChange={(e) => setNewRow({ ...newRow, dimensions: e.target.value })} /></td>
              <td><Input value={newRow.tol_sub} onChange={(e) => setNewRow({ ...newRow, tol_sub: e.target.value })} /></td>
              <td><Input value={newRow.tol_add} onChange={(e) => setNewRow({ ...newRow, tol_add: e.target.value })} /></td>
              <td><Input value={newRow.methods_of_check} onChange={(e) => setNewRow({ ...newRow, methods_of_check: e.target.value })} /></td>
              <td><Input value={newRow.one} onChange={(e) => setNewRow({ ...newRow, one: e.target.value })} /></td>
              <td><Input value={newRow.two} onChange={(e) => setNewRow({ ...newRow, two: e.target.value })} /></td>
              <td><Input value={newRow.three} onChange={(e) => setNewRow({ ...newRow, three: e.target.value })} /></td>
              <td><Input value={newRow.four} onChange={(e) => setNewRow({ ...newRow, four: e.target.value })} /></td>
              <td><Input value={newRow.five} onChange={(e) => setNewRow({ ...newRow, five: e.target.value })} /></td>
              <td><Input value={newRow.remark} onChange={(e) => setNewRow({ ...newRow, remark: e.target.value })} /></td>
              <td>
                <button className="btn btn-light border fw-bold w-100 py-1" style={{ fontSize: '12px' }} onClick={handleAdd}>Add</button>
              </td>
            </tr>
          </tbody>

          <thead className="text-white" style={{ background: 'linear-gradient(to bottom, #6b95c4, #406ba1)' }}>
            <tr>
              <th>Sr.</th>
              <th>Test No</th>
              <th>Test Description</th>
              <th>Dimensions</th>
              <th>Tol (-)</th>
              <th>Tol (+)</th>
              <th>Method & Equipments</th>
              <th>S1</th>
              <th>S2</th>
              <th>S3</th>
              <th>S4</th>
              <th>S5</th>
              <th>Remark</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.test_no}</td>
                <td>{row.test_description}</td>
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
                <td>
                  <Trash2 size={16} className="text-secondary mx-auto" style={{ cursor: 'pointer' }} onClick={() => handleDelete(row.id)} />
                </td>
              </tr>
            ))}
            {tests.length === 0 && (
              <tr>
                <td colSpan="14" className="text-muted p-4">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div >
  );
};

// --- Tab C: Visual Inspection ---
const TabVisualInspection = ({ tests = [], setTests }) => {
  const [newRow, setNewRow] = useState({
    test_no: "", test_description: "", check_points: "", actual_observation: "", one: "", two: "", three: "", four: "", five: "", remark: ""
  });

  const handleAdd = () => {
    if (!newRow.test_no) return;
    setTests([...tests, { ...newRow, id: Date.now() }]);
    setNewRow({ test_no: "", test_description: "", check_points: "", actual_observation: "", one: "", two: "", three: "", four: "", five: "", remark: "" });
  };

  const handleDelete = (id) => {
    setTests(tests.filter(row => row.id !== id));
  };

  return (
    <div className="PaddingSalesQC-Main bg-white border">
      <div className="table-responsive">
        <table className="table">
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th>Sr.</th>
              <th>Test No</th>
              <th style={{ minWidth: '150px' }}>Test Description</th>
              <th>Check Points</th>
              <th style={{ minWidth: '150px' }}>Actual Observation</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th style={{ minWidth: '120px' }}>Remarks</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><Input placeholder="Enter.." value={newRow.test_no} onChange={(e) => setNewRow({ ...newRow, test_no: e.target.value })} /></td>
              <td><textarea placeholder="Enter . ." className="form-control text-sm px-1 py-1" style={{ height: '30px', resize: 'none' }} value={newRow.test_description} onChange={(e) => setNewRow({ ...newRow, test_description: e.target.value })} /></td>
              <td><Input placeholder="Enter Checkpoint.." value={newRow.check_points} onChange={(e) => setNewRow({ ...newRow, check_points: e.target.value })} /></td>
              <td><Input value={newRow.actual_observation} onChange={(e) => setNewRow({ ...newRow, actual_observation: e.target.value })} /></td>
              <td><Input value={newRow.one} onChange={(e) => setNewRow({ ...newRow, one: e.target.value })} /></td>
              <td><Input value={newRow.two} onChange={(e) => setNewRow({ ...newRow, two: e.target.value })} /></td>
              <td><Input value={newRow.three} onChange={(e) => setNewRow({ ...newRow, three: e.target.value })} /></td>
              <td><Input value={newRow.four} onChange={(e) => setNewRow({ ...newRow, four: e.target.value })} /></td>
              <td><Input value={newRow.five} onChange={(e) => setNewRow({ ...newRow, five: e.target.value })} /></td>
              <td><Input value={newRow.remark} onChange={(e) => setNewRow({ ...newRow, remark: e.target.value })} /></td>
              <td>
                <button className="btn btn-light border fw-bold w-100 py-1" style={{ fontSize: '12px' }} onClick={handleAdd}>Add</button>
              </td>
            </tr>
          </tbody>

          <thead className="text-white" style={{ background: 'linear-gradient(to bottom, #6b95c4, #406ba1)' }}>
            <tr>
              <th>Sr.</th>
              <th>Test No</th>
              <th>Test Description</th>
              <th>Check Points</th>
              <th>Actual Observation</th>
              <th>M1</th>
              <th>M2</th>
              <th>M3</th>
              <th>M4</th>
              <th>M5</th>
              <th>Remark</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.test_no}</td>
                <td>{row.test_description}</td>
                <td>{row.check_points}</td>
                <td>{row.actual_observation}</td>
                <td>{row.one}</td>
                <td>{row.two}</td>
                <td>{row.three}</td>
                <td>{row.four}</td>
                <td>{row.five}</td>
                <td>{row.remark}</td>
                <td>
                  <Trash2 size={16} className="text-secondary mx-auto" style={{ cursor: 'pointer' }} onClick={() => handleDelete(row.id)} />
                </td>
              </tr>
            ))}
            {tests.length === 0 && (
              <tr>
                <td colSpan="14" className="text-muted p-4">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Helper for Default State ---
const getEmptyQcInfo = () => ({
  rejection_series: "",
  qc_no: "",
  qc_date: new Date().toISOString().split("T")[0],
  cust_vender_name: "",
  select_item: "",
  part_code: "",
  heat_no: "",
  New_heat_no: "",
  return_qty: "",
  ok_qty: "",
  rework_qty: "",
  reject_qty: "",
  rework_reason: "",
  reject_reason: "",
  action_plan: "",
  action: "",
  action_date: "",
  remark: "",
  inspected_by: "",
  approved_by: ""
});

// --- Main Application Component ---
const RejectionMaterialQC = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('A');
  const location = useLocation();
  const [qcData, setQcData] = useState(getEmptyQcInfo());
  const [dimensionTests, setDimensionTests] = useState([]);
  const [visualTests, setVisualTests] = useState([]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setQcData(prev => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setQcData(getEmptyQcInfo());
    setDimensionTests([]);
    setVisualTests([]);
  };

  const fetchQcNumber = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Quality/sales-qc-number/");
      const data = await response.json();

      // Robust key handling for different API response formats
      const newQcNo = data.qc_no || data.InwardTestQCNo || data.next_qc_no || (typeof data === 'string' ? data : "");

      if (newQcNo) {
        setQcData(prev => ({ ...prev, qc_no: newQcNo }));
        return newQcNo;
      }
    } catch (error) {
      console.error("Error fetching QC number:", error);
    }
    return "";
  };

  useEffect(() => {
    clearForm();
    fetchQcNumber();
  }, []);

  const handleSaveReport = async () => {
    try {
      const payload = {
        ...qcData,
        dimension_tests: dimensionTests,
        visual_tests: visualTests
      };

      const response = await fetch("https://sellerp-backend.onrender.com/Quality/sales-return-qc/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Report saved successfully!",
          confirmButtonColor: "#3085d6",
        });

        // Fetch next QC No first and then clear/reset atomically
        const nextQc = await fetchQcNumber();
        clearForm();
        setQcData(prev => ({ ...prev, qc_no: nextQc || "" }));
      } else {
        const errData = await response.json().catch(() => ({}));
        console.error("Server error:", errData);
        Swal.fire({
          icon: "error",
          title: "Failed to Save",
          text: `Server responded with status: ${response.status}`,
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error saving report:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while saving the report. Check console for details.",
        confirmButtonColor: "#d33",
      });
    }
  };



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

  // Handle active tab styling logically without needing tailwind
  const getTabStyle = (tabName) => {
    const isActive = activeTab === tabName;
    return {
      padding: '8px 20px',
      border: '1px solid #dee2e6',
      borderBottom: 'none',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      backgroundColor: isActive ? '#007bff' : '#f8f9fa',
      color: isActive ? '#fff' : '#495057',
      fontWeight: 'bold',
      marginRight: '5px',
      cursor: 'pointer'
    };
  };

  return (
    <div className="PaddingSalesQCMaster">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />

              <main
                style={{
                  transition: 'margin-left 0.3s',
                  marginLeft: sideNavOpen ? '250px' : '0',
                  paddingBottom: '80px',
                  backgroundColor: '#f3f4f6',
                  minHeight: '100vh'
                }}
              >
                <div className="p-4">
                  {/* Header Area styled via your CSS */}
                  <div className="PaddingSalesQC-header d-flex justify-content-between align-items-center mb-4">
                    <h5 className="header-title m-0 text-primary" style={{ color: '#3b679e' }}>
                      Rejection Material QC
                    </h5>
                    <button className="btn btn-light border fw-bold d-flex align-items-center gap-2">
                      <List size={16} /> QC List
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="d-flex border-bottom">
                    <button onClick={() => setActiveTab('A')} style={getTabStyle('A')}>A. Qc Info</button>
                    <button onClick={() => setActiveTab('B')} style={getTabStyle('B')}>B. Dimensional</button>
                    <button onClick={() => setActiveTab('C')} style={getTabStyle('C')}>C. Visual Inspection</button>
                  </div>

                  {/* Tab Contents wrapper */}
                  <div className="shadow-sm">
                    {activeTab === 'A' && <TabQcInfo data={qcData} handleChange={handleChange} clearForm={clearForm} fetchQcNumber={fetchQcNumber} />}
                    {activeTab === 'B' && <TabDimensional tests={dimensionTests} setTests={setDimensionTests} />}
                    {activeTab === 'C' && <TabVisualInspection tests={visualTests} setTests={setVisualTests} />}
                  </div>

                  <div className="d-flex justify-content-start mt-4">
                    <button className="btn btn-light border d-flex align-items-center gap-2" onClick={handleSaveReport}>
                      <CheckCircle size={16} /> Save Report
                    </button>
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

export default RejectionMaterialQC;