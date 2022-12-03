require('dotenv').config();

module.exports = (msg, word, clientDC) => {
    var channel = clientDC.channels.cache.get(process.env.WARN_CHANNEL);
	const _member = msg.author.id;
	if(_member){
		const memberTarget = msg.guild.members.cache.get(_member.id);
		const warnEmbed = new EmbedBuilder()
			.setColor(0x1ca641)
			.setTitle(msg.author.username + ' zostal upomniony')
			.setDescription("Uzycie niedozwolonego slowa: **" + word +"**");
		channel.send({embeds: [warnEmbed]});
	}
}