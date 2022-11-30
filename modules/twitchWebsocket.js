const WebSocket = require('ws');
const wsServer = "wss://eventsub-beta.wss.twitch.tv/ws";

const handleRequest = require('./requestHandler');
const resolveNotification = require('./resolveNotification.js');

module.exports = (clientDC, clientTW, botTW) => {
    async function startWebsocket(){
        const ws = new WebSocket(wsServer);

        ws.on('message', function message(data) {
            var dataS = JSON.parse(data);
            switch(dataS.metadata.message_type){
                case("session_welcome"): 
                    handleRequest(dataS);
                    break;
                case("notification"):
                    resolveNotification(dataS, clientTW, clientDC, botTW);
                    break;
                case("reconnect"):
                    ws = new Websocket(dataS.payload.session.reconnect_url);
                    break;
            };
        });
    }
    startWebsocket();
}