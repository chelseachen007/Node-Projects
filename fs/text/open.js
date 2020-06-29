const fs = require("fs");
fs.open("./a.txt", "r", function (err, fd) {
  var buf = new Buffer(1024);
  var offset = 0;
  var len = buf.length;
  // var pos = 2000
  var pos = 101;
  // 这里我定义了参数，文件打开后，会从第 100 个字节开始，读取其后的 1024 个字节的数据。读取完成后，回调方法中可以处理读取到的的缓冲的数据了
  fs.read(fd, buf, offset, len, pos, function (err, bytes, buffer) {
    console.log("读取了" + bytes + " bytes");
    //数据已被填充到 buf 中
    console.log(buf.slice(0, bytes).toString());
  });
});
