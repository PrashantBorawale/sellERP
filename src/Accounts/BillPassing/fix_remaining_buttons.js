const fs = require('fs');
const file = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/DirectBill.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Delete button
content = content.replace(
    /<button className="btn btn-sm text-dark" onClick=\{([^>]+)\}><FaTrash \/><\/button>/g,
    `<IconButton onClick={$1} size="small" sx={{ color: '#ef4444', '&:hover': { background: '#fee2e2' } }}><FaTrash size={14} /></IconButton>`
);

// 2. Confirm To Save button
content = content.replace(
    /<button\s+className="btn btn-sm btn-light border d-flex align-items-center gap-2 shadow-sm px-4 py-2"\s+style=\{\{\s*fontSize:\s*'12px',\s*fontWeight:\s*'bold'\s*\}\}\s+onClick=\{([^>]+)\}\s*>\s*<span className="text-success fw-bold">✔<\/span>\s*Confirm To Save\s*<\/button>/g,
    `<Button variant="contained" onClick={$1} sx={{ textTransform: 'none', fontSize: '0.875rem', fontWeight: 600, background: 'linear-gradient(to right, #10b981, #059669)', color: 'white', px: 3, py: 1, borderRadius: '8px', boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)', transition: 'all 0.2s ease', '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)' } }} startIcon={<span style={{ fontWeight: 'bold' }}>✔</span>}>Confirm To Save</Button>`
);

// 3. Cancel button
content = content.replace(
    /<button className="btn btn-sm btn-light border fw-bold" onClick=\{() => setShowConfirmModal\(false\)\}>Cancel<\/button>/g,
    `<Button variant="outlined" onClick={() => setShowConfirmModal(false)} sx={{ height: '32px', borderRadius: '8px', textTransform: 'none', fontSize: '0.8rem', fontWeight: 600, borderColor: '#cbd5e1', color: '#475569', '&:hover': { background: '#f1f5f9', borderColor: '#94a3b8' } }}>Cancel</Button>`
);

fs.writeFileSync(file, content);
console.log("Remaining buttons fixed!");
