const fs = require('fs');
const Discord = require('discord.js');
const { aliases } = require('./commands/ping');
const client = new Discord.Client();
const prefix = ";";
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=> [
    console.log("connected to database")
]).catch((err) =>{
    console.log(err)
});


///////////////////////

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
    client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
    
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
    
        if (!client.commands.has(command)) return;
    
        try {
            client.commands.get(command).execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    });
}
////////////////////////////////////////////////////////////////////////////////////////////

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

//////////////////////////////////////////////////////////////////////

client.login(process.env.DISCORD_TOKEN);
