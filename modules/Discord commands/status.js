module.exports = (message, clientDC) => {
    var _status = message.slice(message.split(" ")[0].length + 1);
	if(message.split(" ")[0] in ActivityType){
		switch(message.split(" ")[0]){
			case("Playing"):
				clientDC.user.setActivity(_status, {type: ActivityType.Playing});
				break;
			case("Listening"):
				clientDC.user.setActivity(_status, {type: ActivityType.Listening});
				break;
			case("Watching"):
				clientDC.user.setActivity(_status, {type: ActivityType.Watching});
				break;
		}
	}
}