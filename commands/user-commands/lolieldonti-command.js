const {
  setupCanvasContext,
  formatText,
  createAndSendImage,
} = require("../../utilities/scripts/loli-commons")

module.exports = async function (message) {
  if (message.arguments == null)
    return message.channel.send(
      `${message.author.toString()} elbasztad. Mit kéne kiírnom?`
    )
  const orCount = message.arguments.filter((it) => it === "vagy").length

  if (orCount > 1) {
    return message.channel.send("Anyáddal szórakozz")
  } else if (
    orCount === 0 ||
    message.arguments[0] === "vagy" ||
    message.arguments[message.arguments.length - 1] === "vagy"
  ) {
    return message.channel.send("Bruh")
  }

  const random = Math.round(Math.random())
  const splitMessage = message.rawMessage.split("vagy")
  const selectedOption = splitMessage[random].trim()

  const canvas = setupCanvasContext()
  message.arguments = selectedOption.split(" ")
  const text = formatText(message)
  await createAndSendImage(message, text, canvas)
}

// TODO: hat ezt refaktoralni kene, meg ugy megcsinalni mukodore :(((((
// const MAX = 18

// async function main(msg) {
//   const args = msg.arguments
//   const canvas = createCanvas(1200, 460)
//   const ctx = canvas.getContext("2d")

//   ctx.font = "60px Arial"
//   ctx.fillStyle = "white"

//   let options = [[]]
//   let optionCount = 0

//   let vagyvagy = false
//   let serverEmoji = false

//   if (args.length <= 2) {
//     return msg.reply(" gratulálok! Elbasztad.")
//   }

//   for (let i = 0; i < args.length; i++) {
//     if (
//       args[i].toLowerCase() == "vagy" &&
//       (args.length - 1 != i ? args[i + 1].toLowerCase() : false) != "vagy"
//     )
//       optionCount++, options.push([])
//     else if (
//       args[i].toLowerCase() == "vagy" &&
//       args[i + 1].toLowerCase() == "vagy"
//     )
//       vagyvagy = true
//     else if (args[i].startsWith("<@!"))
//       options[optionCount].push(
//         msg.guild.members.cache.find((m) => m.id == args[i].substr(3, 18))
//           .displayName
//       )
//     else if (args[i].startsWith("<#"))
//       options[optionCount].push(
//         msg.guild.channels.cache.find((ch) => ch.id == args[i].substr(2, 18))
//           .name
//       )
//     else if (args[i].startsWith("<:"))
//       (serverEmoji = true),
//         options[optionCount].push(
//           msg.guild.emojis.cache.find(
//             (e) => e.id == args[i].trim().split(":")[2].substr(0, 18)
//           ).url
//         )
//     else options[optionCount].push(args[i])
//   }

//   if (optionCount < 1) {
//     return msg.reply(" gratulálok! Elbasztad.")
//   }

//   if (
//     vagyvagy ||
//     args[0].toLowerCase() == "vagy" ||
//     args[args.length - 1].toLowerCase() == "vagy"
//   ) {
//     return msg.reply(" vAgyVagYvAgyVaGYvAgY szopd ki a faszom!")
//   }

//   const random = Math.floor(Math.random() * (optionCount + 1))

//   let str = options[random][0]
//   let lineLength = options[random][0].length
//   let lineNum = 1
//   let maxLength = options[random][0].length

//   let containEmoji = false

//   for (let i = 0; i < options[random].length; i++) {
//     if (
//       options[random][i].includes("https://cdn.discordapp.com/emojis/") &&
//       serverEmoji
//     )
//       containEmoji = true
//   }

//   if (containEmoji) {
//     if (options[random].length != 1) return msg.reply(" gratulálok! Elbasztad.")
//     const emoji = await loadImage(options[random][0])
//     ctx.drawImage(emoji, 520, 140, 200, 200)
//   } else {
//     for (let i = 0; i < options[random].length - 1; i++) {
//       if (lineLength + options[random][i + 1].length + 1 >= MAX)
//         (str += `\n${options[random][i + 1]}`),
//           (lineLength = options[random][i + 1].length),
//           lineNum++
//       else
//         (str += ` ${options[random][i + 1]}`),
//           (lineLength += options[random][i + 1].length)
//       if (options[random][i + 1].length + 1 > maxLength)
//         maxLength = options[random][i + 1].length
//     }
//   }

//   const myimg = await loadImage("images/loli.png")
//   ctx.drawImage(myimg, 10, 10, 490, 450)
//   if ((lineNum <= 6 && maxLength < 18) || serverEmoji) {
//     if (!serverEmoji) ctx.fillText(str, 520, 230 - (lineNum - 1) * 30)
//     const attachment = new Discord.MessageAttachment(
//       canvas.toBuffer(),
//       "loliCanvas.png"
//     )
//     msg.channel.send(attachment)
//   } else if (lineNum > 6 && maxLength >= 18) {
//     msg.reply(
//       " túl sok baromságot írtál, vagy szarul használtad a parancsot, a faszom se fogja megjeleníteni neked."
//     )
//   }
// }
