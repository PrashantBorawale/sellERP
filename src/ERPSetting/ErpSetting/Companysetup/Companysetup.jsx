import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./Companysetup.css";

import { Typography, Paper, Button, Tabs, Tab, Box, Grid, TextField } from "@mui/material";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";

const Companysetup = () => {
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

  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    companyName: "SHARP ENGINEERS",
    shortName: "SE",
    msmeNo: "MH04P0022406",
    address1: "A-31 MIDC WALUJ 431136",
    address2: "A-31 MIDC WALUJ 431136",
    website: "sharp-engineers.com",
    pinCode: "431136",
    emailId: "contact@sharp-engineers.com",
    city: "AURANGABAD",
    contactNo: "8888826579",
    state: "MAHARASHTRA",
    footerMessage: "Property of Sharp Engineers",
    stateNumeric: "27",
    stateCodeAlpha: "MH",
    directorName: "Umesh Khandelwal",
    
    // Data-2 fields
    vatTin: "",
    cstTin: "",
    exciseRange: "",
    commissionerate: "",
    exciseRegNo: "",
    plaNo: "",
    serviceTaxNo: "",
    importExportCode: "",
    arnNo: "",
    exportHouseNo: "",
    udyogAadharNo: "",
    vatTinDate: "",
    cstTinDate: "",
    subjectTo: "",
    division: "",
    gstNo: "",
    eccNo: "",
    panNo: "",
    cinNo: "",
    importExportDate: "",
    arnDate: "",
    lutNo: "",
    lutDate: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="CompanySetup">
      <div className="container-fluid">
        <div className="row text-start">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Company mt-5 px-3">
                  <div className="WorkOrderEntry-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-8 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          Company Setup
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 3, color: '#64748b', mt: 1 }}>
                          Last Updated By Admin On 21-07-2022 2:47 PM
                        </Typography>
                      </div>
                      <div className="col-md-4 d-flex justify-content-end gap-2">
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
                          General Setting
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4, bgcolor: 'white' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
                      <Tabs 
                        value={activeTab} 
                        onChange={(e, newValue) => setActiveTab(newValue)} 
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{ 
                          '& .MuiTab-root': { fontWeight: 600, textTransform: 'none', fontSize: '0.95rem', minHeight: '54px', color: '#64748b' },
                          '& .Mui-selected': { color: '#3b82f6 !important' },
                          '& .MuiTabs-indicator': { backgroundColor: '#3b82f6', height: '3px', borderTopLeftRadius: '3px', borderTopRightRadius: '3px' }
                        }}
                      >
                        <Tab label="General" value="general" />
                        <Tab label="Data-2" value="data2" />
                        <Tab label="Logo/Images" value="logo" />
                        <Tab label="E-Invoice" value="einvoice" />
                      </Tabs>
                    </Box>

                    <Box sx={{ p: 4, textAlign: 'left' }}>
                      {activeTab === "general" && (
                        <Grid container spacing={4}>
                          <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                              <div>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Company Name</Typography>
                                <div className="d-flex gap-2">
                                  <TextField fullWidth size="small" name="companyName" value={formData.companyName} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                                  <TextField size="small" placeholder="Short Name" name="shortName" value={formData.shortName} onChange={handleInputChange} sx={{ width: '120px', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                                </div>
                              </div>
                              <div>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Address</Typography>
                                <TextField fullWidth multiline rows={3} size="small" name="address1" value={formData.address1} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} helperText="* Print on Invoice / Rs./ Delivery Challan" />
                              </div>
                              <div>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Website</Typography>
                                <TextField fullWidth size="small" name="website" value={formData.website} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                              </div>
                              <div>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Email Id</Typography>
                                <TextField fullWidth size="small" type="email" name="emailId" value={formData.emailId} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                              </div>
                              <div>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Contact No</Typography>
                                <TextField fullWidth size="small" name="contactNo" value={formData.contactNo} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                              </div>
                              <div>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Footer Message</Typography>
                                <TextField fullWidth multiline rows={2} size="small" name="footerMessage" value={formData.footerMessage} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} helperText="* Print Document Footer Message" />
                              </div>
                              <div>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Director Name</Typography>
                                <div className="d-flex gap-2 align-items-start">
                                  <TextField fullWidth size="small" name="directorName" value={formData.directorName} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                                  <Box sx={{ border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '8px 16px', color: '#94a3b8', fontSize: '0.85rem', bgcolor: '#f8fafc', whiteSpace: 'nowrap' }}>
                                    Director Sign
                                  </Box>
                                </div>
                              </div>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                              <div>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>MSME No</Typography>
                                <TextField fullWidth size="small" name="msmeNo" value={formData.msmeNo} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                              </div>
                              <div>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Address</Typography>
                                <TextField fullWidth multiline rows={3} size="small" name="address2" value={formData.address2} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} helperText="* Print on Purchase Order" />
                              </div>
                              <div>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Pin Code</Typography>
                                <TextField fullWidth size="small" name="pinCode" value={formData.pinCode} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                              </div>
                              <div>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>City</Typography>
                                <TextField fullWidth size="small" name="city" value={formData.city} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                              </div>
                              <div>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>State</Typography>
                                <TextField fullWidth size="small" name="state" value={formData.state} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                              </div>
                              <div>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>State No Numeric</Typography>
                                <TextField fullWidth size="small" name="stateNumeric" value={formData.stateNumeric} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} helperText="eg : 27" />
                              </div>
                              <div>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>State Code Alpha</Typography>
                                <TextField fullWidth size="small" name="stateCodeAlpha" value={formData.stateCodeAlpha} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} helperText="eg : MH" />
                              </div>
                            </Box>
                          </Grid>
                        </Grid>
                      )}

                      {activeTab === "data2" && (
                        <Grid container spacing={4}>
                          <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>VAT TIN</Typography><TextField fullWidth size="small" name="vatTin" value={formData.vatTin} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>CST TIN</Typography><TextField fullWidth size="small" name="cstTin" value={formData.cstTin} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>C. Excise Range</Typography><TextField fullWidth multiline rows={2} size="small" name="exciseRange" value={formData.exciseRange} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Commissionerate</Typography><TextField fullWidth size="small" name="commissionerate" value={formData.commissionerate} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>C Excise Reg No</Typography><TextField fullWidth size="small" name="exciseRegNo" value={formData.exciseRegNo} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>P.L.A No</Typography><TextField fullWidth size="small" name="plaNo" value={formData.plaNo} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Service Tax No</Typography><TextField fullWidth size="small" name="serviceTaxNo" value={formData.serviceTaxNo} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Import/Export Code</Typography><TextField fullWidth size="small" name="importExportCode" value={formData.importExportCode} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>ARN No</Typography><TextField fullWidth size="small" name="arnNo" value={formData.arnNo} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Export House No</Typography><TextField fullWidth size="small" name="exportHouseNo" value={formData.exportHouseNo} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Udyog Aadhar No</Typography><TextField fullWidth size="small" name="udyogAadharNo" value={formData.udyogAadharNo} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Vat Tin Date</Typography><TextField fullWidth type="date" InputLabelProps={{ shrink: true }} size="small" name="vatTinDate" value={formData.vatTinDate} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Cst Tin Date</Typography><TextField fullWidth type="date" InputLabelProps={{ shrink: true }} size="small" name="cstTinDate" value={formData.cstTinDate} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Subject to</Typography><TextField fullWidth size="small" name="subjectTo" value={formData.subjectTo} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Division</Typography><TextField fullWidth size="small" name="division" value={formData.division} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>GST No</Typography><TextField fullWidth size="small" name="gstNo" value={formData.gstNo} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>ECC No</Typography><TextField fullWidth size="small" name="eccNo" value={formData.eccNo} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>PAN No</Typography><TextField fullWidth size="small" name="panNo" value={formData.panNo} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>CIN NO</Typography><TextField fullWidth size="small" name="cinNo" value={formData.cinNo} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>Import/Export Date</Typography><TextField fullWidth type="date" InputLabelProps={{ shrink: true }} size="small" name="importExportDate" value={formData.importExportDate} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>ARN Date</Typography><TextField fullWidth type="date" InputLabelProps={{ shrink: true }} size="small" name="arnDate" value={formData.arnDate} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>LUT No</Typography><TextField fullWidth size="small" name="lutNo" value={formData.lutNo} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                              <div><Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1 }}>LUT Date</Typography><TextField fullWidth type="date" InputLabelProps={{ shrink: true }} size="small" name="lutDate" value={formData.lutDate} onChange={handleInputChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} /></div>
                            </Box>
                          </Grid>
                        </Grid>
                      )}

                      {activeTab === "logo" && (
                        <Box sx={{ p: 6, textAlign: 'center', color: '#64748b', border: '2px dashed #e2e8f0', borderRadius: '12px', bgcolor: '#f8fafc' }}>
                          <Typography variant="h6" sx={{ color: '#334155', fontWeight: 600 }}>Logo / Images Setup</Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>Drag and drop your company logo here or click to browse.</Typography>
                        </Box>
                      )}

                      {activeTab === "einvoice" && (
                        <Box sx={{ p: 6, textAlign: 'center', color: '#64748b', border: '2px dashed #e2e8f0', borderRadius: '12px', bgcolor: '#f8fafc' }}>
                          <Typography variant="h6" sx={{ color: '#334155', fontWeight: 600 }}>E-Invoice Settings</Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>Configure your e-invoice portal credentials here.</Typography>
                        </Box>
                      )}
                    </Box>
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

export default Companysetup;
