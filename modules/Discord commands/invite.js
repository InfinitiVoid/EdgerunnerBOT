module.exports = (channel) => {
    const inviteEmbed = new EmbedBuilder()
		.setColor(0x1ca641)
		.setTitle('Link do Discorda')
		.setDescription("Kliknij/skopiuj link ponizej lub nacisnij przycisk \n\n https://discord.gg/uP5TkSwxxF")
		.setImage("https://cdn.discordapp.com/attachments/1035616109472264303/1045992061117149264/60ae00b1fa79f18fd7bb6ae493952c91.jpg");
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