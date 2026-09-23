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
    plant: "VISHWA S.I.",
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
    plant: "VISHWA S.I.",
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

            const token = localStorage.getItem("accessToken") || localStorage.getItem("token") || localStorage.getItem("access_token");
      const response = await axios.get("https://sellerp-backend.onrender.com/Sales/newsalesorder/", {
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      console.log("Sales order API response:", response.data); // temp debug — safe to remove later

      // Handle plain array, {data: [...]}, or DRF-style {results: [...]}
      let data = [];
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (Array.isArray(response.data.results)) {
        data = response.data.results;
      }

      // Highest id first
      const sortedData = [...data].sort((a, b) => (b.id || 0) - (a.id || 0));
      console.log(`Fetched ${sortedData.length} sales orders. Top id: ${sortedData[0]?.id}`); // temp debug
      setOrderList(sortedData);
        } catch (error) {
      console.error("Error fetching customer sales orders:", error);
      if (error.response) {
        console.error("Status:", error.response.status, "Data:", error.response.data);
      }
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

  // "customer" comes back as a combined "Name | Code" string (e.g. "DEEP ENGIEERS | C007")
  const splitCustomer = (customerStr) => {
    if (!customerStr) return { name: "", code: "" };
    const parts = customerStr.split("|").map((p) => p.trim());
    return { name: parts[0] || "", code: parts[1] || "" };
  };

  // There's no top-level amount field — it has to be summed from each row's item[] array
  const getRowAmount = (row) => {
    if (row.amount || row.grand_total) return row.amount || row.grand_total;
    if (Array.isArray(row.item)) {
      return row.item.reduce((sum, it) => sum + (parseFloat(it.gr_total) || 0), 0).toFixed(2);
    }
    return 0;
  };

  const handleExportExcel = () => {
    if (orderList.length === 0) {
      alert("No records available to export");
      return;
    }

        const exportData = orderList.map((row, index) => {
      const { name: custName, code: custCode } = splitCustomer(row.customer);
      return {
        "Sr.": index + 1,
        "Year": row.year || row.Year || (row.cust_date ? row.cust_date.slice(0, 4) : ""),
        "Plant": row.plant || "",
        "SO No": row.so_no || "",
        "SO Date": row.so_date || "",
        "Cust PO No": row.cust_po || "",
        "Cust PO Dt": row.po_rec_date || "",
        "Type": row.order_type || "",
        "Code": custCode,
        "Cust Name": custName,
        "Amount": getRowAmount(row),
        "PO Status": row.po_status || "",
        "Auth": row.auth || "",
        "User": row.user || row.username || ""
      };
    });

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
                            <option value="">VISHWA S.I.</option>
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
               
                                        <div className="search-results-table mt-2">
                    <TableContainer
                      component={Paper}
                      elevation={0}
                      sx={{
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        overflowY: 'scroll',
                        overflowX: 'auto',
                        maxHeight: '600px',
                        mb: 2,
                        '&::-webkit-scrollbar': { width: 10 },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: '#94a3b8', borderRadius: 4 },
                        '&::-webkit-scrollbar-track': { backgroundColor: '#f1f5f9' },
                      }}
                    >
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
                              orderList.map((row, index) => {
                              const { name: rowCustName, code: rowCustCode } = splitCustomer(row.customer);
                              return (
                              <TableRow key={row.id || index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{index + 1}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.year || row.Year || (row.cust_date ? row.cust_date.slice(0, 4) : "")}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.plant || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.so_no || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.so_date || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.cust_po || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.po_rec_date || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.order_type || ""}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{rowCustCode}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{rowCustName}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{getRowAmount(row)}</TableCell>
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
                              );
                            })
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