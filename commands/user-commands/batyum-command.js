const User = require('../../database/models/user');
const { DEVELOPER_GUNTHER_USER_ID } = require('../../config/userIds.json');

module.exports = async (message) => {
    const user = await User.findOne({ where: { discordId: message.author.id } });

    if(!user)
        return message.channel.send(`${message.author.toString()} te nem létezel az adatbázisban, vagy <@${DEVELOPER_GUNTHER_USER_ID}> megint elbaszott valamit.`);
    
    const allCoins = await User.sum('coin');
    message.channel.send(`A batyudban ${user.coin} tallér van, ami a szerver vagyonának ${(user.coin/allCoins*100).toFixed(2)}%-a.`);
};