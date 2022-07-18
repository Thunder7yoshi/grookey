/*
    Grookey: Main client script
*/
const Discord = require("discord.js");
const config = require("../config");
const GT = require("./utils/grooktils");
/*
    LOGIN
*/
// const grookIntents = new Discord.Intents();
// for (var intent in config.client.intents) {
//     grookIntents.add(intent);
// }
// config.client.intents = grookIntents;
// console.log(grookIntents.bitfield)

// Intents seem broken, so I added them here.
config.client = {intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]}
const Client = new Discord.Client(config.client);

GT.loadCommands(Client);
Client.login(process.env.TOKEN);

/*
    EVENTS
*/
Client.on("ready",()=>{
    GT.messageOwners(Client,"Grookey is ready!");
    console.log("Grookey is ready!");
})

Client.on("messageCreate",async (message) => {
    if(message.author.bot) return;
    let {command, arguments} = await GT.parseMessage(message);
    if (!Client.commands.get(command)) command = await GT.checkAliases(Client.commands, command);
    if (!command) return;
    // Permission checks
    if (await GT.checkPermissions(command, message) == false) return message.reply(`You can't do this!`);
    if (await GT.checkOwnerStatus(command, message) == false) return message.reply(`You are not a bot developer!`);
    // Cooldowns should be added here!

    //
    try {
        Client.commands.get(command).execute(message, arguments, message.prefix);
    } catch (error) {
        console.log(error);
        message.reply('There was an error trying to execute that command!');
    }
})
var dashboard = null;
if (await GT.serverValidity(config.dashboard.serverURL,config.dashboard.serverPASS) == true) dashboard = new GT.Dashboard(config.dashboard.serverURL, config.dashboard.serverPASS, Client)
module.exports = Client;
