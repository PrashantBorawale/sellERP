const fs = require('fs');

const files = [
    'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/PurchaseBill.jsx',
    'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/JobworkBill.jsx',
    'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/DirectBill.jsx'
];

const importsToAdd = `import { Box, Tooltip, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";\nimport ListAltIcon from "@mui/icons-material/ListAltOutlined";\nimport SearchIcon from "@mui/icons-material/SearchOutlined";\nimport DownloadIcon from "@mui/icons-material/DownloadOutlined";\nimport CheckCircleIcon from "@mui/icons-material/CheckCircle";\nimport CancelIcon from "@mui/icons-material/Cancel";\n`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    if (!content.includes('@mui/material')) {
        // Just prepend it to the top
        content = importsToAdd + content;
        fs.writeFileSync(file, content);
    }
});

console.log("Added MUI imports to the top of the files!");
