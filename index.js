require('dotenv').config();

const { Client, GatewayIntentBits, ActivityType, Events } = require('discord.js');
const twitchWebsocket = require('./modules/twitchWebsocket');
const discordMessage = require('./modules/resolveDcMessages');
const discordJoin = require('./modules/createWelcomeImage');
const resolveTwitchMessages = require('./modules/twitchCommandHandler');
const resolveDiscordMessages = require('./modules/resolveDcMessages');
const resolveDiscordInteractions = require('./modules/discordInteractionHandler');
const wledStart = require('./modules/wledStart');
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
	resolveDiscordMessages(clientDC, msg);
})

clientDC.on('guildMemberAdd', async _user =>{
	discordJoin(clientDC, _user);
})

clientDC.on(Events.InteractionCreate, async(interaction) =>{
	resolveDiscordInteractions(interaction);
})

clientTW.connect();

clientTW.on('message', (channel, tags, message, self) => {
	resolveTwitchMessages(clientTW, channel, tags, message, self);
})

clientDC.on('ready', () => {
	var channel = clientDC.channels.cache.get('1062019836181499986');
    clientDC.user.setStatus('dnd');
	clientDC.user.setActivity("over morons", {type: ActivityType.Watching});
	channel.send("Bot został uruchomiony");
    twitchWebsocket(clientDC, clientTW, botTW);
})

//wledStart();

clientDC.login(process.env.DC_BOT_TOKEN);