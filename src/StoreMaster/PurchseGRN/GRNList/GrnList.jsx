import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link, useNavigate } from "react-router-dom";
import "./GrnList.css";
import { getGrnDetails, deleteGrn } from "../../../Service/StoreApi.jsx";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Typography, Box, Tooltip, Button, Pagination, TextField, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import ListAltIcon from "@mui/icons-material/ListAltOutlined";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import * as XLSX from "xlsx";

const GrnList = () => {
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

  const [grnData, setGrnData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter States
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [plant, setPlant] = useState("Produlink");
  const [supplierName, setSupplierName] = useState("");
  const [itemName, setItemName] = useState("");
  const [mainGroup, setMainGroup] = useState("");
  const [grnNo, setGrnNo] = useState("");
  const [poNo, setPoNo] = useState("");

  useEffect(() => {
    fetchGrnList();
  }, []);

  const fetchGrnList = async () => {
    try {
      const data = await getGrnDetails();
      if (Array.isArray(data)) {
        setGrnData(data.sort((a, b) => b.id - a.id));
      }
    } catch (err) {
      console.error("Failed to load GRN data:", err);
    }
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/Purchase-Grn/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this GRN?");
    if (confirmDelete) {
      try {
        await deleteGrn(id);
        setGrnData((prevData) => prevData.filter((item) => item.id !== id));
        alert("GRN Deleted Successfully");
      } catch (error) {
        alert("Failed to delete GRN");
      }
    }
  };

  const handleViewPdf = (item) => {
    const viewPath = item?.PDF_Link || item?.View || item?.pdf || item?.file || item?.document;
    if (viewPath && viewPath !== "null" && viewPath !== "undefined" && viewPath !== "") {
      let url = viewPath;
      if (viewPath.startsWith("http://") || viewPath.startsWith("https://")) {
        url = viewPath;
      } else if (viewPath.startsWith("/")) {
        url = `https://sellerp-backend.onrender.com${viewPath}`;
      } else {
        url = `https://sellerp-backend.onrender.com/${viewPath}`;
      }
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (item?.id) {
      window.open(`https://sellerp-backend.onrender.com/Store/grn-pdf/${item.id}/`, "_blank", "noopener,noreferrer");
    } else {
      alert(`No PDF attached or generated for GRN: ${item?.GrnNo || "this record"}`);
    }
  };

  const handleExportExcel = () => {
    if (grnData.length === 0) {
      alert("No data to export");
      return;
    }
    const exportData = grnData.map((item, index) => ({
      "Sr.": index + 1,
      "Year": item.GrnDate ? new Date(item.GrnDate).getFullYear() : "-",
      "Plant": item.Plant || "-",
      "GRN No": item.GrnNo || "-",
      "GRN Date": item.GrnDate || "-",
      "Entry Date": item.GrnDate || "-",
      "Challan No": item.ChallanNo || "-",
      "Challan Date": item.ChallanDate || "-",
      "Invoice No": item.InvoiceNo || "-",
      "Invoice Date": item.InvoiceDate || "-",
      "Supplier Name": item.SelectSupplier || "-",
      "PO No": item.SelectPO || "-",
      "User": "Admin"
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase GRN List");

    const wscols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, ...exportData.map(row => row[key] ? row[key].toString().length : 0)) + 2
    }));
    worksheet["!cols"] = wscols;

    XLSX.writeFile(workbook, "Purchase_GRN_List.xlsx");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = grnData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(grnData.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="PurchaseGrnListMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  {/* Header Section */}
                  <div className="erp-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-4 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          Purchase GRN List
                        </Typography>
                      </div>
                      <div className="col-md-8 d-flex justify-content-end gap-2 flex-wrap">
                        <Link to={"/Purchase-Grn"} style={{ textDecoration: 'none' }}>
                          <button className="vndrbtn bg-primary border-primary"><AddIcon className="me-1" /> New Purchase GRN</button>
                        </Link>
                        <button className="vndrbtn bg-primary border-primary"><ListAltIcon className="me-1" /> GRN Report</button>
                        <button className="vndrbtn bg-primary border-primary"><ListAltIcon className="me-1" /> GRN - Query</button>
                        <button className="vndrbtn bg-success border-success" onClick={handleExportExcel}><DownloadIcon className="me-1" /> Export To Excel</button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="centerMain mt-4">
                    <form>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'flex-end', mb: 4, width: '100%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 120px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>From Date</Typography>
                          <TextField
                            type="date"
                            size="small"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 120px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>To Date</Typography>
                          <TextField
                            type="date"
                            size="small"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 110px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Plant</Typography>
                          <TextField
                            select
                            size="small"
                            value={plant}
                            onChange={(e) => setPlant(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' } }}
                          >
                            <MenuItem value="Produlink" sx={{ fontSize: '0.75rem' }}>Produlink</MenuItem>
                          </TextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 130px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Supplier Name</Typography>
                          <TextField
                            size="small"
                            placeholder="Supplier Name"
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 130px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>Item Name</Typography>
                          <TextField
                            size="small"
                            placeholder="Item Name"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 110px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>GRN No.</Typography>
                          <TextField
                            size="small"
                            placeholder="GRN No."
                            value={grnNo}
                            onChange={(e) => setGrnNo(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, flex: '1 1 110px', minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', fontSize: '0.7rem', textAlign: 'left', width: '100%' }}>PO No.</Typography>
                          <TextField
                            size="small"
                            placeholder="PO No."
                            value={poNo}
                            onChange={(e) => setPoNo(e.target.value)}
                            sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '6px', backgroundColor: '#fff', fontSize: '0.75rem', height: '32px' }, '& .MuiOutlinedInput-input': { padding: '0 8px', height: '100%' } }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.2 }}>
                          <button type="button" className="vndrbtn bg-primary border-primary" style={{ padding: '4px 16px', height: '32px' }}>
                            <FaSearch className="me-1" /> Search
                          </button>
                        </Box>
                      </Box>
                    </form>
                  </div>

                  {/* Table Section */}
                  <div className="card shadow-sm border-0 mb-4 erp-table-container" style={{ borderRadius: '12px' }}>
                    <div className="table-responsive erp-table-wrapper">
                      <table className="table table-bordered table-hover mb-0" style={{ width: '100%', tableLayout: 'fixed' }}>
                        <thead className="table-light sticky-top" style={{ zIndex: 10 }}>
                          <tr>
                            {["Sr.", "Year", "Plant", "GRN No", "GRN Date", "Entry Date", "Challan No", "Challan Date", "Invoice No", "Invoice Date", "Supplier Name", "PO No", "User", "Actions"].map((head, index) => {
                              const colWidths = ["4%", "5%", "6%", "6%", "7%", "7%", "7%", "7%", "7%", "7%", "13%", "6%", "6%", "12%"];
                              return (
                                <th key={index} style={{ backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.62rem', textTransform: 'uppercase', padding: '4px 4px', textAlign: (head.includes("No") || head === "Sr.") ? "center" : "left", width: colWidths[index] }}>
                                  <div className="cell-clamp">
                                    {head}
                                  </div>
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {grnData.length === 0 ? (
                            <tr>
                              <td colSpan={14} className="text-center py-5 text-muted fw-bold">No Records Found</td>
                            </tr>
                          ) : (
                            currentItems.map((item, index) => (
                              <tr key={item.id}>
                                <td style={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}>{indexOfFirstItem + index + 1}</td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.GrnDate ? new Date(item.GrnDate).getFullYear() : "-"}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.Plant || "-"}</div></td>
                                <td style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}><div className="cell-clamp">{item.GrnNo || "-"}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.GrnDate || "-"}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.GrnDate || "-"}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}><div className="cell-clamp">{item.ChallanNo || "-"}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.ChallanDate || "-"}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}><div className="cell-clamp">{item.InvoiceNo || "-"}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.InvoiceDate || "-"}</div></td>
                                <td style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">{item.SelectSupplier || "-"}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'center' }}><div className="cell-clamp">{item.SelectPO || "-"}</div></td>
                                <td style={{ color: '#64748b', fontSize: '0.75rem', padding: '4px 8px', textAlign: 'left' }}><div className="cell-clamp">Admin</div></td>
                                <td style={{ textAlign: 'center', padding: '4px 8px', whiteSpace: 'nowrap' }}>
                                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                                    <Tooltip title="Edit GRN">
                                      <Button onClick={() => handleEdit(item.id)} sx={{ minWidth: 0, p: 0.5, color: '#f59e0b', bgcolor: '#fef3c7', borderRadius: '6px', '&:hover': { bgcolor: '#fde68a' } }}>
                                        <FaEdit size={14} />
                                      </Button>
                                    </Tooltip>
                                    <Tooltip title="View PDF Document">
                                      <Button onClick={() => handleViewPdf(item)} sx={{ minWidth: 0, p: 0.5, color: '#3b82f6', bgcolor: '#dbeafe', borderRadius: '6px', '&:hover': { bgcolor: '#bfdbfe' } }}>
                                        <VisibilityIcon sx={{ fontSize: 16 }} />
                                      </Button>
                                    </Tooltip>
                                    <Tooltip title="Delete GRN">
                                      <Button onClick={() => handleDelete(item.id)} sx={{ minWidth: 0, p: 0.5, color: '#ef4444', bgcolor: '#fee2e2', borderRadius: '6px', '&:hover': { bgcolor: '#fecaca' } }}>
                                        <FaTrash size={14} />
                                      </Button>
                                    </Tooltip>
                                  </Box>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pagination Section */}
                  {grnData.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, px: 1 }}>
                      <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, fontSize: '0.75rem' }}>
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, grnData.length)} of {grnData.length} entries
                      </Typography>
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="small"
                        shape="rounded"
                        sx={{
                          '& .MuiPaginationItem-root': {
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            borderRadius: '6px',
                          }
                        }}
                      />
                    </Box>
                  )}

                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrnList;
