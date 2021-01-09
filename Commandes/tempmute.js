const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {

  //!tempmute @user 1s/m/h/d

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

  let tomute = message.guild.member(!message.mentions.users.first() || mention);
  if(!tomute) return message.reply("Veuillez renseigner un utlisateur");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu ne peux pas le mute !");

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

  let mutetime = args[1];
  if(!mutetime) return message.reply("Vous devez spécifier un temps !");

  await(tomute.roles.add(muterole.id));
  message.reply(`<@${tomute.id}> a été mute pour ${ms(ms(mutetime))} !`);

  let delay = ms(mutetime) % 2147483647 

  setTimeout(function(){
    tomute.roles.remove(muterole.id);
    message.channel.send(`<@${tomute.id}> a été unmute !`);
  }, delay);


//end of module
}

module.exports.help = {
  name: "tempmute"
}


