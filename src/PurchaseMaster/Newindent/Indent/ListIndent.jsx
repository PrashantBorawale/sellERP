import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, TextField, MenuItem, Tooltip } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "../Indent/ListIndent.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import { FaEdit, FaTrash, FaEye, FaFileAlt, FaEnvelope } from "react-icons/fa";

const ListIndent = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [indentList, setIndentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    plant: '',
    item: '',
    indentNo: '',
    type: '',
    status: ''
  });

  // Toggle side nav
  const toggleSideNav = () => setSideNavOpen((prev) => !prev);

  // Mock fetch – replace URL with your real endpoint
  const fetchIndents = async () => {
    try {
      const res = await fetch("https://sellerp-backend.onrender.com/Purchase/all-indents/");
      const json = await res.json();
      setIndentList(json.data);
      setFilteredList(json.data); // Initialize filtered list
    } catch (err) {
      console.error("Failed to load indents:", err);
      toast.error("Error fetching data!");
    } finally {
      setLoading(false);
    }
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = indentList;

    // Filter by date range
    if (filters.fromDate) {
      filtered = filtered.filter(indent => 
        new Date(indent.Date) >= new Date(filters.fromDate)
      );
    }

    if (filters.toDate) {
      filtered = filtered.filter(indent => 
        new Date(indent.Date) <= new Date(filters.toDate)
      );
    }

    // Filter by plant
    if (filters.plant) {
      filtered = filtered.filter(indent => 
        indent.Plant?.toLowerCase().includes(filters.plant.toLowerCase())
      );
    }

    // Filter by item (searches in indent_details)
    if (filters.item) {
      filtered = filtered.filter(indent => 
        indent.indent_details.some(detail => 
          detail.ItemNoCpcCode?.toLowerCase().includes(filters.item.toLowerCase()) ||
          detail.Description?.toLowerCase().includes(filters.item.toLowerCase())
        )
      );
    }

    // Filter by indent number
    if (filters.indentNo) {
      filtered = filtered.filter(indent => 
        indent.IndentNo?.toLowerCase().includes(filters.indentNo.toLowerCase())
      );
    }

    // Filter by type (searches in indent_details)
    if (filters.type) {
      filtered = filtered.filter(indent => 
        indent.indent_details.some(detail => 
          detail.Type?.toLowerCase().includes(filters.type.toLowerCase())
        )
      );
    }

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(indent => 
        indent.Auth?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredList(filtered);
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      fromDate: '',
      toDate: '',
      plant: '',
      item: '',
      indentNo: '',
      type: '',
      status: ''
    });
    setFilteredList(indentList);
  };

  // Get unique values for dropdowns
  const getUniqueValues = (field) => {
    const values = new Set();
    if (field === 'plant') {
      indentList.forEach(indent => {
        if (indent.Plant) values.add(indent.Plant);
      });
    } else if (field === 'status') {
      indentList.forEach(indent => {
        if (indent.Auth) values.add(indent.Auth);
      });
    } else if (field === 'type') {
      indentList.forEach(indent => {
        indent.indent_details.forEach(detail => {
          if (detail.Type) values.add(detail.Type);
        });
      });
    }
    return Array.from(values).filter(Boolean);
  };

  const handleExportExcel = () => {
    if (filteredList.length === 0) {
      toast.warn("No records available to export");
      return;
    }

    const exportData = [];
    filteredList.forEach((indent, i) => {
      indent.indent_details.forEach((d, j) => {
        const year = new Date(indent.Date).getFullYear();
        exportData.push({
          "Sr No.": `${i + 1}.${j + 1}`,
          "Year": year,
          "Ind No": indent.IndentNo,
          "Ind Date": indent.Date,
          "Required Delivery": d.SchDate || "",
          "Item No": d.ItemNoCpcCode || "",
          "Description": d.Description || "",
          "Ind Qty": d.Qty || "",
          "MRP Run Date": indent.Time || "",
          "Auth Details": indent.Auth || "",
          "Status": indent.Auth || "",
          "Supplier": indent.Plant || "",
          "User": ""
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Indent List");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Indent_List.xlsx");
  };

  useEffect(() => {
    fetchIndents();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  return (
    <div className="erp-page ListIndent">
      <ToastContainer position="top-right" autoClose={3000} />
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
                <div className="ListIndent-main p-4" style={{ overflow: 'hidden', maxWidth: '100%' }}>
                  <div className="container-fluid p-0" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                    
                    {/* Header */}
                    <div className="erp-header mb-4">
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <h5 className="header-title mb-0" style={{ fontWeight: 800, background: 'linear-gradient(to right, #6366f1, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
                          Indent List
                        </h5>
                        
                        <div className="d-flex gap-2 flex-wrap">
                          <Button component={Link} to="/IndentStutasReport" variant="contained" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #6366f1, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)' } }}>
                            <i className="fas fa-chart-bar me-2"></i> Indent Status Report
                          </Button>
                          <Button variant="contained" onClick={handleExportExcel} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #10b981, #059669)', boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)', '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)' } }}>
                            <i className="fas fa-file-excel me-2"></i> Export Excel
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Search Filters */}
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
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Plant</Typography>
                            <TextField
                              select
                              size="small"
                              name="plant"
                              value={filters.plant}
                              onChange={handleFilterChange}
                              sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%', display: 'flex', alignItems: 'center' } }}
                            >
                              <MenuItem value="" sx={{ fontSize: '0.75rem' }}>All</MenuItem>
                              {getUniqueValues('plant').map(plant => (
                                <MenuItem key={plant} value={plant} sx={{ fontSize: '0.75rem' }}>{plant}</MenuItem>
                              ))}
                            </TextField>
                          </Box>

                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Item</Typography>
                            <TextField
                              type="text"
                              size="small"
                              name="item"
                              placeholder="Search..."
                              value={filters.item}
                              onChange={handleFilterChange}
                              sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                            />
                          </Box>

                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Indent No</Typography>
                            <TextField
                              type="text"
                              size="small"
                              name="indentNo"
                              placeholder="Search..."
                              value={filters.indentNo}
                              onChange={handleFilterChange}
                              sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                            />
                          </Box>

                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Type</Typography>
                            <TextField
                              select
                              size="small"
                              name="type"
                              value={filters.type}
                              onChange={handleFilterChange}
                              sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%', display: 'flex', alignItems: 'center' } }}
                            >
                              <MenuItem value="" sx={{ fontSize: '0.75rem' }}>All</MenuItem>
                              {getUniqueValues('type').map(type => (
                                <MenuItem key={type} value={type} sx={{ fontSize: '0.75rem' }}>{type}</MenuItem>
                              ))}
                            </TextField>
                          </Box>

                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Status</Typography>
                            <TextField
                              select
                              size="small"
                              name="status"
                              value={filters.status}
                              onChange={handleFilterChange}
                              sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%', display: 'flex', alignItems: 'center' } }}
                            >
                              <MenuItem value="" sx={{ fontSize: '0.75rem' }}>All</MenuItem>
                              {getUniqueValues('status').map(status => (
                                <MenuItem key={status} value={status} sx={{ fontSize: '0.75rem' }}>{status}</MenuItem>
                              ))}
                            </TextField>
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
                          <Table stickyHeader size="small" sx={{ tableLayout: 'auto', minWidth: '900px' }}>
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Sr no.</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Year</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Ind No | Date</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Required Delivery</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Item No | Desc</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Ind Qty</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>MRP Run Date</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Auth Details</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Status</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Supplier</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>User</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Actions</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {loading ? (
                                <TableRow>
                                  <TableCell colSpan={12} sx={{ textAlign: 'center', py: 4, color: '#64748b' }}>
                                    <div className="spinner-border text-primary" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ) : filteredList.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={12} sx={{ textAlign: 'center', py: 4, color: '#64748b' }}>
                                    <i className="fas fa-search me-2"></i> {indentList.length === 0 ? "No indents found." : "No indents match the current filters."}
                                  </TableCell>
                                </TableRow>
                              ) : (
                                filteredList.map((indent, i) =>
                                  indent.indent_details.map((d, j) => {
                                    const year = new Date(indent.Date).getFullYear();
                                    return (
                                      <TableRow key={`${indent.id}-${d.id}`} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>{i + 1}.{j + 1}</TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>{year}</TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>
                                          <strong style={{ color: '#3b82f6' }}>{indent.IndentNo}</strong><br/>
                                          <small className="text-muted">{indent.Date}</small>
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>{d.SchDate || "-"}</TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', maxWidth: '250px', whiteSpace: 'normal' }}>
                                          <strong>{d.ItemNoCpcCode}</strong><br/>
                                          <small className="text-muted">{d.Description}</small>
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', fontWeight: 600 }}>{d.Qty}</TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>{indent.Time}</TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>{indent.Auth || "-"}</TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>
                                          <span className={`badge ${indent.Auth === "Approved" ? "bg-success" : indent.Auth === "Pending" ? "bg-warning text-dark" : "bg-secondary"}`}>
                                            {indent.Auth || "Pending"}
                                          </span>
                                        </TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>{indent.Plant || "—"}</TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px' }}>-</TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>
                                          <Tooltip title="View">
                                            <IconButton component={Link} to={`/indent/${indent.id}`} size="small" sx={{ color: '#10b981', '&:hover': { background: '#d1fae5' } }}>
                                              <FaEye style={{ fontSize: '14px' }} />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="Edit">
                                            <IconButton size="small" sx={{ color: '#3b82f6', '&:hover': { background: '#dbeafe' } }}>
                                              <FaEdit style={{ fontSize: '14px' }} />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="Delete">
                                            <IconButton size="small" sx={{ color: '#ef4444', '&:hover': { background: '#fee2e2' } }}>
                                              <FaTrash style={{ fontSize: '14px' }} />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="Document">
                                            <IconButton size="small" sx={{ color: '#8b5cf6', '&:hover': { background: '#ede9fe' } }}>
                                              <FaFileAlt style={{ fontSize: '14px' }} />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="Mail">
                                            <IconButton size="small" sx={{ color: '#64748b', '&:hover': { background: '#f1f5f9' } }}>
                                              <FaEnvelope style={{ fontSize: '14px' }} />
                                            </IconButton>
                                          </Tooltip>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })
                                )
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </div>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 2, pb: 4 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b' }}>
                        <i className="fas fa-info-circle me-1"></i> Showing <strong style={{ color: '#6366f1' }}>{filteredList.length}</strong> of {indentList.length} results
                      </Typography>
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

export default ListIndent;