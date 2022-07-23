/*
    This file shouldn't be edited unless absoutely nessacary.

*/
require("dotenv").config();
const path = require("path");
global.rootFolder = path.resolve(__dirname);
global.Color = '#bff078'
global.Colour = '#bff078'; // two different spellings, thanks to UK and US.
module.exports = {
	config: require("./config.json"),
	Client: require("./src/client")
};