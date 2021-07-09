const {
  setupCanvasContext,
  formatText,
  createAndSendImage,
} = require("../../utilities/scripts/loli-commons")
const selectRandomOption = require("../../utilities/scripts/eldontes-commons")

module.exports = async function (message) {
  const selectedOption = selectRandomOption(message)
  if (!selectedOption) return

  const canvas = setupCanvasContext()
  message.arguments = selectedOption.split(" ")
  const text = formatText(message)
  await createAndSendImage(message, text, canvas)
}
