const fs = require('fs');

const path = 'C:/Users/admin/Desktop/FinalFiles/5-6_ERP/src/components/BOMRouting/BomRouting.css';
let content = fs.readFileSync(path, 'utf8');

// Append global layout rules
content += `

.CommodityMaster {
  width: 100%;
  overflow-x: hidden;
}

.CommodityMaster .main-content {
  width: 100%;
  max-width: 100vw;
  transition: all 0.3s ease;
  overflow-x: hidden;
}

.CommodityMaster .main-content.shifted {
  width: calc(100% - 250px);
}
`;

fs.writeFileSync(path, content, 'utf8');
console.log('Appended global shifted layout scaling to BomRouting.css');
