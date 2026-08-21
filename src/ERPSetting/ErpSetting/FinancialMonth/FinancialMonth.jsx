import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './FinancialMonth.css';

import { Link } from "react-router-dom";
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/AddOutlined";
import BusinessIcon from "@mui/icons-material/BusinessOutlined";

const FinancialMonth = () => {
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

  return (
    <div className="Financialmonth">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="FinancialMon mt-5 px-3">
                  <div className="month-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          Month Master
                        </Typography>
                      </div>
                      <div className="col-md-8 d-flex justify-content-end gap-2">
                        <Button 
                          component={Link}
                          to='/AddQuater'
                          variant="contained" 
                          startIcon={<AddIcon />}
                          sx={{ 
                            borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                            background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)', transition: 'all 0.2s ease',
                            '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)' } 
                          }}
                        >
                          Add Quarter
                        </Button>
                        <Button 
                          component={Link}
                          to='/Companysetup'
                          variant="contained" 
                          startIcon={<BusinessIcon />}
                          sx={{ 
                            borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                            background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)', transition: 'all 0.2s ease',
                            '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)' } 
                          }}
                        >
                          Company Info
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mt: 4, mb: 4 }}>
                    <TableContainer sx={{ maxHeight: 600, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>
                      <Table stickyHeader size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Sr. Id</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>Month Name</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>From Date</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>To Date</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Month No</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Year No</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>W Day</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Scrap OPBal</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* Example data row */}
                          <TableRow hover sx={{ "&:last-child td, &:last-child th": { border: 0 }, transition: "all 0.2s ease", "&:hover": { backgroundColor: "#f1f5f9" } }}>
                            <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>1</TableCell>
                            <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 500 }}>January</TableCell>
                            <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>01/01/2024</TableCell>
                            <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>31/01/2024</TableCell>
                            <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                              <span style={{ backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>1</span>
                            </TableCell>
                            <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>2024</TableCell>
                            <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>21</TableCell>
                            <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>100</TableCell>
                            <TableCell sx={{ padding: '8px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                              <Tooltip title="Edit" arrow>
                                <IconButton size="small" sx={{ color: '#3b82f6', mr: 1, '&:hover': { backgroundColor: '#eff6ff', color: '#2563eb' } }}>
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete" arrow>
                                <IconButton size="small" sx={{ color: '#ef4444', '&:hover': { backgroundColor: '#fef2f2', color: '#dc2626' } }}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                          {/* More rows can be added here */}
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
}

export default FinancialMonth;
