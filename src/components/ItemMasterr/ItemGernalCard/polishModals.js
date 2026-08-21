const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\admin\\Desktop\\FinalFiles\\5-6_ERP\\src\\components\\ItemMasterr\\ItemGernalCard';

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.jsx') && file.startsWith('NewCard')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace card-btn and btn
    content = content.replace(/className="card-btn\s*[^"]*"/g, 'className="btn-save w-100"');
    content = content.replace(/className="btn\s*[^"]*"/g, 'className="btn-save w-100"');
    // Re-replace the one case where btn-save w-100 becomes btn-save-save etc if it was already btn-save
    content = content.replace(/btn-save w-100-save/g, 'btn-save w-100');

    // Make table classes uniform
    content = content.replace(/<table className="[^"]*"/g, '<table className="table table-bordered mt-3"');
    
    // Fix duplicate classNames in labels
    content = content.replace(/className="col-form-label text-nowrap" style=\{\{ fontSize: "0\.82rem" \}\} htmlFor="([^"]+)" className="form-label"/g, 'htmlFor="$1" className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}');

    // Fix other random duplicate classNames on labels
    content = content.replace(/className="col-form-label text-nowrap" style=\{\{ fontSize: "0\.82rem" \}\}\s*className="[^"]*"/g, 'className="col-form-label text-nowrap" style={{ fontSize: "0.82rem" }}');

    fs.writeFileSync(filePath, content);
    console.log(`Polished ${file}`);
  }
});
