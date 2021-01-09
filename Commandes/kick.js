const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`Vous n'avez pas la permission !`);
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(`Je n'ai pas le droit d'expulser ce membre !`);
    if(args.length < 2) return message.channel.send(`Pas assez d'argument`);
    const member = message.mentions.members.first();
    let reason = '';
    for(let i = 1; i < args.length; i++){
        reason += args[i] + ' ';
    }
    if(!member) return message.channel.send(`La mention et la raison sont invalides !`);
    member.ban()

    let hEmbed = new Discord.MessageEmbed()
    .setColor("0xf57f03")
    .setTitle(`Rapport de l'expulsion :`)
    .setDescription(`Une expulsion a été effecrtué par ${message.author}`)
    .addFields(
        { name: "Auteur :", value: message.author },
        { name: "Membre :", value: member },
        { name: "Raison :", value:  reason }
    )
    message.channel.send(hEmbed)
};

module.exports.help = {
    name: "kick"
};