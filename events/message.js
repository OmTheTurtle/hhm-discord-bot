const User = require("../database/models/user")

module.exports = async (userMessage) => {
  const user = await User.findOne({
    where: { discordId: userMessage.author.id },
  })

  if (!user) await createUser(userMessage)
  else
    await user.update({
      messageCount: user.messageCount + 1,
      coin: user.coin + 1,
    })
}

async function createUser(userMessage) {
  await User.create({
    discordId: userMessage.author.id,
    username: userMessage.author.username,
    messageCount: 1,
  })
}
