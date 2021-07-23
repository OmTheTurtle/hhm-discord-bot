const User = require("../../database/models/user")
const { CASINO_CHANNEL_ID } = require("../../config/channelIds.json")
const incorrectChannel = require("../../utilities/scripts/incorrect-channel")
const { GYURI_USER_ID } = require("../../config/userIds.json")

const options = [
  {
    emote: "<:raised_hand:864957802295197717>",
    defeates: 2,
  },
  {
    emote: "<:v:864957949524181023>",
    defeates: 0,
  },
  {
    emote: "<:punch:864959220143226911>",
    defeates: 1,
  },
]

const reward = 100

module.exports = async (message) => {
  if (message.channel.id !== CASINO_CHANNEL_ID) {
    return incorrectChannel(message, CASINO_CHANNEL_ID)
  }

  const user = await User.findOne({ where: { discordId: message.author.id } })

  const random1 = Math.floor(Math.random() * 3)
  const random2 = Math.floor(Math.random() * 3)

  if (random1 === random2) {
    return message.channel.send(`${message.author.toString()} ${
      options[random1].emote
    } - ${options[random2].emote} <@${GYURI_USER_ID}>
Döntetlen!`)
  }

  if (options[random1].defeates === random2) {
    await user.update({
      coin: user.coin + 100,
    })
    return message.channel.send(`${message.author.toString()} ${
      options[random1].emote
    } - ${options[random2].emote} <@${GYURI_USER_ID}>
Nyertél ${reward} HHMTallért.`)
  }

  await user.update({
    coin: user.coin - 100,
  })
  return message.channel.send(`${message.author.toString()} ${
    options[random1].emote
  } - ${options[random2].emote} <@${GYURI_USER_ID}>
Vesztettél ${reward} HHMTallért.`)
}
