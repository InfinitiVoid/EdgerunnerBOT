require('dotenv').config();

const discordMessage = require('./Twitch commands/discord');

module.exports = (clientTW, status, channel) => {
    console.log("Started interval")
    function intervalFunc() {
        discordMessage(channel, clientTW);
    }
    if (status == "true") {
        var i = setInterval(intervalFunc, 1200000);
    } else if( status == "false"){
        clearInterval(i);
    }
}