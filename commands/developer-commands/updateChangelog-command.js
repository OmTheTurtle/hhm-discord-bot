const { PUBLIC_LOG_CHANNEL_ID } = require("../../config/channelIds.json")
const { version, lastUpdate } = require("../../config/changelog.json")

module.exports = (message) => {
  const channel = message.channel.guild.channels.cache.get(
    PUBLIC_LOG_CHANNEL_ID
  )
  channel.send(`${version}: ${lastUpdate}`)
}
