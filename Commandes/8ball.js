const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    if(message.channel.type === "dm") return;
    message.delete()
    if(!args[0]) return message.reply("Posez une vrai question");
    let replies = ["Oui", "Non", "Je ne sais pas", "Certainement", "Probablement", "Sûrement", "Redemande plus tard", "Quoient ?!", "^^"];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    
    
    let ballembed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag)
    .setColor("0x07b814")
    .addField("Question", question)
    .addField("Réponse", replies[result]);

    message.channel.send(ballembed);

}

module.exports.help = {
    name: "8ball"
};