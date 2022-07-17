module.exports = class {
    constructor() {};
    static readFiles = path => {
        const { join } = require('path');
        const { readdirSync } = require('fs');
        const files = [];
        const r = p => {
            const a = readdirSync(p, { withFileTypes: true });
            for (const b of a) {
                if (b.isDirectory()) r(join(p, b.name));
                else files.push(join(p, b.name));
            }
        }
        r(path);
        console.log(files);
        return files;
    };
    static events = ['applicationcommandpermissionsupdate','channelcreate','channeldelete','channelpinsupdate','channelupdate','debug','emojicreate','emojidelete','emojiupdate','error','guildbanadd','guildbanremove','guildcreate','guilddelete','guildintegrationsupdate','guildmemberadd','guildmemberavailable','guildmemberremove','guildmemberschunk','guildmemberupdate','guildscheduledeventcreate','guildscheduledeventdelete','guildscheduledeventupdate','guildscheduledeventuseradd','guildscheduledeventuserremove','guildunavailable','guildupdate','interactioncreate','invalidated','invitecreate','invitedelete','messagecreate','messagedelete','messagedeletebulk','messagereactionadd','messagereactionremove','messagereactionremoveall','messagereactionremoveemoji','messageupdate','presenceupdate','ready','rolecreate','roledelete','roleupdate','sharddisconnect','sharderror','shardready','shardreconnecting','shardresume','stageinstancecreate','stageinstancedelete','stageinstanceupdate','stickercreate','stickerdelete','stickerupdate','threadcreate','threaddelete','threadlistsync','threadmembersupdate','threadmemberupdate','threadupdate','typingstart','userupdate','voicestateupdate','warn','webhookupdate'];
};
