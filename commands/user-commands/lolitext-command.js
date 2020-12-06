const { createCanvas, loadImage } = require('canvas');
let Discord = require('discord.js');

const MAXIMUM_CHARACTERS_SLASH_LINE = 18;

module.exports = async (message) => {
    if (message.arguments == null)
        return message.channel.send(`${message.author.toString()} elbasztad. Mit kéne kiírnom?`);
    const canvas = setupCanvasContext();
    const text = formatText(message);
    await createAndSendImage(message, text, canvas);
};

function setupCanvasContext() {
    const canvas = createCanvas(1200, 460);
    const canvasContext = canvas.getContext('2d');
    canvasContext.font = '60px Arial';
    canvasContext.fillStyle = 'white';
    return {
        canvas,
        context: canvasContext,
    };
}

function formatText(message) {
    let text = setupCounters(message);
    for (let i = 0; i < message.arguments.length - 1; i++) text = formatOneLine(message, text, i);
    return text;
}

function setupCounters(message) {
    return {
        lineCount: 1,
        lineLength: message.arguments[0].length,
        maximumWordLength: message.arguments[0].length,
        string: message.arguments[0],
    };
}

function formatOneLine(message, text, index) {
    const isTwoArgumentsLongerThanMaximum =
        text.lineLength + message.arguments[index + 1].length + 2 > MAXIMUM_CHARACTERS_SLASH_LINE;
    const isMaximumWordLengthChanged = message.arguments[index + 1].length + 1 > text.maximumWordLength;
    if (isTwoArgumentsLongerThanMaximum) text = openNewLine(message, text, index);
    else text = appendToThisLine(message, text, index);
    if (isMaximumWordLengthChanged) text.maximumWordLength = message.arguments[index + 1].length;
    return text;
}

function openNewLine(message, text, index) {
    text.string += `\n${message.arguments[index + 1]}`;
    text.lineLength = message.arguments[index + 1].length;
    text.lineCount++;
    return text;
}

function appendToThisLine(message, text, index) {
    text.string += ` ${message.arguments[index + 1]}`;
    text.lineLength += message.arguments[index + 1].length;
    return text;
}

async function createAndSendImage(message, text, canvas) {
    const loliImage = await loadImage('images/loli.png');
    canvas.context.drawImage(loliImage, 10, 10, 490, 450);
    const messageIsNotTooLong = text.lineCount <= 6 && text.maximumWordLength < MAXIMUM_CHARACTERS_SLASH_LINE;
    if (messageIsNotTooLong) fillTextAndSendImage(message, text, canvas);
    else messageIsTooLong(message);
}

function fillTextAndSendImage(message, text, canvas) {
    canvas.context.fillText(text.string, 520, 230 - (text.lineCount - 1) * 30);
    sendMessage(message, canvas);
}

function sendMessage(message, canvas) {
    const attachment = new Discord.MessageAttachment(canvas.canvas.toBuffer(), 'loliCanvas.png');
    message.channel.send(attachment);
}

function messageIsTooLong(message) {
    message.channel.send(
        `${message.author.toString()}, túl sok baromságot írtál, a faszom se fogja megjeleníteni neked.`
    );
}
