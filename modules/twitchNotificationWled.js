require('dotenv').config();

const { WLED, Preset } = require('wled');

const wledVoid = new WLED('192.168.0.102');

module.exports = (type) => {
    setTimeout(function () {
        wledVoid.setColor([255, 186, 3]);
        wledVoid.setEffect(0);
        wledVoid.setEffectSpeed(170);
        wledVoid.setEffectIntensity(128);
    }, 6000);

    switch(type){
        case("channel.follow"):
            wledVoid.setColor([255, 186, 3], [252, 127, 3]);
            wledVoid.setEffect(1);
            break;
        case("stream.online"):
            wledVoid.setColor([255, 186, 3], [3, 248, 252]);
            wledVoid.setEffect(1);
            break;
        case("stream.offline"):
            wledVoid.setColor([255, 186, 3], [165, 3, 252]);
            wledVoid.setEffect(1);
            break;
        case("channel.subscribe"):
            wledVoid.setColor([255, 186, 3], [252, 53, 3]);
            wledVoid.setEffect(1);
            break;
        case("channel.subscription.gift"):
            wledVoid.setColor([255, 186, 3], [252, 53, 3]);
            wledVoid.setEffect(1);
            break;
        case("channel.subscription.message"):
            wledVoid.setColor([255, 186, 3], [252, 53, 3]);
            wledVoid.setEffect(1);
            break;
        case("channel.cheer"):
            wledVoid.setColor([255, 186, 3], [3, 248, 252]);
            wledVoid.setEffect(1);
            break;
        case("channel.raid"):
            wledVoid.setEffect(9);
            wledVoid.setEffectSpeed(255);
            wledVoid.setEffectIntensity(255);
            break;
    }
}