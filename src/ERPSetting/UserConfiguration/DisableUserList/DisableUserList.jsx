import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./DisableUserList.css";
import { Link } from "react-router-dom";

import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";

const DisableUserList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // Simulated API call to get the list of disabled users
    setUsers([
      {
        id: 1,
        department: "Quality",
        fullName: "Bharat Chavan",
        userName: "bharat",
        password: "DisAbc*",
        disableDate: "02/10/2024 13:40:05",
        action: "Enable User",
      },
      {
        id: 2,
        department: "Planning",
        fullName: "Sangram Gutte",
        userName: "sangram",
        password: "DisAbc*",
        disableDate: "",
        action: "Enable User",
      },
      // Add more users
    ]);
  }, []);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="DisableUserList">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="DisableUser mt-5">
                  <div className="WorkOrderEntry-header mb-4 text-start px-3">
                    <div className="row align-items-center">
                      <div className="col-md-6 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          Disable User List
                        </Typography>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end gap-2">
                        <Link to="/ErpSetting" style={{ textDecoration: 'none' }}>
                          <Button 
                            variant="contained" 
                            startIcon={<SettingsIcon />}
                            sx={{ 
                              borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                              background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
                              boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)', transition: 'all 0.2s ease',
                              '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)' } 
                            }}
                          >
                            User Management
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <Box px={3}>
                    <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>
                      <TableContainer sx={{ maxHeight: 600, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>
                        <Table stickyHeader size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Sr.</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>Department</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>Move to Dept</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>Full Name</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>User Name</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>Password</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>Disable Date</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {users.map((user, index) => (
                              <TableRow key={user.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 }, transition: "all 0.2s ease", "&:hover": { backgroundColor: "#f1f5f9" } }}>
                                <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>{index + 1}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 500 }}>{user.department}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '8px 16px', borderBottom: '1px solid #f1f5f9' }}>
                                  <select className="form-select form-select-sm" style={{ borderRadius: '6px', border: '1px solid #cbd5e1', boxShadow: 'none' }}>
                                    <option value={user.department}>{user.department}</option>
                                    <option value="HR">HR</option>
                                    <option value="Accounts">Accounts</option>
                                  </select>
                                </TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 500 }}>{user.fullName}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>{user.userName}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>{user.password}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                                  <span style={{ backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>{user.disableDate || "N/A"}</span>
                                </TableCell>
                                <TableCell sx={{ padding: '8px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                                  <Button 
                                    variant="contained" 
                                    size="small"
                                    sx={{ 
                                      borderRadius: '6px', textTransform: 'none', fontWeight: 600, fontSize: '0.75rem',
                                      background: 'linear-gradient(to right, #10b981, #059669)', color: 'white',
                                      boxShadow: '0 2px 8px 0 rgba(16, 185, 129, 0.3)', transition: 'all 0.2s ease',
                                      '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)' } 
                                    }}
                                  >
                                    {user.action}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Box>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisableUserList;
