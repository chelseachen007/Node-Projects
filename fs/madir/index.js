// 使用 fs.readdir 读取目录，重点其回调函数中files对象
// fs.readdir(path, callback);
const fs = require("fs");

/**
 * path, 要读取目录的完整路径及目录名；
 * [callback(err, files)], 读完目录回调函数；err错误对象，files数组，存放读取到的目录中的所有文件名
 */
const filesPath = "../";
let files = [];
const walk = function (path) {
  fs.readdirSync(path).forEach(function (file) {
    const newPath = path + "/" + file;
    const stat = fs.statSync(newPath);

    if (stat.isFile()) {
      if (/\.js/.test(file)) {
        files.push(file);
      }
    } else if (stat.isDirectory()) {
      walk(newPath);
    }
  });
};
walk(filesPath);
console.log(files.join("\r\n"));
