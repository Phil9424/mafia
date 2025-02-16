const { Collection } = require("discord.js");
const game = require("../lib/game/game");
const { MessageEmbed, ReactionCollector, MessageSelectMenu,  MessageActionRow, MessageButton } = require("discord.js");
const Canvas = require('canvas');
const canvas = Canvas.createCanvas(100, 100);
const ctx = canvas.getContext('2d');


module.exports = {
  name: "t",
  description: "Маяк игроку",
  ownerOnly: true,

  async run(message) {
 
message.author.send('§12').then((message) => console.log(message.channel.id))
    console.log(message.author.dmChannel)


   }
   }
