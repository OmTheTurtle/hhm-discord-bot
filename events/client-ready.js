const { PRESENCE } = require('../config/client-user.json');
const { DEFAULT_TEXT_CHANNEL_ID } = require('../config/channelIds.json');
const { HHM_ELIT_KLUB_GUILD_ID } = require('../config/guildId.json');
const CronJob = require('cron').CronJob;
const getTargetedChannel = require('../utilities/scripts/get-targeted-channel');
const getRedditImage = require('../utilities/scripts/get-random-reddit-image');


module.exports = async (client) => {
    setClientActivityAndStatus(client);
    await createCronJob(client);
};

function setClientActivityAndStatus(client) {
    client.user.setPresence(PRESENCE);
}

async function findRandomImage() {
    try {
        return await getRedditImage("ItIsWednesday");
    } catch(error) {
        return await findRandomImage();
    }
}

async function createCronJob(client) {
    const channel = await getTargetedChannel(client, DEFAULT_TEXT_CHANNEL_ID, HHM_ELIT_KLUB_GUILD_ID);
    new CronJob(
        '0 0 * * *',
        () => {
            setTimeout(async () => {
                const now = new Date();

                try {
                    if (now.getDay() === 3) {
                        await message.channel.send({files: [await findRandomImage()]});
                        return
                    }
                } catch (err) {
                    console.log(err)
                }

                channel.send('Új :sunny:, új :bread:.');

            }, 5000);
        },
        null,
        false,
        'Europe/Budapest'
    ).start();
}
