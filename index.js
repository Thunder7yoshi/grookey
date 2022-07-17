/*
    This file shouldn't be edited unless absoutely nessacary.

*/
require("dotenv").config();
const path = require("path");
global.rootFolder = path.resolve(__dirname);

module.exports = {
	config: require("./config.json"),
	Client: require("./src/client"),
};