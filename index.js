const { join } = require('path');
const Client = require('./source/templates/Client');

const client = new Client({
    commands_path: join(__dirname, 'source', 'commands'),
    events_path: join(__dirname, 'source', 'events')
});
client.login(client._token);