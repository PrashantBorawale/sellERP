const http = require('https');

const fetchAPI = (url) => {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve("Not JSON: " + data.substring(0, 50));
                }
            });
        }).on('error', reject);
    });
};

const run = async () => {
    try {
        const rm = await fetchAPI("https://sellerp-backend.onrender.com/All_Masters/api/rm-items/");
        console.log("RM Items type:", Array.isArray(rm) ? "Array" : typeof rm, "- length/keys:", Array.isArray(rm) ? rm.length : Object.keys(rm).length);
        
        const bom = await fetchAPI("https://sellerp-backend.onrender.com/All_Masters/api/bom-items/");
        console.log("BOM Items type:", Array.isArray(bom) ? "Array" : typeof bom, "- length/keys:", Array.isArray(bom) ? bom.length : Object.keys(bom).length);
        
        const details = await fetchAPI("https://sellerp-backend.onrender.com/Store/general-details/");
        console.log("General Details type:", Array.isArray(details) ? "Array" : typeof details);
        
    } catch (err) {
        console.error(err);
    }
};
run();
