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
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send(new MessageEmbed()
        .setDescription(`You have been Warned for ${Reason}`)
        .setColor("BLUE")

        )
        message.channel.send(new MessageEmbed()
            .setDescription(`Warned ${user} for ${Reason}`).setColor("BLUE")
        )


    }
}