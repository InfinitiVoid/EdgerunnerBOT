const discordMessage = require('./Twitch commands/discord');
const tipMessage = require('./Twitch commands/tip');
const autoMessage = require('./twichAutoMessages');
const { client } = require('tmi.js');
module.exports = (clientTW, channel, tags, message, self) => {
    if(self) return;
    console.log(tags.username);
    switch(message.toLowerCase()){
        case("!discord"): 
            discordMessage(channel, clientTW);
            break;
        case("!tip"):
            tipMessage(channel, clientTW);
            break;
        case ("!auto"):
            autoMessage(clientTW, true, channel);
            console.log("yes");
            break;
        case ("!stop"):
            autoMessage(clientTW, true, channel);
            break;
    }
}