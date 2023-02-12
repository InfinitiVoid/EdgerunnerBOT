const WebSocket = require('ws');
const wsServer = "wss://eventsub-beta.wss.twitch.tv/ws";

const handleRequest = require('./requestHandler');
const resolveNotification = require('./resolveNotification.js');

module.exports = (clientDC, clientTW, botTW) => {
    async function startWebsocket(server){
        const ws = new WebSocket(server);
        ws.on('message', function message(data) {
            var dataS = JSON.parse(data);
            console.log(dataS);
            switch(dataS.metadata.message_type){
                case("session_welcome"): 
                    handleRequest(dataS);
                    break;
                case("notification"):
                    resolveNotification(dataS, clientTW, clientDC, botTW);
                    break;
                case("session_reconnect"):
                    startWebsocket(dataS.payload.session.reconnect_url);
                    return;
            };
        });
    }
    startWebsocket(wsServer);
}