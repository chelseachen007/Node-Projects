const fs = require("fs");

const delTargetDir = "node_modules";

const enterTargetDir = "../../../";

deleteTargetFolder(enterTargetDir, delTargetDir);

function deleteTargetFolder(path, target) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    console.log(files, "开始删除");
    files.forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // 同下边 都改成lstatSync
        if (file === target) {
          deleteFolder(curPath);
        } else {
          deleteTargetFolder(curPath, target);
        }
      }
    });
    console.log("删除完毕");
  }
}

function deleteFolder(path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      var curPath = path + "/" + file;
      //  本来网上是statSync 我给改成了 lstatSync
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    // console.log(curPath, "已删除");

    fs.rmdirSync(path);
  }
}
