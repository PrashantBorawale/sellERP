const fs = require('fs');
const file = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/GLMaster/GLMaster.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add MUI imports
if (!content.includes('@mui/material')) {
  content = content.replace(
    'import { FaTrash, FaEdit, FaFileExcel } from "react-icons/fa";',
    'import { FaTrash, FaEdit, FaFileExcel } from "react-icons/fa";\nimport { Box, Tooltip, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";\nimport DownloadIcon from "@mui/icons-material/DownloadOutlined";\nimport EditIcon from "@mui/icons-material/EditOutlined";\nimport DeleteIcon from "@mui/icons-material/DeleteOutlined";\nimport SaveIcon from "@mui/icons-material/SaveOutlined";'
  );
}

// 2. Replace Header Section and style button
const headerRegex = /<div className="WorkOrderEntry-header mb-4">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const newHeader = `<div className="WorkOrderEntry-header mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em' }}>
                          General Ledger Master
                        </Typography>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end">
                        <Button 
                          variant="contained" 
                          onClick={handleExportExcel}
                          startIcon={<DownloadIcon />}
                          sx={{ 
                            borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                            background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)', transition: 'all 0.2s ease',
                            '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)' } 
                          }}
                        >
                          Export Excel
                        </Button>
                      </div>
                    </div>
                  </div>`;
content = content.replace(headerRegex, newHeader);

// 3. Wrap input section in Paper and style Save button
content = content.replace(
  /<div className="header-section mb-4">/g,
  `<Paper elevation={0} sx={{ mb: 4, p: 3, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>`
);
content = content.replace(
  /<button className="btn w-100" onClick=\{handleSave\}>\s*\{editingId \? "Update" : "Save"\}\s*<\/button>\s*<\/div>\s*<\/div>\s*<\/div>/g,
  `<Button variant="contained" fullWidth onClick={handleSave} startIcon={<SaveIcon />} sx={{ mt: '1.75rem', height: '38px', borderRadius: '8px', backgroundColor: '#10b981', boxShadow: 'none', textTransform: 'none', fontSize: '0.875rem', fontWeight: 600, '&:hover': { backgroundColor: '#059669', boxShadow: 'none' } }}>{editingId ? "Update" : "Save"}</Button>\n                      </div>\n                    </div>\n                  </Paper>`
);


// 4. Replace Tables
content = content.replace(
  /<div className="table-responsive">\s*<table className="table table-bordered table-hover user-list-table">/g,
  `<Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mt: 4 }}>\n  <TableContainer sx={{ maxHeight: 500, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>\n    <Table stickyHeader size="small">`
);

content = content.replace(/<\/table>\s*<\/div>\s*<\/div>\s*<\/main>/g, `</Table>\n  </TableContainer>\n</Paper>\n                </div>\n              </main>`);

content = content.replace(/<thead[^>]*>/g, '<TableHead>');
content = content.replace(/<\/thead>/g, '</TableHead>');
content = content.replace(/<tbody[^>]*>/g, '<TableBody>');
content = content.replace(/<\/tbody>/g, '</TableBody>');
content = content.replace(/<tr>/g, '<TableRow>');
content = content.replace(/<\/tr>/g, '</TableRow>');
content = content.replace(/<tr key=\{data.id\}>/g, '<TableRow key={data.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 }, transition: "all 0.2s ease", "&:hover": { backgroundColor: "#f1f5f9" } }}>');

// 5. Replace TH
const thRegex = /<th>([\s\S]*?)<\/th>/g;
content = content.replace(thRegex, `<TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>$1</TableCell>`);

// 6. Replace TD
const tdRegex = /<td(.*?)>([\s\S]*?)<\/td>/g;
content = content.replace(tdRegex, (match, p1, p2) => {
  if (p1.includes('colSpan')) {
    return `<TableCell${p1} sx={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>${p2}</TableCell>`;
  }
  return `<TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}${p1}>${p2}</TableCell>`;
});

// 7. Replace Edit/Delete buttons with MUI IconButtons
// Edit
content = content.replace(
  /<button className="btn btn-sm" onClick=\{\(\) => handleEdit\(data\)\}>\s*<FaEdit \/>\s*<\/button>/g,
  `<Tooltip title="Edit">\n  <IconButton size="small" onClick={() => handleEdit(data)} sx={{ color: '#3b82f6', backgroundColor: '#eff6ff', borderRadius: '4px', padding: '6px', '&:hover': { backgroundColor: '#dbeafe' } }}>\n    <EditIcon fontSize="small" />\n  </IconButton>\n</Tooltip>`
);

// Delete
content = content.replace(
  /<button className="btn btn-sm" onClick=\{\(\) => handleDelete\(data.id\)\}>\s*<FaTrash \/>\s*<\/button>/g,
  `<Tooltip title="Delete">\n  <IconButton size="small" onClick={() => handleDelete(data.id)} sx={{ color: '#ef4444', backgroundColor: '#fef2f2', borderRadius: '4px', padding: '6px', '&:hover': { backgroundColor: '#fee2e2' } }}>\n    <DeleteIcon fontSize="small" />\n  </IconButton>\n</Tooltip>`
);

fs.writeFileSync(file, content);
console.log("Successfully transformed GLMaster.jsx!");
