const { createCanvas, loadImage } = require('canvas');
const Discord = require('discord.js');

module.exports = async (message) => {
    if (!message.mentions.users.first())
        return message.channel.send(`${message.author.toString()}, téged senki sem szeret.`);

    const canvas = createCanvas(800, 800);
    const canvasContext = canvas.getContext('2d');
    await fillCanvas(canvasContext, message);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'tinder.png');
    message.channel.send(attachment);
};

async function fillCanvas(canvasContext, message) {
    const tinderBackground = await loadImage('images/tinder.jpg');
    canvasContext.drawImage(tinderBackground, 0, 0, 800, 800);

    canvasContext.save();
    canvasContext.beginPath();
    canvasContext.arc(223, 511, 155, 0, Math.PI * 2, true);
    canvasContext.closePath();
    canvasContext.clip();
    await drawMessageAuthor(canvasContext, message);

    canvasContext.stroke();
    canvasContext.restore();

    canvasContext.beginPath();
    canvasContext.arc(590, 511, 155, 0, Math.PI * 2, true);
    canvasContext.closePath();
    canvasContext.clip();
    await drawTargetedUser(canvasContext, message);
}

async function drawMessageAuthor(canvasContext, message) {
    const messageAuthorAvatar = await loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
    canvasContext.drawImage(messageAuthorAvatar, 68, 356, 310, 310);
}

async function drawTargetedUser(canvasContext, message) {
    const targetedUserAvatar = await loadImage(message.mentions.users.first().displayAvatarURL({ format: 'jpg' }));
    canvasContext.drawImage(targetedUserAvatar, 435, 356, 310, 310);
}
