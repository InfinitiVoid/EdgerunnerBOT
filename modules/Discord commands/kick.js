const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = (clientDC, msg, kickMsg) => {
    var channel = clientDC.channels.cache.get(kickChannel);
	const _member = msg.mentions.users.first();
	var _spl = kickMsg.split(" ")[0];
	const _kMsg = kickMsg.slice(_spl.length + 1);
	if(_kMsg.length = 0){
		_kMsg = "Przyczyna niepodana"
	}
	if(_member){
		const memberTarget = msg.guild.members.cache.get(_member.id);
		memberTarget.send(_kMsg);
		const kickEmbed = new EmbedBuilder()
			.setColor(0x1ca641)
			.setTitle(msg.author.username + ' zostal wyrzucony')
			.setDescription(_kMsg);
		channel.send({embeds: [kickEmbed]});
		setTimeout(function(){
			memberTarget.kick();
		},1000);
	}
}