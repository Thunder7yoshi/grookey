/*
    This file is meant as a "general-helper" for Client tasks.

    Use this file as a utility and not a base file.
*/

const Discord = require("discord.js");
const config = require("../../config.json");
const fs = require("fs");
const path = require("path");
const {fetch} = require("node-fetch-commonjs");
const { setTimeout } = require("timers/promises");
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
        const command = require(`${commandsDir}/${file}`);
        try {
            (command.disabled == undefined) ? Client.commands.set(command.name, command) : null;
            c++;
        } catch (e) {
            console.log(e);   
        }
    }
    console.log(`${c}/${commandFiles.length} commands successfully loaded!`)
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
        message.prefix = config.prefix;
    } else message.prefix = config.prefix;

    if (!message.content.startsWith(message.prefix)) return {command:null, arguments:null}; //if theres no prefix at the start, return null

    const arguments = message.content.slice(message.prefix.length).trim().split(/ +/); // get arguments
    const command = arguments.shift().toLowerCase(); // command name
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
        if (commands.get(command).aliases.include(alias)) {
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
/**
 * @name dashboardValidity
 * @description Checks the validity of a dashboard
 * @author DwifteJB
 * @param {String} url
 * @param {String} pass
 */
async function dashboardValidity(url,pass) {
    if(url.length == 0) return false;
    if(!url.startsWith("http")) return false
    try {
        const response = await fetch(url+"/api/check", {
            method: "post",
            body: {"password":pass}
        });
        const data = response.data();
        if (data.status == true) return true
    } catch(e) {
        return false
    }
}
 async function recieveData(url,password) {
    try {
        const response = await fetch(url+"/api/recieveData", {
            method: "post",
            body: {
                password: password
            }
        });
        const data = response.json();
        return data;
    } catch (e) {
        console.error("Failed to connect to dashboard:\n",e);
        return false;
    }
}
async function DBconnect(url,password,Client) {
    try {
        const response = await fetch(url+"/api/connect", {
            method: "post",
            body: {
                Client: Client,
                password: password
            }
        });
        const data = response.json();
        if (data.status == true) {
            console.log("Successfully connected to Dashboard!")
            return true;
        } else return false;
    } catch (e) {
        console.error("Failed to connect to dashboard:\n",e);
        return false;
    }
}
/**
 * @name capitaliseFirst
 * @description Capitalises the first (and only the first) letter in a string
 * @author DwifteJB
 * @param {String} string
 * @returns {String}
 */
function capitaliseFirst(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * @name Dashboard
 * @description Dashboard logic.
 * @author DwifteJB
 * @param {String} url
 * @param {String} password
 * @param {Client} Client
 */
async function Dashboard(url,password,Client) {
    var connection = await this.DBconnect(url,password,Client);
    if (connection==true) {
        // rest of logic
        // use Client.emit("blah", data) to send data
        var doneInstructions = [];
        async function doInstructions(url,password, Client) {
            setInterval(async function() {
                const data = await this.recieveData(url,password);
                
                for (var instruction in data.instructions) {
                    if (doneInstructions.includes(instruction.id)) return;
                    try {
                        this.Client.emit(instruction.task,instruction.data);
                    } catch (e) {
                        fetch(url+"/api/failed", {
                            body: {
                                body: {id:instruction.id},
                                password: password
                            }
                        });
                    }
                    doneInstructions.push(instruction.id);
                }
                doInstructions(url,password, Client);
            }, 120000)
        }
    }
}

module.exports = {
    messageOwners,
    loadCommands,
    parseMessage,
    checkAliases,
    checkPermissions,
    checkOwnerStatus,
    dashboardValidity,
    Dashboard,
    capitaliseFirst
}
