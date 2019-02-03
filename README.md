# rendapi.js

An API Wrapper For [RendDevelopment](https://rend-dev.glitch.me)
(still under development)

[Link to discord server](https://discord.gg/c5dMfsF)

>Example With Async/Await
```js
const Discord = require('discord.js');
const client = new Discord.Client();
const RendDev = require("rendapi.js");
const rend = new RendDev("your bot id", "your user id")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  var PREFIX = "!";
  if (msg.author.bot) return;
  if (!msg.content.startsWith(PREFIX));
  let args = message.content.slice(PREFIX.length).trim().split(" ");
  let command args.shift().toLowerCase();
  if (command === "rend") {
    if (!args[0]) return msg.channel.send("Please Provide a Bot ID");
    let result = await rend.getBot(args[0]);
    if (!result) return msg.channel.send("Sorry, maybe the bot isn't registered in RendDevelopment");
    msg.channel.send(`**${result.bot.tag}** owned by **${result.owner.tag}** with prefix **${result.prefix}**`);
    return;
  };
});

client.login('token');
```
