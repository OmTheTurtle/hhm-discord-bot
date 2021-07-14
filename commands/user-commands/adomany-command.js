const User = require("../../database/models/user")

module.exports = async (message) => {
  if (
    message.arguments.length !== 2 ||
    message.mentions.members.array().length != 1
  ) {
    return message.channel.send(
      `${message.author.toString()}, neked még ezt a parancsot is sikerült elbasznod.`
    )
  }

  const amount = Math.abs(parseInt(message.arguments[1]))

  if (isNaN(amount)) {
    return message.channel.send(
      `${message.author.toString()}, neked még ezt a parancsot is sikerült elbasznod.`
    )
  }

  const user = await User.findOne({ where: { discordId: message.author.id } })

  if (!user || user.coin < amount) {
    return message.channel.send(
      `${message.author.toString()}, nincs elég Tallérod a tranzakcióhoz te csóró geci.`
    )
  }

  const personInNeed = await User.findOne({
    where: { discordId: message.mentions.members.first().id },
  })

  if (!personInNeed) {
    return await message.channel.send(
      `${message.author.toString()}, te egy nem létező személynek próbálsz adományozni.`
    )
  }

  await user.update({
    coin: user.coin - amount,
  })
  await personInNeed.update({
    coin: personInNeed.coin + amount,
  })

  message.channel.send(`**Sikeres tranzakció**
Átutalt összeg: ${amount} HHMtallér
Új egyenleged: ${user.coin} HHMtallér`)
}
