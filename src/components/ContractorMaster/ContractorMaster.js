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
  import { ToastContainer,toast } from "react-toastify";

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

  useEffect(() => {
    loadContractors();
  }, []);

  const loadContractors = async () => {
    try {
      const data = await fetchContractorMaster();
      setContractorList(data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Error fetching contractors", error);
    }
  };

const handleDelete = async (id) => {
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



  return (
    <div className="ContractorMaster">
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
                <div className="ContractorMaster1">
                  
                  <div className="Contractor-header mb-4 text-start mt-5">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">Contractor Master</h5>
                        </div>
                        <div className="col-md-6 col-12 text-end">
                          <Link
                            to={"/Addcontractor-master"}
                            className="btn me-2 mb-2"
                          >
                            Add New Contractor
                          </Link>
                          <Link className="btn mb-2">
                            Export To Excel
                          </Link>
                        </div>
                      </div>
                    
                  </div>
                  <div className="ContractorMain mt-5">
                    <div className="container-fluid">
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
                                <option value="Produlink">Produlink</option>
                                
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
                              />
                            </div>
                            <div className="col-md-3" style={{marginTop:"34px"}}>
                              <button className="btn" type="button">
                                Search
                              </button>
                            
                            
                              <button className="btn" type="button">
                                View All
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="Contractortable mt-5">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12 text-start">
                          <div className="table-striped table-responsive">
                          <table className="table">
                            <thead>
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
                  <td><input name="Plant" value={editForm.Plant} onChange={handleEditChange} /></td>
                  <td><input name="ContractorName" value={editForm.ContractorName} onChange={handleEditChange} /></td>
                  <td><input name="Address" value={editForm.Address} onChange={handleEditChange} /></td>
                  <td><input name="ContactNo" value={editForm.ContactNo} onChange={handleEditChange} /></td>
                  <td><input name="PanNo" value={editForm.PanNo} onChange={handleEditChange} /></td>
                  <td><input name="GstNo" value={editForm.GstNo} onChange={handleEditChange} /></td>
                  <td><input name="Tds" value={editForm.Tds} onChange={handleEditChange} /></td>
                  <td><input name="NatureOfService" value={editForm.NatureOfService} onChange={handleEditChange} /></td>
                  <td><input name="FirName" value={editForm.FirName} onChange={handleEditChange} /></td>
                  <td><input name="Email" value={editForm.Email} onChange={handleEditChange} /></td>
                  <td><input name="RefCode" value={editForm.RefCode} onChange={handleEditChange} /></td>
                  <td colSpan="2">
                    <button className="btn btn-success btn-sm" onClick={handleSave}>
                      Save
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
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          className="btn btn-secondary btn-sm"
          disabled={currentPage * itemsPerPage >= contractorList.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
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

export default ContractorMaster;
