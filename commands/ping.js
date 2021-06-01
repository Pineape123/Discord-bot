const discord = require('discord.js')
module.exports = {
	name: 'ping',
	description: 'Ping!',
	//////////////
    execute(message, args, client) {
		const pingembed = new discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Ping')
	    .setDescription(client.ws.ping + ' ms')
	    .setThumbnail('https://media1.tenor.com/images/5c9af7c52ff148ed9c307af04bb4921f/tenor.gif?itemid=14031709')
	    .setTimestamp()
	    .setFooter('vrooom');

        message.channel.send(pingembed);
	},
};