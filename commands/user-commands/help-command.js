module.exports = (message) => {
    message.channel.send(createEmbedMessage());
};

function createEmbedMessage() {
    return {
        embed: {
            title: 'Parancsok listája',
            color: 4925313,
            fields: [
                {
                    name: 'Rangok',
                    value:
                        '`!soros` - Liberált sorosbérenc csoport választása\n' +
                        '`!garda` - Nemzeti gárdista csoport választása\n' +
                        '`!central` - Centralista cuck csoport választása',
                },
                {
                    name: 'Véleménynilvánítás',
                    value:
                        '`!konnygaz @felhasználó` - Könnygáz küldése\n' +
                        '`!tisztelet @felhasználó` - Tisztelet küldése',
                },
                {
                    name: 'Kaszinó',
                    value: '~~`!kockazas` - Kockavetés\n`' + '!fkr` - Félkarú rabló~~',
                },
                {
                    name: 'Lekérdezés',
                    value:
                        '~~`!batyum` - Batyud lekérdezése~~\n' +
                        '~~`!topgazdagok` - Top tíz leggazdagabb felhasználó lekérdezése~~\n' +
                        '~~`!topcsorok` - Top tíz legszegényebb felhasználó lekérdezése~~\n' +
                        '~~`!uzenet` - Üzeneteid számának lekérdezése~~\n' +
                        '~~`!topfelhasznalok` - Top tíz legaktívabb felhasználó lekérdezése~~\n' +
                        '~~`!simppoints` - Simp pontjaid lekérdezése~~\n' +
                        '~~`!topsimp` - Top tíz legsimpebb felhasználó lekérdezése~~\n' +
                        '~~`!card` - Legenerálja a HHM kártyád~~',
                },
                {
                    name: 'Random kép',
                    value:
                        '`!cute` - Random cuki kép redditről\n' +
                        '`!progmeme` - Random programozás related meme redditről\n' +
                        '~~`!nsfw` - NSFW zsákbamacska redditről~~\n' +
                        '`!greentext` - Random greentext redditről',
                },
                {
                    name: 'Tallérhoz kapcsolódó',
                    value:
                        '~~`!adomany @felhasználó összeg` - Adomány küldése~~\n' +
                        '~~`!kuss @felhasználó` - Felhasználó némítása 1 órára 1000 tallérért cserébe~~\n' +
                        '~~`!felvesz` - Tallérok felvétele~~\n' +
                        '~~`!rablas @felhasználó` -Felhasználó kirablásának megkísérlése~~\n' +
                        '~~`!atnevez @felhasználó új becenév` - Felhasználó átnevezése 200 tallérért cserébe~~\n' +
                        '~~`!bet` - Fogadás a holnapi covid fertőzöttekre~~',
                },
                {
                    name: 'Infó',
                    value: '`!help` - Ez az embed\n' + '`!info` - Információk a botról',
                },
                {
                    name: 'Egyéb',
                    value:
                        '`!lolitext` - Loli megmondja\n' +
                        '~~`!lolieldonti A vagy B` - Loli eldönti neked, hogy melyik a helyes opció~~\n' +
                        '`!tinder` - Tinder match, ha már irl egyed sincs\n' +
                        '~~`!szosalata` - Szósaláta lekérdezése az elmúlt 40 üzenetből~~\n' +
                        '~~`!nyeroszam` - Napi új esetek és elhunytak lekérdezése~~',
                },
            ],
        },
    };
}
