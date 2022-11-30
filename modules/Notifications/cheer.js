require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

module.exports = (data, clientDC) => {
    async function sendBitsEmbed(dataS){
        var channel = clientDC.channels.cache.get(process.env.VOID_BITS_DC_CHANNEL);
        const bitsEmbed = new EmbedBuilder()
            .setColor(0x1ca641)
            .setTitle('New Follower!')
            .setDescription(dataS.payload.event.user_name + ' just cheered ' + dataS.payload.event.broadcaster_user_name + ' :tada:')
            .addFields({name: "Bits amount", value: dataS.payload.event.bits})
            .setTimestamp()
            .setFooter({text: 'Provided by EdgerunnerBOT'});
        channel.send({ embeds: [bitsEmbed] });
    }
    sendBitsEmbed(data);
}