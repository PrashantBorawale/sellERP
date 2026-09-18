const fs = require('fs');
const path = require('path');

const filePath = path.join('C:', 'Users', 'admin', 'Desktop', 'FinalFiles', '5-6_ERP', 'src', 'StoreMaster', 'GateInwardEntry', 'GateInwardEntry.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add MUI imports
if (!content.includes('@mui/material')) {
  content = content.replace(
    /import \{ FaEdit, FaTrash \} from "react-icons\/fa";/,
    `import { FaEdit, FaTrash } from "react-icons/fa";
import { 
  Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, Select, MenuItem, TableFooter, Pagination 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import ListAltIcon from "@mui/icons-material/ListAltOutlined";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";`
  );
}

// 2. Replace Header, Filter, and Table layout
const mainRegex = /<main className=\{`main-content \$\{sideNavOpen \? "shifted" : ""\}`\}>([\s\S]*?)<\/main>/;

const newMainContent = `
              <main className={\`main-content \${sideNavOpen ? "shifted" : ""}\`} style={{ flex: 1, minWidth: 0, width: '100%', overflow: 'hidden' }}>
                <Box sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
                  
                  {/* Header Section */}
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      mb: 3, 
                      borderRadius: '16px', 
                      border: '1px solid #e2e8f0', 
                      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 2,
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 800, 
                        background: 'linear-gradient(90deg, #2563eb, #4f46e5)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent' 
                      }}
                    >
                      Gate Entry Inward Register
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button 
                        component={Link}
                        to={"/New-Gate-Entry"}
                        variant="contained" 
                        startIcon={<AddIcon />} 
                        sx={{ 
                          borderRadius: '10px', 
                          textTransform: 'none', 
                          fontWeight: 600, 
                          background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
                          color: 'white',
                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                          '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)' }
                        }}
                      >
                        New Gate Entry
                      </Button>

                      <Button 
                        variant="outlined" 
                        startIcon={<ListAltIcon />} 
                        sx={{ 
                          borderRadius: '10px', 
                          textTransform: 'none', 
                          fontWeight: 600, 
                          color: '#4f46e5', 
                          borderColor: '#4f46e5',
                          '&:hover': { backgroundColor: '#eef2ff', borderColor: '#4338ca', color: '#4338ca' }
                        }}
                      >
                        Material Reg
                      </Button>

                      <Button 
                        variant="outlined" 
                        startIcon={<ListAltIcon />} 
                        sx={{ 
                          borderRadius: '10px', 
                          textTransform: 'none', 
                          fontWeight: 600, 
                          color: '#4f46e5', 
                          borderColor: '#4f46e5',
                          '&:hover': { backgroundColor: '#eef2ff', borderColor: '#4338ca', color: '#4338ca' }
                        }}
                      >
                        Query
                      </Button>

                      <Button 
                        variant="contained" 
                        startIcon={<DownloadIcon />} 
                        sx={{ 
                          borderRadius: '10px', 
                          textTransform: 'none', 
                          fontWeight: 600, 
                          background: 'linear-gradient(to right, #10b981, #059669)',
                          color: 'white',
                          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                          '&:hover': { background: 'linear-gradient(to right, #059669, #047857)' }
                        }}
                      >
                        Export Excel
                      </Button>
                    </Box>
                  </Paper>

                  {/* Filter Section */}
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      mb: 3, 
                      borderRadius: '16px', 
                      border: '1px solid #e2e8f0', 
                      backgroundColor: '#ffffff',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box sx={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', filter: 'blur(40px)', zIndex: 0 }} />
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 3, position: 'relative', zIndex: 1, alignItems: 'end' }}>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', textTransform: 'uppercase', ml: 0.5 }}>From Date</Typography>
                        <TextField 
                          type="date" 
                          size="small" 
                          fullWidth 
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#f8fafc' } }} 
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', textTransform: 'uppercase', ml: 0.5 }}>To Date</Typography>
                        <TextField 
                          type="date" 
                          size="small" 
                          fullWidth 
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#f8fafc' } }} 
                        />
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', textTransform: 'uppercase', ml: 0.5 }}>Plant</Typography>
                        <FormControl size="small" fullWidth>
                          <Select defaultValue="Produlink" sx={{ borderRadius: '12px', backgroundColor: '#f8fafc' }}>
                            <MenuItem value="Produlink">Produlink</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', textTransform: 'uppercase', ml: 0.5 }}>Type</Typography>
                        <FormControl size="small" fullWidth>
                          <Select defaultValue="" displayEmpty sx={{ borderRadius: '12px', backgroundColor: '#f8fafc' }}>
                            <MenuItem value="">Select Type</MenuItem>
                            <MenuItem value="PurchaseGRN">Purchase GRN</MenuItem>
                            <MenuItem value="ScheduleGRN">Schedule GRN</MenuItem>
                            <MenuItem value="ImportGRN">Import GRN</MenuItem>
                            <MenuItem value="57F4GRN">57F4 GRN</MenuItem>
                            <MenuItem value="jobworkGRN">jobwork GRN</MenuItem>
                            <MenuItem value="DC GRN">DC GRN</MenuItem>
                            <MenuItem value="InterStoreInvoice">Inter Store Invoice</MenuItem>
                            <MenuItem value="InterStoreChallan">Inter Store Challan</MenuItem>
                            <MenuItem value="Sales Return">Sales Return</MenuItem>
                            <MenuItem value="DirectGRN">Direct GRN</MenuItem>
                            <MenuItem value="General/Document/Courier">General/Document/Courier</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', textTransform: 'uppercase', ml: 0.5 }}>Status</Typography>
                        <FormControl size="small" fullWidth>
                          <Select defaultValue="" displayEmpty sx={{ borderRadius: '12px', backgroundColor: '#f8fafc' }}>
                            <MenuItem value="">Select Status</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', textTransform: 'uppercase', ml: 0.5 }}>Supplier Name</Typography>
                        <TextField 
                          placeholder="Enter Supplier Name" 
                          size="small" 
                          fullWidth 
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#f8fafc' } }} 
                        />
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', textTransform: 'uppercase', ml: 0.5 }}>Item Name</Typography>
                        <TextField 
                          placeholder="Enter Item Name" 
                          size="small" 
                          fullWidth 
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#f8fafc' } }} 
                        />
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', textTransform: 'uppercase', ml: 0.5 }}>Gate Entry No.</Typography>
                        <TextField 
                          placeholder="Enter Gate Entry No." 
                          size="small" 
                          fullWidth 
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#f8fafc' } }} 
                        />
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button 
                          variant="contained" 
                          startIcon={<SearchIcon />}
                          sx={{ 
                            height: '40px', borderRadius: '12px', textTransform: 'none', fontWeight: 600, 
                            background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', flex: 1,
                            '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)' }
                          }}
                        >
                          Search
                        </Button>
                      </Box>

                    </Box>
                  </Paper>

                  {/* Table Section */}
                  <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflowX: 'auto', overflowY: 'auto', mb: 2, height: 'calc(100vh - 280px)', width: '100%', maxWidth: '100%' }}>
                    <Table stickyHeader size="small" sx={{ width: '100%', tableLayout: 'auto' }}>
                      <TableHead>
                        <TableRow>
                          {["Sr no.", "Year", "Plant", "Entry No", "Entry Date", "Entry Time", "Type", "Custo/Supplier Name", "Challan No", "Challan Date", "Invoice No", "Invoice Date", "Ref Doc No", "Ref Doc Date", "User", "Actions"].map((head, index) => (
                            <TableCell key={index} align={(head.includes("No") || head === "Sr no.") ? "center" : "left"} sx={{ backgroundColor: '#f8fafc', fontWeight: 700, color: '#475569', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.02em', py: 1.5, px: 1, borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' }}>
                              {head}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {gateInwardData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={16} align="center" sx={{ py: 5, color: '#64748b', fontWeight: 600 }}>No Data Found !!</TableCell>
                          </TableRow>
                        ) : (
                          gateInwardData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                            <TableRow key={item.id} sx={{ '&:hover': { backgroundColor: '#f8fafc' }, transition: 'background-color 0.2s ease', '& td': { py: 1, px: 1, fontSize: '0.7rem' } }}>
                              <TableCell align="center" sx={{ color: '#64748b', fontWeight: 600 }}>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                              <TableCell sx={{ color: '#64748b', whiteSpace: 'nowrap' }}>{new Date(item.GE_Date).getFullYear()}</TableCell>
                              <TableCell sx={{ color: '#64748b', whiteSpace: 'nowrap' }}>{item.Plant}</TableCell>
                              <TableCell align="center" sx={{ color: '#0f172a', fontWeight: 600, whiteSpace: 'nowrap' }}>{item.GE_No}</TableCell>
                              <TableCell sx={{ color: '#64748b', whiteSpace: 'nowrap' }}>{item.GE_Date}</TableCell>
                              <TableCell sx={{ color: '#64748b', whiteSpace: 'nowrap' }}>{item.GE_Time}</TableCell>
                              <TableCell sx={{ color: '#64748b', whiteSpace: 'nowrap' }}>{item.Type}</TableCell>
                              <TableCell sx={{ color: '#334155', fontWeight: 600, minWidth: '150px', whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.2 }}>{item.Supp_Cust}</TableCell>
                              <TableCell align="center" sx={{ color: '#64748b', whiteSpace: 'nowrap' }}>{item.ChallanNo}</TableCell>
                              <TableCell sx={{ color: '#64748b', whiteSpace: 'nowrap' }}>{item.ChallanDate}</TableCell>
                              <TableCell align="center" sx={{ color: '#64748b', whiteSpace: 'nowrap' }}>{item.InVoiceNo}</TableCell>
                              <TableCell sx={{ color: '#64748b', whiteSpace: 'nowrap' }}>{item.Invoicedate}</TableCell>
                              <TableCell align="center" sx={{ color: '#64748b', whiteSpace: 'nowrap' }}>{grnDataMap[item.GE_No]?.GrnNo || "-"}</TableCell>
                              <TableCell sx={{ color: '#64748b', whiteSpace: 'nowrap' }}>{grnDataMap[item.GE_No]?.GrnDate || "-"}</TableCell>
                              <TableCell sx={{ color: '#64748b', whiteSpace: 'nowrap' }}>{item.User || "-"}</TableCell>
                              <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                                  <Button component={Link} to={\`/New-Gate-Entry/\${item.id}\`} sx={{ minWidth: 0, p: 0.5, color: '#f59e0b', bgcolor: '#fef3c7', borderRadius: '6px', '&:hover': { bgcolor: '#fde68a' } }}>
                                    <FaEdit size={14} />
                                  </Button>
                                  <Button component="a" href={\`https://sellerp-backend.onrender.com/\${item.View}\`} target="_blank" rel="noopener noreferrer" sx={{ minWidth: 0, p: 0.5, color: '#3b82f6', bgcolor: '#dbeafe', borderRadius: '6px', '&:hover': { bgcolor: '#bfdbfe' } }}>
                                    <VisibilityIcon sx={{ fontSize: 16 }} />
                                  </Button>
                                  <Button onClick={() => handleDelete(item.id)} sx={{ minWidth: 0, p: 0.5, color: '#ef4444', bgcolor: '#fee2e2', borderRadius: '6px', '&:hover': { bgcolor: '#fecaca' } }}>
                                    <FaTrash size={14} />
                                  </Button>
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Pagination Section */}
                  {gateInwardData.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <Pagination 
                        count={Math.ceil(gateInwardData.length / itemsPerPage)} 
                        page={currentPage} 
                        onChange={(e, value) => setCurrentPage(value)} 
                        color="primary" 
                        shape="rounded"
                      />
                    </Box>
                  )}

                </Box>
              </main>
`;

content = content.replace(mainRegex, newMainContent);

fs.writeFileSync(filePath, content);
console.log('GateInwardEntry.jsx transformed successfully!');
