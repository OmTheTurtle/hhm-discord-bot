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

  const allMessages = await User.sum("messageCount")
  message.channel.send(createEmbedMessage(users, allMessages))
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
