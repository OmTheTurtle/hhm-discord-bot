module.exports = (message) => {
    const { LOGIN_CHANNEL_ID } = require('../../config/channelIds.json');
    const giveRoleToUser = require('../../handlers/role-select-handler');
    if (message.channel.id != LOGIN_CHANNEL_ID)
        return message.channel.send(`Ezt a parancsot csak az <#${LOGIN_CHANNEL_ID}> csatornán használhatod.`);
    const roles = defineRoles();
    giveRoleToUser(message, roles);
    message.channel.send(`${message.author}, sikeresen csatlakoztál a Liberált sorosbérenc csoporthoz.`);
};

function defineRoles() {
    const { CENTRALIST_ROLE_ID, GARDISTA_ROLE_ID, LIBERALT_ROLE_ID } = require('../../config/roleIds.json');
    return {
        selected: [LIBERALT_ROLE_ID],
        removeable: [CENTRALIST_ROLE_ID, GARDISTA_ROLE_ID],
    };
}
