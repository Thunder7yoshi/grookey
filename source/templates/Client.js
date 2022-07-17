const { Client, Collection, Intents } = require('discord.js');

require('dotenv').config();
const { token } = process.env;

//#region Client options and intents
const {
    GUILDS,
    GUILD_BANS,
    GUILD_EMOJIS_AND_STICKERS,
    GUILD_MEMBERS,
    GUILD_MESSAGES,
} = Intents.FLAGS;

const clientOptions = {
    intents: [
        GUILDS,
        GUILD_BANS,
        GUILD_EMOJIS_AND_STICKERS,
        GUILD_MEMBERS,
        GUILD_MESSAGES,
    ],
    allowedMentions: {
        repliedUser: false,
    },
    presence: {
        status: 'online',
        activities: [
            {
                name: 'Pokémon',
                type: 0, // PLAYING
            },
        ],
    },
};
//#endregion

const { readFiles } = require('./Util');
module.exports = class Grookey extends Client {
    constructor() {
        super(clientOptions);
        this.commands = new Collection();
    };
    load(commands_path, events_path) {
        const commands = readFiles(commands_path);
        for(const fileName of commands) {
            const command = new (require(fileName))();
            this.commands.set(command.name, command);
        };
        const events = readFiles(events_path);
        for(const fileName of events) {
            const event = new (require(fileName))();
            this[ event.once ? 'once' : 'on'](event.name, (...args) => event.execute(...args, this));
        };
    };
    start(commands_path, events_path) {
        this.load(commands_path, events_path);
        this.login(token);
    };
};