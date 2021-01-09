const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = (client, message, args) => {
  // member = GuildMember | user = User
  let member = message.member;
  if (args[0]) member = message.guild.member(message.mentions.users.first()); 
  let user = member.user;

  const hEmbed = new Discord.MessageEmbed()
    .setColor('0x07b814')
    .setThumbnail(user.displayAvatarURL())
    .addField(
      `Plus d'informations à propos de **${user.username}**`,`
      ∙ **Nom**: ${user.tag}
      ∙ **Nom d'utilisateur**: ${user.username}
      ∙ **Pseudo**: ${member.nickname}
      ∙ **Créé le**: ${moment.utc(user.createdAt).format('DD/MM/YYYY | hh:mm')}
      ∙ **Bot**: ${user.bot ? 'oui' : 'non'}
      ∙ **Date d'entrée dans le serveur**: ${moment.utc(member.joinedAt).format('DD/MM/YYYY - hh:mm')}
      ∙ **Rôle(s)**: ${member.roles.cache.map(roles => `\`${roles.name}\``).join(', ')}
      ∙ **Statut**: ${user.presence.status.toUpperCase()} 
      ∙ **Jeux**: ${user.presence.activities}
    `,
    );

  message.channel.send(hEmbed);
};

module.exports.help = {
  name: "userinfo"
}