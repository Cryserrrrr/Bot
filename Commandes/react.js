const Discord = require("Discord.js")

module.exports.run = async (client, message, args) => {
    if(message.author.id != '269612669584015361') return;
    message.react('🤙🏽');

}

module.exports.help = {
    name: "react"
}