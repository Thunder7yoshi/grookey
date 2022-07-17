/*
    Grookey: Main client script
*/
const Discord = require("discord.js");
const config = require("../config");
const GT = require("./utils/grooktils");
/*
    LOGIN
*/
const grookIntents = new Discord.Intents();
for (var intent in config.client.intents) {
    grookIntents.add(intent);
}
config.client.intents = grookIntents;
console.log(grookIntents.bitfield)
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
    console.log(message.content)
    if(message.author.bot) return;
    let {commandName, arguments} = await GK.parseMessage(message);
    console.log(message.content)
    if (!message.client.commands[commandName]) command = GK.checkAliases(message.client.commands, commandName);
    if (!command) return;
    // Permission checks
    if (await GK.checkPermissions(command, message) == false) return message.reply(`You can't do this!`);
    if (await GK.checkOwnerStatus(command,message) == false) return message.reply(`You are not a bot developer!`);

    // Cooldowns should be added here!
    try {
        command.execute(message, arguments, message.prefix);
    } catch (error) {
        console.log(error);
        message.reply('There was an error trying to execute that command!');
    }
})

module.exports = Client;