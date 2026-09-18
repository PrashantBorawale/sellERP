import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./ReworkProduction.css";
import {
  fetchShifts,
  fetchContractors,
  fetchOperators,
  fetchUnitMachines,
  fetchSupervisors,
  postProductionEntry,
getNextReworkNo
} from "../../Service/Production.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ReworkProduction = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

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

  const [formData, setFormData] = useState({
    ReworkNo: "",
    ReworkDate: "",
    Reworktime: "",
    shift: "",
    contractor: "",
    Supervisor: "",
    operator: "",
    ItemCode: "",
    PartCode: "",
    HeatNo: "",
    unit_machine: "",
    ProdTime: "",
    ReworktoOk: "",
    ProductionHours: "",
    IdleHours: "",
    ActualHours: "",
    shift_from: "",
    shift_till: "",
    break_from: "",
    break_till: "",
    total: "",
    op_time: "",
    lu_time: "",
    mo_time: "",
    total_time: "",
    target_qty: "",
    target_qty_hours: "",
    ReasonForRework: "",
  });

  const [idleTime, setIdleTime] = useState({
    idle_reason: "",
    from_time: "",
    to_time: "",
    total_time: "",
    supervisor_operator: "",
    setting_part: "",
    remark: "",
  });

  const [idleTimeRows, setIdleTimeRows] = useState([]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  // Handle idle time input change
  const handleIdleTimeChange = (e) => {
    const { name, value } = e.target;
    setIdleTime((prev) => ({ ...prev, [name]: value }));
  };

  // Add new idle time entry to the table
  const addIdleTimeRow = () => {
    if (!idleTime.idle_reason || !idleTime.from_time || !idleTime.to_time) {
      toast.error("Please fill in all required fields!");
      return;
    }

    setIdleTimeRows([...idleTimeRows, idleTime]);

    // Reset input fields
    setIdleTime({
      idle_reason: "",
      from_time: "",
      to_time: "",
      total_time: "",
      supervisor_operator: "",
      setting_part: "",
      remark: "",
    });
  };

  // Delete idle time entry
  const deleteIdleTimeRow = (index) => {
    setIdleTimeRows(idleTimeRows.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchReworkNo = async () => {
      const year = localStorage.getItem("Shortyear");
      console.log("Fetching rework number for year:", year); // Debugging
  
      if (year) {
        const nextReworkNo = await getNextReworkNo(year);
        console.log("Fetched Rework Number:", nextReworkNo); // Debugging
  
        if (nextReworkNo) {
          setFormData((prev) => ({ ...prev, ReworkNo: nextReworkNo }));
        } else {
          console.warn("No rework number returned from API");
        }
      }
    };
  
    fetchReworkNo();
  }, []);
  

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure required fields are not empty
   
    const payload = {
      ...formData,
      ReworkDate: formData.ReworkDate || new Date().toISOString().split("T")[0], // Default to today
      Reworktime: formData.Reworktime || "00:00", // Default to midnight
      shift: formData.shift || "Not Assigned", // Default shift
      IdleHours: formData.IdleHours || "0", // Default idle hours
      MachineIdleTime_Detail_Enter: idleTimeRows, // Attach idle time data
    };
  
    console.log("Submitting Payload:", payload); // Debugging
  
    try {
      const response = await postProductionEntry(payload);
      console.log("API Response:", response);
      toast.success("Data saved successfully!");
  
       // Reset form data after successful save
    setFormData({
      ReworkNo: "",  // Rework No ko blank rakhein, new fetch hoga
      ReworkDate: "",
      Reworktime: "",
      shift: "",
      contractor: "",
      Supervisor: "",
      operator: "",
      ItemCode: "",
      PartCode: "",
      HeatNo: "",
      unit_machine: "",
      ProdTime: "",
      ReworktoOk: "",
      ProductionHours: "",
      IdleHours: "",
      ActualHours: "",
      shift_from: "",
      shift_till: "",
      break_from: "",
      break_till: "",
      total: "",
      op_time: "",
      lu_time: "",
      mo_time: "",
      total_time: "",
      target_qty: "",
      target_qty_hours: "",
      ReasonForRework: "",
    });

    setIdleTimeRows([]); // Idle time rows bhi clear karna hai

    
      // Save hone ke baad naye Rework Number ko fetch karein
      const year = localStorage.getItem("Shortyear");
      if (year) {
        const nextReworkNo = await getNextReworkNo(year);
        console.log("Fetched New Rework Number:", nextReworkNo);
  
        if (nextReworkNo) {
          setFormData((prev) => ({ ...prev, ReworkNo: nextReworkNo }));
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data.");
    }
  };
  
  // shift
  const [shifts, setShifts] = useState([]);
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [searchTermShift, setSearchTermShift] = useState("");
  const [dropdownVisibleShift, setDropdownVisibleShift] = useState(false);
  const [, setSelectedShift] = useState(null);

  useEffect(() => {
    const loadShifts = async () => {
      const data = await fetchShifts();
      setShifts(data);
      setFilteredShifts(data);
    };
    loadShifts();
  }, []);
  const handleSearchChangeShift = (event) => {
    const value = event.target.value;
    setSearchTermShift(value);
    setDropdownVisibleShift(true);

    const filtered = shifts.filter(
      (shift) =>
        shift.Shift_Name.toLowerCase().includes(value.toLowerCase()) ||
        shift.Shift_From.toLowerCase().includes(value.toLowerCase()) ||
        shift.Shift_Till.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredShifts(filtered);
  };

  const handleSelectShift = (shift) => {
    setSearchTermShift(
      `${shift.Shift_Name} From: ${shift.Shift_From} To: ${shift.Shift_Till}`
    );
    setSelectedShift(shift);
    setFormData((prev) => ({ ...prev, shift: shift.Shift_Name }));
    setDropdownVisibleShift(false);

    // Update form data with the selected shift's information
    setFormData({
      shift_from: shift.Shift_From,
      shift_to: shift.Shift_Till,
      break_from: shift.Break_Name, // Assuming Break_Name is what you want here
      break_to: shift.Break_Till, // Assuming Break_Till is what you want here
      break_total: shift.Break_Time,
      shift_time: shift.Total_Hours, // Assuming Total_Hours as shift_time
      prod_qty: "", // Add any other fields if necessary
      avail_time: "",
      cycle_time: "",
      op_time: "",
      lu_time: "",
      mo_time: "",
      total_time: "",
    });
  };

  // Contractoer
  const [contractors, setContractors] = useState([]);
  const [filteredContractors, setFilteredContractors] = useState([]);
  const [searchTermContractor, setSearchTermContractor] = useState("");
  const [dropdownVisibleContractor, setDropdownVisibleContractor] =
    useState(false);
  useEffect(() => {
    const loadContractors = async () => {
      const data = await fetchContractors();
      setContractors(data);
      setFilteredContractors(data);
    };
    loadContractors();
  }, []);
  const handleSearchChangeContractor = (event) => {
    const value = event.target.value;
    setSearchTermContractor(value);
    setDropdownVisibleContractor(true);

    const filtered = contractors.filter((contractor) =>
      contractor.ContractorName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredContractors(filtered);
  };

  const handleSelectContractor = (contractor) => {
    setSearchTermContractor(contractor.ContractorName);
    setFormData((prev) => ({ ...prev, contractor: contractor.ContractorName }));
    setDropdownVisibleContractor(false);
  };

  // Operator
  const [operators, setOperators] = useState([]);
  const [filteredOperators, setFilteredOperators] = useState([]);
  const [searchTermOperator, setSearchTermOperator] = useState("");
  const [dropdownVisibleOperator, setDropdownVisibleOperator] = useState(false);

  useEffect(() => {
    const loadOperators = async () => {
      const data = await fetchOperators();
      setOperators(data);
      setFilteredOperators(data);
    };
    loadOperators();
  }, []);

  const handleSearchChangeOperator = (event) => {
    const value = event.target.value;
    setSearchTermOperator(value);
    setDropdownVisibleOperator(true);

    const filtered = operators.filter(
      (operator) =>
        operator.Name.toLowerCase().includes(value.toLowerCase()) ||
        operator.Code.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOperators(filtered);
  };

  const handleSelectOperator = (operator) => {
    setSearchTermOperator(`${operator.Name} (${operator.Code})`);
    setFormData((prev) => ({ ...prev, operator: operator.Code }));
    setDropdownVisibleOperator(false);
  };

  // supervissor

  const [supervisors, setSupervisors] = useState([]);
  const [filteredSupervisors, setFilteredSupervisors] = useState([]);
  const [searchTermSupervisor, setSearchTermSupervisor] = useState("");
  const [dropdownVisibleSupervisor, setDropdownVisibleSupervisor] =
    useState(false);
  useEffect(() => {
    const loadSupervisors = async () => {
      const data = await fetchSupervisors();
      setSupervisors(data);
      setFilteredSupervisors(data);
    };
    loadSupervisors();
  }, []);

  const handleSearchChangeSupervisor = (event) => {
    const value = event.target.value;
    setSearchTermSupervisor(value);
    setDropdownVisibleSupervisor(true);

    const filtered = supervisors.filter(
      (supervisor) =>
        supervisor.Name.toLowerCase().includes(value.toLowerCase()) ||
        supervisor.Code.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSupervisors(filtered);
  };

  const handleSelectSupervisor = (supervisor) => {
    setSearchTermSupervisor(`${supervisor.Name} (${supervisor.Code})`);
    setFormData((prev) => ({ ...prev, Supervisor: supervisor.Name }));
    setDropdownVisibleSupervisor(false);
  };
  // Unit Machine
  const [unitMachines, setUnitMachines] = useState([]);
  const [filteredUnitMachines, setFilteredUnitMachines] = useState([]);
  const [searchTermUnitMachine, setSearchTermUnitMachine] = useState("");
  const [dropdownVisibleUnitMachine, setDropdownVisibleUnitMachine] =
    useState(false);

  useEffect(() => {
    const loadUnitMachines = async () => {
      const data = await fetchUnitMachines();
      setUnitMachines(data);
      setFilteredUnitMachines(data);
    };
    loadUnitMachines();
  }, []);

  const handleSearchChangeUnitMachine = (event) => {
    const value = event.target.value;
    setSearchTermUnitMachine(value);
    setDropdownVisibleUnitMachine(true);

    const filtered = unitMachines.filter(
      (unit) =>
        unit.WorkCenterName.toLowerCase().includes(value.toLowerCase()) ||
        unit.WorkCenterCode.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUnitMachines(filtered);
  };

  const handleSelectUnitMachine = (unit) => {
    setSearchTermUnitMachine(`${unit.WorkCenterName} (${unit.WorkCenterCode})`);
    setFormData((prev) => ({ ...prev, unit_machine: unit.WorkCenterCode }));
    setDropdownVisibleUnitMachine(false);
  };

  return (
    <div className="ReworkProductionMaster">
      <ToastContainer/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="ReworkProduction mt-5">
                  <div className="ReworkProduction-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">Rework Production</h5>
                      </div>
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="ReworkProduction-Main">
                    <form
                      className="form-section"
                      onSubmit={handleSubmit}
                      autoComplete="off"
                    >
                      <div className="row text-start">
                        <div className="col-md-3">
                          <label>Rework No:</label>
                          <input
                    type="text"
                    name="ReworkNo"
                    className="form-control"
                    value={formData.ReworkNo}
                    readOnly // Prevent manual input
                  />
                        </div>
                        <div className="col-md-3">
                          <label>Rework Date Time:</label>
                          <div className="d-flex">
                            <input
                              type="date"
                              name="ReworkDate"
                              value={formData.ReworkDate || ""}
                              onChange={handleChange}
                              className="form-control"
                            />

                            <input
                              type="time"
                              name="Reworktime"
                              value={formData.Reworktime || ""}
                              onChange={handleChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label>Shift:</label>
                          <div className="col-8 position-relative">
                            <input
                              id="shift"
                              name="shift"
                              className="form-control"
                              placeholder="Search shift by name or time"
                              value={searchTermShift}
                              onChange={handleSearchChangeShift}
                              onFocus={() => setDropdownVisibleShift(true)} // Show dropdown on focus
                            />
                            {dropdownVisibleShift && (
                              <ul
                                className="dropdown-menu show mt-2"
                                style={{
                                  width: "100%",
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                  zIndex: 1000,
                                }}
                              >
                                {filteredShifts.length > 0 ? (
                                  filteredShifts.map((shift, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item"
                                      onClick={() => handleSelectShift(shift)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      {`${shift.Shift_Name} From: ${shift.Shift_From} To: ${shift.Shift_Till}`}
                                    </li>
                                  ))
                                ) : (
                                  <li className="dropdown-item">
                                    No results found
                                  </li>
                                )}
                              </ul>
                            )}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label>Contractor:</label>
                          <div className="col-8 position-relative">
                            <input
                              id="contractor"
                              className="form-control"
                              placeholder="Search by contractor name"
                              value={searchTermContractor}
                              onChange={handleSearchChangeContractor}
                              onFocus={() => setDropdownVisibleContractor(true)} // Show dropdown on focus
                            />
                            {dropdownVisibleContractor && (
                              <ul
                                className="dropdown-menu show mt-2"
                                style={{
                                  width: "100%",
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                  zIndex: 1000,
                                }}
                              >
                                {filteredContractors.length > 0 ? (
                                  filteredContractors.map(
                                    (contractor, index) => (
                                      <li
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleSelectContractor(contractor)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        {contractor.ContractorName}
                                      </li>
                                    )
                                  )
                                ) : (
                                  <li className="dropdown-item">
                                    No results found
                                  </li>
                                )}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3 text-start">
                        <div className="col-md-3">
                          <label>Supervisor:</label>
                          <div className="col-8 position-relative">
                            <input
                              id="supervisor"
                              name="Supervisor"
                              className="form-control"
                              placeholder="Search by name or code"
                              value={searchTermSupervisor}
                              onChange={handleSearchChangeSupervisor}
                              onFocus={() => setDropdownVisibleSupervisor(true)} // Show dropdown on focus
                            />
                            {dropdownVisibleSupervisor && (
                              <ul
                                className="dropdown-menu show mt-2"
                                style={{
                                  width: "100%",
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                  zIndex: 1000,
                                }}
                              >
                                {filteredSupervisors.length > 0 ? (
                                  filteredSupervisors.map(
                                    (supervisor, index) => (
                                      <li
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleSelectSupervisor(supervisor)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        {`${supervisor.Name} (${supervisor.Code})`}
                                      </li>
                                    )
                                  )
                                ) : (
                                  <li className="dropdown-item">
                                    No results found
                                  </li>
                                )}
                              </ul>
                            )}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label>Operator:</label>
                          <div className="col-8 position-relative">
                            <input
                              id="operator"
                              name="operator"
                              className="form-control"
                              placeholder="Search by name or code"
                              value={searchTermOperator}
                              onChange={handleSearchChangeOperator}
                              onFocus={() => setDropdownVisibleOperator(true)} // Show dropdown on focus
                            />
                            {dropdownVisibleOperator && (
                              <ul
                                className="dropdown-menu show mt-2"
                                style={{
                                  width: "100%",
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                  zIndex: 1000,
                                }}
                              >
                                {filteredOperators.length > 0 ? (
                                  filteredOperators.map((operator, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item"
                                      onClick={() =>
                                        handleSelectOperator(operator)
                                      }
                                      style={{ cursor: "pointer" }}
                                    >
                                      {`${operator.Name} (${operator.Code})`}
                                    </li>
                                  ))
                                ) : (
                                  <li className="dropdown-item">
                                    No results found
                                  </li>
                                )}
                              </ul>
                            )}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label>Item Code:</label>
                          <input
                            type="text"
                            name="ItemCode"
                            className="form-control"
                            value={formData.ItemCode}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label>Part Code:</label>
                          <input
                            type="text"
                            name="PartCode"
                            className="form-control"
                            value={formData.PartCode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row mt-3 text-start">
                        <div className="col-md-3">
                          <label>Heat No:</label>
                          <select
                            className="form-control"
                            name="HeatNo"
                            value={formData.HeatNo}
                            onChange={handleChange}
                          >
                            <option>Select</option>
                            <option value="one">One</option>
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label>Unit / Machine:</label>
                          <div className="col-8 position-relative">
                            <input
                              id="unit-machine"
                              className="form-control"
                              placeholder="Search by name or code"
                              value={searchTermUnitMachine}
                              onChange={handleSearchChangeUnitMachine}
                              onFocus={() =>
                                setDropdownVisibleUnitMachine(true)
                              } // Show dropdown on focus
                            />
                            {dropdownVisibleUnitMachine && (
                              <ul
                                className="dropdown-menu show mt-2"
                                style={{
                                  width: "100%",
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                  zIndex: 1000,
                                }}
                              >
                                {filteredUnitMachines.length > 0 ? (
                                  filteredUnitMachines.map((unit, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item"
                                      onClick={() =>
                                        handleSelectUnitMachine(unit)
                                      }
                                      style={{ cursor: "pointer" }}
                                    >
                                      {`${unit.WorkCenterName} (${unit.WorkCenterCode})`}
                                    </li>
                                  ))
                                ) : (
                                  <li className="dropdown-item">
                                    No results found
                                  </li>
                                )}
                              </ul>
                            )}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label>Prod Time:</label>
                          <input
                            type="time"
                            name="ProdTime"
                            className="form-control"
                            value={formData.ProdTime}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label>Rework To Ok:</label>
                          <input
                            type="text"
                            name="ReworktoOk"
                            className="form-control"
                            value={formData.ReworktoOk}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Table Section */}
                      <div className="row mt-5 text-start">
                        <div className="col-md-1">
                          <label>Idle Reason</label>
                          <input
                            type="text"
                            name="idle_reason"
                            className="form-control"
                            value={idleTime.idle_reason}
                            onChange={handleIdleTimeChange}
                          />
                        </div>
                        <div className="col-md-1">
                          <label>From Time</label>
                          <input
                            type="time"
                            name="from_time"
                            className="form-control"
                            value={idleTime.from_time}
                            onChange={handleIdleTimeChange}
                          />
                        </div>
                        <div className="col-md-1">
                          <label>To Time</label>
                          <input
                            type="time"
                            name="to_time"
                            className="form-control"
                            value={idleTime.to_time}
                            onChange={handleIdleTimeChange}
                          />
                        </div>
                        <div className="col-md-1">
                          <label>Total</label>
                          <input
                            type="time"
                            name="total_time"
                            className="form-control"
                            value={idleTime.total_time}
                            onChange={handleIdleTimeChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <label>Supervisor/Operator</label>
                          <input
                            type="text"
                            name="supervisor_operator"
                            className="form-control"
                            value={idleTime.supervisor_operator}
                            onChange={handleIdleTimeChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <label>Setting Part</label>
                          <input
                            type="text"
                            name="setting_part"
                            className="form-control"
                            value={idleTime.setting_part}
                            onChange={handleIdleTimeChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <label>Remark</label>
                          <input
                            type="text"
                            name="remark"
                            className="form-control"
                            value={idleTime.remark}
                            onChange={handleIdleTimeChange}
                          />
                        </div>
                        <div className="col-md-2 d-flex align-items-end">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={addIdleTimeRow}
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      <div className="table-section mt-4">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Idle Reason</th>
                                <th>From Time</th>
                                <th>To Time</th>
                                <th>Total Time</th>
                                <th>Supervisor/Operator</th>
                                <th>Setting Part</th>
                                <th>Remark</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {idleTimeRows.map((row, index) => (
                                <tr key={index}>
                                  <td>{row.idle_reason}</td>
                                  <td>{row.from_time}</td>
                                  <td>{row.to_time}</td>
                                  <td>{row.total_time}</td>
                                  <td>{row.supervisor_operator}</td>
                                  <td>{row.setting_part}</td>
                                  <td>{row.remark}</td>
                                  <td>
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => deleteIdleTimeRow(index)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Production Hours</th>
                              <th>Idle Hours</th>
                              <th>Actual Hours</th>
                              <th>Shift</th>
                              <th>Break</th>
                              <th>Total</th>
                              <th>Cycle Time</th>
                              <th>Target Quantity</th>
                              <th>Reason For Rework</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <input
                                  type="time"
                                  className="form-control"
                                  name="ProductionHours"
                                  value={formData.ProductionHours}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="time"
                                  className="form-control"
                                  name="MachineIdleTime_Detail_Enter"
                                  value={formData.MachineIdleTime_Detail_Enter}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="time"
                                  className="form-control"
                                  name="ActualHours"
                                  value={formData.ActualHours}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <div className="d-flex">
                                  <input
                                    type="time"
                                    className="form-control"
                                    name="shift_from"
                                    value={formData.shift_from}
                                    onChange={handleChange}
                                    placeholder="From"
                                  />
                                  <input
                                    type="time"
                                    className="form-control"
                                    name="shift_till"
                                    value={formData.shift_till}
                                    onChange={handleChange}
                                    placeholder="Till"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <input
                                    type="time"
                                    className="form-control"
                                    name="break_from"
                                    value={formData.break_from}
                                    onChange={handleChange}
                                    placeholder="From"
                                  />
                                  <input
                                    type="time"
                                    className="form-control"
                                    name="break_till"
                                    value={formData.break_till}
                                    onChange={handleChange}
                                    placeholder="Till"
                                  />
                                </div>{" "}
                              </td>
                              <td>
                                <input
                                  type="time"
                                  className="form-control"
                                  name="total"
                                  value={formData.total}
                                  onChange={handleChange}
                                  placeholder="Total"
                                />
                              </td>
                              <td>
                                <div className="d-flex">
                                  <input
                                    type="time"
                                    className="form-control"
                                    name="op_time"
                                    value={formData.op_time}
                                    onChange={handleChange}
                                    placeholder="00:00"
                                  />
                                  <input
                                    type="time"
                                    className="form-control"
                                    name="lu_time"
                                    value={formData.lu_time}
                                    onChange={handleChange}
                                    placeholder="00:00"
                                  />
                                  <input
                                    type="time"
                                    className="form-control"
                                    name="mo_time"
                                    value={formData.mo_time}
                                    onChange={handleChange}
                                    placeholder="00:00"
                                  />
                                  <input
                                    type="time"
                                    className="form-control"
                                    name="total_time"
                                    value={formData.total_time}
                                    onChange={handleChange}
                                    placeholder="00:00"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="target_qty"
                                    value={formData.target_qty}
                                    onChange={handleChange}
                                    placeholder="Operator Name"
                                  />
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="target_qty_hours"
                                    value={formData.target_qty_hours}
                                    onChange={handleChange}
                                    placeholder="Operator Name"
                                  />
                                </div>{" "}
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="ReasonForRework"
                                  value={formData.ReasonForRework}
                                  onChange={handleChange}
                                  placeholder="Setting Part"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="form-actions text-end mt-4">
                        <button className="btn" type="submit">
                          Save
                        </button>
                      </div>
                    </form>
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

export default ReworkProduction;
