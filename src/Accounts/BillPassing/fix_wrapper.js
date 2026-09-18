const fs = require('fs');

const files = [
    'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/PurchaseBill.jsx',
    'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/JobworkBill.jsx',
    'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/DirectBill.jsx'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Fix the primary tables with complex wrapper <div>
    content = content.replace(
        /<div className="table-responsive[^>]*>\s*<Table stickyHeader size="small">/g,
        `<Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>\n  <TableContainer sx={{ maxHeight: 500, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>\n    <Table stickyHeader size="small">`
    );

    // Also there's one with `<div className="table-responsive">\s*<Table size="small">` maybe?
    content = content.replace(
        /<div className="table-responsive[^>]*>\s*<Table size="small">/g,
        `<Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>\n  <TableContainer>\n    <Table size="small">`
    );

    fs.writeFileSync(file, content);
});

console.log("Fixed opening wrappers!");
