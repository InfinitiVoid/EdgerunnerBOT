require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

module.exports = (data, clientDC) => {
    async function sendFollowerEmbed(dataS){
        var channel = clientDC.channels.cache.get(process.env.VOID_FOLLOW_DC_CHANNEL);
        var channelVargas = clientDC.channels.cache.get(process.env.VARGAS_FOLLOW_DC_CHANNEL);
        const followEmbed = new EmbedBuilder()
            .setColor(0x1ca641)
            .setTitle('New Follower!')
            .setDescription(dataS.payload.event.user_name + ' just followed ' + dataS.payload.event.broadcaster_user_name + ' :tada:')
            .setTimestamp()
            .setFooter({text: 'Provided by EdgerunnerBOT'});
        if(dataS.payload.event.broadcaster_user_name === "infinitivoidneo"){
            channel.send({ embeds: [followEmbed] });
        } else if(dataS.payload.event.broadcaster_user_name === "vargas_ognisty"){
            channelVargas.send({ embeds: [followEmbed] });
        }
    }
    sendFollowerEmbed(data);
}