const Command = require("../../templates/Command");
const { intType } = require('../../templates/Util');

module.exports = class DeployCmds extends Command {
    constructor({ client }) {
        super({
            client,
            name: 'commands',
            description: 'Commands',
            options: [{
                name: 'delete',
                description: 'Deletes slash commands',
                type: intType('SUB_COMMAND'),
                options: [{
                    name: 'globally',
                    description: 'If to delete the slash commands globally or in the current server',
                    type: intType('BOOLEAN'),
                    required: true
                }]
            }, {
                name: 'update',
                description: 'Deploys slash commands',
                type: intType('SUB_COMMAND'),
                options: [{
                    name: 'globally',
                    description: 'If to update the slash commands globally or in the current server',
                    type: intType('BOOLEAN'),
                    required: true
                }]
            }]
        });
    };
    async execute(i) {
        const subcommand = i.options.getSubcommand();
        const commands = this.client.commands.map(c => c.data);
        const global = i.options.getBoolean('globally');
        if(subcommand === 'delete') {
            await i.reply({ content: 'Deleting the slash commands...' });
            await (global ? this.client.application.commands : i.guild.commands).set(commands.filter(c => c.name === this.name));
            await i.editReply(`Done! Succesfully deleted all the slash commands ${global ? '' : `for \`${i.guild.name}\``}`);
        } else if (subcommand === 'update') {
            await i.reply({ content: 'Updating the slash commands...' });
            await (global ? this.client.application.commands : i.guild.commands).set(commands);
            await i.editReply(`Done! Succesfully updated all the slash commands ${global ? '' : `for \`${i.guild.name}\``}`);
        };
    };
};