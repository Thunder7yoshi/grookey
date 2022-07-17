const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: 'ping',
    category: 'utility',
    description: 'Tests bot\'s latencies',
    aliases: ["beep", "boop"],
    execute(message) {
        message.reply(`\`Pinging...\``).then(msg => {
            let dataPing = Date.now();
            let dataPingNow = Date.now();
            let dataRealPing = dataPingNow - dataPing;
            const pingEmbed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle('🏓 Pong!')
                .setDescription(`Grookey's Evaluation Time - **${Math.round((msg.createdAt - message.createdAt)/(message.client.ws.ping))}**ms \nGrookey's Latency - **${Math.round(msg.createdAt - message.createdAt)}**ms \nAPI Latency - **${Math.round(message.client.ws.ping)}**ms\nDatabase Latency - **${dataRealPing}**ms`)
                .setColor('#bff078');

            msg.edit('\u200b', pingEmbed);
        });
    }
}