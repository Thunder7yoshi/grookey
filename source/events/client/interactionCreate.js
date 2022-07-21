const Event = require('../../templates/Event');
const { InteractionType } = require('discord.js');
module.exports = class InteractionCreate extends Event {
    constructor() {
        super({
            name: 'interactionCreate',
            custom: false,
            rest: false
        });
    };
    async execute(i, client) {
        if(i.type === InteractionType.ApplicationCommand) {
            const command = client.commands.get(i.commandName);
            try {
                command.execute(i);
            } catch (e) {
                console.error(e);
                await i.reply({ content: 'There was an error while executing this command.\n\`' + e.message + '\`', ephemeral: true });
            };
        };
    };
};