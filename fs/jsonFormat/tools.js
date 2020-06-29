const fs = require("fs");
var path = require("path");

let errorArr = [];

module.exports = {
  errorArr: errorArr,
  formatJson: (dir, newfilepath, citylist) => {
    var file = path.join(__dirname, dir);
    var newfile = path.join(__dirname, newfilepath);
    let newCityData = "";

    try {
      let data = JSON.parse(
        fs
          .readFileSync(file, "utf-8")
          .toString()
          .trim()
      );
      data.features = data.features.map(item => {
        citylist.some(temp => {
          if (item.properties.name === temp.name) {
            item.properties = {
              ...item.properties,
              center: [temp.xinfo, temp.yinfo]
            };
            return true;
          }

          return false;
        });

        if (!item.properties.center) {
          fs.writeFileSync("未找到匹配项.txt", newfilepath);
        }
        return item;
      });

      newCityData = data;
      fs.writeFileSync(newfile, JSON.stringify(newCityData));
    } catch (error) {
      if (error.errno !== -4058) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        errorArr.push(dir.split("/")[1]);
      }
    }
  }
};
