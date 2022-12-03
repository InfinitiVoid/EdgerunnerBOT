module.exports = (clientDC, msg, warnMsg) => {
    var channel = clientDC.channels.cache.get(warnChannel);
	const _member = msg.mentions.users.first();
	var _spl = warnMsg.split(" ")[0];
	const _wMsg = warnMsg.slice(_spl.length + 1);
	if(_member){
		const memberTarget = msg.guild.members.cache.get(_member.id);
		memberTarget.send(_wMsg);
		const warnEmbed = new EmbedBuilder()
			.setColor(0x1ca641)
			.setTitle(msg.author.username + ' zostal upomniony')
			.setDescription(_wMsg);
		channel.send({embeds: [warnEmbed]});
	}
}