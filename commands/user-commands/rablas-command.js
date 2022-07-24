const User = require("../../database/models/user")

module.exports = async (message) => {
  const user = await User.findOne({ where: { discordId: message.author.id } })

  if (!user) {
    return message.channel.send(
      `${message.author.toString()}, te nem létezel a nyilvántartásban.`
    )
  }

  if (user.coin < 1000) {
    return message.channel.send(
      `${message.author.toString()}, nincs elég Tallérod a tolvaj élethez te csóró geci. (legalább 1000 tallér kell, hogy menekülhess, ha szar van a palacsintában)`
    )
  }

  if (
    message.mentions.members.array().length != 1 ||
    message.mentions.members.first().id === user.discordId
  ) {
    return await message.channel.send(
      `${message.author.toString()}, te még zsebtolvajnak is hülye vagy.`
    )
  }

  const victim = await User.findOne({
    where: { discordId: message.mentions.members.first().id },
  })

  if (!victim) {
    return await message.channel.send(
      `${message.author.toString()}, te egy nem létező személyt próbálsz kirabolni.`
    )
  }

  if (victim.coin <= 500) {
    return await message.channel.send(
      `${message.mentions.users
        .first()
        .toString()} túl csóró, nem ér annyit, hogy megpróbáld.`
    )
  }

  const random = Math.floor(Math.random() * 5)

  if (random !== 0) {
    const value = Math.floor(Math.random() * 500) + 1
    await user.update({
      coin: user.coin + value,
    })
    await victim.update({
      coin: victim.coin - value,
    })
    return message.channel.send(
      `${message.author.toString()}, sikeres rablás. A zsákmányod ${value} tallér.`
    )
  } else {
    await user.update({
      coin: user.coin - 1000,
    })
    await victim.update({
      coin: victim.coin + 1000,
    })
    return message.channel.send(
      `${message.author.toString()}, sikertelen rablás. Megkened az áldozatot 1000 tallérral, hogy ne jelentsen fel.`
    )
  }
}
