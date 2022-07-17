/*
    This file is meant as a "general-helper" for Client tasks.

    Use this file as a utility and not a base file.
*/

const Discord = require("discord.js");
const config = require("../../config.json");
const fs = require("fs");
const path = require("path");

/**
 * @name messageOwners
 * @description Sends a message to all owners in config file
 * @author DwifteJB
 * @param {string} message
 */
async function messageOwners(message) {
    let i = 0; // Amount of of succeeded messages
    for (var ownerID of config.ownerIDS) {
        try {
            (await Client.users.fetch(ownerID)).send(message);
            i++;
        } catch {}
    }
    console.log(`Messaged ${i}/${config.ownerIDS.length} owners.`)
    return true;   
}
/**
 * @name loadCommands
 * @description Loads all commands to Client
 * @author DwifteJB
 * @param {Client} Client
 */
async function loadCommands(Client) {
    var i = 0;
    var c = 0;
    const commandsDir = path.join(__dirname, "../commands");
    Client.commands = new Discord.Collection();

    const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        i++;
        const command = require(`${commandsDir}/${file}`);
        try {
            (command.disabled == undefined) ? Client.commands.set(command.name, command) : null;
            console.log(`${command.name} has been loaded!`)
            c++;
        } catch (e) {
            console.log(e);   
        }
    }
    console.log(`${c}/${i} commands successfully loaded!`)
}
/**
 * @name parseMessage
 * @description parses message
 * @author DwifteJB
 * @param {Message} message
 * @returns {Promise<Object>}
 */
async function parseMessage(message) {
    if (!message.content) return {command:null, arguments:null};

    if (message.guild) {
        // heres where we would have our prefix check, but as MongoDB hasn't been setup yet, ill just default it to g!
        // - DwifteJB
        message.prefix = "g!";
    } else message.prefix = "g!"

    if (!message.content.startsWith(message.prefix)) return {command:null, arguments:null}; //if theres no prefix at the start, return null

    const arguments = message.content.slice(message.prefix.length).trim().split(/ +/); // get arguments

    const command = args.shift().toLowerCase(); // command name

    return {command: command, arguments: arguments}
    
}
/**
 * @name checkAliases
 * @description Checks Aliases for Commands
 * @author DwifteJB
 * @param {Object} commands
 * @param {String} alias
 */
async function checkAliases(commands, alias) {
    let found = null;
    for (var command in commands) {
        if (commands[command].aliases.include(alias)) {
            found=command;
            break;
        }
    }
    return found;
}
/**
 * @name checkPermissions
 * @description Check if a user has the correct permissions
 * @author DwifteJB
 * @param {Command} command
 * @param {Message} message
 */
async function checkPermissions(command,message) {
    if (command.permissions) {
        message.permissions = await message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return false;
        }
        return true;
    }
    return true;
}
/**
 * @name checkOwnerStatus
 * @description Check if a user has "owner" status (in config.json)
 * @author DwifteJB
 * @param {Command} command
 * @param {Message} message
 */
async function checkOwnerStatus(command,message) {
    if (command.botOwner) {
        if (config.ownerIDS.includes(message.author.id)) {
            return true;
        }
        return false;
    }
    return true;
}
// if (command.botOwner) {
    
// }
module.exports = {
    messageOwners,
    loadCommands,
    parseMessage,
    checkAliases,
    checkPermissions,
    checkOwnerStatus
}