import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./ErpSetting.css";
import { Link } from "react-router-dom";
import { getUsers, updateUser, deleteUser } from "../../Service/Erpsetting.jsx";
import { Box, Tooltip, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import AddIcon from "@mui/icons-material/AddOutlined";
import BlockIcon from "@mui/icons-material/BlockOutlined";

const ErpSetting = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

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

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load users:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditData(user);
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateUser(editingUser, editData);
      setUsers(users.map((user) => (user.id === editingUser ? updatedUser : user)));
      setEditingUser(null);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="erpsetting">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  <div className="WorkOrderEntry-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          User Management
                        </Typography>
                      </div>
                      <div className="col-md-8 d-flex justify-content-end gap-2">
                        <Button 
                          component={Link}
                          to="/UserConfiguration"
                          variant="contained" 
                          startIcon={<AddIcon />}
                          sx={{ 
                            borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                            background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)', transition: 'all 0.2s ease',
                            '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)' } 
                          }}
                        >
                          Add New
                        </Button>
                        <Button 
                          component={Link}
                          to="/DisableUserList"
                          variant="contained" 
                          startIcon={<BlockIcon />}
                          sx={{ 
                            borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                            background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)', transition: 'all 0.2s ease',
                            '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)' } 
                          }}
                        >
                          Disable User List
                        </Button>
                        <Button 
                          variant="contained" 
                          startIcon={<DownloadIcon />}
                          sx={{ 
                            borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                            background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)', transition: 'all 0.2s ease',
                            '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)' } 
                          }}
                        >
                          Export Excel
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Paper elevation={0} sx={{ mb: 4, p: 3, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
                    <div className="row align-items-end mb-3">
                      <div className="col-md-3">
                        <label className="form-check-label mb-1">
                          <input type="checkbox" className="form-check-input me-2" />
                          Include User Name Like
                        </label>
                        <input
                          type="text"
                          className="form-control mt-1"
                          placeholder="User Name Like"
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mb-1">Plant:</label>
                        <select className="form-select">
                          <option value="">Select Plant</option>
                          <option value="VISHWA S.I.">VISHWA S.I.</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <Button variant="contained" fullWidth sx={{ height: '38px', borderRadius: '8px', backgroundColor: '#10b981', boxShadow: 'none', textTransform: 'none', fontSize: '0.875rem', fontWeight: 600, '&:hover': { backgroundColor: '#059669', boxShadow: 'none' } }}>Search</Button>
                      </div>
                    </div>
                  </Paper>

                  <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mt: 4 }}>
                    <TableContainer sx={{ maxHeight: 500, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>
                      <Table stickyHeader size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Sr.</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Plant</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Department</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Full Name</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>User Name</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Email ID</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Mobile No</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Edit</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Delete</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {users.map((user, index) => (
                            <TableRow key={user.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 }, transition: "all 0.2s ease", "&:hover": { backgroundColor: "#f1f5f9" } }}>
                              <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{index + 1}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>
                                {editingUser === user.id ? (
                                  <input
                                    type="text"
                                    value={editData.PlantName || ""}
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      setEditData({ ...editData, PlantName: e.target.value })
                                    }
                                  />
                                ) : (
                                  user.PlantName
                                )}
                              </TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>
                                {editingUser === user.id ? (
                                  <input
                                    type="text"
                                    value={editData.Department || ""}
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      setEditData({ ...editData, Department: e.target.value })
                                    }
                                  />
                                ) : (
                                  user.Department
                                )}
                              </TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{user.FullName}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{user.username}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{user.email}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>{user.MobileNo}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>
                                {editingUser === user.id ? (
                                  <Tooltip title="Save">
                                    <IconButton size="small" onClick={handleSave} sx={{ color: '#10b981', backgroundColor: '#ecfdf5', borderRadius: '4px', padding: '6px', '&:hover': { backgroundColor: '#d1fae5' } }}>
                                      <SaveIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                ) : (
                                  <Tooltip title="Edit">
                                    <IconButton size="small" onClick={() => handleEdit(user)} sx={{ color: '#3b82f6', backgroundColor: '#eff6ff', borderRadius: '4px', padding: '6px', '&:hover': { backgroundColor: '#dbeafe' } }}>
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>
                                <Tooltip title="Delete">
                                  <IconButton size="small" onClick={() => handleDelete(user.id)} sx={{ color: '#ef4444', backgroundColor: '#fef2f2', borderRadius: '4px', padding: '6px', '&:hover': { backgroundColor: '#fee2e2' } }}>
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                          {users.length === 0 && (
                            <TableRow>
                              <TableCell colSpan="9" sx={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                                No Users found.
                              </TableCell>
                            </TableRow>
                          )}
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
  );
};

export default ErpSetting;
