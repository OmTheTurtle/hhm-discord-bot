const getRedditImage = require("../../utilities/scripts/get-random-reddit-image")
const { NSFW_CHANNEL_ID } = require("../../config/channelIds.json")
const incorrectChannel = require("../../utilities/scripts/incorrect-channel")

const subreddits = ["agriculture", "tractors"]

module.exports = async (message) => {
  if (message.channel.id == NSFW_CHANNEL_ID)
    return await message.channel.send({ files: [await findRandomImage()] })
  incorrectChannel(message, NSFW_CHANNEL_ID)
}

async function findRandomImage() {
  const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)]
  try {
    return await getRedditImage(subreddit)
  } catch (error) {
    return await findRandomImage()
  }
}
