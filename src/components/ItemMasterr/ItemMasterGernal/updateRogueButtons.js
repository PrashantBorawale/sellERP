const fs = require('fs');

const files = [
  'C:\\Users\\admin\\Desktop\\FinalFiles\\5-6_ERP\\src\\components\\ItemMasterr\\ItemMasterGernal\\ItemMasterGernal.js',
  'C:\\Users\\admin\\Desktop\\FinalFiles\\5-6_ERP\\src\\components\\ItemMasterr\\Data2\\Data2.jsx'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace <button className="btn" ...> New </button> or similar variations
    content = content.replace(/<button[^>]*className="btn[^"]*"[^>]*>\s*New\s*<\/button>/g, (match) => {
        // preserve onClick and type
        let onClickMatch = match.match(/onClick=\{[^}]+\}/);
        let onClick = onClickMatch ? onClickMatch[0] : '';
        return `<button type="button" className="vndrbtn" ${onClick}>\n                                                  New\n                                                </button>`;
    });

    // Replace <button className="btn" ...> <CachedIcon /> </button> or similar variations
    content = content.replace(/<button[^>]*className="btn[^"]*"[^>]*>\s*<CachedIcon \/>\s*<\/button>/g, (match) => {
        let onClickMatch = match.match(/onClick=\{[^}]+\}/);
        let onClick = onClickMatch ? onClickMatch[0] : '';
        return `<button type="button" className="vndrbtn ms-2" ${onClick}>\n                                                  <CachedIcon />\n                                                </button>`;
    });

    fs.writeFileSync(file, content);
    console.log(`Updated all New/Refresh buttons in ${file}`);
});
