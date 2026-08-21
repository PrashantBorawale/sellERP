import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./GSTJobworkDCReturnList.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import * as XLSX from "xlsx";

const GSTJobworkDCReturnList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [customerName, setCustomerName] = useState("");
  const [itemName, setItemName] = useState("");
  const [challanNo, setChallanNo] = useState("");
  const [filterCustomer, setFilterCustomer] = useState(false);
  const [filterItem, setFilterItem] = useState(false);
  const [filterChallan, setFilterChallan] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleSearch = () => {
    setLoading(true);
    // Placeholder: integrate API call here when backend is ready
    setTimeout(() => {
      setTableData([]);
      setLoading(false);
    }, 500);
  };

  const handleExportExcel = () => {
    if (tableData.length === 0) {
      alert("No data to export");
      return;
    }
    
    const exportData = tableData.map((row, index) => {
      return {
        "Sr.": index + 1,
        "Year": row.year || "",
        "DC No": row.dc_no || "",
        "DC Date": row.dc_date || "",
        "Cust Code": row.cust_code || "",
        "Cust Name": row.cust_name || "",
        "Qty | ItemNo": row.qty_item_no || "",
        "User": row.user || ""
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jobwork DC Return List");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Jobwork_DC_Return_List.xlsx");
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="erp-page">
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="container-fluid py-3 overflow-hidden">
                  
                  {/* Header Section */}
                  <div className="erp-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6 text-start">
                        <h5 className="header-title mb-0" style={{ fontSize: "22px", fontWeight: "700", color: "blue" }}>Jobwork DC Return List</h5>
                      </div>
                      <div className="col-md-6 text-end d-flex justify-content-md-end gap-2 mt-3 mt-md-0 flex-wrap">
                        <button type="button" className="vndrbtn border-0 d-flex align-items-center" onClick={handleExportExcel} style={{ height: '34px' }}>
                          Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="p-3 bg-light border mb-3 rounded shadow-sm">
                    <div className="d-flex flex-wrap align-items-end gap-3 text-start">
                      
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>From Date :</label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>To Date :</label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                        />
                      </div>

                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <input
                            type="checkbox"
                            className="me-1"
                            id="chkCustomer"
                            checked={filterCustomer}
                            onChange={(e) => setFilterCustomer(e.target.checked)}
                            style={{width: '16px', height: '16px', cursor: 'pointer'}}
                          />
                          <label htmlFor="chkCustomer" className="fw-bold mb-0" style={{fontSize: '13px', cursor: 'pointer'}}>Customer Name :</label>
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Name..."
                          className="form-control form-control-sm"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          disabled={!filterCustomer}
                        />
                      </div>

                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <input
                            type="checkbox"
                            className="me-1"
                            id="chkItem"
                            checked={filterItem}
                            onChange={(e) => setFilterItem(e.target.checked)}
                            style={{width: '16px', height: '16px', cursor: 'pointer'}}
                          />
                          <label htmlFor="chkItem" className="fw-bold mb-0" style={{fontSize: '13px', cursor: 'pointer'}}>Item Name :</label>
                        </div>
                        <input
                          type="text"
                          placeholder=""
                          className="form-control form-control-sm"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                          disabled={!filterItem}
                        />
                      </div>

                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <input
                            type="checkbox"
                            className="me-1"
                            id="chkChallan"
                            checked={filterChallan}
                            onChange={(e) => setFilterChallan(e.target.checked)}
                            style={{width: '16px', height: '16px', cursor: 'pointer'}}
                          />
                          <label htmlFor="chkChallan" className="fw-bold mb-0" style={{fontSize: '13px', cursor: 'pointer'}}>Challan No :</label>
                        </div>
                        <input
                          type="text"
                          placeholder="DC No."
                          className="form-control form-control-sm"
                          value={challanNo}
                          onChange={(e) => setChallanNo(e.target.value)}
                          disabled={!filterChallan}
                        />
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="vndrbtn px-4 border-0 d-flex align-items-center justify-content-center gap-1"
                          onClick={handleSearch}
                          disabled={loading}
                          style={{ height: '34px' }}
                        >
                          <i className="fas fa-search" style={{ fontSize: "10px" }}></i> 
                          {loading ? "Searching..." : "Search"}
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive search-results-table mt-2" style={{ overflowX: 'auto', width: '100%' }}>
                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflowX: 'auto', overflowY: 'hidden', mb: 2 }}>
                      <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                        <TableHead>
                          <TableRow>
                            {['Sr.', 'Year', 'DC No', 'DC Date', 'Cust Code', 'Cust Name', 'Qty | ItemNo', 'User', 'Edit', 'Del.', 'View'].map(h => (
                              <TableCell key={h} sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', textAlign: 'center' }}>
                                {h}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loading ? (
                            <TableRow>
                              <TableCell colSpan={11} sx={{ textAlign: 'center', py: 4, color: '#475569' }}>Loading data...</TableCell>
                            </TableRow>
                          ) : tableData.length > 0 ? (
                            tableData.map((row, index) => (
                              <TableRow hover key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{index + 1}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.year}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.dc_no}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.dc_date}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.cust_code}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'left' }}>{row.cust_name}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.qty_item_no}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{row.user}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}><i className="fas fa-edit text-dark" style={{ cursor: "pointer" }}></i></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}><i className="fas fa-trash text-dark" style={{ cursor: "pointer" }}></i></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}><i className="fas fa-eye text-dark" style={{ cursor: "pointer" }}></i></TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={11} sx={{ textAlign: 'center', py: 4, color: '#475569' }}>No records found</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>

                  {/* Footer */}
                  <div className="GSTJobworkDCReturnList-footer d-flex flex-wrap justify-content-between align-items-center gap-2" style={{ backgroundColor: '#f4f4f4', padding: '10px 15px', borderTop: '2px solid #ddd', fontSize: '12px', fontWeight: 'bold', marginTop: '10px' }}>
                    <div>
                      Total Record's : {tableData.length}
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

export default GSTJobworkDCReturnList;
