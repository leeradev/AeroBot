# AeroBot
An open source Discord bot developed in JavaScript using the discord.js library!

# Features
```$ping```: Tells you your latency.

```$add [args]```: Adds numbers. Usage: ```$add 1 2 3``` returns 6.

```$clear [args]```: Clears messages in bulk. Self explanatory.

```$setgame [args]```: Under the bots username on the right of the screen it will say "Playing [args]."

```$dm @user [args]```: DMs (Direct Messages) the user mentioned [args] - assuming only 1 user is mentioned. Requires "Administrator" role.

```$reboot```: Restarts the bot using the PM2 process manager. If PM2 is not present, it will just kill the bot.

```$say [args]```: Bot will say in the chat [args].

```$kick @user```: Kicks user mentioned - assuming only 1 user is mentioned. Requires "Moderator" role.
