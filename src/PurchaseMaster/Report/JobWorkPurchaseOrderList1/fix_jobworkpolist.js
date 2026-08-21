const fs = require('fs');
const file = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/PurchaseMaster/Report/JobWorkPurchaseOrderList1/JobWorkPurchseOrderList.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add MUI imports
if (!content.includes('@mui/material')) {
  content = content.replace(
    'import "./JobWorkPurchaseOrderList.css"',
    'import "./JobWorkPurchaseOrderList.css"\nimport { Box, Tooltip, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";\nimport ListAltIcon from "@mui/icons-material/ListAltOutlined";\nimport SearchIcon from "@mui/icons-material/SearchOutlined";'
  );
}

// 2. Replace Header Section and style buttons
const headerRegex = /<div className="JobWorkPurchseOrderList-header[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const newHeader = `<div className="JobWorkPurchseOrderList-header text-start mt-5">
                    <div className="row align-items-center mb-4">
                      <div className="col-md-6">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em' }}>
                          JobWork Purchse Order List
                        </Typography>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end" style={{ gap: '0.75rem', flexWrap: 'wrap' }}>
                        <Button 
                          variant="contained" 
                          startIcon={<ListAltIcon />}
                          sx={{ 
                            borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
                            background: 'linear-gradient(to right, #3b82f6, #4f46e5)', color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)', transition: 'all 0.2s ease',
                            '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)' } 
                          }}
                        >
                          JobWork PO - Query
                        </Button>
                      </div>
                    </div>
              </div>`;
content = content.replace(headerRegex, newHeader);

// 3. Replace Tables
content = content.replace(
  /<div className="table-responsive">\s*<table className="table table-bordered table-striped">/g,
  `<Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>\n  <TableContainer>\n    <Table size="small">`
);

content = content.replace(
  /<div className="table-responsive">\s*<table className="table table-bordered">/g,
  `<Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mt: 4 }}>\n  <TableContainer sx={{ maxHeight: 500, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>\n    <Table stickyHeader size="small">`
);

content = content.replace(/<\/table>\s*<\/div>/g, `</Table>\n  </TableContainer>\n</Paper>`);

content = content.replace(/<thead[^>]*>/g, '<TableHead>');
content = content.replace(/<\/thead>/g, '</TableHead>');
content = content.replace(/<tbody[^>]*>/g, '<TableBody>');
content = content.replace(/<\/tbody>/g, '</TableBody>');
content = content.replace(/<tr>/g, '<TableRow>');
content = content.replace(/<\/tr>/g, '</TableRow>');

// Fix TR hovering
content = content.replace(/<TableRow>\{?\/\*\s*Data rows will go here\s*\*\/\}?<\/TableRow>/g, '<TableRow hover sx={{ "&:last-child td, &:last-child th": { border: 0 }, transition: "all 0.2s ease", "&:hover": { backgroundColor: "#f1f5f9" } }}><TableCell colSpan={17} sx={{ textAlign: "center", padding: "24px", color: "#94a3b8" }}>No data available.</TableCell></TableRow>');

// 4. Replace TH
const thRegex = /<th>([\s\S]*?)<\/th>/g;
content = content.replace(thRegex, `<TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center' }}>$1</TableCell>`);

// 5. Replace TD
const tdRegex = /<td(.*?)>([\s\S]*?)<\/td>/g;
content = content.replace(tdRegex, (match, p1, p2) => {
  return `<TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}${p1}>${p2}</TableCell>`;
});

// 6. Fix Search Buttons inside the filter table
content = content.replace(
  /<button className="pobtn">Search<\/button>/g,
  `<Button variant="contained" startIcon={<SearchIcon />} sx={{ backgroundColor: '#2563eb', color: '#fff', boxShadow: 'none', textTransform: 'none', fontSize: '0.75rem', fontWeight: 600, '&:hover': { backgroundColor: '#1d4ed8', boxShadow: 'none' } }}>Search</Button>`
);

content = content.replace(
  /<button className="pobtn">Search Option<\/button>/g,
  `<Button variant="contained" sx={{ backgroundColor: '#f1f5f9', color: '#475569', boxShadow: 'none', textTransform: 'none', fontSize: '0.75rem', fontWeight: 600, '&:hover': { backgroundColor: '#e2e8f0', boxShadow: 'none' }, whiteSpace: 'nowrap' }}>Search Option</Button>`
);

fs.writeFileSync(file, content);
console.log("Successfully transformed JobWorkPurchseOrderList.jsx!");
