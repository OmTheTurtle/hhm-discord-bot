module.exports = (message) => {
  const orCount = message.arguments.filter((it) => it === "vagy").length

  if (orCount > 1) {
    return message.channel.send("Anyáddal szórakozz")
  }

  const random = Math.round(Math.random())
  const splitMessage = message.rawMessage.split("vagy")

  return message.channel.send(
    `${message.author.toString()}\n${
      splitMessage.arguments[random]
    } a helyes döntés`
  )
}
