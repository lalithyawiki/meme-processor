let request = require("request");

/*
    REST related code added here
*/
const END_POINT = "https://cataas.com/cat/says/";

const generateRequest = ({ sayThis, width, height, color, size }) => {
  // https://cataas.com/cat/says/Hi%20There?width=500&amp;height=800&amp;c=Cyan&amp;s=150
  return {
    url: `${END_POINT}/${sayThis}?width=${width}&height=${height}&color=${color}&s=${size}`,
    encoding: "binary",
  };
};

const get = (reqData) => {
  return new Promise((resolve, reject) => {
    request.get(reqData, (err, res, body) => {
      if (err) {
        reject(err);
      }

      resolve({ res, body });
    });
  });
};

module.exports = {
  get,
  generateRequest,
};
