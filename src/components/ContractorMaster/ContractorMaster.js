import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./ContractorMaster.css";
import { Link } from "react-router-dom";
import {  fetchContractorMaster,
  deleteContractor,
  updateContractor } from "../../Service/Api";
  import { ToastContainer, toast } from "react-toastify";
  import * as XLSX from "xlsx";
  import { Pagination } from "@mui/material";
const ContractorMaster = () => {
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

  const [contractorList, setContractorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const itemsPerPage = 10;

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadContractors();
  }, []);

  const loadContractors = async (query = "") => {
    try {
      const data = await fetchContractorMaster(query);
      setContractorList(data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Error fetching contractors", error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    loadContractors(searchQuery);
  };

  const handleViewAll = () => {
    setSearchQuery("");
    setCurrentPage(1);
    loadContractors("");
  };

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this contractor?")) return;
  try {
    await deleteContractor(id);
    toast.success("Contractor deleted successfully");
    loadContractors();
  } catch (error) {
    toast.error("Failed to delete contractor");
  }
};

  const handleEditClick = (contractor) => {
    setEditingId(contractor.id);
    setEditForm(contractor);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSave = async () => {
  try {
    await updateContractor(editingId, editForm);
    toast.success("Contractor updated successfully");
    setEditingId(null);
    loadContractors();
  } catch (error) {
    toast.error("Failed to update contractor");
  }
};

  const paginatedData = contractorList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(contractorList.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleExportExcel = () => {
    if (contractorList.length === 0) {
      alert("No records to export");
      return;
    }
    const exportData = contractorList.map((item, index) => ({
      "Sr.": index + 1,
      "Name": item.name || "",
      "Type": item.type || "",
      "Code": item.code || "",
      "Designation": item.designation || "",
      "Contact": item.contact || "",
      "Contractor Type": item.contractortype || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contractor Master");
    
    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Contractor_Master.xlsx");
  };  return (
    <div className="ContractorMaster">
      <ToastContainer style={{ marginTop: '70px' }} />
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
                <div className="ContractorMaster1">
                  <div className="erp-header mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title mb-0">Contractor Master</h5>
                      <div className="d-flex gap-2">
                        <Link to={"/Addcontractor-master"} className="vndrbtn text-decoration-none">
                          Add New Contractor
                        </Link>
                        <button className="vndrbtn" onClick={handleExportExcel}>
                          Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-md-12 text-start">
                          <div className="row">
                            <div className="col-md-3">
                              <label
                                htmlFor="plantSelect"
                                className="form-label"
                              >
                                Plant:
                              </label>
                              <select id="plantSelect" className="form-select" style={{marginTop:"-1px"}}>
                                <option value="VISHWA S.I.">VISHWA S.I.</option>
                                
                              </select>
                            </div>
                            <div className="col-md-3">
                              <label
                                htmlFor="contractorName"
                                className="form-label"
                              >
                                Contractor Name:
                              </label>
                              <input
                                type="text"
                                id="contractorName"
                                className="form-control"
                                placeholder="Enter Contractor Name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                            </div>
                            <div className="col-md-3 d-flex flex-column">
                              <label className="form-label">&nbsp;</label>
                              <div className="d-flex gap-2">
                                <button className="vndrbtn" type="button" onClick={handleSearch}>
                                  Search
                                </button>
                                <button className="vndrbtn" type="button" onClick={handleViewAll}>
                                  View All
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped" style={{ fontSize: '0.85rem' }}>
                        <thead className="table-light">
                              <tr>
                                <th>Sr. No</th>
                                <th>Plant</th>
                                <th>Contractor Name</th>
                                <th>Contractor Address</th>
                                <th>Contact No</th>
                                <th>PAN No</th>
                                <th>GST No</th>
                                <th>TDS %</th>
                                <th>Nature of Service</th>
                                <th>Firm Name</th>
                                <th>Email</th>
                                <th>Refcode</th>
                                <th>Edit</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                            {paginatedData.map((con, index) => (
            <tr key={con.id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              {editingId === con.id ? (
                <>
                  <td><input className="form-control form-control-sm" name="Plant" value={editForm.Plant} onChange={handleEditChange} /></td>
                  <td><input className="form-control form-control-sm" name="ContractorName" value={editForm.ContractorName} onChange={handleEditChange} /></td>
                  <td><input className="form-control form-control-sm" name="Address" value={editForm.Address} onChange={handleEditChange} /></td>
                  <td><input className="form-control form-control-sm" name="ContactNo" value={editForm.ContactNo} onChange={handleEditChange} /></td>
                  <td><input className="form-control form-control-sm" name="PanNo" value={editForm.PanNo} onChange={handleEditChange} /></td>
                  <td><input className="form-control form-control-sm" name="GstNo" value={editForm.GstNo} onChange={handleEditChange} /></td>
                  <td><input className="form-control form-control-sm" name="Tds" value={editForm.Tds} onChange={handleEditChange} /></td>
                  <td><input className="form-control form-control-sm" name="NatureOfService" value={editForm.NatureOfService} onChange={handleEditChange} /></td>
                  <td><input className="form-control form-control-sm" name="FirName" value={editForm.FirName} onChange={handleEditChange} /></td>
                  <td><input className="form-control form-control-sm" name="Email" value={editForm.Email} onChange={handleEditChange} /></td>
                  <td><input className="form-control form-control-sm" name="RefCode" value={editForm.RefCode} onChange={handleEditChange} /></td>
                  <td colSpan="2" className="text-center">
                    <button className="btn btn-success btn-sm me-1" onClick={handleSave} title="Save">
                      <i className="fas fa-check"></i>
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)} title="Cancel">
                      <i className="fas fa-times"></i>
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{con.Plant}</td>
                  <td>{con.ContractorName}</td>
                  <td>{con.Address}</td>
                  <td>{con.ContactNo}</td>
                  <td>{con.PanNo}</td>
                  <td>{con.GstNo}</td>
                  <td>{con.Tds}</td>
                  <td>{con.NatureOfService}</td>
                  <td>{con.FirName}</td>
                  <td>{con.Email}</td>
                  <td>{con.RefCode}</td>
                  <td>
                    <button className="contractorbtnicon" onClick={() => handleEditClick(con)}>
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                  <td>
                    <button className="contractorbtnicon" onClick={() => handleDelete(con.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
                          </table>
                          </div>
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
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorMaster;
