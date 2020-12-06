const { DEFAULT_PREFIX, DEVELOPER_PREFIX } = require('../config/prefixes.json');
const { DEVELOPER_GUNTHER_USER_ID } = require('../config/userIds.json');

module.exports = (userMessage) => {
    if (userMessage.content.startsWith(DEFAULT_PREFIX))
        tryToExecuteCommand(userMessage, DEFAULT_PREFIX, 'user-commands');
    else if (userMessage.content.startsWith(DEVELOPER_PREFIX))
        tryToExecuteCommand(userMessage, DEVELOPER_PREFIX, 'developer-commands');
};

function formatUserMessage(userMessage, prefix) {
    let messageArguments = userMessage.content.slice(prefix.length).trim().split(' ');
    let command = messageArguments.shift();
    return {
        arguments: messageArguments,
        command,
        channel: userMessage.channel,
        author: userMessage.author,
        member: userMessage.member,
        mentions: userMessage.mentions,
    };
}

function tryToExecuteCommand(userMessage, prefix, lastFolderInPath) {
    const message = formatUserMessage(userMessage, prefix);
    try {
        executeCommand(message, lastFolderInPath);
    } catch (error) {
        handleCommandError(message, error);
    }
}

function executeCommand(message, lastFolderInPath) {
    const command = require(`../commands/${lastFolderInPath}/${message.command}-command`);
    command(message);
}

function handleCommandError(message, error) {
    if (message.member != DEVELOPER_GUNTHER_USER_ID)
        message.channel.send(
            `<@${DEVELOPER_GUNTHER_USER_ID}> éppen "újraírás" címszóval szétbassza mindenem, így most csak néhány működik. \`!help\` a működő parancsok lekérdezéséhez.`
        );
    else message.channel.send(`Elbasztad te faszkalap:\n\`\`\`${error}\`\`\``);
}
