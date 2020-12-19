const User = require('../../database/models/user');
const { CASINO_CHANNEL_ID } = require('../../config/channelIds.json');
const incorrectChannel = require('../../utilities/scripts/incorrect-channel');

module.exports = async (message) => {
    if(message.channel.id == CASINO_CHANNEL_ID)
        return await rollTheDice(message);
    incorrectChannel(message, CASINO_CHANNEL_ID);
};

async function rollTheDice(message) {
    const rolledValue = Math.floor(Math.random()*6) - 2;
    const displayNumber = rolledValue + 3;
    const reward = Math.floor(rolledValue/2) * Math.abs((rolledValue < 0 ? rolledValue -1 : rolledValue)) * 20;
    await updateUser(message.author.id, reward);
    message.channel.send(`**Dobott szám:** \`${displayNumber}\`\n${message.author.toString()}, ${generateResponse(rolledValue, reward)}`);
}

async function updateUser(authorId, coinIncrease) {
    const user = await User.findOne({ where: { discordId: authorId } });
    await user.update({
        coin: user.coin + coinIncrease
    });
}

function generateResponse(rolledValue, reward) {
    return rolledValue < 0 ?
    `sajnos vesztettél \`${Math.abs(reward)}\` HHMTallért.` :
    rolledValue < 2 ?
    `nem nyertél semmit.` :
    `gratulálok, nyertél \`${reward}\` HHMtallért!`;
}