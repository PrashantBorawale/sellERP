import React, { useEffect, useState } from "react";
import { Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import { Link } from "react-router-dom";
import {
  fetchGstMasterRecords,
  createGstMasterRecord,
  updateGstMasterRecord,
  deleteGstMasterRecord,
} from "../../Service/Api.jsx";
import "./GstMaster.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";

const GstMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    HSN_SAC_Code: "",
    HSN_SAC_Desc: "",
    CGST: "",
    SGST: "",
    IGST: "",
    UTGST: "",
    export_SGST: "",
    export_CGST: "",
    export_IGST: "",
    Cess: "",
    Is_Exempt: "no",
    Type: "type1",
  });
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

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
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const data = await fetchGstMasterRecords();
      setRecords(data.sort((a, b) => b.id - a.id));
      console.log(data);
    } catch (error) {
      console.error(error.message);
      toast.error("Error fetching records");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExportExcel = () => {
    if (records.length === 0) {
      toast.warn("No records available to export");
      return;
    }

    const exportData = records.map((record, index) => ({
      "Sr": index + 1,
      "HSN Code": record.HSN_SAC_Code || "",
      "HSN Code Desc.": record.HSN_SAC_Desc || "",
      "CGST": record.CGST || "",
      "SGST": record.SGST || "",
      "IGST": record.IGST || "",
      "UTGST": record.UTGST || "",
      "Export CGST": record.export_CGST || "",
      "Export SGST": record.export_SGST || "",
      "Export IGST": record.export_IGST || "",
      "Cess": record.Cess || "",
      "DBK SrNo": record.DBK_SrNo || "",
      "Is Exempt": record.Is_Exempt || "",
      "Type": record.Type || "",
      "User": record.User || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "GST Master Records");

    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "GST_Master_Records.xlsx");
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.HSN_SAC_Code) {
      newErrors.HSN_SAC_Code = "This field is required";
    }
    if (!formData.HSN_SAC_Desc) {
      newErrors.HSN_SAC_Desc = "This field is required";
    }

    if (!formData.CGST) {
      newErrors.CGST = "This field is required";
    }
    if (!formData.SGST) {
      newErrors.SGST = "This field is required";
    }
    if (!formData.IGST) {
      newErrors.IGST = "This field is required";
    }
    if (!formData.UTGST) {
      newErrors.UTGST = "This field is required";
    }
    if (!formData.export_SGST) {
      newErrors.export_SGST = "This field is required";
    }
    if (!formData.export_CGST) {
      newErrors.export_CGST = "This field is required";
    }
    if (!formData.export_IGST) {
      newErrors.export_IGST = "This field is required";
    }
    if (!formData.Cess) {
      newErrors.Cess = "This field is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (editId) {
        await updateGstMasterRecord(editId, formData);
        setEditId(null);
        toast.success("Record updated successfully");
      } else {
        await createGstMasterRecord(formData);
        toast.success("Record created successfully");
      }
      setFormData({
        id: "",
        HSN_SAC_Code: "",
        HSN_SAC_Desc: "",
        CGST: "",
        SGST: "",
        IGST: "",
        UTGST: "",
        export_SGST: "",
        export_CGST: "",
        export_IGST: "",
        Cess: "",
        Is_Exempt: "no",
        Type: "type1",
      });
      setErrors({});
      fetchRecords();
    } catch (error) {
      console.error(error.message);
      toast.error("Error deleting record");
    }
  };

  const handleEdit = (record) => {
    setFormData(record);
    setEditId(record.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteGstMasterRecord(id);
      fetchRecords();
      toast.success("Record deleted successfully");
    } catch (error) {
      console.error(error.message);
      toast.error("Error deleting record");
    }
  };

  return (
    <div className="GstMaster">
      <ToastContainer />
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
                
                <div className="container-fluid p-0 py-4">
                  {/* Header Section */}
                  <div className="erp-header mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title mb-0">GST Rate Master</h5>
                      <div className="d-flex gap-2 flex-wrap justify-content-end">
                        <Link to="/task-master" className="vndrbtn">Tax Code Master</Link>
                        <Link to="/Cut-wise" className="vndrbtn">Cust-Wise GST Master</Link>
                        <Link to="/Customer-Item-Wise-Gst" className="vndrbtn">Cut-Wise GST Rate - Excel Upload</Link>
                        <button className="vndrbtn" onClick={handleExportExcel}>Export To Excel</button>
                      </div>
                    </div>
                  </div>
  

                  <div className="GstMasterMain mt-5">
                    <div className="container-fluid p-0">
                      <div className="row m-0">
                        <div className="col-md-12 p-0">
                          
                          <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: 'white', overflow: 'auto' }}>
                            <TableContainer sx={{ overflowX: 'auto', '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>
                              <Table size="small">
  
                              <TableHead>
                                <TableRow>
                                  <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>HSN/SAC Code{" "}
                                    <span className="text-danger">*</span></TableCell>
                                  <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>HSN/SAC Desc.
                                    <span className="text-danger">*</span></TableCell>
                                  <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>Domestic</TableCell>
                                  <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>Export</TableCell>
                                  <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>Action</TableCell>
                                  <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}></TableCell>
                                  <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '6px', verticalAlign: 'top' }}><input
                                      type="text"
                                      className="form-control" style={{ borderRadius: '6px', fontSize: '0.75rem' }}
                                      name="HSN_SAC_Code"
                                      value={formData.HSN_SAC_Code}
                                      onChange={handleInputChange}
                                      placeholder="Tariff code"
                                    />
                                    {errors.HSN_SAC_Code && (
                                      <div className="text-danger">
                                        {errors.HSN_SAC_Code}
                                      </div>
                                    )}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '6px', verticalAlign: 'top' }}><textarea
                                      className="form-control" style={{ borderRadius: '6px', fontSize: '0.75rem' }}
                                      name="HSN_SAC_Desc"
                                      value={formData.HSN_SAC_Desc}
                                      onChange={handleInputChange}
                                    ></textarea>
                                    {errors.HSN_SAC_Desc && (
                                      <div className="text-danger">
                                        {errors.HSN_SAC_Desc}
                                      </div>
                                    )}</TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '6px', verticalAlign: 'top' }}><Table size="small" sx={{ margin: 0, '& .MuiTableCell-root': { borderBottom: 'none' } }}><TableHead>
                                      <TableRow>
                                        <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>CGST (%)
                                          <span className="text-danger">*</span></TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>SGST (%)
                                          <span className="text-danger">*</span></TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>IGST (%)
                                          <span className="text-danger">*</span></TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>UTGST (%)
                                          <span className="text-danger">*</span></TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      <TableRow>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control mb-2" style={{ borderRadius: '6px', fontSize: '0.75rem' }}
                                            name="CGST"
                                            value={formData.CGST}
                                            onChange={handleInputChange}
                                            placeholder="CGST (%)"
                                          />
                                          {errors.CGST && (
                                            <div className="text-danger">
                                              {errors.CGST}
                                            </div>
                                          )}</td>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '6px', verticalAlign: 'top' }}><input
                                            type="text"
                                            className="form-control mb-2" style={{ borderRadius: '6px', fontSize: '0.75rem' }}
                                            name="SGST"
                                            value={formData.SGST}
                                            onChange={handleInputChange}
                                            placeholder="SGST (%)"
                                          />
                                          {errors.SGST && (
                                            <div className="text-danger">
                                              {errors.SGST}
                                            </div>
                                          )}</TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '6px', verticalAlign: 'top' }}><input
                                            type="text"
                                            className="form-control mb-2" style={{ borderRadius: '6px', fontSize: '0.75rem' }}
                                            name="IGST"
                                            value={formData.IGST}
                                            onChange={handleInputChange}
                                            placeholder="IGST (%)"
                                          />
                                          {errors.IGST && (
                                            <div className="text-danger">
                                              {errors.IGST}
                                            </div>
                                          )}</TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '6px', verticalAlign: 'top' }}><input
                                            type="text"
                                            className="form-control mb-2" style={{ borderRadius: '6px', fontSize: '0.75rem' }}
                                            name="UTGST"
                                            value={formData.UTGST}
                                            onChange={handleInputChange}
                                            placeholder="UTGST (%)"
                                          />
                                          {errors.UTGST && (
                                            <div className="text-danger">
                                              {errors.UTGST}
                                            </div>
                                          )}</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table></TableCell>
                                  <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '6px', verticalAlign: 'top' }}><Table size="small" sx={{ margin: 0, '& .MuiTableCell-root': { borderBottom: 'none' } }}><TableHead>
                                      <TableRow>
                                        <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>SGST (%)
                                          <span className="text-danger">*</span></TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>CGST (%)
                                          <span className="text-danger">*</span></TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>IGST (%)
                                          <span className="text-danger">*</span></TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>CESS (%)
                                          <span className="text-danger">*</span></TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      <TableRow>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control mb-2" style={{ borderRadius: '6px', fontSize: '0.75rem' }}
                                            name="export_SGST"
                                            value={formData.export_SGST}
                                            onChange={handleInputChange}
                                            placeholder="SGST (%)"
                                          />
                                          {errors.export_SGST && (
                                            <div className="text-danger">
                                              {errors.export_SGST}
                                            </div>
                                          )}</td>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '6px', verticalAlign: 'top' }}><input
                                            type="text"
                                            className="form-control mb-2" style={{ borderRadius: '6px', fontSize: '0.75rem' }}
                                            name="export_CGST"
                                            value={formData.export_CGST}
                                            onChange={handleInputChange}
                                            placeholder="CGST (%)"
                                          />
                                          {errors.export_CGST && (
                                            <div className="text-danger">
                                              {errors.export_CGST}
                                            </div>
                                          )}</TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '6px', verticalAlign: 'top' }}><input
                                            type="text"
                                            className="form-control mb-2" style={{ borderRadius: '6px', fontSize: '0.75rem' }}
                                            name="export_IGST"
                                            value={formData.export_IGST}
                                            onChange={handleInputChange}
                                            placeholder="IGST (%)"
                                          />
                                          {errors.export_IGST && (
                                            <div className="text-danger">
                                              {errors.export_IGST}
                                            </div>
                                          )}</TableCell>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '6px', verticalAlign: 'top' }}><input
                                            type="text"
                                            className="form-control mb-2" style={{ borderRadius: '6px', fontSize: '0.75rem' }}
                                            name="Cess"
                                            value={formData.Cess}
                                            onChange={handleInputChange}
                                            placeholder="Cess (%)"
                                          />
                                          {errors.Cess && (
                                            <div className="text-danger">
                                              {errors.Cess}
                                            </div>
                                          )}</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table></TableCell>

                                  <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '6px', verticalAlign: 'top' }}><Table size="small" sx={{ margin: 0, '& .MuiTableCell-root': { borderBottom: 'none' } }}><TableHead>
                                      <TableRow>
                                        <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>Is Exempt</TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>Type</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      <TableRow>
                                        <td>
                                          <select
                                            className="form-control" style={{ borderRadius: '6px', fontSize: '0.75rem' }}
                                            name="Is_Exempt"
                                            value={formData.Is_Exempt}
                                            onChange={handleInputChange}
                                          >
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                          </select></td>
                                        <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '6px', verticalAlign: 'top' }}><select
                                            className="form-control" style={{ borderRadius: '6px', fontSize: '0.75rem', width: '75px' }}
                                            name="Type"
                                            value={formData.Type}
                                            onChange={handleInputChange}
                                          >
                                            <option value="HSN">HSN</option>
                                            <option value="SAC">SAC</option>
                                          </select></TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table></TableCell>

                                  <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '6px', verticalAlign: 'middle', whiteSpace: 'nowrap', minWidth: '80px' }}><Button variant="contained" onClick={handleSave} sx={{ height: '36px', minWidth: '70px', borderRadius: '8px', textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', whiteSpace: 'nowrap', background: 'linear-gradient(to right, #6366f1, #4f46e5)', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', '&:hover': { background: 'linear-gradient(to right, #4f46e5, #4338ca)', transform: 'translateY(-1px)' } }}>
                                      Save</Button></TableCell>
                                </TableRow>
                              </TableBody>
                            
                              </Table>
                            </TableContainer>
                          </Paper>
                        </div>
                      </div>
                    </div>

                    
                  <div className="GstMastertable mt-4" style={{ width: '100%', maxWidth: '100%', minWidth: 0 }}>
                    <Paper elevation={0} sx={{ width: '100%', maxWidth: '100%', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>
                      <TableContainer sx={{ width: '100%', maxWidth: '100%', maxHeight: 600, overflowX: 'auto', '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>
                        <Table stickyHeader size="small" sx={{ width: '100%' }}>
  
                                <TableHead>
                                  <TableRow>
                                    <TableCell sx={{ width: '3%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>Sr</TableCell>
                                    <TableCell sx={{ width: '8%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>HSN Code</TableCell>
                                    <TableCell sx={{ width: '28%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>HSN Code Desc.</TableCell>
                                    <TableCell sx={{ width: '4%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>CGST</TableCell>
                                    <TableCell sx={{ width: '4%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>SGST</TableCell>
                                    <TableCell sx={{ width: '4%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>IGST</TableCell>
                                    <TableCell sx={{ width: '4%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>UTGST</TableCell>
                                    <TableCell sx={{ width: '5%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>Export CGST</TableCell>
                                    <TableCell sx={{ width: '5%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>Export SGST</TableCell>
                                    <TableCell sx={{ width: '5%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>Export IGST</TableCell>
                                    <TableCell sx={{ width: '4%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>Cess</TableCell>
                                    <TableCell sx={{ width: '5%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>DBK SrNo</TableCell>
                                    <TableCell sx={{ width: '5%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>Is Exempt</TableCell>
                                    <TableCell sx={{ width: '4%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>Type</TableCell>
                                    <TableCell sx={{ width: '6%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>User</TableCell>
                                    <TableCell sx={{ width: '6%', whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '6px' }}>Action</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {records.map((record, index) => (
                                    <TableRow key={record.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}>{index + 1}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}>{record.HSN_SAC_Code}</TableCell>

                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px', wordWrap: 'break-word', whiteSpace: 'normal' }}>{record.HSN_SAC_Desc}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}>{record.CGST}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}>{record.SGST}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}>{record.IGST}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}>{record.UTGST}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}>{record.export_CGST}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}>{record.export_SGST}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}>{record.export_IGST}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}>{record.Cess}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}>{record.DBK_SrNo}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}>{record.Is_Exempt}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}>{record.Type}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}>{record.User}</TableCell>
                                      <TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '4px 6px' }}><IconButton onClick={() => handleEdit(record)} size="small" sx={{ color: '#f59e0b', '&:hover': { background: '#fef3c7' } }}><i className="fas fa-edit" style={{ fontSize: '16px' }}></i></IconButton>
                                        <IconButton onClick={() => handleDelete(record.id)} size="small" sx={{ color: '#ef4444', '&:hover': { background: '#fee2e2' } }}><i className="fas fa-trash" style={{ fontSize: '16px' }}></i></IconButton></TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              
                        </Table>
                      </TableContainer>
                    </Paper>
                  </div>
      
                  </div>
                  
                  <div className="row text-start mt-2 px-2">
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b' }}>
                      Total Records: {records.length}
                    </Typography>
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

export default GstMaster;