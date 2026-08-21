"use client"

import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "@fortawesome/fontawesome-free/css/all.min.css"
import NavBar from "../../../NavBar/NavBar"
import SideNav from "../../../SideNav/SideNav"
import "./AddCycleTime.css"
import { useNavigate, useLocation } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { saveCycleTimeData, updateCycleTimeData, deleteCycleTimeData, fetchCycleTimeList, fetchWorkCenterData, fetchBomItems } from "../../../Service/Api.jsx"

const AddCycleTime = () => {

  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen)
  }
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state && location.state.editRecord) {
      handleEdit(location.state.editRecord);
    }
  }, [location.state]);

  const handleAddNewCycleTime = () => {
    navigate("/cycle-time-master")
  }

  const [formData, setFormData] = useState({
    part_no: "",
    part_desc: "",
    part_code: "",
    op_no: "",
    operation: "",
    Plant: "",
    PartCode: "",
    MachineType: "",
    Machine: "",
    OPTime: "",
    Load_Unload_Time: "",
    MO_Time: "",
    Total_Time: "",
    Time_in_Minutes: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "MachineType") {
      const selectedWC = workCenters.find(wc => wc.WorkCenterName === value);
      setFormData((prevData) => ({
        ...prevData,
        MachineType: value,
        Machine: selectedWC ? selectedWC.WorkCenterType : prevData.Machine,
      }))
    } else if (name === "PartCode") {
      // Store the full string directly in PartCode so it's saved whole in the DB
      setFormData((prevData) => ({
        ...prevData,
        PartCode: value,
        part_code: value,
        PartCodeDisplay: value
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.OPTime) {
      newErrors.OPTime = "This field is required"
    }

    if (!formData.Load_Unload_Time) {
      newErrors.Load_Unload_Time = "This field is required"
    }

    if (!formData.MO_Time) {
      newErrors.MO_Time = "This field is required"
    }

    if (!formData.Total_Time) {
      newErrors.Total_Time = "This field is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() && !isSubmitting) {
      try {
        setIsSubmitting(true);

        if (editId) {
          await updateCycleTimeData(editId, formData);
          toast.success("Data updated successfully!");
        } else {
          await saveCycleTimeData(formData);
          toast.success("Data saved successfully!");
        }

        console.log("formData", formData);
        handleClear(); // Reset form and editId
        loadCycleTime(); // Refresh table data
      } catch (error) {
        toast.error("Error saving data. Please try again.");
        console.log("error", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };


  const handleClear = () => {
    setFormData({
      part_no: "",
      part_desc: "",
      part_code: "",
      op_no: "",
      operation: "",
      Plant: "",
      PartCode: "",
      PartCodeDisplay: "",
      MachineType: "",
      Machine: "",
      OPTime: "",
      Load_Unload_Time: "",
      MO_Time: "",
      Total_Time: "",
      Time_in_Minutes: "",
    })
    setSearchTerm("")
    setSearchResults([])
    setErrors({})
    setEditId(null); // Exit edit mode
  }

  const [cycleTimeList, setCycleTimeList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [workCenters, setWorkCenters] = useState([]);

  useEffect(() => {
    loadCycleTime();
    fetchWorkCenterDataItems();
  }, []);

  const fetchWorkCenterDataItems = async () => {
    try {
      const data = await fetchWorkCenterData();
      console.log("Fetched Work Centers:", data); // Debugging
      if (Array.isArray(data)) {
        setWorkCenters(data);
      } else {
        console.error("API did not return an array for Work Centers:", data);
        setWorkCenters([]);
      }
    } catch (err) {
      console.error("Failed to fetch work centers", err);
      toast.error("Failed to load machine data");
      setWorkCenters([]);
    }
  };

  const loadCycleTime = async () => {
    try {
      const data = await fetchCycleTimeList();
      setCycleTimeList(data.reverse());
    } catch (err) {
      console.error("Failed to fetch cycle time", err);
    }
  };
  const handleEdit = (item) => {
    setFormData(item);
    setSearchTerm(item.part_no ? `${item.part_no} - ${item.part_desc || ""}` : "");
    // Ensure both PartCode variants are present and setup display value
    const fullPartCodeDisplay = `${item.op_no || item.OPNo || ""} | ${item.PartCode || item.part_code || ""} | ${item.operation || ""}`;
    setFormData(prev => ({
      ...prev,
      PartCode: item.PartCode || item.part_code || "",
      part_code: item.part_code || item.PartCode || "",
      PartCodeDisplay: fullPartCodeDisplay !== " |  | " ? fullPartCodeDisplay : ""
    }));
    setEditId(item.id);
  };

  const handleDelete = async (id) => {

    await deleteCycleTimeData(id);
    toast.success("Deleted successfully");
    loadCycleTime();

  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [bomItemsList, setBomItemsList] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);


  let searchTimeout = null;

  const fetchBomItemsList = async (query) => {
    try {
      const data = await fetchBomItems();
      const results = [];

      // Handle object-based response (DRF often returns objects if not simple lists)
      // The API seems to return an object where keys are names and values have bom_items
      Object.keys(data).forEach(key => {
        const item = data[key];
        if (item.part_no?.toLowerCase().includes(query.toLowerCase()) ||
          item.Name_Description?.toLowerCase().includes(query.toLowerCase())) {

          item.bom_items?.forEach(bom => {
            results.push({
              part_no: item.part_no,
              part_desc: item.Name_Description,
              op_no: bom.OPNo,
              part_code: bom.BomPartCode, // User request: bom code should be in part code
              operation: bom.Operation
            });
          });
        }
      });

      setSearchResults(results.slice(0, 50));
    } catch (error) {
      console.error("Error fetching BOM items:", error);
    }
  };

  const fetchItemByPartNo = (value) => {
    clearTimeout(searchTimeout);

    if (!value || value.length < 2) {
      setBomItemsList([]);
      setShowDropdown(false);
      return;
    }

    searchTimeout = setTimeout(async () => {
      try {
        const data = await fetchBomItems();

        if (data && typeof data === "object") {
          const searchLower = value.toLowerCase();
          const matchedItems = Object.keys(data)
            .filter((key) => {
              const item = data[key];
              return (
                (item.part_no && item.part_no.toLowerCase().includes(searchLower)) ||
                (item.Name_Description && item.Name_Description.toLowerCase().includes(searchLower)) ||
                (item.Part_Code && item.Part_Code.toLowerCase().includes(searchLower))
              );
            })
            .map((key) => {
              const item = data[key];
              return {
                part_no: item.part_no,
                Name_Description: item.Name_Description,
                Part_Code: item.Part_Code,
                bom_items: (item.bom_items || []).map(bom => ({
                  ...bom,
                  op_no: bom.OPNo,
                  part_code: bom.PartCode,
                  operation: bom.Operation
                }))
              };
            });

          setBomItemsList(matchedItems);
          setShowDropdown(matchedItems.length > 0);
        }
      } catch (err) {
        console.error("Error fetching BOM:", err);
      }
    }, 300);
  };






  return (
    <div className="erp-page">
      <ToastContainer />
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="AddCycletimermaster container-fluid py-3 overflow-hidden">
                  <div className="">
                    <div className="AddCycletime-header text-start">
                      <div className="row align-items-center">
                        <div className="col-md-5">
                          <h5 className="header-title mb-0" style={{ fontSize: "22px", fontWeight: "700", color: "blue" }}>Cycle Time Master</h5>
                        </div>
                        <div className="col-md-4 text-md-end text-start mt-3 mt-md-0">
                          <p style={{ color: "green" }}>**Note: Please Enter Time in Seconds</p>
                        </div>
                        <div className="col-md-3 text-md-end text-start mt-2 mt-md-0">
                          <button className="vndrbtn me-2" onClick={handleAddNewCycleTime}>
                            Cycle Time Master List
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="AddCycletime-Main mt-2">
                    <div className="container-fluid">
                      <div className="row text-start centerselect">
                        <div className="col-md-1 col-sm-3 mb-3 mb-sm-0">
                          <label htmlFor="selectPlant" className="col-form-label">
                            Item Search
                          </label>
                        </div>
                        <div className="col-md-3 col-sm-9 mb-3 mb-sm-0" style={{ position: "relative" }}>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={searchTerm}
                            onChange={(e) => {
                              const value = e.target.value;
                              setSearchTerm(value);
                              // Sync with formData
                              setFormData(prev => ({
                                ...prev,
                                part_no: value,
                                part_desc: prev.part_no === value ? prev.part_desc : "",
                                part_code: prev.part_no === value ? prev.part_code : ""
                              }));
                              fetchItemByPartNo(value);
                            }}
                            placeholder="Search Item No"
                          />

                          {showDropdown && (
                            <ul className="list-group position-absolute z-3" style={{ maxHeight: "250px", overflowY: "auto", width: "100%", left: "0", top: "100%" }}>
                              {bomItemsList.length > 0
                                ? bomItemsList.map((bomItem, index) => (
                                  <li
                                    key={index}
                                    className="list-group-item list-group-item-action py-1 px-2"
                                    onClick={() => {
                                      setSearchTerm(`${bomItem.part_no} - ${bomItem.Name_Description}`);
                                      setFormData((prev) => ({
                                        ...prev,
                                        part_no: bomItem.part_no,
                                        part_desc: bomItem.Name_Description,
                                        part_code: bomItem.Part_Code, // User request field
                                        PartCode: bomItem.Part_Code, // Sync with select
                                      }));
                                      // Update searchResults with mapped BomPartCode
                                      setSearchResults(
                                        bomItem.bom_items.map((bom) => ({
                                          part_no: bomItem.part_no,
                                          part_desc: bomItem.Name_Description,
                                          op_no: bom.OPNo || bom.op_no,
                                          part_code: bom.PartCode || bom.part_code,
                                          operation: bom.Operation || bom.operation,
                                        }))
                                      );
                                      setShowDropdown(false);
                                    }}
                                    style={{ cursor: "pointer", fontSize: "13px" }}
                                  >
                                    <div className="d-flex align-items-center">
                                      <span className="fw-bold">{bomItem.part_no}</span>
                                      <span className="mx-1">-</span>
                                      <span className="text-muted text-truncate" style={{ maxWidth: "200px" }}>
                                        {bomItem.Name_Description}
                                      </span>
                                    </div>
                                  </li>
                                ))
                                : (
                                  <li className="list-group-item text-muted">No items found</li>
                                )}
                            </ul>
                          )}

                        </div>

                        <div className="col-md-1 col-sm-12 text-sm-start text-md-start">
                          <button className="vndrbtn mt-1">Search</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="AddCycletime-Main mt-2">
                    <div className="container-fluid">
                      <form onSubmit={handleSubmit}>
                        <div className="row text-start mb-3">
                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <label htmlFor="Plant" className="form-label">Plant</label>
                            <select className="form-select form-select-sm" id="Plant" name="Plant" value={formData.Plant} onChange={handleChange}>
                              <option value="">Select Plant</option>
                              {[...new Set(workCenters.map(wc => wc.Plant))].filter(Boolean).sort().map((plant, index) => (
                                <option key={index} value={plant}>{plant}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <label htmlFor="PartCode" className="form-label">Part Code</label>
                            <select className="form-select form-select-sm" id="PartCode" name="PartCode" value={formData.PartCodeDisplay || formData.PartCode || formData.part_code || ""} onChange={handleChange}>
                              <option value="">Select Part Code</option>
                              {/* Always include current selected value if it exists but is not in searchResults */}
                              {(formData.PartCodeDisplay || formData.PartCode || formData.part_code) &&
                                !searchResults.some(item => `${item.op_no || ""} | ${item.part_code || ""} | ${item.operation || ""}` === (formData.PartCodeDisplay || formData.PartCode || formData.part_code)) && (
                                  <option value={formData.PartCodeDisplay || formData.PartCode || formData.part_code}>
                                    {formData.PartCodeDisplay || formData.PartCode || formData.part_code}
                                  </option>
                                )
                              }
                              {Array.isArray(searchResults) && searchResults.map((item, index) => {
                                const fullVal = `${item.op_no || ""} | ${item.part_code || ""} | ${item.operation || ""}`;
                                return (
                                  <option key={index} value={fullVal}>{fullVal}</option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <label htmlFor="MachineType" className="form-label">Machine Type</label>
                            <select className="form-select form-select-sm" id="MachineType" name="MachineType" value={formData.MachineType} onChange={handleChange}>
                              <option value="">Select Machine Type</option>
                              {Array.isArray(workCenters) && [...new Set(workCenters.map(wc => wc.WorkCenterName))].filter(Boolean).sort().map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <label htmlFor="Machine" className="form-label">Machine</label>
                            <select className="form-select form-select-sm" id="Machine" name="Machine" value={formData.Machine} onChange={handleChange}>
                              <option value="">Select Machine</option>
                              {workCenters.filter(wc => wc.WorkCenterName === formData.MachineType).map((wc, index) => (
                                <option key={index} value={wc.WorkCenterType}>{wc.WorkCenterType}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <label htmlFor="OPTime" className="form-label">Op Time<span className="text-danger">*</span></label>
                            <input type="text" className="form-control form-control-sm" id="OPTime" name="OPTime" value={formData.OPTime} onChange={handleChange} />
                          </div>
                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <label htmlFor="Load_Unload_Time" className="form-label">Load/Unload Time<span className="text-danger">*</span></label>
                            <input type="text" className="form-control form-control-sm" id="Load_Unload_Time" name="Load_Unload_Time" value={formData.Load_Unload_Time} onChange={handleChange} />
                          </div>
                        </div>

                        <div className="row text-start align-items-end">
                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <label htmlFor="MO_Time" className="form-label">Mo Time<span className="text-danger">*</span></label>
                            <input type="text" className="form-control form-control-sm" id="MO_Time" name="MO_Time" value={formData.MO_Time} onChange={handleChange} />
                          </div>
                          <div className="col-md-2 col-sm-6 mb-3 mb-sm-0">
                            <label htmlFor="Total_Time" className="form-label">Total Time<span className="text-danger">*</span></label>
                            <input type="text" className="form-control form-control-sm" id="Total_Time" name="Total_Time" value={formData.Total_Time} onChange={handleChange} />
                          </div>
                          <div className="col-md-4 col-sm-12 mb-3 mb-sm-0 d-flex align-items-center">
                            <div className="form-check me-3 mt-4">
                              <input type="checkbox" className="form-check-input" id="Time_in_Minutes_Check" name="Time_in_Minutes_Check" />
                              <label className="form-check-label" htmlFor="Time_in_Minutes_Check">Time in Minutes</label>
                            </div>
                            <div className="flex-grow-1 mt-4">
                              <input type="text" className="form-control form-control-sm" id="Time_in_Minutes" name="Time_in_Minutes" value={formData.Time_in_Minutes} onChange={handleChange} />
                            </div>
                          </div>
                          <div className="col-md-2 col-sm-6 mt-4">
                            <button type="submit" className="vndrbtn me-2" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Add"}</button>
                            <button type="button" className="vndrbtn" onClick={handleClear}>Clear</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="AddCycletime-table mt-2">
                    <div className="container-fluid">
                      <div className="row text-start">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 2 }}>
            <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                              <TableHead>
                                <TableRow>
                                  <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>#</TableCell>
                                  <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Part No</TableCell>
                                  <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Part Description</TableCell>
                                  <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Plant</TableCell>
                                  <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Part Code</TableCell>
                                  <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Machine Type</TableCell>
                                  <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Machine</TableCell>
                                  <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Op Time</TableCell>
                                  <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Load/Unload</TableCell>
                                  <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>MO Time</TableCell>
                                  <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Edit</TableCell>
                                  <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Delete</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {cycleTimeList.length > 0 ? cycleTimeList.map((item, index) => (
                                  <TableRow key={item.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{index + 1}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.part_no}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.part_desc}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.Plant}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                      {item.PartCode && item.PartCode.includes(" | ")
                                        ? item.PartCode
                                        : `${item.op_no || item.OPNo || ""} | ${item.PartCode || item.part_code || ""} | ${item.operation || ""}`}
                                    </TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.MachineType}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.Machine}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.OPTime}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.Load_Unload_Time}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{item.MO_Time}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><button type="btn" style={{ "border": "none" }} onClick={() => handleEdit(item)}><i className="fas fa-edit"></i></button></TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}><button type="btn" style={{ "border": "none" }} onClick={() => handleDelete(item.id)}><i className="fas fa-trash"></i></button></TableCell>
                                  </TableRow>
                                )) : (
                                  <TableRow>
                                    <TableCell colSpan={12} sx={{ textAlign: 'center', py: 3, color: '#64748b' }}>No Data Found!</TableCell>
                                    {/* Original colSpan was 14 when adding 2 more, now it is 12: 10 + 2 = 12 */}
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
          </TableContainer>

                          </div>
                        </div>
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
  )
}

export default AddCycleTime
