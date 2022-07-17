/*
    Grookey: Main client script
*/
const Discord = require("discord.js");
const config = require("../config");
const gt = require("./utils/grooktils");

const grookIntents = new Discord.Intents();
for (var intent in config.client.intents) {
    grookIntents.add(intent);
}
config.client.intents = grookIntents;
const Client = new Discord.Client(config.client);
Client.login(process.env.TOKEN);

Client.on("ready",()=>{
    gt.messageOwners(Client,"Grookey is ready!");
    console.log("Grookey is ready!");
})
module.exports = Client;