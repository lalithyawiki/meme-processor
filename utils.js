let { writeFile } = require("fs");
let { join } = require("path");
let blend = require("@mapbox/blend");

const pullImageData = async ({ promises, imagePositions }) => {
  const data = await Promise.all(promises);

  return data.map((el, index) => {
    console.log("Received response with status:" + el.res.statusCode);
    return { buffer: new Buffer(el.body, "binary"), ...imagePositions[index] };
  });
};

const blendImages = (data, width, height, format) => {
  return new Promise((resolve, reject) => {
    blend(data, { width, height, format }, (err, blendedData) => {
      if (err) {
        reject(err);
      }

      resolve(blendedData);
    });
  });
};

const saveFile = (data, filePath) => {
  const fileOut = join(process.cwd(), filePath);

  writeFile(fileOut, data, "binary", (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("The file was saved!");
  });
};

module.exports = {
  pullImageData,
  blendImages,
  saveFile,
};
