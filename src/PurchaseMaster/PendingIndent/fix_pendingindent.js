const fs = require('fs');
const file = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/PurchaseMaster/PendingIndent/PendingIndent.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add MUI imports if they don't exist
if (!content.includes('@mui/material')) {
  content = content.replace(
    'import "./PendingIndent.css";',
    'import "./PendingIndent.css";\nimport { Box, Tooltip, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";\nimport CheckCircleIcon from "@mui/icons-material/CheckCircle";\nimport CancelIcon from "@mui/icons-material/Cancel";'
  );
}

// 2. Replace Heading and Export button
content = content.replace(
  /<div className="PendingIndent-header text-start mt-5">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g,
  `<div className="PendingIndent-header text-start mt-5">
                  <div className="row align-items-center mb-4">
                    <div className="col-md-6">
                      <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em' }}>
                        Pending Indent Release List
                      </Typography>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                      <Button variant="outlined" sx={{ borderRadius: '20px', textTransform: 'none', borderColor: '#cbd5e1', color: '#475569', '&:hover': { borderColor: '#94a3b8', backgroundColor: '#f1f5f9' } }}>Export To Excel</Button>
                    </div>
                  </div>
                </div>`
);

// 3. Replace Filter Table Structure
content = content.replace(
  /<div className="table-responsive">\s*<table className="table table-bordered">/g,
  `<Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>\n  <TableContainer>\n    <Table size="small">`
);

// 4. Replace Data Table Structure
content = content.replace(
  /<div className="table-responsive">\s*<table className="table table-striped table-bordered">/g,
  `<Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mt: 4 }}>\n  <TableContainer sx={{ maxHeight: 500, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>\n    <Table stickyHeader size="small">`
);

// 5. Replace table closures
content = content.replace(/<\/table>\s*<\/div>/g, `</Table>\n  </TableContainer>\n</Paper>`);

// 6. Replace generic thead/tbody/tr
content = content.replace(/<thead[^>]*>/g, '<TableHead>');
content = content.replace(/<\/thead>/g, '</TableHead>');
content = content.replace(/<tbody[^>]*>/g, '<TableBody>');
content = content.replace(/<\/tbody>/g, '</TableBody>');
content = content.replace(/<tr>/g, '<TableRow>');
content = content.replace(/<tr key=\{ind.id\}>/g, '<TableRow key={ind.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 }, transition: "all 0.2s ease", "&:hover": { backgroundColor: "#f1f5f9" } }}>');
content = content.replace(/<\/tr>/g, '</TableRow>');

// 7. Replace TH with NewIndent slate styles
const thRegex = /<th>([\s\S]*?)<\/th>/g;
content = content.replace(thRegex, `<TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>$1</TableCell>`);

// 8. Replace TD with NewIndent body styles
const tdRegex = /<td(.*?)>([\s\S]*?)<\/td>/g;
content = content.replace(tdRegex, (match, p1, p2) => {
  if (p1.includes('colSpan')) {
    return `<TableCell${p1} sx={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>${p2}</TableCell>`;
  }
  return `<TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}${p1}>${p2}</TableCell>`;
});

// 9. Replace specific filter buttons
// View All button
content = content.replace(
  /<button className="pobtn">\s*All Pending Indent\s*<\/button>/g,
  `<Button variant="contained" sx={{ backgroundColor: '#f1f5f9', color: '#475569', boxShadow: 'none', textTransform: 'none', fontSize: '0.75rem', fontWeight: 600, '&:hover': { backgroundColor: '#e2e8f0', boxShadow: 'none' }, whiteSpace: 'nowrap' }}>All Pending Indent</Button>`
);

// Search button
content = content.replace(
  /<button\s+className="pobtn"\s*>\s*Search\s*<\/button>/g,
  `<Button variant="contained" sx={{ backgroundColor: '#2563eb', color: '#fff', boxShadow: 'none', textTransform: 'none', fontSize: '0.75rem', fontWeight: 600, '&:hover': { backgroundColor: '#1d4ed8', boxShadow: 'none' } }}>Search</Button>`
);

// 10. Replace Approve/Reject buttons with MUI IconButtons
// Approve
content = content.replace(
  /<button\s+className="btn btn-sm btn-success"\s+onClick=\{\(\) =>\s+handleTakeAction\(ind.id, "Approved"\)\s+\}\s*>\s*Approve\s*<\/button>/g,
  `<Tooltip title="Approve Indent">\n  <IconButton size="small" onClick={() => handleTakeAction(ind.id, "Approved")} sx={{ color: '#10b981', backgroundColor: '#ecfdf5', borderRadius: '4px', padding: '6px', '&:hover': { backgroundColor: '#d1fae5' } }}>\n    <CheckCircleIcon fontSize="small" />\n  </IconButton>\n</Tooltip>`
);

// Reject
content = content.replace(
  /<button\s+className="btn btn-sm btn-danger"\s+onClick=\{\(\) =>\s+handleTakeAction\(ind.id, "Rejected"\)\s+\}\s*>\s*Reject\s*<\/button>/g,
  `<Tooltip title="Reject Indent">\n  <IconButton size="small" onClick={() => handleTakeAction(ind.id, "Rejected")} sx={{ color: '#ef4444', backgroundColor: '#fef2f2', borderRadius: '4px', padding: '6px', '&:hover': { backgroundColor: '#fee2e2' } }}>\n    <CancelIcon fontSize="small" />\n  </IconButton>\n</Tooltip>`
);

// Save
fs.writeFileSync(file, content);
console.log("Successfully transformed PendingIndent.jsx to MUI Tables!");
