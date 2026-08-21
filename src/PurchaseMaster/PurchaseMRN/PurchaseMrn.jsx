import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import './PurchaseMrn.css'; // Import the CSS file

const PurchaseMrn = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [mrnData, setMrnData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    plant: '',
    fromDate: '',
    toDate: '',
    mrnNo: '',
    itemCode: '',
    type: '',
    user: ''
  });

  // Filter checkbox states
  const [filterEnabled, setFilterEnabled] = useState({
    fromDate: false,
    mrnNo: false,
    itemCode: false,
    type: false
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

  // Fetch MRN data from backend
  const fetchMrnData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://sellerp-backend.onrender.com/Store/mrns/pending_mrn');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setMrnData(result.data);
        setFilteredData(result.data); // Initialize filtered data
      } else {
        setError('Failed to fetch MRN data');
      }
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
      console.error('Error fetching MRN data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchMrnData();
  }, []);

  // Apply filters when data or filters change
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mrnData, filters, filterEnabled]);

  // Apply filters to the data
  const applyFilters = () => {
    let filtered = [...mrnData];

    // Plant filter
    if (filters.plant && filters.plant !== 'all') {
      filtered = filtered.filter(mrn =>
        mrn.Plant && mrn.Plant.toLowerCase().includes(filters.plant.toLowerCase())
      );
    }

    // Date range filter (only if checkbox is checked)
    if (filterEnabled.fromDate) {
      if (filters.fromDate) {
        filtered = filtered.filter(mrn =>
          mrn.MRN_date >= filters.fromDate
        );
      }
      if (filters.toDate) {
        filtered = filtered.filter(mrn =>
          mrn.MRN_date <= filters.toDate
        );
      }
    }

    // MRN Number filter (only if checkbox is checked)
    if (filterEnabled.mrnNo && filters.mrnNo) {
      filtered = filtered.filter(mrn =>
        mrn.MRN_no && mrn.MRN_no.toLowerCase().includes(filters.mrnNo.toLowerCase())
      );
    }

    // Item Code filter (only if checkbox is checked)
    if (filterEnabled.itemCode && filters.itemCode) {
      filtered = filtered.filter(mrn =>
        mrn.NewMRNTable && mrn.NewMRNTable.some(item =>
          item.ItemCode && item.ItemCode.toLowerCase().includes(filters.itemCode.toLowerCase())
        )
      );
    }

    // Type filter (only if checkbox is checked)
    if (filterEnabled.type && filters.type && filters.type !== 'all') {
      filtered = filtered.filter(mrn =>
        mrn.NewMRNTable && mrn.NewMRNTable.some(item =>
          item.Type && item.Type.toLowerCase().includes(filters.type.toLowerCase())
        )
      );
    }

    // User filter
    if (filters.user && filters.user !== 'all') {
      filtered = filtered.filter(mrn =>
        mrn.NewMRNTable && mrn.NewMRNTable.some(item =>
          item.Employee && item.Employee.toLowerCase().includes(filters.user.toLowerCase())
        )
      );
    }

    setFilteredData(filtered);
  };

  // Handle filter input changes
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (field) => {
    setFilterEnabled(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      plant: '',
      fromDate: '',
      toDate: '',
      mrnNo: '',
      itemCode: '',
      type: '',
      user: ''
    });
    setFilterEnabled({
      fromDate: false,
      mrnNo: false,
      itemCode: false,
      type: false
    });
  };

  // Handle search button click
  const handleSearch = () => {
    applyFilters(); // Apply current filters instead of fetching new data
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
  };

  return (
    <div className="NewPurchsemrnMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Purchasemrn-header text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title">
                        Pending MRN Release List
                      </h5>
                    </div>
                  </div>
                </div>

                {/* Filter Section */}
                <div className="Purchasemrn mt-5">
                  <div className="container-fluid mt-4">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Plant</th>
                            <th>
                              <input
                                type="checkbox"
                                id="fromDateCheck"
                                checked={filterEnabled.fromDate}
                                onChange={() => handleCheckboxChange('fromDate')}
                              />
                              <label htmlFor="fromDateCheck" className="ml-2">
                                From Date
                              </label>
                            </th>
                            <th>To Date</th>
                            <th>
                              <input
                                type="checkbox"
                                id="mrnCheck"
                                checked={filterEnabled.mrnNo}
                                onChange={() => handleCheckboxChange('mrnNo')}
                              />
                              <label htmlFor="mrnCheck" className="ml-2">
                                MRN
                              </label>
                            </th>
                            <th>
                              <input
                                type="checkbox"
                                id="itemCheck"
                                checked={filterEnabled.itemCode}
                                onChange={() => handleCheckboxChange('itemCode')}
                              />
                              <label htmlFor="itemCheck" className="ml-2">
                                Item
                              </label>
                            </th>
                            <th>
                              <input
                                type="checkbox"
                                id="typeCheck"
                                checked={filterEnabled.type}
                                onChange={() => handleCheckboxChange('type')}
                              />
                              <label htmlFor="typeCheck" className="ml-2">
                                Type
                              </label>
                            </th>
                            <th>User</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <select
                                className="form-control"
                                value={filters.plant}
                                onChange={(e) => handleFilterChange('plant', e.target.value)}
                              >
                                <option value="">All Plants</option>
                                <option value="Produlink">Produlink</option>
                                <option value="Plant 1">Plant 1</option>
                                <option value="Plant 2">Plant 2</option>
                                <option value="Plant 3">Plant 3</option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="date"
                                className="form-control"
                                value={filters.fromDate}
                                onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                                disabled={!filterEnabled.fromDate}
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                className="form-control"
                                value={filters.toDate}
                                onChange={(e) => handleFilterChange('toDate', e.target.value)}
                                disabled={!filterEnabled.fromDate}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter MRN Number"
                                value={filters.mrnNo}
                                onChange={(e) => handleFilterChange('mrnNo', e.target.value)}
                                disabled={!filterEnabled.mrnNo}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Item Code"
                                value={filters.itemCode}
                                onChange={(e) => handleFilterChange('itemCode', e.target.value)}
                                disabled={!filterEnabled.itemCode}
                              />
                            </td>
                            <td>
                              <select
                                className="form-control"
                                value={filters.type}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                                disabled={!filterEnabled.type}
                              >
                                <option value="">All Types</option>
                                <option value="Regular">Regular</option>
                                <option value="Critical">Critical</option>
                                <option value="Urgent">Urgent</option>
                              </select>
                            </td>
                            <td>
                              <select
                                className="form-control"
                                value={filters.user}
                                onChange={(e) => handleFilterChange('user', e.target.value)}
                              >
                                <option value="">All Users</option>
                                <option value="harshit">Harshit</option>
                                <option value="john">John</option>
                                <option value="jane">Jane</option>
                              </select>
                            </td>
                            <td>
                              <div className="btn-group">
                                <button className="pobtn" onClick={handleSearch}>
                                  Search
                                </button>
                                <button className="btn btn-secondary btn-sm" onClick={resetFilters}>
                                  Reset
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Data Display Section */}
                <div className="Purchasemrn-data mt-4">
                  <div className="container-fluid">
                    {loading && (
                      <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}

                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}

                    {!loading && !error && (
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                          <thead className="table-dark">
                            <tr>
                              <th>S.No</th>
                              <th>Plant</th>
                              <th>MRN No</th>
                              <th>Date</th>
                              <th>Time</th>
                              <th>General</th>
                              <th>Work Order</th>
                              <th>Item Code</th>
                              <th>Description</th>
                              <th>Quantity</th>
                              <th>Unit</th>
                              <th>Type</th>
                              <th>Employee</th>
                              <th>Department</th>
                              <th>Remark</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData.length > 0 ? (
                              filteredData.map((mrn, index) => (
                                <tr key={mrn.id}>
                                  <td>{index + 1}</td>
                                  <td>{mrn.Plant || '-'}</td>
                                  <td>{mrn.MRN_no || '-'}</td>
                                  <td>{formatDate(mrn.MRN_date)}</td>
                                  <td>{mrn.MRN_time || '-'}</td>
                                  <td>
                                    <span style={{ color: 'black' }} className={`badge ${mrn.General ? 'badge-success' : 'badge-secondary'}`}>
                                      {mrn.General ? 'Yes' : 'No'}
                                    </span>
                                  </td>
                                  <td>
                                    <span style={{ color: 'black' }} className={`badge ${mrn.Work_order ? 'badge-success' : 'badge-secondary'}`}>
                                      {mrn.Work_order ? 'Yes' : 'No'}
                                    </span>
                                  </td>
                                  <td>
                                    {mrn.NewMRNTable && mrn.NewMRNTable.length > 0
                                      ? mrn.NewMRNTable[0].ItemCode
                                      : '-'}
                                  </td>
                                  <td>
                                    {mrn.NewMRNTable && mrn.NewMRNTable.length > 0
                                      ? mrn.NewMRNTable[0].Description
                                      : '-'}
                                  </td>
                                  <td>
                                    {mrn.NewMRNTable && mrn.NewMRNTable.length > 0
                                      ? mrn.NewMRNTable[0].Qty_1
                                      : '-'}
                                  </td>
                                  <td>
                                    {mrn.NewMRNTable && mrn.NewMRNTable.length > 0
                                      ? mrn.NewMRNTable[0].QtyUnit
                                      : '-'}
                                  </td>
                                  <td>
                                    {mrn.NewMRNTable && mrn.NewMRNTable.length > 0
                                      ? mrn.NewMRNTable[0].Type
                                      : '-'}
                                  </td>
                                  <td>
                                    {mrn.NewMRNTable && mrn.NewMRNTable.length > 0
                                      ? mrn.NewMRNTable[0].Employee
                                      : '-'}
                                  </td>
                                  <td>
                                    {mrn.NewMRNTable && mrn.NewMRNTable.length > 0
                                      ? mrn.NewMRNTable[0].Dept
                                      : '-'}
                                  </td>
                                  <td>
                                    {mrn.Remark_2 ||
                                      (mrn.NewMRNTable && mrn.NewMRNTable.length > 0
                                        ? mrn.NewMRNTable[0].Remark_1
                                        : '-')}
                                  </td>
                                  <td>
                                    <span style={{ color: 'black' }} className={`badge ${mrn.Approve_status === 'pending' ? 'badge-warning' :
                                        mrn.Approve_status === 'approved' ? 'badge-success' :
                                          'badge-danger'
                                      }`}>
                                      {mrn.Approve_status}
                                    </span>
                                  </td>
                                  <td>
                                    <div className="btn-group" role="group">
                                      <button className="btn btn-sm btn-success" title="Approve">
                                        <i className="fas fa-check"></i>
                                      </button>
                                      <button className="btn btn-sm btn-danger" title="Reject">
                                        <i className="fas fa-times"></i>
                                      </button>
                                      <button className="btn btn-sm btn-info" title="View Details">
                                        <i className="fas fa-eye"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="17" className="text-center">
                                  {loading ? 'Loading...' :
                                    filteredData.length === 0 && mrnData.length > 0 ?
                                      'No MRNs match the current filters' :
                                      'No pending MRNs found'}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Summary */}
                    {filteredData.length > 0 && (
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <p className="text-muted">
                            Showing {filteredData.length} of {mrnData.length} pending MRN(s)
                          </p>
                        </div>
                        <div className="col-md-6 text-right">
                          <small className="text-muted">
                            {Object.values(filterEnabled).some(Boolean) && (
                              <span className="badge badge-info">
                                Filters Applied
                              </span>
                            )}
                          </small>
                        </div>
                      </div>
                    )}
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

export default PurchaseMrn;