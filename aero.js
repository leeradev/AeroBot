const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;

client.on("ready", () => {
  console.log("All systems functional!");
});

client.on("guildMemberAdd", member => {
  let guild = member.guild;
  guild.defaultChannel.send(`Welcome ${member.user} to this server.`);
});

client.on("guildMemberRemove", member => {
  let guild = member.guild;
  guild.defaultChannel.send(`${member.user} has left. Goodbye. :cry:`);
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


    if (message.content.startsWith(prefix + "say")) {
        let modRole = message.guild.roles.find("name", "Moderator");
        if(message.member.roles.has(modRole.id)) {
         message.channel.send(args.join(" "));
        } else {
            message.channel.send("You are not authorized to use this command. :slight_frown:").catch(console.error);
        }

    }

    if (message.content.startsWith(prefix + "kick")) {
        let modRole = message.guild.roles.find("name", "Moderator");
        if(!message.member.roles.has(modRole.id)) {
            return message.channel.send("You are not authorized to use this command. :slight_frown:");
        }
        if(message.mentions.users.size === 0) {
            return message.channel.send("Please mention a user to kick.");
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if (!kickMember) {
            return message.channel.send("That user does not seem valid.");
        }
        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("I don't have the permissions (KICK_MEMBER) to do this.")
        }
        kickMember.kick().then(member => {
            message.channel.send(`${member.user.username} was successfully kicked.`)
        }).catch(console.error)
      }
});

client.login(bot.token);
