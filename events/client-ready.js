const { PRESENCE } = require('../config/client-user.json');
const { DEFAULT_TEXT_CHANNEL_ID } = require('../config/channelIds.json');
const { HHM_ELIT_KLUB_GUILD_ID } = require('../config/guildId.json');
const CronJob = require('cron').CronJob;
const getTargetedChannel = require('../utilities/scripts/get-targeted-channel');

module.exports = async (client) => {
    setClientActivityAndStatus(client);
    await createCronJob(client);
    console.log(`${client.user.username} logged in!`); // ! REMOVE THIS SHIT BEFORE DEPLOY
};

function setClientActivityAndStatus(client) {
    client.user.setPresence(PRESENCE);
}

async function createCronJob(client) {
    const channel = await getTargetedChannel(client, DEFAULT_TEXT_CHANNEL_ID, HHM_ELIT_KLUB_GUILD_ID);
    new CronJob(
        '0 0 * * *',
        () => {
            setTimeout(() => {
                channel.send('Új :sunny:, új :bread:.');
            }, 5000);
        },
        null,
        false,
        'Europe/Budapest'
    ).start();
}
