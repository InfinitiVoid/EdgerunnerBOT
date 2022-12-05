require('dotenv').config();

module.exports = (channel, clientTW) => {
    clientTW.say(channel, 'Dotacje możesz rzucić za pomocą linku' + process.env.TIP_LINK);
}