const User = require("../../database/models/user")

module.exports = async (message) => {
  const user = await User.findOne({ where: { discordId: message.author.id } })
  if (user.oldView) {
    message.channel.send(generateOldHelp())
  } else {
    message.channel.send(generateNewHelp())
  }
}

function generateNewHelp() {
  return {
    embed: {
      title: "Parancsok listája",
      color: 4925313,
      fields: [
        {
          name: "Rangok",
          value:
            "`!soros` - Liberált sorosbérenc csoport választása\n" +
            "`!garda` - Nemzeti gárdista csoport választása\n" +
            "`!central` - Centralista cuck csoport választása",
        },
        {
          name: "Véleménynilvánítás",
          value:
            "`!konnygaz @felhasználó` - Könnygáz küldése\n" +
            "`!tisztelet @felhasználó` - Tisztelet küldése",
        },
        {
          name: "Kaszinó",
          value: "`!kockazas` - Kockavetés\n" + "~~`!fkr` - Félkarú rabló~~",
        },
        {
          name: "Lekérdezés",
          value:
            "`!batyum` - Batyud lekérdezése\n" +
            "`!topgazdagok` - Top tíz leggazdagabb felhasználó lekérdezése\n" +
            "`!topcsorok` - Top tíz legszegényebb felhasználó lekérdezése\n" +
            "`!uzenet` - Üzeneteid számának lekérdezése\n" +
            "`!topfelhasznalok` - Top tíz legaktívabb felhasználó lekérdezése\n" +
            "~~`!simppoints` - Simp pontjaid lekérdezése~~\n" +
            "~~`!topsimp` - Top tíz legsimpebb felhasználó lekérdezése~~\n" +
            "~~`!card` - Legenerálja a HHM kártyád~~",
        },
        {
          name: "Random kép",
          value:
            "`!cute` - Random cuki kép redditről\n" +
            "`!progmeme` - Random programozás related meme redditről\n" +
            "`!nsfw` - NSFW zsákbamacska redditről\n" +
            "`!greentext` - Random greentext redditről",
        },
        {
          name: "Tallérhoz kapcsolódó",
          value:
            "~~`!adomany @felhasználó összeg` - Adomány küldése~~\n" +
            "~~`!kuss @felhasználó` - Felhasználó némítása 1 órára 1000 tallérért cserébe~~\n" +
            "~~`!felvesz` - Tallérok felvétele~~\n" +
            "~~`!rablas @felhasználó` -Felhasználó kirablásának megkísérlése~~\n" +
            "~~`!atnevez @felhasználó új becenév` - Felhasználó átnevezése 200 tallérért cserébe~~\n" +
            "~~`!bet` - Fogadás a holnapi covid fertőzöttekre~~",
        },
        {
          name: "Infó",
          value: "`!help` - Ez az embed\n" + "`!info` - Információk a botról",
        },
        {
          name: "Egyéb",
          value:
            "`!lolitext` - Loli megmondja\n" +
            "`!lolieldonti A vagy B` - Loli eldönti neked, hogy melyik a helyes opció\n" +
            "!eldontes a VAGY b - Gyuri dönt helyetted" +
            "`!tinder` - Tinder match, ha már irl egyed sincs\n" +
            "~~`!szosalata` - Szósaláta lekérdezése az elmúlt 40 üzenetből~~\n" +
            "~~`!nyeroszam` - Napi új esetek és elhunytak lekérdezése~~\n" +
            "`!oldview on/off` - a régi (embed mentes) nézet be/kikapcsolása",
        },
      ],
    },
  }
}

function generateOldHelp() {
  return `\`\`\`md
Parancsok:

    ----- RANGOK -----
    soros - Liberált sorosbérenc csoport választása
    garda - Nemzeti gárdista csoport választása
    central - Centralista cuck csoport választása

    ----- VÉLEMÉNYNYILVÁNÍTÁS -----
    konnygaz - Könnygáz küldése
    tisztelet - Tisztelet küldése

    ----- KASZINÓ -----
    kockazas - Kockavetés Gyuri ellen
X   fkr - Félkarú rabló

    ----- LEKÉRDEZÉS -----
    batyum - Batyud lekérdezése
    topgazdagok - Top tíz leggazdagabb felhasználó lekérdezése
    topcsorok - Top tíz legszegényebb felhasználó lekérdezése
    uzenet - Üzeneteid számának lekérdezése
    topfelhasznalok - Top tíz legaktívabb felhasználó lekérdezése
X   simppoints - Simp pontjaid lekérdezése
X   topsimp - Top tíz legsimpebb felhasználó lekérdezése
X   card - Legenerálja a HHM kártyád

    ----- RANDOM KÉP -----
    cute - Random cuki kép
    ph - ProgrammerHumor kép
    nsfw - NSFW zsákbamacska
    greentext - Random greentext redditről

    ----- TALLÉRHOZ KAPCSOLÓDÓ -----
X   adomany @név összeg - Adomány küldése
X   kuss @név - Felhasználó némítása 1 órára 1000 tallérért cserébe
X   felvesz - Tallérok felvétele
X   rablas - megpróbálsz kirabolni valakit a szerveren
X   atnevez @név új becenév - Felhasználó átnevezése 200 tallérért cserébe

    ----- EGYÉB -----
    lolitext - Loli megmondja
    lolieldonti a VAGY b - Loli eldönti neked
    eldontes a VAGY b - Döntések egyszerűvé téve
    tinder - Tinder match, ha már irl egyed sincs
X   szosalata - Szósaláta lekérdezése az elmúlt 40 üzenetből
X   nyeroszam - Napi új esetek lekérdezése
X   bet - fogadás a holnapi covid fertőzöttekre
    oldview on/off - a régi (embed mentes) nézet be/kikapcsolása

    ------------------------------------------
    help - ez a menü
    \`\`\``
}
