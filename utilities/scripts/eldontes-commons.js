module.exports = function (message) {
  if (message.arguments == null) {
    message.channel.send(
      `${message.author.toString()} elbasztad. Mit kéne kiírnom?`
    )
    return false
  }
  const orCount = message.arguments.filter(
    (it) => it.toLowerCase() === "vagy"
  ).length

  if (orCount > 1) {
    message.channel.send("Anyáddal szórakozz")
    return false
  } else if (
    orCount === 0 ||
    message.arguments[0].toLowerCase() === "vagy" ||
    message.arguments[message.arguments.length - 1].toLowerCase() === "vagy"
  ) {
    message.channel.send("Bruh")
    return false
  }

  const random = Math.round(Math.random())
  const splitMessage = message.rawMessage.split(new RegExp(" vagy ", "gi"))
  return splitMessage[random].trim()
}
