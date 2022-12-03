const discordMessage = require('./Twitch commands/discord');

module.exports = (clientTW, channel, tags, message, self) => {
    if(self) return;

    switch(message.toLowerCase()){
        case("!discord"): 
            discordMessage(channel, clientTW);
    }
}