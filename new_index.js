require('dotenv').config();

const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const twitchWebsocket = require('./modules/twitchWebsocket');
const discordMessage = require('./modules/resolveDcMessages');
const discordJoin = require('./modules/createWelcomeImage');
const tmi = require('tmi.js');
const TwitchAPI = require('node-twitch').default;

const clientDC = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

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

clientDC.on('messageCreate', (msg) => {

})

clientDC.on('guildMemberAdd', async _user =>{
	welcomeImage(clientDC, _user);
})

clientTW.connect();

clientDC.on('ready', () => {
    clientDC.user.setStatus('dnd');
	clientDC.user.setActivity("over morons", {type: ActivityType.Watching});
    twitchWebsocket(clientDC, clientTW, botTW);
})

clientDC.login(process.env.DC_BOT_TOKEN);