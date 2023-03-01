const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const dotenv = require('dotenv')
dotenv.config()
const {TOKEN} = process.env

const files = require('node:fs')
const path = require('node:path')
const commandsPath = path.join(__dirname, "commands")
const commandsFiles = files.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

//USANDO COLLECTION
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

for (const file of commandsFiles ){
	const filePath = path.join(commandsPath, file)
	const commands = require(filePath)

	if("data" in commands && "execute" in commands){
		client.commands.set(commands.data.name, commands)
	} else{
		console.log(`Esse comando ${filePath} esta ausente`);
	}
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.login(TOKEN);

client.on(Events.InteractionCreate, interaction => {
	if(!interaction.isChatInputCommand()){
		return
	} else{
		console.log(interaction)
	}
})