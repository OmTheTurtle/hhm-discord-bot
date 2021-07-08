const User = require("../../database/models/user")
const { DEVELOPER_GUNTHER_USER_ID } = require("../../config/userIds.json")

module.exports = async (message) => {
  const users = await User.findAll({
    order: [["messageCount", "DESC"]],
    limit: 10,
  })

  if (!users)
    return message.channel.send(
      `<@${DEVELOPER_GUNTHER_USER_ID}> megint elbaszott valamit, így ezt most nem tudod lekérdezni.`
    )

  const user = await User.findOne({ where: { discordId: message.author.id } })
  const allMessages = await User.sum("messageCount")
  if (user.oldView) {
    message.channel.send(createOldMessage(users, allMessages))
  } else {
    message.channel.send(createEmbedMessage(users, allMessages))
  }
}

function createEmbedMessage(users, allMessages) {
  return {
    embed: {
      title: "Top 10 legaktívabb felhasználó:",
      color: 16756224,
      fields: generateEmbedFields(users, allMessages),
    },
  }
}

function generateEmbedFields(users, allMessages) {
  return users.map((user, index) => ({
    name: `${index + 1}. ${user.username}    Arány: ${(
      (user.messageCount / allMessages) *
      100
    ).toFixed(2)}%`,
    value: user.messageCount,
  }))
}

function createOldMessage(users, allMessages) {
  return `
**Top 10 legaktívabb felhasználó**\n:
${generateOldFields(users, allMessages).join("\n")}
`
}

function generateOldFields(users, allMessages) {
  return users.map(
    (user, index) =>
      `${index + 1}. **${user.username}** (${user.messageCount})    Arány: ${(
        (user.messageCount / allMessages) *
        100
      ).toFixed(2)}%`
  )
}
