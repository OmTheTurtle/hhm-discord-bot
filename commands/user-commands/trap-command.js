const getRedditImage = require("../../utilities/scripts/get-random-reddit-image")

const { NSFW_CHANNEL_ID } = require("../../config/channelIds.json")
const incorrectChannel = require("../../utilities/scripts/incorrect-channel")

const SUBREDDITS = ["traps", "trapsarentgay", "traphentai", "DeliciousTraps"]
const ALLOWED_USERS = ["424138214081691659", "278562370681569280"]
const formatter = new Intl.ListFormat("hu")

module.exports = async (message) => {
  if (message.channel.id !== NSFW_CHANNEL_ID) {
    return incorrectChannel(message, NSFW_CHANNEL_ID)
  }

  if (!ALLOWED_USERS.includes(message.author.id)) {
    return message.channel.send(
      `Ezt a parancsot csak ${formatter.format(
        ALLOWED_USERS.map((u) => `<@${u}>`)
      )} használhatja.`
    )
  }

  await message.channel.send({ files: [await findRandomImage()] })
}

async function findRandomImage() {
  const subreddit = SUBREDDITS[Math.floor(Math.random() * SUBREDDITS.length)]
  try {
    return await getRedditImage(subreddit)
  } catch (error) {
    return await findRandomImage()
  }
}
