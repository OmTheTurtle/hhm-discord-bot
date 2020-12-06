const randomPuppy = require('random-puppy');

const { CUTE_THING_CHANNEL_ID } = require('../../config/channelIds.json');
const incorrectChannel = require('../../utilities/scripts/incorrect-channel');

module.exports = async (message) => {
    if (message.channel.id == CUTE_THING_CHANNEL_ID) sendRandomCutePicture(message);
    else incorrectChannel(message, CUTE_THING_CHANNEL_ID);
};

async function sendRandomCutePicture(message) {
    const listOfSubreddits = ['awww', 'aww', 'IllegallySmolCats', 'IllegallySmolDogs', 'Blep', 'cute'];
    const randomSubreddit = listOfSubreddits[Math.floor(Math.random() * listOfSubreddits.length)];
    const embedMessage = await createEmbedMessage(randomSubreddit);
    message.channel.send(embedMessage);
}

async function createEmbedMessage(randomSubreddit) {
    const image = await randomPuppy(randomSubreddit);
    return {
        embed: {
            color: 16748614,
            image: {
                url: image,
            },
        },
    };
}
