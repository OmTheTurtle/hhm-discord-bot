const {
  setupCanvasContext,
  formatText,
  createAndSendImage,
} = require("../../utilities/scripts/loli-commons")

module.exports = async (message) => {
  if (message.arguments == null)
    return message.channel.send(
      `${message.author.toString()} elbasztad. Mit kéne kiírnom?`
    )
  const canvas = setupCanvasContext()
  const text = formatText(message)
  await createAndSendImage(message, text, canvas)
}
