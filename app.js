const { get } = require("./api");
const { processMeme } = require("./utils");
let argv = require("minimist")(process.argv.slice(2));

let {
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
  savingPath = "./cat-card.jpg",
  imageFormat = "jpeg",
} = argv;

const generateRequest = (sayThis) => {
  // https://cataas.com/cat/says/Hi%20There?width=500&amp;height=800&amp;c=Cyan&amp;s=150
  return {
    url:
      "https://cataas.com/cat/says/" +
      sayThis +
      "?width=" +
      width +
      "&height=" +
      height +
      "&color" +
      color +
      "&s=" +
      size,
    encoding: "binary",
  };
};

const imagePositions = [
  { x: 0, y: 0 },
  { x: width, y: 0 },
];
const promises = [get(generateRequest(greeting)), get(generateRequest(who))];

processMeme({ promises, imagePositions, width: width * 2, height, imageFormat, savingPath });
