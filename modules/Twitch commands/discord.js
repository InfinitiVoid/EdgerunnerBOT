require('dotenv').config();

module.exports = (channel, clientTW) => {
    clientTW.say(channel, 'Dolacz na server discorda!' + process.env.DCLINK);
}