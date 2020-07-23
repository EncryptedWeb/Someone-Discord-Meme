const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let embed = new discord.RichEmbed()
    .setTitle("Someone - Commands")
    .setDescription("Just mention the bot", "You will see for yourself :)")
    .setFooter("Made By EncryptedWeb / UnknownUser")    
    message.channel.send(embed);
    
}

module.exports.help = {
    name: "help"
}