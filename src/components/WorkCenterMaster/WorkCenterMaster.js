import React, { useEffect, useState } from "react";
import { Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, TextField, Select, MenuItem, Tooltip } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./WorkCenterMaster.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getWorkCenters ,updateWorkCenter,deleteWorkCenter} from "../../Service/Api.jsx";
import AddNewCard from "./AddNewCard/AddNewCard.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import WorkCenterType from "./WorkCenterType.jsx";
import * as XLSX from "xlsx";

const WorkCenterMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  useEffect(() => {
    // Logic to fetch records can be added here, and then setRecords with the fetched data
  }, []);


  //   card
  const [isCardVisible, setCardVisible] = useState(false);

  const [showNewCardWork, setShowNewCardWork] = useState(false);

  const handleAddNewClick = () => {
    setCardVisible(true);
  };

  const handleCloseCard = () => {
    setCardVisible(false);
  };

  

  const handleNewButtonWork = () => {
    setShowNewCardWork(!showNewCardWork);
  };





  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [editId, setEditId] = useState(null);
const [editData, setEditData] = useState({});


  useEffect(() => {
    fetchData();
  }, []);
const fetchData = async () => {
  try {
    const result = await getWorkCenters();
    setData(result.sort((a, b) => b.id - a.id));
  } catch (err) {
    setError("Failed to fetch data");
    toast.error("Error fetching data!");
  } finally {
    setLoading(false);
  }
};

  // Handle Edit
const handleEdit = (item) => {
  setEditId(item.id);
  setEditData({ ...item }); // preload row data
};


  // Handle Delete
const handleDelete = async (id) => {
  try {
    await deleteWorkCenter(id);
    toast.success("Deleted successfully!");
    fetchData();
  } catch (error) {
    toast.error("Delete failed!");
  }
};

const handleViewDoc = (item) => {
  const docPath = item?.Doc || item?.View || item?.file || item?.Document || item?.pdf;
  if (!docPath || docPath === "null" || docPath === "undefined") {
    toast.info(`No document attached to work center: ${item?.WorkCenterName || item?.WorkCenterCode || "this record"}`);
    return;
  }
  let url = docPath;
  if (docPath.startsWith("http://") || docPath.startsWith("https://")) {
    url = docPath;
  } else if (docPath.startsWith("/")) {
    url = `https://sellerp-backend.onrender.com${docPath}`;
  } else {
    url = `https://sellerp-backend.onrender.com/${docPath}`;
  }
  window.open(url, "_blank", "noopener,noreferrer");
};


const handleSave = async () => {
  try {
    await updateWorkCenter(editId, editData);
    setEditId(null);
    setEditData({});
    toast.success("Updated successfully!");
    fetchData();
  } catch (err) {
    console.error("Update error:", err);
    toast.error("Update failed!");
  }
};


const handleCancel = () => {
  setEditId(null);
  setEditData({});
};



const handleChange = (e) => {
  const { name, value } = e.target;
  setEditData((prev) => ({ ...prev, [name]: value }));
};

const handleExportExcel = () => {
  if (data.length === 0) {
    toast.warn("No records available to export");
    return;
  }

  const exportData = data.map((item, index) => ({
    "Sr": index + 1,
    "Plant": item.Plant || "",
    "Work Center Code": item.WorkCenterCode || "",
    "Work Center Name": item.WorkCenterName || "",
    "Machine Type": item.WorkCenterType || "",
    "Type Group": item.TypeGroup || "",
    "Category": item.Category || "",
    "W.Hr.Rate": item.Mhr_Rate || "",
    "PPM": item.PPM || ""
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Work Centers");

  const wscols = Object.keys(exportData[0] || {}).map(key => ({
    wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
  }));
  worksheet["!cols"] = wscols;

  XLSX.writeFile(workbook, "Work_Center_Master.xlsx");
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  
  return (
    <div className="erp-page work-center">
     

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
                <div className="workcentermaster overflow-hidden p-4">
                  <div className="container-fluid p-0">
                    
                    <div className="erp-header mb-4">
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <h5 className="header-title mb-0" style={{ fontWeight: 800, background: 'linear-gradient(to right, #6366f1, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
                          Work Center Master
                        </h5>
                        
                        <div className="d-flex gap-2 flex-wrap">
                          <Button variant="contained" onClick={handleAddNewClick} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #6366f1, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)' } }}>
                            <i className="fas fa-plus me-2"></i> Add New
                          </Button>
                          <Button variant="contained" onClick={handleNewButtonWork} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #6366f1, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)' } }}>
                            <i className="fas fa-cog me-2"></i> Work Center Type
                          </Button>
                          <Button variant="contained" onClick={handleExportExcel} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #10b981, #059669)', boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)', '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)' } }}>
                            <i className="fas fa-file-excel me-2"></i> Export Report
                          </Button>
                        </div>
                      </div>
                    </div>
  
                    {isCardVisible && (
                      <div className="overlay-workcenter">
                        <div className="card-work">
                          <div className="card-header-work">
                            <h5>Add New Work Center</h5>
                            <button
                              className="btn-close"
                              onClick={handleCloseCard}
                            >
                              ×
                            </button>
                          </div>
                          <AddNewCard/>
                         
                        </div>
                      </div>
                    )}
                {showNewCardWork && (
<WorkCenterType handleClose={handleNewButtonWork} />
)}

                  </div>
                  
                  <div className="centerMain mt-4">
                    <ToastContainer position="top-right" autoClose={3000} />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'flex-end', mb: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', width: '100%', textAlign: 'left' }}>Select Plant</Typography>
                          <TextField
                            select
                            size="small"
                            defaultValue="Produlink"
                            sx={{ minWidth: '180px', '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#fff' } }}
                          >
                            <MenuItem value="Produlink">Produlink</MenuItem>
                            <MenuItem value="1">One</MenuItem>
                            <MenuItem value="2">Two</MenuItem>
                            <MenuItem value="3">Three</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', width: '100%', textAlign: 'left' }}>Machine Type</Typography>
                          <TextField
                            select
                            size="small"
                            defaultValue="ALL"
                            sx={{ minWidth: '220px', '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#fff' } }}
                          >
                            <MenuItem value="ALL">ALL</MenuItem>
                            <MenuItem value="CENTERLESS GRINDING">CENTERLESS GRINDING</MenuItem>
                            <MenuItem value="CNC">CNC</MenuItem>
                            <MenuItem value="DRILLING">DRILLING</MenuItem>
                            <MenuItem value="GRINDER">GRINDER</MenuItem>
                            <MenuItem value="INDUCTION">INDUCTION</MenuItem>
                            <MenuItem value="LATHE">LATHE</MenuItem>
                            <MenuItem value="MANUAL">MANUAL</MenuItem>
                            <MenuItem value="MILLING">MILLING</MenuItem>
                            <MenuItem value="PRESS">PRESS</MenuItem>
                            <MenuItem value="SECOND OPERATION">SECOND OPERATION</MenuItem>
                            <MenuItem value="SPM">SPM</MenuItem>
                            <MenuItem value="TAPPING">TAPPING</MenuItem>
                            <MenuItem value="THREAD ROLLING">THREAD ROLLING</MenuItem>
                            <MenuItem value="TROUB">TROUB</MenuItem>
                            <MenuItem value="VMC">VMC</MenuItem>
                          </TextField>
                        </Box>

                        <Button variant="contained" sx={{ height: '38px', mt: 'auto', borderRadius: '8px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #6366f1, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)' } }}>
                          <i className="fas fa-search me-2"></i> Search
                        </Button>
                    </Box>
                  </div>
  

                  
                  <div className="workTable mt-4">
                    <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>
                      <TableContainer sx={{ maxHeight: 600, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>
                        <Table stickyHeader size="small" sx={{ tableLayout: 'fixed' }}>
  
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Sr</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Plant</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Work Center Code</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Work Center Name</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Machine Type</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Type Group</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Category</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>W.Hr.Rate</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>PPM</TableCell>
                              
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Edit</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Delete</TableCell>
                              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '16px' }}>Doc</TableCell>
                            </TableRow>
                          </TableHead>
                        <TableBody>
  {data.map((item, index) => (
    <TableRow key={item.id} hover sx={{ cursor: 'pointer', "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>{index + 1}</TableCell>
      <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>
        {editId === item.id ? (
          <TextField size="small" variant="outlined" name="Plant" value={editData.Plant || ''} onChange={handleChange} sx={{ minWidth: '120px', '& .MuiOutlinedInput-root': { borderRadius: '6px' } }} />
        ) : (
          item.Plant
        )}
      </TableCell>
      <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>
        {editId === item.id ? (
          <TextField size="small" variant="outlined" name="WorkCenterCode" value={editData.WorkCenterCode || ''} onChange={handleChange} sx={{ minWidth: '120px', '& .MuiOutlinedInput-root': { borderRadius: '6px' } }} />
        ) : (
          item.WorkCenterCode
        )}
      </TableCell>
      <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>
        {editId === item.id ? (
          <TextField size="small" variant="outlined" name="WorkCenterName" value={editData.WorkCenterName || ''} onChange={handleChange} sx={{ minWidth: '120px', '& .MuiOutlinedInput-root': { borderRadius: '6px' } }} />
        ) : (
          item.WorkCenterName
        )}
      </TableCell>
      <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>
        {editId === item.id ? (
          <TextField size="small" variant="outlined" name="WorkCenterType" value={editData.WorkCenterType || ''} onChange={handleChange} sx={{ minWidth: '120px', '& .MuiOutlinedInput-root': { borderRadius: '6px' } }} />
        ) : (
          item.WorkCenterType
        )}
      </TableCell>
      <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>{editId === item.id ? (
          <TextField size="small" variant="outlined" name="TypeGroup" value={editData.TypeGroup || ''} onChange={handleChange} sx={{ minWidth: '120px', '& .MuiOutlinedInput-root': { borderRadius: '6px' } }} />
        ) : (
          item.TypeGroup
        )}</TableCell>
      <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>
        {editId === item.id ? (
          <TextField size="small" variant="outlined" name="Category" value={editData.Category || ''} onChange={handleChange} sx={{ minWidth: '120px', '& .MuiOutlinedInput-root': { borderRadius: '6px' } }} />
        ) : (
          item.Category
        )}
      </TableCell>
      <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>
        {editId === item.id ? (
          <TextField size="small" variant="outlined" name="Mhr_Rate" value={editData.Mhr_Rate || ''} onChange={handleChange} sx={{ minWidth: '120px', '& .MuiOutlinedInput-root': { borderRadius: '6px' } }} />
        ) : (
          item.Mhr_Rate
        )}
      </TableCell>
      <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>
        {editId === item.id ? (
          <TextField size="small" variant="outlined" name="PPM" value={editData.PPM || ''} onChange={handleChange} sx={{ minWidth: '120px', '& .MuiOutlinedInput-root': { borderRadius: '6px' } }} />
        ) : (
          item.PPM
        )}
      </TableCell>
      
      <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>
        {editId === item.id ? (
          <>
            <Button size="small" variant="contained" onClick={handleSave} sx={{ minWidth: '60px', mr: 1, borderRadius: '6px', background: 'linear-gradient(to right, #10b981, #059669)', '&:hover': { background: '#047857' } }}>Save</Button>
            <Button size="small" variant="outlined" onClick={handleCancel} color="error" sx={{ minWidth: '60px', borderRadius: '6px' }}>Cancel</Button>
          </>
        ) : (
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEdit(item)} sx={{ color: '#3b82f6', '&:hover': { background: '#dbeafe' } }}><FaEdit style={{ fontSize: '16px' }} /></IconButton>
          </Tooltip>
        )}
      </TableCell>
      <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>
        <Tooltip title="Delete">
          <IconButton size="small" onClick={() => handleDelete(item.id)} sx={{ color: '#ef4444', '&:hover': { background: '#fee2e2' } }}><FaTrash style={{ fontSize: '16px' }} /></IconButton>
        </Tooltip>
      </TableCell>
      <TableCell sx={{ color: '#475569', fontSize: '0.85rem', padding: '12px 16px', whiteSpace: 'nowrap' }}>
        <Tooltip title="Documentation">
          <Button size="small" variant="outlined" onClick={() => handleViewDoc(item)} sx={{ borderRadius: '6px', textTransform: 'none', color: '#6366f1', borderColor: '#6366f1', '&:hover': { backgroundColor: '#eef2ff' } }}>Doc</Button>
        </Tooltip>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

          
                        </Table>
                      </TableContainer>
                    </Paper>
                  </div>
  
      
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 2, pb: 4 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b' }}>
                      <i className="fas fa-info-circle me-1"></i> Total Records: <strong style={{ color: '#6366f1' }}>{data.length}</strong>
                    </Typography>
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

export default WorkCenterMaster;