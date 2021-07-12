const { CASINO_CHANNEL_ID } = require("../../config/channelIds.json")
const User = require("../../database/models/user")

const EMOTES = [
  "<:pepeKMS:523531379548618753>",
  "<:pepeHands:523531380219707412>",
  "<:pepeIDK:582712797209690162>",
  "<:pepeSmug:523531921439850516>",
  "<:pepeMLADY:523580076080758786>",
  "<:jew:527303032690704392>",
]

const LOSS = 45

module.exports = async (message) => {
  if (message.channel.id !== CASINO_CHANNEL_ID) {
    return incorrectChannel(message, CASINO_CHANNEL_ID)
  }

  const rnd1 = Math.floor(Math.random() * 6)
  const rnd2 = Math.floor(Math.random() * 6)
  const rnd3 = Math.floor(Math.random() * 6)

  const reward = rnd1 == rnd2 && rnd2 == rnd3 ? (rnd1 * rnd1 + 1) * 150 : -LOSS

  await updateUser(message.author.id, reward)

  const response = `${message.author.toString()} pörgetése:
${EMOTES[rnd1]}${EMOTES[rnd2]}${EMOTES[rnd3]}
${
  rnd1 == rnd2 && rnd2 == rnd3
    ? `Nyertél ${reward} HHMtallért!`
    : `Vesztettél ${LOSS} HHMtallért!`
}`

  message.channel.send(response)
}

async function updateUser(authorId, coinIncrease) {
  const user = await User.findOne({ where: { discordId: authorId } })
  await user.update({
    coin: user.coin + coinIncrease,
  })
}
