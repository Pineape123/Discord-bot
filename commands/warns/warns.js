const db = require('../../models/warns')
const { Message, MessageEmbed} = require('discord.js')

module.exports = {
    name: 'warn',
    /**
     * @param {Message} message
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermmsion('ADMINISTRATOR')) return message.channel.send('You do not have perms dummy')
        const user = message.mentions.memebers.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User not Found!')
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(data.content.length) {
                message.channel.send(new MessageEmbed()
                   .setTitle(`${user.user.tag}'s warns`)
                   .setDescription(
                       data.content.map(
                           (w, i) => 
                           `\`${i + 1}\` | Moderator : ${message.guild.members.chache.get(w.moderator).user.tag}\nReason : ${w.reason}`
                           )
                       )
                        .setColor("BLUE")

                )
             }else {
                 message.channel.send("User has no Data")
             }
        })
    }
}