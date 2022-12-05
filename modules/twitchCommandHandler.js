const discordMessage = require('./Twitch commands/discord');
const tipMessage = require('./Twitch commands/tip');
module.exports = (clientTW, channel, tags, message, self) => {
    if(self) return;

    switch(message.toLowerCase()){
        case("!discord"): 
            discordMessage(channel, clientTW);
            break;
        case("!tip"):
            tipMessage(channel, clientTW);
            break;
    }
}