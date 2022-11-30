require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

module.export = (dataS, clientDC) => {
    var channel = clientDC.channels.cache.get(process.env.VOID_SUBS_DC_CHANNEL);
    switch(dataS.metadata.type){
        case("channel.subscribe"):
            const subEmbed = new EmbedBuilder()
                .setColor(0x1ca641)
                .setTitle('New Subscriber!')
                .setDescription(dataS.payload.event.user_name + ' just subscribed ' + dataS.payload.event.broadcaster_user_name + ' :tada:')
                .setTimestamp()
                .setFooter({text: 'Provided by EdgerunnerBOT'});
            channel.send({ embeds: [subEmbed] });
            break;
        case("channel.subscription.gift"):
            const subGiftEmbed = new EmbedBuilder()
                .setColor(0x1ca641)
                .setTitle('New Subscriber!')
                .setDescription(dataS.payload.event.user_name + ' just subscribed ' + dataS.payload.event.broadcaster_user_name + ' :tada:')
                .setTimestamp()
                .setFooter({text: 'Provided by EdgerunnerBOT'});
            channel.send({ embeds: [subGiftEmbed] });
            break;
        case("channel.subscription.message"):
            const resubEmbed = new EmbedBuilder()
                .setColor(0x1ca641)
                .setTitle('New Subscriber!')
                .setDescription(dataS.payload.event.user_name + ' just resubscribed ' + dataS.payload.event.broadcaster_user_name + ' :tada:')
                .addFields({ name: 'Resub message', value: dataS.payload.event.message.text})
                .setTimestamp()
                .setFooter({text: 'Provided by EdgerunnerBOT'});
                channel.send({ embeds: [resubEmbed] });
            break;
    }
}