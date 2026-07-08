const fs = require('fs');
const txt = fs.readFileSync('ResultsDashboard.css', 'utf8');
console.log('/*:', (txt.match(/\/\*/g)||[]).length);
console.log('*/:', (txt.match(/\*\//g)||[]).length);
console.log('":', (txt.match(/"/g)||[]).length);
console.log("':", (txt.match(/'/g)||[]).length);
