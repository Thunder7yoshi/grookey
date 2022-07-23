module.exports = {
    name: 'sudo',
    description: 'Force someone to say something!',
    category: 'fun',
    guildOnly: true,
    cooldown: true,
    permissions: 'MANAGE_MESSAGES',
    async execute(message, args) {
        if (args[0]) {
            let target;

            if (!isNaN(args[0])) {
                const member = message.guild.members.cache.get(args[0]);
                if (!member) return message.reply('Invalid member ID');
                target = member;
            }

            if (isNaN(args[0])) {
                const member = message.mentions.members.first() || message.guild.members.cache.find(x => x.user.username.toLowerCase().startsWith(args[0].toLowerCase())) || message.guild.members.cache.find(x => x.user.tag.toLowerCase() === args[0].toLowerCase()) || message.guild.members.cache.find(x => x.displayName.toLowerCase().startsWith(args[0].toLowerCase()));
                if (!member) return message.reply('Couldn\'t find that member');
                target = member;
            }
            await message.delete();

            const webhooks = await message.channel.fetchWebhooks();
            if (!webhooks.size) {
                await message.channel.createWebhook('Grookey\'s hook', {
                    avatar: 'https://raw.githubusercontent.com/Thunder7yoshi/Files/master/Grookey/Grookey.png',
                    reason: `Grookey\'s hook | ${message.author.id}`
                });
            }
            const webhook = await message.channel.fetchWebhooks().then(hooks => hooks.first());
            var name = (target.nickname) ? target.nickname : target.user.username;
            webhook.send({
                content: args.slice(1).join(" "),
                username: name,
                avatarURL: target.user.avatarURL({"format": "png"})
            }).catch(() => {
                return message.channel.send("I don't have enough permissions to execute this command.")
            })
            return message.channel.send('<a:Lol:777696536016322590>').then(msg => {
                msg.delete();
            });
        } else {
            return message.reply("Uhh, you didn't specify anyone.");
        }
    }
}