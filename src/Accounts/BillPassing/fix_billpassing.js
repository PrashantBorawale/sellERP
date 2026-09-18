const fs = require('fs');
const path = require('path');

// --- 1. Fix GLMaster.jsx heading alignment ---
const glMasterFile = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/GLMaster/GLMaster.jsx';
if (fs.existsSync(glMasterFile)) {
    let glContent = fs.readFileSync(glMasterFile, 'utf8');
    glContent = glContent.replace(
        /<div className="col-md-6">\s*<Typography variant="h4"[\s\S]*?General Ledger Master\s*<\/Typography>\s*<\/div>/g,
        `<div className="col-md-6 d-flex justify-content-start align-items-center">\n                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>\n                          General Ledger Master\n                        </Typography>\n                      </div>`
    );
    // Ensure parent also aligns left just in case
    glContent = glContent.replace(/<div className="WorkOrderEntry-header mb-4">/g, '<div className="WorkOrderEntry-header mb-4 text-start">');
    fs.writeFileSync(glMasterFile, glContent);
    console.log("Fixed GLMaster heading alignment.");
}

// Helper to update CSS files to remove #f8f9fa background
function updateCssFile(filePath, headerClassPattern) {
    if (fs.existsSync(filePath)) {
        let css = fs.readFileSync(filePath, 'utf8');
        css = css.replace(headerClassPattern, 'background-color: transparent;');
        fs.writeFileSync(filePath, css);
        console.log(`Updated CSS: ${filePath}`);
    }
}

const basePath = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing';
updateCssFile(path.join(basePath, 'PurchaseBill.css'), /background-color:\s*#f8f9fa;/g);
updateCssFile(path.join(basePath, 'JobworkBill.css'), /background-color:\s*#f8f9fa;/g);
updateCssFile(path.join(basePath, 'DirectBill.css'), /background-color:\s*#f8f9fa;/g);

// Helper to transform JSX files
function transformJsx(filePath, title, headerClass) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Add MUI imports
    if (!content.includes('@mui/material')) {
        content = content.replace(
            /import React.*?;\n/g,
            `import React, { useState, useEffect } from "react";\nimport { Box, Tooltip, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";\nimport ListAltIcon from "@mui/icons-material/ListAltOutlined";\nimport SearchIcon from "@mui/icons-material/SearchOutlined";\nimport DownloadIcon from "@mui/icons-material/DownloadOutlined";\nimport CheckCircleIcon from "@mui/icons-material/CheckCircle";\nimport CancelIcon from "@mui/icons-material/Cancel";\n`
        );
    }

    // 2. Replace Header
    const headerRegex = new RegExp(`<div className="${headerClass}[\\s\\S]*?<h5 className="header-title.*?>\\s*${title}\\s*</h5>[\\s\\S]*?</div>\\s*</div>\\s*</div>`, 'g');
    const newHeader = `<div className="${headerClass} text-start mt-5">
                    <div className="row align-items-center mb-4">
                      <div className="col-md-6 d-flex justify-content-start align-items-center">
                        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', m: 0 }}>
                          ${title}
                        </Typography>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end" style={{ gap: '0.75rem', flexWrap: 'wrap' }}>
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
    content = content.replace(
        /<button className="pobtn">Show<\/button>/g,
        `<Button variant="contained" startIcon={<SearchIcon />} sx={{ backgroundColor: '#2563eb', color: '#fff', boxShadow: 'none', textTransform: 'none', fontSize: '0.75rem', fontWeight: 600, '&:hover': { backgroundColor: '#1d4ed8', boxShadow: 'none' } }}>Show</Button>`
    );

    fs.writeFileSync(filePath, content);
    console.log(`Successfully transformed ${filePath}!`);
}

transformJsx(path.join(basePath, 'PurchaseBill.jsx'), 'Pending BILL GRN List', 'PurchaseBill-header');
transformJsx(path.join(basePath, 'JobworkBill.jsx'), 'Pending Bill Inward Challan List', 'JobWorkBill-header');
// For DirectBill, the header class is "DirectBill-header" and the title is "Bill Register"
transformJsx(path.join(basePath, 'DirectBill.jsx'), 'Bill Register', 'DirectBill-header');

