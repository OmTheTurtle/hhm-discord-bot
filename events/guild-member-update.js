const getTargetedChannelOnThisGuild = require('../utilities/scripts/get-targeted-channel');
const { HHM_ELIT_KLUB_GUILD_ID } = require('../config/guildId.json');
const { LOG_OUTPUT_CHANNEL_ID } = require('../config/channelIds.json');

module.exports = async (oldMember, newMember, client) => {
    const channel = await getTargetedChannelOnThisGuild(client, LOG_OUTPUT_CHANNEL_ID, HHM_ELIT_KLUB_GUILD_ID);
    if (oldMember.displayName != newMember.displayName)
        channel.send(
            `${newMember} megváltoztatta a nevét ${oldMember.displayName} -ról/-ről ${newMember.displayName} -ra/-re`
        );
};
