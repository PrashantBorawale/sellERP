import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./UserConfiguration.css";
import { registerUser } from "../../Service/Erpsetting.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Typography, Paper, Button, Grid, TextField, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/SaveOutlined";

const UserConfiguration = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    plant: "VISHWA S.I.",
    department: "",
    fullName: "",
    username: "",
    password: "",
    emailId: "",
    mobileNo: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: formData.username,
      email: formData.emailId,
      password: formData.password,
      PlantName: formData.plant,
      Department: formData.department,
      FullName: formData.fullName,
      MobileNo: formData.mobileNo,
    };

    try {
      const response = await registerUser(newUser);
      console.log(response);
      toast.success("User successfully created!");
      setFormData({
        plant: "",
        department: "",
        fullName: "",
        username: "",
        password: "",
        emailId: "",
        mobileNo: "",
        cr: "N",
      });
    } catch (error) {
      toast.error("Error creating user, please try again.");
    }
  };

  return (
    <div className="User">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-container px-3 mt-5">
                  <div className="WorkOrderEntry-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          Add New User
                        </Typography>
                      </div>
                    </div>
                  </div>

                  <Paper elevation={0} sx={{ p: 4, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: 'white', maxWidth: '900px', mx: '0', mt: 4 }}>
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1, textAlign: 'left' }}>Plant</Typography>
                          <TextField fullWidth size="small" id="plant" name="plant" value={formData.plant} onChange={handleChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1, textAlign: 'left' }}>Department</Typography>
                          <select id="department" name="department" value={formData.department} onChange={handleChange} className="form-select" style={{ borderRadius: '8px', height: '40px', border: '1px solid #cbd5e1', boxShadow: 'none' }}>
                            <option value="">Select</option>
                            <option value="Store">Store</option>
                            <option value="Purchase">Purchase</option>
                            <option value="ALL Master">ALL Master</option>
                            <option value="Production">Production</option>
                          </select>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1, textAlign: 'left' }}>Full Name</Typography>
                          <TextField fullWidth size="small" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1, textAlign: 'left' }}>Username</Typography>
                          <TextField fullWidth size="small" id="username" name="username" value={formData.username} onChange={handleChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1, textAlign: 'left' }}>Password</Typography>
                          <TextField fullWidth type="password" size="small" id="password" name="password" value={formData.password} onChange={handleChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1, textAlign: 'left' }}>Email Id</Typography>
                          <TextField fullWidth type="email" size="small" id="emailId" name="emailId" value={formData.emailId} onChange={handleChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', mb: 1, textAlign: 'left' }}>Mobile No</Typography>
                          <TextField fullWidth type="tel" size="small" id="mobileNo" name="mobileNo" value={formData.mobileNo} onChange={handleChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start' }}>
                          <Button 
                            type="submit"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            sx={{ 
                              height: '42px', borderRadius: '8px', textTransform: 'none', fontWeight: 600, minWidth: '140px',
                              background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
                              boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)',
                              '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)' } 
                            }}
                          >
                            Save User
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
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

export default UserConfiguration;
