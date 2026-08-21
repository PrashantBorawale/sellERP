import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import "./VenderList.css";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { getSupplierList, deleteSupplier } from "../../../Service/Api.jsx"; 
import { MdDeleteForever } from "react-icons/md";

const VenderList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [supplierCustomerData, setSupplierCustomerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showData, setShowData] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [recordsPerPage] = useState(10); 

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSupplierList();
        setSupplierCustomerData(data);
        setFilteredData(data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = supplierCustomerData.filter((item) => {
      const matchesType = searchType ? item.type === searchType : true;
      const matchesQuery = searchQuery
        ? item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.number.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesType && matchesQuery;
    });
    setFilteredData(filtered);
    console.log(filtered)
    setCurrentPage(1);
    setShowData(true);
  };

  const handleViewAll = () => {
    setFilteredData(supplierCustomerData.sort((a, b) => b.id - a.id));
    setSearchType("");
    setSearchQuery("");
    setShowData(true);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  )
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await deleteSupplier(id);

      // Refresh list after delete
      const updatedList = supplierCustomerData.filter(item => item.id !== id);
      setSupplierCustomerData(updatedList);
      setFilteredData(updatedList);

      alert("Record deleted successfully!");
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete.");
    }
  };

  const handleViewPdf = (viewPath, item) => {
    if (!viewPath || viewPath === "null" || viewPath === "undefined") {
      alert(`No PDF document attached to vendor: ${item?.Name || "this record"}`);
      return;
    }
    let url = viewPath;
    if (viewPath.startsWith("http://") || viewPath.startsWith("https://")) {
      url = viewPath;
    } else if (viewPath.startsWith("/")) {
      url = `https://sellerp-backend.onrender.com${viewPath}`;
    } else {
      url = `https://sellerp-backend.onrender.com/${viewPath}`;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="erp-page vender-page">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />

              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="VenderMain overflow-hidden p-4">
                  {/* Header */}
                  <div className="erp-header mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title mb-0">Supplier / Customer / Vendor List</h5>
                      <div className="d-flex gap-2">
                        <Link to="/CustomerQuery" className="vndrbtn">Customer - Query</Link>
                        <Link to="/Supplier-Customer-Master" className="vndrbtn">+ Add New</Link>
                      </div>
                    </div>
                  </div>

                  {/* Filter Card */}
                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 align-items-end">
                        <div className="col-md-3 text-start">
                          <label className="form-label text-start w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Select Type</label>
                          <select 
                            className="form-select"
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                          >
                            <option value="">Select Type</option>
                            <option value="Customer">Customer</option>
                            <option value="Supplier">Supplier</option>
                            <option value="Vendor">Vendor</option>
                          </select>
                        </div>
                        <div className="col-md-3 text-start">
                          <label className="form-label text-start w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>Search Type</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Type Code No or Name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="col-md-2">
                          <button 
                            className="vndrbtn w-100 h-100" 
                            onClick={handleSearch}
                          >
                            Search
                          </button>
                        </div>
                        <div className="col-md-2">
                          <button 
                            className="vndrbtn w-100 h-100" 
                            onClick={handleViewAll}
                          >
                            View All
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  {showData && (
                    <div className="table-responsive mt-4">
                      <table className="table table-hover align-middle">
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Type</th>
                            <th>Code No.</th>
                            <th style={{ minWidth: '150px' }}>Name</th>
                            <th>Contact No.</th>
                            <th>Email</th>
                            <th>Vendor Code</th>
                            <th>Payment term</th>
                            <th>Gst Type</th>
                            <th>GST No.</th>
                            <th>GST Tax Code</th>
                            <th>Auth</th>
                            <th>User</th>
                            <th style={{ width: '60px' }}>View</th>
                            <th style={{ width: '60px' }}>Edit</th>
                            <th style={{ width: '60px' }}>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRecords.length === 0 ? (
                            <tr>
                              <td colSpan="16" className="text-center text-muted py-4">
                                No records found.
                              </td>
                            </tr>
                          ) : (
                            currentRecords.map((item, index) => (
                              <tr key={index}>
                                <td>{indexOfFirstRecord + index + 1}</td>
                                <td>{item.type}</td>
                                <td>{item.number}</td>
                                <td className="text-start">{item.Name}</td>
                                <td>{item.Contact_No}</td>
                                <td>{item.Email_Id}</td>
                                <td>{item.Vendor_Code}</td>
                                <td>{item.Payment_Term}</td>
                                <td>{item.GST_No}</td>
                                <td>{item.GST_No2}</td>
                                <td>{item.GST_Tax_Code}</td>
                                <td>
                                  {item.Auth ? (
                                    <span className="badge bg-success">Yes</span>
                                  ) : (
                                    <span className="badge bg-danger">No</span>
                                  )}
                                </td>
                                <td>{item.User}</td>
                                <td>
                                  <button 
                                    type="button"
                                    onClick={() => handleViewPdf(item.View, item)} 
                                    className="btn-view border-0"
                                  >
                                    View
                                  </button>
                                </td>
                                <td>
                                  <Link 
                                    to={`/Supplier-Customer-Master/${item.id}`} 
                                    className="btn-edit"
                                  >
                                    <FaEdit />
                                  </Link>
                                </td>
                                <td>
                                  <button 
                                    onClick={() => handleDelete(item.id)} 
                                    className="btn-del"
                                  >
                                    <MdDeleteForever size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Pagination Controls */}
                  {showData && (
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <div className="record-count">
                        Total Record : <span className="badge bg-primary text-white">{filteredData.length}</span>
                      </div>
                      <nav>
                        <ul className="pagination mb-0">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </button>
                          </li>
                          {pageNumbers.map((number) => (
                            <li
                              key={number}
                              className={`page-item ${currentPage === number ? "active" : ""}`}
                            >
                              <button
                                className="page-link"
                                onClick={() => setCurrentPage(number)}
                              >
                                {number}
                              </button>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === pageNumbers.length || pageNumbers.length === 0 ? 'disabled' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(currentPage + 1)}
                              disabled={currentPage === pageNumbers.length || pageNumbers.length === 0}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
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

export default VenderList;
