const User = require('../../database/models/user');

module.exports = async (message) => {
    const user = await User.findOne({ where: { discordId: message.author.id } });
    if(message.arguments.length == 1) {
        if(message.arguments[0].toLowerCase() == "on")
            await user.update({
                oldView: true
            });
        else if(message.arguments[0].toLowerCase() == "off")
            await user.update({
                oldView: false
            });
        return message.channel.send(`${message.author.toString()}, sikeresen átváltottál ${user.oldView ? `a régi` : `az új` } felületre.`);
    }
    message.channel.send(`${message.author.toString()}, valamit elbasztál.`);
};