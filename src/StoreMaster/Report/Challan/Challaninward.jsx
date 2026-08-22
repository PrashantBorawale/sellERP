import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import { Tooltip, IconButton } from "@mui/material";
import { FaCheckCircle, FaFileInvoiceDollar, FaEnvelope, FaEdit, FaEye } from "react-icons/fa";
import "./Challaninward.css";

const Challaninward = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  
  // Sample data from the JSON
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  
  // Filter states
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    plant: '',
    type: '',
    series: '',
    f4Status: '',
    vendorName: '',
    itemCode: '',
    partCode: '',
    inwardNo: ''
  });

  const fetchAllData = async ()=>{
    try{
      const res = await fetch('https://sellerp-backend.onrender.com/Store/InwardChallan/');
      const resData = await res.json();
      setAllData(resData);
      setFilteredData(resData)
    }catch(err){
      console.log(err);
    }
  }


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

  useEffect(()=>{
    fetchAllData();
  }, [])

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters
  const applyFilters = (e) => {
    e.preventDefault();
    
    let filtered = allData.filter(item => {
      // Date range filter
      if (filters.fromDate && new Date(item.InwardDate) < new Date(filters.fromDate)) {
        return false;
      }
      if (filters.toDate && new Date(item.InwardDate) > new Date(filters.toDate)) {
        return false;
      }
      
      // Plant filter
      if (filters.plant && item.Plant !== filters.plant) {
        return false;
      }
      
      // Series filter
      if (filters.series && item.Series !== filters.series) {
        return false;
      }
      
      // Vendor name filter
      if (filters.vendorName && !item.SupplierName?.toLowerCase().includes(filters.vendorName.toLowerCase())) {
        return false;
      }
      
      // Item code filter
      if (filters.itemCode) {
        const hasItemCode = item.InwardChallanGSTDetails?.some(detail => 
          detail.ItemCode?.toLowerCase().includes(filters.itemCode.toLowerCase())
        );
        if (!hasItemCode) return false;
      }
      
      // Part code filter (using ItemCode from GST details)
      if (filters.partCode) {
        const hasPartCode = item.InwardChallanGSTDetails?.some(detail => 
          detail.ItemCode?.toLowerCase().includes(filters.partCode.toLowerCase())
        );
        if (!hasPartCode) return false;
      }
      
      // Inward number filter
      if (filters.inwardNo && !item.InwardF4No?.includes(filters.inwardNo)) {
        return false;
      }
      
      return true;
    });
    
    setFilteredData(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      fromDate: '',
      toDate: '',
      plant: '',
      type: '',
      series: '',
      f4Status: '',
      vendorName: '',
      itemCode: '',
      partCode: '',
      inwardNo: ''
    });
    setFilteredData(allData);
  };

  return (
    <div className="Challaninward">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Challaninward-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="header-title mb-0">Inward Challan List</h5>
                    <div className="d-flex gap-2">
                      <Link className="vndrbtn">GRN Report</Link>
                      <Link type="button" className="vndrbtn" to="/ChallanQuery">57F4-Inward Query</Link>
                    </div>
                  </div>
                </div>
                
                <div className="Challaninward-main mt-3">
                  <div className="container-fluid p-0">
                    <div className="card shadow-sm border-0 mb-4 mt-4" style={{ borderRadius: '12px' }}>
                      <div className="card-body">
                        <form className="row g-3 text-start" onSubmit={applyFilters}>
                          {/* From Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">From Date</label>
                            <input 
                              type="date" 
                              className="form-control" 
                              name="fromDate"
                              value={filters.fromDate}
                              onChange={handleFilterChange}
                            />
                          </div>

                          {/* To Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">To Date</label>
                            <input 
                              type="date" 
                              className="form-control" 
                              name="toDate"
                              value={filters.toDate}
                              onChange={handleFilterChange}
                            />
                          </div>

                          {/* Plant */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select 
                              className="form-select"
                              name="plant"
                              value={filters.plant}
                              onChange={handleFilterChange}
                            >
                              <option value="">All Plants</option>
                              <option value="VISHWA S.I.">VISHWA S.I.</option>
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Type</label>
                            <select 
                              className="form-select"
                              name="type"
                              value={filters.type}
                              onChange={handleFilterChange}
                            >
                              <option value="">ALL</option>
                              <option value="Purchase">Purchase</option>
                              <option value="Job Work">Job Work</option>
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Series</label>
                            <select 
                              className="form-select"
                              name="series"
                              value={filters.series}
                              onChange={handleFilterChange}
                            >
                              <option value="">All Series</option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">F4 Status</label>
                            <select 
                              className="form-select"
                              name="f4Status"
                              value={filters.f4Status}
                              onChange={handleFilterChange}
                            >
                              <option value="">ALL</option>
                              <option value="Pending">Pending</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>

                          {/* Supplier Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">VenderCustomer Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                              name="vendorName"
                              value={filters.vendorName}
                              onChange={handleFilterChange}
                            />
                          </div>

                          {/* Item Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Item Code No</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Item Code"
                              name="itemCode"
                              value={filters.itemCode}
                              onChange={handleFilterChange}
                            />
                          </div>

                          {/* Part Code */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Part Code</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Part Code"
                              name="partCode"
                              value={filters.partCode}
                              onChange={handleFilterChange}
                            />
                          </div>

                          {/* Inward No */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Inward No</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter No."
                              name="inwardNo"
                              value={filters.inwardNo}
                              onChange={handleFilterChange}
                            />
                          </div>

                          {/* Search Button */}
                          <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="vndrbtn w-100">
                              Search
                            </button>
                          </div>

                          {/* Reset Button */}
                          <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button type="button" className="btn btn-secondary w-100" onClick={resetFilters}>
                              Reset
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreChallaninward mt-4">
                    <div className="container-fluid p-0 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Year</th>
                              <th>Plant</th>
                              <th>Inward No</th>
                              <th>Inward Date</th>
                              <th>Type</th>
                              <th>Challan No</th>
                              <th>Challan Date</th>
                              <th>Code</th>
                              <th>Name</th>
                              <th>F4 Cust No</th>                           
                              <th>Item Qty/Desc</th>
                              <th>User</th>
                              <th>Qc</th>
                              <th>Bill</th>
                              <th>Email</th>
                              <th>Edit</th>
                              <th>View</th>
                            </tr>
                          </thead>

                          <tbody>
                            {filteredData.map((item, index) => (
                              <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{new Date(item.InwardDate).getFullYear()}</td>
                                <td>{item.Plant || 'N/A'}</td>
                                <td>{item.InwardF4No}</td>
                                <td>{item.InwardDate}</td>
                                <td>Purchase</td>
                                <td>{item.ChallanNo}</td>
                                <td>{item.ChallanDate}</td>
                                <td>{item.InwardChallanGSTDetails?.[0]?.ItemCode || 'N/A'}</td>
                                <td>{item.SupplierName || 'N/A'}</td>
                                <td>{item.InwardF4No}</td>
                                <td>
                                  {item.InwardChallanTable?.map((tableItem, idx) => (
                                    <div key={idx}>
                                      {tableItem.InQtyNOS} {tableItem.Unit} - {tableItem.ItemDescription}
                                    </div>
                                  ))}
                                </td>
                                <td>{item.PreparedBy}</td>
                                <td>
                                  <Tooltip title="Quality Control">
                                    <IconButton size="small" sx={{ color: '#0ea5e9', '&:hover': { bgcolor: '#e0f2fe' } }}><FaCheckCircle size={16} /></IconButton>
                                  </Tooltip>
                                </td>
                                <td>
                                  <Tooltip title="Generate Bill">
                                    <IconButton size="small" sx={{ color: '#10b981', '&:hover': { bgcolor: '#d1fae5' } }}><FaFileInvoiceDollar size={16} /></IconButton>
                                  </Tooltip>
                                </td>
                                <td>
                                  <Tooltip title="Send Email">
                                    <IconButton size="small" sx={{ color: '#6366f1', '&:hover': { bgcolor: '#e0e7ff' } }}><FaEnvelope size={16} /></IconButton>
                                  </Tooltip>
                                </td>
                                <td>
                                  <Tooltip title="Edit Record">
                                    <IconButton size="small" sx={{ color: '#f59e0b', '&:hover': { bgcolor: '#fef3c7' } }}><FaEdit size={16} /></IconButton>
                                  </Tooltip>
                                </td>
                                <td>
                                  <Tooltip title="View Document">
                                    <IconButton size="small" onClick={() => window.open('https://sellerp-backend.onrender.com/Store/InwardChallan/pdf/' + item.id + '/', '_blank')} sx={{ color: '#64748b', '&:hover': { bgcolor: '#f1f5f9' } }}><FaEye size={16} /></IconButton>
                                  </Tooltip>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {filteredData.length === 0 && (
                        <div className="text-center mt-4">
                          <p>No data found matching the selected filters.</p>
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

export default Challaninward;