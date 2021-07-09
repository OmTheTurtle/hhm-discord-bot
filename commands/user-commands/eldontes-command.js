const selectRandomOption = require("../../utilities/scripts/eldontes-commons")

module.exports = async (message) => {
  const selectedOption = selectRandomOption(message)
  if (!selectedOption) return

  message.channel.send(
    `${message.author.toString()}\n${selectedOption} a helyes döntés`
  )
}
