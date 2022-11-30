require('dotenv').config();
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = (clientDC, botTW) => {
    async function getStream(){
        var channel = clientDC.channels.cache.get(process.env.VOID_STREAM_DC_CHANNEL);
        let stream = await botTW.getStreams({channels: ['infinitivoidneo']});
        //make new embed
        const streamEmbed = new EmbedBuilder()
            .setColor(0xFFE100)
            .setTitle(stream.data[0].user_name + ' is streaming!')
            .setAuthor({ name: 'Edgerunner', iconURL: 'https://cdn.discordapp.com/attachments/1035616109472264303/1040208045852086302/60ae00b1fa79f18fd7bb6ae493952c91.jpg'})
            .setDescription('So how about you hop on and chat, ey?')
            .addFields({ name: 'Game streamed', value: stream.data[0].game_name}, { name: 'Stream title', value: stream.data[0].title})
            .setImage('https://cdn.discordapp.com/attachments/1035616109472264303/1038120155231834212/2022-09-16_1500_3.png')
            .setFooter({ text: 'Amogus, the more you know'});
        //creates action row with button(will use for verification and self-roles later)
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Watch the stream')
                    .setURL('https://twitch.tv/infinitivoidneo')
                    .setStyle(ButtonStyle.Link),
            );
        //sends embed
        channel.send({
            content: '@everyone',
            embeds: [streamEmbed],
            components: [row]
        });
        //sets status
        clientDC.user.setActivity("for InfinitiVoidNeo", {type: ActivityType.Streaming, url: "https://twitch.tv/infinitivoidneo"});
    }
    getStream();
}