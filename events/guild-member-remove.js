const getTargetedChannelOnThisGuild = require('../utilities/scripts/get-targeted-channel');
const { HHM_ELIT_KLUB_GUILD_ID } = require('../config/guildId.json');
const { LOG_OUTPUT_CHANNEL_ID } = require('../config/channelIds.json');

module.exports = async (member, client) => {
    const channel = await getTargetedChannelOnThisGuild(client, LOG_OUTPUT_CHANNEL_ID, HHM_ELIT_KLUB_GUILD_ID);
    channel.send(`${member} lelépett, mert egy normie.`);
};
