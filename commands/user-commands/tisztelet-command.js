module.exports = (message) => {
    if (message.mentions.users.size)
        message.channel.send(
            `${message.author.toString()}\t(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧\t${message.mentions.users.first().toString()}`
        );
    else message.channel.send(`${message.author.toString()} mindenkit szeret (っ◕‿◕)っ`);
};
