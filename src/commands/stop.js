const game = require("../lib/game/game");

module.exports = {
  name: "stop",
  description: "Останавливает текущую игру без подсчёта статистики",
  hostOnly: true,
  inGameOnly: true,
  async run(message) {


message.member.roles.remove(`1027830449332035675`)
  game.stop();
   await message.client.guilds.cache.forEach((guild)=>{if (guild.name == 'Mafia chat') {guild.delete(1000)}})
  },
};
