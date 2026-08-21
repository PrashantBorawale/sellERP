import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./NewMrn.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  getNewMRN,
  submitNewMRN,
  searchMRNItem,
  searchEmployeeDept,
} from "../../Service/StoreApi.jsx";
import { toast, ToastContainer } from "react-toastify"; // Make sure to install react-toastify
import "react-toastify/dist/ReactToastify.css";
import { fetchUnitMachines } from "../../Service/Production.jsx";
const NewMrn = () => {
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
    Plant: "",
    Series: "",
    MRN_no: "",
    General: false,
    Work_order: false,
    ItemCode: "",
    Description: "",
    Qty_1: "",
    QtyUnit: "",
    Unit: "",
    Type: "",
    Machine: "",
    Employee: "",
    Dept: "",
    Remark_1: "",
    MRN_date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    MRN_time: new Date().toTimeString().split(" ")[0], // Current time in HH:MM:SS format
    Remark_2: "",
  });

  // State for table data
  const [NewMRNTable, setNewMRNTable] = useState([]);

  // State for MRN number
  const [MrnNo, setMrnNo] = useState("");

  // State for series
  const [series, setSeries] = useState("");

  // State to track if we're editing an existing row
  const [editIndex, setEditIndex] = useState(-1);

  // State for form submission status
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Fetch MRN number on component mount
  useEffect(() => {
    const fetchMRNNumber = async () => {
      const currentYear = new Date().getFullYear();
      const mrnNumber = await getNewMRN(currentYear);
      if (mrnNumber) {
        setMrnNo(mrnNumber);
        setFormData((prev) => ({ ...prev, MRN_no: mrnNumber }));
      }
    };

    fetchMRNNumber();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkboxes
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle series change
  const handleSeriesChange = (e) => {
    const value = e.target.value;
    setSeries(value);
    setFormData((prev) => ({ ...prev, Series: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;

    if (id === "poGrnCheckbox") {
      setFormData((prev) => ({ ...prev, General: checked }));
    } else if (id === "directGrnCheckbox") {
      setFormData((prev) => ({ ...prev, Work_order: checked }));
    }
  };

  // Add item to table
  const handleAddToTable = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.ItemCode || !formData.Description || !formData.Qty_1) {
      alert("Please fill in Item Code, Description, and Quantity fields");
      return;
    }

    // Create new item for table
    const newItem = {
      ItemCode: formData.ItemCode,
      Description: formData.Description,
      QtyUnit: formData.QtyUnit,
      Qty_1: formData.Qty_1,
      Unit: formData.Unit,
      Type: formData.Type,
      Machine: formData.Machine,
      Employee: formData.Employee,
      Dept: formData.Dept,
      Remark_1: formData.Remark_1,
    };

    // If editing existing row, update it
    if (editIndex >= 0) {
      const updatedTable = [...NewMRNTable];
      updatedTable[editIndex] = newItem;
      setNewMRNTable(updatedTable);
      setEditIndex(-1); // Reset edit index
    } else {
      // Otherwise add new row
      setNewMRNTable((prev) => [...prev, newItem]);
    }

    // Clear form fields
    setFormData((prev) => ({
      ...prev,
      ItemCode: "",
      Description: "",
      Qty_1: "",
      QtyUnit: "",
      Unit: "",
      Type: "",
      Machine: "",
      Employee: "",
      Dept: "",
      Remark_1: "",
    }));
  };

  // Edit table row
  const handleEdit = (item, index) => {
    // Set form data with selected row data
    setFormData((prev) => ({
      ...prev,
      ItemCode: item.ItemCode,
      Description: item.Description,
      Qty_1: item.Qty_1,
      QtyUnit: item.QtyUnit,
      Unit: item.Unit,
      Type: item.Type,
      Machine: item.Machine,
      Employee: item.Employee,
      Dept: item.Dept,
      Remark_1: item.Remark_1,
    }));

    // Set edit index
    setEditIndex(index);
  };

  // Delete table row
  const handleDelete = (index) => {
    const updatedTable = [...NewMRNTable];
    updatedTable.splice(index, 1);
    setNewMRNTable(updatedTable);

    // If currently editing this row, reset edit state
    if (editIndex === index) {
      setEditIndex(-1);
      setFormData((prev) => ({
        ...prev,
        ItemCode: "",
        Description: "",
        Qty_1: "",
        QtyUnit: "",
        Unit: "",
        Type: "",
        Machine: "",
        Employee: "",
        Dept: "",
        Remark_1: "",
      }));
    }
  };

  // 🔹 Handle Submit (Ab Table Data Remove Nahi Hoga Jab Tak Submit Nahi Hota)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate table has at least one item
    if (NewMRNTable.length === 0) {
      alert("Please add at least one item to the MRN");
      return;
    }

    // Prepare data for submission
    const submitData = {
      ...formData,
      NewMRNTable: NewMRNTable,
    };

    setSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitNewMRN(submitData);
      if (result) {
        setSubmitSuccess(true);

        // Reset form after successful submission
        setNewMRNTable([]);
        setFormData({
          Plant: "",
          Series: "",
          MRN_no: "",
          General: false,
          Work_order: false,
          ItemCode: "",
          Description: "",
          Qty_1: "",
          QtyUnit: "",
          Unit: "",
          Type: "",
          Machine: "",
          Employee: "",
          Dept: "",
          Remark_1: "",
          MRN_date: new Date().toISOString().split("T")[0],
          MRN_time: new Date().toTimeString().split(" ")[0],
          Remark_2: "",
        });

        // Fetch new MRN number
        const currentYear = new Date().getFullYear();
        const mrnNumber = await getNewMRN(currentYear);
        if (mrnNumber) {
          setMrnNo(mrnNumber);
          setFormData((prev) => ({ ...prev, MRN_no: mrnNumber }));
        }

        toast.success("MRN saved successfully!");
      } else {
        setSubmitError("Failed to save MRN. Please try again.");
      }
    } catch (error) {
      setSubmitError("Error saving MRN: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // search
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleItemCodeChange = async (e) => {
    const value = e.target.value;
    setFormData({ ...formData, ItemCode: value });

    if (value.length >= 2) {
      const results = await searchMRNItem(value);
      setSearchResults(results);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelectItem = (item) => {
    setFormData({
      ...formData,
      ItemCode: item.part_no,
      Description: item.Name_Description,
      QtyUnit: item.Unit_Code,
    });
    setShowDropdown(false);
  };

  const handleEmployeeChange = async (e) => {
    const value = e.target.value;
    setFormData({ ...formData, Employee: value });

    if (value.length >= 2) {
      const results = await searchEmployeeDept(value);
      setSearchResults(results);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelectEmployee = (employee) => {
    setFormData({
      ...formData,
      Employee: `${employee.Code} - ${employee.Name}`,
      Dept: employee.Department || "", // Default to empty if null
    });
    setShowDropdown(false);
  };

  const [machines, setMachines] = useState([]);
  useEffect(() => {
    const loadMachines = async () => {
      const data = await fetchUnitMachines();
      setMachines(data);
    };
    loadMachines();
  }, []);

  return (
    <div className="NewStoreNewgrn">
      <ToastContainer />
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
                <form className="row" onSubmit={handleSubmit}>
                  <div className="Newgrn-header text-start">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <h5 className="header-title text-start">New MRN</h5>
                      </div>
                      <div className="col-md-9 mt-4">
                        <div className="row ">
                          <div className="col-md-1">
                            <label
                              htmlFor="seriesSelect"
                              className="form-label"
                            >
                              Plant:
                            </label>
                          </div>
                          <div className="col-md-2">
                            <select
                              id="plantSelect"
                              className="form-select"
                              name="Plant"
                              value={formData.Plant}
                              onChange={handleChange}
                            >
                              <option value="">Select</option>
                              <option value="Produlink">Produlink</option>
                            </select>
                          </div>

                          {/* Label: Series and Series Select Option */}
                          <div className="col-md-1">
                            <label
                              htmlFor="seriesSelect"
                              className="form-label"
                            >
                              Series:
                            </label>
                          </div>
                          <div className="col-md-2">
                            <select
                              id="seriesSelect"
                              className="form-select"
                              value={series}
                              onChange={handleSeriesChange} // ✅ Fix: Add onChange event
                            >
                              <option value="">Select</option>
                              <option value="MRN">MRN</option>
                            </select>
                          </div>

                          <div className="col-md-1">
                            <label htmlFor="MrnNo" className="form-label">
                              MRN No:
                            </label>
                          </div>
                          <div className="col-md-2">
                            {series ? (
                              <input
                                type="text"
                                id="MrnNo"
                                className="form-control"
                                value={MrnNo}
                                readOnly
                              />
                            ) : (
                              <input
                                type="text"
                                id="MrnNo"
                                className="form-control"
                                value=""
                                readOnly
                                placeholder="Select series first"
                              />
                            )}
                          </div>

                          <div className="col-md-1 d-flex align-items-center">
                            <input
                              type="checkbox"
                              id="poGrnCheckbox"
                              checked={formData.General}
                              onChange={handleCheckboxChange}
                            />
                            <label htmlFor="poGrnCheckbox" className="ms-1">
                              General
                            </label>
                          </div>
                          <div className="col-md-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              id="directGrnCheckbox"
                              checked={formData.Work_order}
                              onChange={handleCheckboxChange}
                            />
                            <label htmlFor="directGrnCheckbox" className="ms-1">
                              Work Order
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-1 text-end">
                        <Link className="btn" to="/Tool-MRN">
                          Tool MRN
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="Newgrn-main mt-3">
                    <div className="container-fluid text-start">
                      <div className="row mt-4">
                        <div className="Col-md-12">
                          <div className="container-fluid">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Item Code View stock</th>
                                    <th>Description</th>
                                    <th>Qty</th>
                                    <th>Unit</th>
                                    <th>Type</th>
                                    <th>Machine</th>
                                    <th>Employee</th>
                                    <th>Dept.</th>
                                    <th>Remark</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td style={{ position: "relative" }}>
                                      <input
                                        type="text"
                                        name="ItemCode"
                                        placeholder="serach"
                                        value={formData.ItemCode}
                                        onChange={handleItemCodeChange}
                                        className="form-control"
                                        autoComplete="off"
                                      />
                                      {showDropdown &&
                                        searchResults.length > 0 && (
                                          <div
                                            className="dropdown-menu show"
                                            style={dropdownStyles}
                                          >
                                            {searchResults.map(
                                              (item, index) => (
                                                <div
                                                  key={index}
                                                  className="dropdown-item"
                                                  onClick={() =>
                                                    handleSelectItem(item)
                                                  }
                                                >
                                                  {item.part_no} -{" "}
                                                  {item.Name_Description}
                                                </div>
                                              )
                                            )}
                                          </div>
                                        )}
                                    </td>

                                    <td>
                                      <textarea
                                        name="Description"
                                        value={formData.Description}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            Description: e.target.value,
                                          })
                                        }
                                        className="form-control"
                                        rows="1"
                                      ></textarea>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="Qty_1"
                                        value={formData.Qty_1}
                                        onChange={handleChange}
                                        className="form-control"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="Unit"
                                        value={formData.QtyUnit}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            QtyUnit: e.target.value,
                                          })
                                        }
                                        className="form-control"
                                      />
                                    </td>
                                    <td>
                                      <select
                                        name="Type"
                                        value={formData.Type}
                                        onChange={handleChange}
                                        className="form-control"
                                      >
                                        <option>Select</option>
                                        <option value="Critical">
                                          Critical
                                        </option>
                                        <option value="Regular">Regular</option>
                                      </select>
                                    </td>
                                    <td>
                                      <select
                                        name="Machine"
                                        value={formData.Machine}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            Machine: e.target.value,
                                          })
                                        }
                                        className="form-control"
                                      >
                                        <option value="">Select Machine</option>
                                        {machines.map((machine, index) => (
                                          <option
                                            key={index}
                                            value={machine.WorkCenterCode}
                                          >
                                            {machine.WorkCenterCode} -{" "}
                                            {machine.WorkCenterName}
                                          </option>
                                        ))}
                                      </select>
                                    </td>
                                    <td style={{ position: "relative" }}>
                                      <input
                                        type="text"
                                        name="Employee"
                                        placeholder="code ,employee"
                                        value={formData.Employee}
                                        onChange={handleEmployeeChange}
                                        className="form-control"
                                        autoComplete="off"
                                      />
                                      {showDropdown &&
                                        searchResults.length > 0 && (
                                          <div
                                            className="dropdown-menu show"
                                            style={dropdownStyles}
                                          >
                                            {searchResults.map((emp, index) => (
                                              <div
                                                key={index}
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleSelectEmployee(emp)
                                                }
                                              >
                                                {emp.Code} - {emp.Name} (
                                                {emp.Type})
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="Dept"
                                        value={formData.Dept}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            Dept: e.target.value,
                                          })
                                        }
                                        className="form-control"
                                      />
                                    </td>

                                    <td>
                                      <textarea
                                        name="Remark_1"
                                        value={formData.Remark_1}
                                        onChange={handleChange}
                                        className="form-control"
                                      ></textarea>
                                    </td>
                                    <td data-label="Action">
                                      <button
                                        onClick={handleAddToTable}
                                        type="button"
                                        className="btn btn-primary"
                                      >
                                        {editIndex >= 0 ? "Update" : "Add"}
                                      </button>
                                    </td>
                                  </tr>
                                  {/* Add more rows as needed */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="Newgrntable">
                      <div className="container-fluid mt-4 text-start">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Sr no.</th>
                                <th>Item No</th>

                                <th>Description</th>
                                <th>unit</th>
                                <th>Qty</th>
                                <th>Type </th>
                                <th>Machine </th>
                                <th>Employee </th>
                                <th>Dept</th>
                                <th>Remark</th>

                                <th>Edit</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(NewMRNTable) &&
                              NewMRNTable.length > 0 ? (
                                NewMRNTable.map((item, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.ItemCode}</td>
                                    <td>{item.Description}</td>
                                    <td>{item.QtyUnit}</td>
                                    <td>{item.Qty_1}</td>
                                    <td>{item.Type}</td>
                                    <td>{item.Machine}</td>
                                    <td>{item.Employee}</td>
                                    <td>{item.Dept}</td>
                                    <td>{item.Remark_1}</td>
                                    <td>
                                      <FaEdit
                                        className="text-primary"
                                        onClick={() => handleEdit(item, index)}
                                      />
                                    </td>
                                    <td>
                                      <FaTrash
                                        className="text-danger"
                                        onClick={() => handleDelete(index)}
                                      />
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="12" className="text-center">
                                    No data available
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="NewgrnFooter">
                      <div className="container-fluid">
                        <div className="row g-3">
                          <div className="col-md-2">
                            <div className="row align-items-center">
                              <div className="col-4 col-md-4 text-end">
                                <label>Remark:</label>
                              </div>

                              <div className="col-md-8">
                                <input
                                  type="text"
                                  name="Remark_2"
                                  className="form-control"
                                  value={formData.Remark_2}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="row align-items-center">
                              <div className="col-md-4 col-md-4 text-end">
                                <label>MRN Date:</label>
                              </div>
                              <div className="col-8 col-md-8">
                                <input
                                  type="date"
                                  name="MRN_date"
                                  className="form-control"
                                  value={formData.MRN_date}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="row align-items-center">
                              <div className="col-4 col-md-4 text-end">
                                <label>MRN Time:</label>
                              </div>
                              <div className="col-8 col-md-8">
                                <input
                                  type="time"
                                  name="MRN_time"
                                  className="form-control"
                                  value={formData.MRN_time}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-md-2">
                          <div className="row align-items-center">
                            <div className="col-4 col-md-4 text-end">
                              <label>Project:</label>
                            </div>
                            <div className="col-8 col-md-8">
                              <select className="form-select">
                                <option>Select</option>
                              </select>
                            </div>
                          </div>
                        </div> */}
                          <div className="col-md-2 d-flex justify-content-end align-items-center">
                            <button
                              type="submit"
                              className="btn"
                              disabled={submitting}
                            >
                              {submitting ? "Saving..." : "Save MRN"}
                            </button>
                          </div>
                        </div>
                        {submitSuccess && (
                          <div className="row mt-3">
                            <div className="col-12">
                              <div className="alert alert-success">
                                MRN saved successfully!
                              </div>
                            </div>
                          </div>
                        )}

                        {submitError && (
                          <div className="row mt-3">
                            <div className="col-12">
                              <div className="alert alert-danger">
                                {submitError}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const dropdownStyles = {
  position: "absolute",
  background: "#fff",
  border: "1px solid #ccc",
  maxHeight: "200px",
  overflowY: "auto",
  width: "100%",
  zIndex: 1000,
};

export default NewMrn;
