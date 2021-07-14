const { Op } = require("sequelize")
const User = require("../../database/models/user")
const { DEVELOPER_GUNTHER_USER_ID } = require("../../config/userIds.json")

module.exports = async (message) => {
  const users = await User.findAll({
    order: [["coin", "DESC"]],
    limit: 10,
  })

  if (!users)
    return message.channel.send(
      `<@${DEVELOPER_GUNTHER_USER_ID}> megint elbaszott valamit, így ezt most nem tudod lekérdezni.`
    )

  const allCoins = await User.sum("coin", { where: { coin: { [Op.gt]: 0 } } })
  const user = await User.findOne({ where: { discordId: message.author.id } })
  if (user.oldView) {
    message.channel.send(createOldMessage(users, allCoins))
  } else {
    message.channel.send(createEmbedMessage(users, allCoins))
  }
}

function createEmbedMessage(users, allCoins) {
  return {
    embed: {
      title: "Top 10 leggazdagabb felhasználó:",
      color: 16756224,
      fields: generateEmbedFields(users, allCoins),
    },
  }
}

function generateEmbedFields(users, allCoins) {
  return users.map((user, index) => ({
    name: `${index + 1}. ${user.username}\tTallérok: ${user.coin}`,
    value: `Szerver vagyonának ${((user.coin / allCoins) * 100).toFixed(2)}%-a`,
  }))
}

function createOldMessage(users, allCoins) {
  return `
**Top 10 leggazdagabb felhasználó**:\n
${generateOldFields(users, allCoins).join("\n")}
  `
}

function generateOldFields(users, allCoins) {
  return users.map(
    (user, index) =>
      `${index + 1}. **${user.username}**\t Tallérok: ${user.coin}\t Arány: ${(
        (user.coin / allCoins) *
        100
      ).toFixed(2)}%`
  )
}
