const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = (channel) => {
    const inviteEmbed = new EmbedBuilder()
		.setColor(0x1ca641)
		.setTitle('Link do Discorda')
		.setDescription("Kliknij/skopiuj link ponizej lub nacisnij przycisk \n\n https://discord.gg/uP5TkSwxxF")
		.setImage("https://cdn.discordapp.com/attachments/1035616109472264303/1046363826599231498/inviteImage.jpg");
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('AFTERLIFE')
					.setURL("https://discord.gg/uP5TkSwxxF")
					.setStyle(ButtonStyle.Link)
		);
	channel.send({
		embeds: [inviteEmbed],
		components: [row]
	});
}