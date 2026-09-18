import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import './AddQuater.css';

import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";

const AddQuater = () => {
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
    <div className="QuarterMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Quarter mt-5 px-3">
                  <div className="WorkOrderEntry-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          Quarter Master
                        </Typography>
                      </div>
                    </div>
                  </div>

                  <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
                    <div className="row align-items-end g-3 text-start">
                      <div className="col-md-2">
                        <label className="form-label mb-1 fw-bold text-muted" style={{ fontSize: '0.85rem' }}>Year</label>
                        <select className="form-control" style={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: 'none' }}>
                          <option>Select All</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label mb-1 fw-bold text-muted" style={{ fontSize: '0.85rem' }}>Quarter</label>
                        <select className="form-control" style={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: 'none' }}>
                          <option>Select All</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label mb-1 fw-bold text-muted" style={{ fontSize: '0.85rem' }}>Quarter Name</label>
                        <input type="text" className="form-control" style={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: 'none' }} />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label mb-1 fw-bold text-muted" style={{ fontSize: '0.85rem' }}>From Date</label>
                        <input type="date" className="form-control" style={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: 'none' }} />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label mb-1 fw-bold text-muted" style={{ fontSize: '0.85rem' }}>To Date</label>
                        <input type="date" className="form-control" style={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: 'none' }} />
                      </div>
                      <div className="col-md-2">
                        <Button 
                          variant="contained"
                          fullWidth
                          startIcon={<SaveIcon />}
                          sx={{ 
                            height: '38px', borderRadius: '8px', textTransform: 'none', fontWeight: 600, minWidth: '100px',
                            background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)',
                            '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)' } 
                          }}
                        >
                          Save
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
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>Financial Year</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Quarter No</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>Quarter Name</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>From Date</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px' }}>To Date</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* Example data row */}
                          <TableRow hover sx={{ "&:last-child td, &:last-child th": { border: 0 }, transition: "all 0.2s ease", "&:hover": { backgroundColor: "#f1f5f9" } }}>
                            <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>1</TableCell>
                            <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 500 }}>January</TableCell>
                            <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                              <span style={{ backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>01/01/2024</span>
                            </TableCell>
                            <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>31/01/2024</TableCell>
                            <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>1</TableCell>
                            <TableCell sx={{ color: '#475569', fontSize: '0.8rem', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>2024</TableCell>
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
  )
}

export default AddQuater;
