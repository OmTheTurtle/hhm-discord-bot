module.exports = (message, correctChannel) => {
    message.channel.send(`A \`${message.command}\` parancsot csak a <#${correctChannel}> csatornán használhatod.`);
};
