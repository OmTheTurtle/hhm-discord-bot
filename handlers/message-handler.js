const { DEFAULT_PREFIX, DEVELOPER_PREFIX } = require("../config/prefixes.json")
const { DEVELOPER_GUNTHER_USER_ID } = require("../config/userIds.json")
const { DEVELOPER_CHANNEL_ID } = require("../config/channelIds.json")
const countMessages = require("../events/message")

module.exports = async (userMessage) => {
  if (!userMessage.author.bot) {
    if (userMessage.content.startsWith(DEFAULT_PREFIX))
      await tryToExecuteCommand(userMessage, DEFAULT_PREFIX, "user-commands")
    else if (userMessage.content.startsWith(DEVELOPER_PREFIX))
      await tryToExecuteCommand(
        userMessage,
        DEVELOPER_PREFIX,
        "developer-commands"
      )
    else await countMessages(userMessage)
  }
}

function formatUserMessage(userMessage, prefix) {
  let messageArguments = userMessage.content
    .slice(prefix.length)
    .trim()
    .split(" ")
  let command = messageArguments.shift()
  return {
    arguments: messageArguments,
    command,
    channel: userMessage.channel,
    author: userMessage.author,
    member: userMessage.member,
    mentions: userMessage.mentions,
    rawMessage: messageArguments.join(" "),
  }
}

async function tryToExecuteCommand(userMessage, prefix, lastFolderInPath) {
  const message = formatUserMessage(userMessage, prefix)
  try {
    await executeCommand(message, lastFolderInPath)
  } catch (error) {
    handleCommandError(message, error)
  }
}

async function executeCommand(message, lastFolderInPath) {
  const command = require(`../commands/${lastFolderInPath}/${message.command}-command`)
  await command(message)
}

function handleCommandError(message, error) {
  if (message.channel != DEVELOPER_CHANNEL_ID) {
    message.channel.send(
      `<@${DEVELOPER_GUNTHER_USER_ID}> éppen "újraírás" címszóval szétbassza mindenem, így most csak néhány parancsom működik. \`!help\` a működő parancsok lekérdezéséhez.`
    )
    console.error(error)
  }
  if (error.message.substring(0, 18) != "Cannot find module")
    logToDeveloperChannel(message, error)
}

function logToDeveloperChannel(message, error) {
  const developerChannel =
    message.channel.guild.channels.cache.get(DEVELOPER_CHANNEL_ID)
  developerChannel.send(`**An error occurred:**`)
  developerChannel.send(
    `Message info:\`\`\`json\n${JSON.stringify(message, null, "\t")}\`\`\``
  )
  developerChannel.send(`Error stack:\`\`\`${error.stack}\`\`\``)
}
