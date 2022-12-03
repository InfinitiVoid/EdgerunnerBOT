require('dotenv').config();

const test = require('./Discord commands/test');
const clear = require('./Discord commands/clear');
const warn = require('./Discord commands/warn');
const kick = require('./Discord commands/kick');
const ban = require('./Discord commands/ban');
const changeStatus = require('./Discord commands/status');
const help = require('./Discord commands/help');
const invite = require('./Discord commands/invite');

module.exports = (channel, content, isMod, clientDC, msg) => {
    const command = content.slice(process.env.PREFIX.length).split(" ")[0];
    switch(isMod){
        case(true):
				switch(command){
					case("test"):
						
						break;
					case("clear"):
						var amount = parseInt(content.slice(process.env.PREFIX.length + command.length + 1));
						clear(msg,amount);
						break;
					case("warn"):
						var warnMsg = content.slice(process.env.PREFIX.length + command.length + 1);
						warn(clientDC, msg, warnMsg)
						break;
					case("kick"):
						var kickMsg = content.slice(process.env.PREFIX.length + command.length + 1);
                        kick(clientDC, msg, kickMsg);
						break;
					case("ban"):
						var banMsg = content.slice(process.env.PREFIX.length + command.length + 1);
						ban(clientDC, msg, banMsg);
						break;
					case("status"):
						var status = content.slice(process.env.PREFIX.length + command.length + 1);
						changeStatus(status, clientDC);
						break;
				}
				break;
			case(false || true):
				switch(command){
					case("help"):
						
						break;
					case("invite"):
						invite(channel);
						break;
				}
				break;
    }
}