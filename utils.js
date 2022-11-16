let { writeFile } = require("fs");
let { join } = require("path");
let blend = require("@mapbox/blend");
const { _errLog, _log } = require("./logger");

/*
Utility functions to support the meme generation are added here
*/

const processMeme = async (initialParams) => {
  try {
    const imageData = await pullImageData(initialParams);
    const blendedData = await blendImages({
      imageData,
      ...initialParams
    });
    await saveFile({ blendedData, ...initialParams });
  } catch (err) {
    _errLog(err);
    return;
  }
};

const pullImageData = async ({ promises, imagePositions }) => {
  const data = await Promise.all(promises);

  return data.map((el, index) => {
    _log(`Received response ${index+1} with status: ${el.res.statusCode}`);
    return { buffer: new Buffer.from(el.body, "binary"), ...imagePositions[index] };
  });
};

const blendImages = ({ imageData, width, height, imageFormat }) => {
  return new Promise((resolve, reject) => {
    blend(imageData, { width, height, imageFormat }, (err, blendedData) => {
      if (err) {
        _errLog("Error occured while belnding images");
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
        _errLog("Error occured while saving the file");
        reject(err);
      }

      _log("The file was saved!");
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
