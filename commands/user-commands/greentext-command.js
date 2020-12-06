const randomPuppy = require('random-puppy');

const { MEME_CHANNEL_ID } = require('../../config/channelIds.json');
const incorrectChannel = require('../../utilities/scripts/incorrect-channel');

module.exports = async (message) => {
    if (message.channel.id == MEME_CHANNEL_ID) sendRandomGreentext(message);
    else incorrectChannel(message, MEME_CHANNEL_ID);
};

async function sendRandomGreentext(message) {
    const listOfSubreddits = ['wholesomegreentext', 'greentext'];
    const randomSubreddit = listOfSubreddits[Math.floor(Math.random() * listOfSubreddits.length)];
    const embedMessage = await createEmbedMessage(randomSubreddit);
    message.channel.send(embedMessage);
}

async function createEmbedMessage(randomSubreddit) {
    const image = await randomPuppy(randomSubreddit);
    return {
        embed: {
            color: 11992885,
            image: {
                url: image,
            },
        },
    };
}
