const fs = require("fs");
const path = require("path");
const moment = require("moment");
const util = require("util");
const open = util.promisify(fs.open);
const read = util.promisify(fs.read)
;
// TODO: 视频时长计算有问题
function getTime(buffer) {
  const start = buffer.indexOf(Buffer.from("mvhd")) + 17;
  const timeScale = buffer.readUInt32BE(start);
  const duration = buffer.readUInt32BE(start + 4);
  // console.log(duration,timeScale);

  const movieLength = Math.floor(duration / timeScale);
  // console.log(movieLength);

  return movieLength;
}
function getLocaleTime(seconds) {
  return moment
    .duration(seconds, "seconds")
    .toJSON()
    .replace(/[PTHMS]/g, (str) => {
      switch (str) {
        case "H":
          return "小时";
        case "M":
          return "分钟";
        case "S":
          return "秒";
        default:
          return "";
      }
    });
}
async function getAllTime() {
  const dir = path.resolve(__dirname + "/video");
  const files = fs.readdirSync(dir).map((file) => path.resolve(dir, file));
  //   console.log(files); //D:\\study\\github\\Node-Projects\\video-time\\video\\5-1 01课node基础（2019.08.09）.mp4',
  const videos = await Promise.all(
    files.map(async (file) => {
      const fd = await open(file, "r");
      // 创建一个长度为 100、且用零填充的 Buffer。
      const buff = Buffer.alloc(100); // <Buffer 00 00 00 00 00 00 00 00 00 00....>
      const readData = await read(fd, buff, 0, 100, 0);
      const { buffer } = readData;
      const time = getTime(buffer);
      return { file, time };
    })
  );
  // console.log(videos);
  const res = {
    视频总数: videos.length,
    视频总时长: getLocaleTime(
      videos.reduce((prev, e) => {
        return prev + e.time;
      }, 0)
    ),
  };

  console.log(res);
  return res;
}
getAllTime();
