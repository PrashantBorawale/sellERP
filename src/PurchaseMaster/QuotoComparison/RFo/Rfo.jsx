import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./Rfo.css";
import { useNavigate } from "react-router-dom";

const Rfo = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [rfqData, setRfqData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Search filters state
  const [searchFilters, setSearchFilters] = useState({
    fromDate: '',
    toDate: '',
    status: '',
    item: '',
    user: ''
  });

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

  // Fetch RFQ data
  const fetchRfqData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://sellerp-backend.onrender.com/Purchase/RFQ/');
      if (!response.ok) {
        throw new Error('Failed to fetch RFQ data');
      }
      const data = await response.json();
      setRfqData(data);
      setFilteredData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRfqData();
  }, []);

  // Handle search filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply search filters
  const handleSearch = () => {
    let filtered = rfqData;

    // Filter by date range
    if (searchFilters.fromDate) {
      filtered = filtered.filter(item => 
        new Date(item.to_date) >= new Date(searchFilters.fromDate)
      );
    }

    if (searchFilters.toDate) {
      filtered = filtered.filter(item => 
        new Date(item.to_date) <= new Date(searchFilters.toDate)
      );
    }

    // Filter by item
    if (searchFilters.item) {
      filtered = filtered.filter(item => 
        item.item_no.toLowerCase().includes(searchFilters.item.toLowerCase()) ||
        item.item.toLowerCase().includes(searchFilters.item.toLowerCase())
      );
    }

    // Filter by status (using rfq_type as status)
    if (searchFilters.status) {
      filtered = filtered.filter(item => 
        item.rfq_type.toLowerCase().includes(searchFilters.status.toLowerCase())
      );
    }

    // Filter by user (using project_name as user for now)
    if (searchFilters.user) {
      filtered = filtered.filter(item => 
        item.project_name && item.project_name.toLowerCase().includes(searchFilters.user.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchFilters({
      fromDate: '',
      toDate: '',
      status: '',
      item: '',
      user: ''
    });
    setFilteredData(rfqData);
  };

  function handleNavigate(path) {
    navigate(path);
  }

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/RFOEdit/${id}`);
  };

  // Handle view
  const handleView = (id) => {
    navigate(`/RFOView/${id}`);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <div className="RFOMaster">
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
                <div className="RFO-header text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title">
                        Request For Quotation (RFO)
                      </h5>
                    </div>
                    <div className="col-md-8 text-end">
                      <button
                        className="btn vndrbtn"
                        onClick={() => handleNavigate("/RFONew")}
                      >
                        RFO New
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Search Filters */}
                <div className="RFO-main mt-5">
                  <div className="container-fluid mt-4">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Status</th>
                            <th>Item</th>
                            <th>User</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <input 
                                type="date" 
                                name="fromDate"
                                value={searchFilters.fromDate}
                                onChange={handleFilterChange}
                                className="form-control" 
                              />
                            </td>
                            <td>
                              <input 
                                type="date" 
                                name="toDate"
                                value={searchFilters.toDate}
                                onChange={handleFilterChange}
                                className="form-control" 
                              />
                            </td>
                            <td>
                              <select 
                                name="status"
                                value={searchFilters.status}
                                onChange={handleFilterChange}
                                className="form-control"
                              >
                                <option value="">All Status</option>
                                <option value="single">Single</option>
                                <option value="enquiry">Enquiry</option>
                              </select>
                            </td>
                            <td>
                              <input 
                                type="text" 
                                name="item"
                                value={searchFilters.item}
                                onChange={handleFilterChange}
                                placeholder="Search item..."
                                className="form-control" 
                              />
                            </td>
                            <td>
                              <input 
                                type="text" 
                                name="user"
                                value={searchFilters.user}
                                onChange={handleFilterChange}
                                placeholder="Search user..."
                                className="form-control" 
                              />
                            </td>
                            <td>
                              <button 
                                className="btn vndrbtn me-2" 
                                onClick={handleSearch}
                              >
                                Search
                              </button>
                              <button 
                                className="btn btn-secondary" 
                                onClick={resetFilters}
                              >
                                Reset
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Data Table */}
                  <div className="RFOtable">
                    <div className="container-fluid mt-4">
                      {loading && (
                        <div className="text-center">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}
                      
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          Error: {error}
                        </div>
                      )}
                      
                      {!loading && !error && (
                        <div className="table-responsive">
                          <table className="table table-bordered table-striped">
                            <thead>
                              <tr>
                                <th>RFQ No</th>
                                <th>RFQ Type</th>
                                <th>Item No</th>
                                <th>Item Type</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>To Date</th>
                                <th>Expected Date</th>
                                <th>Project Name</th>
                                <th>Delivery Location</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData.length > 0 ? (
                                filteredData.map((rfq) => (
                                  <tr key={rfq.id}>
                                    <td>{rfq.rfq_no}</td>
                                    <td>
                                      <span className={`badge ${rfq.rfq_type === 'single' ? 'bg-primary' : 'bg-success'}`}>
                                        {rfq.rfq_type}
                                      </span>
                                    </td>
                                    <td>{rfq.item_no}</td>
                                    <td>
                                      <span className={`badge ${rfq.item === 'new' ? 'bg-info' : 'bg-warning'}`}>
                                        {rfq.item}
                                      </span>
                                    </td>
                                    <td>{rfq.quantity}</td>
                                    <td>{rfq.unit}</td>
                                    <td>{formatDate(rfq.to_date)}</td>
                                    <td>{formatDate(rfq.expected_date)}</td>
                                    <td>{rfq.project_name}</td>
                                    <td>{rfq.delivery_location}</td>
                                    <td>
                                      <button 
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => handleEdit(rfq.id)}
                                        title="Edit"
                                      >
                                        <i className="fas fa-edit"></i> Edit
                                      </button>
                                      <button 
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => handleView(rfq.id)}
                                        title="View"
                                      >
                                        <i className="fas fa-eye"></i> View
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="11" className="text-center">
                                    No RFQ data found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                      
                      {/* Pagination could be added here */}
                      {filteredData.length > 0 && (
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div>
                            Showing {filteredData.length} of {rfqData.length} entries
                          </div>
                          <button 
                            className="btn btn-outline-primary"
                            onClick={fetchRfqData}
                            disabled={loading}
                          >
                            <i className="fas fa-sync-alt"></i> Refresh
                          </button>
                        </div>
                      )}
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

export default Rfo;