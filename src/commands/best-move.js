const { MessageEmbed } = require("discord.js");

const game = require("../lib/game/game");


module.exports = {
  name: "bm",
  description: "Делает лучший ход",
  format: "<@пользователь> <@пользователь> <@пользователь>",
  hostOnly: true,
  inGameOnly: true,
  run(message) {
    if (!game.getFirstVictim()) {
      return message.reply(
        "Лучший ход можно делать только после убийства в первую ночь!"
      ).catch((error) => console.log(error));
    }

     
  
    game.bestMove().catch((error) => console.log(error));
  }
};
