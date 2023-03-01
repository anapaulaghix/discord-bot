const {REST, Routes} = require(discord.js)

const dotenv = require('dotenv')
dotenv.config()
const {TOKEN} = process.env

const files = require('node:fs')
const path = require('node:path')
const commandsPath = path.join(__dirname, "commands")
const commandsFiles = files.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

//USANDO ARRAYS
const commands = []

for(const file in commandsFiles){
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({version: "10"}).setToken(TOKEN)

(async () => {
    
}) 