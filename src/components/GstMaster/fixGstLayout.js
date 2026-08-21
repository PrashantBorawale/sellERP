const fs = require('fs');

const path = 'C:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/components/GstMaster/GstMaster.js';
let content = fs.readFileSync(path, 'utf8');

// Fix global containers
content = content.replace(/<div className="container-fluid">/g, '<div className="container-fluid p-0">');
content = content.replace(/<div className="row">/g, '<div className="row m-0">');
content = content.replace(/<div className="col-md-12">/g, '<div className="col-md-12 p-0">');

// Also fix the py-4 one which adds vertical padding but we should remove horizontal padding
content = content.replace(/<div className="container-fluid py-4">/g, '<div className="container-fluid p-0 py-4">');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed container padding and margins to prevent overflow.');
