const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\admin\\Desktop\\FinalFiles\\5-6_ERP\\src\\components\\ItemMasterr\\ItemGernalCard';

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.jsx') && file.startsWith('NewCard')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Fix the duplicate label classes
    content = content.replace(/className="col-form-label text-nowrap" style=\{\{ fontSize: "0\.82rem" \}\} className="col-form-label text-nowrap" style=\{\{ fontSize: "0\.82rem" \}\}/g, 'className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}');

    fs.writeFileSync(filePath, content);
    console.log(`Fixed label in ${file}`);
  }
});
