// const { join } = require('path');

// /**
//  * @type {import("puppeteer").Configuration}
//  */
// module.exports = {
//   cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
// };

const { join } = require("path");

module.exports = {
  cacheDirectory: join(__dirname, "node_modules", ".puppeteer_cache"),
};
