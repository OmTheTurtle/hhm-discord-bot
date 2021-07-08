const { Sequelize } = require("sequelize")
const { connection, username, password } = require("../config/database.json")

const sequelize = new Sequelize(connection, username, password, {
  host: "postgresql.db",
  dialect: "postgres",
  logging: false,
})

async function databaseConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

module.exports = { sequelize, databaseConnect }
