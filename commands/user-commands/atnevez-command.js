const User = require("../../database/models/user")
const IDs = require("../../config/userIds.json");

const price = 400

module.exports = async (message) => {
  const user = await User.findOne({ where: { discordId: message.author.id } })

  if (!message.author.toString() !== IDs.DEVELOPER_GUNTHER_USER_ID && user.coin < price) {
    return message.channel.send(
      `${message.author.toString()}, túl csóró vagy az átnevezéshez (${price} tallér)`
    )
  }

  const userToRename = message.mentions.members.first()

  if (userToRename.toString() === IDs.GYURI_USER_ID && message.author.toString() !== IDs.DEVELOPER_GUNTHER_USER_ID) {
    return await message.channel.send(
      `${message.author.toString()}, ezt neked nem szabad`
    )
  }

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
