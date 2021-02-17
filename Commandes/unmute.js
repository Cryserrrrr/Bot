const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Vous n'avez pas la permission !")

        let mention = ''
        if (args[0]) {
          mention = args[0]
          if (mention.startsWith('<@') && mention.endsWith('>')) {
              mention = mention.slice(2, -1);
              if (mention.startsWith('?')) mention = mention.slice(1);
              if (mention.startsWith('!')) mention = mention.slice(1);
          }
        }

        let tomute = message.guild.member(!message.mentions.users.first() || mention);
        if(!tomute) return message.channel.send("Mentionnez quelqu'un pour le mute !");

        let role = message.guild.roles.cache.find(r => r.name === "muted")
        
        if(!role || !tomute.roles.cache.get(role.id)) return message.channel.send("Cette utilisateur n'est pas mute !");

        await tomute.roles.remove(role);
        message.channel.send(`<@${tomute.id}> a été démute !`);

        message.delete();
     }
    
module.exports.help = {
    name: "unmute"
}

