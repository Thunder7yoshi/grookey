const Command = require('../../templates/Command');
module.exports = class Ping extends Command {
    constructor({ client }) {
        super({
            client,
            name: 'ping',
            description: 'Ping.'
        });
    };
    execute(i) {
        i.reply(`Ping! ${client.ws.ping}`);
    };
};