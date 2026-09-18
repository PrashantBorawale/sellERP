const fs = require('fs');

const file = 'C:\\Users\\admin\\Desktop\\FinalFiles\\5-6_ERP\\src\\components\\ItemMasterr\\ItemMasterGernal\\ItemMasterGernal.js';
const content = fs.readFileSync(file, 'utf8');

const regex = /<button[^>]*>.*?<\/button>/gs;
let match;
while ((match = regex.exec(content)) !== null) {
    let btnText = match[0];
    if (btnText.includes('New') || btnText.includes('CachedIcon')) {
        console.log("-------------------");
        console.log(btnText.replace(/\n\s*/g, ' '));
    }
}
