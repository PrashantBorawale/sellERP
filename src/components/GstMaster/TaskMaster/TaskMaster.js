import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import { Link } from "react-router-dom";
import {
  getTaxCodes,
  createTaxCode,
  updateTaxCode,
  deleteTaxCode,
} from "../../../Service/Api.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TaskMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [taxCodes, setTaxCodes] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    Tax_Code: "",
    Tax_Desc: "",
    Module: "",
    GST_Tax_Code: "",
    CGST: "",
    SGST: "",
    IGST: "",
    Cess: "",
  });
  const [editMode, setEditMode] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  useEffect(() => {
    fetchTaxCodes();
  }, []);

  const fetchTaxCodes = async () => {
    try {
      const data = await getTaxCodes();
      setTaxCodes(data);
    } catch (error) {
      console.error("Error fetching tax codes:", error);
      toast.error("Failed to fetch tax codes.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await updateTaxCode(formData.id, formData);
        toast.success("Tax code updated successfully!");
      } else {
        await createTaxCode(formData);
        toast.success("Tax code created successfully!");
      }
      fetchTaxCodes();
      resetForm();
    } catch (error) {
      console.error("Error saving tax code:", error);
      toast.error("Failed to save tax code.");
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTaxCode(id);
      fetchTaxCodes();
      toast.success("Tax code deleted successfully!");
    } catch (error) {
      console.error("Error deleting tax code:", error);
      toast.error("Failed to delete tax code.");
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: "",
      Tax_Code: "",
      Tax_Desc: "",
      Module: "",
      GST_Tax_Code: "",
      CGST: "",
      SGST: "",
      IGST: "",
      Cess: "",
    });
    setEditMode(false);
  };

  return (
    <div className="erp-page">
      <ToastContainer />
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-12 p-0">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="container-fluid py-3 overflow-hidden">
                  
                  {/* Header Section */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="header-title mb-0" style={{ fontSize: "22px", fontWeight: "700", color: "blue" }}>Tax Code Master</h5>
                    <div className="d-flex gap-2 align-items-center">
                      <Link to="/gst-rate-master" className="vndrbtn mx-1" style={{ textDecoration: 'none' }}>
                        GST Rate Master
                      </Link>
                      <button className="vndrbtn mx-1">
                        Export To Excel
                      </button>
                    </div>
                  </div>

                  {/* Input Form Table */}
                  <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>
                    <TableContainer sx={{ '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>
                      <Table size="small" sx={{ tableLayout: 'auto', width: '100%' }}>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap' }}>Tax Code</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', minWidth: '150px' }}>Tax Desc</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap' }}>Module</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap' }}>GST Tax Code</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'right' }}>CGST (%)</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'right' }}>SGST (%)</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'right' }}>IGST (%)</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'right' }}>Cess (%)</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell sx={{ padding: '8px 4px', whiteSpace: 'nowrap' }}>
                              <input type="text" name="Tax_Code" value={formData.Tax_Code} onChange={handleInputChange} className="form-control form-control-sm" style={{ minWidth: '90px' }} />
                            </TableCell>
                            <TableCell sx={{ padding: '8px 4px' }}>
                              <input type="text" name="Tax_Desc" value={formData.Tax_Desc} onChange={handleInputChange} className="form-control form-control-sm" style={{ minWidth: '150px' }} />
                            </TableCell>
                            <TableCell sx={{ padding: '8px 4px', whiteSpace: 'nowrap' }}>
                              <select name="Module" value={formData.Module} onChange={handleInputChange} className="form-select form-select-sm" style={{ minWidth: '100px' }}>
                                <option value="">Select Module</option>
                                <option value="purchase">Purchase</option>
                                <option value="sales">Sales</option>
                              </select>
                            </TableCell>
                            <TableCell sx={{ padding: '8px 4px', whiteSpace: 'nowrap' }}>
                              <select name="GST_Tax_Code" value={formData.GST_Tax_Code} onChange={handleInputChange} className="form-select form-select-sm" style={{ minWidth: '120px' }}>
                                <option value="">Select Code</option>
                                <option value="CGST+SGST">CGST+SGST</option>
                                <option value="IGST">IGST</option>
                              </select>
                            </TableCell>
                            <TableCell sx={{ padding: '8px 4px', whiteSpace: 'nowrap' }}>
                              <input type="text" name="CGST" value={formData.CGST} onChange={handleInputChange} className="form-control form-control-sm" style={{ minWidth: '60px', textAlign: 'right' }} />
                            </TableCell>
                            <TableCell sx={{ padding: '8px 4px', whiteSpace: 'nowrap' }}>
                              <input type="text" name="SGST" value={formData.SGST} onChange={handleInputChange} className="form-control form-control-sm" style={{ minWidth: '60px', textAlign: 'right' }} />
                            </TableCell>
                            <TableCell sx={{ padding: '8px 4px', whiteSpace: 'nowrap' }}>
                              <input type="text" name="IGST" value={formData.IGST} onChange={handleInputChange} className="form-control form-control-sm" style={{ minWidth: '60px', textAlign: 'right' }} />
                            </TableCell>
                            <TableCell sx={{ padding: '8px 4px', whiteSpace: 'nowrap' }}>
                              <input type="text" name="Cess" value={formData.Cess} onChange={handleInputChange} className="form-control form-control-sm" style={{ minWidth: '60px', textAlign: 'right' }} />
                            </TableCell>
                            <TableCell sx={{ padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                              <div className="d-flex align-items-center justify-content-center gap-1">
                                <button onClick={handleSave} className="vndrbtn btn-sm" style={{ padding: '4px 8px', fontSize: '11px' }}>
                                  {editMode ? "Update" : "Save"}
                                </button>
                                <button onClick={handleCancel} className="vndrbtn btn-sm" style={{ padding: '4px 8px', fontSize: '11px', color: '#dc2626' }}>
                                  Cancel
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>

                  {/* List Section */}
                  <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>
                    <TableContainer sx={{ maxHeight: 600, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>
                      <Table stickyHeader size="small" sx={{ tableLayout: 'auto', width: '100%' }}>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap' }}>Sr.</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap' }}>Tax Code</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', minWidth: '150px' }}>Tax Desc</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap' }}>Module</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap' }}>GST Tax Code</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'right' }}>CGST (%)</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'right' }}>SGST (%)</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'right' }}>IGST (%)</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'right' }}>Cess (%)</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Edit</TableCell>
                            <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '8px 4px', whiteSpace: 'nowrap', textAlign: 'center' }}>Delete</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {taxCodes.length > 0 ? (
                            taxCodes.map((item, index) => (
                              <TableRow key={item.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap' }}>{index + 1}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap' }}>{item.Tax_Code}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', minWidth: '150px' }}>{item.Tax_Desc}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap' }}>{item.Module}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap' }}>{item.GST_Tax_Code}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'right' }}>{item.CGST}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'right' }}>{item.SGST}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'right' }}>{item.IGST}</TableCell>
                                <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'right' }}>{item.Cess}</TableCell>
                                <TableCell sx={{ padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                  <button onClick={() => handleEdit(item)} className="btn btn-sm btn-link p-0 text-primary">
                                    <i className="fas fa-edit"></i>
                                  </button>
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                  <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-link p-0 text-danger">
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={11} sx={{ textAlign: 'center', py: 3, color: '#64748b' }}>
                                No tax codes found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>

                  <div className="row text-start mt-2">
                    <div className="col-md-12">
                      <h6 style={{ color: "blue", fontWeight: 'bold' }}>
                        Total Record: {taxCodes.length}
                      </h6>
                    </div>
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

export default TaskMaster;
