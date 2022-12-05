require('dotenv').config();
const { AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage, registerFont } = require('canvas');

registerFont('./fonts/Kanit-Regular.ttf', {family: 'Kanit'});
registerFont('./fonts/Cyberjunkies Italic.ttf', {family: 'Cyberjunkies'});

module.exports = (clientDC, $user) => {
    var channel = clientDC.channels.cache.get(process.env.WELCOME_CHANNEL);
	let avatarUrl = $user.displayAvatarURL().slice(0,-4) + 'png';
    async function welcomeImage(avatarUrl, channel, _user){
        const user = await clientDC.users.fetch(_user);
        let avatar = await loadImage(avatarUrl);
        
        let bg= await loadImage("https://cdn.discordapp.com/attachments/1035616109472264303/1046376584430497843/welcomeBg.png");
        
        const canvas = createCanvas(800,300);
        const ctx = canvas.getContext('2d');
        
        ctx.fill();
        ctx.drawImage(bg,0,0, 800,300);
        
        const circle = {
            x: canvas.width/4,
            y: canvas.height/2,
            radius: 70,
        }
        
        var msg = 'Witaj ' + user.username;
        
        ctx.font = 'italic 40px Cyberjunkies'
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = 'start';
        ctx.strokeStyle = "#000000";
        ctx.fillText(msg, circle.x + circle.radius +25 , circle.y - circle.radius/4);
        ctx.strokeText(msg, circle.x + circle.radius +25 , circle.y - circle.radius/4);
        
        ctx.font = `24px Kanit`;
        ctx.fillStyle = '#FFFFFF';
        
        var msgs = '#'+user.discriminator;
        
        ctx.fillText(msgs, circle.x + circle.radius +25, circle.y + circle.radius/4);
        
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        const aspect = avatar.height / avatar.width;
        const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
        const hsy = circle.radius * Math.max(aspect, 1.0);
        ctx.drawImage(avatar,circle.x - hsx,circle.y - hsy,hsx * 2,hsy * 2);
        
        
        const imagg = new AttachmentBuilder(canvas.toBuffer(), {name: "welcome.png"});
        setTimeout(function(){
            channel.send({files: [imagg]});;
        },1000);
    }
    welcomeImage(avatarUrl, channel, $user);
}