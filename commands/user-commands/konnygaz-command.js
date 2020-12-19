module.exports = (message) => {
    if (message.mentions.users.size)
        message.channel.send(
            `${message.author.toString()}\t(⌐■_■)--︻╦╤─ - - -\t${message.mentions.users.first().toString()}`
        );
    else message.channel.send(`${message.author.toString()}, ez mellé ment...`);
};
