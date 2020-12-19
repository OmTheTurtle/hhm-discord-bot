const User = require('../../database/models/user');
const { DEVELOPER_GUNTHER_USER_ID } = require('../../config/userIds.json');

module.exports = async (message) => {
    const users = await User.findAll({ 
        order: [['coin', 'DESC']],
        limit: 10
     });

    if(!users)
        return message.channel.send(`<@${DEVELOPER_GUNTHER_USER_ID}> megint elbaszott valamit, így ezt most nem tudod lekérdezni.`);
    
    const allCoins = await User.sum('coin');
    message.channel.send(createEmbedMessage(users, allCoins));
};

function createEmbedMessage(users, allCoins) {
    return {
        embed: {
            title: 'Top 10 leggazdagabb felhasználó:',
            color: 16756224,
            fields: generateEmbedFields(users, allCoins),
        },
    };
}

function generateEmbedFields(users, allCoins) {
    let fields = [];
    for(let i = 0; i < 10; i++) {
        fields.push({ 
            name:  `${i+1}. ${users[i].username}    Tallérok: ${users[i].coin}`,
            value: `Szerver vagyonának ${(users[i].coin/allCoins*100).toFixed(2)}%-a`
        });
    }
    return fields;
}