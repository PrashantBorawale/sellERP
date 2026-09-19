import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import CachedIcon from "@mui/icons-material/Cached";
import "./CostCenterMaster.css";
import {
  saveCostCenter,
  fetchCostCenters,
  updateCostCenter,
  deleteCostCenter,
} from "../../Service/Api.jsx";
import {
  saveCostCenterAdd,
  fetchCostCentersAdd,
  updateCostCenterAdd,
  deleteCostCenterAdd,
} from "../../Service/Api.jsx";
import { toast, ToastContainer } from "react-toastify";
import { Pagination } from "@mui/material";
import * as XLSX from "xlsx";

const CostCenterMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddFormsecond, setShowAddFormsecond] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const toggleAddFormsecond = () => {
    setShowAddFormsecond(!showAddFormsecond);
  };

  // card 1// States for first card
  const [costCenterData, setCostCenterData] = useState([]);
  const [formData, setFormData] = useState({
    Category_Code: "",
    Cost_Center_Code: "",
    Cost_Center_Desc: "",
  });
  const [editId, setEditId] = useState(null);

  // States for second card
  const [costCenterData1, setCostCenterData1] = useState([]);
  const [formData1, setFormData1] = useState({
    Category_Code: "",
    Cost_Center_Desc: "",
  });
  const [editId1, setEditId1] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [modalCurrentPage, setModalCurrentPage] = useState(1);
  const modalItemsPerPage = 5;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleModalPageChange = (event, value) => {
    setModalCurrentPage(value);
  };

  const handleExportExcel = () => {
    if (costCenterData.length === 0) {
      toast.warning("No records to export");
      return;
    }
    const exportData = costCenterData.map((item, index) => ({
      "Sr.": index + 1,
      "Cost Center Code": item.Cost_Center_Code || "",
      "Cost Center Desc": item.Cost_Center_Desc || "",
      "Category Code": item.Category_Code || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cost Center Master");
    
    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Cost_Center_Master.xlsx");
  };

  // Fetch cost centers for the first card
  useEffect(() => {
    fetchCostCenters()
      .then((data) => setCostCenterData(data.sort((a, b) => b.id - a.id)))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Fetch cost centers for the second card
  useEffect(() => {
    fetchCostCentersAdd()
      .then((data) => setCostCenterData1(data.sort((a, b) => b.id - a.id)))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle input change for the first card
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle save for the first card
  const handleSave = async () => {
    if (
      !formData.Category_Code ||
      !formData.Cost_Center_Code ||
      !formData.Cost_Center_Desc
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      if (editId) {
        await updateCostCenter(editId, formData);
        toast.success("Cost Center updated successfully!");
      } else {
        await saveCostCenter(formData);
        toast.success("Cost Center saved successfully!");
      }
      setFormData({
        Category_Code: "",
        Cost_Center_Code: "",
        Cost_Center_Desc: "",
      });
      setEditId(null);
      fetchCostCenters().then((data) => setCostCenterData(data.sort((a, b) => b.id - a.id)));
      console.log("data saved");
    } catch (error) {
      toast.error("Failed to save data");
    }
  };

  // Handle edit for the first card
  const handleEdit = (id) => {
    const data = costCenterData.find((item) => item.id === id);
    setFormData({
      Category_Code: data.Category_Code,
      Cost_Center_Code: data.Cost_Center_Code,
      Cost_Center_Desc: data.Cost_Center_Desc,
    });
    setEditId(id);
  };

  // Handle delete for the first card
  const handleDelete = async (id) => {
    try {
      await deleteCostCenter(id);
      toast.success("Cost Center deleted successfully!");
      fetchCostCenters().then((data) => setCostCenterData(data.sort((a, b) => b.id - a.id)));
    } catch (error) {
      toast.error("Failed to delete data");
    }
  };

  const paginatedData = costCenterData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(costCenterData.length / itemsPerPage);

  const [firstModalCurrentPage, setFirstModalCurrentPage] = useState(1);
  const paginatedFirstModalData = costCenterData.slice(
    (firstModalCurrentPage - 1) * 5,
    firstModalCurrentPage * 5
  );
  const totalFirstModalPages = Math.ceil(costCenterData.length / 5);

  const paginatedModalData = costCenterData1.slice(
    (modalCurrentPage - 1) * modalItemsPerPage,
    modalCurrentPage * modalItemsPerPage
  );
  const totalModalPages = Math.ceil(costCenterData1.length / modalItemsPerPage);

  // Handle input change for the second card
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle save for the second card
  const handleSave1 = async () => {
    if (!formData1.Category_Code || !formData1.Cost_Center_Desc) {
      toast.error("All fields are required!");
      return;
    }

    try {
      if (editId1) {
        await updateCostCenterAdd(editId1, formData1);
        toast.success("Cost Center updated successfully!");
      } else {
        await saveCostCenterAdd(formData1);
        toast.success("Cost Center saved successfully!");
      }
      setFormData1({
        Category_Code: "",
        Cost_Center_Desc: "",
      });
      setEditId1(null);
      fetchCostCentersAdd().then((data) => setCostCenterData1(data.sort((a, b) => b.id - a.id)));
      console.log("data saved");
    } catch (error) {
      toast.error("Failed to save data");
    }
  };

  // Handle edit for the second card
  const handleEdit1 = (id) => {
    const data = costCenterData1.find((item) => item.id === id);
    setFormData1({
      Category_Code: data.Category_Code,
      Cost_Center_Desc: data.Cost_Center_Desc,
    });
    setEditId1(id);
  };

  // Handle delete for the second card
  const handleDelete1 = async (id) => {
    try {
      await deleteCostCenterAdd(id);
      toast.success("Cost Center deleted successfully!");
      
      // Update state directly without refetching
      setCostCenterData1(prevData => prevData.filter(item => item.id !== id));
    } catch (error) {
      toast.error("Failed to delete data");
    }
  };
  

  return (
    <div className="CostcenterMaster">
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
                <div className="CostcenterMaster1">
                  <div className="erp-header mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title mb-0">Cost Center Master</h5>
                      <div className="d-flex gap-2">
                        <button className="btn vndrbtn" onClick={toggleAddForm}>
                          Add New
                        </button>
                        <button className="btn vndrbtn" onClick={handleExportExcel}>
                          Export Report
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-4">
                      <div className="row align-items-end text-start mb-3">
                        <div className="col-md-3">
                          <label htmlFor="CostcenterName" className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                            Cost Center Category:
                          </label>
                          <select className="form-select mt-1">
                            <option selected>All</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                        <div className="col-md-2">
                          <button className="btn vndrbtn mb-1 w-100">
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-4">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped" style={{ fontSize: '0.85rem' }}>
                          <thead className="table-light">
                            <tr>
                              <th scope="col">Sr.</th>
                              <th scope="col">Cost Center Code</th>
                              <th scope="col">Description</th>
                              <th scope="col">Category</th>
                              {/* <th scope="col">Action</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedData.map((costCenter, index) => (
                              <tr key={costCenter.id}>
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>{costCenter.Cost_Center_Code}</td>
                                <td>{costCenter.Cost_Center_Desc}</td>
                                <td>{costCenter.Category_Code}</td>
                                {/* <td>
                                  <button
                                    className="card-btn"
                                    onClick={() => handleEdit(costCenter.id)}
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    className="card-btn"
                                    onClick={() => handleDelete(costCenter.id)}
                                  >
                                    <FaTrash />
                                  </button>
                                </td> */}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="row mt-3 align-items-center">
                        <div className="col-md-6 text-start">
                          <span className="record-count" style={{ color: "#475569", fontWeight: 600, fontSize: "0.85rem" }}>
                            Total Records: {costCenterData.length}
                          </span>
                        </div>
                        <div className="col-md-6 d-flex justify-content-end">
                          {totalPages > 1 && (
                            <Pagination
                              count={totalPages}
                              page={currentPage}
                              onChange={handlePageChange}
                              color="primary"
                              shape="rounded"
                              size="small"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {showAddForm && (
                    <div className="costtype-overlay">
                      <ToastContainer />
                      <div className="new-card">
                        <div className="row">
                          <div className="col-md-10 text-start">
                            <h5 className="card-title">Add New Cost Center</h5>
                          </div>
                          <div className="col-md-2 text-end">
                            <button
                              className="btn"
                              onClick={toggleAddForm}
                            >
                              X
                            </button>
                          </div>
                        </div>
                        <div className="card-body p-4">
                          <div className="row align-items-end text-start mb-4">
                            <div className="col-md-4">
                              <label htmlFor="Category_Code" className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                                Category Code:
                              </label>
                              <div className="d-flex gap-2">
                                <select
                                  id="Category_Code"
                                  name="Category_Code"
                                  className="form-select"
                                  value={formData.Category_Code}
                                  onChange={handleInputChange}
                                >
                                  <option value="" disabled>Select ..</option>
                                  <option>Store</option>
                                  <option>Maintenance</option>
                                </select>
                                <button className="btn btn-sm btn-outline-primary" onClick={toggleAddFormsecond}>
                                  New
                                </button>
                                <button className="btn btn-sm btn-outline-secondary">
                                  <CachedIcon fontSize="small" />
                                </button>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="Cost_Center_Code" className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                                Cost Center Code:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="Cost_Center_Code"
                                name="Cost_Center_Code"
                                placeholder="Cost Center Code"
                                value={formData.Cost_Center_Code}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="Cost_Center_Desc" className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                                Cost Center Desc:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="Cost_Center_Desc"
                                name="Cost_Center_Desc"
                                placeholder="Cost Center Description"
                                value={formData.Cost_Center_Desc}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-2">
                              <button className="btn vndrbtn w-100" onClick={handleSave}>
                                Save
                              </button>
                            </div>
                          </div>
                          <div className="CostaddnewTable">
                            <div className="container-fluid">
                              <div className="table-responsive">
                                <table className="table table-bordered table-striped" style={{ fontSize: '0.85rem' }}>
                                  <thead className="table-light">
                                    <tr>
                                      <th>Category Code</th>
                                      <th>Cost Center Code</th>
                                      <th>Cost Center Desc</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {paginatedFirstModalData.length > 0 ? (
                                      paginatedFirstModalData.map((item) => (
                                        <tr key={item.id}>
                                          <td>{item.Category_Code}</td>
                                          <td>{item.Cost_Center_Code}</td>
                                          <td>{item.Cost_Center_Desc}</td>
                                          <td>
                                            <button
                                              style={{
                                                border: "none",
                                                padding: "5px",
                                                margin: "5px",
                                              }}
                                              onClick={() =>
                                                handleEdit(item.id)
                                              }
                                            >
                                              <FaEdit />
                                            </button>
                                            <button
                                              style={{
                                                border: "none",
                                                padding: "5px",
                                                margin: "5px",
                                              }}
                                              onClick={() =>
                                                handleDelete(item.id)
                                              }
                                            >
                                              <FaTrash />
                                            </button>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="4">No Data Found!!!</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              
                              {totalFirstModalPages > 1 && (
                                <div className="d-flex justify-content-end mt-2">
                                  <Pagination
                                    count={totalFirstModalPages}
                                    page={firstModalCurrentPage}
                                    onChange={(e, v) => setFirstModalCurrentPage(v)}
                                    color="primary"
                                    shape="rounded"
                                    size="small"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showAddFormsecond && (
                    <div className="costtype2-overlay mt-5">
                     
                      <div className="new-card">
                        <div className="row">
                          <div className="col-md-10 text-start">
                            <h5 className="card-title">Add New Cost Center</h5>
                          </div>
                          <div className="col-md-2 text-end">
                            <button
                              className="btn"
                              onClick={toggleAddFormsecond}
                            >
                              X
                            </button>
                          </div>
                        </div>
                        <div className="card-body p-4">
                          <div className="row align-items-end text-start mb-4">
                            <div className="col-md-5">
                              <label htmlFor="Category_Code" className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                                Category Code:
                              </label>
                              <select
                                id="Category_Code"
                                name="Category_Code"
                                className="form-select"
                                value={formData1.Category_Code}
                                onChange={handleInputChange1}
                              >
                                <option value="" disabled>Select ..</option>
                                <option>Store</option>
                                <option>Maintenance</option>
                              </select>
                            </div>

                            <div className="col-md-5">
                              <label htmlFor="Cost_Center_Desc" className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                                Cost Center Desc:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="Cost_Center_Desc"
                                name="Cost_Center_Desc"
                                placeholder="Description"
                                value={formData1.Cost_Center_Desc}
                                onChange={handleInputChange1}
                              />
                            </div>

                            <div className="col-md-2">
                              <button className="btn vndrbtn w-100" onClick={handleSave1}>
                                Save
                              </button>
                            </div>
                          </div>
                          <div className="CostaddnewTable">
                            <div className="container-fluid p-0">
                              <div className="table-responsive">
                                <table className="table table-bordered table-striped" style={{ fontSize: '0.85rem' }}>
                                  <thead className="table-light">
                                    <tr>
                                      <th>Category Code</th>
                                      <th>Cost Center Desc</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {paginatedModalData.map((costCenter) => (
                                      <tr key={costCenter.id}>
                                        <td>{costCenter.Category_Code}</td>
                                        <td>{costCenter.Cost_Center_Desc}</td>
                                        <td>
                                          <button
                                            style={{
                                              border: "none",
                                              padding: "5px",
                                              margin: "5px",
                                            }}
                                            onClick={() =>
                                              handleEdit1(costCenter.id)
                                            }
                                          >
                                            <FaEdit />
                                          </button>
                                          <button
                                            style={{
                                              border: "none",
                                              padding: "5px",
                                              margin: "5px",
                                            }}
                                            onClick={() =>
                                              handleDelete1(costCenter.id)
                                            }
                                          >
                                            <FaTrash />
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              {totalModalPages > 1 && (
                                <div className="d-flex justify-content-end mt-2">
                                  <Pagination
                                    count={totalModalPages}
                                    page={modalCurrentPage}
                                    onChange={handleModalPageChange}
                                    color="primary"
                                    shape="rounded"
                                    size="small"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCenterMaster;
