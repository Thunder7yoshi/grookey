module.exports = class {
    constructor() {};
    static readFiles = (path) => {
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
        return files;
    };
    static events = ['applicationcommandpermissionsupdate','channelcreate','channeldelete','channelpinsupdate','channelupdate','debug','emojicreate','emojidelete','emojiupdate','error','guildbanadd','guildbanremove','guildcreate','guilddelete','guildintegrationsupdate','guildmemberadd','guildmemberavailable','guildmemberremove','guildmemberschunk','guildmemberupdate','guildscheduledeventcreate','guildscheduledeventdelete','guildscheduledeventupdate','guildscheduledeventuseradd','guildscheduledeventuserremove','guildunavailable','guildupdate','interactioncreate','invalidated','invitecreate','invitedelete','messagecreate','messagedelete','messagedeletebulk','messagereactionadd','messagereactionremove','messagereactionremoveall','messagereactionremoveemoji','messageupdate','presenceupdate','ready','rolecreate','roledelete','roleupdate','sharddisconnect','sharderror','shardready','shardreconnecting','shardresume','stageinstancecreate','stageinstancedelete','stageinstanceupdate','stickercreate','stickerdelete','stickerupdate','threadcreate','threaddelete','threadlistsync','threadmembersupdate','threadmemberupdate','threadupdate','typingstart','userupdate','voicestateupdate','warn','webhookupdate'];
    
    //Convert string into discord api type 
    static intType = (string) => {
        let n = null;
        switch(string.toUpperCase()) {
            case 'SUB_COMMAND':
                n = 1;
                break;
            case 'SUB_COMMAND_GROUP':
                n = 2;
                break;
            case 'STRING':
                n = 3;
                break;
            case 'INTEGER':
                n = 4;
                break;
            case 'BOOLEAN':
                n = 5;
                break;
            case 'USER':
                n = 6;
                break;
            case 'CHANNEL':
                n = 7;
                break;
            case 'ROLE':
                n = 8;
                break;
            case 'MENTIONABLE':
                n = 9;
                break;
            case 'NUMBER':
                n = 10;
                break;
            case 'ATTACHMENT':
                n = 11;
                break;
            default:
                throw new Error('Option type error');
        };
        return n;
    };
};
