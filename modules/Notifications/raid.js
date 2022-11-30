require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

module.exports = (data, clientDC) => {
    async function sendRaidEmbed(dataS){
        var channel = clientDC.channels.cache.get(process.env.VOID_RAIDS_DC_CHANNEL);
        const raidEmbed = new EmbedBuilder()
            .setColor(0x1ca641)
            .setTitle('New Follower!')
            .setDescription(dataS.payload.event.user_name + ' just cheered ' + dataS.payload.event.broadcaster_user_name + ' :tada:')
            .addFields({name: "Raid viewers amount", value: dataS.payload.event.viewers})
            .setTimestamp()
            .setFooter({text: 'Provided by EdgerunnerBOT'});
        channel.send({ embeds: [raidEmbed] });
    }
    sendRaidEmbed(data);
}