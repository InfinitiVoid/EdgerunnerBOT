require('dotenv').config();

const fs = require('fs');
const handleCommands = require('./discordCommanmdHandler');

module.exports = (clientDC, msg) => {
    if(msg.author.id === process.env.DC_BOT_ID){
        return;
    }
    const modRoles = fs.readFileSync('./txts/modRoles.txt').toString().split(',');
    var isMod = false;
    msg.member._roles.forEach(e => {
        modRoles.forEach(k => {
            if(k === e){
                isMod = true;
            }
        });
    });

    const bannedWords = fs.readFileSync('./txts/bannedWords.txt').toString().split(',');
    bannedWords.forEach(e => {
        if(msg.content.includes(e.toLowerCase()) && !isMod){
			autoWarn(msg, e, clientDC);
			msg.delete(1000);
		}
    });

    if(msg.content.startsWith(process.env.PREFIX)){
        handleCommands(clientDC.channels.cache.get(msg.channelId), msg.content, isMod, clientDC, msg);
    }
}