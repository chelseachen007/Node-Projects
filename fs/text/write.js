const fs = require("fs");
var data = new Buffer("Hi Juejin!");
// fs.open("./b.txt", "a", function (err, fd) {
//   var buf = new Buffer("I Love Juejin");
//   var offset = 0;
//   var len = buf.length;
//   var pos = 100;

//   fs.write(fd, buf, offset, len, pos, function (err, bytes, buffer) {
//     console.log("写入了 " + bytes + " bytes");
//     //数据已被填充到 buf 中
//     console.log(buf.slice(0, bytes).toString());
//     fs.close(fd, function (err) {});
//   });
// });
//fs.write(fd, buffer, offset, length, position, callback)

fs.open("./c.txt", "a", function (err, fd) {
  var data = "I Love Juejin";

  // 第一个参数依然是文件描述符，第二个是写入的字符串，第三个是写入文件的位置，第四个是编码格式，最后一个是回调函数，回调函数第一个参数是异常，第二个是 指定多少字符数将被写入到文件，最后一个是返回的字符串
  fs.write(fd, data, 0, "utf-8", function (err, written, string) {
    console.log(written);
    console.log(string);

    fs.close(fd, function (err) {});
  });
});
