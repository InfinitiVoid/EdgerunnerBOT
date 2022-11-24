//every constant or library needed
require('dotenv').config();
const { Client,GatewayIntentBits, ActivityType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events }= require('discord.js');
const tmi = require('tmi.js');
const TwitchAPI = require('node-twitch').default;
const discordChannel = process.env.Void_Stream_DC_Channel;
const followDiscordChannel = process.env.Void_Follow_DC_Channel;
const vargasDiscordChannel = process.env.Vargas_Follow_DC_Channel;
const voidSubChannel = process.env.Void_Subs_DC_Channel;
const voidRaidChannel = process.env.Void_Raids_DC_Channel;
const voidBitsChannel = process.env.Void_Bits_DC_Channel;
const WebSocket = require('ws');
const fs = require('fs');
const http = require('http')
const axios = require('axios');
const streamIds = [process.env.Void_Stream_ID, process.env.Vargas_Stream_ID];

//websocket

var name = 'streamData.json';
var last_session = "wss://eventsub-beta.wss.twitch.tv/ws";

async function startWebsocket(){
	//starts websocket
	const ws = new WebSocket(last_session);
	//when websocket gets message every 10 seconds OR when event mentioned in sendRequest() happens
	ws.on('message', function message(data) {
		var dataS = JSON.parse(data)
		console.log(dataS);
		switch(dataS.metadata.message_type){
			case("session_welcome"): 
				sendRequests(dataS);
				break;
			case("notification"):
				switch(dataS.payload.subscription.type){
					case("channel.follow"):
						//sends notification for new follows
						sendFollowerEmbed(dataS);
						break;
					case("stream.online"):
						//send notification when stream is on
						getStreams();
						break;
					case("stream.offline"):
						//change bot status after stream ends
						offlineStatus();
						break;
					case("channel.subscribe"):
						//sends notification for new subscribers
						sendSubsEmbed(dataS);
						break;
					case("channel.subscription.gift"):
						//sends notification for sub gifts
						sendSubsEmbed(dataS);
						break;
					case("channel.subscription.message"):
						//sends notification for resub messages
						sendSubsEmbed(dataS);
						break;
					case("channel.cheer"):
						//sends notification for bits
						sendBitsEmbed(dataS);
						break;
					case("channel.raid"):
						//sends notification when channel is raided
						sendRaidEmbed(dataS);
						break;
				}	
				break;
			case("reconnect"):
				last_session = dataS.payload.session.reconnect_url;
				ws = new Websocket(last_session);
				break;
		};
	});
};

//special function that makes all types of subscriptions at start of bot(if ever turns off)

async function sendRequests(dataS){
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
		console.log(m.transport.session_id + " " + m.type + " " + i);
		let data2 = JSON.stringify(m);
		fs.writeFileSync(name, data2);
		await sendRequest();
	}
}

//send requests with axios

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

//create Discord client

const clientDC = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

//stream Discord notification and stream status

async function getStream(){
	var channel = clientDC.channels.cache.get(discordChannel);
	let stream = await botTW.getStreams({channels: ['infinitivoidneo']});
	//make new embed
	const streamEmbed = new EmbedBuilder()
		.setColor(0xFFE100)
		.setTitle(stream.data[0].user_name + ' is streaming!')
		.setAuthor({ name: 'Edgerunner', iconURL: 'https://cdn.discordapp.com/attachments/1035616109472264303/1040208045852086302/60ae00b1fa79f18fd7bb6ae493952c91.jpg'})
		.setDescription('So how about you hop on and chat, ey?')
		.addFields({ name: 'Game streamed', value: stream.data[0].game_name}, { name: 'Stream title', value: stream.data[0].title})
		.setImage('https://cdn.discordapp.com/attachments/1035616109472264303/1038120155231834212/2022-09-16_1500_3.png')
		.setFooter({ text: 'Amogus, the more you know'});
	//creates action row with button(will use for verification and self-roles later)
	const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setLabel('Watch the stream')
				.setURL('https://twitch.tv/infinitivoidneo')
				.setStyle(ButtonStyle.Link),
		);
	//sends embed
	channel.send({
		content: '@everyone',
		embeds: [streamEmbed],
		components: [row]
	});
	//sets status
	clientDC.user.setActivity("for InfinitiVoidNeo", {type: ActivityType.Streaming, url: "https://twitch.tv/infinitivoidneo"});
}

//send follow notification

async function sendFollowerEmbed(dataS){
	var channel = clientDC.channels.cache.get(followDiscordChannel);
	var channelVargas = clientDC.channels.cache.get(vargasDiscordChannel);
	const followEmbed = new EmbedBuilder()
		.setColor(0x1ca641)
		.setTitle('New Follower!')
		.setDescription(dataS.payload.event.user_name + ' just followed ' + dataS.payload.event.broadcaster_user_name + ' :tada:')
		.setTimestamp()
		.setFooter({text: 'Provided by EdgerunnerBOT'});
	if(dataS.payload.event.broadcaster_user_name === "infinitivoidneo"){
		channel.send({ embeds: [followEmbed] });
	} else if(dataS.payload.event.broadcaster_user_name === "vargas_ognisty"){
		channelVargas.send({ embeds: [followEmbed] });
	}
}

//send subs notification

async function sendSubsEmbed(dataS){
	var channel = clientDC.channels.cache.get(followDiscordChannel);
	switch(dataS.metadata.type){
		case("channel.subscribe"):
			const subEmbed = new EmbedBuilder()
				.setColor(0x1ca641)
				.setTitle('New Subscriber!')
				.setDescription(dataS.payload.event.user_name + ' just subscribed ' + dataS.payload.event.broadcaster_user_name + ' :tada:')
				.setTimestamp()
				.setFooter({text: 'Provided by EdgerunnerBOT'});
			channel.send({ embeds: [subEmbed] });
			break;
		case("channel.subscription.gift"):
			const subGiftEmbed = new EmbedBuilder()
				.setColor(0x1ca641)
				.setTitle('New Subscriber!')
				.setDescription(dataS.payload.event.user_name + ' just subscribed ' + dataS.payload.event.broadcaster_user_name + ' :tada:')
				.setTimestamp()
				.setFooter({text: 'Provided by EdgerunnerBOT'});
			channel.send({ embeds: [subGiftEmbed] });
			break;
		case("channel.subscription.message"):
			const resubEmbed = new EmbedBuilder()
				.setColor(0x1ca641)
				.setTitle('New Subscriber!')
				.setDescription(dataS.payload.event.user_name + ' just resubscribed ' + dataS.payload.event.broadcaster_user_name + ' :tada:')
				.addFields({ name: 'Resub message', value: dataS.payload.event.message.text})
				.setTimestamp()
				.setFooter({text: 'Provided by EdgerunnerBOT'});
				channel.send({ embeds: [resubEmbed] });
			break;
	}
	
}

//send bits notification

async function sendBitsEmbed(dataS){
	var channel = clientDC.channels.cache.get(followDiscordChannel);
	const bitsEmbed = new EmbedBuilder()
		.setColor(0x1ca641)
		.setTitle('New Follower!')
		.setDescription(dataS.payload.event.user_name + ' just cheered ' + dataS.payload.event.broadcaster_user_name + ' :tada:')
		.addFields({name: "Bits amount", value: dataS.payload.event.bits})
		.setTimestamp()
		.setFooter({text: 'Provided by EdgerunnerBOT'});
	channel.send({ embeds: [bitsEmbed] });
}

//send raid notification

async function sendRaidEmbed(dataS){
	var channel = clientDC.channels.cache.get(followDiscordChannel);
	const raidEmbed = new EmbedBuilder()
		.setColor(0x1ca641)
		.setTitle('New Follower!')
		.setDescription(dataS.payload.event.user_name + ' just cheered ' + dataS.payload.event.broadcaster_user_name + ' :tada:')
		.addFields({name: "Raid viewers amount", value: dataS.payload.event.viewers})
		.setTimestamp()
		.setFooter({text: 'Provided by EdgerunnerBOT'});
	channel.send({ embeds: [raidEmbed] });
}

//Discord bot status if not streaming

async function offlineStatus(){
	clientDC.user.setActivity("over morons", {type: ActivityType.Watching});
}

//setting base Discord bot status

clientDC.on('ready', () =>  {
	clientDC.user.setStatus('dnd');
	clientDC.user.setActivity("over morons", {type: ActivityType.Watching});
	startWebsocket();
});

//create Twitch chat bot and connect to chats

const clientTW = new tmi.Client({
	connection:{
		secure: true,
		reconnect: true
	},
	identity: {
		username: 'EdgerunnerBOT',
		password: process.env.TWITCH_BOT_OAUTH
	},
	channels: ['InfinitiVoidNeo','Vargas_ognisty']
});
const botTW = new TwitchAPI({
	client_id: process.env.TWITCH_BOT_CLIENT_ID,
	client_secret: process.env.TWITCH_BOT_CLIENT_SECRET
});

clientTW.connect();

//when messages are sent in any of these channels

clientTW.on('message', (channel, tags, message, self) => {
	if(self) return;
	//if message is command "!discord"
	if(message.toLowerCase() === '!discord'){
		if(channel.includes('infinitivoidneo')){
			clientTW.say(channel, 'Join our Discord server!' + process.env.DCLINK);
		} else {
			clientTW.say(channel, 'Dolacz na server discorda!' + process.env.DCLINK);
		}
	}
	//more commands will be added
});

//Log Discord bot in

clientDC.login(process.env.DC_BOT_TOKEN);

