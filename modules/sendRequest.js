const name = './jsons/streamData.json';
const axios = require('axios');
const fs = require('fs');

module.exports = () => {
    async function sendRequest(){
        await axios.post(
            "https://api.twitch.tv/helix/eventsub/subscriptions",
            fs.readFileSync(name),
            {
                headers: {
                    "Authorization": "Bearer " + process.env.Autorization_Bearer,
                    "Client-Id": process.env.TWITCH_BOT_CLIENT_ID,
                    "Content-Type": "application/json"
                },
            }
        );
    }
    sendRequest();
}