const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  // get correct user id on mention because the input retrieve " <@!547935154094604288> " instead of 547935154094604288
  let mention = ''
  if (args[0]) {
    mention = args[0]
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('?')) mention = mention.slice(1);
        if (mention.startsWith('!')) mention = mention.slice(1);
    }
  }

  //!mute @user 1s/m/h/d
  let tomute = message.guild.member(!message.mentions.users.first() || mention);
  if(!tomute) return message.channel.send("Mentionnez quelqu'un à mute !");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission de faire ça !");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je ne peux pas mute cette utilisateur !");
  if (tomute.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous mute !");

  let muterole = message.guild.roles.cache.find(r => r.name === 'muted');
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.roles.create({
        data: {
          name: "muted",
          color: "#000222",
          permissions: []
        },
        reason: 'we needed a muted role for les gueux',
      })
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role

  await(tomute.roles.add(muterole.id));
  message.reply(`<@${tomute.id}> a été mute`);
  message.delete();
}

module.exports.help = {
  name: "mute"
}