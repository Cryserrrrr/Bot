const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas les permissions pour faire cela !");
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Je n'ai pas le droit de bannir ce membre !");
    if(args.length < 2) return message.channel.send("Pas assez d'arguments");
    const member = message.mentions.members.first();
    let reason = '';
    for(let i = 1; i < args.length; i++){
        reason += args[i] + ' ';
    }
    if(!member) return message.channel.send("La mention et la raison sont invalides !");
    member.ban()

    let hEmbed = new Discord.MessageEmbed()
    .setColor("0x0099c9")
    .setTitle("Rapport de ban :")
    .setDescription(`Un ban a été effectué par ${message.author}`)
    .addFields(
        { name: "Auteur :", value: message.author },
        { name: "Membre :", value: member },
        { name: "Raison :", value:  reason }
    )
    message.channel.send(hEmbed)
};

module.exports.help = {
    name: "ban"
};