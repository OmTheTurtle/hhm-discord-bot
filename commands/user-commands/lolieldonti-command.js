const {
  setupCanvasContext,
  formatText,
  createAndSendImage,
} = require("../../utilities/scripts/loli-commons")

module.exports = async function (message) {
  if (message.arguments == null)
    return message.channel.send(
      `${message.author.toString()} elbasztad. Mit kéne kiírnom?`
    )
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
  const selectedOption = splitMessage[random].trim()

  const canvas = setupCanvasContext()
  message.arguments = selectedOption.split(" ")
  const text = formatText(message)
  await createAndSendImage(message, text, canvas)
}
