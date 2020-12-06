const getTargetedChannelOnThisGuild = require('../utilities/scripts/get-targeted-channel');
const { HHM_ELIT_KLUB_GUILD_ID } = require('../config/guildId.json');
const { LOGIN_CHANNEL_ID } = require('../config/channelIds.json');

module.exports = async (member, client) => {
    const channel = await getTargetedChannelOnThisGuild(client, LOGIN_CHANNEL_ID, HHM_ELIT_KLUB_GUILD_ID);
    channel.send(createEmbedMessage(member));
};

function createEmbedMessage(member) {
    return {
        embed: {
            title: `${member.displayName}, üdvözlünk a HHM hivatalos discord szerveren, kérlek válassz csapatot:`,
            description:
                '**!soros ha liberált**\n' +
                'vagy\n' +
                '**!garda ha alt right**\n' +
                'vagy\n' +
                '**!central ha centralista**',
            color: 12123904,
        },
    };
}
