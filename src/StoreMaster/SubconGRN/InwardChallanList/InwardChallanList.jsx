import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./InwardChallanList.css";
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";

const InwardChallanList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [inwardChallanList, setInwardChallanList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [series, setSeries] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [itemCodeNo, setItemCodeNo] = useState("");

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const fetchInwardChallanList = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://sellerp-backend.onrender.com/Store/InwardChallan/');
      let data = await response.json();
      
      let fetchedList = [];
      if (Array.isArray(data)) {
        fetchedList = data;
      } else if (data.data && Array.isArray(data.data)) {
        fetchedList = data.data;
      }

      // Sort highest ID at the top
      fetchedList.sort((a, b) => {
        const idA = parseInt(a.id || a.pk || 0, 10);
        const idB = parseInt(b.id || b.pk || 0, 10);
        return idB - idA;
      });

      console.log('Fetched data:', fetchedList);
      setInwardChallanList(fetchedList);
      setFilteredData(fetchedList);
    } catch (error) {
      console.error('Error fetching inward challan list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    let filtered = inwardChallanList;

    if (fromDate) {
      filtered = filtered.filter(item => item.InwardDate && item.InwardDate >= fromDate);
    }
    if (toDate) {
      filtered = filtered.filter(item => item.InwardDate && item.InwardDate <= toDate);
    }
    if (series) {
      filtered = filtered.filter(item => item.Series && item.Series.toLowerCase().includes(series.toLowerCase()));
    }
    if (supplierName) {
      filtered = filtered.filter(item => item.SupplierName && item.SupplierName.toLowerCase().includes(supplierName.toLowerCase()));
    }
    if (itemCodeNo) {
      filtered = filtered.filter(item => {
        if (item.InwardChallanTable && Array.isArray(item.InwardChallanTable)) {
          return item.InwardChallanTable.some(row => 
            (row.ItemCodeNo && row.ItemCodeNo.toLowerCase().includes(itemCodeNo.toLowerCase())) ||
            (row.ItemDescription && row.ItemDescription.toLowerCase().includes(itemCodeNo.toLowerCase()))
          );
        }
        return false;
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentInwardChallanList = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatItemsDisplay = (inwardChallanTable) => {
    if (!inwardChallanTable || inwardChallanTable.length === 0) {
      return 'No items';
    }

    return inwardChallanTable.map(item =>
      `${item.InQtyNOS || 0} | ${item.ItemDescription || 'N/A'}`
    ).join(', ');
  };

  const handleViewPdf = (challan) => {
    const viewPath = challan?.View || challan?.PDF_Link || challan?.pdf || challan?.file || challan?.document;
    if (viewPath && viewPath !== "null" && viewPath !== "undefined" && viewPath !== "") {
      let url = viewPath;
      if (viewPath.startsWith("http://") || viewPath.startsWith("https://")) {
        url = viewPath;
      } else if (viewPath.startsWith("/")) {
        url = `https://sellerp-backend.onrender.com${viewPath}`;
      } else {
        url = `https://sellerp-backend.onrender.com/${viewPath}`;
      }
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (challan?.id || typeof challan === "number" || typeof challan === "string") {
      const id = challan?.id || challan;
      window.open(`https://sellerp-backend.onrender.com/Store/InwardChallan/pdf/${id}/`, "_blank", "noopener,noreferrer");
    } else {
      alert("No PDF document available for this inward challan.");
    }
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
    fetchInwardChallanList();
  }, [sideNavOpen]);

  return (
    <div className="NewStoreInwardList">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content \${sideNavOpen ? "shifted" : ""}`}>
                <div className="InwardList-header mb-4 text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-6 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          Inward Challan List
                        </Typography>
                    </div>
                    
                  </div>
                </div>

                <div className="InwardList-main">
                  <Paper elevation={0} sx={{ mb: 4, p: 3, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
                  <div className="container-fluid text-start px-0">
                    <div className="row mt-2 mb-3 align-items-end">
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="fromDate">From Date</label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          id="fromDate"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                        />
                      </div>
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="toDate">To Date</label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          id="toDate"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                        />
                      </div>
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="plant">Plant</label>
                        <select className="form-control form-control-sm" id="plant">
                          <option>VISHWA S.I.</option>
                        </select>
                      </div>
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="series">Series</label>
                        <select className="form-control form-control-sm" id="series" value={series} onChange={(e) => setSeries(e.target.value)}>
                          <option value="">Select</option>
                          <option value="57F4 Inward">57F4 Inward</option>
                          <option value="57F4 Return">57F4 Return</option>
                          <option value="Jobwork 57F4 Inward">Jobwork 57F4 Inward</option>
                          <option value="Non Returnable Inward">Non Returnable Inward</option>
                          <option value="Vendor Scrap Inward">Vendor Scrap Inward</option>
                          <option value="Inward Tool">Inward Tool</option>
                          <option value="Cust Rework">Cust Rework</option>
                        </select>
                      </div>
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="supplierName">Supplier</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="supplierName"
                          placeholder="Supplier"
                          value={supplierName}
                          onChange={(e) => setSupplierName(e.target.value)}
                        />
                      </div>
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="itemCodeNo">ItemCodeNo</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="itemCodeNo"
                          placeholder="ItemCodeNo"
                          value={itemCodeNo}
                          onChange={(e) => setItemCodeNo(e.target.value)}
                        />
                      </div>
                      <div className="col-12 col-md-auto">
                        <button type="button" className="btn btn-primary btn-sm w-100" onClick={handleSearchClick}>
                          Search
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="InwardList-table mt-4">
                    <TableContainer sx={{ maxHeight: 500, overflowX: 'hidden', border: '1px solid #e2e8f0', borderRadius: '8px', '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>
                      <Table stickyHeader size="small" sx={{ width: '100%', tableLayout: 'fixed' }}>
                        <TableHead>
                          <TableRow>
                            {['Sr no.', 'Inward F4 No', 'Inward Date', 'Inward Time', 'Challan No.', 'Challan Date', 'Invoice No', 'Invoice Date', 'Supplier Name', 'Vehicle No', 'Transporter', 'Item Qty | Desc', 'Prepared By', 'Checked By', 'Total Items', 'Remarks', 'View PDF'].map((th, index) => {
                              const colWidths = ["3.5%", "5.5%", "5.5%", "5%", "5.5%", "5.5%", "5.5%", "5.5%", "9.5%", "5.5%", "6%", "11.5%", "5.5%", "5.5%", "4.5%", "5.5%", "5%"];
                              return (
                                <TableCell key={th} sx={{ wordBreak: 'break-word', whiteSpace: 'normal', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.58rem', lineHeight: '1.1', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '3px 2px', textAlign: 'center', width: colWidths[index] }}>
                                  <div className="cell-clamp-f4">
                                    {th}
                                  </div>
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loading ? (
                            <TableRow>
                              <TableCell colSpan={17} sx={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>Loading...</TableCell>
                            </TableRow>
                          ) : currentInwardChallanList.length > 0 ? (
                            currentInwardChallanList.map((challan, index) => (
                              <TableRow key={challan.id || index} hover sx={{ "&:last-child td, &:last-child th": { border: 0 }, transition: "all 0.2s ease", "&:hover": { backgroundColor: "#f1f5f9" } }}>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{(currentPage - 1) * itemsPerPage + index + 1}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{challan.InwardF4No || 'N/A'}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{challan.InwardDate || 'N/A'}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{challan.InwardTime || 'N/A'}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{challan.ChallanNo || 'N/A'}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{challan.ChallanDate || 'N/A'}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{challan.InvoiceNo || 'N/A'}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{challan.InvoiceDate || 'N/A'}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{challan.SupplierName || 'N/A'}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{challan.VehicleNo || 'N/A'}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{challan.Transporter || 'N/A'}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>
                                  <div className="cell-clamp-f4">
                                    {formatItemsDisplay(challan.InwardChallanTable)}
                                  </div>
                                </TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{challan.PreparedBy || 'N/A'}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{challan.CheckedBy || 'N/A'}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{challan.TotalItem || 'N/A'}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{challan.Remark || 'N/A'}</div></TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>
                                  <Button size="small" variant="outlined" sx={{ textTransform: 'none', fontSize: '0.62rem', p: '1px 4px', minWidth: 0 }} onClick={() => handleViewPdf(challan)}>View PDF</Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={17} sx={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>No inward challan data available</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="d-flex justify-content-end align-items-center mt-3 mb-2 px-2" style={{ backgroundColor: '#fff' }}>
                      <span className="me-3" style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>
                        Page {currentPage} of {totalPages}
                      </span>
                      <div className="btn-group shadow-sm">
                        <button
                          className="btn btn-light border"
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          style={{ padding: "4px 12px", fontSize: "0.85rem", fontWeight: 600 }}
                        >
                          Prev
                        </button>
                        <button
                          className="btn btn-light border"
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          style={{ padding: "4px 12px", fontSize: "0.85rem", fontWeight: 600 }}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="InwardList-bottom mt-3">
                    <div className="row text-end">
                      <div className="col-md-12">
                        <Typography sx={{ fontWeight: 600, color: '#475569' }}>Total Records: {filteredData.length}</Typography>
                      </div>
                    </div>
                  </div>
                  </Paper>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InwardChallanList;