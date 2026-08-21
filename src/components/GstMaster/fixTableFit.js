const fs = require('fs');

const path = 'C:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/components/GstMaster/GstMaster.css';
let content = fs.readFileSync(path, 'utf8');

// Remove white-space: nowrap to allow wrapping so it can fit
content = content.replace(/white-space: nowrap;/g, '/* white-space: nowrap; */');

// Add table-layout: fixed to the tables to force them to fit within the container
content += `

.GstMastertable table, .GstMasterMain table {
  table-layout: fixed !important;
  width: 100% !important;
}

.GstMastertable th, .GstMastertable td, .GstMasterMain th, .GstMasterMain td {
  word-wrap: break-word;
  white-space: normal !important;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed table layout to compress into screen without scrollbar.');
