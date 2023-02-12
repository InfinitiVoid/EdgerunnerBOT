require('dotenv').config();

const { WLED, Preser } = require('wled');

const wledVoid = new WLED('192.168.0.102');

module.exports = () => {
    var i = setInterval(function(){
        try {
            wledVoid.setOn(true);
            wledVoid.setColor([255, 186, 3]);
            wledVoid.setEffect(0);
            wledVoid.setEffectSpeed(170);
            wledVoid.setEffectIntensity(128);
        } catch (error) {
            // do nothing
        }
        
    }, 300000);
}