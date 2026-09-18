const fs = require('fs');

const path = 'C:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/components/GstMaster/GstMaster.css';
let content = fs.readFileSync(path, 'utf8');

content = content.replace('.GstMastertable table, .GstMasterMain table {\n  table-layout: fixed !important;\n  width: 100% !important;\n}', '.GstMastertable table {\n  table-layout: fixed !important;\n  width: 100% !important;\n}');
content = content.replace('.GstMastertable th, .GstMastertable td, .GstMasterMain th, .GstMasterMain td {\n  word-wrap: break-word;\n  white-space: normal !important;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}', '.GstMastertable th, .GstMastertable td {\n  word-wrap: break-word;\n  white-space: normal !important;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}');

fs.writeFileSync(path, content, 'utf8');
console.log('Removed aggressive fixed layout from the first (main) table.');
