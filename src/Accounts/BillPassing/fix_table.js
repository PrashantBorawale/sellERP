const fs = require('fs');

const files = [
    'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/PurchaseBill.jsx',
    'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/JobworkBill.jsx',
    'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/DirectBill.jsx'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace any remaining <table className="..."> inside <div className="table-responsive...">
    content = content.replace(
        /<div className="table-responsive(.*?)">\s*<table className="(.*?)">/g,
        `<Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', mb: 4 }}>\n  <TableContainer sx={{ maxHeight: 500, '&::-webkit-scrollbar': { height: 8, width: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: 4 } }}>\n    <Table stickyHeader size="small">`
    );

    // Also replace any standalone <table ...> that didn't get caught
    content = content.replace(/<table className="(.*?)">/g, '<Table stickyHeader size="small">');

    // Make sure we don't have stray </div> from the table-responsive wrapper if we replaced the opening tag but not closing
    // Wait, the previous script DID replace `</table></div>` with `</Table></TableContainer></Paper>`.
    // Let's just fix the opening tags.

    fs.writeFileSync(file, content);
});

console.log("Fixed stray table tags!");
