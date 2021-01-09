const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Vous n'avez pas la permission !`);
    if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Je n'ai pas la permission !`);

    if(!args[0]) return message.channel.send(`Vous devez entrer un nombre de messages à supprimer !`);
    if(isNaN(args[0])) return message.channel.send(`Spécifiez un nombre !`);

    message.channel.bulkDelete(args[0]);

};

module.exports.help = {
    name: "clear"
};