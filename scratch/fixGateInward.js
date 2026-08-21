const fs = require('fs');
const path = require('path');

const filePath = path.join('C:', 'Users', 'admin', 'Desktop', 'FinalFiles', '5-6_ERP', 'src', 'StoreMaster', 'GateInwardEntry', 'GateInwardEntry.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add Tooltip import
if (!content.includes('Tooltip')) {
  content = content.replace(
    /import \{ \n  Box, Typography/,
    `import { \n  Box, Typography, Tooltip`
  );
}

// 2. Make Material Reg Button Contained
content = content.replace(
  /<Button \n\s*variant="outlined" \n\s*startIcon=\{<ListAltIcon \/>\} \n\s*sx=\{\{ \n\s*borderRadius: '10px', \n\s*textTransform: 'none', \n\s*fontWeight: 600, \n\s*color: '#4f46e5', \n\s*borderColor: '#4f46e5',\n\s*'&:hover': \{ backgroundColor: '#eef2ff', borderColor: '#4338ca', color: '#4338ca' \}\n\s*\}\}\n\s*>\n\s*Material Reg\n\s*<\/Button>/g,
  `<Button 
                        variant="contained" 
                        startIcon={<ListAltIcon />} 
                        sx={{ 
                          borderRadius: '10px', 
                          textTransform: 'none', 
                          fontWeight: 600, 
                          background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
                          color: 'white',
                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                          '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)' }
                        }}
                      >
                        Material Reg
                      </Button>`
);

// 3. Make Query Button Contained
content = content.replace(
  /<Button \n\s*variant="outlined" \n\s*startIcon=\{<ListAltIcon \/>\} \n\s*sx=\{\{ \n\s*borderRadius: '10px', \n\s*textTransform: 'none', \n\s*fontWeight: 600, \n\s*color: '#4f46e5', \n\s*borderColor: '#4f46e5',\n\s*'&:hover': \{ backgroundColor: '#eef2ff', borderColor: '#4338ca', color: '#4338ca' \}\n\s*\}\}\n\s*>\n\s*Query\n\s*<\/Button>/g,
  `<Button 
                        variant="contained" 
                        startIcon={<ListAltIcon />} 
                        sx={{ 
                          borderRadius: '10px', 
                          textTransform: 'none', 
                          fontWeight: 600, 
                          background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
                          color: 'white',
                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                          '&:hover': { background: 'linear-gradient(to right, #2563eb, #4338ca)' }
                        }}
                      >
                        Query
                      </Button>`
);

// 4. Update Filter Section to Single Line
content = content.replace(
  /gridTemplateColumns: 'repeat\(auto-fit, minmax\(180px, 1fr\)\)'/g,
  `display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'`
);

// Add minWidth to filter boxes to prevent squishing when flex-nowrap is on
content = content.replace(
  /<Box sx=\{\{ display: 'flex', flexDirection: 'column', gap: 0\.5 \}\}>/g,
  `<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: '130px', flex: 1 }}>`
);

// 5. Add Tooltips to Action Buttons
content = content.replace(
  /<Button component=\{Link\} to=\{\`\/New-Gate-Entry\/\$\{item\.id\}\`\} sx=\{\{ minWidth: 0, p: 0\.5, color: '#f59e0b', bgcolor: '#fef3c7', borderRadius: '6px', '&:hover': \{ bgcolor: '#fde68a' \} \}\}>\n\s*<FaEdit size=\{14\} \/>\n\s*<\/Button>/g,
  `<Tooltip title="Edit Gate Entry">
                                    <Button component={Link} to={\`/New-Gate-Entry/\${item.id}\`} sx={{ minWidth: 0, p: 0.5, color: '#f59e0b', bgcolor: '#fef3c7', borderRadius: '6px', '&:hover': { bgcolor: '#fde68a' } }}>
                                      <FaEdit size={14} />
                                    </Button>
                                  </Tooltip>`
);

content = content.replace(
  /<Button component="a" href=\{\`https:\/\/erp-render\.onrender\.com\/\$\{item\.View\}\`\} target="_blank" rel="noopener noreferrer" sx=\{\{ minWidth: 0, p: 0\.5, color: '#3b82f6', bgcolor: '#dbeafe', borderRadius: '6px', '&:hover': \{ bgcolor: '#bfdbfe' \} \}\}>\n\s*<VisibilityIcon sx=\{\{ fontSize: 16 \}\} \/>\n\s*<\/Button>/g,
  `<Tooltip title="View Document">
                                    <Button component="a" href={\`https://sellerp-backend.onrender.com/\${item.View}\`} target="_blank" rel="noopener noreferrer" sx={{ minWidth: 0, p: 0.5, color: '#3b82f6', bgcolor: '#dbeafe', borderRadius: '6px', '&:hover': { bgcolor: '#bfdbfe' } }}>
                                      <VisibilityIcon sx={{ fontSize: 16 }} />
                                    </Button>
                                  </Tooltip>`
);

content = content.replace(
  /<Button onClick=\{\(\) => handleDelete\(item\.id\)\} sx=\{\{ minWidth: 0, p: 0\.5, color: '#ef4444', bgcolor: '#fee2e2', borderRadius: '6px', '&:hover': \{ bgcolor: '#fecaca' \} \}\}>\n\s*<FaTrash size=\{14\} \/>\n\s*<\/Button>/g,
  `<Tooltip title="Delete Entry">
                                    <Button onClick={() => handleDelete(item.id)} sx={{ minWidth: 0, p: 0.5, color: '#ef4444', bgcolor: '#fee2e2', borderRadius: '6px', '&:hover': { bgcolor: '#fecaca' } }}>
                                      <FaTrash size={14} />
                                    </Button>
                                  </Tooltip>`
);

fs.writeFileSync(filePath, content);
console.log("Fixes applied.");
