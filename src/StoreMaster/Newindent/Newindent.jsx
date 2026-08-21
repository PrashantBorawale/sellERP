import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./Newindent.css";
import { Link } from "react-router-dom";
import {
  saveIndent,
  getIndentData,
  deleteIndent,
} from "../../Service/StoreApi.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { indentsaveData } from "../../Service/StoreApi.jsx";

const Newindent = () => {
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
    SelectItem: "",
    Description: "",
    Available: "",
    Unit: "",
    Machine: "",
    Department: "",
    Qty: "",
    Type: "",
    Remark: "",
    UseFor: "",
    MoRef: "",
    SchDate: "",
  });

  const [indentList, setIndentList] = useState([]); // To store the list of data
  const [isEdit, setIsEdit] = useState(false); // To manage edit state
  const [editId, setEditId] = useState(null); // To store the current editing item id

  // Fetch data initially
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getIndentData();
      setIndentList(response.data); // Assuming your API returns the data array
    } catch (error) {
      toast.error("Error fetching data");
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    for (const key in formData) {
      if (!formData[key]) {
        toast.error(`${key} is required`);
        return;
      }
    }

    try {
      if (isEdit) {
        // Call update API
        await saveIndent(formData, editId); // Assuming saveIndent can handle both save and update
        toast.success("Indent updated successfully!");
      } else {
        await saveIndent(formData); // Save API call
        toast.success("Indent saved successfully!");
      }
      setFormData({
        SelectItem: "",
        Description: "",
        Available: "",
        Unit: "",
        Machine: "",
        Department: "",
        Qty: "",
        Type: "",
        Remark: "",
        UseFor: "",
        MoRef: "",
        SchDate: "",
      }); // Clear the form
      fetchData(); // Refresh the table data
      setIsEdit(false);
    } catch (error) {
      toast.error("Failed to save data!");
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    const selectedData = indentList.find((item) => item.id === id);
    setFormData(selectedData);
    setEditId(id);
    setIsEdit(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteIndent(id);
      toast.success("Indent deleted successfully!");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      toast.error("Failed to delete!");
      console.error(error);
    }
  };





  // new indent
  const [formData1, setFormData1] = useState({
    CPCCode: "",
    WorkOrder: "",
    Remark: "",
  });

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1({ ...formData1, [name]: value });
  };

  const validateForm1 = () => {
    const { CPCCode, WorkOrder, Remark } = formData1;
    return CPCCode && WorkOrder && Remark; // Check if all fields are filled
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    
    if (!validateForm1()) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await indentsaveData(formData1);
      toast.success("Data saved successfully!");
      // Clear form fields
      setFormData1({
        CPCCode: "",
        WorkOrder: "",
        Remark: "",
      });
    } catch (error) {
      toast.error("Failed to save data!");
      console.error("Error:", error);
    }
  };


  return (
    <div className="NewStoreNewIndent">
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
                <div className="NewIndent-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-2">
                      <h5 className="header-title text-start">New Indent</h5>
                    </div>

                    <div className="col-md-10 text-end">
                      <div className="row justify-content-end">
                        <div className="col-md-2 d-flex ">
                          <Link className="pobtn" to="/IndentList">
                            Indent List
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="NewIndent-main">
                  <div className="container-fluid text-start">
                    <div className="row mt-4">
                      <div className="col-12 col-md">
                        <label htmlFor="plant">Plant</label>
                        <select className="form-control" id="plant">
                          <option>Produlink</option>
                        </select>
                      </div>

                      <div className="col-12 col-md">
                        <label htmlFor="series">Series</label>
                        <select className="form-control" id="series">
                          <option>Select</option>
                          <option>Puchase Indent</option>
                        </select>
                      </div>
                      <div className="col-12 col-md">
                        <label htmlFor="IndentNo">Indent No</label>
                        <input
                          type="text"
                          className="form-control"
                          id="IndentNo"
                        />
                      </div>
                      <div className="col-12 col-md">
                        <label htmlFor="toDate">Date</label>
                        <input type="date" className="fntrol" id="toDate" />
                      </div>
                      <div className="col-12 col-md">
                        <label htmlFor="Time">Time</label>
                        <input type="text" className="form-control" id="Time" />
                      </div>

                      <div className="col-12 col-md">
                        <label htmlFor="inward">Category</label>
                        <select className="form-control" id="inward">
                          <option>Select</option>
                          <option value="All">All</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="StoreNewIndent" style={{ marginTop: "50px" }}>
                    <ul
                      className="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-Gernal-Detail-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-Gernal-Detail"
                          type="button"
                          role="tab"
                          aria-controls="pills-Gernal-Detail"
                          aria-selected="true"
                        >
                          Item Details
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-Gernal-Detail"
                        role="tabpanel"
                        aria-labelledby="pills-Gernal-Detail-tab"
                        tabindex="0"
                      >
                        <div className="StoreNewIndent text-start">
                          <div className="container-fluid">
                            <form onSubmit={handleSubmit}>
                              <div className="table-responsive">
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th>Select Item & CPC Code:</th>
                                      <th>Description</th>
                                      <th>Available Stock</th>
                                      <th>Unit</th>
                                      <th>Machine | Department</th>
                                      <th>Qty</th>
                                      <th>Type</th>
                                      <th>Remark</th>
                                      <th>Use For</th>
                                      <th>Mo Ref</th>
                                      <th>Sch Date</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td data-label="Item Code View stock">
                                        <div className="d-flex">
                                          <input
                                            type="text"
                                            name="SelectItem"
                                            className="form-control"
                                            value={formData.SelectItem}
                                            onChange={handleInputChange}
                                            placeholder="Enter item code..."
                                          />
                                          <button className="pobtn">
                                            Search
                                          </button>
                                        </div>
                                      </td>
                                      <td data-label="Description">
                                        <textarea
                                          name="Description"
                                          className="form-control"
                                          rows="1"
                                          value={formData.Description}
                                          onChange={handleInputChange}
                                          placeholder="Enter item description..."
                                        ></textarea>
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          name="Available"
                                          className="form-control"
                                          value={formData.Available}
                                          onChange={handleInputChange}
                                          placeholder="Available stock..."
                                        />
                                      </td>
                                      <td data-label="Unit">
                                        <select
                                          name="Unit"
                                          className="form-select"
                                          value={formData.Unit}
                                          onChange={handleInputChange}
                                        >
                                          <option value="">Select</option>
                                          <option value="PCS">PCS</option>
                                          <option value="KGS">KGS</option>
                                          <option value="BOX">BOX</option>
                                          <option value="LTR">LTR</option>
                                        </select>
                                      </td>
                                      <td data-label="Machine">
                                        <select
                                          name="Machine"
                                          className="form-select"
                                          value={formData.Machine}
                                          onChange={handleInputChange}
                                        >
                                          <option value="">Select</option>
                                          <option value="L4">
                                            L4 | LATHE 4
                                          </option>
                                          <option value="L5">
                                            L5 | LATHE 5
                                          </option>
                                          <option value="L6">
                                            L6 | LATHE 6
                                          </option>
                                          <option value="L7">
                                            L7 | LATHE 7
                                          </option>
                                        </select>

                                        <select
                                          name="Department"
                                          className="form-select"
                                          value={formData.Department}
                                          onChange={handleInputChange}
                                        >
                                          <option value="">Select</option>
                                          <option value="Ayush">Ayush</option>
                                          <option value="Production">
                                            Production
                                          </option>
                                          <option value="Purchase">
                                            Purchase
                                          </option>
                                          <option value="Quality">
                                            Quality
                                          </option>
                                          <option value="Store">Store</option>
                                        </select>
                                      </td>
                                      <td data-label="Qty">
                                        <input
                                          type="text"
                                          name="Qty"
                                          className="form-control"
                                          value={formData.Qty}
                                          onChange={handleInputChange}
                                          placeholder="Quantity..."
                                        />
                                      </td>
                                      <td data-label="Type">
                                        <select
                                          name="Type"
                                          className="form-select"
                                          value={formData.Type}
                                          onChange={handleInputChange}
                                        >
                                          <option value="">Select</option>
                                          <option value="Critical">
                                            Critical
                                          </option>
                                          <option value="Regular">
                                            Regular
                                          </option>
                                        </select>
                                      </td>
                                      <td data-label="Remark">
                                        <textarea
                                          name="Remark"
                                          className="form-control"
                                          value={formData.Remark}
                                          onChange={handleInputChange}
                                          placeholder="Enter remarks..."
                                        ></textarea>
                                      </td>
                                      <td data-label="Use For">
                                        <textarea
                                          name="UseFor"
                                          className="form-control"
                                          value={formData.UseFor}
                                          onChange={handleInputChange}
                                          placeholder="Usage details..."
                                        ></textarea>
                                      </td>
                                      <td data-label="MO Ref">
                                        <input
                                          type="text"
                                          name="MoRef"
                                          className="form-control"
                                          value={formData.MoRef}
                                          onChange={handleInputChange}
                                          placeholder="MO Reference..."
                                        />
                                      </td>
                                      <td data-label="Sch.date">
                                        <input
                                          type="date"
                                          name="SchDate"
                                          className="form-control"
                                          value={formData.SchDate}
                                          onChange={handleInputChange}
                                        />
                                      </td>
                                      <td data-label="Action">
                                        <button type="submit" className="pobtn">
                                          {isEdit ? "Update" : "Add"}
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </form>
                          </div>
                        </div>

                        <div className="NewIndenttable">
                          <div className="container-fluid mt-4 text-start">
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Sr no.</th>
                                    <th>Item No & CPC Code</th>
                                    <th>Description</th>
                                    <th>Available Stock</th>
                                    <th>unit</th>
                                    <th>Machine | Department</th>
                                    <th>Qty</th>
                                    <th>Type</th>
                                    <th>Remark</th>

                                    <th>Use For</th>
                                    <th>Mo Ref</th>
                                    <th>Sch Date</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {indentList.length > 0 ? (
                                    indentList.map((indent, index) => (
                                      <tr key={indent.id}>
                                        <td>{index + 1}</td>
                                        <td>{indent.SelectItem}</td>
                                        <td>{indent.Description}</td>
                                        <td>{indent.Available}</td>
                                        <td>{indent.Unit}</td>
                                        <td>
                                          {indent.Machine} | {indent.Department}
                                        </td>
                                        <td>{indent.Qty}</td>
                                        <td>{indent.Type}</td>
                                        <td>{indent.Remark}</td>
                                        <td>{indent.UseFor}</td>
                                        <td>{indent.MoRef}</td>
                                        <td>{indent.SchDate}</td>
                                        <td>
                                          <span
                                            onClick={() =>
                                              handleEdit(indent.id)
                                            }
                                            style={{
                                              cursor: "pointer",
                                              marginRight: "10px",
                                            }}
                                            title="Edit"
                                          >
                                            <FaEdit />
                                          </span>
                                        </td>
                                        <td>
                                          <span
                                            onClick={() =>
                                              handleDelete(indent.id)
                                            }
                                            style={{ cursor: "pointer" }}
                                            title="Delete"
                                          >
                                            <FaTrash />
                                          </span>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="13" className="text-center">
                                        No data available
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div className="NewIndentFooter">
                          <div className="container-fluid">
                            <form onSubmit={handleSubmit1}>
                              <div className="row g-3">
                                <div className="col-md-4">
                                  <div className="row align-items-center">
                                    <div className="col-4 col-md-4 text-end">
                                      <label>CPC Code:</label>
                                    </div>
                                    <div className="col-8 col-md-8">
                                      <input
                                        type="text"
                                        name="CPCCode"
                                        className="form-control mb-2"
                                        value={formData1.CPCCode}
                                        onChange={handleInputChange1}
                                        required // This is for HTML5 validation
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-4">
                                  <div className="row align-items-center">
                                    <div className="col-4 col-md-4 text-end">
                                      <label>Work Order:</label>
                                    </div>
                                    <div className="col-8 col-md-8">
                                      <input
                                        type="text"
                                        name="WorkOrder"
                                        className="form-control"
                                        value={formData1.WorkOrder}
                                        onChange={handleInputChange1}
                                        required // This is for HTML5 validation
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-4">
                                  <div className="row align-items-center">
                                    <div className="col-4 col-md-4 text-end">
                                      <label>Remarks:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <textarea
                                        name="Remark"
                                        cols="3"
                                        className="form-control"
                                        value={formData1.Remark}
                                        onChange={handleInputChange1}
                                        required // This is for HTML5 validation
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
<div className="row text-end d-flex justify-content-end align-items-center">
                                <div className="col-md-2 ">
                                  <button type="submit" className="pobtn w-100">
                                    Save Indent
                                  </button>
                                </div>
                                </div>
                              </div>
                            </form>
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
  );
};

export default Newindent;
