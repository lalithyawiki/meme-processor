let { writeFile } = require("fs");
let { join } = require("path");
let blend = require("@mapbox/blend");

const processMeme = async (initialParams) => {
  try {
    const imageData = await pullImageData(initialParams);
    const blendedData = await blendImages({
      imageData,
      ...initialParams
    });
    await saveFile({ blendedData, ...initialParams });
  } catch (err) {
    console.log(err);
    return;
  }
};

const pullImageData = async ({ promises, imagePositions }) => {
  const data = await Promise.all(promises);

  return data.map((el, index) => {
    console.log("Received response with status:" + el.res.statusCode);
    return { buffer: new Buffer(el.body, "binary"), ...imagePositions[index] };
  });
};

const blendImages = ({ imageData, width, height, imageFormat }) => {
  return new Promise((resolve, reject) => {
    blend(imageData, { width, height, imageFormat }, (err, blendedData) => {
      if (err) {
        reject(err);
      }

      resolve(blendedData);
    });
  });
};

const saveFile = ({ blendedData, savingPath }) => {
  return new Promise((resolve, reject) => {
    const fileOut = join(process.cwd(), savingPath);

    writeFile(fileOut, blendedData, "binary", (err) => {
      if (err) {
        reject(err);
      }

      console.log("The file was saved!");
      resolve(true);
    });
  });
};

module.exports = {
  processMeme,
  pullImageData,
  blendImages,
  saveFile,
};
