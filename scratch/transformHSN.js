const fs = require('fs');
const path = require('path');

const filePath = path.join('C:', 'Users', 'admin', 'Desktop', 'FinalFiles', '5-6_ERP', 'src', 'Accounts', 'GSTReport', 'HSNSACSummary.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add MUI imports
if (!content.includes('@mui/material')) {
  content = content.replace(
    /import { FaSearch, FaFileExcel } from "react-icons\/fa";/,
    `import { FaSearch, FaFileExcel } from "react-icons/fa";
import { 
  Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, Select, MenuItem, TableFooter 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";`
  );
}

// 2. Replace Header, Filter, and Table layout
const mainRegex = /<main className=\{`main-content \$\{sideNavOpen \? "shifted" : ""\}`\}>([\s\S]*?)<\/main>/;

const newMainContent = `
              <main className={\`main-content \${sideNavOpen ? "shifted" : ""}\`}>
                <Box sx={{ width: '100%', overflow: 'hidden' }}>
                  
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
                      HSN Wise Summary
                    </Typography>
                    <Button 
                      variant="outlined" 
                      startIcon={<DownloadIcon />} 
                      sx={{ 
                        borderRadius: '10px', 
                        textTransform: 'none', 
                        fontWeight: 600, 
                        color: '#10b981', 
                        borderColor: '#10b981',
                        '&:hover': { backgroundColor: '#ecfdf5', borderColor: '#059669', color: '#059669' }
                      }}
                    >
                      Export To Excel
                    </Button>
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
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#f8fafc' } }} 
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', textTransform: 'uppercase', ml: 0.5 }}>To Date</Typography>
                        <TextField 
                          type="date" 
                          size="small" 
                          fullWidth 
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#f8fafc' } }} 
                        />
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', textTransform: 'uppercase', ml: 0.5 }}>Type</Typography>
                        <FormControl size="small" fullWidth>
                          <Select 
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            sx={{ borderRadius: '12px', backgroundColor: '#f8fafc' }}
                          >
                            <MenuItem value="Sales">Sales</MenuItem>
                          </Select>
                        </FormControl>
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
                  <TableContainer component={Paper} elevation={0} className="table-responsive" sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflowX: 'auto', overflowY: 'auto', mb: 2, height: 'calc(100vh - 280px)', width: '100%', maxWidth: '100%' }}>
                    <Table stickyHeader size="small" sx={{ minWidth: 'max-content' }}>
                      <TableHead>
                        <TableRow>
                          {["Sr.", "HSN/SAC", "Description", "Type Of Supply", "Group", "UOM", "Total Qty", "Total Amt", "GST %", "Taxable_Value", "IGST Amt", "CGST Amt", "SGST Amt", "CESS", "TCS Amt", "Total GST Amt"].map((head, index) => (
                            <TableCell key={index} align={(head.includes("Amt") || head.includes("Value") || head.includes("Qty") || head === "CESS") ? "right" : "left"} sx={{ backgroundColor: '#f8fafc', fontWeight: 700, color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', py: 2, borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' }}>
                              {head}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={16} align="center" sx={{ py: 4 }}>
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : hsnData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={16} align="center" sx={{ py: 5, color: '#64748b', fontWeight: 600 }}>No Records Found</TableCell>
                          </TableRow>
                        ) : (
                          hsnData.map((row, index) => (
                            <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f8fafc' }, transition: 'background-color 0.2s ease', '& td': { py: 1.5, px: 2, fontSize: '0.75rem', whiteSpace: 'nowrap' } }}>
                              <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>{index + 1}</TableCell>
                              <TableCell sx={{ color: '#0f172a', fontWeight: 600 }}>{row.hsn_sac}</TableCell>
                              <TableCell sx={{ color: '#64748b' }}>{row.description}</TableCell>
                              <TableCell sx={{ color: '#64748b' }}>{row.type_of_supply || "GST Sales"}</TableCell>
                              <TableCell sx={{ color: '#64748b' }}>{row.group || "FG"}</TableCell>
                              <TableCell sx={{ color: '#64748b' }}>{row.uom || "NOS"}</TableCell>
                              <TableCell align="right" sx={{ color: '#64748b' }}>{row.total_qty}</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 700, color: '#0f172a' }}>{formatNum(row.total_amt)}</TableCell>
                              <TableCell sx={{ color: '#64748b' }}>{row.gst_percent || 0}</TableCell>
                              <TableCell align="right" sx={{ color: '#ef4444', fontWeight: 600 }}>{formatNum(row.taxable_value)}</TableCell>
                              <TableCell align="right" sx={{ color: '#10b981', fontWeight: 600 }}>{formatNum(row.igst_amt)}</TableCell>
                              <TableCell align="right" sx={{ color: '#10b981', fontWeight: 600 }}>{formatNum(row.cgst_amt)}</TableCell>
                              <TableCell align="right" sx={{ color: '#10b981', fontWeight: 600 }}>{formatNum(row.sgst_amt)}</TableCell>
                              <TableCell align="right" sx={{ color: '#64748b' }}>{formatNum(row.cess)}</TableCell>
                              <TableCell align="right" sx={{ color: '#64748b' }}>{formatNum(row.tcs_amt)}</TableCell>
                              <TableCell align="right" sx={{ color: '#10b981', fontWeight: 700 }}>{formatNum(row.total_gst_amt)}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow sx={{ backgroundColor: '#f1f5f9', '& td': { fontWeight: 700, color: '#0f172a', py: 2, borderTop: '2px solid #e2e8f0', whiteSpace: 'nowrap' } }}>
                          <TableCell colSpan={6} align="right">Total Amt :</TableCell>
                          <TableCell align="right">{totals.qty}</TableCell>
                          <TableCell align="right">{formatNum(totals.amt)}</TableCell>
                          <TableCell></TableCell>
                          <TableCell align="right">{formatNum(totals.taxable)}</TableCell>
                          <TableCell align="right">{formatNum(totals.igst)}</TableCell>
                          <TableCell align="right">{formatNum(totals.cgst)}</TableCell>
                          <TableCell align="right">{formatNum(totals.sgst)}</TableCell>
                          <TableCell align="right">0</TableCell>
                          <TableCell align="right">0</TableCell>
                          <TableCell align="right">{formatNum(totals.totalGst)}</TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>

                </Box>
              </main>
`;

content = content.replace(mainRegex, newMainContent);

// Add default export if not present
if (!content.includes('export default HSNSACSummary;')) {
    content += '\\nexport default HSNSACSummary;\\n';
}

fs.writeFileSync(filePath, content);
console.log('HSNSACSummary.jsx transformed successfully!');
