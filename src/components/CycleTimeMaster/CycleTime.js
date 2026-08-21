import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./CycleTime.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchCycleTimeList, deleteCycleTimeData } from "../../Service/Api.jsx";
import * as XLSX from "xlsx";

const CycleTime = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const fetchCycleTimeListItems = async () => {
    setLoading(true);
    try {
      const data = await fetchCycleTimeList();
      const recordsData = Array.isArray(data) ? data.reverse() : [];
      setRecords(recordsData);
      setFilteredRecords(recordsData);
    } catch (error) {
      console.error("Error fetching cycle time list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCycleTimeListItems();
  }, []);

  const handleSearch = () => {
    const filtered = records.filter(record =>
      (record.part_no && record.part_no.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (record.part_desc && record.part_desc.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (record.PartCode && record.PartCode.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredRecords(filtered);
  };

  const handleViewAll = () => {
    setSearchTerm("");
    setFilteredRecords(records);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteCycleTimeData(id);
        fetchCycleTimeListItems();
      } catch (error) {
        console.log("Failed to delete record");
      }
    }
  };

  const handleEdit = (record) => {
    navigate("/add-cycle-time", { state: { editRecord: record } });
  };

  const handleAddNewCycleTime = () => {
    navigate("/add-cycle-time");
  };

  const handleExportExcel = () => {
    if (filteredRecords.length === 0) {
      alert("No records available to export");
      return;
    }

    const exportData = filteredRecords.map((record, index) => {
      const partCodeText = record.PartCode && record.PartCode.includes(" | ")
        ? record.PartCode
        : `${record.op_no || record.OPNo || ""} | ${record.PartCode || record.part_code || ""} | ${record.operation || ""}`;

      return {
        "Sr.": index + 1,
        "Part No": record.part_no || "",
        "Part Description": record.part_desc || "",
        "Part Code": partCodeText || "",
        "Machine Type": record.MachineType || "",
        "Machine": record.Machine || "",
        "Total Time": record.Total_Time || "0",
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cycle Time Master");

    // Adjust column widths
    const wscols = Object.keys(exportData[0]).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Cycle_Time_Master.xlsx");
  };

  return (
    <div className="erp-page Cycletimecenter">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="Cycletimermaster overflow-hidden p-4">
                  <div className="erp-header mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="header-title mb-0">Cycle Time Master</h5>
                      <div className="d-flex gap-2">
                        <button className="vndrbtn" onClick={handleAddNewCycleTime}>
                          <i className="fas fa-plus me-2"></i> Add New Cycle Time
                        </button>
                        <button className="vndrbtn">
                          <i className="fas fa-chart-bar me-2"></i> Report
                        </button>
                        <button className="vndrbtn" onClick={handleExportExcel}>
                          <i className="fas fa-file-excel me-2"></i> Export Report
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body">
                      <div className="row g-3 align-items-end">
                        <div className="col-md-4">
                          <label className="form-label text-start w-100 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                            Item Search
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search Part No or Desc"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="col-md-4 d-flex gap-2 mt-auto">
                          <button className="vndrbtn" onClick={handleSearch}>
                            <i className="fas fa-search me-2"></i> Search
                          </button>
                          <button className="vndrbtn erp-btn-outline" onClick={handleViewAll}>
                            <i className="fas fa-list me-2"></i> View All
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive mt-4">
                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 2 }}>
            <Table size="small" stickyHeader sx={{ tableLayout: 'auto', width: '100%' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>Sr</TableCell>
                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>Part No</TableCell>
                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>Part Description</TableCell>
                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>Part Code</TableCell>
                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>Machine Type</TableCell>
                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>Machine</TableCell>
                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>Total Time</TableCell>
                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>Edit</TableCell>
                          <TableCell sx={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <td colSpan={9} className="text-center py-3 text-muted">Loading...</td>
                          </TableRow>
                        ) : filteredRecords.length > 0 ? (
                          filteredRecords.map((record, index) => (
                            <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{index + 1}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{record.part_no}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{record.part_desc}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                {record.PartCode && record.PartCode.includes(" | ")
                                  ? record.PartCode
                                  : `${record.op_no || record.OPNo || ""} | ${record.PartCode || record.part_code || ""} | ${record.operation || ""}`}
                              </TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{record.MachineType}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{record.Machine}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '8px', whiteSpace: 'nowrap', textAlign: 'center' }}>{record.Total_Time}</TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                <button className="btn btn-sm text-primary border-0 p-0" title="Edit" onClick={() => handleEdit(record)}>
                                  <i className="fas fa-edit" style={{ fontSize: '16px' }}></i>
                                </button>
                              </TableCell>
                              <TableCell sx={{ color: '#475569', fontSize: '12px', padding: '8px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                <button className="btn btn-sm text-danger border-0 p-0" title="Delete" onClick={() => handleDelete(record.id)}>
                                  <i className="fas fa-trash-alt" style={{ fontSize: '16px' }}></i>
                                </button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <td colSpan={9} className="text-center py-3 text-muted">No Records Found</td>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
          </TableContainer>
                  </div>

                  <div className="row mt-3 align-items-center">
                    <div className="col-md-6 text-start">
                      <span className="record-count">Total Records: <strong>{filteredRecords.length}</strong></span>
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

export default CycleTime;