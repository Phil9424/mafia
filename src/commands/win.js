const { DiscordAPIError } = require("discord.js");
const game = require("../lib/game/game");

module.exports = {
  name: "win",
  description: "Завершает игру победой указанной команды",
  format: "<mir|maf>",
  hostOnly: true,
  inGameOnly: true,
  async run(message, { args: [winner] }) {
    if (!["mir", "maf"].includes(winner)) {
      return message.reply("Победитель указан неверно!");
    }
    /*
    message.channel.messages.fetch({}).then((messages) => { 
      const botMessages = [];
      messages.filter(m => m.author.id !== '926165063482605608').forEach(msg => botMessages.push(msg))
      
      message.member.roles.remove(`1027830449332035675`)
      setTimeout(() => message.channel.bulkDelete(botMessages), 1)
          
      });

let chann = message.guild.channels.cache.get('765652141275873351');
let channell = message.guild.channels.cache.get('765846864469426196');
*/
/*
await message.guild.channels.cache.get(`975453637608374323`).send(`!save`).then(message.delete())
await message.guild.channels.cache.get(`975453637608374323`).send(message.author.id)
*/

    const players = game.getPlayers().clone();
    await game.finish(winner);
    message.member.roles.remove(`1027830449332035675`)



    players.forEach((player) => {
      player.voice.setMute(false).catch(() => {});
    });
  },
};
