const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "$";

client.on("ready", () => {
  console.log("All systems functional!");
});

client.on("message", message => {
  if (message.author.bot) return;
  let args = message.content.split(" ").slice(1);

  if(message.content === (prefix + "ping")) {
  message.channel.send("Ping?").then(m => m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms.`) );
  }

  if (message.content.startsWith(prefix + "add")) {
      let numArray = args.map(n=> parseInt(n));
      let total = numArray.reduce( (p, c) => p+c);
      message.channel.send(total);
  }


  if(message.content.startsWith(prefix + "clear")) {
    let modRole = message.guild.roles.find("name", "Moderator");
    if(!message.member.roles.has(modRole.id)) {
        return message.channel.send("You are not authorized to use this command. :slight_frown:");
    }
    if(message.member.roles.has(modRole.id)) {
    message.channel.bulkDelete(`${args}`)

    }
    }


    if(message.content.startsWith(prefix + "setgame")) {
      var argresult = args.join(" ");
      client.user.setGame(argresult)
    }


    if(message.content === (prefix + "reset")) {
      if (message.author.id !== "217411439948726272")   return;
      process.exit()
    }

});

client.login("your bot token here");
