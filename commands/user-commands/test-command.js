module.exports = async (message) => {
    message.channel.send('```json\n' + JSON.stringify(message, null, "\t") + '```');
};
