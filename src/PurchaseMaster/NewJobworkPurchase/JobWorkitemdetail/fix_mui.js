const fs = require('fs');
const file = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/PurchaseMaster/NewJobworkPurchase/JobWorkitemdetail/JobWorkitemdetail.jsx';
let content = fs.readFileSync(file, 'utf8');

// Add MUI imports
if (!content.includes('@mui/material')) {
  content = content.replace(
    'import { FaTrash, FaEdit } from "react-icons/fa";',
    `import { FaTrash, FaEdit } from "react-icons/fa";\nimport { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';`
  );
}

// Replace Table 1 Wrapper
content = content.replace(
  /<div className="table-responsive mt-3">[\s\n]*<table className="table table-bordered">/,
  `<Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 3 }}>\n              <TableContainer sx={{ '&::-webkit-scrollbar': { height: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>\n                <Table size="small">`
);

// Replace Table 2 Wrapper
content = content.replace(
  /<div className="table-responsive">[\s\n]*<table className="table table-bordered table-striped">/,
  `<Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mt: 4 }}>\n              <TableContainer sx={{ maxHeight: 400, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>\n                <Table stickyHeader size="small">`
);

// Replace Table closures
content = content.replace(/<\/table>\n\s*<\/div>/g, `</Table>\n              </TableContainer>\n            </Paper>`);

// Replace thead and tbody (case-sensitive)
content = content.replace(/<thead>/g, '<TableHead>');
content = content.replace(/<\/thead>/g, '</TableHead>');
content = content.replace(/<tbody>/g, '<TableBody>');
content = content.replace(/<\/tbody>/g, '</TableBody>');
content = content.replace(/<tr>/g, '<TableRow>');
content = content.replace(/<tr\s+key={([^}]+)}>/g, '<TableRow key={$1} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>');
content = content.replace(/<\/tr>/g, '</TableRow>');

// Special case for Table 1 header row background
content = content.replace(/<TableRow>\n\s*<th className="align-middle text-center">/, '<TableRow sx={{ backgroundColor: "#20c4ff" }}>\n                    <TableCell align="center" sx={{ color: "#fff", fontWeight: 600, fontSize: "11px", whiteSpace: "nowrap", py: 1, borderRight: "1px solid #1ba6d9" }}>');

// Replace all th and td with TableCell
const thRegex = /<th>(.*?)<\/th>/g;
content = content.replace(thRegex, `<TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: '11px', whiteSpace: 'nowrap', py: 1, borderRight: '1px solid #1ba6d9' }}>$1</TableCell>`);

const tdRegex = /<td(.*?)>/g;
content = content.replace(tdRegex, (match, p1) => {
  // If it has colSpan, preserve it
  if (p1.includes('colSpan')) {
    return `<TableCell${p1}>`;
  }
  // Otherwise standard styling
  return `<TableCell sx={{ fontSize: '11px', py: 1, borderRight: '1px solid #f1f5f9' }}${p1}>`;
});
content = content.replace(/<\/td>/g, '</TableCell>');

fs.writeFileSync(file, content);
console.log("Successfully transformed to MUI Tables!");
