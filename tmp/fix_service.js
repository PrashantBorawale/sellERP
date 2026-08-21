const fs = require('fs');
const path = 'src/Service/Production.jsx';
let content = fs.readFileSync(path, 'utf8');
const brokenContent = `export const getDailyProductionReport = async (filters) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await axios.get(\\https://sellerp-backend.onrender.com/Production/daily-production/?\\\\);
    return response.data;
  } catch (error) {
    console.error("Error fetching daily production report:, error);
    throw error;
  }
};`;

const fixedFunction = `export const getDailyProductionReport = async (filters) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await axios.get(\`https://sellerp-backend.onrender.com/Production/daily-production/?\${params}\`);
    return response.data;
  } catch (error) {
    console.error("Error fetching daily production report:", error);
    throw error;
  }
};`;

// Use regex to find the broken part and replace it
// Since there might be slight variations in whitespace or newlines from Add-Content,
// we'll match from 'export const getDailyProductionReport' to the end of the file.
const regex = /export const getDailyProductionReport[\s\S]*/;
const fixed = content.replace(regex, fixedFunction);
fs.writeFileSync(path, fixed);
console.log('Fixed Production.jsx');
