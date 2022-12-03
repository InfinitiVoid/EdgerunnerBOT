const sendFollowerEmbed = require('./Notifications/follow');
const sendSubsEmbed = require('./Notifications/subs');
const streamOnline = require('./Notifications/streamOnline');
const streamOffline = require('./Notifications/streamOffline');
const sendBitsEmbed = require('./Notifications/cheer');
const sendRaidEmbed = require('./Notifications/raid');

module.exports = (data, clientTW, clientDC, botTW) => {
    switch(data.metadata.subscription_type){
        case("channel.follow"):
            sendFollowerEmbed(data, clientDC);
            break;
        case("stream.online"):
            streamOnline(clientDC, botTW);
            break;
        case("stream.offline"):
            streamOffline(clientDC);
            break;
        case("channel.subscribe"):
            sendSubsEmbed(data, clientDC);
            break;
        case("channel.subscription.gift"):
            sendSubsEmbed(data, clientDC);
            break;
        case("channel.subscription.message"):
            sendSubsEmbed(data, clientDC);
            break;
        case("channel.cheer"):
            sendBitsEmbed(data, clientDC);
            break;
        case("channel.raid"):
            sendRaidEmbed(data, clientDC);
            break;
    }
}