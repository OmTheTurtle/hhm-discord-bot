const randomPuppy = require('random-puppy');

const { GEEK_CHANNEL_ID } = require('../../config/channelIds.json');
const incorrectChannel = require('../../utilities/scripts/incorrect-channel');

module.exports = async (message) => {
    if (message.channel.id == GEEK_CHANNEL_ID) sendRandomProgrammerMeme(message);
    else incorrectChannel(message, GEEK_CHANNEL_ID);
};

async function sendRandomProgrammerMeme(message) {
    const listOfSubreddits = ['programmerhumor', 'programmerhorror'];
    const randomSubreddit = listOfSubreddits[Math.floor(Math.random() * listOfSubreddits.length)];
    const embedMessage = await createEmbedMessage(randomSubreddit);
    message.channel.send(embedMessage);
}

async function createEmbedMessage(randomSubreddit) {
    const image = await randomPuppy(randomSubreddit);
    return {
        embed: {
            color: 65535,
            image: {
                url: image,
            },
        },
    };
}
