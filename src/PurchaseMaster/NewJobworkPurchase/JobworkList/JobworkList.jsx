import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, TextField, MenuItem, Tooltip, Select } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import './JobworkList.css';
import { fetchJobWorkPOList, deleteJobworkPO } from "../../../Service/PurchaseApi.jsx";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";

const JobworkList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const toggleSideNav = () => setSideNavOpen(prev => !prev);
        
  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const [jobWorkData, setJobWorkData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchJobWorkPOList();
        setJobWorkData(data.sort((a, b) => b.id - a.id));
        setFilteredData(data.sort((a, b) => b.id - a.id));
      } catch (error) {
        console.error("Failed to load Job Work PO List", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const filtered = jobWorkData.filter(item =>
      (item.PoNo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.Name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setPage(1); // Reset to first page on search
  }, [searchTerm, jobWorkData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this PO?")) return;

    const success = await deleteJobworkPO(id);

    if (success) {
      alert("Jobwork PO deleted successfully!");
      setJobWorkData(prev => prev.filter(item => item.id !== id));
      setFilteredData(prev => prev.filter(item => item.id !== id));
    } else {
      alert("Failed to delete. Please try again.");
    }
  };

  const handleExportExcel = () => {
    if (filteredData.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = filteredData.map((item, index) => ({
      "Sr No.": index + 1,
      "Plant": item.Plant || "",
      "Po No": item.PoNo || "",
      "Po Date": item.PoDate || "",
      "Po Type": item.PoType || "",
      "Supplier/Vendor Name": item.Name || "",
      "Code No": item.number || "",
      "User": item.User || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jobwork Order List");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Jobwork_Order_List.xlsx");
  };

  const handleViewPdf = (item) => {
    const viewPath = item?.View || item?.pdf || item?.file;
    if (!viewPath || viewPath === "null" || viewPath === "undefined") {
      alert(`No PDF document attached to JW-PO: ${item?.PoNo || "this order"}`);
      return;
    }
    let url = viewPath;
    if (viewPath.startsWith("http://") || viewPath.startsWith("https://")) {
      url = viewPath;
    } else if (viewPath.startsWith("/")) {
      url = `https://sellerp-backend.onrender.com${viewPath}`;
    } else {
      url = `https://sellerp-backend.onrender.com/${viewPath}`;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="erp-page JobworkList">
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
                <div className="JobworkList-main overflow-hidden p-4">
                  <div className="container-fluid p-0">
                    
                    {/* Header */}
                    <div className="erp-header mb-4">
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <h5 className="header-title mb-0" style={{ fontWeight: 800, background: 'linear-gradient(to right, #6366f1, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
                          Jobwork Order List
                        </h5>
                        
                        <div className="d-flex gap-2 flex-wrap">
                          <Button variant="contained" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #6366f1, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)' } }}>
                            <i className="fas fa-list-alt me-2"></i> Recently Po Approval List
                          </Button>
                          <Button variant="contained" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #6366f1, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)' } }}>
                            <i className="fas fa-file-invoice me-2"></i> AMC Purchase Order List
                          </Button>
                          <Button variant="contained" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #6366f1, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)' } }}>
                            <i className="fas fa-search me-2"></i> Purchase Order Query
                          </Button>
                          <Button variant="contained" onClick={handleExportExcel} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #10b981, #059669)', boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)', '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)' } }}>
                            <i className="fas fa-file-excel me-2"></i> Export Excel
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Filters Section */}
                    <div className="centerMain mt-4">
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-end', mb: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: '150px' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>Plant</Typography>
                          <TextField
                            select
                            size="small"
                            defaultValue="select"
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#fff' } }}
                          >
                            <MenuItem value="select">Select All</MenuItem>
                            <MenuItem value="Produlink">Produlink</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: '150px' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>From</Typography>
                          <TextField
                            type="date"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#fff' } }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: '150px' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>To Date</Typography>
                          <TextField
                            type="date"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#fff' } }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: '200px' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>Supplier Name / PO No</Typography>
                          <TextField
                            type="text"
                            size="small"
                            placeholder="Search by PO No / Supplier"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#fff' } }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: '120px' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>PO Type</Typography>
                          <TextField select size="small" defaultValue="all" sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#fff' } }}>
                            <MenuItem value="all">Select All</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: '120px' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>Series</Typography>
                          <TextField select size="small" defaultValue="all" sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#fff' } }}>
                            <MenuItem value="all">Select All</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: '120px' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>Item Group</Typography>
                          <TextField select size="small" defaultValue="all" sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#fff' } }}>
                            <MenuItem value="all">Select All</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: '120px' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>PO Status</Typography>
                          <TextField select size="small" defaultValue="all" sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#fff' } }}>
                            <MenuItem value="all">Select All</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: '120px' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>All User</Typography>
                          <TextField select size="small" defaultValue="all" sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#fff' } }}>
                            <MenuItem value="all">Select All</MenuItem>
                          </TextField>
                        </Box>
                      </Box>
                    </div>

                    {/* Data Table */}
                    <div className="workTable mt-4">
                      <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>
                        <TableContainer sx={{ maxHeight: 600, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>
                          <Table stickyHeader size="small" sx={{ tableLayout: 'auto', minWidth: '1000px' }}>
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Sr no.</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Plant</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Po No</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Po Date</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Po Type</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Supplier/Vendor Name</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Code No</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>User</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>View</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Edit</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Delete</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {loading ? (
                                <TableRow>
                                  <TableCell colSpan={11} sx={{ textAlign: 'center', py: 4, color: '#64748b' }}>
                                    <div className="spinner-border text-primary" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ) : currentData.length > 0 ? (
                                currentData.map((item, index) => (
                                  <TableRow key={item.id || index} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>{(page - 1) * itemsPerPage + index + 1}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>{item.Plant || "-"}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>
                                      <strong style={{ color: '#3b82f6' }}>{item.PoNo}</strong>
                                    </TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>{item.PoDate || "-"}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>{item.PoType || "-"}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>{item.Name || "-"}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', fontWeight: 600 }}>{item.number || "-"}</TableCell>
                                    <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>{item.User || "-"}</TableCell>
                                    
                                    <TableCell align="center" sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>
                                      <Tooltip title="View">
                                        <IconButton onClick={() => handleViewPdf(item)} size="small" sx={{ color: '#10b981', '&:hover': { background: '#d1fae5' } }}>
                                          <FaEye style={{ fontSize: '14px' }} />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>
                                      <Tooltip title="Edit">
                                        <IconButton component={Link} to={`/new-jobwork-order/${item.id}`} size="small" sx={{ color: '#3b82f6', '&:hover': { background: '#dbeafe' } }}>
                                          <FaEdit style={{ fontSize: '14px' }} />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>
                                      <Tooltip title="Delete">
                                        <IconButton onClick={() => handleDelete(item.id)} size="small" sx={{ color: '#ef4444', '&:hover': { background: '#fee2e2' } }}>
                                          <FaTrash style={{ fontSize: '14px' }} />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={11} sx={{ textAlign: 'center', py: 4, color: '#64748b' }}>
                                    <i className="fas fa-search me-2"></i> No data found
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </div>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 2, pb: 4 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b' }}>
                        <i className="fas fa-info-circle me-1"></i> Total Records: <strong style={{ color: '#6366f1' }}>{filteredData.length}</strong>
                      </Typography>
                      
                      {totalPages > 0 && (
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Button variant="outlined" size="small" disabled={page === 1} onClick={() => handlePageChange(page - 1)} sx={{ borderRadius: '8px', textTransform: 'none', color: '#64748b', borderColor: '#cbd5e1', '&:hover': { backgroundColor: '#f1f5f9' } }}>
                            Previous
                          </Button>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b', mx: 1 }}>
                            Page {page} of {totalPages}
                          </Typography>
                          <Button variant="outlined" size="small" disabled={page === totalPages} onClick={() => handlePageChange(page + 1)} sx={{ borderRadius: '8px', textTransform: 'none', color: '#64748b', borderColor: '#cbd5e1', '&:hover': { backgroundColor: '#f1f5f9' } }}>
                            Next
                          </Button>
                        </Box>
                      )}
                    </Box>

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

export default JobworkList;
