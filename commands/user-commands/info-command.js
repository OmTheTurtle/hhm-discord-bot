const { version, author, repository, bugs } = require('../../package.json');

module.exports = (message) => {
    message.channel.send(createEmbedMessage());
};

function createEmbedMessage() {
    return {
        embed: {
            title: 'Információk a botról',
            color: 3735424,
            fields: [
                {
                    name: 'Verzió:',
                    value: `\`${version}\``,
                },
                {
                    name: 'Motiváció:',
                    value: 'A bot Dénes aka G3ph4z aka Г3пхь4з tiszteletére készült.',
                },
                {
                    name: 'Github repository:',
                    value: repository.url,
                },
                {
                    name: 'Hibajelentés:',
                    value: bugs.url,
                },
                {
                    name: 'Alkotó:',
                    value: author,
                },
            ],
        },
    };
}
