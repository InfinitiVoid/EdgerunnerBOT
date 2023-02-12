require('dotenv').config();

const { WLED, Preser } = require('wled');

const wledVoid = new WLED('192.168.0.102');

module.exports = () => {
    wledVoid.setOn(true);
    wledVoid.setColor([0,255,0], [255,0,0]);
    wledVoid.setEffect(12);
    wledVoid.setEffectSpeed(200);
}