import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./OutwardChallanList.css";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const OutwardChallanList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [challanList, setChallanList] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const fetchOutwardChallanList = async () => {
    try {
      const res = await fetch("https://sellerp-backend.onrender.com/Sales/onward-challans/");
      const responseData = await res.json();
      console.log(responseData);
      setChallanList(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewPdf = (challanNo) => {
    window.open(
      `https://sellerp-backend.onrender.com/Sales/onwardchallan/pdf/${challanNo}/`,
      "_blank"
    );
  };

  const formatItemsDisplay = (items) => {
    if (!items || items.length === 0) {
      return "No items";
    }
    return items
      .map((item) => `${item.item_code} | ${item.description} | ${item.qtyNo}`)
      .join(", ");
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
    fetchOutwardChallanList();
  }, [sideNavOpen]);

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
                  
                  {/* Header Section */}
                  <div className="erp-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-4 text-start">
                        <h5 className="header-title mb-0" style={{ fontSize: "22px", fontWeight: "700", color: "blue" }}>Outward Challan List</h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="vndrbtn px-4" to="#/">
                          F7 Outward Report
                        </button>
                        <button
                          type="button"
                          className="vndrbtn px-4 ms-2"
                          onClick={handleButtonClick}
                        >
                          Outward Challan Query
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="p-3 bg-light border mb-3 rounded shadow-sm">
                    <div className="d-flex flex-wrap align-items-end gap-3 text-start">
                      
                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>From Date :</label>
                        <input type="date" className="form-control form-control-sm" />
                      </div>

                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>To Date :</label>
                        <input type="date" className="form-control form-control-sm" />
                      </div>

                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Plant :</label>
                        <select className="form-select form-select-sm">
                          <option value="">Produlink</option>
                        </select>
                      </div>

                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Series :</label>
                        <select className="form-select form-select-sm">
                          <option value="">Select</option>
                          <option value="">57F4</option>
                          <option value="">Rework</option>
                          <option value="">Maintenance</option>
                          <option value="">Open</option>
                          <option value="">Not For Bill</option>
                          <option value="">Tool And Die</option>
                        </select>
                      </div>

                      <div>
                        <label className="fw-bold mb-1" style={{fontSize: '12px'}}>Status :</label>
                        <select className="form-select form-select-sm">
                          <option value="">All</option>
                          <option value="">New</option>
                          <option value="">Partial</option>
                          <option value="">Completed</option>
                        </select>
                      </div>

                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <input type="checkbox" className="me-1" id="chkVendor" style={{width: '16px', height: '16px', cursor: 'pointer'}} />
                          <label htmlFor="chkVendor" className="fw-bold mb-0" style={{fontSize: '13px', cursor: 'pointer'}}>Vendor Name :</label>
                        </div>
                        <input type="text" placeholder="Name" className="form-control form-control-sm" />
                      </div>

                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <input type="checkbox" className="me-1" id="chkItem" style={{width: '16px', height: '16px', cursor: 'pointer'}} />
                          <label htmlFor="chkItem" className="fw-bold mb-0" style={{fontSize: '13px', cursor: 'pointer'}}>Select Item :</label>
                        </div>
                        <input type="text" placeholder="" className="form-control form-control-sm" />
                      </div>

                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <input type="checkbox" className="me-1" id="chkOutNo" style={{width: '16px', height: '16px', cursor: 'pointer'}} />
                          <label htmlFor="chkOutNo" className="fw-bold mb-0" style={{fontSize: '13px', cursor: 'pointer'}}>F4 Out No :</label>
                        </div>
                        <input type="text" placeholder="No" className="form-control form-control-sm" />
                      </div>

                      <div className="d-flex gap-2">
                        <button type="button" className="vndrbtn px-4 d-flex align-items-center gap-1">
                          <i className="fas fa-search" style={{ fontSize: "10px" }}></i> 
                          Search
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
                            {['Sr.', 'Challan No', 'Challan Date', 'DC No', 'Transport Name', 'Vehicle No', 'Estimated Value', 'EWay Bill No', 'Vendor Name', 'Items', 'Rev Charges', 'Remarks', 'View PDF'].map(h => (
                              <TableCell key={h} sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'normal', textAlign: 'center' }}>
                                {h}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {challanList.length > 0 ? (
                            challanList.map((challan, index) => (
                              <TableRow hover key={challan.challan_no} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{index + 1}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{challan.challan_no}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{challan.challan_date}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{challan.DC_no}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{challan.Transport_name}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{challan.vehical_no}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{challan.Estimated_value}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{challan.EWay_bill_no}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{challan.vender}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'left' }}>
                                  {formatItemsDisplay(challan.items)}
                                </TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{challan.rev_charges}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>{challan.remarks}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'normal', textAlign: 'center' }}>
                                  <button
                                    type="button"
                                    className="btn btn-sm"
                                    style={{ backgroundColor: '#16bfff', color: 'white', fontSize: '10px', padding: '2px 8px' }}
                                    onClick={() => handleViewPdf(challan.id)}
                                  >
                                    View PDF
                                  </button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={13} sx={{ textAlign: 'center', py: 4, color: '#475569' }}>
                                No challan data available
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>

                  {/* Footer */}
                  <div className="OutwardChallanList-footer d-flex flex-wrap justify-content-between align-items-center gap-2" style={{ backgroundColor: '#f4f4f4', padding: '10px 15px', borderTop: '2px solid #ddd', fontSize: '12px', fontWeight: 'bold', marginTop: '10px' }}>
                    <div>
                      Total Record's : {challanList.length}
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

export default OutwardChallanList;
