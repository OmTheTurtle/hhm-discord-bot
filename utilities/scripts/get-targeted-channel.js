module.exports = async (client, channelId, guildId) => {
    const guild = await getTargetedGuild(client, guildId);
    const channel = guild.channels.cache.get(channelId);
    return channel;
};

async function getTargetedGuild(client, guildId) {
    const guild = await client.guilds.cache.get(guildId);
    return guild;
}
