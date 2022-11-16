/* This is the starting point of the application. Run node app.js or npm start */
const { get, generateRequest } = require("./api");
const { processMeme } = require("./utils");
let argv = require("minimist")(process.argv.slice(2));

/*
All the parameters need to run the application are listed below.
There are some default values here. Users can pass these values as arguments from the terminal.
*/
let {
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
  savingPath = "./meme/cat-card.jpg",
  imageFormat = "jpeg",
} = argv;

/*
This is listing where images should render. 
There should be a appropriate position defined for each image you pull.
*/
const imagePositions = [
  { x: 0, y: 0 },
  { x: width, y: 0 },
];

const imageConfigs = { width, height, color, size };

/*
Add a get call to this list for each meme you need to fetch.
*/
const promises = [
  get(generateRequest({ sayThis: greeting, ...imageConfigs })),
  get(generateRequest({ sayThis: who, ...imageConfigs })),
];

/*
This call will generate the meme based on the params given above.
*/
processMeme({
  promises,
  imagePositions,
  width: width * 2,
  height,
  imageFormat,
  savingPath,
});
