const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const Sequelize = require('../templates/Sequelize');

require('dotenv').config();
const { token, prefix } = process.env;

//#region Client options and intents
const {
    Guilds,
    GuildBans,
    GuildEmojisAndStickers,
    GuildMembers,
    GuildMessages,
    MessageContent
} = GatewayIntentBits;

const clientOptions = {
    intents: [
        Guilds,
        GuildBans,
        GuildEmojisAndStickers,
        GuildMembers,
        GuildMessages,
        MessageContent
    ],
    partials: [Partials.Channel],
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
    constructor(options = {}) {
        super(clientOptions);

        this.commands_path = options.commands_path;
        this.events_path = options.events_path;
        this.commands = new Collection();
        this.prefix = prefix;
        this.sequelize = new Sequelize();

        this.on('ready', this.onReady);

        this._token = token;
    };
    async onReady() {
        console.log('I\'m ready');
        this.loadFiles();
        await this.sequelize.auth();
    };
    loadFiles() {
        const commands = readFiles(this.commands_path);
        for(const fileName of commands) {
            const command = new (require(fileName))({ client: this });
            this.commands.set(command.name, command);
        };
        const events = readFiles(this.events_path);
        for(const fileName of events) {
            const event = new (require(fileName))();
            (event.rest ? this.rest : this)[ event.once ? 'once' : 'on'](event.name, (...args) => event.execute(...args, this));
        };
    };
};