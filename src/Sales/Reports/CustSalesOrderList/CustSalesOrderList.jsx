import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./CustSalesOrderList.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import * as XLSX from "xlsx";

// Commented out the script tag to prevent React compilation errors, but left it here for you.
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>

const defaultOrderList = [
  {
    year: "24-25",
    plant: "Produlink",
    so_no: "SO24250001",
    so_date: "24-12-02",
    cust_po_no: "PO-9921",
    cust_po_date: "24-11-28",
    so_type: "Domestic",
    cust_code: "CUST001",
    cust_name: "Ram kumawat",
    amount: 15000,
    po_status: "Open",
    auth: "Yes",
    user: "Anupam"
  },
  {
    year: "24-25",
    plant: "Produlink",
    so_no: "SO24250002",
    so_date: "24-12-05",
    cust_po_no: "PO-8541",
    cust_po_date: "24-12-01",
    so_type: "Export",
    cust_code: "CUST002",
    cust_name: "Bajaj Auto Ltd",
    amount: 45000,
    po_status: "Completed",
    auth: "Yes",
    user: "Admin"
  }
];

const CustSalesOrderList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [orderList, setOrderList] = useState(defaultOrderList);
  const [loading, setLoading] = useState(false);

  // Search Filter States
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [plant, setPlant] = useState("");
  const [soSeries, setSoSeries] = useState("All");
  const [soType, setSoType] = useState("All");
  const [otherType, setOtherType] = useState("All");
  const [openClose, setOpenClose] = useState("All");
  const [custName, setCustName] = useState("");
  const [userSelect, setUserSelect] = useState("All User");
  const [crName, setCrName] = useState("All");

  const navigate = useNavigate();  
  
  const handleButtonClick = () => {
    navigate('/QuerySales'); 
  };

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

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = {};
      if (fromDate) params.from_date = fromDate;
      if (toDate) params.to_date = toDate;
      if (plant) params.plant = plant;
      if (soSeries !== "All") params.so_series = soSeries;
      if (soType !== "All") params.so_type = soType;
      if (otherType !== "All") params.other_type = otherType;
      if (openClose !== "All") params.open_close = openClose;
      if (custName) params.customer_name = custName;
      if (userSelect !== "All User") params.username = userSelect;

      const response = await axios.get("https://sellerp-backend.onrender.com/Sales/newsalesorder/", { params });
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setOrderList(data);
    } catch (error) {
      console.error("Error fetching customer sales orders:", error);
      const filtered = defaultOrderList.filter(row => {
        if (custName && !row.cust_name.toLowerCase().includes(custName.toLowerCase())) return false;
        if (soType !== "All" && row.so_type !== soType) return false;
        return true;
      });
      setOrderList(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleExportExcel = () => {
    if (orderList.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = orderList.map((row, index) => ({
      "Sr.": index + 1,
      "Year": row.year || row.Year || "",
      "Plant": row.plant || row.Plant || "",
      "SO No": row.so_no || row.so_number || "",
      "SO Date": row.so_date || "",
      "Cust PO No": row.cust_po_no || "",
      "Cust PO Dt": row.cust_po_date || "",
      "Type": row.so_type || "",
      "Code": row.cust_code || "",
      "Cust Name": row.cust_name || row.customer_name || "",
      "Amount": row.amount || row.grand_total || 0,
      "PO Status": row.po_status || "",
      "Auth": row.auth || "",
      "User": row.user || row.username || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cust Sales Orders");

    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Customer_Sales_Order_List.xlsx");
  };

  return (
    <div className="erp-page">
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="container-fluid py-3 overflow-hidden">
                  <div className="erp-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6 text-start">
                        <h5 className="header-title mb-0" style={{ fontSize: "22px", fontWeight: "700", color: "blue" }}> Customer Sales Order List </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        {/* Export Excel Button added here */}
                        <button type="button" className="vndrbtn me-2" onClick={handleExportExcel}>Export Excel</button>
                        <button type="button" className="vndrbtn me-2" to="#/">CustPO - Report</button>
                        <button type="button" className="vndrbtn" to="#/" onClick={handleButtonClick}>Sales Return - Query</button>             
                      </div>
                    </div>
                  </div>
                                 
                  <div className="p-3 bg-light border mb-3 rounded shadow-sm">
                    <div className="d-flex flex-wrap align-items-end gap-3 text-start">
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>From:</label>
                        <input type="date" className="form-control form-control-sm" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                      </div>
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>To:</label>
                        <input type="date" className="form-control form-control-sm" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                      </div>
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Plant:</label>
                        <select className="form-control form-control-sm" value={plant} onChange={(e) => setPlant(e.target.value)}>
                            <option value="">Produlink</option>
                        </select>
                      </div>
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>So Series:</label>
                        <select className="form-control form-control-sm" value={soSeries} onChange={(e) => setSoSeries(e.target.value)}>
                            <option value="All">All</option>
                            <option value="New">New</option>
                            <option value="Partial">Partial</option>
                            <option value="Completed">Completed</option>
                        </select>
                      </div>
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>So Type:</label>
                        <select className="form-control form-control-sm" value={soType} onChange={(e) => setSoType(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Domestic">Domestic</option>
                            <option value="Export">Export</option>
                        </select>
                      </div>
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Other Type:</label>
                        <select className="form-control form-control-sm" value={otherType} onChange={(e) => setOtherType(e.target.value)}>
                            <option value="All">All</option>
                            <option value="GST">GST</option>
                            <option value="JobWork">JobWork</option>
                        </select>
                      </div>
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Open/Close:</label>
                        <select className="form-control form-control-sm" value={openClose} onChange={(e) => setOpenClose(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Open">Open</option>
                            <option value="Close">Close</option>
                        </select>
                      </div>
                      <div>
                        <div className="d-flex align-items-center mb-1">
                            <input type="checkbox" className="me-1" id="Checkbox" style={{width: '16px', height: '16px', cursor: 'pointer'}} />
                            <label htmlFor="Checkbox" className="fw-bold mb-0" style={{fontSize: '13px', cursor: 'pointer'}}>Customer Name: </label>
                        </div>
                        <input type="text" placeholder="Name" className="form-control form-control-sm" value={custName} onChange={(e) => setCustName(e.target.value)} />
                      </div>
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>User:</label>
                        <select className="form-control form-control-sm" value={userSelect} onChange={(e) => setUserSelect(e.target.value)}>
                            <option value="All User">All User</option>
                        </select>
                      </div>
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>CR Name:</label>
                        <select className="form-control form-control-sm" value={crName} onChange={(e) => setCrName(e.target.value)}>
                            <option value="All">All</option>
                        </select>
                      </div>  
                      <div className="d-flex gap-2">
                        {/* Search button wired up */}
                        <button type="button" className="vndrbtn px-4" onClick={handleSearch} disabled={loading}>{loading ? "Searching..." : "Search"}</button>
                        <button type="button" className="vndrbtn px-4">Search Option</button>
                        <button type="button" className="vndrbtn px-4">ValidityDate</button>
                      </div>
                    </div>
                  </div>
               
                  <div className="table-responsive search-results-table mt-2">
                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 2 }}>
                      <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                        <TableHead>
                          <TableRow>
                            {['Sr.', 'Year', 'Plant', 'SO No', 'SO Date', 'Cust PO No', 'Cust PO Dt', 'Type', 'Code', 'Cust Name', 'Amount', 'PO Status', 'Auth', 'User', 'Info', 'Doc', 'Email', 'Edit', 'View', 'All'].map(h => (
                              <TableCell key={h} sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', textAlign: 'center' }}>
                                {h}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loading ? (
                            <TableRow>
                              <TableCell colSpan={20} sx={{ textAlign: 'center', py: 3, color: '#475569', fontSize: '12px' }}>Loading...</TableCell>
                            </TableRow>
                          ) : orderList.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={20} sx={{ textAlign: 'center', py: 3, color: '#475569', fontSize: '12px' }}>No records found</TableCell>
                            </TableRow>
                          ) : (
                            orderList.map((row, index) => (
                              <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{index + 1}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.year || row.Year || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.plant || row.Plant || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.so_no || row.so_number || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.so_date || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.cust_po_no || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.cust_po_date || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.so_type || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.cust_code || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.cust_name || row.customer_name || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.amount || row.grand_total || 0}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.po_status || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.auth || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.user || row.username || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}></TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
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

export default CustSalesOrderList;