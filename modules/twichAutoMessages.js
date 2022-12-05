require('dotenv').config();

const discordMessage = require('./Twitch commands/discord');

module.exports = (clientTW, status) => {
    if(status === 'true'){
        var i = setInterval(function(){
            discordMessage(process.env.TWITCH_CHANNEL, clientTW);
        }, 1800000);
    }
    if (status === 'false'){
        clearInterval(i);
    }
}