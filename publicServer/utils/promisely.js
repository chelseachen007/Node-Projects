// const { readFile } = require("fs");
// const { join } = require("path");
// const filePath = join(__dirname, "./package.json.");

// const readFileAsync = (filePath) => {
//   return new Promise((resolve, reject) => {
//     readFile(filePath, "utf8", (err, data) => {
//       if (err) reject(err);
//       else resolve(data);
//     });
//   });
// };

// readFileAsync(filePath).then((data) => console.log(data.toString()));

const { readFile } = require("fs");
const { join } = require("path");
const { promisify } = require("util");
const filePath = join(__dirname, "./package.json");
const readFileAsync = promisify(readFile);

readFileAsync(filePath).then((data) => console.log(data.toString()));
