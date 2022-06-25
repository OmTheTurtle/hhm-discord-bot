const User = require("../../database/models/user")

const price = 400

module.exports = async (message) => {
  const user = await User.findOne({ where: { discordId: message.author.id } })
  if (user.coin < price) {
    return message.channel.send(
      `${message.author.toString()}, túl csóró vagy az átnevezéshez (${price} tallér)`
    )
  }

  const userToRename = message.mentions.members.first()

  if (message.mentions.members.array().length != 1) {
    return await message.channel.send(
      `${message.author.toString()}, ez nem sikerült`
    )
  }

  message.arguments.shift()
  const newName = message.arguments.join(" ")

  if (newName.length >= 32) {
    await message.channel.send(
      `${message.author.toString()}, ellentétben a faszoddal, ez a név túl hosszú, hogy beállítsam ${userToRename.toString()}-nak/nek.`
    )
  } else {
    userToRename.setNickname(newName)
    await user.update({
      coin: user.coin - price,
    })

    await message.channel.send(
      `${message.author.toString()}, sikeresen megváltoztattad ${userToRename.toString()} becenevét.`
    )
  }
}
