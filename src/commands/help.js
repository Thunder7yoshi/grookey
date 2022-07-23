const { MessageEmbed } = require("discord.js")
const GT = require("../utils/grooktils")
module.exports = {
    name: 'help',
    description: 'Shows all the commands!',
    category: 'utility',
    guildOnly: true,
    cooldown: true,
    async execute(message, args) {
        let embed = new MessageEmbed()
        .setColor(Colour)
        .setAuthor({name: 'Grookey Help',iconURL: await message.client.user.avatarURL({"format": "png"}),url:"https://github.com/Thunder7Yoshi/grookey"});
        if (args[0]) {
            // get valid categories + all commands in categories
            var categories = []
            var items = {}
            message.client.commands.forEach((val,key) => {
                if(!categories.includes(val.category)) {
                    categories.push(val.category);
                    items[val.category] = []
                }
                items[val.category].push(val)
            })
            // check if argument 0 is a category
            if (categories.includes(args[0].toLowerCase())) {
                // get all items out of category
                for (var command in items[args[0].toLowerCase()]) {
                    embed.addFields({name:GT.capitaliseFirst(items[args[0].toLowerCase()][command].name),value:items[args[0].toLowerCase()][command].description});
                }
            } else {
                return message.reply(`That isn't a category`)
            }
            message.channel.send({embeds: [embed] });
        } else {
            // get categories
            var categories = []
            message.client.commands.forEach((val,key) => {
                if(!categories.includes(val.category)) {
                    categories.push(val.category); 
                    embed.addFields({name:GT.capitaliseFirst(val.category),value:'\u200b'})
                }
            })
            message.channel.send({embeds: [embed] });
        }
    }
}