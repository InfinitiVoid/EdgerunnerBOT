require('dotenv').config();

const sendRequest = require('./sendRequest');
const fs = require('fs');

const streamIds = [process.env.VOID_STREAM_ID, process.env.VARGAS_STREAM_ID];
const name = './jsons/streamData.json';

module.exports = (dataS) => {
    for(let i = 0; i <= 8; i++){
		var m = JSON.parse(fs.readFileSync(name));
		m.transport.session_id = dataS.payload.session.id;
		switch(i){
			case(0):
				m.type = "channel.follow";
				var obj1 = {
					"broadcaster_user_id": "1232131",
				};
				m.condition = obj1;
				m.condition.broadcaster_user_id = streamIds[i];
				break;
			case(1):
				m.type = "channel.follow";
				m.condition.broadcaster_user_id = streamIds[i];
				break; 
			case(2):
				m.type = "stream.online";
				m.condition.broadcaster_user_id = streamIds[0];
				break;
			case(3):	
				m.type = "stream.offline";
				break;
			case(4):
				m.type = "channel.subscribe";
				break;
			case(5):
				m.type = "channel.subscription.gift";
				break;
			case(6):
				m.type = "channel.subscription.message";
				break;
			case(7):
				m.type = "channel.cheer";
				break;
			case(8):
				m.type = "channel.raid";
				var obj2 = {
					"to_broadcaster_user_id": "1232131",
				};
				m.condition = obj2;
				m.condition.to_broadcaster_user_id = streamIds[0];
				break;
		}
		let data2 = JSON.stringify(m);
		fs.writeFileSync(name, data2);
		console.log(m);
		sendRequest();
	}
}