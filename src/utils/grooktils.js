/*
    This file is meant as a "general-helper" for client tasks.

    Use this file as a utility and not a base file.
*/

const Discord = require("discord.js");
const config = require("../../config.json");
async function messageOwners(message) {
    let i = 0; // Amount of of succeeded messages
    for (var ownerID of config.ownerIDS) {
        try {
            (await Client.users.fetch(ownerID)).send(message);
            i++;
        } catch {}
    }
    console.log(`Messaged ${i}/${config.ownerIDS.length} owners.`)
    
}
module.exports = {
    messageOwners,
}