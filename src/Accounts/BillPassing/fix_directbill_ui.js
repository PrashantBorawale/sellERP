const fs = require('fs');
const file = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/DirectBill.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix Table Headers in DirectBill
const thRegex = /<th style=\{\{(.*?)\}\}>([\s\S]*?)<\/th>/g;
content = content.replace(thRegex, (match, styleContent, innerHtml) => {
    // Extract minWidth or width if present
    let widthMatch = styleContent.match(/(?:minWidth|width):\s*'([^']+)'/);
    let widthStyle = widthMatch ? `, minWidth: '${widthMatch[1]}'` : '';
    
    return `<TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f8fafc', color: '#475569', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', padding: '12px 16px', textAlign: 'center'${widthStyle} }}>${innerHtml}</TableCell>`;
});

// 2. Fix the Confirmation Modal table headers too, wait they might have been <th> but I checked earlier, they were mostly TableCell. But if any <th> were left they are fixed by the above.

// 3. Fix Footer Buttons (Save BILL and Cancel)
content = content.replace(
    /<button className="btn btn-sm btn-light border fw-bold" onClick=\{handleSaveBill\}>Save BILL<\/button>/g,
    `<Button variant="contained" onClick={handleSaveBill} sx={{ height: '32px', borderRadius: '8px', textTransform: 'none', fontSize: '0.8rem', fontWeight: 600, background: 'linear-gradient(to right, #10b981, #059669)', color: 'white', boxShadow: 'none', transition: 'all 0.2s ease', '&:hover': { background: 'linear-gradient(to right, #059669, #047857)', transform: 'translateY(-1px)' } }}>Save BILL</Button>`
);

content = content.replace(
    /<button className="btn btn-sm btn-light border fw-bold" onClick=\{() => setShowConfirmModal\(false\)\}>Cancel<\/button>/g,
    `<Button variant="outlined" onClick={() => setShowConfirmModal(false)} sx={{ height: '32px', borderRadius: '8px', textTransform: 'none', fontSize: '0.8rem', fontWeight: 600, borderColor: '#cbd5e1', color: '#475569', '&:hover': { background: '#f1f5f9', borderColor: '#94a3b8' } }}>Cancel</Button>`
);

// 4. Any missing TableCell for table rows? Let's check TableBody:
// Most row columns were already TableCell, but let's just make sure we didn't miss `<td>` elements.
const tdRegex = /<td([\s\S]*?)>([\s\S]*?)<\/td>/g;
content = content.replace(tdRegex, (match, attrs, innerHtml) => {
    return `<TableCell sx={{ color: '#475569', fontSize: '0.75rem', padding: '12px 16px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>${innerHtml}</TableCell>`;
});

fs.writeFileSync(file, content);
console.log("DirectBill.jsx table headers, rows and buttons updated.");
