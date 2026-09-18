const fs = require('fs');
const files = [
    'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/PurchaseBill.jsx',
    'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/JobworkBill.jsx',
    'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/DirectBill.jsx'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix <tr key={...}> that were mismatched with </TableRow>
    content = content.replace(/<tr (.*?)>/g, '<TableRow $1>');
    
    fs.writeFileSync(file, content);
});

console.log("Fixed tr -> TableRow mismatches!");
