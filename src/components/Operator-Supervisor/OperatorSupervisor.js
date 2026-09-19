import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./Operator-Supervisor.css";
import { Link } from "react-router-dom";
import {  getOperatorList,
  getOperatorById,
  deleteOperator, } from "../../Service/Api";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import * as XLSX from "xlsx";

const OperatorSupervisor = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);


 const [operatorList, setOperatorList] = useState([]);
  const [, setFormData] = useState({});
  const [, setEditId] = useState(null);
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    fetchOperators();
  }, []);

  const [nameSearchQuery, setNameSearchQuery] = useState("");

  const fetchOperators = async (query = "") => {
    try {
      const data = await getOperatorList(query);
      setOperatorList(data.sort((a, b) => b.id - a.id));
    } catch (err) {
      console.error("Error fetching data", err);
      toast.error("Failed to fetch data");
    }
  };

  const handleSearch = () => {
    fetchOperators(nameSearchQuery);
  };

  const handleEdit = async (id) => {
    try {
      const data = await getOperatorById(id);
      setFormData(data);
      setEditId(id);
      // Store the data to localStorage to be read by Supervisor
      localStorage.setItem("editOperator", JSON.stringify(data));
      
      navigate("/Supervisor");
    } catch (err) {
      console.error("Error fetching operator by ID", err);
      toast.error("Failed to load data for editing");
    }
  };


  const handleDelete = async (id) => {
   
    try {
      await deleteOperator(id);
      toast.success("Deleted successfully");
      fetchOperators(); // Refresh list
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete entry");
    }
  };

  // Pagination calculation
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = operatorList.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(operatorList.length / recordsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleExportExcel = () => {
    if (operatorList.length === 0) {
      alert("No records to export");
      return;
    }
    const exportData = operatorList.map((item, index) => ({
      "Sr.": index + 1,
      "Name": item.Name || "",
      "Type": item.Type || "",
      "Department": item.Department || "",
      "Code": item.Code || "",
      "Designation": item.Designation || "",
      "Contact": item.Contact_No || "",
      "Daily Work Hours": item.DailyWorkHours || "",
      "Contractor": item.Contractor || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Operator Supervisor Staff");
    
    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Operator_Supervisor_Staff.xlsx");
  };

  return (
    <div className="erp-page OperatorSupervisor">
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
                <div className="OperatorSupervisor1 overflow-hidden p-4">
                  <div className="erp-header mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title mb-0">Operator / Supervisor / Staff</h5>
                      <div className="d-flex gap-2">
                        <Link to={"/Supervisor"} className="vndrbtn text-decoration-none">
                          Add New Operator/Supervisor
                        </Link>
                        {/* <Link to={"/Department-Head"} className="vndrbtn text-decoration-none">
                          Department Head
                        </Link> */}
                        <button className="vndrbtn" onClick={handleExportExcel}>Export Report</button>
                      </div>
                    </div>
                  </div>
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 align-items-end text-start">
                        <div className="col-md-2 col-6">
                          <label htmlFor="VISHWA S.I." className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Plant</label>
                          <select id="VISHWA S.I." className="form-select">
                            <option value="">VISHWA S.I.</option>
                            {/* Add options here */}
                          </select>
                        </div>
                        <div className="col-md-2 col-6">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <input
                              className="form-check-input mt-0"
                              type="checkbox"
                              id="checkLabel"
                            />
                            <label className="form-check-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }} htmlFor="checkLabel">
                              Name
                            </label>
                          </div>
                          <input
                            type="text"
                            id="operatorName"
                            className="form-control"
                            placeholder="Operator Name"
                            value={nameSearchQuery}
                            onChange={(e) => setNameSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="col-md-2 col-6">
                          <label htmlFor="description" className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                            Description
                          </label>
                          <select id="description_field" className="form-select">
                            <option value="">All</option>
                            <option value="">All</option>
                            {/* Add options here */}
                          </select>
                        </div>
                        <div className="col-md-2 col-6">
                          <label htmlFor="contractor" className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                            Contractor
                          </label>
                          <select id="contractor" className="form-select">
                            <option value="">All</option>
                            <option value="Company">Company</option>
                            <option value="SAINATH JADHAV">SAINATH JADHAV</option>
                            <option value="MOMIN PATEL">MOMIN PATEL</option>
                            <option value="QUALITY CONTROL">QUALITY CONTROL</option>
                          </select>
                        </div>
                        <div className="col-md-2 col-6">
                          <label htmlFor="type" className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                            Type
                          </label>
                          <select id="type" className="form-select">
                            <option value="">All</option>
                            <option value="FID">FID</option>
                            <option value="INSPECTOR">INSPECTOR</option>
                            <option value="MACHINING">MACHINING</option>
                            <option value="NIRAJ">NIRAJ</option>
                            <option value="QA SUPERWISER">QA SUPERWISER</option>
                            <option value="STORE">STORE</option>
                          </select>
                        </div>
                        <div className="col-md-1 col-6">
                          <label htmlFor="status" className="form-label w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                            Status
                          </label>
                          <select id="status" className="form-select">
                            <option>All</option>
                            <option value="Status1">Status1</option>
                            <option value="Status2">Status2</option>
                          </select>
                        </div>
                        <div className="col-md-1 col-12 mt-auto">
                          <button className="vndrbtn w-100" onClick={handleSearch}>
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive mt-4">
                          <table className="table table-bordered table-striped">
                            <thead>
                              <tr>
                                <th>Sr.</th>
                               
                                <th>Name</th>
                                <th>Type</th>
                                 <th>Department</th>
                                <th>Code</th>
                                <th>Designation4</th>
                                <th>Contact</th>
                                <th>DailyWorkHours</th>
                                <th>Contractor</th>
                               
                              
                                 <th>Edit</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                     <tbody>
   {currentRecords.map((item, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{item.Name}</td>
      <td>{item.Type}</td>
      <td>{item.Department}</td>
      <td>{item.Code}</td>
      <td>{item.Designation}</td>
      <td>{item.Contact_No}</td>
      <td>{item.DailyWorkHours}</td>
      <td>{item.Contractor}</td>

      <td className="text-center">
        <button className="btn btn-sm text-primary border-0 p-0" title="Edit" onClick={() => handleEdit(item.id)}>
          <FaEdit />
        </button>
      </td>
      <td className="text-center">
        <button className="btn btn-sm text-danger border-0 p-0" title="Delete" onClick={() => handleDelete(item.id)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  ))}
</tbody>

                          </table>
                        </div>
                {/* Pagination Controls */}
      <div className="d-flex justify-content-end mt-4">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          size="medium"
        />
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

export default OperatorSupervisor;
