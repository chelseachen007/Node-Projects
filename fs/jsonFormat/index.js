const fs = require('fs');
const tool = require('./tools');
const file="cityCenter.json";


console.log('读取城市code列表....');
let citylist =JSON.parse(fs.readFileSync( file));
console.log('读取城市完成....');

for(let i = 0; i< citylist.length; i++) {
    console.log(`解析第${i+1}个文件...`);
    tool.formatJson(`json/${citylist[i].adcode}.json`,`newfiles/${citylist[i].adcode}.json`,citylist);
} 

console.log('====================================');
fs.writeFileSync('errorFile.txt', JSON.stringify(tool.errorArr.toString()));
console.log('====================================');
console.log('转化完成....');