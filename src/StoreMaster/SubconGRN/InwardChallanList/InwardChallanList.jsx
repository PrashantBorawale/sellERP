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
  const [loading, setLoading] = useState(true);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const fetchInwardChallanList = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://sellerp-backend.onrender.com/Store/InwardChallan/');
      const data = await response.json();
      console.log('Fetched data:', data);
      setInwardChallanList(data);
    } catch (error) {
      console.error('Error fetching inward challan list:', error);
    } finally {
      setLoading(false);
    }
  };

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
                    <div className="col-md-6 d-flex justify-content-end align-items-center gap-3">
                      <Typography sx={{ fontWeight: 600, color: '#475569' }}>QC Pending:4 , Partial : 1</Typography>
                      <Button variant="contained" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white', boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)' }}>GRN : Report</Button>
                      <Button variant="contained" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white', boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)' }}>57F4-Inward - Query</Button>
                    </div>
                  </div>
                </div>

                <div className="InwardList-main">
                  <Paper elevation={0} sx={{ mb: 4, p: 3, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
                  <div className="container-fluid text-start px-0">
                    <div className="row mt-2 mb-3">
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="fromDate">From Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="fromDate"
                        />
                      </div>
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="toDate">To Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="toDate"
                        />
                      </div>
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="plant">Plant</label>
                        <select className="form-control" id="plant">
                          <option>Produlink</option>
                        </select>
                      </div>
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="type">Type</label>
                        <select className="form-control" id="type">
                          <option>ALL</option>
                        </select>
                      </div>
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="series">Series</label>
                        <select className="form-control" id="series">
                          <option>Select</option>
                          <option>57F4 Inward</option>
                          <option>57F4 Return</option>
                          <option>Jobwork 57F4 Inward</option>
                          <option>Non Returnable Inward</option>
                          <option>Vendor Scrap Inward</option>
                          <option>Inward Tool</option>
                          <option>Cust Rework</option>
                        </select>
                      </div>
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="f4Status">F4 Status</label>
                        <select className="form-control" id="f4Status">
                          <option>ALL</option>
                        </select>
                      </div>
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="vendorCustomerName">V Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="vendorCustomerName"
                        />
                      </div>
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="itemCodeNo">ItemCodeNo:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="itemCodeNo"
                        />
                      </div>
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="partCode">Part Code:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="partCode"
                        />
                      </div>
                      <div className="col-12 col-md">
                        <label className="form-label mb-1" htmlFor="inward">Inward</label>
                        <select className="form-control" id="inward">
                          <option>Select Inward</option>
                        </select>
                      </div>
                      <div className="col-12 col-md text-start">
                        <label className="form-label mb-1" htmlFor="critical">Is Critical</label>
                        <br />
                        <button type="button" className="btn btn-primary btn-sm">
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
                          ) : inwardChallanList.length > 0 ? (
                            inwardChallanList.map((challan, index) => (
                              <TableRow key={challan.id || index} hover sx={{ "&:last-child td, &:last-child th": { border: 0 }, transition: "all 0.2s ease", "&:hover": { backgroundColor: "#f1f5f9" } }}>
                                <TableCell sx={{ color: '#475569', fontSize: '0.65rem', wordBreak: 'break-word', whiteSpace: 'normal', padding: '2px 2px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}><div className="cell-clamp-f4">{index + 1}</div></TableCell>
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

                  <div className="InwardList-bottom mt-3">
                    <div className="row text-end">
                      <div className="col-md-12">
                        <Typography sx={{ fontWeight: 600, color: '#475569' }}>Total Records: {inwardChallanList.length}</Typography>
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