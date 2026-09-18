import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './ScheduleMonth.css';
import { Link } from "react-router-dom";

import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonthOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import AddIcon from "@mui/icons-material/AddOutlined";

const ScheduleMonth = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [monthData, setMonthData] = useState([]);
  const [formData, setFormData] = useState({
    month_name: "",
    from_date: "",
    to_date: "",
    month_no: "",
    year_no: "",
    w_days: ""
  });

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const fetchScheduleMonths = async () => {
    try {
      const response = await fetch("https://sellerp-backend.onrender.com/Settings/schedule-month/");
      if (response.ok) {
        const data = await response.json();
        // Handle direct arrays, DRF paginated 'results', and nested 'data' wrappers
        let processedData = [];
        if (Array.isArray(data)) {
          processedData = data;
        } else if (data && Array.isArray(data.results)) {
          processedData = data.results;
        } else if (data && Array.isArray(data.data)) {
          processedData = data.data;
        }
        setMonthData(processedData);
      }
    } catch (error) {
      console.error("Error fetching schedule months:", error);
    }
  };

  useEffect(() => {
    fetchScheduleMonths();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldMap = {
      monthName: "month_name",
      fromDate: "from_date",
      toDate: "to_date",
      monthNo: "month_no",
      yearNo: "year_no",
      wDays: "w_days"
    };
    
    setFormData(prev => {
      const updated = { ...prev, [fieldMap[id]]: value };
      
      // Auto-fill Month No and Year No from From Date
      if (id === "fromDate" && value) {
        const [year, month] = value.split("-");
        updated.month_no = parseInt(month).toString();
        updated.year_no = year;
        
        // Optional: Auto-fill Month Name as well (e.g., MAY 2026)
        const dateObj = new Date(value);
        const monthName = dateObj.toLocaleString('default', { month: 'long' }).toUpperCase();
        updated.month_name = `${monthName} ${year}`;
      }
      
      return updated;
    });
  };

  const formatDateForAPI = (dateStr) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const [editingId, setEditingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this schedule month?")) return;
    try {
      const response = await fetch(`https://sellerp-backend.onrender.com/Settings/schedule-month/${id}/`, {
        method: "DELETE"
      });
      if (response.ok) {
        alert("Schedule Month deleted successfully!");
        setMonthData(prev => prev.filter(item => item.id !== id));
      } else {
        alert("Failed to delete schedule month.");
      }
    } catch (error) {
      console.error("Error deleting schedule month:", error);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      month_name: item.month_name || "",
      from_date: item.from_date || "",
      to_date: item.to_date || "",
      month_no: item.month_no?.toString() || "",
      year_no: item.year_no?.toString() || "",
      w_days: item.w_days?.toString() || item.w_day?.toString() || ""
    });
    window.scrollTo(0, 0); // Scroll to top to see form
  };

  const handleSubmit = async () => {
    const loggedInUser = localStorage.getItem("username") || "Admin";
    const payload = {
      month_name: formData.month_name,
      from_date: formData.from_date,
      to_date: formData.to_date,
      month_no: formData.month_no,
      year_no: formData.year_no,
      w_days: formData.w_days,
      user: loggedInUser
    };

    const url = editingId 
      ? `https://sellerp-backend.onrender.com/Settings/schedule-month/${editingId}/`
      : "https://sellerp-backend.onrender.com/Settings/schedule-month/";
    
    const method = editingId ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const responseData = await response.json().catch(() => ({}));
        const savedItem = responseData.data || responseData;
        alert(editingId ? "Schedule Month updated successfully!" : "Schedule Month added successfully!");
        
        if (editingId) {
          setMonthData(prev => prev.map(item => item.id === editingId ? savedItem : item));
          setEditingId(null);
        } else {
          setMonthData(prev => [...prev, savedItem]);
        }

        setFormData({
          month_name: "",
          from_date: "",
          to_date: "",
          month_no: "",
          year_no: "",
          w_days: ""
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to save: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Error saving schedule month:", error);
    }
  };

  return (
    <div className="ScheduleMonthMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="ScheduleMonth mt-5 px-3">
                  <div className="WorkOrderEntry-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          Schedule Month Master
                        </Typography>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end gap-2">
                        <Button 
                          component={Link}
                          to='/WeekMaster'
                          variant="contained" 
                          startIcon={<CalendarMonthIcon />}
                          sx={{ 
                            borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                            background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)', transition: 'all 0.2s ease',
                            '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)' } 
                          }}
                        >
                          Week Master
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
                    <div className="row align-items-end g-3">
                      <div className="col-md-2">
                        <label className="form-label mb-1 fw-bold text-muted" style={{ fontSize: '0.85rem' }}>Month Name</label>
                        <input type="text" id="monthName" className="form-control" placeholder="Enter month name" value={formData.month_name} onChange={handleInputChange} style={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: 'none' }} />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label mb-1 fw-bold text-muted" style={{ fontSize: '0.85rem' }}>From Date</label>
                        <input type="date" id="fromDate" className="form-control" value={formData.from_date} onChange={handleInputChange} style={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: 'none' }} />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label mb-1 fw-bold text-muted" style={{ fontSize: '0.85rem' }}>To Date</label>
                        <input type="date" id="toDate" className="form-control" value={formData.to_date} onChange={handleInputChange} style={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: 'none' }} />
                      </div>
                      <div className="col-md-3">
                        <div className="row g-2">
                          <div className="col-6">
                            <label className="form-label mb-1 fw-bold text-muted" style={{ fontSize: '0.85rem' }}>Month No</label>
                            <input type="text" id="monthNo" className="form-control" placeholder="MM" value={formData.month_no} onChange={handleInputChange} style={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: 'none' }} />
                          </div>
                          <div className="col-6">
                            <label className="form-label mb-1 fw-bold text-muted" style={{ fontSize: '0.85rem' }}>Year No</label>
                            <input type="text" id="yearNo" className="form-control" placeholder="YYYY" value={formData.year_no} onChange={handleInputChange} style={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: 'none' }} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-1">
                        <label className="form-label mb-1 fw-bold text-muted" style={{ fontSize: '0.85rem' }}>W Days</label>
                        <input type="text" id="wDays" className="form-control" placeholder="Days" value={formData.w_days} onChange={handleInputChange} style={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: 'none' }} />
                      </div>
                      <div className="col-md-2">
                        <Button 
                          onClick={handleSubmit} 
                          variant="contained"
                          fullWidth
                          startIcon={editingId ? <SaveIcon /> : <AddIcon />}
                          sx={{ 
                            height: '38px', borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                            background: editingId ? 'linear-gradient(to right, #f59e0b, #d97706)' : 'linear-gradient(to right, #10b981, #059669)', color: 'white',
                            boxShadow: editingId ? '0 4px 14px 0 rgba(245, 158, 11, 0.39)' : '0 4px 14px 0 rgba(16, 185, 129, 0.39)',
                            '&:hover': { background: editingId ? 'linear-gradient(to right, #d97706, #b45309)' : 'linear-gradient(to right, #059669, #047857)' } 
                          }}
                        >
                          {editingId ? "Update" : "Add"}
                        </Button>
                      </div>
                    </div>
                  </Paper>

                  <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>
                    <TableContainer sx={{ maxHeight: 600, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>
                      <Table stickyHeader size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Sr.</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>Month Name</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>From Date</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>To Date</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Month No</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Year No</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>W Days</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>User</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Array.isArray(monthData) && monthData.map((item, index) => (
                            <TableRow key={item.id || index} hover sx={{ "&:last-child td, &:last-child th": { border: 0 }, transition: "all 0.2s ease", "&:hover": { backgroundColor: "#f1f5f9" } }}>
                              <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>{index + 1}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 500 }}>{item.month_name}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>{item.from_date}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>{item.to_date}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                                <span style={{ backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>{item.month_no}</span>
                              </TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>{item.year_no}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>{item.w_days || item.w_day}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>{item.user || "Admin"}</TableCell>
                              <TableCell sx={{ padding: '8px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                                <Tooltip title="Edit" arrow>
                                  <IconButton size="small" onClick={() => startEdit(item)} sx={{ color: '#3b82f6', mr: 1, '&:hover': { backgroundColor: '#eff6ff', color: '#2563eb' } }}>
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete" arrow>
                                  <IconButton size="small" onClick={() => handleDelete(item.id)} sx={{ color: '#ef4444', '&:hover': { backgroundColor: '#fef2f2', color: '#dc2626' } }}>
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleMonth
