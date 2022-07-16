const { join } = require('path');
const Client = require('./source/templates/Client');

const client = new Client();
client.start(join(__dirname, 'source', 'commands'), join(__dirname, 'source', 'events'));