const fs = require('fs');

const path = 'C:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/components/GstMaster/GstMaster.js';
let content = fs.readFileSync(path, 'utf8');

// Replace whiteSpace: 'nowrap' with whiteSpace: 'normal' in TableCells
content = content.replace(/whiteSpace:\s*['"]nowrap['"]/g, "whiteSpace: 'normal'");

// Reduce padding in headers and cells slightly to help it fit
content = content.replace(/padding:\s*['"]16px['"]/g, "padding: '6px'");
content = content.replace(/padding:\s*['"]12px 16px['"]/g, "padding: '4px 6px'");
content = content.replace(/padding:\s*['"]12px['"]/g, "padding: '6px'");

// Decrease font size slightly for the form inputs
content = content.replace(/fontSize:\s*['"]0.85rem['"]/g, "fontSize: '0.75rem'");

fs.writeFileSync(path, content, 'utf8');
console.log('Relaxed table whitespace and padding in GstMaster.js to allow native fitting.');
