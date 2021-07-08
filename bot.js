const { BOT_TOKEN } = require("./config/token.json")

const Discord = require("discord.js")
const client = new Discord.Client({
  partials: ["USER", "GUILD_MEMBER", "CHANNEL", "MESSAGE", "REACTION"],
})

const clientIsReady = require("./events/client-ready")
const guildMemberAdd = require("./events/guild-member-add")
const guildMemberRemove = require("./events/guild-member-remove")
const guildMemberUpdate = require("./events/guild-member-update")
const userMessageHandler = require("./handlers/message-handler")

const { databaseConnect } = require("./database/sequelize")

client.once("ready", async () => {
  clientIsReady(client)
  await databaseConnect()
})

client.on("guildMemberAdd", (member) => {
  guildMemberAdd(member, client)
})

client.on("guildMemberRemove", (member) => {
  guildMemberRemove(member, client)
})

client.on("guildMemberUpdate", (oldMember, newMember) => {
  guildMemberUpdate(oldMember, newMember, client)
})

client.on("message", async (userMessage) => {
  userMessageHandler(userMessage)
})

client.login(BOT_TOKEN)
