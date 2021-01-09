const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    if(message.channel.type === "dm") return;
    message.delete()
    if(message.author.bot) return;
    var mentionned = message.mentions.users.first()
    if(!message.guild.member(message.author).hasPermission("MANAGE_MEMBERS")) return message.channel.send("Vous n'avez pas les permissions pour éxecuter cette commande !")
    if(message.mentions.users.size === 0) {
        return message.channel.send("Vous n'avez pas mentionner d'utilisateur !");
    }else{
        const args =  message.content.split(' ').slice(1)
        if(args[0] === "<@!" + mentionned.id + ">" || args[0] === "<@!" + mentionned.id + ">"){
            if(args.slice(1).length != 0) {
                message.channel.send(`${mentionned.tag} a été averti !`)
                let hEmbed = new Discord.MessageEmbed()
                .setColor("0x0099c9")
                .setTitle("Rapport d'avertissement :")
                .setDescription(`Vous venez d'être averti sur le serveur ${message.guild.name} par ${message.author}\nRaison : ${args.slice(1).join(' ')}`)
                mentionned.send(hEmbed)
            }else{
                return message.reply("Utilisation incorrect, vous devez mettre une raison !")
            }
        }else{
            return message.reply("Utilisation incorrect !")
        }
    }
}

module.exports.help = {
    name: "warn"
};