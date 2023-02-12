const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = (clientDC, msg, banMsg) => {
    var channel = clientDC.channels.cache.get(banChannel);
	const _member = msg.mentions.users.first();
	var _spl = banMsg.split(" ")[0];
	const _bMsg = banMsg.slice(_spl.length + 1);
	if(_bMsg.length = 0){
		_bMsg = "Przyczyna niepodana"
	}
	if(_member){
		const memberTarget = msg.guild.members.cache.get(_member.id);
		memberTarget.send(_bMsg);
		const banEmbed = new EmbedBuilder()
			.setColor(0x1ca641)
			.setTitle(msg.author.username + ' zostal zbanowany')
			.setDescription(_bMsg);
		channel.send({embeds: [banEmbed]});
		setTimeout(function(){
			memberTarget.ban();
		},1000);
	}
}