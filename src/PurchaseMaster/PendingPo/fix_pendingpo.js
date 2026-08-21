const fs = require('fs');
const file = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/PurchaseMaster/PendingPo/PendingPo.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add MUI imports if they don't exist
if (!content.includes('@mui/material')) {
  content = content.replace(
    'import "./PendingPo.css";',
    'import "./PendingPo.css";\nimport { Box, Tooltip, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";\nimport CheckCircleIcon from "@mui/icons-material/CheckCircle";\nimport CancelIcon from "@mui/icons-material/Cancel";'
  );
}

// 2. Replace Filter Table
// <div className="table-responsive">
//   <table className="table table-bordered">
//     <thead>...</thead>
//     <tbody>...</tbody>
//   </table>
// </div>
content = content.replace(
  /<div className="table-responsive">\s*<table className="table table-bordered">/g,
  `<Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>\n  <TableContainer>\n    <Table size="small">`
);

// 3. Replace Data Table
// <div className="table-responsive mt-4">
//   <table className="table table-striped table-bordered">
//     <thead className="table-dark">
content = content.replace(
  /<div className="table-responsive mt-4">\s*<table className="table table-striped table-bordered">/g,
  `<Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mt: 4 }}>\n  <TableContainer sx={{ maxHeight: 500, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>\n    <Table stickyHeader size="small">`
);

// 4. Replace table closures
content = content.replace(/<\/table>\s*<\/div>/g, `</Table>\n  </TableContainer>\n</Paper>`);

// 5. Replace generic thead/tbody/tr
content = content.replace(/<thead[^>]*>/g, '<TableHead>');
content = content.replace(/<\/thead>/g, '</TableHead>');
content = content.replace(/<tbody[^>]*>/g, '<TableBody>');
content = content.replace(/<\/tbody>/g, '</TableBody>');
content = content.replace(/<tr>/g, '<TableRow>');
content = content.replace(/<tr key=\{po.id\}>/g, '<TableRow key={po.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 }, transition: "all 0.2s ease", "&:hover": { backgroundColor: "#f1f5f9" } }}>');
content = content.replace(/<\/tr>/g, '</TableRow>');

// 6. Replace TH with NewIndent slate styles
const thRegex = /<th>([\s\S]*?)<\/th>/g;
content = content.replace(thRegex, `<TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>$1</TableCell>`);

// 7. Replace TD with NewIndent body styles
const tdRegex = /<td(.*?)>([\s\S]*?)<\/td>/g;
content = content.replace(tdRegex, (match, p1, p2) => {
  if (p1.includes('colSpan')) {
    return `<TableCell${p1} sx={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>${p2}</TableCell>`;
  }
  return `<TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}${p1}>${p2}</TableCell>`;
});

// 8. Replace Approve/Reject buttons with MUI IconButtons
// Approve
content = content.replace(
  /<button\s+className="btn btn-sm btn-success"\s+onClick=\{\(\) =>\s+handleTakeAction\(po.id, "Approved"\)\s+\}\s*>\s*Approve\s*<\/button>/g,
  `<Tooltip title="Approve PO">\n  <IconButton size="small" onClick={() => handleTakeAction(po.id, "Approved")} sx={{ color: '#10b981', backgroundColor: '#ecfdf5', borderRadius: '4px', padding: '6px', '&:hover': { backgroundColor: '#d1fae5' } }}>\n    <CheckCircleIcon fontSize="small" />\n  </IconButton>\n</Tooltip>`
);

// Reject
content = content.replace(
  /<button\s+className="btn btn-sm btn-danger"\s+onClick=\{\(\) =>\s+handleTakeAction\(po.id, "Rejected"\)\s+\}\s*>\s*Reject\s*<\/button>/g,
  `<Tooltip title="Reject PO">\n  <IconButton size="small" onClick={() => handleTakeAction(po.id, "Rejected")} sx={{ color: '#ef4444', backgroundColor: '#fef2f2', borderRadius: '4px', padding: '6px', '&:hover': { backgroundColor: '#fee2e2' } }}>\n    <CancelIcon fontSize="small" />\n  </IconButton>\n</Tooltip>`
);

// Save
fs.writeFileSync(file, content);
console.log("Successfully transformed PendingPo.jsx to MUI Tables!");
