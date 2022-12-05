require('dotenv').config();
const { ThreadMemberFlags } = require("discord.js");

module.exports = (channel, tags, message, clientTW, self) => {
    if(self) return;
    if(tags.username.toLowerCase() != process.env.TWITCH_CHANNEL.toLowerCase()) return;

    let shouldSendMessage = false;
    const bannedWords = fs.readFileSync('./txts/bannedWords.txt').toString.split(',');

    shouldSendMessage = bannedWords.some(bannedWord => message.includes(bannedWord.toLowerCase()));

    if(shouldSendMessage){
        clientTW.deletemessage(channel, tags.id);
    }
}