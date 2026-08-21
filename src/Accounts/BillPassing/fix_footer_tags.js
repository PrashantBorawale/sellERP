const fs = require('fs');
const file = 'c:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/Accounts/BillPassing/DirectBill.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Change </Paper> before {/* Confirmation Modal */} to </div>
content = content.replace(
    /<\/Paper>\s*\{\/\* Confirmation Modal \*\/\}/,
    `</div>\n                    {/* Confirmation Modal */}`
);

// 2. Change the </div> that closes footer-section to </Paper>
// We can find it by looking for the end of Remark Row
const remarkEndStr = `</textarea>
                      </div>
                    </div>
                  </div>`;
const remarkEndReplacement = `</textarea>
                      </div>
                    </div>
                  </Paper>`;
content = content.replace(remarkEndStr, remarkEndReplacement);

fs.writeFileSync(file, content);
console.log("Fixed footer tags correctly!");
