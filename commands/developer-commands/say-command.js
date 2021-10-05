module.exports = (message) => {
  const [channelId, ...rest] = message.arguments
  const extractedChannelId = channelId.slice(2, channelId.length - 1)
  const channel = message.channel.guild.channels.cache.get(extractedChannelId)
  channel.send(rest.join(" "))
}
