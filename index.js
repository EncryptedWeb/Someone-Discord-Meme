const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const fs = require("fs");
const bot = new discord.Client();
bot.commands = new discord.Collection();
const cooldown = new Set();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <- 0) {
        console.log("Cant find files");
        return;
    }

    jsFiles.forEach((f, i) => { 

        var fileGet = require(`./commands/${f}`);
        console.log(`Command ${f} loaded`);

        bot.commands.set(fileGet.help.name, fileGet);


    })

});

bot.on('ready', () => {
    console.log(`${bot.user.username} is ready!`)
    bot.user.setStatus("ONLINE")
    setInterval(() => {
        //const index = Math.floor(Math.random() * (activities_list.length));
        bot.user.setActivity("with @someone");
    });
});


bot.on("message", async message => { 
    
    if (message.isMentioned(bot.user)) {
        if(!message.member.hasPermission("MENTION_EVERYONE")) {
        message.reply("*Sorry, can't ping anyone for you :).*");
} else {
        var user = message.guild.members.random();
        message.reply(`${user.user}`);
    }
}
    
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

     var prefix = botConfig.prefix;

    if (!message.content.startsWith(prefix)) return;


    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    if(commands) commands.run(bot,message, arguments);
});


bot.login(botConfig.token);