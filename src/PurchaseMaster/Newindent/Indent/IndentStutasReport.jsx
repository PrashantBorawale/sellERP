import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, MenuItem } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import '../Indent/ListIndent.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";


const IndentStutasReport = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    item: '',
    mrnNo: ''
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Apply filters logic here
  };

  const clearFilters = () => {
    setFilters({
      fromDate: '',
      toDate: '',
      item: '',
      mrnNo: ''
    });
  };

  const handleExportExcel = () => {
    toast.info("No data to export");
  };

  const tableHeaders = [
    "Sr no.", "Ind No", "Item Code", "Item Desc", "Ind Qty", "Ind Date",
    "Auth Qty", "Auth Date", "Auth Days", "PO No", "PO/Ray Date",
    "PO/Ray Day", "GRN No", "GRN Date", "GRN Days", "Total Days"
  ];

  return (
    <div className="ListIndent">
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
                <div className="ListIndent-main overflow-hidden p-4">
                  <div className="container-fluid p-0">
                    
                    {/* Header */}
                    <div className="erp-header mb-4">
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <h5 className="header-title mb-0" style={{ fontWeight: 800, background: 'linear-gradient(to right, #6366f1, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
                          Indent Status Report
                        </h5>
                        
                        <div className="d-flex gap-2 flex-wrap">
                          <Button component={Link} to="/ListIndent" variant="contained" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #6366f1, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)' } }}>
                            <i className="fas fa-list-alt me-2"></i> Indent List
                          </Button>
                          <Button variant="contained" onClick={handleExportExcel} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #10b981, #059669)', boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)', '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)' } }}>
                            <i className="fas fa-file-excel me-2"></i> Export Excel
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Search Filters - Single Row */}
                    <div className="centerMain mt-4">
                      <form onSubmit={handleSearch}>
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1.5, alignItems: 'flex-end', mb: 4, width: '100%' }}>
                          
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>From Date</Typography>
                            <TextField
                              type="date"
                              size="small"
                              name="fromDate"
                              value={filters.fromDate}
                              onChange={handleFilterChange}
                              sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </Box>

                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>To Date</Typography>
                            <TextField
                              type="date"
                              size="small"
                              name="toDate"
                              value={filters.toDate}
                              onChange={handleFilterChange}
                              sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </Box>

                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Item</Typography>
                            <TextField
                              type="text"
                              size="small"
                              name="item"
                              placeholder="Search item..."
                              value={filters.item}
                              onChange={handleFilterChange}
                              sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                            />
                          </Box>

                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>MRN No</Typography>
                            <TextField
                              type="text"
                              size="small"
                              name="mrnNo"
                              placeholder="Search MRN..."
                              value={filters.mrnNo}
                              onChange={handleFilterChange}
                              sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                            />
                          </Box>

                          <Box sx={{ display: 'flex', gap: 0.5, mt: 'auto', flexShrink: 0, height: '32px' }}>
                            <Button type="submit" variant="contained" sx={{ height: '32px', minWidth: '70px', padding: '0 10px', borderRadius: '6px', textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', background: 'linear-gradient(to right, #6366f1, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)' } }}>
                              <i className="fas fa-search me-1"></i> Search
                            </Button>
                            <Button type="button" onClick={clearFilters} variant="outlined" sx={{ height: '32px', minWidth: '60px', padding: '0 10px', borderRadius: '6px', textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', color: '#64748b', borderColor: '#cbd5e1', '&:hover': { backgroundColor: '#f1f5f9', borderColor: '#94a3b8' } }}>
                              Clear
                            </Button>
                          </Box>
                        </Box>
                      </form>
                    </div>

                    {/* Table */}
                    <div className="workTable mt-4" style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
                      <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4, width: '100%', maxWidth: '100%' }}>
                        <TableContainer sx={{ maxHeight: 600, overflowX: 'auto', width: '100%', '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>
                          <Table stickyHeader size="small" sx={{ tableLayout: 'auto', minWidth: '100%' }}>
                            <TableHead>
                              <TableRow>
                                {tableHeaders.map((header, index) => (
                                  <TableCell key={index} sx={{ whiteSpace: 'normal', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px 4px', lineHeight: 1.2, textAlign: 'center' }}>
                                    {header}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell colSpan={tableHeaders.length} sx={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                    <i className="fas fa-inbox" style={{ fontSize: '2rem', color: '#cbd5e1' }}></i>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>No records found. Use the filters above to search.</Typography>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </div>

                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default IndentStutasReport;