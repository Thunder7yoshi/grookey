const Command = require('../../templates/Command');
const { intType } = require('../../templates/Util');

module.exports = class Ban extends Command {
    constructor({ client }) {
        super({
            client,
            name: 'ban',
            description: 'Bans someone from the server',
            options: [{
                name: 'target',
                type: intType('USER'),
                description: 'The user to ban from the server',
                required: true,
            }, {
                name: 'reason',
                type: intType('STRING'),
                description: 'The reason for the ban',
                required: false
            }],
        });
    };
};