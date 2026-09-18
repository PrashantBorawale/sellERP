const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\admin\\Desktop\\FinalFiles\\5-6_ERP\\src\\components\\ItemMasterr\\ItemGernalCard';

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.jsx') && file.startsWith('NewCard')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove stray headers (h4, h5, h6) since the modal wrapper provides them
    content = content.replace(/<h[4-6].*?>.*?<\/h[4-6]>/gi, '');

    // Replace container classes to use fluid layout with no extra padding
    content = content.replace(/className="container\s*(mt-\d+)?"/g, 'className="container-fluid p-0"');
    content = content.replace(/className='container\s*(mt-\d+)?'/g, 'className="container-fluid p-0"');

    // Replace standard buttons with golden UI buttons
    // The "Save" or "Add" buttons
    content = content.replace(/className="btn\s*(btn-primary|btn-success)?"/g, 'className="btn-save"');
    content = content.replace(/className='btn\s*(btn-primary|btn-success)?'/g, 'className="btn-save"');

    // If it's just "btn", sometimes it gets tricky, let's catch standard variants:
    content = content.replace(/className="btn"/g, 'className="btn-save"');

    // Make inputs consistent
    content = content.replace(/className={`form-control\s*\${/g, 'className={`form-control ${');
    
    // Add text-nowrap and font size to labels to prevent wrapping in tight columns
    content = content.replace(/<label>/g, '<label className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}>');
    content = content.replace(/<label /g, '<label className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }} ');

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
