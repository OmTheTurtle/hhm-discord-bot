module.exports = async (message) => {
  const orCount = message.arguments.filter((it) => it === "vagy").length

  if (orCount > 1) {
    return message.channel.send("Anyáddal szórakozz")
  } else if (
    orCount === 0 ||
    message.arguments[0] === "vagy" ||
    message.arguments[message.arguments.length - 1] === "vagy"
  ) {
    return message.channel.send("Bruh")
  }

  const random = Math.round(Math.random())
  const splitMessage = message.rawMessage.split("vagy")

  message.channel.send(
    `${message.author.toString()}\n${splitMessage[
      random
    ].trim()} a helyes döntés`
  )
}
